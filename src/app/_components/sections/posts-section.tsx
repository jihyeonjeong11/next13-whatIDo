import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Typography } from '@/components/ui/typography';
import { source } from '@/libs/fumadocs/source';
import Link from 'next/link';

export const PostsSection = () => {
  const posts = source
    .getPages()
    .sort((a, b) => {
      const prevTime = a.data.lastModified?.getTime();
      const nextTime = b.data.lastModified?.getTime();
      if (prevTime && nextTime) return nextTime - prevTime;
      if (prevTime) return -1;
      if (nextTime) return 1;
      return 0;
    })
    .filter((p) => p.data.description && !p.data.title.includes('outdated'));

  return (
    <Container id="posts">
      <Typography variant="h2">Posts</Typography>
      {posts.map(({ data: { title, description, tags }, url }) => (
        <Card className="flex flex-col gap-4" key={title}>
          <CardHeader className="flex flex-col gap-4">
            <li className="flex">
              {tags?.map((t) => (
                <Badge variant="secondary" key={t}>
                  {t}
                </Badge>
              ))}
            </li>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{description}</CardDescription>
          </CardContent>
          <CardFooter>
            <Link href={`${url}`} className={buttonVariants({ variant: 'secondary' })}>
              Read More
            </Link>
          </CardFooter>
        </Card>
      ))}
    </Container>
  );
};
