import React from 'react';
import { useSupport } from '../../context/SupportContext';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useSupport();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((t) => {
          let bg = 'bg-[#172033] text-white';
          let icon = <Info className="w-5 h-5 text-blue-400 shrink-0" />;

          if (t.type === 'success') {
            bg = 'bg-[#172033] border-l-4 border-emerald-500 text-white';
            icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
          } else if (t.type === 'error') {
            bg = 'bg-[#172033] border-l-4 border-red-500 text-white';
            icon = <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />;
          } else if (t.type === 'warning') {
            bg = 'bg-[#172033] border-l-4 border-amber-500 text-white';
            icon = <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />;
          }

          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`p-3.5 rounded-lg shadow-xl pointer-events-auto flex items-start gap-3 text-sm ${bg}`}
            >
              {icon}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-xs tracking-wide uppercase text-white/90">{t.title}</h4>
                <p className="text-xs text-white/80 mt-0.5 leading-snug">{t.message}</p>
              </div>
              <button
                onClick={() => removeToast(t.id)}
                className="text-white/60 hover:text-white p-0.5 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
