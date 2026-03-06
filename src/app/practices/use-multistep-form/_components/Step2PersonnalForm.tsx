import { useFormContext } from 'react-hook-form';
import {
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import type { FormData } from '../_schema/stepSchemas';

// 생일 성별 주소
export const Step2Form = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();

  const today = new Date().toISOString().split('T')[0];

  return (
    <form>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>개인정보</FieldLegend>
          <FieldDescription>단계2: 개인정보를 입력하세요</FieldDescription>

          <FieldLabel htmlFor="birthDate">생년월일</FieldLabel>
          <Input
            id="birthDate"
            type="date"
            max={today}
            aria-describedby={errors.birthDate ? 'birthDate-error' : undefined}
            {...register('birthDate')}
          />
          <span role="alert" className="text-red-500 text-sm block h-5" id="birthDate-error">
            {errors.birthDate?.message ?? ''}
          </span>

          <FieldSet>
            <FieldLegend>성별</FieldLegend>
            <FieldLabel htmlFor="gender-male">남성</FieldLabel>
            <input id="gender-male" type="radio" value="male" {...register('gender')} />
            <FieldLabel htmlFor="gender-female">여성</FieldLabel>
            <input id="gender-female" type="radio" value="female" {...register('gender')} />
            <FieldLabel htmlFor="gender-other">기타</FieldLabel>
            <input id="gender-other" type="radio" value="other" {...register('gender')} />
            <span role="alert" className="text-red-500 text-sm block h-5" id="gender-error">
              {errors.gender?.message ?? ''}
            </span>
          </FieldSet>

          <FieldLabel htmlFor="address">주소</FieldLabel>
          <Input
            id="address"
            aria-describedby={errors.address ? 'address-error' : undefined}
            {...register('address')}
          />
          <span role="alert" className="text-red-500 text-sm block h-5" id="address-error">
            {errors.address?.message ?? ''}
          </span>

          <FieldLabel htmlFor="addressDetail">상세주소</FieldLabel>
          <Input
            id="addressDetail"
            placeholder="상세주소 입력"
            {...register('addressDetail')}
          />
        </FieldSet>
      </FieldGroup>
    </form>
  );
};
