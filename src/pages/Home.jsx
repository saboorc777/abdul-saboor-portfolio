import Hero from '../sections/Hero/Hero';
import About from '../sections/About/About';
import Skills from '../sections/Skills/Skills';
import Experience from '../sections/Experience/Experience';
import Education from '../sections/Education/Education';
import Projects from '../sections/Projects/Projects';
import Certificates from '../sections/Certificates/Certificates';
import Contact from '../sections/Contact/Contact';
import Footer from '../sections/Footer/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Projects />
      <Certificates />
      <Contact />
      <Footer />
    </>
  );
}
