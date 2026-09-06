import { motion } from 'framer-motion';

/**
 * A small wireframe cube that slowly tumbles in place. Purely decorative —
 * rendered with aria-hidden by the parent. Pure SVG, no 3D engine needed,
 * so it's essentially free performance-wise.
 */
export default function WireframeShape({ className = '', size = 64, duration = 24, reverse = false }) {
  return (
    <motion.svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      <g stroke="currentColor" strokeWidth="1.1" opacity="0.55">
        <rect x="25" y="25" width="50" height="50" />
        <rect x="10" y="40" width="50" height="50" />
        <line x1="25" y1="25" x2="10" y2="40" />
        <line x1="75" y1="25" x2="60" y2="40" />
        <line x1="75" y1="75" x2="60" y2="90" />
        <line x1="25" y1="75" x2="10" y2="90" />
      </g>
    </motion.svg>
  );
}
