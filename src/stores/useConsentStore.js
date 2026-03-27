import { create } from "zustand";
import { persist } from "zustand/middleware";
import { model } from "../model";

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
                get().consents.filter((c) => c.status === "active").length,
            
            getRevokedCount: () =>
                get().consents.filter((c) => c.status === "revoked").length,
            
            getExpiredCount: () =>
                get().consents.filter((c) => c.status === "expired").length,
        }),
        {
            name: "consents" // localStorage key
        }
    )
);