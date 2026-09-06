import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { personalInfo, stats } from '../../data/portfolioData';
import Counter from '../../components/Counter/Counter';
import WireframeShape from './WireframeShape';
import './Hero.scss';

const ROLES = ['Full Stack Developer', 'React Developer', 'CS Student', 'ML Enthusiast'];

function useTypingEffect(words, speed = 90, pause = 1400) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          const next = current.slice(0, text.length + 1);
          setText(next);
          if (next === current) setTimeout(() => setDeleting(true), pause);
        } else {
          const next = current.slice(0, text.length - 1);
          setText(next);
          if (next === '') {
            setDeleting(false);
            setWordIndex((i) => i + 1);
          }
        }
      },
      deleting ? speed / 2 : speed
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, speed, pause]);

  return text;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const typed = useTypingEffect(ROLES);

  return (
    <section id="home" className="hero section">
      <div className="hero__decor" aria-hidden="true">
        <WireframeShape className="hero__shape hero__shape--1" size={78} duration={26} />
        <WireframeShape className="hero__shape hero__shape--2" size={54} duration={20} reverse />
        <WireframeShape className="hero__shape hero__shape--3" size={64} duration={32} />
      </div>

      <motion.div
        className="hero__content container"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.span className="hero__badge" variants={item}>
          <span className="hero__badge-dot" />
          Student · Full Stack Developer
        </motion.span>

        <motion.h1 variants={item}>
          I Build Things
          <br />
          That Actually <span className="hero__highlight">Work.</span>
        </motion.h1>

        <motion.p className="hero__role" variants={item}>
          <span className="hero__typed">{typed}</span>
          <span className="hero__cursor" aria-hidden="true" />
        </motion.p>

        <motion.p className="hero__desc" variants={item}>
          {personalInfo.tagline}
        </motion.p>

        <motion.div className="hero__cta" variants={item}>
          <div className="hero__cta-primary">
            <a href="#work" className="btn btn--primary">
              View Projects →
            </a>
            <span className="hero__hint">Drag / Scroll To Explore</span>
          </div>
          <a href="#contact" className="btn btn--ghost">
            Get In Touch
          </a>
        </motion.div>

        <motion.div className="hero__socials" variants={item}>
          <a href={personalInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <FiGithub />
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FiLinkedin />
          </a>
          <a href={personalInfo.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp">
            <FaWhatsapp />
          </a>
          <a href={`mailto:${personalInfo.email}`} aria-label="Email">
            <FiMail />
          </a>
        </motion.div>

        <motion.div className="hero__stats" variants={item}>
          {stats.map((s) => (
            <div className="hero__stat" key={s.label}>
              <Counter to={s.value} />
              <span>{s.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        className="hero__scroll"
        aria-label="Scroll to About section"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <FiArrowDown />
      </motion.a>
    </section>
  );
}
