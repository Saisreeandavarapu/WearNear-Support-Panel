import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const LOCAL_STORAGE_KEY = 'support-sidebar-collapsed';

export function useSidebar() {
  const location = useLocation();

  // Desktop collapsed state initialized from localStorage
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved === 'true';
    } catch {
      return false;
    }
  });

  // Mobile / Tablet off-canvas drawer open state
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  // Toggle desktop collapsed state & persist in localStorage
  const toggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, String(next));
      } catch (e) {
        // ignore storage errors
      }
      return next;
    });
  }, []);

  const openMobile = useCallback(() => setIsMobileOpen(true), []);
  const closeMobile = useCallback(() => setIsMobileOpen(false), []);
  const toggleMobile = useCallback(() => setIsMobileOpen((prev) => !prev), []);

  // Close mobile drawer automatically when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Handle viewport resize (Desktop >= 1280px automatically closes mobile drawer)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Body scroll lock when mobile drawer is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  // Handle ESC key to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileOpen]);

  return {
    isCollapsed,
    setIsCollapsed,
    toggleCollapse,
    isMobileOpen,
    openMobile,
    closeMobile,
    toggleMobile,
  };
}
