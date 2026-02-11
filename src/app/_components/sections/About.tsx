import Container from '../ui/Container';
import Typography from '../ui/Typography';

const About = () => {
  return (
    <Container id="about">
      <div className="flex flex-col gap-6">
        <Typography variant="h2">안녕하세요! 웹 개발자 정지현입니다.👋</Typography>
        <Typography variant="body2">웹 어플리케이션을 개발합니다.</Typography>
      </div>
    </Container>
  );
};

export default About;
