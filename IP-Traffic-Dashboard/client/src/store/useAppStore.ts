import { create } from 'zustand';

interface AppState {
  selectedRegion: string | null;
  setSelectedRegion: (region: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedRegion: null,
  setSelectedRegion: (region) => set({ selectedRegion: region }),
}));