import { z } from 'zod';

// https://blog.logrocket.com/building-reusable-multi-step-form-react-hook-form-zod/
// https://blog.borristw.com/confirm-password-using-schema-zod-with-react-hook-form
const passwordSchema = z
  .string()
  .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
  .max(20, { message: '비밀번호는 20자 이하여야 합니다.' })
  .refine((password) => /[A-Z]/.test(password), {
    message: '영어 대문자가 하나 이상 필요합니다.',
  })
  .refine((password) => /[a-z]/.test(password), {
    message: '영어 소문자가 하나 이상 필요합니다.',
  })
  .refine((password) => /[0-9]/.test(password), { message: '숫자가 하나 이상 필요합니다.' })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: '특수문자가 하나 이상 있어야 합니다.',
  });

// Step 1 base object (used for merge)
const step1BaseSchema = z.object({
  username: z
    .string()
    .min(6, '영문과 숫자 조합 6~20자로 입력해주세요')
    .max(20, '영문과 숫자 조합 6~20자로 입력해주세요')
    .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/, '영문과 숫자 조합 6~20자로 입력해주세요'),
  password: passwordSchema,
  confirmPassword: z.string().min(1, '비밀번호를 확인해주세요.'),
  email: z.string().email('올바른 이메일 형식을 입력해주세요'),
  phone: z.string().regex(/^010-\d{4}-\d{4}$/, '010-0000-0000 형식으로 입력해주세요'),
});

// Step 2
export const step2Schema = z.object({
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
});

// Step 3
export const step3Schema = z.object({
  sns: z.array(z.enum(['kakao', 'google', 'naver', 'github'])),
});

// https://zod.dev/api .merge 는 deprecated 되었음.
export const formSchema = z
  .object({
    ...step1BaseSchema.shape,
    ...step2Schema.partial().shape,
    ...step3Schema.shape,
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom', // z.ZodIssueCode.custom deprecated 되었음
        message: '비밀번호가 일치하지 않습니다',
        path: ['confirmPassword'],
      });
    }
  });

export type FormData = z.infer<typeof formSchema>;
export type SnsProvider = FormData['sns'][number];
export type Step = 1 | 2 | 3 | 'done';

export const STEP_SCHEMAS = {
  1: step1BaseSchema,
  2: step2Schema,
  3: step3Schema,
} as const;
