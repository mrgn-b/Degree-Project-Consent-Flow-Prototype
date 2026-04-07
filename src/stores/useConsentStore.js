import { create } from "zustand";
import { persist } from "zustand/middleware";
import { model } from "../model";
import { nanoid } from "nanoid";
import { useServiceProviderStore } from "./useServiceProviderStore";

export const useConsentStore = create(
    persist(
        (set, get) => {
            // Track expiration timers to avoid duplicates
            const expirationTimers = {};

            // Schedule a timer for a single consent expiration
            const scheduleExpiration = (consent) => {
            const expiresAt = new Date(consent.timestamps.expiresAt).getTime();
            const now = Date.now();
            const msUntilExpiration = expiresAt - now;

            if (msUntilExpiration > 0) {
                if (expirationTimers[consent.id]) clearTimeout(expirationTimers[consent.id]);

                expirationTimers[consent.id] = setTimeout(() => {
                const nowISO = new Date().toISOString();

                set((state) => {
                    const updatedConsents = state.consents.map((c) =>
                    c.id === consent.id ? { ...c, timestamps: { ...c.timestamps, updatedAt: nowISO } } : c
                    );

                    const expiredAction = {
                    id: nanoid(),
                    consentId: consent.id,
                    type: "expired",
                    timestamp: nowISO,
                    actor: "system",
                    changes: null,
                    metadata: { source: "Expiration Timer" },
                    };

                    return {
                    consents: updatedConsents,
                    consentActions: [...state.consentActions, expiredAction],
                    };
                });

                // Update service status
                useServiceProviderStore.getState().toggleStatus(consent.serviceId);

                delete expirationTimers[consent.id];
                }, msUntilExpiration);
            }
            };

            // Schedule expiration timers for all consents
            const scheduleAllExpirations = () => {
                get().consents.forEach(scheduleExpiration);
            };

            return {
                consents: model.consents,
                consentActions: model.consentActions,

                // Revokes consent if active
                // If not active unrevoke consent
                toggleConsentRevocation: (id) => {
                    set((state) => {
                        const now = new Date().toISOString();
                        let newAction = null;

                        const updatedConsents = state.consents.map((c) => {
                            if (c.id !== id) return c;

                            const isRevoked = !!c.timestamps.revokedAt;

                            const updatedConsent = {
                                ...c,
                                timestamps: {
                                    ...c.timestamps,
                                    revokedAt: isRevoked ? null : now,
                                    updatedAt: now,
                                },
                            };

                            newAction = {
                                id: nanoid(),
                                consentId: c.id,
                                type: isRevoked ? "unrevoked" : "revoked",
                                timestamp: now,
                                actor: "user",
                                changes: null,
                                metadata: { source: "Dashboard" },
                            };

                            return updatedConsent;
                        });

                        return {
                            consents: updatedConsents,
                            consentActions: newAction
                                ? [...state.consentActions, newAction]
                                : state.consentActions,
                        };
                    });
                },

                // Add a new consent
                createConsent: (serviceId, purposes = [], dataCategories = [], thirdParties = []) => {
                    const now = new Date().toISOString();
                    const oneYearLater = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString();
                    const oneMinuteLater = new Date(Date.now() + 1 * 60 * 1000).toISOString(); // test: 1 min expiration

                    const newConsent = {
                        id: nanoid(),
                        serviceId,
                        // Preserve the granted values from the purposes array
                        purposes: purposes.map(p => ({ ...p, granted: p.granted })),
                        thirdParties: thirdParties.map(t => ({ ...t, granted: t.granted })),
                        status: "active",
                        // For now, expiresAt one year from "now"
                        timestamps: {
                            createdAt: now,
                            updatedAt: now,
                            expiresAt: oneYearLater, // change to oneMinuteLater to test expiration functionality
                            revokedAt: null,
                        },
                        metadata: { version: "1.0", consentMethod: "explicit" },
                    };

                    const action = {
                        id: nanoid(),
                        consentId: newConsent.id,
                        type: "created",
                        timestamp: now,
                        actor: "user",
                        changes: null,
                        metadata: { source: "Service Page" },
                    };

                    set((state) => ({
                        consents: [...state.consents, newConsent],
                        consentActions: [...state.consentActions, action],
                    }));

                    scheduleExpiration(newConsent);
                },

                // Update consent
                updateConsent: (updatedConsent) => {
                    const originalConsent = get().consents.find(c => c.id === updatedConsent.id);
                    if (!originalConsent) return;
                    const now = new Date().toISOString();

                    const purposeChanges = updatedConsent.purposes
                        .map(p => {
                            const original = originalConsent.purposes.find(op => op.id === p.id);
                            if (!original || original.granted === p.granted) return null;
                            return { id: p.id, description: p.description, from: original.granted, to: p.granted };
                        })
                        .filter(Boolean);

                    const thirdPartyChanges = updatedConsent.thirdParties
                        .map(t => {
                            const original = originalConsent.thirdParties.find(ot => ot.id === t.id);
                            if (!original || original.granted === t.granted) return null;
                            return { id: t.id, from: original.granted, to: t.granted };
                        })
                        .filter(Boolean);

                    const changes = {};
                    if (purposeChanges.length > 0) changes.purposes = purposeChanges;
                    if (thirdPartyChanges.length > 0) changes.thirdParties = thirdPartyChanges;
                    if (Object.keys(changes).length === 0) return;

                    const action = {
                        id: nanoid(),
                        consentId: updatedConsent.id,
                        type: "updated",
                        timestamp: now,
                        actor: "user",
                        changes,
                        metadata: { source: "Dashboard" },
                    };

                    set((state) => ({
                        consents: state.consents.map(c =>
                            c.id === updatedConsent.id
                                ? { ...updatedConsent, timestamps: { ...updatedConsent.timestamps, updatedAt: now } }
                                : c
                        ),
                        consentActions: [...state.consentActions, action],
                    }));

                    if (originalConsent.timestamps.expiresAt !== updatedConsent.timestamps.expiresAt) {
                        scheduleExpiration(updatedConsent);
                    }
                },

                setConsents: (consents) => {
                    set({ consents });
                    scheduleAllExpirations();
                },

                // Gets the status of the consent
                getStatus: (consent) => {
                    if (consent.timestamps.revokedAt) return "revoked";
                    if (consent.timestamps?.expiresAt && new Date(consent.timestamps.expiresAt) < new Date())
                        return "expired";
                    return "active";
                },

                getActiveCount: () =>
                    get().consents.filter(c => get().getStatus(c) === "active").length,

                getRevokedCount: () =>
                    get().consents.filter(c => get().getStatus(c) === "revoked").length,

                getExpiredCount: () =>
                    get().consents.filter(c => get().getStatus(c) === "expired").length,

                scheduleAllExpirations,
            };
        },
        { name: "consents" }
    )
);

// Subscribe to consents changes to handle new or updated expirations
useConsentStore.subscribe(
    (state) => state.consents,
    (consents, previous) => {
        consents.forEach(c => {
            const prev = previous?.find(p => p.id === c.id);
            if (!prev || prev.timestamps.expiresAt !== c.timestamps.expiresAt) {
                useConsentStore.getState().scheduleAllExpirations();
            }
        });
    }
);