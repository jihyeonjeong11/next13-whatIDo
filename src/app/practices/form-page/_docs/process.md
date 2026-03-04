● 구현 순서

  1단계 — 타입 정의

  _types/signup.ts
  전체 폼 데이터 인터페이스 먼저. 여기서 결정한 것이 나머지 전부의 기반.

  2단계 — 스키마 정의

  _schemas/signupSchema.ts
  각 스텝별 Zod 스키마. 타입에서 파생(z.infer).

  3단계 — 훅 구현

  _hooks/useMultiStepForm.ts
  step 상태, next/prev, 전체 formData 관리. 아직 UI 없이 로직만.

  4단계 — 스텝 컴포넌트 (기능 우선, 스타일 나중)

  _components/steps/StepOne.tsx  ← 필드 + 검증
  _components/steps/StepTwo.tsx
  _components/steps/StepThree.tsx
  각 스텝 완성되면 바로 page.tsx에 연결해서 동작 확인.

  5단계 — 공통 컴포넌트

  _components/ProgressBar.tsx
  _components/FormNavigation.tsx  ← 이전/다음 버튼

  6단계 — page.tsx 조립

  훅 + 스텝 컴포넌트 + 네비게이션 연결. 전체 플로우 동작 확인.

  7단계 — 스타일링 + UX

  TailwindCSS로 완성도. 에러 메시지 위치, 버튼 상태(disabled), 진행 표시.

  8단계 — 엣지 케이스 처리

  뒤로가기 데이터 보존, 중복 제출 방지, 모바일.

