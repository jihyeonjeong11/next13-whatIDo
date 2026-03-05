import { z } from 'zod';

export const formSchema = z
  .object({
    // Step 1
    username: z
      .string()
      .min(6, '영문과 숫자 조합 6~20자로 입력해주세요')
      .max(20, '영문과 숫자 조합 6~20자로 입력해주세요')
      .regex(/^[a-zA-Z0-9]+$/, '영문과 숫자 조합 6~20자로 입력해주세요'),
    password: z
      .string()
      .min(8, '8자 이상, 특수문자를 포함해주세요')
      .regex(/[^a-zA-Z0-9]/, '8자 이상, 특수문자를 포함해주세요'),
    confirmPassword: z.string(),
    email: z.string().email('올바른 이메일 형식을 입력해주세요'),
    phone: z.string().regex(/^010-\d{4}-\d{4}$/, '010-0000-0000 형식으로 입력해주세요'),

    // Step 2
    birthDate: z
      .string()
      .min(1, '생년월일을 입력해주세요')
      .refine((val) => new Date(val) < new Date(), '생년월일은 오늘 이전 날짜여야 합니다'),
    gender: z.enum(['male', 'female', 'other'], {
      //https://github.com/colinhacks/zod/issues/580
      error: '성별을 선택해주세요',
    }),
    address: z.string().min(1, '주소를 검색해주세요'),
    addressDetail: z.string().optional(),

    // Step 3
    sns: z.array(z.enum(['kakao', 'google', 'naver', 'github'])),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

export type FormData = z.infer<typeof formSchema>;
export type SnsProvider = FormData['sns'][number];
export type Step = 1 | 2 | 3 | 'done';

export const STEP_FIELDS = {
  1: ['username', 'password', 'confirmPassword', 'email', 'phone'],
  2: ['birthDate', 'gender', 'address'],
  3: [],
} as const satisfies Record<number, ReadonlyArray<keyof FormData>>;
