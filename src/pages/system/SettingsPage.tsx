import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Shield, Bell, Users, Clock, Lock, Key } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState<'profile' | 'teams' | 'sla' | 'security' | 'permissions'>('profile');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#172033]">Support System Configuration & Settings</h1>
        <p className="text-xs text-[#687085] mt-0.5">
          Grouped platform configuration settings, security parameters, and support team management.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* GROUPED SETTINGS SIDEBAR */}
        <div className="md:col-span-3 space-y-1">
          {[
            { id: 'profile', label: 'Agent Profile', icon: User },
            { id: 'teams', label: 'Teams & Queue Dispatch', icon: Users },
            { id: 'sla', label: 'SLA & Escalation Rules', icon: Clock },
            { id: 'security', label: 'Security & Hardware 2FA', icon: Lock },
            { id: 'permissions', label: 'RBAC Permission Matrix', icon: Shield },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as any)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-colors flex items-center gap-2.5 ${
                  isActive
                    ? 'bg-[#243FBA] text-white shadow-xs'
                    : 'bg-[#FFFCF5] text-[#172033] hover:bg-[#F5F0E6] border border-[#DDD7CA]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* SETTINGS CONTENT SECTION */}
        <div className="md:col-span-9 bg-[#FFFCF5] p-6 rounded-2xl border border-[#DDD7CA] space-y-6 shadow-xs">
          {activeSection === 'profile' && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-[#172033]">Agent Profile Configuration</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold mb-1 text-[#172033]">Full Name</label>
                  <input type="text" defaultValue={user?.name} className="w-full p-2.5 rounded-lg border border-[#DDD7CA] bg-white" />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-[#172033]">Employee ID</label>
                  <input type="text" disabled defaultValue={user?.employeeId} className="w-full p-2.5 rounded-lg border border-[#DDD7CA] bg-[#F5F0E6] font-mono" />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-[#172033]">Email Address</label>
                  <input type="email" defaultValue={user?.email} className="w-full p-2.5 rounded-lg border border-[#DDD7CA] bg-white" />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-[#172033]">Assigned Role</label>
                  <input type="text" disabled defaultValue={user?.role.replace(/_/g, ' ')} className="w-full p-2.5 rounded-lg border border-[#DDD7CA] bg-[#F5F0E6] font-mono font-bold text-[#243FBA]" />
                </div>
              </div>
            </div>
          )}

          {activeSection === 'permissions' && (
            <div className="space-y-4 text-xs">
              <h3 className="font-bold text-sm text-[#172033]">Active RBAC Permission Scopes</h3>
              <div className="space-y-2">
                {user?.permissions.map((perm) => (
                  <div key={perm} className="p-2.5 bg-[#F5F0E6] rounded-lg border border-[#DDD7CA] flex items-center justify-between">
                    <span className="font-mono font-bold text-[#243FBA]">{perm}</span>
                    <span className="text-emerald-700 font-bold">GRANTED</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
