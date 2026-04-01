import { create } from "zustand";
import { persist } from "zustand/middleware";
import { model } from "../model";
import { nanoid } from "nanoid";

export const useConsentStore = create(
    persist(
        (set, get) => ({
            consents: model.consents,

            // Revokes consent if active
            // If not active unrevoke consent
            toggleConsentRevocation: (id) => {
                set((state) => ({
                consents: state.consents.map((c) => {
                    if (c.id !== id) return c;

                    const isRevoked = !!c.timestamps.revokedAt;
                    const now = new Date().toISOString();

                    return {
                    ...c,
                    timestamps: {
                        ...c.timestamps,
                        revokedAt: isRevoked ? null : now,
                        updatedAt: now,
                    },
                    };
                }),
                }));
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

                set((state) => ({ consents: [...state.consents, newConsent] }));
            },

            updateConsent: (updatedConsent) => {
            set((state) => ({
                consents: state.consents.map((c) =>
                c.id === updatedConsent.id ? updatedConsent : c
                ),
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