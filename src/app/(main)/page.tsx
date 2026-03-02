import About from '@/app/_components/sections/About';
// import Projects from '../_components/sections/Projects';
import Skills from '../_components/sections/Skills';
import Experiences from '../_components/sections/Experiences';
import BlogGraphSection from '../_components/sections/BlogGraphSection';
//import CanvasSection from '../_components/sections/CanvasSection';

export default function Home() {
  return (
    <div className="pt-14">
      <About />
      <Skills />
      <Experiences />
      <BlogGraphSection />
      {/* <CanvasSection /> */}
    </div>
  );
}
