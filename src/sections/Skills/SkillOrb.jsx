import { Html } from '@react-three/drei';

const CATEGORY_COLORS = {
  Language: '#4fae87',
  Frontend: '#6bc79f',
  Backend: '#4fae87',
  Database: '#e0aa4f',
  ML: '#e0aa4f',
  Tools: '#9aa39c',
};

/**
 * A single skill label positioned on the wireframe globe. No mesh of its
 * own — just an HTML pill placed at a precomputed sphere point, scaled by
 * perspective (drei's distanceFactor) so labels near the camera read
 * larger, exactly like a real point on a rotating globe.
 */
export default function SkillOrb({ skill, position }) {
  const color = CATEGORY_COLORS[skill.category] ?? '#4fae87';

  return (
    <Html position={position} center distanceFactor={9} style={{ pointerEvents: 'none' }}>
      <div className="skill-orb-label" style={{ '--pill-color': color }}>
        {skill.name}
      </div>
    </Html>
  );
}
