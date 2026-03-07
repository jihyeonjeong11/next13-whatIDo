import { test, expect, type Page } from '@playwright/test';

const URL = '/practices/use-multistep-form';

// Helper: 유효한 Step1 데이터로 채우기
async function fillStep1(page: Page) {
  await page.fill('input[name="username"]', 'user1234');
  await page.fill('input[name="password"]', 'Password1!');
  await page.fill('input[name="confirmPassword"]', 'Password1!');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="phone"]', '01012345678');
}

// Helper: 유효한 Step2 데이터로 채우기
async function fillStep2(page: Page) {
  await page.fill('input[name="birthDate"]', '1995-06-15');
  await page.locator('input[name="gender"][value="male"]').check();
  await page.fill('input[name="address"]', '서울시 강남구 테헤란로 123');
}

// ─────────────────────────────────────────
// AC-11: Step indicator 현재 단계 하이라이트
// ─────────────────────────────────────────
test.describe('AC-11: StepIndicator', () => {
  test('초기 진입 시 Step 1이 현재 단계로 표시된다', async ({ page }) => {
    await page.goto(URL);
    const currentStep = page.locator('[aria-current="step"]');
    await expect(currentStep).toHaveCount(1);
    await expect(currentStep.locator('svg.lucide-user-plus')).toBeVisible();
  });
});

// ─────────────────────────────────────────
// AC-01: username 유효성
// ─────────────────────────────────────────
test.describe('AC-01: username', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  test('6자 미만 입력 시 에러 메시지 표시', async ({ page }) => {
    await page.fill('input[name="username"]', 'abc');
    await page.locator('input[name="username"]').blur();
    await expect(page.locator('[role="alert"]').filter({ hasText: '6' })).toBeVisible();
  });

  test('20자 초과 입력 시 에러 메시지 표시', async ({ page }) => {
    await page.fill('input[name="username"]', 'a'.repeat(21));
    await page.locator('input[name="username"]').blur();
    await expect(page.locator('[role="alert"]').filter({ hasText: '영문과 숫자' })).toBeVisible();
  });

  test('특수문자 포함 시 에러 메시지 표시', async ({ page }) => {
    await page.fill('input[name="username"]', 'user!!');
    await page.locator('input[name="username"]').blur();
    await expect(page.locator('[role="alert"]').filter({ hasText: '영문과 숫자' })).toBeVisible();
  });

  test('영문+숫자 6자 이상 입력 시 에러 없음', async ({ page }) => {
    await page.fill('input[name="username"]', 'user1234');
    await page.locator('input[name="username"]').blur();
    await expect(
      page.locator('[role="alert"]').filter({ hasText: '영문과 숫자' }),
    ).not.toBeVisible();
  });
});

// ─────────────────────────────────────────
// AC-02: password 유효성
// ─────────────────────────────────────────
test.describe('AC-02: password', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  test('8자 미만 입력 시 에러 메시지 표시', async ({ page }) => {
    await page.fill('input[name="password"]', 'Pass1!');
    await page.locator('input[name="password"]').blur();
    await expect(page.locator('[role="alert"]').filter({ hasText: '8자' })).toBeVisible();
  });

  test('특수문자 미포함 시 에러 메시지 표시', async ({ page }) => {
    await page.fill('input[name="password"]', 'Password1');
    await page.locator('input[name="password"]').blur();
    await expect(page.locator('[role="alert"]').filter({ hasText: '특수문자' })).toBeVisible();
  });

  test('password 보기/숨기기 토글', async ({ page }) => {
    await page.fill('input[name="password"]', 'Password1!');
    const toggle = page.locator('button[aria-label*="비밀번호"]').first();
    await expect(page.locator('input[name="password"]')).toHaveAttribute('type', 'password');
    await toggle.click();
    await expect(page.locator('input[name="password"]')).toHaveAttribute('type', 'text');
  });
});

// ─────────────────────────────────────────
// AC-03: confirmPassword 불일치 에러
// ─────────────────────────────────────────
test.describe('AC-03: confirmPassword', () => {
  test('password와 불일치 시 에러 메시지 표시', async ({ page }) => {
    await page.goto(URL);
    await page.fill('input[name="password"]', 'Password1!');
    await page.fill('input[name="confirmPassword"]', 'Different1!');
    await page.locator('input[name="confirmPassword"]').blur();
    await expect(
      page.locator('[role="alert"]').filter({ hasText: '비밀번호가 일치' }),
    ).toBeVisible();
  });
});

// ─────────────────────────────────────────
// AC-04: email 형식 검증
// ─────────────────────────────────────────
test.describe('AC-04: email', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  test('잘못된 이메일 형식 시 에러 표시', async ({ page }) => {
    await page.fill('input[name="email"]', 'notanemail');
    await page.locator('input[name="email"]').blur();
    await expect(page.locator('[role="alert"]').filter({ hasText: '이메일' })).toBeVisible();
  });

  test('올바른 이메일 형식 시 에러 없음', async ({ page }) => {
    await page.fill('input[name="email"]', 'test@example.com');
    await page.locator('input[name="email"]').blur();
    await expect(page.locator('[role="alert"]').filter({ hasText: '이메일' })).not.toBeVisible();
  });
});

// ─────────────────────────────────────────
// AC-05: phone 형식 + 자동 포맷
// ─────────────────────────────────────────
test.describe('AC-05: phone', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  test('숫자 입력 시 010-XXXX-XXXX 형식으로 자동 포맷', async ({ page }) => {
    await page.fill('input[name="phone"]', '01012345678');
    await expect(page.locator('input[name="phone"]')).toHaveValue('010-1234-5678');
  });

  test('잘못된 형식 blur 시 에러 표시', async ({ page }) => {
    await page.fill('input[name="phone"]', '010-12');
    await page.locator('input[name="phone"]').blur();
    await expect(page.locator('[role="alert"]').filter({ hasText: '010' })).toBeVisible();
  });

  test('phone input에 inputMode="tel" 설정', async ({ page }) => {
    await expect(page.locator('input[name="phone"]')).toHaveAttribute('inputmode', 'tel');
  });
});

// ─────────────────────────────────────────
// AC-13: Step 1→2 전체 유효할 때만 이동
// ─────────────────────────────────────────
test.describe('AC-13: Step 1 → 2 이동 조건', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  test('Step1 미완성 상태에서 다음 버튼 클릭 시 Step 2로 이동 안 됨', async ({ page }) => {
    await page.click('button:has-text("다음")');
    await expect(page.locator('[aria-current="step"]')).toContainText('1');
  });

  test('Step1 모두 유효하면 다음 버튼 클릭 시 Step 2로 이동', async ({ page }) => {
    await fillStep1(page);
    await page.click('button:has-text("다음")');
    await expect(page.locator('[aria-current="step"]')).toContainText('2');
  });
});

// ─────────────────────────────────────────
// AC-06: birthDate 필수 + 미래 날짜 차단
// ─────────────────────────────────────────
test.describe('AC-06: birthDate', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    await fillStep1(page);
    await page.click('button:has-text("다음")');
  });

  test('birthDate input의 max 속성이 오늘 날짜로 설정됨', async ({ page }) => {
    const today = new Date().toISOString().split('T')[0];
    await expect(page.locator('input[name="birthDate"]')).toHaveAttribute('max', today);
  });
});

// ─────────────────────────────────────────
// AC-07: gender 필수 선택
// ─────────────────────────────────────────
test.describe('AC-07: gender', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    await fillStep1(page);
    await page.click('button:has-text("다음")');
  });

  test('gender 미선택 상태에서 다음 클릭 시 Step 3로 이동 안 됨', async ({ page }) => {
    await page.fill('input[name="birthDate"]', '1995-06-15');
    await page.click('button:has-text("다음")');
    await expect(page.locator('[aria-current="step"]')).toContainText('2');
  });

  test('성별 선택 후 정상 표시', async ({ page }) => {
    await page.locator('input[name="gender"][value="male"]').check();
    await expect(page.locator('input[name="gender"][value="male"]')).toBeChecked();
  });
});

// ─────────────────────────────────────────
// AC-08: address 텍스트 입력 (DaumPostcode는 모노리포 전환 후 구현)
// ─────────────────────────────────────────
test.describe('AC-08: address', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    await fillStep1(page);
    await page.click('button:has-text("다음")');
  });

  test.fixme('[주소 검색] 버튼 클릭 시 DaumPostcode 모달 열림', async ({ page }) => {
    await page.click('button:has-text("주소 검색")');
    await expect(
      page.locator('iframe[src*="daum"]').or(page.locator('[role="dialog"]')),
    ).toBeVisible({ timeout: 5000 });
  });

  test('address 미입력 상태에서 다음 클릭 시 Step 3로 이동 안 됨', async ({ page }) => {
    await page.fill('input[name="birthDate"]', '1995-06-15');
    await page.locator('input[name="gender"][value="male"]').check();
    await page.click('button:has-text("다음")');
    await expect(page.locator('[aria-current="step"]')).toContainText('2');
  });

  test.fixme('address 직접 입력 시 값이 반영됨', async ({ page }) => {
    // address는 readOnly — DaumPostcode 모달로만 입력 가능. 모달 E2E 테스트와 함께 처리
    await page.fill('input[name="address"]', '서울시 강남구 테헤란로 123');
    await expect(page.locator('input[name="address"]')).toHaveValue('서울시 강남구 테헤란로 123');
  });
});

// ─────────────────────────────────────────
// AC-14: Step 2→3 전체 유효할 때만 이동
// ─────────────────────────────────────────
test.describe('AC-14: Step 2 → 3 이동 조건', () => {
  test('Step2 미완성 시 Step 3로 이동 안 됨', async ({ page }) => {
    await page.goto(URL);
    await fillStep1(page);
    await page.click('button:has-text("다음")');
    await page.fill('input[name="birthDate"]', '1995-06-15');
    await page.locator('input[name="gender"][value="male"]').check();
    // address 없이 다음 클릭
    await page.click('button:has-text("다음")');
    await expect(page.locator('[aria-current="step"]')).toContainText('2');
  });
});

// ─────────────────────────────────────────
// AC-10: 이전 단계 이동 시 데이터 보존
// ─────────────────────────────────────────
test.describe('AC-10: 이전 단계 이동 시 데이터 보존', () => {
  test('Step 2에서 이전 클릭 후 Step 1 입력값 유지', async ({ page }) => {
    await page.goto(URL);
    await fillStep1(page);
    await page.click('button:has-text("다음")');
    await page.click('button:has-text("이전")');
    await expect(page.locator('input[name="username"]')).toHaveValue('user1234');
    await expect(page.locator('input[name="email"]')).toHaveValue('test@example.com');
  });
});

// ─────────────────────────────────────────
// AC-09: SNS 4개 토글, 0개 허용
// ─────────────────────────────────────────
test.describe('AC-09: SNS 토글', () => {
  // Step 3 진입은 address 모달 없이 불가 → 구현 후 활성화
  test.fixme('SNS 카드 4개 모두 표시됨', async ({ page }) => {
    await expect(
      page.locator('button:has-text("연결")').or(page.locator('button:has-text("연결 해제")')),
    ).toHaveCount(4);
  });

  test.fixme('SNS 카드 클릭 시 연결/해제 토글', async ({ page }) => {
    await page.click('button:has-text("연결")');
    await expect(page.locator('button:has-text("연결 해제")')).toHaveCount(1);
  });

  test.fixme('SNS 0개 선택 상태에서도 완료 버튼 활성화', async ({ page }) => {
    await expect(page.locator('button:has-text("완료")')).toBeEnabled();
  });
});

// ─────────────────────────────────────────
// AC-12: 최종 제출 후 입력 요약 화면
// ─────────────────────────────────────────
test.describe('AC-12: SuccessView', () => {
  test.fixme('제출 완료 후 요약 화면에 입력값 표시', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('가입이 완료되었습니다');
    await expect(page.locator('table')).toContainText('user1234');
    await expect(page.locator('table')).not.toContainText('password');
  });
});
