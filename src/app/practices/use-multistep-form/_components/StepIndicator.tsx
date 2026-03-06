'use client';

import { ClipboardList, Link2, UserPlus } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Stepper,
  StepperHeader,
  StepperIcon,
  StepperItem,
  StepperSeparator,
} from '@/components/ui/stepper';
import type { Step } from '../_schema/stepSchemas';

export function StepIndicator({
  step,
  setStep,
  handleNext,
}: {
  step: Step;
  setStep: (value: Step) => void;
  handleNext: (value: Step) => void;
}) {
  if (step === 'done') return null;

  return (
    <div className="w-full">
      <Stepper value={step} className="relative flex items-center">
        <StepperItem value={1} disabled={step < 1} className="flex-1">
          <StepperHeader className="flex w-full items-center">
            <div className="flex flex-col items-center gap-1">
              <StepperIcon
                className={cn(
                  'relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                  step === 1
                    ? 'border-primary bg-primary text-primary-foreground'
                    : step > 1
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-neutral-300 bg-neutral-100 text-neutral-400',
                )}
              >
                <UserPlus className="h-6 w-6" />
              </StepperIcon>
              <span className="text-xs text-neutral-500">1</span>
            </div>
            <StepperSeparator
              className={cn(
                'mx-2 h-0.5 flex-1 transition-colors',
                step > 1 ? 'bg-primary' : 'bg-neutral-200',
              )}
            />
          </StepperHeader>
        </StepperItem>
        <StepperItem value={2} disabled={step < 2} className="flex-1">
          <StepperHeader className="flex w-full items-center">
            <div className="flex flex-col items-center gap-1">
              <StepperIcon
                className={cn(
                  'relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                  step === 2
                    ? 'border-primary bg-primary text-primary-foreground'
                    : step > 2
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-neutral-300 bg-neutral-100 text-neutral-400',
                )}
              >
                <ClipboardList className="h-6 w-6" />
              </StepperIcon>
              <span className="text-xs text-neutral-500">2</span>
            </div>
            <StepperSeparator
              className={cn(
                'mx-2 h-0.5 flex-1 transition-colors',
                step > 2 ? 'bg-primary' : 'bg-neutral-200',
              )}
            />
          </StepperHeader>
        </StepperItem>
        <StepperItem value={3} disabled={step < 3} className="flex-1">
          <StepperHeader className="flex w-full items-center">
            <div className="flex flex-col items-center gap-1">
              <StepperIcon
                className={cn(
                  'relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                  step === 3
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-neutral-300 bg-neutral-100 text-neutral-400',
                )}
              >
                <Link2 className="h-6 w-6" />
              </StepperIcon>
              <span className="text-xs text-neutral-500">3</span>
            </div>
          </StepperHeader>
        </StepperItem>
      </Stepper>

      <div className="mt-14 flex w-full justify-between gap-4">
        <Button disabled={step === 1} onClick={() => setStep((step - 1) as Step)}>
          Previous
        </Button>
        <Button disabled={step === 3} onClick={() => handleNext(step)}>
          Next
        </Button>
      </div>
    </div>
  );
}
