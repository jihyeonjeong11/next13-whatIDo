import Container from '@/components/ui/Container';
import Typography from '@/components/ui/Typography';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { SignupForm } from './_components/SignupForm';

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

// https://blog.logrocket.com/building-reusable-multi-step-form-react-hook-form-zod/ Overall design
