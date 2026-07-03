import { create } from 'zustand';

export const useStore = create((set) => ({
  started: false,
  setStarted: (started) => set({ started }),
  
  currentStop: -1, // -1 is none, 0-8 are the islands
  setCurrentStop: (stop) => set({ currentStop: stop }),

  // For the final cinematic
  isHQ: false,
  setIsHQ: (isHQ) => set({ isHQ }),
  
  // Track ship position for the camera and UI to use if needed
  shipPosition: [0, 0, 0],
  shipRotation: 0,
  setShipPosition: (pos) => set({ shipPosition: pos }),
}));
