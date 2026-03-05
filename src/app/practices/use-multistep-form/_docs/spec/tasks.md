# 구현 태스크 체크리스트

> 구현 순서: 스키마 → 훅 → 스텝 컴포넌트 → 공유 컴포넌트 → 페이지 조립 → 스타일링 → 엣지 케이스
> 각 태스크에 구현하는 Requirements 번호를 명시함.

---

## Phase 1: 스키마 및 타입

### 1.1 signupSchema.ts 생성
- [ ] `src/app/practices/form-page/_schemas/signupSchema.ts` 파일 생성
- [ ] `userId` 필드: 영문 소문자+숫자 regex, min 4, max 20
  - _Req 1.2_
- [ ] `password` 필드: 대소문자+숫자+특수문자 regex, min 8, max 20
  - _Req 1.3_
- [ ] `confirmPassword` 필드: min 1 (교차검증은 superRefine에서)
  - _Req 1.4_
- [ ] `email` 필드: `z.string().email()`
  - _Req 1.5_
- [ ] `phone` 필드: `010-XXXX-XXXX` 패턴 regex
  - _Req 1.6_
- [ ] `birthDate` 필드: `z.string().min(1)` (교차검증은 superRefine에서)
  - _Req 2.2_
- [ ] `gender` 필드: `z.enum(['male', 'female', 'other'])`
  - _Req 2.3_
- [ ] `nickname` 필드: optional, 입력 시 2~10자 refine
  - _Req 2.4_
- [ ] `snsConnections` 필드: `z.object({ google: z.boolean(), github: z.boolean(), kakao: z.boolean() })`
  - _Req 3.2_

### 1.2 superRefine 추가
- [ ] `confirmPassword !== password` 시 `ctx.addIssue` (path: `['confirmPassword']`)
  - _Req 1.4, BA EC-04_
- [ ] `birthDate` 월별 최대 일수 초과 검증 (`getMaxDay` 유틸 포함)
  - _Req 2.2_
- [ ] `birthDate` 윤년 2월 29일 검증 (getMaxDay에서 처리)
  - _Req 2.2_
- [ ] `birthDate` 미래 날짜 불가 검증
  - _Req 2.2_

### 1.3 타입 및 상수 export
- [ ] `SignupFormValues` = `z.infer<typeof signupSchema>` export
- [ ] `StepOneFields`, `StepTwoFields`, `StepThreeFields` Pick 타입 export
- [ ] `STEP_FIELDS: Record<number, (keyof SignupFormValues)[]>` export
- [ ] `TOTAL_STEPS = 3` export

---

## Phase 2: useMultiStepForm 훅

### 2.1 기본 구조
- [ ] `src/app/practices/form-page/_hooks/useMultiStepForm.ts` 파일 생성
- [ ] `useForm<SignupFormValues>` 초기화:
  ```typescript
  resolver: zodResolver(signupSchema),
  shouldUnregister: false,
  mode: 'onBlur',
  defaultValues: { snsConnections: { google: false, github: false, kakao: false } }
  ```
  - _Req 4.1_
- [ ] `currentStep` state 초기화 (`useState(1)`)
- [ ] `isSuccess` state 초기화 (`useState(false)`)

### 2.2 스텝 제어
- [ ] `isFirstStep = currentStep === 1` 계산
- [ ] `isLastStep = currentStep === TOTAL_STEPS` 계산
- [ ] `handlePrev()`: `setCurrentStep(prev => prev - 1)`
  - _Req 6.1_

### 2.3 handleNext 구현
- [ ] `trigger(STEP_FIELDS[currentStep])` 호출
- [ ] 검증 실패 시: 첫 번째 에러 필드에 `setFocus()` 호출
  - `STEP_FIELDS[currentStep]` 순서로 `formState.errors` 탐색
  - _Req 1.7, 2.5, UX_
- [ ] 검증 성공 시: `setCurrentStep(prev => prev + 1)`
  - _Req 1.7, 2.5_

### 2.4 onSubmit (Mock Submit) 구현
- [ ] `await new Promise(resolve => setTimeout(resolve, 500))`
- [ ] `console.log('[MockSubmit]', data)` 출력
- [ ] `setIsSuccess(true)` 호출
  - _Req 7.1_

### 2.5 반환값 정의
- [ ] `methods`, `currentStep`, `isFirstStep`, `isLastStep`, `isSuccess`, `handleNext`, `handlePrev`, `onSubmit` 반환

---

## Phase 3: StepOne 컴포넌트

### 3.1 기본 구조
- [ ] `src/app/practices/form-page/_components/steps/StepOne.tsx` 파일 생성
- [ ] `useFormContext<SignupFormValues>()` 호출로 RHF 접근
  - _Req 1.1_

### 3.2 userId 필드
- [ ] label, input(`register('userId')`), 에러 메시지 렌더링
- [ ] `aria-invalid={!!errors.userId}`, `aria-describedby="userId-error"` 적용
- [ ] 에러 메시지: `<p id="userId-error" role="alert">{errors.userId?.message}</p>`
  - _Req 1.2, 1.9_

### 3.3 password 필드
- [ ] `showPassword` state (`useState(false)`)
- [ ] `type={showPassword ? 'text' : 'password'}` 토글 버튼
- [ ] helper text 상시 표시: `id="password-helper"`, `aria-describedby` 포함
- [ ] 에러 메시지 렌더링 (`id="password-error"`, `role="alert"`)
- [ ] `aria-invalid`, `aria-describedby` 적용 (helper + error 모두)
  - _Req 1.3, 1.9_

### 3.4 confirmPassword 필드 + password 연동
- [ ] `register('confirmPassword')` 렌더링
- [ ] `password` 필드 onChange wrapper:
  ```typescript
  onChange: (e) => {
    passwordField.onChange(e)
    if (getFieldState('confirmPassword').isDirty) {
      trigger('confirmPassword')
    }
  }
  ```
  - _Req 1.4, BA EC-04_
- [ ] 에러 메시지 렌더링 (`id="confirmPassword-error"`, `role="alert"`)

### 3.5 email 필드
- [ ] label, input(`register('email')`), 에러 메시지 렌더링
- [ ] `type="email"`, ARIA 속성 적용
  - _Req 1.5, 1.9_

### 3.6 phone 필드
- [ ] `type="tel"`, `placeholder="010-0000-0000"` 적용
- [ ] onChange wrapper: `formatPhoneNumber(e.target.value)` → `setValue('phone', formatted)`
- [ ] 에러 메시지 렌더링, ARIA 속성 적용
  - _Req 1.6, 1.9_

---

## Phase 4: StepTwo 컴포넌트

### 4.1 기본 구조
- [ ] `src/app/practices/form-page/_components/steps/StepTwo.tsx` 파일 생성
- [ ] `useFormContext<SignupFormValues>()` 호출
  - _Req 2.1_

### 4.2 birthDate 필드
- [ ] `type="date"`, `max={new Date().toISOString().split('T')[0]}` 적용
- [ ] `register('birthDate')`, 에러 메시지, ARIA 속성
  - _Req 2.2, 2.7_

### 4.3 gender 필드
- [ ] `<fieldset>` + `<legend>성별 *</legend>` 구조 사용
- [ ] male / female / other 라디오 버튼 3개 (`register('gender')`)
- [ ] fieldset 외부 에러 메시지 (`role="alert"`)
  - _Req 2.3, 2.7_

### 4.4 nickname 필드
- [ ] 라벨에 "(선택)" 표시
- [ ] `register('nickname')`, 에러 메시지, ARIA 속성
  - _Req 2.4_

---

## Phase 5: StepThree 컴포넌트

### 5.1 기본 구조
- [ ] `src/app/practices/form-page/_components/steps/StepThree.tsx` 파일 생성
- [ ] `useFormContext<SignupFormValues>()` 호출
- [ ] 섹션 상단 "모두 선택사항입니다" 안내 문구
  - _Req 3.1, 3.5_

### 5.2 SNS 토글 버튼 (각 SNS별 반복)
- [ ] Google: `<Controller name="snsConnections.google" ...>`
- [ ] GitHub: `<Controller name="snsConnections.github" ...>`
- [ ] Kakao: `<Controller name="snsConnections.kakao" ...>`
- [ ] 각 버튼: `type="button"`, `aria-pressed={field.value}`, `onClick={() => field.onChange(!field.value)}`
  - _Req 3.2, 3.3, 3.4_

### 5.3 토글 시각화
- [ ] 연결 상태 (`field.value === true`): 브랜드 컬러 배경, "연결됨" 텍스트
- [ ] 미연결 상태 (`field.value === false`): gray 배경, "연결하기" 텍스트
- [ ] 브랜드 컬러: Google `#4285F4`, GitHub `#24292E`, Kakao `#FEE500`
  - _Req 3.3, 3.4_

---

## Phase 6: ProgressBar 컴포넌트

### 6.1 기본 구조
- [ ] `src/app/practices/form-page/_components/ProgressBar.tsx` 파일 생성
- [ ] `interface ProgressBarProps { currentStep: number; totalSteps: number }`
  - _Req 5.1_

### 6.2 인디케이터 렌더링
- [ ] `Array.from({ length: totalSteps })` 순회
- [ ] 완료 단계 (`step < currentStep`): `bg-blue-500 text-white` + 체크 아이콘 (✓)
- [ ] 현재 단계 (`step === currentStep`): `bg-white border-2 border-blue-500 text-blue-500`
- [ ] 미완료 단계 (`step > currentStep`): `bg-gray-300 text-gray-500`
  - _Req 5.2_

### 6.3 연결선 렌더링
- [ ] 인디케이터 사이 `<div>` 연결선
- [ ] 완료 구간: `bg-blue-500`, 미완료 구간: `bg-gray-300`
  - _Req 5.3_

---

## Phase 7: FormNavigation 컴포넌트

### 7.1 기본 구조
- [ ] `src/app/practices/form-page/_components/FormNavigation.tsx` 파일 생성
- [ ] `interface FormNavigationProps { isFirstStep, isLastStep, isSubmitting, onPrev, onNext }` 정의
  - _Req 6.1, 6.2, 6.3_

### 7.2 이전 버튼
- [ ] `isFirstStep` 시 `visibility: hidden` 또는 `invisible` 클래스 (레이아웃 공간 유지)
- [ ] `type="button"`, `onClick={onPrev}`
  - _Req 6.1_

### 7.3 다음/제출 버튼
- [ ] `!isLastStep`: `type="button"`, `onClick={onNext}`, children="다음"
- [ ] `isLastStep`: `type="submit"`, `disabled={isSubmitting}`
  - `isSubmitting` 시 로딩 스피너 표시
  - children: `isSubmitting ? "처리 중..." : "가입 완료"`
  - _Req 6.2, 6.3_

---

## Phase 8: SuccessScreen 컴포넌트

### 8.1 기본 구조
- [ ] `src/app/practices/form-page/_components/SuccessScreen.tsx` 파일 생성
- [ ] `interface SuccessScreenProps { data: SignupFormValues }` 정의
- [ ] `<section role="status" aria-label="회원가입 완료">` 래핑
  - _Req 7.2, 7.3_

### 8.2 콘텐츠 렌더링
- [ ] 환영 메시지: `${data.nickname || data.userId}님, 환영합니다!`
  - _Req 7.2_
- [ ] 가입 이메일 표시
- [ ] 연결 SNS 목록:
  ```typescript
  const connected = Object.entries(data.snsConnections)
    .filter(([, v]) => v)
    .map(([k]) => k)
  // 없으면 "연결된 SNS 없음" 표시
  ```
  - _Req 7.2_

### 8.3 CTA 및 애니메이션
- [ ] `<Link href="/">포트폴리오 둘러보기</Link>` 버튼 스타일 적용
- [ ] 체크 아이콘 애니메이션 (CSS keyframes 또는 motion/react)
- [ ] `@media (prefers-reduced-motion: reduce)` 에서 애니메이션 비활성화
  - _Req 7.2, 7.3_

---

## Phase 9: 페이지 조립 (page.tsx)

### 9.1 기본 구조
- [ ] `src/app/practices/form-page/page.tsx` 업데이트 (기존 단순 폼 교체)
- [ ] `useMultiStepForm()` 호출
- [ ] `<FormProvider {...methods}>` 래핑
  - _Req 4.1_

### 9.2 isSuccess 분기
- [ ] `isSuccess === true` → `<SuccessScreen data={methods.getValues()} />`
- [ ] `isSuccess === false` → 폼 렌더링
  - _Req 7.2_

### 9.3 폼 레이아웃
- [ ] `<ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />`
- [ ] `<form onSubmit={methods.handleSubmit(onSubmit)}>`
  - `{currentStep === 1 && <StepOne />}`
  - `{currentStep === 2 && <StepTwo />}`
  - `{currentStep === 3 && <StepThree />}`
- [ ] `<FormNavigation ...props />`
  - _Req 5.1, 6.1, 6.2, 6.3_

---

## Phase 10: 스타일링

### 10.1 전체 레이아웃
- [ ] 페이지 중앙 정렬 카드 레이아웃 (`max-w-md mx-auto`)
- [ ] 모바일 우선 반응형 패딩/마진
  - _Req (UX)_

### 10.2 공통 필드 스타일
- [ ] `input`, `select` 기본 스타일 정의 (focus ring, border, rounded)
- [ ] 에러 상태 스타일: `border-red-500`, 에러 메시지 `text-red-500 text-sm`
- [ ] helper text 스타일: `text-gray-500 text-xs`

### 10.3 버튼 스타일
- [ ] 다음 버튼: `bg-blue-500 hover:bg-blue-600 text-white`
- [ ] 이전 버튼: `bg-gray-100 hover:bg-gray-200 text-gray-700`
- [ ] 가입 완료 버튼 disabled 상태: `opacity-50 cursor-not-allowed`

---

## Phase 11: 엣지 케이스 처리

### 11.1 빈 값 onBlur 에러 억제
- [ ] `mode: 'onBlur'`만으로 기본 동작 확인
- [ ] 한 번도 입력하지 않은 필드가 blur 시 에러 노출되지 않는지 검증
- [ ] 필요 시 커스텀 validation 로직으로 `formState.touchedFields` 체크
  - _Req 1.8, 8.1_

### 11.2 EC-04: password 변경 시 confirmPassword 재검증
- [ ] `password onChange` 래퍼에서 `getFieldState('confirmPassword').isDirty` 체크 후 `trigger('confirmPassword')`
  - _Req 1.4, BA EC-04_

### 11.3 EC-07: snsConnections RHF 내부 관리 확인
- [ ] `StepThree`에서 `useState`로 SNS 상태 관리하지 않는지 코드 리뷰
- [ ] `Controller` + `field.onChange` 방식으로만 상태 업데이트 확인
  - _Req 3.2, BA EC-07_

### 11.4 중복 제출 방지
- [ ] `isSubmitting` 동안 가입 완료 버튼 `disabled` 처리 확인
- [ ] form submit 이벤트가 중복 발생하지 않는지 확인
  - _Req 6.3_

### 11.5 setFocus 에러 첫 번째 필드
- [ ] `handleNext` 검증 실패 후 포커스가 첫 번째 에러 필드로 이동하는지 확인
- [ ] `STEP_FIELDS` 순서대로 `formState.errors` 키 탐색 로직 동작 확인
  - _Req 1.7, 2.5_
