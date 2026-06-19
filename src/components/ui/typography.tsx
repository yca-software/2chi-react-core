import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';

const headingVariants = cva('font-bold text-slate-900 dark:text-slate-50', {
  variants: {
    level: {
      h1: 'text-3xl',
      h2: 'text-2xl font-semibold',
      h3: 'text-xl font-semibold',
      h4: 'text-lg font-semibold',
    },
  },
  defaultVariants: {
    level: 'h1',
  },
});

const paragraphVariants = cva('text-slate-600 dark:text-slate-400', {
  variants: {
    size: {
      default: 'text-base',
      sm: 'text-sm',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4';
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level, as, ...props }, ref) => {
    const Component =
      as || (level === 'h1' ? 'h1' : level === 'h2' ? 'h2' : level === 'h3' ? 'h3' : 'h4');
    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ level: level || as }), className)}
        {...props}
      />
    );
  },
);
Heading.displayName = 'Heading';

interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {}

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, size, ...props }, ref) => {
    return <p ref={ref} className={cn(paragraphVariants({ size }), className)} {...props} />;
  },
);
Paragraph.displayName = 'Paragraph';

const H3 = React.forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'level' | 'as'>>(
  ({ className, ...props }, ref) => (
    <Heading ref={ref} level="h3" as="h3" className={className} {...props} />
  ),
);
H3.displayName = 'H3';

export { H3, Heading, headingVariants, Paragraph, paragraphVariants };
