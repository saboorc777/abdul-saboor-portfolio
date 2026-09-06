import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiBookOpen, FiCode, FiTarget } from 'react-icons/fi';
import { personalInfo } from '../../data/portfolioData';
import { profileApi } from '../../services/api';
import './About.scss';

const facts = [
  { icon: <FiBookOpen />, label: 'Education', value: 'BS Computer Science, QUEST Nawabshah' },
  { icon: <FiCode />, label: 'Focus', value: 'Full Stack Web Development' },
  { icon: <FiMapPin />, label: 'Based in', value: personalInfo.location },
  { icon: <FiTarget />, label: 'Currently', value: 'Open to internships & freelance work' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function About() {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    profileApi
      .get()
      .then(({ data }) => setPhotoUrl(data.photoUrl))
      .catch(() => setPhotoUrl(null)); // backend not running / no photo set yet — falls back to initials
  }, []);

  return (
    <section id="about" className="about section">
      <div className="container about__grid">
        <motion.div
          className="about__visual"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
        >
          <div className="about__frame">
            <div className="about__frame-glow" />
            {photoUrl ? (
              <img src={photoUrl} alt={personalInfo.name} className="about__frame-photo" />
            ) : (
              <div className="about__frame-placeholder">
                {personalInfo.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="section-heading">
            <span className="eyebrow">About Me</span>
            <h2>
              Building modern web experiences, one detail at a time
            </h2>
          </div>

          <p className="about__lead">
            I&apos;m {personalInfo.name}, a Full Stack Developer and Computer Science student at QUEST
            Nawabshah. I enjoy turning ideas into clean, responsive, and interactive products &mdash;
            from frontend interfaces to the databases and APIs that power them.
          </p>
          <p>
            My goal is to build digital experiences that feel fast, elegant and genuinely useful, and
            to keep sharpening that craft with every project I ship.
          </p>

          <div className="about__facts">
            {facts.map((fact) => (
              <div className="about__fact" key={fact.label}>
                <span className="about__fact-icon">{fact.icon}</span>
                <div>
                  <span className="about__fact-label">{fact.label}</span>
                  <span className="about__fact-value">{fact.value}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
