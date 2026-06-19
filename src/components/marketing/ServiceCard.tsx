import type * as React from 'react';
import { cn } from '../../lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

/** Props for the ServiceCard component. */
export interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

/** Card for highlighting a service or feature (title, description, optional icon). */
export function ServiceCard({ title, description, icon, className }: ServiceCardProps) {
  return (
    <Card
      className={cn(
        'h-full border-0 bg-transparent shadow-none',
        'ds-mkt-surface-elevated transition duration-300 hover:-translate-y-1',
        className,
      )}
    >
      <CardHeader>
        {icon && (
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        )}
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
