'use client';
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
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

// 회원명 비밀번호 비밀번호 확인 이메일 전화번호
export const Step1Form = () => {
  const {
    register,
    formState: { errors },
    setValue,
    trigger,
  } = useFormContext<FormData>();

  const [showPassword, setShowpassword] = useState(false);

  const { ref: registerRef, onChange: registerOnChange, ...restPhone } = register('phone');

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 3) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  };
  console.log(errors);
  return (
    <form>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>기본 회원정보</FieldLegend>
          <FieldDescription>단계1: 기본정보를 입력하세요</FieldDescription>

          <FieldLabel htmlFor="username">아이디</FieldLabel>
          <Input
            id="username"
            placeholder="anything1356"
            aria-describedby={errors.username ? 'username-error' : undefined}
            {...register('username')}
          />
          <span role="alert" className="text-red-500 text-sm block h-5" id="username-error">
            {errors.username?.message ?? ''}
          </span>

          <FieldLabel htmlFor="password">비밀번호</FieldLabel>
          <div className="relative">
            <Input
              id="password"
              aria-describedby={errors.password ? 'password-error' : undefined}
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                onChange: () => trigger('confirmPassword'),
              })}
            />
            <button
              type="button"
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
              onClick={() => setShowpassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <span role="alert" className="text-red-500 text-sm block h-5" id="password-error">
            {errors.password?.message ?? ''}
          </span>

          <FieldLabel htmlFor="confirmPassword">비밀번호 확인</FieldLabel>
          <Input
            id="confirmPassword"
            type="password"
            aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
            {...register('confirmPassword', {
              onBlur: () => trigger(['password', 'confirmPassword']),
            })}
          />
          <span role="alert" className="text-red-500 text-sm block h-5" id="confirmPassword-error">
            {errors.confirmPassword?.message ?? ''}
          </span>

          <FieldLabel htmlFor="email">이메일</FieldLabel>
          <Input
            id="email"
            type="email"
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email')}
          />
          <span role="alert" className="text-red-500 text-sm block h-5" id="email-error">
            {errors.email?.message ?? ''}
          </span>

          <FieldLabel htmlFor="phone">전화번호</FieldLabel>
          <Input
            id="phone"
            inputMode="tel"
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            ref={registerRef}
            onChange={(e) => {
              const formatted = formatPhone(e.target.value);
              e.target.value = formatted;
              setValue('phone', formatted, { shouldValidate: true, shouldTouch: true });
            }}
            {...restPhone}
          />
          <span role="alert" className="text-red-500 text-sm block h-5" id="phone-error">
            {errors.phone?.message ?? ''}
          </span>
        </FieldSet>
      </FieldGroup>
    </form>
  );
};
