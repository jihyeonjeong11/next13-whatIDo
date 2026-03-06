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

// 회원명 비밀번호 비밀번호 확인 이메일 전화번호
export const Step1Form = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();

  return (
    <form>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>기본 회원정보</FieldLegend>
          <FieldDescription>단계1: 기본정보를 입력하세요</FieldDescription>

          <FieldLabel htmlFor="username">회원명</FieldLabel>
          <Input
            id="username"
            placeholder="anything1356"
            aria-describedby={errors.username ? 'username-error' : undefined}
            {...register('username')}
          />
          {errors.username && (
            <span role="alert" id="username-error">
              {errors.username.message}
            </span>
          )}

          <FieldLabel htmlFor="password">비밀번호</FieldLabel>
          <Input id="password" placeholder="" {...register('password')} />
          {errors.password && (
            <span role="alert" id="username-error">
              {errors.password.message}
            </span>
          )}
          <FieldLabel htmlFor="confirmPassword">비밀번호 확인</FieldLabel>
          <Input id="confirmPassword" placeholder="" {...register('confirmPassword')} />
          {errors.password && (
            <span role="alert" id="username-error">
              {errors.password.message}
            </span>
          )}
          <FieldLabel htmlFor="email">이메일</FieldLabel>
          <Input id="email" placeholder="" {...register('email')} />
          {errors.email && (
            <span role="alert" id="username-error">
              {errors.email.message}
            </span>
          )}
          <FieldLabel htmlFor="phone">전화번호</FieldLabel>
          <Input id="phone" placeholder="" {...register('phone')} />
          {errors.phone && (
            <span role="alert" id="username-error">
              {errors.phone.message}
            </span>
          )}
        </FieldSet>
      </FieldGroup>
    </form>
  );
};
