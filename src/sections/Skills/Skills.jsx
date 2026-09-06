import { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { skills } from '../../data/portfolioData';
import SkillOrb from './SkillOrb';
import './Skills.scss';

const SPHERE_RADIUS = 3.4;

/** Distributes N points roughly evenly across a sphere (golden-angle spiral). */
function useSpherePositions(count, radius = SPHERE_RADIUS) {
  return useMemo(() => {
    const points = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      points.push([Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius]);
    }
    return points;
  }, [count, radius]);
}

export default function Skills() {
  const positions = useSpherePositions(skills.length);

  return (
    <section id="skills" className="skills section">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Skills</span>
          <h2>
            Drag to spin. Everything here has shipped in a real project.
          </h2>
          <p className="skills__hint">drag to rotate · scroll to zoom</p>
        </div>
      </div>

      <div className="skills__canvas-wrap">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
          <Suspense fallback={null}>
            <mesh>
              <sphereGeometry args={[SPHERE_RADIUS, 14, 10]} />
              <meshBasicMaterial color="#4fae87" wireframe transparent opacity={0.22} />
            </mesh>
            {skills.map((skill, i) => (
              <SkillOrb key={skill.name} skill={skill} position={positions[i]} />
            ))}
          </Suspense>
          <OrbitControls
            enableZoom
            minDistance={5}
            maxDistance={12}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.6}
          />
        </Canvas>
      </div>

      <div className="visually-hidden">
        <h3>Skills list</h3>
        <ul>
          {skills.map((skill) => (
            <li key={skill.name}>{skill.name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
