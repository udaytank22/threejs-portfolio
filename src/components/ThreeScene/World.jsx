import React from 'react';
import { Environment, Sky } from '@react-three/drei';
import { Ship } from './Ship';
import { Ocean } from './Ocean';
import { CameraRig } from './CameraRig';
import { WorldMap } from './WorldMap';
import { getTheme } from '../../utils/theme';

export default function World() {
  const theme = getTheme();
  return (
    <>
      <ambientLight intensity={theme.ambientIntensity} />
      <directionalLight
        castShadow
        position={theme.sunPosition}
        intensity={theme.directionalIntensity}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
      />
      <Sky sunPosition={theme.sunPosition} turbidity={0.3} rayleigh={theme.rayleigh} mieCoefficient={theme.mieCoefficient} mieDirectionalG={0.7} />
      <Environment preset={theme.period === 'night' ? 'night' : 'city'} />

      <Ocean />
      <WorldMap />

      {/* Ship is wrapped in Rapier rigid body inside the component */}
      <Ship />

      <CameraRig />
    </>
  );
}
