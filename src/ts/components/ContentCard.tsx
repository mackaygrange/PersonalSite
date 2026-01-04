import React from 'react';

interface ContentCardProps
{
  title?: string;
  eyebrow?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export function ContentCard({ title, eyebrow, actions, children }: ContentCardProps)
{
  return (
    <div className="my-4 relative rounded-2xl w-full border border-(--color-overlay)/60 bg-(--color-muted)/40 shadow-xl overflow-hidden backdrop-blur">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r from-(--color-rose) via-(--color-foam) to-(--color-pine)/80" />
      <div className="p-6 md:p-8">
        {(eyebrow || title || actions) && (
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {eyebrow && (
              <span className="text-xs font-semibold tracking-wide uppercase text-(--color-subtle)">{eyebrow}</span>
            )}
            {title && (
              <h3 className="text-xl font-semibold text-(--color-text)">{title}</h3>
            )}
            {actions && <div className="ml-auto flex items-center gap-2">{actions}</div>}
          </div>
        )}
        <div className="text-(--color-text) overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
