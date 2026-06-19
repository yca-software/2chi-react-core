import { cn } from '../../lib/utils';
import { Input } from './input';

export type DropdownSelectSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
};

export function DropdownSelectSearchInput({
  value,
  onChange,
  placeholder = 'Search…',
  className,
  autoFocus = false,
}: DropdownSelectSearchInputProps) {
  return (
    <div className={cn('shrink-0 px-1 pb-2 pt-1', className)}>
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        autoFocus={autoFocus}
        onKeyDown={(event) => event.stopPropagation()}
      />
    </div>
  );
}
