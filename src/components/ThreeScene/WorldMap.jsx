import React, { useMemo } from 'react';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { useStore } from '../../store/useStore';
import { HologramScreen } from './HologramScreen';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

// Component to load and clone the lighthouse model for reuse across multiple islands
function Lighthouse() {
  const { scene } = useGLTF('/models/lighthouse.glb');
  
  const clonedScene = useMemo(() => {
    if (!scene) return null;
    const cloned = scene.clone();
    cloned.traverse((child) => {
      if (child.name) {
        const name = child.name.toLowerCase();
        if (name.includes('ocean') || name.includes('cloud') || name.includes('bird') || name.includes('fly')) {
          child.visible = false;
        }
      }
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          // Adjust material to make the rock look harder and less wet/shiny
          child.material.envMapIntensity = 0.5;
          child.material.roughness = Math.max(0.8, child.material.roughness || 0.8);
          child.material.metalness = Math.min(0.1, child.material.metalness || 0.1);
          child.material.needsUpdate = true;
        }
      }
    });
    return cloned;
  }, [scene]);

  if (!clonedScene) return null;

  // Render the lighthouse model. We start with a scale of 0.2 and position it to sit on top of the island.
  // We can adjust the scale/rotation as needed once we inspect it in the browser.
  return (
    <group position={[0, 0.5, 0]} rotation={[0, 0, 0]}>
      <primitive object={clonedScene} scale={[0.02, 0.02, 0.02]} />
    </group>
  );
}

// Basic Island Component to represent the stops
function Island({ position, stopIndex, children }) {
  const currentStop = useStore((state) => state.currentStop);
  const setCurrentStop = useStore((state) => state.setCurrentStop);

  const isActive = currentStop === stopIndex;

  return (
    <group position={position}>
      {/* Island Base — explicit box collider blocks ship from passing through */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[6, 10, 6]} position={[0, 0, 0]} />
        {/* Children (props/buildings) */}
        {children}
      </RigidBody>

      {/* Dock Sensor (Triggers the UI) */}
      <RigidBody 
        type="fixed" 
        colliders={false} 
        sensor 
        onIntersectionEnter={() => setCurrentStop(stopIndex)}
        onIntersectionExit={() => setCurrentStop(-1)}
      >
        <CuboidCollider args={[8, 10, 8]} position={[0, 0, 0]} />
      </RigidBody>

    </group>
  );
}

export function WorldMap() {
  return (
    <>
      {/* STOP 1: Company Introduction */}
      <Island 
        position={[-60, 0, -60]} 
        stopIndex={1} 
        title="Meet Manifest" 
        description="The AI Operating System for Global Trading."
        color="#38bdf8"
      >
        <Lighthouse />
      </Island>

      {/* STOP 2: The Problem */}
      <Island 
        position={[65, 0, -90]} 
        stopIndex={2} 
        title="Trading Is Broken" 
        description="Legacy tools are killing your margins. Discover the pain points."
        color="#f97316"
      >
        <Lighthouse />
      </Island>

      {/* STOP 3: The Platform */}
      <Island 
        position={[-90, 0, -150]} 
        stopIndex={3} 
        title="The Platform" 
        description="Six AI-powered modules. One seamless workflow."
        color="#a855f7"
      >
        <Lighthouse />
      </Island>

      {/* STOP 4: Results & ROI */}
      <Island 
        position={[80, 0, -200]} 
        stopIndex={4} 
        title="Proven ROI" 
        description="Real results from real trading companies."
        color="#22c55e"
      >
        <Lighthouse />
      </Island>
      
      {/* Additional stops can be added simply by adding more <Island> components */}
      <Island 
        position={[0, 0, -300]} 
        stopIndex={9} 
        title="Manifest HQ" 
        description="The AI Operating System for Global Trading. Book your demo today."
        color="#0f172a"
      >
        <Lighthouse />
      </Island>
    </>
  );
}

// Preload the lighthouse model
useGLTF.preload('/models/lighthouse.glb');
