import { create } from 'zustand';

export const useGeoStore = create((set) => ({
  myLocation: null, // { lat, lng, accuracy }
  setMyLocation: (loc) => set({ myLocation: loc }),
}));
