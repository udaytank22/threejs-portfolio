import { create } from 'zustand';

export const useStore = create((set) => ({
  started: false,
  setStarted: (started) => set({ started }),
  
  dockedPortIndex: -1, // -1 is none, 1-8 are the ports
  setDockedPortIndex: (index) => set({ dockedPortIndex: index }),

  isDocked: false,
  setIsDocked: (isDocked) => set({ isDocked }),

  // Defines where the camera should look when docked
  dockingCameraTarget: null, 
  dockingCameraPosition: null,
  setDockingCamera: (pos, target) => set({ dockingCameraPosition: pos, dockingCameraTarget: target }),

  // For the final cinematic
  isHQ: false,
  setIsHQ: (isHQ) => set({ isHQ }),
  
  // Track ship position for the camera and UI to use if needed
  shipPosition: [0, 0, 0],
  shipRotation: 0,
  setShipPosition: (pos) => set({ shipPosition: pos }),
}));
