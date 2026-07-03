import React from 'react';
import { Environment, Sky } from '@react-three/drei';
import { Ship } from './Ship';
import { Ocean } from './Ocean';
import { CameraRig } from './CameraRig';
import { WorldMap } from './WorldMap';

export default function World() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        castShadow
        position={[100, 100, 50]}
        intensity={1.5}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
      />
      <Sky sunPosition={[100, 20, 100]} turbidity={0.3} rayleigh={0.5} mieCoefficient={0.005} mieDirectionalG={0.7} />
      <Environment preset="city" />

      <Ocean />
      <WorldMap />

      {/* Ship is wrapped in Rapier rigid body inside the component */}
      <Ship />

      <CameraRig />
    </>
  );
}
