import { motion } from 'framer-motion';
import './Loader.scss';

export default function Loader() {
  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="loader__mark">
        AS<span className="mark">.</span>
      </div>
      <div className="loader__bar">
        <motion.div
          className="loader__bar-fill"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  );
}
