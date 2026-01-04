import React from 'react';

interface TechTagProps
{
  name: string;
  color: 'pine' | 'love' | 'rose' | 'iris' | 'foam' | 'gold' | 'base';
}

export function TechTag({ name, color }: TechTagProps)
{
  return (
    <span
      className={`font-semibold border-2 border-(--color-base)/50 shadow-sm text-(--color-text) text-xs bg-(--color-${color})/50 px-3 py-1 rounded-full hover:bg-(--color-${color})/80 duration-800`}
    >
      {name}
    </span>
  );
}
