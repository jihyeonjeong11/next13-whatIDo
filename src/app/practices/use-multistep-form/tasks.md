# Tasks: use-multistep-form

**Phase**: 4 — Implementation
**Date**: 2026-03-06

---

## Phase A — Setup

| ID | Task | AC | 완료 |
|----|------|----|------|
| A-01 | `yarn add react-daum-postcode` 설치 | AC-08 | [ ] |
| A-02 | `_types/index.ts` 생성 — FormData, Step, SnsProvider, STEP_FIELDS | AC-10 | [x] | → stepSchemas.ts에 통합 |
| A-03 | `_schema/stepSchemas.ts` 리팩터링 — step1/step2/step3 분리 + STEP_SCHEMAS + formSchema(step2 optional + superRefine) | AC-01~09 | [x] |

---

## Phase B — Core Components

| ID | Task | AC | 완료 |
|----|------|----|------|
| B-01 | `StepIndicator.tsx` 구현 — 3단계 원형 인디케이터, aria-current, 숫자 레이블 | AC-11 | [x] |
| B-02 | `Step1AccountForm.tsx` 구현 — username/password/confirmPassword/email/phone | AC-01~05 | [x] |
| B-03 | phone onChange 마스킹 로직 — 010-XXXX-XXXX 자동 포맷 | AC-05 | [x] |
| B-04 | password 보기/숨기기 토글 + confirmPassword 불일치 에러 | AC-02~03 | [x] |
| B-05 | `Step2PersonalForm.tsx` 구현 — birthDate/gender/address/addressDetail | AC-06~08 | [x] |
| B-06 | DaumPostcode 모달 연동 — [주소 검색] 클릭 → 모달 → setValue | AC-08 | [ ] |
| B-07 | `Step3SnsForm.tsx` 구현 — 4개 SNS 카드 토글 | AC-09 | [x] |
| B-08 | `SuccessView.tsx` 구현 — 입력값 요약 테이블 | AC-12 | [ ] |

---

## Phase C — 페이지 통합

| ID | Task | AC | 완료 |
|----|------|----|------|
| C-01 | `SignupForm.tsx` — useForm + zodResolver + FormProvider + step state | AC-10 | [x] |
| C-02 | handleNext: STEP_SCHEMAS[step].safeParse() → step별 검증 + setError | AC-13~14 | [x] |
| C-03 | handlePrev: 데이터 보존하며 이전 단계 이동 | AC-10 | [ ] |
| C-04 | handleSubmit → onSubmit → setStep('done') | AC-12 | [ ] |
| C-05 | Step3SnsForm에 watch('sns') / setValue('sns') 연결 | AC-09 | [x] |

---

## Phase D — 접근성 & UX 마무리

| ID | Task | AC | 완료 |
|----|------|----|------|
| D-01 | 모든 input에 label[htmlFor] + input[id] + aria-describedby 연결 | AC-01~09 | [x] | → Step1~2 완료 |
| D-02 | 에러 메시지 span에 role="alert" 추가 | AC-01~09 | [x] | → Step1~2 완료 |
| D-03 | birthDate max 속성 = 오늘 날짜 (YYYY-MM-DD) 동적 설정 | AC-06 | [x] |
| D-04 | phone input에 inputMode="tel" 설정 | AC-05 | [x] |
| D-05 | 키보드 탭 순서 확인 (상단→하단) | 전체 | [ ] |

---

## 구현 순서 권장

```
A-01 → A-02 → A-03
→ B-01 (StepIndicator)
→ B-02 ~ B-04 (Step1)
→ B-05 ~ B-06 (Step2)
→ B-07 (Step3)
→ B-08 (SuccessView)
→ C-01 ~ C-05 (page.tsx 통합)
→ D-01 ~ D-05 (접근성 마무리)
```
