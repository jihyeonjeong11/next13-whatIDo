//import { Suspense } from 'react';
//import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { AboutSection } from '../_components/sections/about-section';
import { SkillsSection } from '../_components/sections/skills-section';
import { ExperiencesSection } from '../_components/sections/experiences-section';
//import { BlogGraphSection } from '../_components/sections/blog-graph-section';
import { PostsSection } from '../_components/sections/posts-section';

//import CanvasSection from '../_components/sections/CanvasSection';

export default function Home() {
  return (
    <div className="pt-14">
      <AboutSection />
      <SkillsSection />
      <ExperiencesSection />
      <PostsSection />
      {/* <Suspense fallback={<Skeleton count={1} height={500} />}>
        <BlogGraphSection />
      </Suspense> */}
      {/* <CanvasSection /> */}
    </div>
  );
}
