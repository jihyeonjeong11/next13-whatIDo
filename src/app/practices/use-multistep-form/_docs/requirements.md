# Requirements: use-multistep-form

**Phase**: 2 — Analysis
**Role**: Business Analyst + UX Researcher
**Date**: 2026-03-05
**Based on**: prd.md

---

## Acceptance Criteria

| ID | Step | Field | Rule | Error Message |
|----|------|-------|------|---------------|
| AC-01 | Step 1 | username | 필수, 영문+숫자만, 6–20자 | "영문과 숫자 조합 6~20자로 입력해주세요" |
| AC-02 | Step 1 | password | 필수, 8자 이상, 특수문자 1개 이상 | "8자 이상, 특수문자를 포함해주세요" |
| AC-03 | Step 1 | confirmPassword | password와 일치 | "비밀번호가 일치하지 않습니다" |
| AC-04 | Step 1 | email | 필수, 이메일 형식 | "올바른 이메일 형식을 입력해주세요" |
| AC-05 | Step 1 | phone | 필수, 010-XXXX-XXXX 형식 | "010-0000-0000 형식으로 입력해주세요" |
| AC-06 | Step 2 | birthDate | 필수, 과거 날짜만 | "생년월일은 오늘 이전 날짜여야 합니다" |
| AC-07 | Step 2 | gender | 필수 선택 (male/female/other) | "성별을 선택해주세요" |
| AC-08 | Step 2 | address | react-daum-postcode 연동, 필수 | "주소를 검색해주세요" |
| AC-09 | Step 3 | sns | 카카오/구글/네이버/깃허브 토글 (최소 0개) | — |
| AC-10 | 전체 | navigation | 이전 단계 이동 시 입력 데이터 보존 | — |
| AC-11 | 전체 | step indicator | 현재 단계 시각적 표시 (1/2/3) | — |
| AC-12 | 전체 | submit | Step 3 완료 후 입력 요약 화면 출력 | — |
| AC-13 | Step 1→2 | next | Step 1 전체 필드 유효할 때만 Step 2 이동 | — |
| AC-14 | Step 2→3 | next | Step 2 전체 필드 유효할 때만 Step 3 이동 | — |

---

## User Flows

### 정상 흐름 (Happy Path)

```
[진입] /practices/use-multistep-form
  → Step 1: 계정 정보 입력
      username / password / confirmPassword / email / phone 입력
      [Next] → RHF trigger(['username','password','confirmPassword','email','phone'])
      → 모두 valid → Step 2 이동

  → Step 2: 개인 정보 입력
      birthDate / gender / address(다음 주소검색) 입력
      [Next] → RHF trigger(['birthDate','gender','address'])
      → 모두 valid → Step 3 이동

  → Step 3: SNS 연결 (선택)
      카카오/구글/네이버/깃허브 토글 (선택 없이도 완료 가능)
      [완료] → handleSubmit(onSubmit)
      → 완료 화면: 입력값 요약 표시

  [이전] 버튼: 어느 단계에서든 이전 단계 이동, 데이터 유지
```

### 에러 흐름 (Error Path)

```
Step 1 [Next] 클릭 시 invalid 필드 존재
  → 해당 필드 아래 에러 메시지 표시
  → 포커스는 첫 번째 에러 필드로 이동
  → Step 2 이동 차단

Step 2 [Next] 클릭 시 address 미입력
  → "주소를 검색해주세요" 에러 표시
  → Step 3 이동 차단
```

### 엣지 케이스

| 케이스 | 처리 방식 |
|--------|----------|
| Step 2에서 [이전] → Step 1 수정 → [Next] | 기존 Step 2 입력값 유지 |
| phone 입력 중 자동 하이픈 포맷 | onChange에서 010-XXXX-XXXX 마스킹 |
| birthDate 미래 날짜 입력 | Zod refine으로 차단, 에러 표시 |
| SNS 전체 미연결 상태로 완료 | 허용 (선택 사항) |
| 브라우저 뒤로가기 | step state 초기화 (RHF 데이터는 유지) |

---

## UX Audit (web-design-guidelines 기반)

### 접근성 (Accessibility)

- 모든 `<input>`에 `<label>` 연결 필수 (`htmlFor` + `id`)
- 에러 메시지는 `role="alert"` 또는 `aria-describedby`로 연결
- Step indicator는 `aria-current="step"` 표시
- [이전]/[다음] 버튼은 명확한 `aria-label` 제공
- 키보드 탭 순서: 상단에서 하단, 좌에서 우

### 폼 UX 원칙

- 에러는 submit 시점이 아닌 `onBlur` + `onChange` 모드 (`mode: 'onTouched'`)
- 에러 메시지는 필드 바로 아래 표시 (빨간 텍스트, `text-sm`)
- [Next] 버튼은 `trigger()` 결과가 `true`일 때만 활성화 (또는 클릭 시 검증)
- 비밀번호 필드: 보기/숨기기 토글 버튼 제공
- phone 필드: 숫자 키보드 힌트 (`inputMode="tel"`)
- 주소 검색 버튼: 클릭 시 다음 postcode 모달 오픈

### 스텝 인디케이터 디자인

```
● ─── ○ ─── ○
1     2     3
```
- 완료 단계: filled circle
- 현재 단계: filled circle + ring
- 미완료 단계: empty circle

---

## Component Structure (예상)

```
use-multistep-form/
  page.tsx                    ← 메인 (단일 useForm, step state)
  _components/
    StepIndicator.tsx         ← 스텝 표시
    Step1AccountForm.tsx      ← AC-01~05
    Step2PersonalForm.tsx     ← AC-06~08
    Step3SnsForm.tsx          ← AC-09
    SuccessView.tsx           ← AC-12
  _schema/
    stepSchemas.ts            ← Zod schemas per step
  _types/
    index.ts                  ← FormData 타입
```

---

## Dependencies

| 패키지 | 용도 | 설치 여부 |
|--------|------|----------|
| react-hook-form | 폼 상태 관리 | 확인 필요 |
| zod | 유효성 검사 스키마 | 확인 필요 |
| @hookform/resolvers | RHF + Zod 연결 | 확인 필요 |
| react-daum-postcode | 주소 검색 | 설치 필요 |

---

## Open Questions

| # | 질문 | 결정 |
|---|------|------|
| OQ-1 | phone 자동 하이픈: onChange 마스킹 vs 라이브러리? | onChange 직접 구현 (라이브러리 오버킬) |
| OQ-2 | 완료 화면: 별도 route vs 같은 page 내 조건부 렌더? | 같은 page 내 조건부 렌더 |
| OQ-3 | address 상세주소 필드 추가 여부? | 추가 (선택, not required) |
