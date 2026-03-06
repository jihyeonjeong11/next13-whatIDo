import {
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

// 생일 성별 주소
export const Step2Form = () => {
  return (
    <form>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>개인정보</FieldLegend>
          <FieldDescription>단계2: 개인정보를 입력하세요</FieldDescription>
          <FieldLabel htmlFor="username">회원명</FieldLabel>
          <Input id="username-input" placeholder="anything1356" required />
        </FieldSet>
      </FieldGroup>
    </form>
  );
};
