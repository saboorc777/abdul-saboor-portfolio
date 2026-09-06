import { useEffect, useState } from 'react';
import { personalInfo } from '../../data/portfolioData';
import './Footer.scss';

const links = [
  { label: 'GitHub', href: personalInfo.github },
  { label: 'LinkedIn', href: personalInfo.linkedin },
  { label: 'WhatsApp', href: personalInfo.whatsapp },
  { label: 'Email', href: `mailto:${personalInfo.email}` },
];

function useLocalClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Karachi',
      })
        .format(new Date())
        .toUpperCase() + ' PKT';

    setTime(format());
    const id = setInterval(() => setTime(format()), 30000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export default function Footer() {
  const year = new Date().getFullYear();
  const time = useLocalClock();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <a href="#home" className="footer__logo">
            Abdul<span className="mark">Saboor</span>
          </a>
          <p className="footer__status">
            <span className="footer__dot" />
            status: open to internships &amp; freelance work
          </p>
        </div>

        <div className="footer__links-col">
          <div className="footer__links-stack">
            {links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>

          <div className="footer__meta-stack">
            {time && <span className="footer__time">{time}</span>}
            <a href="#home" className="footer__top">
              back to top ↑
            </a>
          </div>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>built &amp; maintained by {personalInfo.name} · © {year}</span>
        <span className="footer__stack">react · vite · three.js</span>
      </div>
    </footer>
  );
}
