# Design Document: 3단계 멀티스텝 회원가입 폼

## 설계 원칙

1. **단일 useForm**: 모든 단계 필드를 하나의 RHF 인스턴스로 관리. `shouldUnregister: false` 필수.
2. **타입 안전성**: 모든 폼 타입은 `signupSchema`에서 `z.infer`로 파생. 수동 타입 선언 금지.
3. **검증 우선**: 단계 이동 전 반드시 해당 스텝 필드 `trigger()` 통과.
4. **RHF 단일 진실 공급원**: SNS 상태 포함 모든 폼 상태를 RHF 내부에서 관리. 외부 useState 사용 금지 (BA EC-07).
5. **접근성 우선**: ARIA 속성, focus 관리, role="alert" 에러 메시지를 구현의 일부로 간주.
6. **컴포넌트 단일 책임**: 각 컴포넌트는 하나의 역할만 담당.

---

## Zod 스키마 전체 코드

**파일**: `src/app/practices/form-page/_schemas/signupSchema.ts`

```typescript
import { z } from 'zod'

// ─── 상수 ───────────────────────────────────────────────────────────────────

const USER_ID_REGEX = /^[a-z0-9]+$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,20}$/
const PHONE_REGEX = /^010-\d{4}-\d{4}$/

// ─── 월별 최대 일수 유틸 ────────────────────────────────────────────────────

function getMaxDay(year: number, month: number): number {
  const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  if (month === 2 && isLeapYear) return 29
  return daysInMonth[month]
}

// ─── 전체 스키마 ────────────────────────────────────────────────────────────

export const signupSchema = z
  .object({
    // Step 1: 계정 정보
    userId: z
      .string()
      .min(4, '아이디는 영문 소문자와 숫자 4~20자로 입력해 주세요')
      .max(20, '아이디는 영문 소문자와 숫자 4~20자로 입력해 주세요')
      .regex(USER_ID_REGEX, '아이디는 영문 소문자와 숫자만 사용할 수 있습니다'),

    password: z
      .string()
      .min(8, '대소문자·숫자·특수문자를 포함하여 8~20자로 입력해 주세요')
      .max(20, '대소문자·숫자·특수문자를 포함하여 8~20자로 입력해 주세요')
      .regex(PASSWORD_REGEX, '대소문자·숫자·특수문자를 각 1자 이상 포함해야 합니다'),

    confirmPassword: z.string().min(1, '비밀번호 확인을 입력해 주세요'),

    email: z.string().email('올바른 이메일 형식으로 입력해 주세요'),

    phone: z
      .string()
      .regex(PHONE_REGEX, '010으로 시작하는 전화번호를 입력해 주세요 (예: 010-1234-5678)'),

    // Step 2: 개인 정보
    birthDate: z.string().min(1, '생년월일을 입력해 주세요'),

    gender: z.enum(['male', 'female', 'other'], {
      errorMap: () => ({ message: '성별을 선택해 주세요' }),
    }),

    nickname: z
      .string()
      .optional()
      .refine(
        (val) => val === undefined || val === '' || (val.length >= 2 && val.length <= 10),
        { message: '닉네임은 2~10자로 입력해 주세요' }
      ),

    // Step 3: SNS 연결
    snsConnections: z.object({
      google: z.boolean(),
      github: z.boolean(),
      kakao: z.boolean(),
    }),
  })
  .superRefine((data, ctx) => {
    // EC-04: confirmPassword 교차 검증
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
        message: '비밀번호가 일치하지 않습니다',
      })
    }

    // birthDate 교차 검증
    if (data.birthDate) {
      const parts = data.birthDate.split('-')
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10)
        const month = parseInt(parts[1], 10)
        const day = parseInt(parts[2], 10)

        if (month < 1 || month > 12) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['birthDate'],
            message: '올바른 생년월일을 입력해 주세요',
          })
        } else {
          const maxDay = getMaxDay(year, month)
          if (day < 1 || day > maxDay) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ['birthDate'],
              message: '올바른 생년월일을 입력해 주세요',
            })
          }
        }

        // 미래 날짜 불가
        const inputDate = new Date(data.birthDate)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        if (inputDate > today) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['birthDate'],
            message: '미래 날짜는 입력할 수 없습니다',
          })
        }
      }
    }
  })

// ─── 타입 export ────────────────────────────────────────────────────────────

export type SignupFormValues = z.infer<typeof signupSchema>

export type StepOneFields = Pick<
  SignupFormValues,
  'userId' | 'password' | 'confirmPassword' | 'email' | 'phone'
>

export type StepTwoFields = Pick<
  SignupFormValues,
  'birthDate' | 'gender' | 'nickname'
>

export type StepThreeFields = Pick<SignupFormValues, 'snsConnections'>

// ─── 스텝별 필드 매핑 ───────────────────────────────────────────────────────

export const STEP_FIELDS: Record<number, (keyof SignupFormValues)[]> = {
  1: ['userId', 'password', 'confirmPassword', 'email', 'phone'],
  2: ['birthDate', 'gender', 'nickname'],
  3: ['snsConnections'],
}

export const TOTAL_STEPS = 3
```

---

## 컴포넌트 명세

### useMultiStepForm

**파일**: `src/app/practices/form-page/_hooks/useMultiStepForm.ts`
**역할**: 단일 `useForm` 인스턴스 생성, 스텝 전환 제어, trigger + setFocus 처리

```typescript
interface UseMultiStepFormReturn {
  // RHF methods (FormProvider에 주입)
  methods: UseFormReturn<SignupFormValues>

  // 스텝 상태
  currentStep: number          // 1-indexed (1, 2, 3)
  isFirstStep: boolean         // currentStep === 1
  isLastStep: boolean          // currentStep === TOTAL_STEPS

  // 제출 상태
  isSuccess: boolean           // Mock submit 완료 여부

  // 핸들러
  handleNext: () => Promise<void>    // trigger → 스텝 증가
  handlePrev: () => void             // 스텝 감소
  onSubmit: (data: SignupFormValues) => Promise<void>  // Mock submit
}
```

**구현 메모**:
- `useForm<SignupFormValues>({ resolver: zodResolver(signupSchema), shouldUnregister: false, mode: 'onBlur' })`
- `handleNext`: `trigger(STEP_FIELDS[currentStep])` → 실패 시 `setFocus(첫 번째 에러 필드)` → 성공 시 `setCurrentStep(prev => prev + 1)`
- `onSubmit`: `await new Promise(r => setTimeout(r, 500))` → `setIsSuccess(true)`
- 첫 번째 에러 필드 탐색: `Object.keys(formState.errors)`를 `STEP_FIELDS[currentStep]` 순서로 순회

---

### Page (page.tsx)

**파일**: `src/app/practices/form-page/page.tsx`
**역할**: 라우트 엔트리. `FormProvider` 래핑, `isSuccess` 분기 렌더링

```typescript
// props: 없음 (Next.js Page 컴포넌트)

// 렌더링 구조:
// isSuccess → <SuccessScreen data={getValues()} />
// else →
//   <FormProvider {...methods}>
//     <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
//     <form onSubmit={methods.handleSubmit(onSubmit)}>
//       {currentStep === 1 && <StepOne />}
//       {currentStep === 2 && <StepTwo />}
//       {currentStep === 3 && <StepThree />}
//       <FormNavigation
//         isFirstStep={isFirstStep}
//         isLastStep={isLastStep}
//         isSubmitting={methods.formState.isSubmitting}
//         onPrev={handlePrev}
//         onNext={handleNext}
//       />
//     </form>
//   </FormProvider>
```

---

### StepOne

**파일**: `src/app/practices/form-page/_components/steps/StepOne.tsx`
**역할**: Step 1 필드 렌더링. `useFormContext()`로 RHF 접근.

```typescript
// props: 없음 (useFormContext로 접근)

interface FieldConfig {
  name: keyof StepOneFields
  label: string
  type: string
  placeholder?: string
  helperText?: string
}

// 구현 메모:
// - password: showPassword state로 type 토글
// - password onChange: trigger('confirmPassword') 호출 (BA EC-04)
//   단, getFieldState('confirmPassword').isDirty 일 때만
// - phone onChange: formatPhoneNumber(value) → setValue('phone', formatted)
// - 에러 메시지 id: `${fieldName}-error`
// - aria-describedby: 에러 존재 시 `${fieldName}-error`, helperText 존재 시 `${fieldName}-helper`
```

---

### StepTwo

**파일**: `src/app/practices/form-page/_components/steps/StepTwo.tsx`
**역할**: Step 2 필드 렌더링. `useFormContext()`로 RHF 접근.

```typescript
// props: 없음 (useFormContext로 접근)

// 구현 메모:
// - birthDate: type="date", max={today.toISOString().split('T')[0]}
// - gender: <fieldset><legend>성별 *</legend> + 3개 radio</fieldset>
// - nickname: 선택사항 표시 (라벨 옆 "(선택)")
// - gender 에러: fieldset 외부 또는 legend 아래 role="alert"
```

---

### StepThree

**파일**: `src/app/practices/form-page/_components/steps/StepThree.tsx`
**역할**: Step 3 SNS 토글 렌더링. RHF `Controller`로 연결.

```typescript
// props: 없음 (useFormContext로 접근)

interface SnsConfig {
  key: 'google' | 'github' | 'kakao'
  label: string
  brandColor: string        // Google: #4285F4, GitHub: #24292E, Kakao: #FEE500
  icon: React.ReactNode
}

// 구현 메모:
// - <Controller name="snsConnections.google" render={({ field }) => (
//     <button
//       type="button"
//       aria-pressed={field.value}
//       onClick={() => field.onChange(!field.value)}
//     >...</button>
//   )} />
// - 연결 상태: 브랜드 컬러 배경 + "연결됨" 텍스트
// - 미연결 상태: 회색 배경 + "연결하기" 텍스트
// - 섹션 상단: "모두 선택사항입니다" 안내 문구
```

---

### ProgressBar

**파일**: `src/app/practices/form-page/_components/ProgressBar.tsx`
**역할**: 스텝 진행 상태 시각화

```typescript
interface ProgressBarProps {
  currentStep: number    // 1-indexed
  totalSteps: number     // 3
}

// 스텝 인디케이터 상태별 Tailwind 클래스:
// completed: "bg-blue-500 text-white" + 체크 아이콘
// current:   "bg-white border-2 border-blue-500 text-blue-500"
// pending:   "bg-gray-300 text-gray-500"

// 연결선:
// completed-to-next: "bg-blue-500"
// otherwise:         "bg-gray-300"
```

---

### FormNavigation

**파일**: `src/app/practices/form-page/_components/FormNavigation.tsx`
**역할**: 이전/다음/제출 버튼 렌더링 및 상태 관리

```typescript
interface FormNavigationProps {
  isFirstStep: boolean
  isLastStep: boolean
  isSubmitting: boolean
  onPrev: () => void
  onNext: () => Promise<void>
}

// 구현 메모:
// - 이전 버튼: isFirstStep → hidden (visibility: hidden 또는 className conditional)
// - 다음/제출 버튼:
//   - isLastStep=false → type="button", onClick={onNext}, children="다음"
//   - isLastStep=true  → type="submit", disabled={isSubmitting}
//                        children={isSubmitting ? <Spinner /> : "가입 완료"}
// - 이전 버튼은 type="button"으로 form submit 방지
```

---

### SuccessScreen

**파일**: `src/app/practices/form-page/_components/SuccessScreen.tsx`
**역할**: 가입 완료 화면. 닉네임 개인화, 이메일, SNS 요약, CTA.

```typescript
interface SuccessScreenProps {
  data: SignupFormValues
}

// 구현 메모:
// - 섹션: <section role="status" aria-label="회원가입 완료">
// - 환영 메시지: `${data.nickname || data.userId}님, 환영합니다!`
// - 이메일: data.email
// - 연결된 SNS: Object.entries(data.snsConnections)
//               .filter(([, v]) => v)
//               .map(([k]) => k) → 없으면 "연결된 SNS 없음"
// - CTA: <Link href="/">포트폴리오 둘러보기</Link>
// - 체크 애니메이션: @keyframes 또는 motion/react animate
//   prefers-reduced-motion 준수
```

---

## 전화번호 포매터 유틸

```typescript
// src/app/practices/form-page/_hooks/useMultiStepForm.ts 또는 별도 유틸 파일

export function formatPhoneNumber(value: string): string {
  // 숫자만 추출
  const digits = value.replace(/\D/g, '')

  // 최대 11자리 제한
  const limited = digits.slice(0, 11)

  // 010-XXXX-XXXX 패턴 적용
  if (limited.length <= 3) return limited
  if (limited.length <= 7) return `${limited.slice(0, 3)}-${limited.slice(3)}`
  return `${limited.slice(0, 3)}-${limited.slice(3, 7)}-${limited.slice(7)}`
}
```

---

## 파일 구조 (목표 상태)

```
src/app/practices/use-multistep-form/
├── page.tsx                              # 라우트 엔트리
├── _schemas/
│   └── signupSchema.ts                   # Zod 전체 스키마 + STEP_FIELDS + 타입
├── _hooks/
│   └── useMultiStepForm.ts               # 단일 useForm, 스텝 제어, trigger
├── _components/
│   ├── steps/
│   │   ├── StepOne.tsx                   # userId/password/confirmPassword/email/phone
│   │   ├── StepTwo.tsx                   # birthDate/gender/nickname
│   │   └── StepThree.tsx                 # snsConnections Controller 토글
│   ├── ProgressBar.tsx                   # 스텝 시각화
│   ├── FormNavigation.tsx                # 이전/다음/제출 버튼
│   └── SuccessScreen.tsx                 # 완료 화면
└── _docs/
    └── spec/
        ├── blueprint.md
        ├── requirements.md
        ├── design.md                     ← 현재 파일
        ├── tasks.md
        └── validation.md
```
