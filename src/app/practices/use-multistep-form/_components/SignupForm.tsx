'use client';
import { useState } from 'react';
import { Step1Form } from './Step1AccountForm';
import { StepIndicator } from './StepIndicator';
import { Step2Form } from './Step2PersonnalForm';
import { Step3Form } from './Step3SocialForm';

import { useForm, FormProvider } from 'react-hook-form';
import { type Step, STEP_FIELDS } from '../_schema/stepSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '../_schema/stepSchemas';

export const SignupForm = () => {
  const [step, setStep] = useState<Step>(1);
  const methods = useForm({
    resolver: zodResolver(formSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: { sns: [] },
  });

  // const onSubmit = (data: FormData) => console.log(data);
  const { trigger } = methods;

  const handlePrev = () => {
    if (step === 'done') return;

    setStep((step - 1) as Step);
  };

  const handleNext = async () => {
    if (step === 'done') return;

    const isValid = await trigger(STEP_FIELDS[step]);
    if (isValid) setStep((step + 1) as Step);
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
