import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { HistoryItem } from '@/types';


interface HistStore {
  hist: HistoryItem[] | null;
  setHistInstance: (instance : HistoryItem) => void; 
  setHist: (hist : HistoryItem[]) => void;
  removeHistInstance : (id : string) => void;
  removeHist: () => void;
  isInitialized: boolean;
}

export const useHistStore = create<HistStore>()(
    persist(
        (set, get) => ({
                hist: null,
                setHistInstance: (instance : HistoryItem) => set({
                        hist: [...(get().hist || []), instance]
                }),
                setHist: (hist: HistoryItem[]) => set({ hist : hist}),
                removeHistInstance: (id: string) => set({
                        hist: (get().hist || []).filter(item => (item.id) !== id)
                }),
                removeHist: () => set({ hist: null}),
                isInitialized: false,
        }),
        {
            name: 'hist-storage', // Nombre para el local storage
            // Actualizamos el estado de inicialización cuando se recarguen los datos del localStorage
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.isInitialized = true;
                }
            },
        }
    )
);
