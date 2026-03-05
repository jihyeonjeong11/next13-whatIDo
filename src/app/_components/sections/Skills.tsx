import { Skill_Cards } from '@/libs/constants';
import Container from '@/components/ui/Container';
import Typography from '@/components/ui/Typography';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

const Skills = () => {
  return (
    <Container id="skills">
      <Typography variant="h2">Skills</Typography>
      <div className="w-[80%] grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Skill_Cards.map((skill) => (
          <Card key={skill.text} className="p-4 flex flex-col items-center justify-center">
            <Image src={skill.icon} alt={skill.text} width={40} height={40} priority />
            <figcaption>
              <Typography>{skill.text}</Typography>
            </figcaption>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default Skills;
