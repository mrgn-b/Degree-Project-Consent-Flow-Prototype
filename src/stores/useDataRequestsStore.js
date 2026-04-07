import { create } from "zustand";
import { persist } from "zustand/middleware";
import { model } from "../model";

export const useDataRequestsStore = create(
    persist(
        (set, get) => ({
            dataRequests: model.dataRequests,

            setStatus: (id, status) => {
                set((state) => ({
                    dataRequests: state.dataRequests.map((dr) =>
                        dr.id === id
                            ? { ...dr, status }
                            : dr
                    ),
                }));
            },

        }),
        {
        name: "data_requests", // localStorage key
        }
    )
)