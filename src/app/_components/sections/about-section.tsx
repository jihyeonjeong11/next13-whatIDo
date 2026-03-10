'use client';

import { Mail } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Typography } from '@/components/ui/typography';
import Image from 'next/image';

export const AboutSection = () => {
  return (
    <Container id="about">
      <div className="flex flex-col gap-6">
        <Typography variant="h2">시작부터 완성까지, 길을 닦는 개발자입니다.👋</Typography>
        <Typography variant="body2">
          목표까지의 가장 빠른 길에 대해 가설을 세우고 검증하는 것을 좋아합니다. 소통을 통해
          요구사항을, 요구사항을 통해 실제로 배운 뒤 만들고 기록합니다.
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
