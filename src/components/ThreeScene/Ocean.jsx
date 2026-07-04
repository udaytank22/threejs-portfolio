import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getTheme } from '../../utils/theme';

export function Ocean() {
  const matRef = useRef();

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  const onBeforeCompile = (shader) => {
    shader.uniforms.uTime = { value: 0 };
    matRef.current = shader;

    // ── 1. Declare uniforms + wave helpers ─────────────────────────────────
    shader.vertexShader = shader.vertexShader.replace(
      '#include <common>',
      `#include <common>
      uniform float uTime;

      // PlaneGeometry lies in local XY, so we sample waves from position.xy
      // (= world XZ after the -PI/2 X rotation on the mesh).
      float waveH(vec2 p, vec2 d, float freq, float spd, float amp) {
        return amp * sin(dot(d, p) * freq + uTime * spd);
      }
      float waveDx(vec2 p, vec2 d, float freq, float spd, float amp) {
        return amp * freq * d.x * cos(dot(d, p) * freq + uTime * spd);
      }
      float waveDy(vec2 p, vec2 d, float freq, float spd, float amp) {
        return amp * freq * d.y * cos(dot(d, p) * freq + uTime * spd);
      }`
    );

    // ── 2. Displace in local Z (= world Y / upward after mesh rotation) ────
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
      vec2 wp = position.xy;   // local XY → world XZ

      // 4 wave layers: (direction, frequency, speed, amplitude)
      transformed.z += waveH(wp, normalize(vec2( 1.0,  0.6)), 0.04, 0.50, 0.015);
      transformed.z += waveH(wp, normalize(vec2(-0.7,  1.0)), 0.07, 0.70, 0.01);
      transformed.z += waveH(wp, normalize(vec2( 0.3, -1.0)), 0.15, 1.20, 0.005);
      transformed.z += waveH(wp, normalize(vec2( 0.8,  0.8)), 0.22, 1.80, 0.002);
      `
    );

    // ── 3. Recompute surface normals analytically ──────────────────────────
    // For local-Z displacement: tangents = (1,0,dzdx) and (0,1,dzdy)
    // → objectNormal = normalize(cross) = normalize(-dzdx, -dzdy, 1)
    shader.vertexShader = shader.vertexShader.replace(
      '#include <beginnormal_vertex>',
      `
      vec2 _p = position.xy;

      float dzdx =
        waveDx(_p, normalize(vec2( 1.0,  0.6)), 0.04, 0.50, 0.015) +
        waveDx(_p, normalize(vec2(-0.7,  1.0)), 0.07, 0.70, 0.01) +
        waveDx(_p, normalize(vec2( 0.3, -1.0)), 0.15, 1.20, 0.005) +
        waveDx(_p, normalize(vec2( 0.8,  0.8)), 0.22, 1.80, 0.002);

      float dzdy =
        waveDy(_p, normalize(vec2( 1.0,  0.6)), 0.04, 0.50, 0.015) +
        waveDy(_p, normalize(vec2(-0.7,  1.0)), 0.07, 0.70, 0.01) +
        waveDy(_p, normalize(vec2( 0.3, -1.0)), 0.15, 1.20, 0.005) +
        waveDy(_p, normalize(vec2( 0.8,  0.8)), 0.22, 1.80, 0.002);

      // Correct normal for local-Z-displaced XY plane
      vec3 objectNormal = normalize(vec3(-dzdx, -dzdy, 1.0));

      #ifdef USE_TANGENT
        vec3 objectTangent = vec3(tangent.xyz);
      #endif
      `
    );
  };
  const theme = getTheme();
  
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
      <planeGeometry args={[1000, 1000, 128, 128]} />
      <meshStandardMaterial
        color={theme.oceanColor}
        roughness={0.25}       // some specular highlights
        metalness={0.15}       // low metal — avoids dark environment pickup
        transparent
        opacity={0.92}
        onBeforeCompile={onBeforeCompile}
      />
    </mesh>
  );
}
