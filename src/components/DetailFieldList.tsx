import { cn } from '../lib/utils';

export interface DetailField {
  label: string;
  value: React.ReactNode;
  /** Span 2 columns on sm+ */
  span?: 1 | 2;
}

export type DetailFieldVariant = 'plain' | 'bordered';

export interface DetailFieldListProps {
  fields: DetailField[];
  className?: string;
  /** When `bordered`, each label/value group is shown in a subtle framed cell. */
  fieldVariant?: DetailFieldVariant;
}

/** Definition list for detail views. Responsive two-column grid on sm+. */
export function DetailFieldList({
  fields,
  className,
  fieldVariant = 'plain',
}: DetailFieldListProps) {
  return (
    <dl className={cn('grid gap-4 sm:grid-cols-2', className)}>
      {fields.map((field, i) => (
        <div
          key={`${field.label}-${i}`}
          className={cn(
            'space-y-1',
            fieldVariant === 'bordered' && 'rounded-lg border bg-muted/20 px-3 py-2.5',
            field.span === 2 && 'sm:col-span-2',
          )}
        >
          <dt className="text-sm font-medium text-muted-foreground">{field.label}</dt>
          <dd className="text-sm break-words">{field.value}</dd>
        </div>
      ))}
    </dl>
  );
}
