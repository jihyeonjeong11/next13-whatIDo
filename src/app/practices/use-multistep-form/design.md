# Design: use-multistep-form

**Phase**: 3 — Design
**Date**: 2026-03-05

> NOTE: 이 문서는 pseudocode/인터페이스 명세만 포함합니다. 실제 코드 구현은 Phase 4에서 진행합니다.

---

## Type Interfaces

### FormData

```
FormData {
  // Step 1
  username:        string   // 영문+숫자, 6-20자
  password:        string   // 8자+, 특수문자 포함
  confirmPassword: string   // password와 일치
  email:           string   // 이메일 형식
  phone:           string   // 010-XXXX-XXXX

  // Step 2
  birthDate:       string   // YYYY-MM-DD, 과거 날짜만
  gender:          'male' | 'female' | 'other'
  address:         string   // daum postcode 결과 (필수)
  addressDetail:   string?  // 상세주소 (optional)

  // Step 3
  sns:             SnsProvider[]  // 빈 배열 허용
}

SnsProvider = 'kakao' | 'google' | 'naver' | 'github'

Step = 1 | 2 | 3 | 'done'
```

### STEP_FIELDS 매핑

```
STEP_FIELDS = {
  1: [username, password, confirmPassword, email, phone],
  2: [birthDate, gender, address],
  3: [],
}
```

---

## Validation Rules

| 필드 | 규칙 | 에러 메시지 |
|------|------|------------|
| username | 영문+숫자만, 6~20자 | "영문과 숫자 조합 6~20자로 입력해주세요" |
| password | 8자 이상 + 특수문자 1개 이상 | "8자 이상, 특수문자를 포함해주세요" |
| confirmPassword | password와 동일 (cross-field refine) | "비밀번호가 일치하지 않습니다" |
| email | 이메일 형식 | "올바른 이메일 형식을 입력해주세요" |
| phone | /^010-\d{4}-\d{4}$/ | "010-0000-0000 형식으로 입력해주세요" |
| birthDate | 빈값 불가 + 오늘 이전 날짜 | "생년월일은 오늘 이전 날짜여야 합니다" |
| gender | enum 중 하나 선택 | "성별을 선택해주세요" |
| address | 최소 1자 이상 | "주소를 검색해주세요" |
| sns | 배열 (제약 없음) | — |

---

## Component Specs

### page.tsx — 오케스트레이터

```
state:
  step: Step  (초기값: 1)

form instance: useForm<FormData>
  resolver: zodResolver(formSchema)
  mode: 'onTouched'
  defaultValues: { sns: [] }

handlers:
  handleNext(currentStep):
    isValid = await trigger(STEP_FIELDS[currentStep])
    if isValid → setStep(currentStep + 1)

  handlePrev(currentStep):
    setStep(currentStep - 1)  // 검증 없음, 데이터 보존

  onSubmit():
    setStep('done')

render tree:
  StepIndicator(step)
  if step=1 → Step1AccountForm(register, errors, onNext)
  if step=2 → Step2PersonalForm(register, errors, setValue, onNext, onPrev)
  if step=3 → Step3SnsForm(value=watch('sns'), onChange=setValue('sns'), onPrev, onSubmit)
  if done   → SuccessView(data=getValues())
```

---

### StepIndicator

```
props:
  step: Step

render:
  원 3개 + 연결선
  - 완료 단계(step > n): filled circle
  - 현재 단계(step === n): filled circle + ring, aria-current="step"
  - 미완료 단계(step < n): empty circle
  - 각 원 하단: "1", "2", "3" 레이블
```

---

### Step1AccountForm

```
props:
  register: RHF register function
  errors: RHF errors object
  onNext: () => void

fields:
  username      — text input
  password      — password input + 보기/숨기기 toggle button
  confirmPassword — password input + 보기/숨기기 toggle button
  email         — email input
  phone         — tel input
                  onChange: 숫자 추출 후 010-XXXX-XXXX 포맷 자동 적용

each field:
  label[htmlFor] → input[id, aria-describedby]
  에러 시: span[role=alert, id="{field}-error"]

footer:
  [다음] button → onNext()
```

---

### Step2PersonalForm

```
props:
  register: RHF register function
  errors: RHF errors object
  setValue: RHF setValue function
  onNext: () => void
  onPrev: () => void

fields:
  birthDate     — date input, max attribute = today (YYYY-MM-DD)
  gender        — radio group (남성/여성/기타)
  address       — readonly text input + [주소 검색] button
                  주소 검색 클릭 → DaumPostcode 모달 오픈
                  onComplete(data) → setValue('address', data.zonecode + ' ' + data.address)
  addressDetail — text input (optional, placeholder: "상세주소 입력")

footer:
  [이전] button → onPrev()
  [다음] button → onNext()
```

---

### Step3SnsForm

```
props:
  value: SnsProvider[]
  onChange: (providers: SnsProvider[]) => void
  onPrev: () => void
  onSubmit: () => void

render:
  4개 SNS 카드 (카카오 / 구글 / 네이버 / 깃허브)
  각 카드:
    - SNS 로고 + 이름
    - connected = value.includes(provider)
    - connected=true  → [연결 해제] 버튼 → onChange(value.filter(p => p !== provider))
    - connected=false → [연결] 버튼     → onChange([...value, provider])

footer:
  [이전] button → onPrev()
  [완료] button → onSubmit()  (연결 0개도 허용)
```

---

### SuccessView

```
props:
  data: FormData

render:
  - 완료 아이콘 (체크마크)
  - h1: "가입이 완료되었습니다"
  - 요약 테이블:
      아이디      | data.username
      이메일      | data.email
      전화번호    | data.phone
      생년월일    | data.birthDate
      성별        | data.gender (한글 변환)
      주소        | data.address + data.addressDetail
      SNS 연결    | data.sns (빈 배열이면 "없음")
  - password / confirmPassword 는 표시 안 함
```

---

## 외부 의존성

| 패키지 | 용도 | 설치 여부 |
|--------|------|----------|
| react-hook-form | 폼 상태 관리 | 설치됨 |
| zod | 유효성 검사 | 설치됨 |
| @hookform/resolvers | RHF + Zod 연결 | 설치됨 |
| react-daum-postcode | 주소 검색 모달 | **미설치** → Phase 4 시작 전 설치 필요 |
