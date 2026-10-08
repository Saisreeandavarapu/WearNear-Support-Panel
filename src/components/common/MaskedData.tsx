import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface MaskedDataProps {
  value: string;
  type: 'phone' | 'email' | 'card' | 'address';
  label?: string;
  requiredPermission?: string;
}

export const MaskedData: React.FC<MaskedDataProps> = ({
  value,
  type,
  label,
  requiredPermission = 'READ_CUSTOMER',
}) => {
  const { maskSensitiveData, hasPermission } = useAuth();
  const [unmasked, setUnmasked] = useState(false);

  const isPermitted = hasPermission(requiredPermission);

  const getMaskedText = () => {
    if (!value) return '';
    if (type === 'phone') {
      if (value.length < 6) return '******';
      return `${value.slice(0, 2)}******${value.slice(-2)}`;
    }
    if (type === 'email') {
      const parts = value.split('@');
      if (parts.length < 2) return '****@****';
      const name = parts[0];
      const domain = parts[1];
      const maskedName = name.length > 2 ? `${name.slice(0, 2)}****` : '****';
      return `${maskedName}@${domain}`;
    }
    if (type === 'card') {
      return `**** **** **** ${value.slice(-4)}`;
    }
    if (type === 'address') {
      return `${value.slice(0, 15)}... (Masked Location)`;
    }
    return '••••••••';
  };

  const isMasked = maskSensitiveData && !unmasked;

  return (
    <div className="inline-flex items-center gap-1.5 font-mono text-sm">
      {label && <span className="font-sans text-xs text-[#687085] mr-1">{label}:</span>}
      <span className={isMasked ? 'text-[#687085] bg-[#F5F0E6] px-1.5 py-0.5 rounded border border-[#DDD7CA]' : 'text-[#172033] font-medium'}>
        {isMasked ? getMaskedText() : value}
      </span>
      {isPermitted ? (
        <button
          type="button"
          onClick={() => setUnmasked(!unmasked)}
          className="p-1 text-[#687085] hover:text-[#243FBA] hover:bg-[#F5F0E6] rounded transition-colors"
          title={isMasked ? 'Unmask data (Authorized Support)' : 'Mask data'}
        >
          {isMasked ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
        </button>
      ) : (
        <span title="Permission restricted" className="text-[#687085]">
          <Lock className="w-3 h-3 inline" />
        </span>
      )}
    </div>
  );
};
