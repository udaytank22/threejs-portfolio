import React from 'react';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { useStore } from '../../store/useStore';
import { HologramScreen } from './HologramScreen';

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

export function Islands() {
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
        <mesh position={[0, 1, 0]} castShadow>
          <boxGeometry args={[4, 4, 4]} />
          <meshStandardMaterial color="#60a5fa" />
        </mesh>
      </Island>

      {/* STOP 2: Inquiry Management */}
      <Island 
        position={[30, 0, -40]} 
        stopIndex={2} 
        title="Inquiry Management" 
        description="Review parsed inquiries. Track status, priority, and assign to team members."
        color="#eab308"
      >
        <mesh position={[-2, 1, 2]} castShadow><boxGeometry args={[2, 2, 4]} /><meshStandardMaterial color="#facc15" /></mesh>
        <mesh position={[2, 1, -1]} castShadow><boxGeometry args={[2, 2, 4]} /><meshStandardMaterial color="#facc15" /></mesh>
      </Island>

      {/* STOP 3: Quotation */}
      <Island 
        position={[-50, 0, -70]} 
        stopIndex={3} 
        title="Quotation" 
        description="Generate precise quotations instantly from your uploaded data."
        color="#f97316"
      >
        {/* Crane mock */}
        <mesh position={[0, 4, 0]} castShadow><boxGeometry args={[1, 8, 1]} /><meshStandardMaterial color="#333" /></mesh>
        <mesh position={[2, 7.5, 0]} castShadow><boxGeometry args={[6, 0.5, 0.5]} /><meshStandardMaterial color="#eab308" /></mesh>
      </Island>

      {/* STOP 4: Purchase Order */}
      <Island 
        position={[40, 0, -90]} 
        stopIndex={4} 
        title="Purchase Orders" 
        description="Manage massive POs seamlessly. Warehouses stock and prepare."
        color="#a855f7"
      >
        {/* Warehouse mock */}
        <mesh position={[0, 2, 0]} castShadow><boxGeometry args={[10, 4, 8]} /><meshStandardMaterial color="#9333ea" /></mesh>
      </Island>
      
      {/* Additional stops can be added simply by adding more <Island> components */}
      <Island 
        position={[0, 0, -150]} 
        stopIndex={9} 
        title="Manifest HQ" 
        description="The AI Operating System for Global Trading. Book your demo today."
        color="#0f172a"
      >
        {/* HQ mock */}
        <mesh position={[0, 6, 0]} castShadow><boxGeometry args={[8, 12, 8]} /><meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} /></mesh>
      </Island>
    </>
  );
}
