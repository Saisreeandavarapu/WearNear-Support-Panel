import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSidebar } from '../../hooks/useSidebar';
import { Sidebar } from './Sidebar';
import { MobileDrawer } from './MobileDrawer';
import { Header } from './Header';
import { GlobalSearchModal } from './GlobalSearchModal';
import { ToastContainer } from '../common/ToastContainer';

export const AppShell: React.FC = () => {
  const {
    isCollapsed,
    toggleCollapse,
    isMobileOpen,
    openMobile,
    closeMobile,
  } = useSidebar();

  return (
    <div className="min-h-screen bg-[#F5F0E6] text-[#172033] flex overflow-x-hidden font-sans">
      {/* DESKTOP PERMANENT SIDEBAR (>= 1280px breakpoint) */}
      <div className="hidden xl:block shrink-0 sticky top-0 h-screen z-30">
        <Sidebar isCollapsed={isCollapsed} onToggleCollapse={toggleCollapse} />
      </div>

      {/* TABLET / MOBILE OFF-CANVAS DRAWER (< 1280px breakpoint) */}
      <MobileDrawer isOpen={isMobileOpen} onClose={closeMobile} />

      {/* DYNAMIC MAIN AREA */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-200 ease-out">
        <Header onOpenMobileMenu={openMobile} />

        <main className="flex-1 p-3 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto space-y-6 min-w-0">
          <Outlet />
        </main>
      </div>

      {/* OVERLAY DIALOGS */}
      <GlobalSearchModal />
      <ToastContainer />
    </div>
  );
};
