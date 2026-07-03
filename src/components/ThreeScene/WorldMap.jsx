import React from 'react';
import { useGLTF, Cloud, Sparkles } from '@react-three/drei';
import { Port } from './Port';
import { RigidBody } from '@react-three/rapier';

export function WorldMap() {
  // Load the environment assets
  const greekHarbor = useGLTF('/models/ancient_greek_harbor.glb');
  const lighthouse = useGLTF('/models/free_old_style_lighthouse_assets_fixed.glb');
  const coast = useGLTF('/models/harbor_and_coast_ver2.0.glb');
  const beacon = useGLTF('/models/harbour_beacon_and_rescue_vessel_ver.2.0.glb');
  const wharf = useGLTF('/models/wharf_at_pipi_island_seaside_coast.glb');

  // Helper to ensure models cast/receive shadows (optional, based on performance)
  React.useEffect(() => {
    [greekHarbor, lighthouse, coast, beacon, wharf].forEach((model) => {
      model.scene.traverse((child) => {
        if (child.isMesh) {
          child.receiveShadow = true;
          child.castShadow = true;
        }
      });
    });
  }, [greekHarbor, lighthouse, coast, beacon, wharf]);

  return (
    <group>
      {/* Atmosphere / Details */}
      <Cloud position={[0, 100, -300]} speed={0.2} opacity={0.5} segments={40} />
      <Cloud position={[-200, 80, -700]} speed={0.1} opacity={0.3} segments={40} />
      <Sparkles count={500} scale={[400, 20, 1200]} position={[0, 10, -500]} speed={0.3} opacity={0.4} />
      {/* --------------------------------------------------
          1. AI Email Parser Port
          -------------------------------------------------- */}
      <Port 
        portIndex={1}
        position={[-100, 0, -100]}
        title="AI Email Parser"
        description="Incoming emails are automatically parsed by AI, turning unstructured data into organized inquiries without manual data entry."
        imagePath="/assets/images/img1.png"
      >
        <primitive object={lighthouse.scene.clone()} scale={[2, 2, 2]} position={[0, -2, -20]} />
        <primitive object={wharf.scene.clone()} scale={[5, 5, 5]} position={[20, -5, 0]} rotation={[0, Math.PI / 2, 0]} />
      </Port>

      {/* --------------------------------------------------
          2. Inquiry Management Port
          -------------------------------------------------- */}
      <Port 
        portIndex={2}
        position={[100, 0, -200]}
        title="Inquiry Management"
        description="Review parsed inquiries. Track status, priority, and assign workflows seamlessly across your team."
        imagePath="/assets/images/img2.png"
      >
        <primitive object={coast.scene.clone()} scale={[0.5, 0.5, 0.5]} position={[0, -5, -30]} rotation={[0, -Math.PI / 4, 0]} />
      </Port>

      {/* --------------------------------------------------
          3. Purchase Orders Port
          -------------------------------------------------- */}
      <Port 
        portIndex={3}
        position={[-150, 0, -350]}
        title="Purchase Orders"
        description="Create, track, and manage complex purchase orders with ease. Automate approvals and monitor history."
        imagePath="/assets/images/img3.png"
      >
        <primitive object={greekHarbor.scene.clone()} scale={[1, 1, 1]} position={[0, -2, -50]} />
      </Port>

      {/* --------------------------------------------------
          4. Supply & Vendor Port
          -------------------------------------------------- */}
      <Port 
        portIndex={4}
        position={[150, 0, -450]}
        title="Supply & Vendor"
        description="Manage your entire vendor ecosystem. Keep track of suppliers, available items, and streamline procurement."
        imagePath="/assets/images/img4.png"
      >
        <primitive object={wharf.scene.clone()} scale={[8, 8, 8]} position={[0, -5, -20]} rotation={[0, Math.PI, 0]} />
        <primitive object={lighthouse.scene.clone()} scale={[1.5, 1.5, 1.5]} position={[40, -2, -20]} />
      </Port>

      {/* --------------------------------------------------
          5. Shipment Tracking Port
          -------------------------------------------------- */}
      <Port 
        portIndex={5}
        position={[-50, 0, -600]}
        title="Shipment Tracking"
        description="Live tracking of containers, ETAs, and routes. Keep a bird's-eye view of your global logistics operations."
        imagePath="/assets/images/img5.png"
      >
        <primitive object={coast.scene.clone()} scale={[0.8, 0.8, 0.8]} position={[-30, -5, -40]} rotation={[0, Math.PI / 2, 0]} />
        <primitive object={beacon.scene.clone()} scale={[3, 3, 3]} position={[30, 0, 0]} />
      </Port>

      {/* --------------------------------------------------
          6. Invoice Management Port
          -------------------------------------------------- */}
      <Port 
        portIndex={6}
        position={[200, 0, -750]}
        title="Invoice Management"
        description="Streamline your billing and payments. Track aged receivables and manage corporate finances effortlessly."
        imagePath="/assets/images/img6.png"
      >
        <primitive object={greekHarbor.scene.clone()} scale={[1.2, 1.2, 1.2]} position={[0, -2, -40]} rotation={[0, -Math.PI / 2, 0]} />
      </Port>

      {/* --------------------------------------------------
          7. Employee Management Port
          -------------------------------------------------- */}
      <Port 
        portIndex={7}
        position={[-200, 0, -850]}
        title="Employee Management"
        description="Organize your workforce. Manage departments, define roles, and assign strict permissions for ultimate security."
        imagePath="/assets/images/img7.png"
      >
        <primitive object={wharf.scene.clone()} scale={[6, 6, 6]} position={[0, -5, -20]} />
        <primitive object={lighthouse.scene.clone()} scale={[2.5, 2.5, 2.5]} position={[-50, -2, -30]} />
      </Port>

      {/* --------------------------------------------------
          8. Manifest HQ
          -------------------------------------------------- */}
      <Port 
        portIndex={8}
        position={[0, 0, -1100]}
        title="Manifest Headquarters"
        description="The ultimate AI Operating System for Global Trading. Unify your entire logistics pipeline."
        imagePath="/assets/images/img1.png" // Reusing img1 for HQ dashboard view
      >
        <primitive object={coast.scene.clone()} scale={[1.5, 1.5, 1.5]} position={[0, -5, -80]} />
        <primitive object={beacon.scene.clone()} scale={[5, 5, 5]} position={[-60, 0, 20]} />
        <primitive object={beacon.scene.clone()} scale={[5, 5, 5]} position={[60, 0, 20]} />
        <primitive object={greekHarbor.scene.clone()} scale={[2, 2, 2]} position={[0, -2, -150]} />
      </Port>

      {/* --------------------------------------------------
          DECORATIVE BACKGROUND ELEMENTS (Scattered Assets)
          -------------------------------------------------- */}
      <RigidBody type="fixed" colliders="hull">
        <primitive object={beacon.scene.clone()} scale={[2, 2, 2]} position={[-40, 0, -40]} />
        <primitive object={beacon.scene.clone()} scale={[2, 2, 2]} position={[60, 0, -120]} />
        <primitive object={beacon.scene.clone()} scale={[2, 2, 2]} position={[-90, 0, -250]} />
      </RigidBody>
      
      {/* Invisible walls or colliders can be added to the environment to prevent sailing off the edge, if necessary */}
      
    </group>
  );
}

// Preload models for performance
useGLTF.preload('/models/ancient_greek_harbor.glb');
useGLTF.preload('/models/free_old_style_lighthouse_assets_fixed.glb');
useGLTF.preload('/models/harbor_and_coast_ver2.0.glb');
useGLTF.preload('/models/harbour_beacon_and_rescue_vessel_ver.2.0.glb');
useGLTF.preload('/models/wharf_at_pipi_island_seaside_coast.glb');
