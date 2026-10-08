import React from 'react';
import { Shield, Laptop, Smartphone, Key, LogOut, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const SecurityPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#172033]">Employee Security & Active Sessions</h1>
        <p className="text-xs text-[#687085] mt-1">
          Manage hardware tokens, active browser sessions, and security history for <strong className="text-[#172033]">{user?.email}</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ACTIVE SESSIONS */}
        <div className="bg-[#FFFCF5] p-6 rounded-xl border border-[#DDD7CA] space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#172033] flex items-center gap-2">
              <Laptop className="w-4 h-4 text-[#243FBA]" /> Active Support Sessions
            </h3>
            <button className="px-3 py-1 rounded bg-red-50 text-red-700 text-xs font-semibold hover:bg-red-100 transition-colors">
              Log Out All Other Devices
            </button>
          </div>

          <div className="space-y-3 divide-y divide-[#DDD7CA]">
            <div className="pt-2 flex items-start justify-between text-xs">
              <div className="flex items-start gap-3">
                <Laptop className="w-5 h-5 text-emerald-600 mt-0.5" />
                <div>
                  <p className="font-bold text-[#172033]">MacBook Pro 16" (Current Session)</p>
                  <p className="text-[#687085]">Chrome v128 • IP: 10.240.12.89 • Koramangala HQ</p>
                  <span className="inline-block mt-1 font-mono text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-semibold">
                    ACTIVE NOW
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 flex items-start justify-between text-xs">
              <div className="flex items-start gap-3">
                <Smartphone className="w-5 h-5 text-[#687085] mt-0.5" />
                <div>
                  <p className="font-bold text-[#172033]">iPhone 15 Pro Support Agent App</p>
                  <p className="text-[#687085]">WearNear iOS v3.4 • IP: 10.240.14.12 • Last active 40m ago</p>
                </div>
              </div>
              <button className="text-red-600 font-semibold hover:underline">Revoke</button>
            </div>
          </div>
        </div>

        {/* SECURITY SETTINGS & HARDWARE MFA */}
        <div className="bg-[#FFFCF5] p-6 rounded-xl border border-[#DDD7CA] space-y-4 shadow-xs">
          <h3 className="font-bold text-sm text-[#172033] flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" /> Enterprise MFA Status
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-[#F5F0E6] rounded-lg border border-[#DDD7CA] flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#172033]">Hardware FIDO2 Security Key</p>
                <p className="text-[#687085]">YubiKey 5 NFC (Enrolled WN-KEY-9912)</p>
              </div>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Enforced
              </span>
            </div>

            <div className="p-3 bg-[#F5F0E6] rounded-lg border border-[#DDD7CA] flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#172033]">Password Expiry Counter</p>
                <p className="text-[#687085]">Expires in 42 days (Quarterly Compliance)</p>
              </div>
              <button className="px-2.5 py-1 rounded bg-[#243FBA] text-white font-semibold">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
