import { Mail } from 'lucide-react';
import Container from '../ui/Container';
import Typography from '../ui/Typography';
import Image from 'next/image';

const About = () => {
  return (
    <Container id="about">
      <div className="flex flex-col gap-6">
        <Typography variant="h2">안녕하세요! 웹 개발자 정지현입니다.👋</Typography>
        <Typography variant="body2">웹 어플리케이션을 개발합니다.</Typography>
        <ul>
          <li className="flex gap-2">
            <a
              aria-label="github"
              rel="noopener noreferrer"
              href="https://github.com/jihyeonjeong11"
              target="_blank"
            >
              <Image src={'/svgs/github.svg'} width={32} height={32} alt="github" />
            </a>
            <a
              aria-label="linkedin"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/jihyeon-jeong"
              target="_blank"
            >
              <Image src={'/svgs/linkedin.svg'} width={32} height={32} alt="linkedin" />
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
