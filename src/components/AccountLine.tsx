import { useRef } from 'react';
import type { WeddingAccount } from '../types/wedding';
import CopyIcon from './CopyIcon';
import { useToast } from './ToastProvider';

interface AccountLineProps {
  account: WeddingAccount;
}

export default function AccountLine({ account }: AccountLineProps) {
  const { showToast } = useToast();
  const copyButtonRef = useRef<HTMLButtonElement>(null);

  const copyText = `${account.bank} ${account.account}`;

  const notify = (message: string) => {
    showToast(message, copyButtonRef.current);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      notify('복사 완료');
    } catch {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = copyText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        notify('복사 완료');
      } catch {
        notify('복사에 실패했습니다');
      }
    }
  };

  return (
    <div className="grid grid-cols-[1fr_2.25rem] items-center gap-2">
      <p className="min-w-0 text-sm text-stone-600 leading-snug">
        {account.title}: {account.bank} {account.account} ({account.owner})
      </p>
      <button
        ref={copyButtonRef}
        type="button"
        onClick={handleCopy}
        aria-label="계좌번호 복사"
        className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-stone-300 text-stone-500 transition hover:bg-stone-100 hover:text-stone-700"
      >
        <CopyIcon />
      </button>
    </div>
  );
}
