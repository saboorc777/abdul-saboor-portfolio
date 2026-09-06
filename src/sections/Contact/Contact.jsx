import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FiCheckCircle } from 'react-icons/fi';
import WireframeShape from '../Hero/WireframeShape';
import './Contact.scss';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const initialForm = { name: '', email: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address.';
    if (form.message.trim().length < 10) next.message = 'Message should be at least 10 characters.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');
    try {
      if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          { from_name: form.name, from_email: form.email, message: form.message },
          EMAILJS_PUBLIC_KEY
        );
      } else {
        // EmailJS not configured yet — surface a helpful console warning in dev.
        console.warn('EmailJS env vars are not set. Add them to .env to enable sending.');
        await new Promise((res) => setTimeout(res, 700));
      }
      setStatus('sent');
      setForm(initialForm);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact section">
      <div className="contact__decor" aria-hidden="true">
        <WireframeShape className="contact__shape contact__shape--1" size={46} duration={22} />
        <WireframeShape className="contact__shape contact__shape--2" size={36} duration={18} reverse />
        <WireframeShape className="contact__shape contact__shape--3" size={40} duration={28} />
        <WireframeShape className="contact__shape contact__shape--4" size={30} duration={24} reverse />
      </div>

      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">§ Contact</span>
          <h2>
            Got an idea?<br />Let&apos;s build it.
          </h2>
        </div>

        <form className="contact__form card" onSubmit={handleSubmit} noValidate>
          <AnimatePresence mode="wait">
            {status === 'sent' ? (
              <motion.div
                key="success"
                className="contact__success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <FiCheckCircle size={48} />
                <h3>Message sent</h3>
                <p>Thanks for reaching out — I&apos;ll reply soon.</p>
                <button type="button" className="btn btn--ghost btn--sm" onClick={() => setStatus('idle')}>
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="field">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  {errors.name && <span className="field__error">{errors.name}</span>}
                </div>

                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  {errors.email && <span className="field__error">{errors.email}</span>}
                </div>

                <div className="field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                  {errors.message && <span className="field__error">{errors.message}</span>}
                </div>

                <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>

                {status === 'error' && (
                  <p className="field__error">Something went wrong. Please try again shortly.</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </section>
  );
}
