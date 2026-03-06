import { useFormContext } from 'react-hook-form';
import { FieldDescription, FieldGroup, FieldLegend, FieldSet } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import type { FormData, SnsProvider } from '../_schema/stepSchemas';

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

  const toggle = (provider: SnsProvider) => {
    if (sns.includes(provider)) {
      setValue('sns', sns.filter((p) => p !== provider));
    } else {
      setValue('sns', [...sns, provider]);
    }
  };

  return (
    <FieldGroup>
      <FieldSet>
        <FieldLegend>소셜계정 연결</FieldLegend>
        <FieldDescription>단계3: 소셜계정과 연결하세요 (선택사항)</FieldDescription>
        {SNS_LIST.map(({ provider, label }) => (
          <div key={provider}>
            <span>{label}</span>
            <Button type="button" onClick={() => toggle(provider)}>
              {sns.includes(provider) ? '연결 해제' : '연결'}
            </Button>
          </div>
        ))}
      </FieldSet>
    </FieldGroup>
  );
};
