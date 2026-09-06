import { motion } from 'framer-motion';
import { FiAward } from 'react-icons/fi';
import { education } from '../../data/portfolioData';
import './Education.scss';

export default function Education() {
  return (
    <section id="education" className="education section">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Education</span>
          <h2>
            Academic background
          </h2>
        </div>

        <div className="edu-list">
          {education.map((edu, i) => (
            <motion.div
              className="edu-card card"
              key={edu.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="edu-card__icon">
                <FiAward />
              </div>
              <div>
                <span className="eyebrow">{edu.duration}</span>
                <h3>{edu.degree}</h3>
                <p className="edu-card__institution">{edu.institution}</p>
                <p>{edu.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
