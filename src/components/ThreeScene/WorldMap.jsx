import React, { useMemo } from 'react';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { useStore } from '../../store/useStore';
import { HologramScreen } from './HologramScreen';
import { useGLTF } from '@react-three/drei';

// Component to load and clone the lighthouse model for reuse across multiple islands
function Lighthouse() {
  const { scene } = useGLTF('/models/lighthouse.glb');
  
  const clonedScene = useMemo(() => {
    if (!scene) return null;
    const cloned = scene.clone();
    cloned.traverse((child) => {
      if (child.name && child.name.includes('Ocean')) {
        child.visible = false;
      }
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.envMapIntensity = 1.5;
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
function Island({ position, title, description, imagePath, stopIndex, color, children }) {
  const currentStop = useStore((state) => state.currentStop);
  const setCurrentStop = useStore((state) => state.setCurrentStop);

  const isActive = currentStop === stopIndex;

  return (
    <group position={position}>
      {/* Island Base */}
      <RigidBody type="fixed" colliders="hull">
        <mesh position={[0, -0.5, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[10, 12, 2, 8]} />
          <meshStandardMaterial color={color || "#22c55e"} roughness={0.8} />
        </mesh>
        
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
        <CuboidCollider args={[15, 10, 15]} position={[0, 0, 0]} />
      </RigidBody>

      {/* Hologram UI */}
      <HologramScreen 
        title={title} 
        description={description} 
        imagePath={imagePath} 
        isVisible={isActive} 
      />
    </group>
  );
}

export function WorldMap() {
  return (
    <>
      {/* STOP 1: AI Email Parser */}
      <Island 
        position={[-30, 0, -30]} 
        stopIndex={1} 
        title="AI Email Parser" 
        description="Emails fly into the AI machine and are parsed into Inquiries automatically."
        color="#3b82f6"
      >
        <Lighthouse />
      </Island>

      {/* STOP 2: Inquiry Management */}
      <Island 
        position={[30, 0, -40]} 
        stopIndex={2} 
        title="Inquiry Management" 
        description="Review parsed inquiries. Track status, priority, and assign to team members."
        color="#eab308"
      >
        <Lighthouse />
      </Island>

      {/* STOP 3: Quotation */}
      <Island 
        position={[-50, 0, -70]} 
        stopIndex={3} 
        title="Quotation" 
        description="Generate precise quotations instantly from your uploaded data."
        color="#f97316"
      >
        <Lighthouse />
      </Island>

      {/* STOP 4: Purchase Order */}
      <Island 
        position={[40, 0, -90]} 
        stopIndex={4} 
        title="Purchase Orders" 
        description="Manage massive POs seamlessly. Warehouses stock and prepare."
        color="#a855f7"
      >
        <Lighthouse />
      </Island>
      
      {/* Additional stops can be added simply by adding more <Island> components */}
      <Island 
        position={[0, 0, -150]} 
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
