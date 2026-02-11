import About from '@/app/_components/sections/About';
import Contacts from '../_components/sections/Contact';
import Hero from '../_components/sections/Hero';
import Projects from '../_components/sections/Projects';
import Skills from '../_components/sections/Skills';
import Experiences from '../_components/sections/Experiences';

export default function Home() {
  return (
    <div className="pt-14">
      <Hero />
      <About />
      <Skills />
      <Experiences />
      <Projects />
      <Contacts />
    </div>
  );
}
