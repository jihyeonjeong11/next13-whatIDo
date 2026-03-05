import Container from '@/components/ui/Container';
import { StepIndicator } from './_components/StepIndicator';
import Typography from '@/components/ui/Typography';
import {
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function UseMultistepForm() {
  return (
    <div className="h-dvh flex items-center justify-center">
      <Container>
        <Card className="p2">
          <Typography>Signup form</Typography>
          <StepIndicator />
          <form>
            <FieldGroup>
              <FieldSet>
                <FieldLegend>기본 회원정보</FieldLegend>
                <FieldDescription>단계1: 기본정보를 입력하세요</FieldDescription>
                <FieldLabel htmlFor="username">회원명</FieldLabel>
                <Input id="username-input" placeholder="anything1356" required />
              </FieldSet>
            </FieldGroup>
          </form>
        </Card>
      </Container>
    </div>
  );
}
