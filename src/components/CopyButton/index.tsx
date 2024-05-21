import { useCallback, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon';
import Tooltip from '../Tooltip';

type CopyButtonProps = {
  text: string;
  value: string;
  label?: string;
  onCopy?: () => void;
};

export const CopyButton = ({ label = 'Copy', onCopy, text, value }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    onCopy?.();
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [onCopy]);

  return (
    <Tooltip content={<span className="text-white">{copied ? 'Copied!' : label}</span>}>
      <CopyToClipboard text={value} onCopy={handleCopy}>
        <button className="flex items-center text-left leading-none text-slate-600 py-2 px-3 transition hover:bg-gray-200 rounded">
          {text}
          <DocumentDuplicateIcon className="inline ml-2 w-4 h-4 shrink-0" />
        </button>
      </CopyToClipboard>
    </Tooltip>
  );
};
