# Blueprint: use-multistep-form

**Phase**: 3 — Design
**Date**: 2026-03-05

---

## System Scope

3단계 회원가입 멀티스텝 폼. 단일 페이지(`page.tsx`) 내에서 step state로 렌더링 분기.
외부 API 없음. 완료 시 입력값 요약 화면 출력.

## Tech Stack

| 항목 | 선택 | 이유 |
|------|------|------|
| 폼 상태 | React Hook Form (단일 `useForm`) | AC-10: step 이동 시 데이터 보존 |
| 유효성 검사 | Zod + `@hookform/resolvers` | 이미 설치됨 |
| 주소 검색 | `react-daum-postcode` | AC-08 요구사항 |
| 스타일 | Tailwind CSS 4 | 프로젝트 표준 |

---

## Data Flow

```
page.tsx
  ├── useForm<FormData>()          ← 전체 폼 상태 (단일 인스턴스)
  ├── step: 1 | 2 | 3 | 'done'    ← 단계 state
  │
  ├── [step === 1] Step1AccountForm
  │     └── register / formState.errors
  │
  ├── [step === 2] Step2PersonalForm
  │     └── register / formState.errors / setValue (address)
  │
  ├── [step === 3] Step3SnsForm
  │     └── watch('sns') / setValue('sns')
  │
  └── [step === 'done'] SuccessView
        └── getValues() → 입력값 요약
```

## Step 전환 로직

```
handleNext(currentStep):
  fields = STEP_FIELDS[currentStep]        // 해당 step 필드 목록
  isValid = await trigger(fields)          // 부분 검증
  if (isValid) setStep(currentStep + 1)

handlePrev(currentStep):
  setStep(currentStep - 1)                 // 데이터 보존, 검증 없음

handleSubmit → onSubmit:
  setStep('done')                          // 마지막 step에서 전체 submit
```

## 폴더 구조

```
src/app/practices/use-multistep-form/
  page.tsx
  _components/
    StepIndicator.tsx
    Step1AccountForm.tsx
    Step2PersonalForm.tsx
    Step3SnsForm.tsx
    SuccessView.tsx
  _schema/
    stepSchemas.ts
  _types/
    index.ts
```
