import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import './AuroraBackground.scss';

const CUBES = [
  { pos: [-3.5, 1.2, -2], size: 0.9, speed: 0.12 },
  { pos: [3.2, 2.4, -4], size: 1.3, speed: 0.08 },
  { pos: [-2, -0.8, -3], size: 0.55, speed: 0.18 },
  { pos: [2.6, -1.6, -2.5], size: 0.7, speed: 0.15 },
  { pos: [0, 3, -6], size: 1.6, speed: 0.06 },
];

function WireCube({ pos, size, speed }) {
  const ref = useRef(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * speed;
    ref.current.rotation.y += delta * speed * 1.4;
  });

  return (
    <lineSegments ref={ref} position={pos}>
      <edgesGeometry args={[new THREE.BoxGeometry(size, size, size)]} />
      <lineBasicMaterial color="#e0aa4f" transparent opacity={0.55} />
    </lineSegments>
  );
}

/** Grid floor that recedes toward a horizon, like the reference site. */
function GridFloor() {
  return (
    <gridHelper
      args={[60, 40, '#4fae87', '#1e2a24']}
      position={[0, -3.2, 0]}
    />
  );
}

/** Ties the camera's dolly to page scroll so the scene subtly "zooms" as you scroll — a cheap, safe parallax that never hijacks wheel/touch input. */
function ScrollZoomCamera() {
  useFrame((state) => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    const targetZ = 9 - progress * 4.5;
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.05;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function AuroraBackground() {
  const cubes = useMemo(() => CUBES, []);

  return (
    <div className="aurora-bg" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 1, 9], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Stars radius={60} depth={30} count={1800} factor={2} saturation={0} fade speed={0.4} />
        <GridFloor />
        {cubes.map((c, i) => (
          <WireCube key={i} pos={c.pos} size={c.size} speed={c.speed} />
        ))}
        <ScrollZoomCamera />
      </Canvas>
    </div>
  );
}
