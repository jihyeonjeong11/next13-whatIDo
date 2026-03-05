# Requirements Document: 3단계 멀티스텝 회원가입 폼

## 용어 정리 (Glossary)

| 용어 | 설명 |
|------|------|
| Step | 폼의 단계 (1 ~ 3). 순차 진행만 허용 |
| SignupFormValues | 전체 단계 필드를 포함하는 TypeScript 타입 (Zod infer) |
| 단일 useForm | `shouldUnregister: false`로 생성된 하나의 RHF useForm 인스턴스 |
| trigger() | RHF의 수동 검증 실행 함수. 특정 필드명 배열을 인자로 받음 |
| Mock Submit | 실제 API 없이 500ms 딜레이 후 성공 화면으로 전환하는 시뮬레이션 |
| superRefine | Zod의 교차 필드 검증 메서드 |
| onBlur 모드 | RHF `mode: 'onBlur'` — 필드를 벗어날 때 검증 실행 |
| aria-describedby | 에러 메시지 요소를 입력 필드와 연결하는 ARIA 속성 |
| aria-invalid | 입력 필드가 유효하지 않음을 보조기술에 알리는 ARIA 속성 |
| role="alert" | 에러 메시지가 보조기술에 즉시 알려지도록 하는 ARIA 역할 |
| setFocus() | RHF의 포커스 이동 함수. 에러 발생 첫 번째 필드로 이동 시 사용 |
| aria-pressed | SNS 토글 버튼의 연결 상태를 보조기술에 전달하는 ARIA 속성 |

---

## Requirements

### Requirement 1: Step 1 — 계정 정보 입력

#### 1.1 필드 렌더링
WHEN Step 1이 렌더링될 때,
SHALL `StepOne`이 다음 필드를 순서대로 표시한다:
- `userId` (아이디)
- `password` (비밀번호)
- `confirmPassword` (비밀번호 확인)
- `email` (이메일)
- `phone` (전화번호)

#### 1.2 userId 유효성
WHEN 사용자가 userId를 입력할 때,
SHALL `signupSchema`가 다음 규칙을 적용한다:
- 영문 소문자 + 숫자만 허용 (`/^[a-z0-9]+$/`)
- 최소 4자, 최대 20자
- 에러 메시지: "아이디는 영문 소문자와 숫자 4~20자로 입력해 주세요"

#### 1.3 password 유효성
WHEN 사용자가 password를 입력할 때,
SHALL `signupSchema`가 다음 규칙을 적용한다:
- 대문자, 소문자, 숫자, 특수문자 각 1자 이상 포함
- 최소 8자, 최대 20자
- 에러 메시지: "대소문자·숫자·특수문자를 포함하여 8~20자로 입력해 주세요"
- helper text: 비밀번호 규칙 요약을 필드 하단에 항상 표시 (에러와 별도)
- 표시/숨김 토글 버튼 제공 (`type="password"` ↔ `type="text"`)

#### 1.4 confirmPassword 유효성
WHEN 사용자가 confirmPassword를 입력할 때,
SHALL `signupSchema`의 `superRefine`이 `password`와 일치 여부를 검증한다.
- 에러 메시지: "비밀번호가 일치하지 않습니다"

WHEN `password` 필드가 변경될 때,
SHALL `confirmPassword`에 대해 `trigger('confirmPassword')`를 호출하여 재검증한다. (BA EC-04)

#### 1.5 email 유효성
WHEN 사용자가 email을 입력할 때,
SHALL `signupSchema`가 RFC 표준 이메일 형식 검증을 수행한다.
- 에러 메시지: "올바른 이메일 형식으로 입력해 주세요"

#### 1.6 phone 유효성 및 포매팅
WHEN 사용자가 phone 필드에 입력할 때,
SHALL 다음 동작이 수행된다:
- `type="tel"`, `placeholder="010-0000-0000"` 적용
- `onChange`에서 숫자만 추출 후 `010-XXXX-XXXX` 패턴으로 하이픈 자동 삽입
- 스키마 검증: `010`으로 시작, 최종 형식 `010-XXXX-XXXX` 또는 `01XXXXXXXXX`
- 에러 메시지: "010으로 시작하는 전화번호를 입력해 주세요 (예: 010-1234-5678)"

#### 1.7 다음 버튼 클릭 시 검증
WHEN 사용자가 Step 1에서 다음 버튼을 클릭할 때,
SHALL `trigger(['userId', 'password', 'confirmPassword', 'email', 'phone'])`이 실행된다.
SHALL 검증 실패 시 Step 2로 이동하지 않는다.
SHALL 검증 실패 시 `setFocus(첫 번째 에러 필드)`로 포커스를 이동한다.

#### 1.8 빈 값 onBlur 에러 억제 (UX)
WHEN 사용자가 필드를 한 번도 입력하지 않고 blur 이벤트가 발생할 때,
SHALL 에러 메시지를 표시하지 않는다.
SHALL 에러는 다음 버튼 클릭 시에만 일괄 표시된다.

#### 1.9 접근성
SHALL 각 에러 메시지 요소가 `role="alert"`을 가진다.
SHALL 각 입력 필드가 에러 발생 시 `aria-invalid="true"`를 가진다.
SHALL 각 입력 필드가 `aria-describedby`로 에러 메시지 요소와 연결된다.

---

### Requirement 2: Step 2 — 개인 정보 입력

#### 2.1 필드 렌더링
WHEN Step 2가 렌더링될 때,
SHALL `StepTwo`가 다음 필드를 표시한다:
- `birthDate` (생년월일)
- `gender` (성별)
- `nickname` (닉네임, 선택사항)

#### 2.2 birthDate 유효성
WHEN 사용자가 birthDate를 입력할 때,
SHALL `signupSchema`의 `superRefine`이 다음을 교차 검증한다:
- 형식: `YYYY-MM-DD` (type="date" input 사용)
- 월별 최대 일수 초과 불가 (예: 4월 31일 불가)
- 윤년이 아닌 해의 2월 29일 불가
- 미래 날짜 불가
- 에러 메시지: "올바른 생년월일을 입력해 주세요" / "미래 날짜는 입력할 수 없습니다"

#### 2.3 gender 선택
WHEN 사용자가 gender를 선택할 때,
SHALL `StepTwo`가 `fieldset + legend` 구조로 라디오 버튼 3개를 제공한다:
- `male` (남성), `female` (여성), `other` (기타)
- 필수 선택 항목
- 에러 메시지: "성별을 선택해 주세요"

#### 2.4 nickname 유효성
WHEN 사용자가 nickname을 입력할 때,
SHALL `signupSchema`가 다음을 적용한다:
- 선택 사항 (미입력 허용)
- 입력 시 최소 2자, 최대 10자
- 에러 메시지: "닉네임은 2~10자로 입력해 주세요"

#### 2.5 다음 버튼 클릭 시 검증
WHEN 사용자가 Step 2에서 다음 버튼을 클릭할 때,
SHALL `trigger(['birthDate', 'gender', 'nickname'])`이 실행된다.
SHALL 검증 실패 시 Step 3으로 이동하지 않는다.
SHALL 검증 실패 시 `setFocus(첫 번째 에러 필드)`로 포커스를 이동한다.

#### 2.6 이전 이동 시 데이터 보존
WHEN 사용자가 Step 2에서 이전 버튼을 클릭할 때,
SHALL Step 1로 이동하며, Step 2에 입력한 값이 폼에 유지된다.
(단일 useForm `shouldUnregister: false`로 보장)

#### 2.7 접근성
SHALL gender 필드가 `fieldset + legend` 구조를 사용한다.
SHALL 에러 메시지 요소가 `role="alert"`을 가진다.
SHALL 에러 발생 입력 필드가 `aria-invalid="true"`를 가진다.

---

### Requirement 3: Step 3 — SNS 계정 연결

#### 3.1 필드 렌더링
WHEN Step 3가 렌더링될 때,
SHALL `StepThree`가 다음 SNS 연결 토글 버튼을 표시한다:
- Google (브랜드 컬러: #4285F4)
- GitHub (브랜드 컬러: #24292E)
- Kakao (브랜드 컬러: #FEE500)
- 전체 선택사항임을 안내 문구로 명시

#### 3.2 SNS 상태 관리
SHALL SNS 연결 상태가 `snsConnections: { google: boolean, github: boolean, kakao: boolean }` 형태로
RHF 스키마 내에서 관리된다. (BA EC-07: 외부 useState 사용 금지)
SHALL `Controller`를 통해 각 토글 버튼과 RHF가 연결된다.

#### 3.3 토글 동작
WHEN 사용자가 SNS 버튼을 클릭할 때,
SHALL 해당 SNS가 "연결됨" 상태로 전환되며 시각적으로 구분된다.
WHEN 이미 연결된 SNS 버튼을 다시 클릭할 때,
SHALL 확인 없이 즉시 연결 해제된다.

#### 3.4 접근성
SHALL 각 SNS 버튼이 `aria-pressed={boolean}` 속성을 가진다.
SHALL 연결/해제 상태가 시각적 + 텍스트 레이블로 모두 표현된다.

#### 3.5 제출 허용
WHEN SNS를 하나도 연결하지 않아도,
SHALL 제출 버튼이 활성화되어 제출이 가능하다 (전체 선택사항).

---

### Requirement 4: 단계 간 데이터 보존

#### 4.1 전 단계 필드 유지
SHALL `useForm`이 `shouldUnregister: false` 옵션으로 생성되어,
단계 전환 시 이전 단계 필드의 값이 RHF 내부에서 유지된다.

#### 4.2 이전 이동 시 값 복원
WHEN 사용자가 이전 단계로 이동할 때,
SHALL 이전에 입력한 값이 해당 단계 필드에 표시된다.

#### 4.3 새로고침 시 초기화
WHEN 페이지 새로고침이 발생할 때,
SHALL 폼 데이터가 초기값으로 리셋되고 Step 1부터 시작된다.
(sessionStorage 미사용, 별도 영속성 처리 없음)

---

### Requirement 5: 진행 상태 시각화 (ProgressBar)

#### 5.1 단계 표시
WHEN 어느 단계에서든,
SHALL `ProgressBar`가 전체 3단계 중 현재 단계를 시각적으로 표시한다.

#### 5.2 상태별 스타일
SHALL 각 단계 인디케이터가 다음 스타일을 가진다:
- 완료 단계: `blue-500` 배경 + 체크 아이콘
- 현재 단계: `white` 배경 + `blue-500` 테두리
- 미완료 단계: `gray-300` 배경

#### 5.3 단계 간 연결선
SHALL 단계 인디케이터 사이에 연결선이 표시되며,
완료된 구간은 `blue-500`, 미완료 구간은 `gray-300`으로 표시된다.

---

### Requirement 6: 네비게이션 버튼 (FormNavigation)

#### 6.1 이전 버튼
WHEN Step 1일 때,
SHALL 이전 버튼이 숨겨지거나 비활성화된다.
WHEN Step 2 또는 Step 3일 때,
SHALL 이전 버튼이 활성화되어 이전 단계로 이동할 수 있다.

#### 6.2 다음/제출 버튼 전환
WHEN Step 1 또는 Step 2일 때,
SHALL "다음" 버튼이 표시된다.
WHEN Step 3일 때,
SHALL "다음" 버튼 대신 "가입 완료" 버튼이 표시된다.

#### 6.3 제출 중 비활성화
WHEN `isSubmitting`이 true일 때,
SHALL 가입 완료 버튼이 `disabled` 상태로 전환되어 중복 제출이 방지된다.
SHALL 로딩 인디케이터가 버튼 내에 표시된다.

---

### Requirement 7: Mock Submit 및 완료 화면

#### 7.1 Mock Submit 흐름
WHEN Step 3에서 가입 완료 버튼을 클릭할 때,
SHALL `handleSubmit`이 호출되어 3단계 포함 전체 필드를 최종 검증한다.
SHALL 검증 통과 시 500ms 딜레이 후 완료 화면으로 전환된다.
SHALL 제출 데이터가 `console.log`로 출력된다.

#### 7.2 완료 화면 (SuccessScreen)
SHALL 완료 화면이 다음 정보를 표시한다:
- 닉네임 개인화 환영 메시지 (닉네임 미입력 시 userId 사용)
- 가입한 이메일
- 연결된 SNS 목록 요약 (없으면 "연결된 SNS 없음")
- "포트폴리오 둘러보기" CTA 버튼 (메인 페이지 링크)

#### 7.3 완료 화면 접근성
SHALL 완료 화면 섹션이 `role="status"`를 가진다.
SHALL 체크 애니메이션이 `prefers-reduced-motion` 미디어 쿼리를 준수한다.

---

### Requirement 8: 에러 메시지 표시 규칙 (UX)

#### 8.1 에러 표시 타이밍
SHALL 에러 메시지가 다음 두 가지 경우에만 표시된다:
1. 필드를 입력한 적 있고(`isDirty`) blur 이벤트가 발생한 경우
2. 다음/제출 버튼 클릭 후 `trigger()`가 실행된 경우

SHALL 한 번도 입력하지 않은 필드의 blur에서는 에러를 표시하지 않는다.

#### 8.2 에러 메시지 렌더링
SHALL 에러 메시지가 해당 필드 바로 아래에 렌더링된다.
SHALL 에러 메시지 요소가 고유 `id`를 가지며 `aria-describedby`로 필드와 연결된다.
SHALL 에러 메시지 요소가 `role="alert"`을 가진다.
