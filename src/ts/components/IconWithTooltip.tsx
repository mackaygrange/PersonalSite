import React from 'react';
import { Tooltip } from 'react-tooltip';
import { IconType } from 'react-icons';

interface IconWithTooltipProps
{
  id: string;
  icon: IconType;
  tooltipText: string;
  size?: number;
  place?: 'top' | 'bottom' | 'left' | 'right';
  bgColor?: string;
}

export function IconWithTooltip(
{
  id,
  icon: Icon,
  tooltipText,
  size = 32,
  place = 'bottom', bgColor = "bg-(--color-highlight-med)"
}: IconWithTooltipProps)
{
  return (
    <>
      <span
        data-tooltip-id={id}
        className={`shadow-lg ${bgColor} px-4 py-2 rounded-lg hover:bg-(--color-subtle) transition-colors duration-800`}
      >
        <Icon size={size} />
      </span>
      <Tooltip
        id={id}
        content={tooltipText}
        place={place}
        className="bg-(--color-overlay) text-(--color-text) px-2 py-1 rounded text-sm delay-400"
      />
    </>
  );
}
