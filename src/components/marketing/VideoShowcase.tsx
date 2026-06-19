import { cn } from '../../lib/utils';

export interface VideoShowcaseProps {
  id?: string;
  title?: string;
  description?: string;
  /** Embeddable URL (YouTube/Vimeo iframe src). */
  embedUrl?: string;
  /** Native video source; ignored if `embedUrl` is set. */
  video?: {
    src: string;
    poster?: string;
    controls?: boolean;
    playsInline?: boolean;
    loop?: boolean;
    muted?: boolean;
  };
  titleAttr?: string;
  className?: string;
}

/**
 * Responsive 16:9 video frame: iframe embed or HTML5 video.
 */
export function VideoShowcase({
  id,
  title,
  description,
  embedUrl,
  video,
  titleAttr = 'Video',
  className,
}: VideoShowcaseProps) {
  return (
    <section id={id} className={cn('px-4 py-12', className)}>
      <div className="container mx-auto max-w-5xl">
        {(title || description) && (
          <div className="mb-8 text-center">
            {title && <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>}
            {description && <p className="mt-3 text-lg text-muted-foreground">{description}</p>}
          </div>
        )}
        <div
          className={cn(
            'relative aspect-video w-full overflow-hidden rounded-xl border border-border/60 bg-muted/40 shadow-lg',
            'ds-mkt-video-glow',
          )}
        >
          {embedUrl ? (
            <iframe
              title={titleAttr}
              src={embedUrl}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : video ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              controls={video.controls ?? true}
              playsInline={video.playsInline ?? true}
              loop={video.loop}
              muted={video.muted}
              poster={video.poster}
              preload="metadata"
            >
              <source src={video.src} />
            </video>
          ) : null}
        </div>
      </div>
    </section>
  );
}
