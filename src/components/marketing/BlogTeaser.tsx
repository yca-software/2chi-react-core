import { ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface BlogPostTeaser {
  title: string;
  excerpt: string;
  date: string;
  href: string;
  image?: { src: string; alt: string };
}

export interface BlogTeaserProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  posts: BlogPostTeaser[];
  className?: string;
}

/**
 * Blog / changelog teaser grid with image cards and hover lift.
 */
export function BlogTeaser({ id, eyebrow, title, description, posts, className }: BlogTeaserProps) {
  return (
    <section id={id} className={cn('px-4 py-20', className)}>
      <div className="container mx-auto max-w-6xl">
        {(eyebrow || title || description) && (
          <div className="mb-12 text-center">
            {eyebrow && <p className="text-sm font-medium text-primary">{eyebrow}</p>}
            {title && (
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
            )}
            {description && (
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{description}</p>
            )}
          </div>
        )}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <a
              key={post.href}
              href={post.href}
              className={cn(
                'group ds-mkt-surface-elevated flex flex-col overflow-hidden rounded-2xl border-0 transition duration-300',
                'hover:-translate-y-1 hover:shadow-2xl',
              )}
            >
              {post.image ? (
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image.src}
                    alt={post.image.alt}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                </div>
              ) : (
                <div className="aspect-[16/10] bg-gradient-to-br from-primary/15 via-muted to-accent/20" />
              )}
              <div className="flex flex-1 flex-col p-6">
                <time
                  dateTime={post.date}
                  className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
                >
                  {post.date}
                </time>
                <h3 className="mt-2 text-lg font-semibold leading-snug text-foreground group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Read more
                  <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
