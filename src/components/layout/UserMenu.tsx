import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole, AgentStatus } from '../../types';
import { Tooltip } from '../common/Tooltip';
import { Shield, Eye, EyeOff } from 'lucide-react';

interface UserMenuProps {
  isCollapsed: boolean;
}

export const UserMenu: React.FC<UserMenuProps> = ({ isCollapsed }) => {
  const { user, setUserRole, maskSensitiveData, setMaskSensitiveData } = useAuth();

  const userContent = (
    <div className="p-3 border-t border-[#243FBA]/30 bg-[#172B82]/50 text-white text-xs space-y-2 shrink-0">
      {!isCollapsed ? (
        <div className="space-y-2">
          {/* PROFILE SUMMARY */}
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-9 h-9 rounded-full object-cover border border-[#DDD7CA]"
              />
              <span
                className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#172033] ${
                  user?.status === 'AVAILABLE'
                    ? 'bg-emerald-500'
                    : user?.status === 'AWAY'
                    ? 'bg-amber-500'
                    : 'bg-gray-400'
                }`}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-xs text-white truncate">{user?.name}</p>
              <p className="text-[10px] text-blue-200 truncate">{user?.employeeId}</p>
            </div>
          </div>

          {/* ROLE & DATA MASKING TOGGLES */}
          <div className="pt-2 border-t border-white/10 space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between text-gray-300">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-blue-400" /> Role
              </span>
              <select
                value={user?.role}
                onChange={(e) => setUserRole(e.target.value as UserRole)}
                className="bg-[#172033] text-white text-[10px] rounded px-1.5 py-0.5 border border-blue-500/40 focus:outline-none"
              >
                <option value="SUPPORT_AGENT">Agent</option>
                <option value="SENIOR_SUPPORT_AGENT">Senior Agent</option>
                <option value="SUPPORT_ADMIN">Admin</option>
                <option value="OPERATIONS_SUPPORT">Operations</option>
                <option value="FINANCE_SUPPORT">Finance</option>
              </select>
            </div>

            <button
              onClick={() => setMaskSensitiveData(!maskSensitiveData)}
              className="w-full py-1 px-2 rounded bg-[#172033] hover:bg-[#243FBA] text-[11px] text-gray-200 flex items-center justify-between transition-colors"
            >
              <span className="flex items-center gap-1.5">
                {maskSensitiveData ? (
                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                )}
                <span>Data Masking</span>
              </span>
              <span className="font-mono text-[9px] uppercase px-1 rounded bg-white/10">
                {maskSensitiveData ? 'ON' : 'OFF'}
              </span>
            </button>
          </div>
        </div>
      ) : (
        /* COLLAPSED AVATAR ONLY */
        <div className="flex justify-center py-1">
          <div className="relative">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-9 h-9 rounded-full object-cover border border-[#DDD7CA]"
            />
            <span
              className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#172033] ${
                user?.status === 'AVAILABLE'
                  ? 'bg-emerald-500'
                  : user?.status === 'AWAY'
                  ? 'bg-amber-500'
                  : 'bg-gray-400'
              }`}
            />
          </div>
        </div>
      )}
    </div>
  );

  if (isCollapsed) {
    return (
      <Tooltip
        content={`${user?.name} • ${user?.role.replace(/_/g, ' ')} (${user?.status})`}
        position="right"
      >
        {userContent}
      </Tooltip>
    );
  }

  return userContent;
};
