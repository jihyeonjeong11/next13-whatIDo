import { test, expect } from '@playwright/test';

const URL = '/practices/form-page';

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────
async function gotoForm(page: Parameters<typeof test>[1] extends (args: { page: infer P }) => unknown ? P : never) {
  await page.goto(URL);
}

// Step 1 유효 값
const VALID_STEP1 = {
  userId: 'testuser1',
  password: 'Test1234!',
  confirmPassword: 'Test1234!',
  email: 'test@example.com',
  phone: '01012345678',
};

// Step 2 유효 값
const VALID_STEP2 = {
  birthDate: '1995-06-15',
  gender: 'male',
  nickname: 'tester',
};

/** Step 1을 유효값으로 채우고 다음 버튼을 클릭 */
async function fillStep1AndNext(page: import('@playwright/test').Page) {
  await page.getByLabel(/아이디/i).fill(VALID_STEP1.userId);
  await page.getByLabel(/^비밀번호$/i).fill(VALID_STEP1.password);
  await page.getByLabel(/비밀번호 확인/i).fill(VALID_STEP1.confirmPassword);
  await page.getByLabel(/이메일/i).fill(VALID_STEP1.email);
  await page.getByLabel(/전화번호/i).fill(VALID_STEP1.phone);
  await page.getByRole('button', { name: '다음' }).click();
}

/** Step 2를 유효값으로 채우고 다음 버튼을 클릭 */
async function fillStep2AndNext(page: import('@playwright/test').Page) {
  await page.getByLabel(/생년월일/i).fill(VALID_STEP2.birthDate);
  await page.getByRole('radio', { name: '남성' }).check();
  await page.getByLabel(/닉네임/i).fill(VALID_STEP2.nickname);
  await page.getByRole('button', { name: '다음' }).click();
}

// ══════════════════════════════════════════════
// Step 1 — 계정 정보 입력
// ══════════════════════════════════════════════
test.describe('Step 1 — 계정 정보 입력', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  // Req 1.1
  test('5개 필드가 순서대로 표시된다', async ({ page }) => {
    await expect(page.getByLabel(/아이디/i)).toBeVisible();
    await expect(page.getByLabel(/^비밀번호$/i)).toBeVisible();
    await expect(page.getByLabel(/비밀번호 확인/i)).toBeVisible();
    await expect(page.getByLabel(/이메일/i)).toBeVisible();
    await expect(page.getByLabel(/전화번호/i)).toBeVisible();
  });

  // Req 1.2 — userId 유효성
  test('userId: 영문 소문자+숫자 4~20자 외 입력 시 에러 표시', async ({ page }) => {
    const input = page.getByLabel(/아이디/i);
    await input.fill('ab'); // 3자 → 에러
    await input.blur();
    await expect(page.getByRole('alert').filter({ hasText: /4~20자/ })).toBeVisible();
  });

  test('userId: 한글 입력 시 에러 표시', async ({ page }) => {
    const input = page.getByLabel(/아이디/i);
    await input.fill('홍길동');
    await input.blur();
    await expect(page.getByRole('alert').filter({ hasText: /영문 소문자/ })).toBeVisible();
  });

  test('userId: 유효한 값 입력 시 에러 없음', async ({ page }) => {
    const input = page.getByLabel(/아이디/i);
    await input.fill('valid01');
    await input.blur();
    await expect(page.getByRole('alert').filter({ hasText: /4~20자/ })).not.toBeVisible();
  });

  // Req 1.3 — password 유효성
  test('password: 대소문자·숫자·특수문자 미포함 시 에러', async ({ page }) => {
    const input = page.getByLabel(/^비밀번호$/i);
    await input.fill('password');
    await input.blur();
    await expect(page.getByRole('alert').filter({ hasText: /대소문자/ })).toBeVisible();
  });

  test('password: helper text가 항상 표시된다', async ({ page }) => {
    // 에러와 별개로 helper text는 항상 보여야 함
    await expect(page.getByText(/대소문자.*숫자.*특수문자/i)).toBeVisible();
  });

  test('password: 표시/숨김 토글 버튼이 동작한다', async ({ page }) => {
    const input = page.getByLabel(/^비밀번호$/i);
    await expect(input).toHaveAttribute('type', 'password');
    await page.getByRole('button', { name: /비밀번호 표시|보이기|toggle/i }).click();
    await expect(input).toHaveAttribute('type', 'text');
  });

  // Req 1.4 — confirmPassword
  test('confirmPassword: password와 불일치 시 에러', async ({ page }) => {
    await page.getByLabel(/^비밀번호$/i).fill('Test1234!');
    const confirm = page.getByLabel(/비밀번호 확인/i);
    await confirm.fill('Different1!');
    await confirm.blur();
    await expect(page.getByRole('alert').filter({ hasText: /일치하지 않습니다/ })).toBeVisible();
  });

  test('EC-04: password 변경 시 confirmPassword가 재검증된다', async ({ page }) => {
    const pw = page.getByLabel(/^비밀번호$/i);
    const confirm = page.getByLabel(/비밀번호 확인/i);

    // 먼저 일치하는 값으로 채움
    await pw.fill('Test1234!');
    await confirm.fill('Test1234!');
    await confirm.blur();
    await expect(page.getByRole('alert').filter({ hasText: /일치하지 않습니다/ })).not.toBeVisible();

    // password만 변경 → confirmPassword 자동 재검증
    await pw.fill('NewPass5@');
    await expect(page.getByRole('alert').filter({ hasText: /일치하지 않습니다/ })).toBeVisible();
  });

  // Req 1.5 — email
  test('email: 잘못된 형식 입력 시 에러', async ({ page }) => {
    const input = page.getByLabel(/이메일/i);
    await input.fill('notanemail');
    await input.blur();
    await expect(page.getByRole('alert').filter({ hasText: /이메일 형식/ })).toBeVisible();
  });

  // Req 1.6 — phone 포매팅
  test('phone: 숫자 입력 시 010-XXXX-XXXX 형식으로 자동 포매팅', async ({ page }) => {
    const input = page.getByLabel(/전화번호/i);
    await input.fill('01012345678');
    await expect(input).toHaveValue('010-1234-5678');
  });

  test('phone: 010 외 번호 입력 시 에러', async ({ page }) => {
    const input = page.getByLabel(/전화번호/i);
    await input.fill('01112345678');
    await input.blur();
    await expect(page.getByRole('alert').filter({ hasText: /010으로 시작/ })).toBeVisible();
  });

  // Req 1.7 — 다음 버튼 클릭 시 검증
  test('빈 폼으로 다음 클릭 시 에러가 일괄 표시되고 Step 2로 이동하지 않는다', async ({ page }) => {
    await page.getByRole('button', { name: '다음' }).click();
    const alerts = page.getByRole('alert');
    await expect(alerts).toHaveCount({ minimum: 1 } as never);
    // ProgressBar가 여전히 Step 1 상태
    await expect(page.getByLabel(/아이디/i)).toBeVisible();
  });

  // Req 1.8 — 빈 값 onBlur 에러 억제
  test('한 번도 입력 안 한 필드는 blur 시 에러를 표시하지 않는다', async ({ page }) => {
    const input = page.getByLabel(/아이디/i);
    await input.focus();
    await input.blur();
    await expect(page.getByRole('alert')).not.toBeVisible();
  });

  // Req 1.9 — 접근성
  test('에러 발생 시 aria-invalid="true"와 aria-describedby가 설정된다', async ({ page }) => {
    await page.getByRole('button', { name: '다음' }).click();
    const input = page.getByLabel(/아이디/i);
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    const describedBy = await input.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
  });
});

// ══════════════════════════════════════════════
// Step 2 — 개인 정보 입력
// ══════════════════════════════════════════════
test.describe('Step 2 — 개인 정보 입력', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    await fillStep1AndNext(page);
  });

  // Req 2.1
  test('3개 필드가 표시된다 (birthDate, gender, nickname)', async ({ page }) => {
    await expect(page.getByLabel(/생년월일/i)).toBeVisible();
    await expect(page.getByRole('group', { name: /성별/i })).toBeVisible();
    await expect(page.getByLabel(/닉네임/i)).toBeVisible();
  });

  // Req 2.2 — birthDate
  test('birthDate: 미래 날짜 입력 시 에러', async ({ page }) => {
    await page.getByLabel(/생년월일/i).fill('2099-01-01');
    await page.getByLabel(/생년월일/i).blur();
    await expect(page.getByRole('alert').filter({ hasText: /미래 날짜/ })).toBeVisible();
  });

  test('birthDate: 존재하지 않는 날짜 (4월 31일) 입력 시 에러', async ({ page }) => {
    await page.getByLabel(/생년월일/i).fill('2000-04-31');
    await page.getByLabel(/생년월일/i).blur();
    await expect(page.getByRole('alert').filter({ hasText: /생년월일/ })).toBeVisible();
  });

  test('birthDate: 윤년 아닌 해의 2월 29일 입력 시 에러', async ({ page }) => {
    await page.getByLabel(/생년월일/i).fill('2023-02-29');
    await page.getByLabel(/생년월일/i).blur();
    await expect(page.getByRole('alert').filter({ hasText: /생년월일/ })).toBeVisible();
  });

  // Req 2.3 — gender fieldset
  test('gender: fieldset+legend 구조로 3개 라디오 버튼 제공', async ({ page }) => {
    const fieldset = page.getByRole('group', { name: /성별/i });
    await expect(fieldset.getByRole('radio', { name: '남성' })).toBeVisible();
    await expect(fieldset.getByRole('radio', { name: '여성' })).toBeVisible();
    await expect(fieldset.getByRole('radio', { name: '기타' })).toBeVisible();
  });

  test('gender: 선택 안 하고 다음 클릭 시 에러', async ({ page }) => {
    await page.getByRole('button', { name: '다음' }).click();
    await expect(page.getByRole('alert').filter({ hasText: /성별을 선택/ })).toBeVisible();
  });

  // Req 2.4 — nickname optional
  test('nickname: 빈 값으로 다음 이동 가능 (선택사항)', async ({ page }) => {
    await page.getByLabel(/생년월일/i).fill(VALID_STEP2.birthDate);
    await page.getByRole('radio', { name: '남성' }).check();
    // nickname 비워둠
    await page.getByRole('button', { name: '다음' }).click();
    // Step 3으로 이동 확인
    await expect(page.getByText(/SNS|소셜/i)).toBeVisible();
  });

  test('nickname: 1자 입력 시 에러 (최소 2자)', async ({ page }) => {
    const input = page.getByLabel(/닉네임/i);
    await input.fill('a');
    await input.blur();
    await expect(page.getByRole('alert').filter({ hasText: /2~10자/ })).toBeVisible();
  });

  // Req 2.6 — 이전 이동 시 데이터 보존
  test('Step 1으로 돌아갔다 다시 Step 2 오면 값이 유지된다', async ({ page }) => {
    await page.getByLabel(/생년월일/i).fill(VALID_STEP2.birthDate);
    await page.getByRole('radio', { name: '남성' }).check();
    await page.getByLabel(/닉네임/i).fill(VALID_STEP2.nickname);

    await page.getByRole('button', { name: '이전' }).click();
    await page.getByRole('button', { name: '다음' }).click();

    await expect(page.getByLabel(/생년월일/i)).toHaveValue(VALID_STEP2.birthDate);
    await expect(page.getByRole('radio', { name: '남성' })).toBeChecked();
    await expect(page.getByLabel(/닉네임/i)).toHaveValue(VALID_STEP2.nickname);
  });
});

// ══════════════════════════════════════════════
// Step 3 — SNS 계정 연결
// ══════════════════════════════════════════════
test.describe('Step 3 — SNS 계정 연결', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    await fillStep1AndNext(page);
    await fillStep2AndNext(page);
  });

  // Req 3.1
  test('Google, GitHub, Kakao 토글 버튼이 표시된다', async ({ page }) => {
    await expect(page.getByRole('button', { name: /google/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /github/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /kakao/i })).toBeVisible();
  });

  test('선택사항 안내 문구가 표시된다', async ({ page }) => {
    await expect(page.getByText(/선택사항|연결하지 않아도/i)).toBeVisible();
  });

  // Req 3.3 — 토글 동작
  test('SNS 버튼 클릭 시 연결됨 상태로 전환된다', async ({ page }) => {
    const btn = page.getByRole('button', { name: /google/i });
    await expect(btn).toHaveAttribute('aria-pressed', 'false');
    await btn.click();
    await expect(btn).toHaveAttribute('aria-pressed', 'true');
  });

  test('연결된 SNS 버튼 재클릭 시 즉시 해제된다', async ({ page }) => {
    const btn = page.getByRole('button', { name: /google/i });
    await btn.click();
    await expect(btn).toHaveAttribute('aria-pressed', 'true');
    await btn.click();
    await expect(btn).toHaveAttribute('aria-pressed', 'false');
  });

  // Req 3.4 — aria-pressed
  test('각 SNS 버튼에 aria-pressed 속성이 있다', async ({ page }) => {
    for (const name of ['google', 'github', 'kakao']) {
      await expect(page.getByRole('button', { name: new RegExp(name, 'i') })).toHaveAttribute(
        'aria-pressed',
      );
    }
  });

  // Req 3.5 — SNS 미연결 시 제출 허용
  test('SNS 미연결 상태에서도 가입 완료 버튼이 활성화된다', async ({ page }) => {
    await expect(page.getByRole('button', { name: /가입 완료/ })).toBeEnabled();
  });
});

// ══════════════════════════════════════════════
// ProgressBar (Req 5)
// ══════════════════════════════════════════════
test.describe('ProgressBar', () => {
  test('Step 1 진입 시 1단계가 현재 단계로 표시된다', async ({ page }) => {
    await page.goto(URL);
    // Step 1 인디케이터: white 배경 + blue 테두리 (aria-current 또는 data-state로 확인)
    const step1 = page.getByTestId('progress-step-1');
    await expect(step1).toHaveAttribute('aria-current', 'step');
  });

  test('Step 2 진입 시 Step 1은 완료, Step 2는 현재 상태', async ({ page }) => {
    await page.goto(URL);
    await fillStep1AndNext(page);
    await expect(page.getByTestId('progress-step-1')).toHaveAttribute('data-status', 'completed');
    await expect(page.getByTestId('progress-step-2')).toHaveAttribute('aria-current', 'step');
  });
});

// ══════════════════════════════════════════════
// FormNavigation (Req 6)
// ══════════════════════════════════════════════
test.describe('FormNavigation', () => {
  test('Step 1에서는 이전 버튼이 없다', async ({ page }) => {
    await page.goto(URL);
    await expect(page.getByRole('button', { name: '이전' })).not.toBeVisible();
  });

  test('Step 2에서는 이전 버튼이 표시된다', async ({ page }) => {
    await page.goto(URL);
    await fillStep1AndNext(page);
    await expect(page.getByRole('button', { name: '이전' })).toBeVisible();
  });

  test('Step 3에서는 "다음" 대신 "가입 완료" 버튼이 표시된다', async ({ page }) => {
    await page.goto(URL);
    await fillStep1AndNext(page);
    await fillStep2AndNext(page);
    await expect(page.getByRole('button', { name: /가입 완료/ })).toBeVisible();
    await expect(page.getByRole('button', { name: '다음' })).not.toBeVisible();
  });
});

// ══════════════════════════════════════════════
// Mock Submit + 완료 화면 (Req 7)
// ══════════════════════════════════════════════
test.describe('Mock Submit & 완료 화면', () => {
  test('가입 완료 후 성공 화면이 표시된다 (닉네임 + 이메일 + SNS)', async ({ page }) => {
    await page.goto(URL);
    await fillStep1AndNext(page);
    await fillStep2AndNext(page);

    // Google 연결
    await page.getByRole('button', { name: /google/i }).click();
    await page.getByRole('button', { name: /가입 완료/ }).click();

    // 500ms 딜레이 후 성공 화면
    await expect(page.getByRole('status')).toBeVisible({ timeout: 3000 });
    await expect(page.getByText(new RegExp(VALID_STEP2.nickname, 'i'))).toBeVisible();
    await expect(page.getByText(VALID_STEP1.email)).toBeVisible();
    await expect(page.getByText(/google/i)).toBeVisible();
  });

  test('닉네임 미입력 시 userId로 환영 메시지 표시', async ({ page }) => {
    await page.goto(URL);
    await fillStep1AndNext(page);

    // nickname 없이 Step 2
    await page.getByLabel(/생년월일/i).fill(VALID_STEP2.birthDate);
    await page.getByRole('radio', { name: '남성' }).check();
    await page.getByRole('button', { name: '다음' }).click();
    await page.getByRole('button', { name: /가입 완료/ }).click();

    await expect(page.getByRole('status')).toBeVisible({ timeout: 3000 });
    await expect(page.getByText(new RegExp(VALID_STEP1.userId, 'i'))).toBeVisible();
  });

  test('SNS 미연결 시 "연결된 SNS 없음" 표시', async ({ page }) => {
    await page.goto(URL);
    await fillStep1AndNext(page);
    await fillStep2AndNext(page);
    await page.getByRole('button', { name: /가입 완료/ }).click();

    await expect(page.getByRole('status')).toBeVisible({ timeout: 3000 });
    await expect(page.getByText(/연결된 SNS 없음/i)).toBeVisible();
  });

  test('완료 화면에 "포트폴리오 둘러보기" CTA 버튼이 있다', async ({ page }) => {
    await page.goto(URL);
    await fillStep1AndNext(page);
    await fillStep2AndNext(page);
    await page.getByRole('button', { name: /가입 완료/ }).click();

    await expect(page.getByRole('link', { name: /포트폴리오 둘러보기/i })).toBeVisible({
      timeout: 3000,
    });
  });

  // Req 6.3 — 제출 중 비활성화
  test('가입 완료 버튼 클릭 후 비활성화되어 중복 제출이 방지된다', async ({ page }) => {
    await page.goto(URL);
    await fillStep1AndNext(page);
    await fillStep2AndNext(page);

    const submitBtn = page.getByRole('button', { name: /가입 완료/ });
    await submitBtn.click();
    await expect(submitBtn).toBeDisabled();
  });
});

// ══════════════════════════════════════════════
// 단계 간 데이터 보존 (Req 4)
// ══════════════════════════════════════════════
test.describe('단계 간 데이터 보존', () => {
  test('Step 1 → Step 2 → Step 1 복귀 시 Step 1 값이 유지된다', async ({ page }) => {
    await page.goto(URL);
    await fillStep1AndNext(page);
    await page.getByRole('button', { name: '이전' }).click();

    await expect(page.getByLabel(/아이디/i)).toHaveValue(VALID_STEP1.userId);
    await expect(page.getByLabel(/이메일/i)).toHaveValue(VALID_STEP1.email);
  });
});
