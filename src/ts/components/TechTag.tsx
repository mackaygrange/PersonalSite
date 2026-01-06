import React, { useMemo } from 'react';

interface TechTagProps
{
  name: string;
}

const colors = ['pine', 'love', 'rose', 'iris', 'foam', 'gold'];

export function TechTag({ name }: TechTagProps)
{
  // Generate consistent gradient based on name hash
  const gradient = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const index1 = Math.abs(hash) % colors.length;
    let index2 = Math.abs(hash >> 8) % colors.length;
    
    // Ensure different colors for gradient
    if (index1 === index2) {
      index2 = (index2 + 1) % colors.length;
    }
    
    const color1 = colors[index1];
    const color2 = colors[index2];
    
    return `linear-gradient(135deg, var(--color-${color1}) 0%, var(--color-${color2}) 100%)`;
  }, [name]);

  return (
    <span
      className="font-semibold border-2 border-(--color-base)/40 shadow-sm text-(--color-text-alt)/80 text-xs px-3 py-1 rounded-full duration-800 animate-gradient cursor-default select-none"
      style={{
        background: gradient,
        backgroundSize: '200% 200%',
        opacity: 0.85,
      }}
    >
      {name}
    </span>
  );
}
