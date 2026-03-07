'use client';
import { Button } from '@/components/ui/button';
import type { Step } from '../_schema/stepSchemas';

export const Buttons = ({
  step,
  handleNext,
  handlePrev,
}: {
  step: Step;
  handleNext: () => void;
  handlePrev: () => void;
}) => {
  if (step === 'done') return null;

  return (
    <div className="mt-14 flex w-full justify-between gap-4">
      <Button disabled={step === 1} onClick={handlePrev}>
        이전
      </Button>
      <Button onClick={handleNext}>{step === 3 ? '가입하기' : '다음'}</Button>
    </div>
  );
};
