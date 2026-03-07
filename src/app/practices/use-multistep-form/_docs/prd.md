# PRD: use-multistep-form

**Route**: `/practices/use-multistep-form`
**Status**: Confirmed
**Date**: 2026-03-05

---

## Problem Statement

채용 과제 전형 요구사항 충족 + 포트폴리오 페이지에서 React 상태관리 및 폼 유효성 검사 역량을 실증적으로 보여주는 데모 필요.

---

## User Stories

1. 사용자로서, 단계별로 나뉜 폼을 통해 회원가입 정보를 입력하고 싶다 (인지 부하 감소)
2. 사용자로서, 이전 단계로 돌아가도 입력한 데이터가 유지되기를 원한다
3. 사용자로서, 현재 몇 단계인지 시각적으로 확인하고 싶다
4. 사용자로서, 잘못된 입력 시 즉각적인 피드백을 받고 싶다

---

## Acceptance Criteria

| # | 단계 | 조건 | 기대 결과 |
|---|------|------|----------|
| AC-01 | Step 1 | 아이디(필수, 영문+숫자 6-20자) | Zod validation 즉시 피드백 |
| AC-02 | Step 1 | 비밀번호(필수, 8자+, 특수문자 포함) + 확인 | 불일치 시 에러 표시 |
| AC-03 | Step 1 | 이메일(필수, 형식 검증) | invalid 이메일 즉시 차단 |
| AC-04 | Step 1 | 전화번호(필수, 010-XXXX-XXXX 형식) | 형식 검증 |
| AC-05 | Step 2 | 생년월일(필수, 날짜 유효성) | 미래 날짜 차단 |
| AC-06 | Step 2 | 성별 선택(필수) | 선택 없이 Next 불가 |
| AC-07 | Step 2 | 주소 (react-daum-postcode) | 우편번호 검색 후 자동 입력 |
| AC-08 | Step 3 | SNS 계정 연결 Mock UI | 연결/해제 토글 (실제 OAuth 없음) |
| AC-09 | 전체 | 이전 단계 이동 시 데이터 보존 | RHF 단일 useForm |
| AC-10 | 전체 | 스텝 인디케이터 표시 | 현재 단계 하이라이트 |
| AC-11 | 전체 | 최종 제출 후 완료 화면 | 입력 요약 또는 성공 메시지 |

---

## Technical Decisions

| 항목 | 결정 |
|------|------|
| 데이터 관리 | 단일 `useForm` + `trigger()` 부분 검증 |
| SNS 연결 | Mock UI (토글만, 실제 OAuth 없음) |
| 주소 입력 | `react-daum-postcode` 연동 |
| 언어 | TypeScript 필수 |
| 폼 라이브러리 | React Hook Form + Zod |

---

## Step Structure

### Step 1 — 계정 정보
- 아이디 (username): 영문+숫자, 6-20자
- 비밀번호 (password): 8자+, 특수문자 포함
- 비밀번호 확인 (confirmPassword): password와 일치
- 이메일 (email): 이메일 형식
- 전화번호 (phone): 010-XXXX-XXXX

### Step 2 — 개인 정보
- 생년월일 (birthDate): 날짜, 미래 불가
- 성별 (gender): 필수 선택
- 주소 (address): react-daum-postcode 연동

### Step 3 — SNS 연결
- 카카오 / 구글 / 네이버 / 깃허브 (Mock 토글)

---

## Out of Scope

- 실제 서버 API 연동
- 실제 OAuth 인증
- 데이터 영구 저장
