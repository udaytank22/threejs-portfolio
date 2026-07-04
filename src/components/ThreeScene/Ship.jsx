import React, { useRef, useState, useMemo, useEffect, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls, Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { RigidBody, vec3 } from '@react-three/rapier';
import { useStore } from '../../store/useStore';

// Premium GLB loader component
function PremiumShipModel({ bobRef }) {
  const { scene } = useGLTF('/models/container_ship.glb');

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
            child.material.envMapIntensity = 2.0;
            child.material.needsUpdate = true;
          }
        }
      });
    }
  }, [scene]);

  return (
    <group ref={bobRef}>
      <group rotation={[0, Math.PI / 2, 0]}>
        <primitive object={scene} scale={[0.1, 0.1, 0.1]} position={[0, 0, 0]} />
      </group>
    </group>
  );
}

// Fallback when the model file is not found
function PlaceholderShip() {
  return (
    <group>
      <mesh position={[0, 0.5, 1]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 1.2, 8]} />
        <meshStandardMaterial color="#4a90e2" wireframe />
      </mesh>
      <Html position={[0, 3, 1]} center>
        <div style={{
          background: 'rgba(0,0,0,0.85)',
          color: 'white',
          padding: '16px',
          borderRadius: '8px',
          width: '320px',
          textAlign: 'center',
          backdropFilter: 'blur(8px)',
          border: '1px solid #4a90e2',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>⚓ Awaiting AAA Ship Model</h3>
          <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.5', color: '#cbd5e1' }}>
            Please drop your premium <b>container_ship.glb</b> file into the<br />
            <code style={{ background: '#1e293b', padding: '2px 6px', borderRadius: '4px', display: 'inline-block', marginTop: '6px' }}>public/models/</code> folder to activate it.
          </p>
        </div>
      </Html>
    </group>
  );
}

export function Ship() {
  const bodyRef = useRef();
  const bobRef = useRef();          // visual bobbing group
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const started = useStore((state) => state.started);

  const [modelExists, setModelExists] = useState(null);

  useEffect(() => {
    // Check if the GLB file exists and isn't just the Vite HTML fallback
    fetch('/models/container_ship.glb', { method: 'HEAD' })
      .then(res => {
        const contentType = res.headers.get('content-type');
        // Vite's SPA fallback serves index.html (text/html) for missing assets
        if (res.ok && contentType && !contentType.includes('text/html')) {
          setModelExists(true);
        } else {
          setModelExists(false);
        }
      })
      .catch(() => setModelExists(false));
  }, []);

  const shipSpeed = 20;
  const turnSpeed = 2.5;

  useFrame((state, delta) => {
    if (!bodyRef.current || !started) return;

    // Handle docked state
    const isDocked = useStore.getState().isDocked;
    const linvel = bodyRef.current.linvel();

    if (isDocked) {
      // Bring the ship to a halt quickly
      bodyRef.current.setLinvel({
        x: THREE.MathUtils.lerp(linvel.x, 0, 0.1),
        y: linvel.y,
        z: THREE.MathUtils.lerp(linvel.z, 0, 0.1)
      }, true);
      bodyRef.current.setAngvel({ x: 0, y: THREE.MathUtils.lerp(bodyRef.current.angvel().y, 0, 0.1), z: 0 }, true);
      return;
    }

    const { forward, backward, left, right } = getKeys();
    const rotation = bodyRef.current.rotation();
    const euler = new THREE.Euler().setFromQuaternion(new THREE.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w));

    // Handle turning
    let turnForce = 0;
    if (left) turnForce += turnSpeed;
    if (right) turnForce -= turnSpeed;

    // Apply angular velocity for turning
    bodyRef.current.setAngvel({ x: 0, y: turnForce, z: 0 }, true);

    // Handle forward/backward movement
    let speed = 0;
    if (forward) speed -= shipSpeed;
    if (backward) speed += shipSpeed;

    // Calculate forward vector based on current rotation
    const direction = new THREE.Vector3(0, 0, speed).applyEuler(euler);

    // Smoothly interpolate current velocity towards the target direction
    const newLinvelX = THREE.MathUtils.lerp(linvel.x, direction.x, 0.1);
    const newLinvelZ = THREE.MathUtils.lerp(linvel.z, direction.z, 0.1);

    bodyRef.current.setLinvel({
      x: newLinvelX,
      y: linvel.y,
      z: newLinvelZ
    }, true);

    // Update global store with ship position, rotation and speed for camera and UI without re-rendering
    const pos = bodyRef.current.translation();
    const currentSpeed = Math.hypot(linvel.x, linvel.z);
    useStore.setState({ 
      shipPosition: [pos.x, pos.y, pos.z], 
      shipRotation: euler.y,
      shipSpeed: currentSpeed
    });

    // ── Visual bobbing (heave + pitch + roll) ──
    if (bobRef.current) {
      const t = state.clock.elapsedTime;
      const speed = Math.hypot(linvel.x, linvel.z); // 0 when still
      const motionScale = Math.min(speed / 5, 1);   // ramp up with speed

      // Ship is stable — no bobbing
      bobRef.current.position.y = 0;
      bobRef.current.rotation.x = 0;
      bobRef.current.rotation.z = 0;
    }
  });

  return (
    <RigidBody
      ref={bodyRef}
      position={[0, -0.25, 20]}
      colliders="hull"
      mass={10}
      linearDamping={1}
      angularDamping={2}
      lockRotations={false}
      enabledRotations={[false, true, false]}
      enabledTranslations={[true, false, true]}
    >
      {modelExists === true ? (
        <Suspense fallback={<PlaceholderShip />}>
          <PremiumShipModel bobRef={bobRef} />
        </Suspense>
      ) : (
        <PlaceholderShip />
      )}
    </RigidBody>
  );
}
