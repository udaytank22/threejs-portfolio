import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useStore } from '../../store/useStore';
import * as THREE from 'three';

export function CameraRig() {
  const { gl, camera } = useThree();
  const isHQ = useStore((state) => state.isHQ);
  
  // Base offset angles and distance from the ship
  const angles = useRef({ azimuth: 0, polar: Math.PI / 2.2, distance: 12 });
  const isDragging = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onPointerDown = (e) => {
      isDragging.current = true;
      previousMouse.current = { x: e.clientX, y: e.clientY };
    };
    const onPointerMove = (e) => {
      if (isDragging.current) {
        const deltaX = e.clientX - previousMouse.current.x;
        const deltaY = e.clientY - previousMouse.current.y;
        
        // Update angles based on mouse movement
        angles.current.azimuth -= deltaX * 0.005;
        angles.current.polar -= deltaY * 0.005;
        
        // Clamp polar to prevent going underwater or flipping over
        angles.current.polar = Math.max(0.1, Math.min(Math.PI / 2 - 0.05, angles.current.polar));
        
        previousMouse.current = { x: e.clientX, y: e.clientY };
      }
    };
    const onPointerUp = () => {
      isDragging.current = false;
    };
    const onWheel = (e) => {
      angles.current.distance += e.deltaY * 0.02;
      angles.current.distance = Math.max(3, Math.min(100, angles.current.distance));
    };

    const dom = gl.domElement;
    dom.addEventListener('pointerdown', onPointerDown);
    dom.addEventListener('pointermove', onPointerMove);
    dom.addEventListener('pointerup', onPointerUp);
    dom.addEventListener('pointerleave', onPointerUp);
    dom.addEventListener('wheel', onWheel);

    return () => {
      dom.removeEventListener('pointerdown', onPointerDown);
      dom.removeEventListener('pointermove', onPointerMove);
      dom.removeEventListener('pointerup', onPointerUp);
      dom.removeEventListener('pointerleave', onPointerUp);
      dom.removeEventListener('wheel', onWheel);
    };
  }, [gl]);

  useFrame((state) => {
    const shipPosition = useStore.getState().shipPosition;
    const shipRotation = useStore.getState().shipRotation;
    
    if (isHQ) {
      // Drone camera mode target
      state.camera.position.lerp(new THREE.Vector3(0, 50, -150), 0.05);
      state.camera.lookAt(0, 0, -200);
    } else {
      // Combine ship's yaw rotation with user's manual mouse offset
      const totalAzimuth = shipRotation + angles.current.azimuth;
      
      // Calculate desired camera position using spherical coordinates
      const x = shipPosition[0] + angles.current.distance * Math.sin(angles.current.polar) * Math.sin(totalAzimuth);
      const y = shipPosition[1] + angles.current.distance * Math.cos(angles.current.polar);
      const z = shipPosition[2] + angles.current.distance * Math.sin(angles.current.polar) * Math.cos(totalAzimuth);
      
      const targetPos = new THREE.Vector3(x, y, z);
      
      // Smoothly interpolate to the new position
      state.camera.position.lerp(targetPos, 0.1);
      
      // Always look at the ship (slightly above its base)
      const lookAtTarget = new THREE.Vector3(shipPosition[0], shipPosition[1] + 2, shipPosition[2]);
      state.camera.lookAt(lookAtTarget);
    }
  });

  return null;
}

