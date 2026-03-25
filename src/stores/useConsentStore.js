import { create } from "zustand";
import { persist } from "zustand/middleware";
import { model } from "../model";

export const useConsentStore = create(
    persist(
        (set, get) => ({
            consents: model.consents,

            // Changes status
            toggleStatus: (id) => {
                set({
                consents: get().consents.map((c) =>
                    c.id === id
                    ? {
                        ...c,
                        status: c.status === "active" ? "inactive" : "active",
                        }
                    : c
                ),
                });
            },

            setConsents: (consents) => set({ consents }),

            getActiveCount: () =>
                get().consents.filter((c) => c.status === "active").length,
            
            getInactiveCount: () =>
                get().consents.filter((c) => c.status === "inactive").length,
            
            getExpiredCount: () =>
                get().consents.filter((c) => c.status === "expired").length,
        }),
        {
            name: "consents" // localStorage key
        }
    )
);