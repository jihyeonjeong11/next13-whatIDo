# Validation: use-multistep-form

**Phase**: 3 — Design
**Date**: 2026-03-05

> AC Coverage 확인 — 모든 AC가 최소 1개의 Task에 매핑되어야 함.

---

## AC → Task 매핑

| AC ID | 설명 | 담당 Task | 커버 여부 |
|-------|------|-----------|----------|
| AC-01 | username: 영문+숫자, 6-20자, 즉시 피드백 | A-03, B-02, D-01, D-02 | ✅ |
| AC-02 | password: 8자+, 특수문자, 즉시 피드백 | A-03, B-02, B-04, D-01, D-02 | ✅ |
| AC-03 | confirmPassword: password 불일치 에러 | A-03, B-02, B-04 | ✅ |
| AC-04 | email: 이메일 형식 검증 | A-03, B-02, D-01 | ✅ |
| AC-05 | phone: 010-XXXX-XXXX 형식 + 자동 포맷 | A-03, B-02, B-03, D-04 | ✅ |
| AC-06 | birthDate: 필수, 미래 날짜 차단 | A-03, B-05, D-03 | ✅ |
| AC-07 | gender: 필수 선택 | A-03, B-05 | ✅ |
| AC-08 | address: DaumPostcode 연동, 필수 | A-01, B-05, B-06 | ✅ |
| AC-09 | SNS: 4개 토글, 0개 허용 | A-03, B-07, C-05 | ✅ |
| AC-10 | 이전 단계 이동 시 데이터 보존 | A-02, C-01, C-03 | ✅ |
| AC-11 | Step indicator 현재 단계 하이라이트 | B-01 | ✅ |
| AC-12 | 최종 제출 후 입력 요약 화면 | B-08, C-04 | ✅ |
| AC-13 | Step 1→2: 전체 유효할 때만 이동 | C-02 | ✅ |
| AC-14 | Step 2→3: 전체 유효할 때만 이동 | C-02 | ✅ |

**AC 커버리지: 14 / 14 (100%)** ✅

---

## Task → AC 역매핑

| Task ID | 설명 | 커버하는 AC |
|---------|------|------------|
| A-01 | react-daum-postcode 설치 | AC-08 |
| A-02 | _types/index.ts | AC-10 |
| A-03 | Zod formSchema | AC-01~09 |
| B-01 | StepIndicator | AC-11 |
| B-02 | Step1AccountForm | AC-01~05 |
| B-03 | phone 마스킹 | AC-05 |
| B-04 | password 토글 | AC-02, AC-03 |
| B-05 | Step2PersonalForm | AC-06, AC-07, AC-08 |
| B-06 | DaumPostcode 연동 | AC-08 |
| B-07 | Step3SnsForm | AC-09 |
| B-08 | SuccessView | AC-12 |
| C-01 | page.tsx useForm + step state | AC-10 |
| C-02 | handleNext (부분 검증) | AC-13, AC-14 |
| C-03 | handlePrev | AC-10 |
| C-04 | onSubmit | AC-12 |
| C-05 | sns watch/setValue 연결 | AC-09 |
| D-01 | label/id/aria-describedby | AC-01~09 |
| D-02 | role="alert" 에러 메시지 | AC-01~09 |
| D-03 | birthDate max 동적 설정 | AC-06 |
| D-04 | inputMode="tel" | AC-05 |
| D-05 | 키보드 탭 순서 | 전체 |

---

## Phase 4 진입 조건

- [x] AC 커버리지 100%
- [x] blueprint.md 완료
- [x] requirements.md 완료
- [x] design.md 완료
- [x] tasks.md 완료
- [x] validation.md 완료
- [ ] react-daum-postcode 설치 (Phase 4 시작 전 A-01 선행 필요)
