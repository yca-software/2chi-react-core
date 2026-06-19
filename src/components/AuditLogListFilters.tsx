import { Search } from 'lucide-react';

import { Input } from './ui/input';
import { Select } from './ui/select';

export type AuditLogFilterOption = {
  value: string;
  label: string;
};

export type AuditLogListFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  action: string;
  onActionChange: (value: string) => void;
  resourceType: string;
  onResourceTypeChange: (value: string) => void;
  actionOptions: AuditLogFilterOption[];
  resourceOptions: AuditLogFilterOption[];
  searchPlaceholder: string;
  actionFilterLabel: string;
  resourceFilterLabel: string;
};

export function AuditLogListFilters({
  search,
  onSearchChange,
  action,
  onActionChange,
  resourceType,
  onResourceTypeChange,
  actionOptions,
  resourceOptions,
  searchPlaceholder,
  actionFilterLabel,
  resourceFilterLabel,
}: AuditLogListFiltersProps) {
  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:flex-wrap lg:items-center">
      <div className="relative w-full lg:max-w-md">
        <Search
          className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          className="pl-9"
          placeholder={searchPlaceholder}
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          aria-label={searchPlaceholder}
        />
      </div>
      <Select
        className="w-full lg:w-44"
        value={action}
        onValueChange={onActionChange}
        options={actionOptions}
        aria-label={actionFilterLabel}
      />
      <Select
        className="w-full lg:w-52"
        value={resourceType}
        onValueChange={onResourceTypeChange}
        options={resourceOptions}
        aria-label={resourceFilterLabel}
      />
    </div>
  );
}
