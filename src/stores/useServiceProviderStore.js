import { create } from "zustand";
import { persist } from "zustand/middleware";
import { model } from "../model";

export const useServiceProviderStore = create(
  persist(
    (set, get) => ({
      providers: model.serviceProviders,

      // Changes status
      toggleStatus: (id) => {
        set({
          providers: get().providers.map((p) =>
            p.id === id
              ? {
                  ...p,
                  status: p.status === "active" ? "inactive" : "active",
                }
              : p
          ),
        });
      },

      setProviders: (providers) => set({ providers }),
    }),
    {
      name: "service_providers", // localStorage key
    }
  )
);