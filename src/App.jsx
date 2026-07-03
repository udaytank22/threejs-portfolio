import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { KeyboardControls, Loader } from '@react-three/drei';
import World from './components/ThreeScene/World';
import HUD from './components/UI/HUD';
import { useStore } from './store/useStore';

const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'right', keys: ['ArrowRight', 'KeyD'] },
  { name: 'jump', keys: ['Space'] },
];

function App() {
  const started = useStore((state) => state.started);

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#87CEEB]">
      <KeyboardControls map={keyboardMap}>
        <Canvas shadows camera={{ position: [0, 20, 20], fov: 45 }}>
          <color attach="background" args={['#87CEEB']} />
          <fog attach="fog" args={['#87CEEB', 20, 100]} />
          
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
