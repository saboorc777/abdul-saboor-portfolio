import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiBookOpen, FiCode, FiTarget } from 'react-icons/fi';
import { personalInfo } from '../../data/portfolioData';
 import { profileApi, resolveAssetUrl } from '../../services/api';
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
              <img src={resolveAssetUrl(photoUrl)} alt={personalInfo.name} className="about__frame-photo" />
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
              Building Modern Web Experiences, One Detail At a Time
            </h2>
          </div>

          <p className="about__lead">
            I&apos;m {personalInfo.name}, A Full Stack Developer And Computer Science Student At QUEST
            Nawabshah. I Enjoy Turning Ideas Into Clean, Responsive, And Interactive Products &mdash;
            From Frontend Interfaces To The Databases And APIs That Power Them.
          </p>
          <p>
            My Goal Is To Build Digital Experiences That Feel Fast, Elegant And Genuinely Useful, And
            To Keep Sharpening That Craft With Every Project I Ship.
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
