import { useFormContext } from 'react-hook-form';
import { useKakaoPostcodePopup } from 'react-daum-postcode';
import {
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { FormData } from '../_schema/stepSchemas';

const POSTCODE_SCRIPT_URL = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

// 생일 성별 주소
export const Step2Form = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<FormData>();

  const today = new Date().toISOString().split('T')[0];
  const address = watch('address');

  const openPostcode = useKakaoPostcodePopup(POSTCODE_SCRIPT_URL);

  const handleAddressSearch = () => {
    openPostcode({
      onComplete: (data) => {
        setValue('address', data.address, { shouldValidate: true });
      },
    });
  };

  return (
    <form>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>개인정보</FieldLegend>
          <FieldDescription>단계2: 개인정보를 입력하세요</FieldDescription>

          <FieldLabel htmlFor="birthDate">생년월일</FieldLabel>
          <div className="relative">
            <Input
              id="birthDate"
              type="date"
              max={today}
              aria-describedby={errors.birthDate ? 'birthDate-error' : undefined}
              {...register('birthDate')}
            />
          </div>
          <span role="alert" className="text-red-500 text-sm block h-5" id="birthDate-error">
            {errors.birthDate?.message ?? ''}
          </span>

          <FieldSet className="flex-row items-center gap-4 flex-wrap">
            <FieldLegend>성별</FieldLegend>
            <FieldLabel htmlFor="gender-male">남성</FieldLabel>
            <input id="gender-male" type="radio" value="male" {...register('gender')} />
            <FieldLabel htmlFor="gender-female">여성</FieldLabel>
            <input id="gender-female" type="radio" value="female" {...register('gender')} />
            <FieldLabel htmlFor="gender-other">기타</FieldLabel>
            <input id="gender-other" type="radio" value="other" {...register('gender')} />
            <span role="alert" className="text-red-500 text-sm block h-5" id="gender-error">
              {errors.gender?.message ?? ''}
            </span>
          </FieldSet>

          <FieldLabel htmlFor="address">주소</FieldLabel>
          <div className="flex gap-2">
            <Input
              id="address"
              readOnly
              placeholder="주소 검색을 눌러주세요"
              value={address ?? ''}
              aria-describedby={errors.address ? 'address-error' : undefined}
              className="cursor-pointer"
              onClick={handleAddressSearch}
              disabled={true}
            />
            <Button type="button" onClick={handleAddressSearch}>
              주소 검색
            </Button>
          </div>
          <span role="alert" className="text-red-500 text-sm block h-5" id="address-error">
            {errors.address?.message ?? ''}
          </span>

          <FieldLabel htmlFor="addressDetail">상세주소</FieldLabel>
          <Input id="addressDetail" placeholder="상세주소 입력" {...register('addressDetail')} />
        </FieldSet>
      </FieldGroup>
    </form>
  );
};
