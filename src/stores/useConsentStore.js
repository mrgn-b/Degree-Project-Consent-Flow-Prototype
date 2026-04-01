import { create } from "zustand";
import { persist } from "zustand/middleware";
import { model } from "../model";
import { nanoid } from "nanoid";

export const useConsentStore = create(
    persist(
        (set, get) => ({
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

                // Create action
                newAction = {
                    id: nanoid(),
                    consentId: c.id,
                    type: isRevoked ? "unrevoked" : "revoked",
                    timestamp: now,
                    actor: "user",
                    changes: null,
                    metadata: {
                        source: "Dashboard"
                    }
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
                const newConsent = {
                id: nanoid(),
                serviceId,
                // For now, all parameters are granted
                purposes: purposes.map(p => ({ ...p, granted: true })),
                thirdParties: thirdParties.map(t => ({ ...t, granted: true })),
                status: "active",
                // For now, expiresAt one year from "now"
                timestamps: {
                    createdAt: now,
                    updatedAt: now,
                    expiresAt: oneYearLater,
                    revokedAt: null
                },
                metadata: {
                    version: "1.0",
                    consentMethod: "explicit"
                }
                };

                const action = {
                    id: nanoid(),
                    consentID: newConsent.id,
                    type: "created",
                    timestamp: new Date().toISOString(),
                    actor: "user",
                    changes: null,
                    metadata: {
                        source: "Service Page"
                    }
                }

                set((state) => ({ 
                    consents: [...state.consents, newConsent], 
                    consentActions: [...state.consentActions, action]
                }));
            },

            // Update consent
            updateConsent: (updatedConsent) => {
            const originalConsent = get().consents.find(
                (c) => c.id === updatedConsent.id
            );

            if (!originalConsent) return;

            const now = new Date().toISOString();

            // PURPOSE CHANGES
            const purposeChanges = updatedConsent.purposes
                .map((p) => {
                const original = originalConsent.purposes.find(
                    (op) => op.id === p.id
                );

                if (!original || original.granted === p.granted) return null;

                return {
                    id: p.id,
                    description: p.description,
                    from: original.granted,
                    to: p.granted,
                };
                })
                .filter(Boolean);

            // THIRD PARTY CHANGES
            const thirdPartyChanges = updatedConsent.thirdParties
                .map((t) => {
                const original = originalConsent.thirdParties.find(
                    (ot) => ot.id === t.id
                );

                if (!original || original.granted === t.granted) return null;

                return {
                    id: t.id,
                    from: original.granted,
                    to: t.granted,
                };
                })
                .filter(Boolean);

            // BUILD CHANGES OBJECT
            const changes = {};

            if (purposeChanges.length > 0) {
                changes.purposes = purposeChanges;
            }

            if (thirdPartyChanges.length > 0) {
                changes.thirdParties = thirdPartyChanges;
            }

            // If nothing changed -> don't log action
            if (Object.keys(changes).length === 0) return;

            const action = {
                id: nanoid(),
                consentId: updatedConsent.id,
                type: "updated",
                timestamp: now,
                actor: "user",
                changes,
                metadata: {
                    source: "Dashboard"
                }
            };

            // UPDATE STATE
            set((state) => ({
                consents: state.consents.map((c) =>
                c.id === updatedConsent.id
                    ? {
                        ...updatedConsent,
                        timestamps: {
                        ...updatedConsent.timestamps,
                        updatedAt: now,
                        },
                    }
                    : c
                ),
                consentActions: [...state.consentActions, action],
            }));
            },

            setConsents: (consents) => set({ consents }),

            // Gets the status of the consent
            getStatus: (consent) => {
                if (consent.timestamps.revokedAt) return "revoked";

                if (
                consent.timestamps?.expiresAt &&
                new Date(consent.timestamps.expiresAt) < new Date()
                ) {
                return "expired";
                }

                return "active";
            },

            getActiveCount: () =>
                get().consents.filter((c) => get().getStatus(c) === "active").length,
            
            getRevokedCount: () =>
                get().consents.filter((c) => get().getStatus(c) === "revoked").length,
            
            getExpiredCount: () =>
                get().consents.filter((c) => get().getStatus(c) === "expired").length,
        }),
        {
            name: "consents" // localStorage key
        }
    )
);