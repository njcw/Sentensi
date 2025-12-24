import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type LoaderProps = {
  size?: number;
  className?: string;
};

export default function Loader({ size = 24, className }: LoaderProps) {
  return (
    <div className={cn('flex h-full w-full items-center justify-center', className)}>
      <Loader2
        size={size}
        className="animate-spin text-primary"
      />
    </div>
  );
}
