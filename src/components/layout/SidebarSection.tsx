import React from 'react';

interface SidebarSectionProps {
  title: string;
  isCollapsed: boolean;
  children: React.ReactNode;
}

export const SidebarSection: React.FC<SidebarSectionProps> = ({ title, isCollapsed, children }) => {
  return (
    <div className="space-y-1">
      <h3
        className={`px-3 text-[10px] font-bold text-gray-400 tracking-widest uppercase transition-all duration-200 ease-out overflow-hidden whitespace-nowrap select-none ${
          isCollapsed ? 'max-h-0 opacity-0 my-0 py-0' : 'max-h-6 opacity-100 mb-1 mt-2'
        }`}
      >
        {title}
      </h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
};
