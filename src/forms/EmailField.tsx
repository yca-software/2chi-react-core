import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '../components/ui';

type EmailFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  description?: string;
  autoComplete?: 'email' | 'username';
  className?: string;
};

export function EmailField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  autoComplete = 'email',
  className,
}: EmailFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          {description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}
          <FormControl>
            <Input type="email" placeholder={placeholder} autoComplete={autoComplete} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
