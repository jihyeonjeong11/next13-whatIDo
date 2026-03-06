import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { FieldDescription, FieldGroup, FieldLegend, FieldSet } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import type { FormData, SnsProvider } from '../_schema/stepSchemas';
import { LoadingButton } from '@/components/ui/loading-button';

const SNS_LIST: { provider: SnsProvider; label: string }[] = [
  { provider: 'kakao', label: '카카오' },
  { provider: 'naver', label: '네이버' },
  { provider: 'google', label: '구글' },
  { provider: 'github', label: '깃허브' },
];

// 소셜 연결 버튼
export const Step3Form = () => {
  const { watch, setValue } = useFormContext<FormData>();
  const sns = watch('sns');
  const [loadingProvider, setLoadingProvider] = useState<SnsProvider | null>(null);

  const toggle = (provider: SnsProvider) => {
    setLoadingProvider(provider);
    setTimeout(() => {
      if (sns.includes(provider)) {
        setValue(
          'sns',
          sns.filter((p) => p !== provider),
        );
      } else {
        setValue('sns', [...sns, provider]);
      }
      setLoadingProvider(null);
    }, 1500);
  };

  return (
    <FieldGroup>
      <FieldSet>
        <FieldLegend>소셜계정 연결</FieldLegend>
        <FieldDescription>단계3: 소셜계정과 연결하세요 (선택사항)</FieldDescription>
        {SNS_LIST.map(({ provider, label }) => {
          const isLoading = loadingProvider === provider;
          const isConnected = sns.includes(provider);
          return (
            <div key={provider} className="flex gap-4 items-center">
              <span className="w-15">{label}</span>
              <LoadingButton
                type="button"
                className="min-w-30"
                disabled={loadingProvider !== null}
                loading={isLoading}
                onClick={() => toggle(provider)}
              >
                {isConnected ? '연결 해제' : '연결'}
              </LoadingButton>
            </div>
          );
        })}
      </FieldSet>
    </FieldGroup>
  );
};
