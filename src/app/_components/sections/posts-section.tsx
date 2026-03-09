import { source } from '@/libs/fumadocs/source';

export const PostsSection = () => {
  const posts = source.getPages().sort((a, b) => {
    const prevTime = a.data.lastModified?.getTime();
    const nextTime = b.data.lastModified?.getTime();
    if (prevTime && nextTime) return nextTime - prevTime;
    if (prevTime) return -1;
    if (nextTime) return 1;
    return 0;
  });
  posts.map((e) => {
    console.log(e.data);
    return [];
  });

  return <></>;
};
