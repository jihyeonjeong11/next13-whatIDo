import Container from '@/components/ui/container';
import { SignupForm } from './_components/SignupForm';
import Typography from '@/components/ui/typography';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function UseMultistepForm() {
  return (
    <div className="flex items-center justify-center">
      <Container>
        <Card className="p-4">
          <CardHeader>
            <Typography variant={'h2'}>Signup Form</Typography>
          </CardHeader>
          <CardContent>
            <SignupForm />
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
