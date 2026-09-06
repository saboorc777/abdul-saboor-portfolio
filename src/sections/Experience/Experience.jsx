import { motion } from 'framer-motion';
import { experience } from '../../data/portfolioData';
import './Experience.scss';

export default function Experience() {
  return (
    <section id="experience" className="experience section">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Experience</span>
          <h2>
            Where I&apos;ve put in the work
          </h2>
        </div>

        <div className="timeline">
          {experience.map((exp, i) => (
            <motion.div
              className="timeline__item"
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="timeline__dot" />
              <div className="timeline__content card">
                <span className="timeline__duration">{exp.duration}</span>
                <h3>{exp.role}</h3>
                <p className="timeline__company">{exp.company}</p>
                <p>{exp.description}</p>
                <div className="timeline__tech">
                  {exp.tech.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
