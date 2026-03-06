'use client';
import { useState } from 'react';
import { Step1Form } from './Step1AccountForm';
import { StepIndicator } from './StepIndicator';
import { Step2Form } from './Step2PersonnalForm';
import { Step3Form } from './Step3SocialForm';

import { useForm, FormProvider } from 'react-hook-form';
import { type Step, STEP_SCHEMAS, formSchema, type FormData } from '../_schema/stepSchemas';
import { zodResolver } from '@hookform/resolvers/zod';

export const SignupForm = () => {
  const [step, setStep] = useState<Step>(1);
  const methods = useForm({
    resolver: zodResolver(formSchema),
    mode: 'all',
    defaultValues: { sns: [] },
    shouldFocusError: false,
  });

  const handlePrev = () => {
    if (step === 'done') return;
    setStep((step - 1) as Step);
  };

  const handleNext = async () => {
    if (step === 'done') return;

    const values = methods.getValues();
    const result = STEP_SCHEMAS[step].safeParse(values);

    if (result.success) {
      setStep((step + 1) as Step);
    } else {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormData;
        if (field) methods.setError(field, { message: issue.message });
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="px-6 pb-4">
        <StepIndicator step={step} handlePrev={handlePrev} handleNext={handleNext} />
      </div>
      {step === 1 && <Step1Form />}
      {step === 2 && <Step2Form />}
      {step === 3 && <Step3Form />}
    </FormProvider>
  );
};
