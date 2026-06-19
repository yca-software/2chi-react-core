import { CheckSquare, X } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/utils';
import { Badge } from './badge';
import { Button } from './button';
import { Checkbox } from './checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { DropdownScrollableList } from './dropdown-scrollable-list';
import { Input } from './input';

export interface MultiSelectOption {
  value: string;
  label: string;
}

export interface MultiSelectTranslations {
  triggerLabel?: string;
  searchPlaceholder?: string;
  noOptionsText?: string;
  removeOptionAriaLabel?: string;
}

interface MultiSelectProps {
  value: string[];
  onValueChange: (value: string[]) => void;
  options: MultiSelectOption[];
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
  /** When true, selected values render as removable tags above the trigger. */
  showSelectedTags?: boolean;
  translations?: MultiSelectTranslations;
}

const DEFAULT_TRANSLATIONS: Required<MultiSelectTranslations> = {
  triggerLabel: 'Select options',
  searchPlaceholder: 'Search...',
  noOptionsText: 'No options',
  removeOptionAriaLabel: 'Remove',
};

function MultiSelect({
  value,
  onValueChange,
  options,
  disabled = false,
  className,
  'aria-label': ariaLabel,
  showSelectedTags = false,
  translations,
}: MultiSelectProps) {
  const t = { ...DEFAULT_TRANSLATIONS, ...translations };
  const [search, setSearch] = React.useState('');
  const selectedSet = React.useMemo(() => new Set(value), [value]);
  const labelByValue = React.useMemo(() => {
    const map = new Map<string, string>();
    for (const opt of options) map.set(opt.value, opt.label);
    return map;
  }, [options]);
  const filteredOptions = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return options;
    return options.filter((opt) => opt.label.toLowerCase().includes(q));
  }, [options, search]);

  const toggle = (optionValue: string, checked: boolean) => {
    if (checked) {
      onValueChange([...value, optionValue]);
      return;
    }
    onValueChange(value.filter((item) => item !== optionValue));
  };

  return (
    <div className={cn('space-y-2', className)}>
      {showSelectedTags && value.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {value.map((optionValue) => {
            const label = labelByValue.get(optionValue) ?? optionValue;
            return (
              <Badge key={optionValue} variant="secondary" className="gap-1 pr-1 font-normal">
                {label}
                {!disabled ? (
                  <button
                    type="button"
                    className="rounded-full p-0.5 hover:bg-muted-foreground/20"
                    aria-label={`${t.removeOptionAriaLabel} ${label}`}
                    onClick={() => toggle(optionValue, false)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                ) : null}
              </Badge>
            );
          })}
        </div>
      ) : null}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="w-full justify-between"
            aria-label={ariaLabel ?? t.triggerLabel}
            disabled={disabled}
          >
            <span className="inline-flex items-center gap-2">
              <CheckSquare className="h-4 w-4" />
              {t.triggerLabel}
            </span>
            {!showSelectedTags && value.length > 0 ? (
              <Badge variant="secondary">{value.length}</Badge>
            ) : null}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="z-120 flex w-(--radix-dropdown-menu-trigger-width) min-w-[16rem] flex-col overflow-hidden p-0"
        >
          <div className="shrink-0 px-1 pb-2 pt-1">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t.searchPlaceholder}
              aria-label={t.searchPlaceholder}
            />
          </div>
          <DropdownScrollableList
            grow={false}
            scrollAreaClassName="max-h-52 overflow-y-auto"
            scrollKey={`${filteredOptions.length}:${search}`}
          >
            {filteredOptions.length === 0 ? (
              <p className="px-2 py-1.5 text-sm text-muted-foreground">{t.noOptionsText}</p>
            ) : (
              filteredOptions.map((option) => {
                const checked = selectedSet.has(option.value);
                return (
                  <DropdownMenuItem
                    key={option.value}
                    onSelect={(event) => {
                      event.preventDefault();
                      toggle(option.value, !checked);
                    }}
                  >
                    <Checkbox checked={checked} />
                    {option.label}
                  </DropdownMenuItem>
                );
              })
            )}
          </DropdownScrollableList>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export { MultiSelect };
