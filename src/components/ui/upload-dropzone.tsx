import { FileText, ImagePlus, UploadCloud } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';

import { cn } from '../../lib/utils';
import { Button } from './button';
import { Checkbox } from './checkbox';

export interface UploadDropzoneTranslations {
  imageAlt?: string;
  dropHintText?: string;
  chooseImageText?: string;
  /** Used when `variant="file"` for the primary picker button label */
  chooseFileText?: string;
  removeText?: string;
  removeExistingImageText?: string;
}

const DEFAULT_TRANSLATIONS: Required<UploadDropzoneTranslations> = {
  imageAlt: 'Image',
  dropHintText: 'Drag and drop an image here, or click to choose a file.',
  chooseImageText: 'Choose image',
  chooseFileText: 'Choose file',
  removeText: 'Remove',
  removeExistingImageText: 'Remove existing image',
};

interface UploadDropzoneBaseProps {
  value: File | null;
  onChange: (file: File | null) => void;
  translations?: UploadDropzoneTranslations;
  /** Reject files larger than this size (bytes). Invokes `onFileTooLarge` when set. */
  maxSizeBytes?: number;
  onFileTooLarge?: () => void;
}

export interface UploadDropzoneImageProps extends UploadDropzoneBaseProps {
  variant?: 'image';
  existingImageUrl?: string;
  removeExistingImage?: boolean;
  onRemoveExistingImageChange?: (value: boolean) => void;
}

export interface UploadDropzoneFileProps extends UploadDropzoneBaseProps {
  variant: 'file';
  /** Passed to the native file input, e.g. `.pdf,.docx` */
  accept?: string;
  disabled?: boolean;
  className?: string;
}

export type UploadDropzoneProps = UploadDropzoneImageProps | UploadDropzoneFileProps;

function UploadDropzone(props: UploadDropzoneProps) {
  const isFile = props.variant === 'file';
  const inputId = useId();
  const removeExistingLabelId = useId();
  const pickerDisabled = isFile && props.disabled;
  const t = { ...DEFAULT_TRANSLATIONS, ...props.translations };
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isFile) {
      if (!props.value || !props.value.type.startsWith('video/')) {
        setPreviewUrl(null);
        return;
      }
      const nextUrl = URL.createObjectURL(props.value);
      setPreviewUrl(nextUrl);
      return () => URL.revokeObjectURL(nextUrl);
    }
    if (!props.value) {
      setPreviewUrl(null);
      return;
    }
    const nextUrl = URL.createObjectURL(props.value);
    setPreviewUrl(nextUrl);
    return () => URL.revokeObjectURL(nextUrl);
  }, [isFile, props.value]);

  const handleFile = (file: File | null) => {
    if (!file) return;
    if (props.maxSizeBytes != null && file.size > props.maxSizeBytes) {
      props.onFileTooLarge?.();
      return;
    }
    if (isFile) {
      if (props.disabled) return;
      props.onChange(file);
      return;
    }
    if (!file.type.startsWith('image/')) return;
    props.onChange(file);
    props.onRemoveExistingImageChange?.(false);
  };

  const displayedImage =
    !isFile && (previewUrl ?? (!props.removeExistingImage ? props.existingImageUrl : undefined));

  const dashedClasses = cn(
    'block rounded-md border-2 border-dashed p-4 transition-colors',
    pickerDisabled && 'pointer-events-none opacity-50',
    !pickerDisabled && 'cursor-pointer hover:border-primary/60 hover:bg-muted/10',
    isDragging ? 'border-primary bg-primary/5' : 'border-border',
  );

  const chooseLabel = isFile ? t.chooseFileText : t.chooseImageText;

  return (
    <div className={cn('space-y-3', isFile ? props.className : undefined)}>
      <label
        htmlFor={pickerDisabled ? undefined : inputId}
        className={dashedClasses}
        onDragOver={(event) => {
          event.preventDefault();
          if (pickerDisabled) return;
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          if (pickerDisabled) return;
          const file = event.dataTransfer.files?.[0] ?? null;
          handleFile(file);
        }}
      >
        <input
          id={inputId}
          ref={inputRef}
          type="file"
          accept={isFile ? props.accept : 'image/*'}
          disabled={pickerDisabled || undefined}
          className="sr-only"
          onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
        />
        {isFile ? (
          <div className="mb-3 flex min-h-28 flex-col items-center justify-center gap-2 rounded-md border bg-muted/20 px-3 py-4 text-center">
            {previewUrl ? (
              <video
                src={previewUrl}
                controls
                className="max-h-44 w-full rounded-md border bg-black"
              />
            ) : (
              <FileText className="h-8 w-8 shrink-0 text-muted-foreground" aria-hidden />
            )}
            {props.value ? (
              <p className="line-clamp-2 w-full break-all text-sm font-medium">
                {props.value.name}
              </p>
            ) : null}
          </div>
        ) : displayedImage ? (
          <img
            src={displayedImage}
            alt={t.imageAlt}
            className="mb-3 h-44 w-full rounded-md border object-cover"
          />
        ) : (
          <div className="mb-3 flex h-32 items-center justify-center rounded-md border bg-muted/20">
            <ImagePlus className="h-8 w-8 text-muted-foreground" aria-hidden />
          </div>
        )}

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">{t.dropHintText}</p>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={pickerDisabled || undefined}
              onClick={(event) => {
                event.preventDefault();
                inputRef.current?.click();
              }}
            >
              <UploadCloud className="mr-2 h-4 w-4" aria-hidden />
              {chooseLabel}
            </Button>
            {props.value ? (
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={pickerDisabled || undefined}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  props.onChange(null);
                }}
              >
                {t.removeText}
              </Button>
            ) : null}
          </div>
        </div>
      </label>

      {!isFile &&
      props.existingImageUrl &&
      props.onRemoveExistingImageChange &&
      t.removeExistingImageText ? (
        <div className="flex items-center justify-between rounded-md border px-3 py-2">
          <span className="text-xs text-muted-foreground" id={removeExistingLabelId}>
            {t.removeExistingImageText}
          </span>
          <Checkbox
            aria-labelledby={removeExistingLabelId}
            checked={props.removeExistingImage}
            onCheckedChange={(checked) => props.onRemoveExistingImageChange?.(checked === true)}
          />
        </div>
      ) : null}
    </div>
  );
}

export { UploadDropzone };
