import { EXPERIENCE_CARDS } from '@/libs/constants';
import Container from '../ui/Container';
import Typography from '../ui/Typography';
import Card from '../ui/Card';

const Experiences = () => {
  return (
    <Container id="experiences">
      <Typography variant="h2">Experiences</Typography>
      <div className="flex flex-col gap-6">
        {EXPERIENCE_CARDS.map((experience) => (
          <Card key={experience.companyName} className="items-start p-4 shadow-md">
            <div className="flex flex-col gap-2">
              <Typography variant="body2" className="text-sm text-slate-600 dark:text-slate-400">
                {experience.period}
              </Typography>
              <Typography variant="h2" className="font-bold">
                {experience.companyName}
              </Typography>
              <Typography variant="body2" className="text-slate-700 dark:text-slate-300">
                {experience.role}
              </Typography>
              <Typography variant="body2" className="text-slate-600 dark:text-slate-400">
                {experience.description}
              </Typography>
              <ul className="list-disc list-inside space-y-1 mt-2">
                {experience.highlights.map((highlight) => (
                  <li key={highlight} className="text-slate-600 dark:text-slate-400 text-sm">
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default Experiences;
