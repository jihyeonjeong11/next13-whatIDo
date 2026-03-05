# Validation Report: Requirements → Tasks 추적 매트릭스

---

## 1. Requirements to Tasks 추적 매트릭스

| Requirement | Acceptance Criterion | 구현 태스크 | 상태 |
|-------------|----------------------|-------------|------|
| **Req 1.1** 필드 렌더링 | StepOne이 5개 필드 표시 | Phase 3.1 | Covered |
| **Req 1.2** userId 유효성 | regex, min 4, max 20 | Phase 1.1 (userId), Phase 3.2 | Covered |
| **Req 1.3** password 유효성 | regex, helper text, 토글 | Phase 1.1 (password), Phase 3.3 | Covered |
| **Req 1.4** confirmPassword 교차검증 | superRefine + EC-04 재검증 | Phase 1.2 (superRefine), Phase 3.4, Phase 11.2 | Covered |
| **Req 1.5** email 유효성 | z.string().email() | Phase 1.1 (email), Phase 3.5 | Covered |
| **Req 1.6** phone 포매팅 + 유효성 | 하이픈 자동삽입, regex | Phase 1.1 (phone), Phase 3.6 | Covered |
| **Req 1.7** 다음 버튼 trigger + setFocus | trigger Step1 fields, setFocus | Phase 2.3, Phase 11.5 | Covered |
| **Req 1.8** 빈 값 onBlur 억제 | 미입력 blur 에러 미표시 | Phase 2.1 (mode: onBlur), Phase 11.1 | Covered |
| **Req 1.9** 접근성 (Step 1) | aria-invalid, aria-describedby, role="alert" | Phase 3.2~3.6 | Covered |
| **Req 2.1** Step 2 필드 렌더링 | 3개 필드 표시 | Phase 4.1 | Covered |
| **Req 2.2** birthDate superRefine | 월별일수, 윤년, 미래불가 | Phase 1.2 (birthDate), Phase 4.2 | Covered |
| **Req 2.3** gender fieldset+legend | radio 3개, fieldset 구조 | Phase 4.3 | Covered |
| **Req 2.4** nickname 선택사항 | optional, 2~10자 | Phase 1.1 (nickname), Phase 4.4 | Covered |
| **Req 2.5** 다음 버튼 trigger + setFocus | trigger Step2 fields, setFocus | Phase 2.3, Phase 11.5 | Covered |
| **Req 2.6** 이전 이동 시 데이터 보존 | shouldUnregister: false | Phase 2.1, Phase 7.2 | Covered |
| **Req 2.7** 접근성 (Step 2) | fieldset+legend, role="alert" | Phase 4.2~4.4 | Covered |
| **Req 3.1** SNS 버튼 표시 | 3개 버튼, 안내 문구 | Phase 5.1 | Covered |
| **Req 3.2** SNS RHF 내부 관리 | Controller, snsConnections schema | Phase 1.1 (snsConnections), Phase 5.2, Phase 11.3 | Covered |
| **Req 3.3** 토글 동작 | 연결/해제, 시각적 구분 | Phase 5.2, Phase 5.3 | Covered |
| **Req 3.4** SNS 접근성 | aria-pressed | Phase 5.2 | Covered |
| **Req 3.5** SNS 미연결 허용 | 전체 선택사항, 제출 허용 | Phase 5.1, Phase 1.3 (snsConnections 타입) | Covered |
| **Req 4.1** shouldUnregister: false | 단일 useForm 옵션 | Phase 2.1 | Covered |
| **Req 4.2** 이전 이동 값 복원 | 단일 useForm으로 자동 보장 | Phase 2.1, Phase 7.2 | Covered |
| **Req 4.3** 새로고침 시 초기화 | sessionStorage 미사용, state 초기화 | Phase 2.1 | Covered |
| **Req 5.1** ProgressBar 단계 표시 | currentStep/totalSteps props | Phase 6.1, Phase 9.3 | Covered |
| **Req 5.2** 상태별 스타일 | 완료/현재/미완료 | Phase 6.2 | Covered |
| **Req 5.3** 연결선 스타일 | 완료/미완료 구간 색상 | Phase 6.3 | Covered |
| **Req 6.1** 이전 버튼 (isFirstStep) | Step 1 시 숨김 | Phase 7.2 | Covered |
| **Req 6.2** 다음/제출 버튼 전환 | isLastStep 기반 | Phase 7.3 | Covered |
| **Req 6.3** 제출 중 비활성화 | isSubmitting + disabled | Phase 7.3, Phase 11.4 | Covered |
| **Req 7.1** Mock Submit | 500ms 딜레이 + console.log | Phase 2.4 | Covered |
| **Req 7.2** 완료 화면 | 닉네임/이메일/SNS/CTA | Phase 8.1~8.3, Phase 9.2 | Covered |
| **Req 7.3** 완료 화면 접근성 | role="status", reduced-motion | Phase 8.1, Phase 8.3 | Covered |
| **Req 8.1** 에러 표시 타이밍 | onBlur + trigger | Phase 2.1, Phase 11.1 | Covered |
| **Req 8.2** 에러 메시지 렌더링 | id, aria-describedby, role="alert" | Phase 3.2~3.6, Phase 4.2~4.4 | Covered |
| **BA EC-04** password 변경 → confirmPassword 재검증 | getFieldState isDirty + trigger | Phase 3.4, Phase 11.2 | Covered |
| **BA EC-07** SNS 상태 RHF 내부 관리 | Controller, useState 금지 | Phase 5.2, Phase 11.3 | Covered |

---

## 2. 커버리지 분석

### 요약

| 항목 | 수치 |
|------|------|
| 전체 Acceptance Criteria | 36 |
| 태스크로 커버된 AC | 36 |
| 커버리지 | **100%** |
| BA 엣지 케이스 | 2 (EC-04, EC-07) |
| BA 엣지 케이스 커버 | 2 |

### Phase별 커버 범위

| Phase | 주요 컴포넌트 | 커버 Requirement |
|-------|---------------|-----------------|
| Phase 1 | signupSchema.ts | 1.2, 1.3, 1.4, 1.5, 1.6, 2.2, 2.3, 2.4, 3.2, 3.5 |
| Phase 2 | useMultiStepForm.ts | 1.7, 1.8, 2.5, 4.1, 4.2, 4.3, 7.1, 8.1 |
| Phase 3 | StepOne.tsx | 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.9 |
| Phase 4 | StepTwo.tsx | 2.1, 2.2, 2.3, 2.4, 2.7 |
| Phase 5 | StepThree.tsx | 3.1, 3.2, 3.3, 3.4, 3.5 |
| Phase 6 | ProgressBar.tsx | 5.1, 5.2, 5.3 |
| Phase 7 | FormNavigation.tsx | 6.1, 6.2, 6.3 |
| Phase 8 | SuccessScreen.tsx | 7.2, 7.3 |
| Phase 9 | page.tsx | 4.1, 5.1, 6.1~6.3, 7.2 |
| Phase 10 | 스타일링 | UX 전반 |
| Phase 11 | 엣지 케이스 | 1.4(EC-04), 1.7, 1.8, 2.5, 3.2(EC-07), 6.3 |

---

## 3. 리스크 플래그

### RISK-01: onBlur 에러 억제 동작 불확실성 (중간 위험도)
- **문제**: RHF `mode: 'onBlur'`는 기본적으로 blur 시 검증을 실행한다. 빈 값 blur 에러 억제는
  기본 동작이 아니므로 추가 처리 필요.
- **영향**: Req 1.8, 8.1
- **완화 방안**: `formState.touchedFields`와 `formState.dirtyFields` 조합으로 에러 조건부 렌더링.
  또는 `shouldFocusError: false`와 custom trigger 방식 검토.
- **검증 태스크**: Phase 11.1

### RISK-02: Zod superRefine의 birthDate 파싱 신뢰도 (낮은 위험도)
- **문제**: `type="date"` input이 브라우저마다 반환 형식이 다를 수 있음 (대부분 YYYY-MM-DD이나 보장 안 됨).
- **영향**: Req 2.2
- **완화 방안**: `z.string().regex(/^\d{4}-\d{2}-\d{2}$/)` 선행 검증 후 superRefine 진행.
- **검증 태스크**: Phase 1.2 (birthDate superRefine)

### RISK-03: setFocus 대상 필드 탐색 순서 (낮은 위험도)
- **문제**: `formState.errors` 객체의 키 순서가 정의 순서와 다를 수 있음.
- **영향**: Req 1.7, 2.5 (UX 요구: 첫 번째 에러 필드로 포커스)
- **완화 방안**: `STEP_FIELDS[currentStep]` 배열 순서로 명시적 탐색:
  ```typescript
  const firstErrorField = STEP_FIELDS[currentStep].find(
    field => field in formState.errors
  )
  if (firstErrorField) setFocus(firstErrorField)
  ```
- **검증 태스크**: Phase 11.5

### RISK-04: Controller 중첩 필드명 (낮은 위험도)
- **문제**: `snsConnections.google` 같은 중첩 필드명을 `Controller`의 `name` prop에 전달할 때
  TypeScript 타입 추론이 까다로울 수 있음.
- **영향**: Req 3.2, BA EC-07
- **완화 방안**: `useFormContext<SignupFormValues>()`에서 반환된 `control`을 명시적으로 타이핑.
  `"snsConnections.google"` as const 형태 사용.
- **검증 태스크**: Phase 5.2

---

## 4. 최종 검증 결과

모든 36개 Acceptance Criteria와 2개 BA 엣지 케이스가 구현 태스크에 완전히 추적됩니다.

| 항목 | 결과 |
|------|------|
| 요구사항 추적 완전성 | 100% |
| 미커버 Requirement | 0개 |
| 태스크 미참조 Requirement | 0개 |
| 식별된 리스크 | 4개 (완화 방안 포함) |
| 구현 시작 가능 여부 | **가능** |

구현은 **Phase 1 (스키마)** 부터 순서대로 진행한다.
각 Phase 완료 시 해당 Phase가 커버하는 Requirement의 체크리스트를 검토한다.
