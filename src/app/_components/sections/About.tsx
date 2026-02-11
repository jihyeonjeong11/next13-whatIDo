import Container from '../ui/Container';
import Typography from '../ui/Typography';

const About = () => {
  return (
    <Container id="about">
      <div className="flex flex-col gap-6">
        <Typography variant="h2">안녕하세요! About입니다.👋</Typography>
        <Typography variant="body2">
          사용자 경험을 최우선으로 생각하며, 최신 웹 기술을 활용한 아름답고 반응형인 웹
          애플리케이션을 개발합니다. 사용자 경험을 최우선으로 생각하며, 최신 웹 기술을 활용한
          아름답고 반응형인 웹 애플리케이션을 개발합니다. 사용자 경험을 최우선으로 생각하며, 최신 웹
          기술을 활용한 아름답고 반응형인 웹 애플리케이션을 개발합니다. 사용자 경험을 최우선으로
          생각하며, 최신 웹 기술을 활용한 아름답고 반응형인 웹 애플리케이션을 개발합니다.
        </Typography>
      </div>
    </Container>
  );
};

export default About;
