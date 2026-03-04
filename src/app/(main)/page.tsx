import About from '@/app/_components/sections/About';
// import Projects from '../_components/sections/Projects';
import Skills from '../_components/sections/Skills';
import Experiences from '../_components/sections/Experiences';
import BlogGraphSection from '../_components/sections/BlogGraphSection';
import { Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

//import CanvasSection from '../_components/sections/CanvasSection';

export default function Home() {
  return (
    <div className="pt-14">
      <About />
      <Skills />
      <Experiences />
      <Suspense fallback={<Skeleton count={1} height={500} />}>
        <BlogGraphSection />
      </Suspense>
      {/* <CanvasSection /> */}
    </div>
  );
}
