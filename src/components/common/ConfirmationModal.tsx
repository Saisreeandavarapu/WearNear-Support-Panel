import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'primary';
  requireReason?: boolean;
  reasonPlaceholder?: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm Action',
  cancelText = 'Cancel',
  variant = 'primary',
  requireReason = false,
  reasonPlaceholder = 'Please provide mandatory audit reason...',
}) => {
  const [reason, setReason] = React.useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (requireReason && !reason.trim()) return;
    onConfirm();
    onClose();
  };

  let btnStyle = 'bg-[#243FBA] hover:bg-[#172B82] text-white';
  if (variant === 'danger') {
    btnStyle = 'bg-red-600 hover:bg-red-700 text-white';
  } else if (variant === 'warning') {
    btnStyle = 'bg-amber-600 hover:bg-amber-700 text-white';
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#FFFCF5] rounded-xl border border-[#DDD7CA] shadow-2xl max-w-md w-full p-6 relative overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#687085] hover:text-[#172033] p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-full shrink-0 ${variant === 'danger' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'}`}>
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#172033]">{title}</h3>
              <p className="text-xs text-[#687085] mt-1 leading-relaxed">{description}</p>
            </div>
          </div>

          {requireReason && (
            <div className="mt-4">
              <label className="block text-xs font-semibold text-[#172033] mb-1">
                Audit Reason <span className="text-red-600">*</span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={reasonPlaceholder}
                rows={3}
                className="w-full text-xs p-2.5 rounded-lg border border-[#DDD7CA] bg-white focus:outline-none focus:ring-2 focus:ring-[#243FBA]"
              />
            </div>
          )}

          <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-[#DDD7CA]">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-[#DDD7CA] text-xs font-medium text-[#172033] hover:bg-[#F5F0E6]"
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              disabled={requireReason && !reason.trim()}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 ${btnStyle}`}
            >
              {confirmText}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
