import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'right' | 'top' | 'bottom' | 'left';
  disabled?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'right',
  disabled = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  if (disabled || !content) return <>{children}</>;

  let posClasses = 'left-full ml-3 top-1/2 -translate-y-1/2';
  if (position === 'bottom') {
    posClasses = 'top-full mt-2 left-1/2 -translate-x-1/2';
  } else if (position === 'top') {
    posClasses = 'bottom-full mb-2 left-1/2 -translate-x-1/2';
  } else if (position === 'left') {
    posClasses = 'right-full mr-3 top-1/2 -translate-y-1/2';
  }

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          role="tooltip"
          className={`absolute z-50 px-2.5 py-1 text-xs font-semibold text-white bg-[#172033] border border-[#243FBA]/40 rounded-lg shadow-xl whitespace-nowrap pointer-events-none animate-in fade-in zoom-in-95 duration-150 ${posClasses}`}
        >
          {content}
        </div>
      )}
    </div>
  );
};
