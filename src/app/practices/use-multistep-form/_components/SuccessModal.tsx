import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { FormData } from '../_schema/stepSchemas';

const GENDER_LABEL: Record<string, string> = {
  male: '남성',
  female: '여성',
  other: '기타',
};

const SNS_LABEL: Record<string, string> = {
  kakao: '카카오',
  naver: '네이버',
  google: '구글',
  github: '깃허브',
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <tr className="border-b last:border-0">
    <td className="py-2 pr-4 text-sm text-muted-foreground w-24 shrink-0">{label}</td>
    <td className="py-2 text-sm font-medium break-all">{value || '—'}</td>
  </tr>
);

export const SuccessModal = ({
  open,
  data,
  onClose,
}: {
  open: boolean;
  data: FormData;
  onClose: () => void;
}) => {
  const snsLabel = data.sns?.length
    ? data.sns.map((p) => SNS_LABEL[p] ?? p).join(', ')
    : '연결 없음';

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>가입 완료</DialogTitle>
        </DialogHeader>

        <table className="w-full">
          <tbody>
            <Row label="아이디" value={data.username} />
            <Row label="이메일" value={data.email} />
            <Row label="전화번호" value={data.phone} />
            <Row label="생년월일" value={data.birthDate ?? ''} />
            <Row label="성별" value={GENDER_LABEL[data.gender ?? ''] ?? ''} />
            <Row label="주소" value={data.address ?? ''} />
            {data.addressDetail && <Row label="상세주소" value={data.addressDetail} />}
            <Row label="SNS 연결" value={snsLabel} />
          </tbody>
        </table>

        <DialogFooter>
          <Button onClick={onClose}>확인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
