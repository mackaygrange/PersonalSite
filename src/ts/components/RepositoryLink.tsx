import React from 'react';
import { FaGithub } from 'react-icons/fa';

interface RepositoryLinkProps {
  url: string;
  label?: string;
}

export function RepositoryLink({ url, label = 'View Repository' }: RepositoryLinkProps)
{
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 bg-(--color-foam)/10 border border-(--color-foam)/50 text-(--color-foam) rounded hover:bg-(--color-foam)/30 transition-colors duration-300"
    >
      <FaGithub size={16} />
      <span className="text-sm font-semibold">{label}</span>
    </a>
  );
}
