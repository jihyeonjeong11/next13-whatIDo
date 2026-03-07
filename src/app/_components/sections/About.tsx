'use client';

import { Mail } from 'lucide-react';
import Container from '@/components/ui/container';
import Typography from '@/components/ui/typography';
import Image from 'next/image';

const About = () => {
  return (
    <Container id="about">
      <div className="flex flex-col gap-6">
        <Typography variant="h2">안녕하세요! 웹 개발자 정지현입니다.👋</Typography>
        <Typography variant="body2">
          끊임없는 학습과 이해를 통해 최대한 빠른 경로로 문제를 해결하는 것을 좋아합니다.
        </Typography>
        <ul>
          <li className="flex gap-2">
            <a
              aria-label="github"
              rel="noopener noreferrer"
              href="https://github.com/jihyeonjeong11"
              target="_blank"
            >
              <Image
                src="/svgs/github.svg"
                width={32}
                height={32}
                alt="github"
                className="dark:hidden"
              />
              <Image
                src="/svgs/github-light.svg"
                width={32}
                height={32}
                alt="github"
                className="hidden dark:block"
              />
            </a>
            <a
              aria-label="linkedin"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/jihyeon-jeong"
              target="_blank"
            >
              <Image
                src="/svgs/linkedin.svg"
                width={32}
                height={32}
                alt="linkedin"
                className="dark:hidden"
              />
              <Image
                src="/svgs/linkedin-light.svg"
                width={32}
                height={32}
                alt="linkedin"
                className="hidden dark:block"
              />
            </a>
            <a
              aria-label="mail"
              rel="noopener noreferrer"
              href="mailto:jihyeonjeong1117@gmail.com"
              target="_blank"
            >
              <Mail width={32} height={32} />
            </a>
          </li>
        </ul>
      </div>
    </Container>
  );
};

export default About;
