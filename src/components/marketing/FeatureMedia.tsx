import type * as React from 'react';
import { cn } from '../../lib/utils';

export interface FeatureMediaProps {
  id?: string;
  title: string;
  description: string;
  eyebrow?: string;
  image?: { src: string; alt: string; className?: string };
  media?: React.ReactNode;
  imagePosition?: 'left' | 'right';
  className?: string;
}

/**
 * Alternating feature row: headline + copy beside an image or custom `media`.
 */
export function FeatureMedia({
  id,
  title,
  description,
  eyebrow,
  image,
  media,
  imagePosition = 'left',
  className,
}: FeatureMediaProps) {
  const mediaBlock =
    media ??
    (image ? (
      <img
        src={image.src}
        alt={image.alt}
        className={cn(
          'h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]',
          image.className,
        )}
        width={640}
        height={480}
        loading="lazy"
        decoding="async"
      />
    ) : null);

  const textBlock = (
    <div className="flex flex-col justify-center space-y-4">
      {eyebrow && <p className="text-sm font-medium text-primary">{eyebrow}</p>}
      <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h3>
      <p className="text-lg text-muted-foreground">{description}</p>
    </div>
  );

  const isLeft = imagePosition === 'left';

  return (
    <div
      id={id}
      className={cn('grid items-center gap-10 py-12 md:gap-16 md:py-16 lg:grid-cols-2', className)}
    >
      {isLeft ? (
        <>
          {mediaBlock && (
            <div className="ds-mkt-media-frame w-full lg:order-none">
              <div className="ds-mkt-media-frame-inner relative aspect-[4/3] w-full overflow-hidden bg-muted/30">
                <div className="absolute inset-0 [&_img]:h-full [&_img]:w-full [&_img]:object-cover">
                  {mediaBlock}
                </div>
              </div>
            </div>
          )}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {mediaBlock && (
            <div className="ds-mkt-media-frame w-full">
              <div className="ds-mkt-media-frame-inner relative aspect-[4/3] w-full overflow-hidden bg-muted/30">
                <div className="absolute inset-0 [&_img]:h-full [&_img]:w-full [&_img]:object-cover">
                  {mediaBlock}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
