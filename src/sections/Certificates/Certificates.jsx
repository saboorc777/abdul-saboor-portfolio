import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiDownload } from 'react-icons/fi';
import { certificates as staticCertificates } from '../../data/portfolioData';
import { certificatesApi } from '../../services/api';
import './Certificates.scss';

export default function Certificates() {
  const [certificates, setCertificates] = useState(staticCertificates);

  useEffect(() => {
    certificatesApi
      .list()
      .then(({ data }) => {
        if (Array.isArray(data) && data.length > 0) setCertificates(data);
      })
      // Backend not running, or nothing saved yet — keep showing the
      // built-in certificate list rather than an empty section.
      .catch(() => {});
  }, []);

  return (
    <section id="certificates" className="certificates section">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Certificates</span>
          <h2>
            Achievements and recognition
          </h2>
        </div>

        <div className="grid grid--3">
          {certificates.map((cert, i) => (
            <motion.div
              className="cert-card card"
              key={cert.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="cert-card__preview">
                {cert.image ? (
                  <img src={cert.image} alt={cert.title} />
                ) : (
                  <FiAward />
                )}
              </div>
              <h3>{cert.title}</h3>
              <p>{cert.issuer}</p>
              {cert.fileUrl && (
                <a href={cert.fileUrl} download className="cert-card__download">
                  <FiDownload /> Download
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
