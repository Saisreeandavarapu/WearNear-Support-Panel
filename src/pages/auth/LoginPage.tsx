import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logoPng from '../../assets/logo.png';

export const LoginPage: React.FC = () => {
  const [employeeId, setEmployeeId] = useState('WN-SUP-892');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberDevice, setRememberDevice] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(employeeId);
    navigate('/support/otp');
  };

  return (
    <div className="min-h-screen bg-[#F5F0E6] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-[#FFFCF5] rounded-2xl border border-[#DDD7CA] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* LEFT BRAND HERO PANEL */}
        <div className="bg-[#172B82] text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <img src={logoPng} alt="WearNear Logo" className="h-10 w-auto object-contain rounded-lg bg-white/10 p-1 shadow-md" />
              <div>
                <h1 className="font-extrabold text-lg tracking-wider text-white">WEARNEAR</h1>
                <p className="text-[10px] text-blue-200 uppercase tracking-widest font-semibold">
                  Enterprise Support Panel
                </p>
              </div>
            </div>

            <div className="mt-12 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Customer Support Operations Platform
              </h2>
              <p className="text-xs text-blue-100 leading-relaxed">
                Connected 360° operational view bridging Customers, Orders, Stores, Inventory, Payments, Delivery Captains, and Refunds.
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-12 pt-6 border-t border-white/10 space-y-2 text-xs text-blue-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Role-Based Operational Controls</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>End-to-End SLA Monitoring & Audit History</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Encrypted Sensitive Data Masking</span>
            </div>
          </div>
        </div>

        {/* RIGHT LOGIN FORM */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div>
            <h2 className="text-xl font-bold text-[#172033]">Authorized Support Sign In</h2>
            <p className="text-xs text-[#687085] mt-1">
              Enter your WearNear Employee Credentials to access the console.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[#172033] mb-1">
                Employee ID / Email / Mobile
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-[#687085]" />
                <input
                  type="text"
                  required
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  placeholder="e.g. WN-SUP-892 or agent@wearnear.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#DDD7CA] bg-white text-[#172033] focus:outline-none focus:ring-2 focus:ring-[#243FBA]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#172033] mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-[#687085]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter employee password"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#DDD7CA] bg-white text-[#172033] focus:outline-none focus:ring-2 focus:ring-[#243FBA]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-[#687085] cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className="rounded text-[#243FBA] focus:ring-[#243FBA]"
                />
                <span>Remember trusted device</span>
              </label>
              <Link
                to="/support/forgot-password"
                className="text-[#243FBA] font-semibold hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-[#243FBA] hover:bg-[#172B82] text-white font-bold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <span>Continue to 2FA Authentication</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 pt-4 border-t border-[#DDD7CA] text-center text-[11px] text-[#687085] flex items-center justify-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span>Secured with WearNear Enterprise Zero-Trust Gateway</span>
          </div>
        </div>
      </div>
    </div>
  );
};
