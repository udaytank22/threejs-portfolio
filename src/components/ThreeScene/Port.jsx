import React, { useEffect, useRef } from 'react';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { useStore } from '../../store/useStore';
import { PremiumGlassUI } from '../UI/PremiumGlassUI';

export function Port({ 
  position, 
  title, 
  description, 
  imagePath, 
  portIndex, 
  cameraTargetOffset = [0, 10, -30], 
  cameraPositionOffset = [0, 20, 30],
  children 
}) {
  const setIsDocked = useStore((state) => state.setIsDocked);
  const setDockedPortIndex = useStore((state) => state.setDockedPortIndex);
  const setDockingCamera = useStore((state) => state.setDockingCamera);
  const dockedPortIndex = useStore((state) => state.dockedPortIndex);
  
  const isDockedAtThisPort = dockedPortIndex === portIndex;
  
  // Calculate global camera target and position based on port position and offsets
  const cameraTarget = [
    position[0] + cameraTargetOffset[0],
    position[1] + cameraTargetOffset[1],
    position[2] + cameraTargetOffset[2]
  ];
  
  const cameraPos = [
    position[0] + cameraPositionOffset[0],
    position[1] + cameraPositionOffset[1],
    position[2] + cameraPositionOffset[2]
  ];

  const handleDocking = () => {
    // Only dock if not already docked elsewhere
    if (useStore.getState().dockedPortIndex === -1) {
      setDockedPortIndex(portIndex);
      setIsDocked(true);
      setDockingCamera(cameraPos, cameraTarget);
    }
  };

  return (
    <group position={position}>
      {/* Port Environment Models */}
      <RigidBody type="fixed" colliders={false}>
        {/* A simple invisible box to act as the island's solid mass so the ship doesn't pass through the center */}
        <CuboidCollider args={[40, 20, 40]} position={[0, 0, -40]} />
        {children}
      </RigidBody>

      {/* Docking Trigger Volume */}
      <RigidBody 
        type="fixed" 
        colliders={false} 
        sensor 
        onIntersectionEnter={handleDocking}
      >
        <CuboidCollider args={[20, 10, 20]} position={[0, 0, 0]} />
      </RigidBody>

      {/* UI renders when docked here */}
      <PremiumGlassUI 
        title={title} 
        description={description} 
        imagePath={imagePath} 
        isVisible={isDockedAtThisPort}
        portIndex={portIndex}
      />
    </group>
  );
}
