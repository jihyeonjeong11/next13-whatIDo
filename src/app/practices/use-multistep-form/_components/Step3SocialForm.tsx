import {
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

// 소셜 연결 버튼
export const Step3Form = () => {
  return (
    <form>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>소셜계정 연결</FieldLegend>
          <FieldDescription>단계3: 소셜계정과 연결하세요</FieldDescription>
          <FieldLabel htmlFor="username">회원명</FieldLabel>
          <Input id="username-input" placeholder="anything1356" required />
        </FieldSet>
      </FieldGroup>
    </form>
  );
};
