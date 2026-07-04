import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { KeyboardControls, Loader } from '@react-three/drei';
import World from './components/ThreeScene/World';
import HUD from './components/UI/HUD';
import { useStore } from './store/useStore';
import { getTheme } from './utils/theme';

const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'right', keys: ['ArrowRight', 'KeyD'] },
  { name: 'jump', keys: ['Space'] },
];

function App() {
  const started = useStore((state) => state.started);
  const theme = getTheme();

  return (
    <div className="w-screen h-screen overflow-hidden" style={{ backgroundColor: theme.skyColor }}>
      <KeyboardControls map={keyboardMap}>
        <Canvas shadows camera={{ position: [0, 20, 20], fov: 45 }}>
          <color attach="background" args={[theme.skyColor]} />
          <fog attach="fog" args={[theme.fogColor, 30, 400]} />
          
          <Suspense fallback={null}>
            <Physics timeStep="vary" gravity={[0, -9.81, 0]}>
              <World />
            </Physics>
          </Suspense>
        </Canvas>
        <HUD />
      </KeyboardControls>
      <Loader />
    </div>
  );
}

export default App;
