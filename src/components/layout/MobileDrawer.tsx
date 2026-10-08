import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Sidebar } from './Sidebar';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Drawer"
      className="fixed inset-0 z-50 xl:hidden flex overflow-hidden"
    >
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-200 ease-out animate-in fade-in"
      />

      {/* DRAWER CONTAINER WITH SAFE AREA INSETS */}
      <div className="relative w-[min(88vw,320px)] max-w-full bg-[#172033] shadow-2xl flex flex-col z-50 transition-transform duration-250 ease-out animate-in slide-in-from-left pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          aria-label="Close navigation"
          className="absolute top-3.5 right-3.5 text-white/80 hover:text-white p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors z-50 min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#3155D8]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* REUSED SIDEBAR NAVIGATION */}
        <Sidebar isCollapsed={false} onItemClick={onClose} />
      </div>
    </div>
  );
};
