import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function Earth() {
  const earthRef = useRef();
  const cloudsRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (earthRef.current) {
      earthRef.current.rotation.y = t * 0.05;
      // Slight tilt
      earthRef.current.rotation.z = 0.2;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = t * 0.06;
      cloudsRef.current.rotation.z = 0.2;
    }
  });

  return (
    <group>
      {/* Base Earth Sphere */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial 
          color="#0a192f" 
          roughness={0.8}
          metalness={0.2}
          emissive="#001122"
        />
      </mesh>

      {/* Atmosphere / Clouds layer (placeholder for procedural noise or texture) */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[2.02, 64, 64]} />
        <meshStandardMaterial 
          color="#ffffff"
          transparent
          opacity={0.1}
          roughness={1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Atmospheric Glow */}
      <mesh>
        <sphereGeometry args={[2.1, 64, 64]} />
        <meshBasicMaterial 
          color="#0066ff" 
          transparent 
          opacity={0.15} 
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

function TradeRoutes() {
  const linesRef = useRef();

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      linesRef.current.rotation.z = 0.2;
    }
  });

  // Generate some random arcs for trade routes
  const lines = useMemo(() => {
    const group = new THREE.Group();
    const material = new THREE.LineBasicMaterial({ color: 0x00aaff, transparent: true, opacity: 0.6 });
    
    for (let i = 0; i < 20; i++) {
      const points = [];
      const radius = 2.05;
      const lat1 = (Math.random() - 0.5) * Math.PI;
      const lon1 = (Math.random() - 0.5) * 2 * Math.PI;
      const lat2 = (Math.random() - 0.5) * Math.PI;
      const lon2 = (Math.random() - 0.5) * 2 * Math.PI;

      // Create a bezier curve between two points on a sphere
      const p1 = new THREE.Vector3().setFromSphericalCoords(radius, lat1 + Math.PI/2, lon1);
      const p2 = new THREE.Vector3().setFromSphericalCoords(radius, lat2 + Math.PI/2, lon2);
      
      // Control point for the arc
      const cp = p1.clone().add(p2).multiplyScalar(0.5).normalize().multiplyScalar(radius + Math.random() * 0.5 + 0.2);

      const curve = new THREE.QuadraticBezierCurve3(p1, cp, p2);
      const curvePoints = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
      
      const line = new THREE.Line(geometry, material);
      group.add(line);
    }
    return group;
  }, []);

  return <primitive object={lines} ref={linesRef} />;
}

export function EarthScene() {
  return (
    <div className="w-full h-full absolute inset-0 cursor-move">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <fog attach="fog" args={['#000', 3, 10]} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 3, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-5, -3, -5]} intensity={0.5} color="#0066ff" />
        
        <Earth />
        <TradeRoutes />
        
        {/* Particle system for stars/debris */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate 
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
        
        {/* Post Processing for Cinematic Look */}
        <EffectComposer>
          <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} opacity={1.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
