import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';

interface RepositoryLinkProps {
  url: string;
  label?: string;
}

export function RepositoryLink({ url, label = 'View Repository' }: RepositoryLinkProps)
{
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative inline-flex items-center gap-2 px-4 py-2 border border-(--color-foam)/50 text-(--color-foam) rounded overflow-hidden group transition-transform duration-400"
      style={{
        transform: isHovered ? 'scale(0.99)' : 'scale(1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="absolute inset-0 bg-(--color-foam)/10"></span>
      <span 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--color-foam)',
          opacity: isHovered ? 0.2 : 0.1,
          transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'right',
          transition: 'transform 400ms, opacity 400ms',
        }}
      ></span>
      <FaGithub 
        size={16} 
        className="relative z-10" 
        style={{
          color: isHovered ? 'var(--color-base)' : 'var(--color-foam)',
          transition: 'color 400ms',
        }}
      />
      <span 
        className="text-sm font-semibold relative z-10"
        style={{
          color: isHovered ? 'var(--color-base)' : 'var(--color-foam)',
          transition: 'color 400ms',
        }}
      >
        {label}
      </span>
    </a>
  );
}

