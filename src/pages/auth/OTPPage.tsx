import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, RotateCcw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const OTPPage: React.FC = () => {
  const [otp, setOtp] = useState(['8', '9', '2', '1', '0', '4']);
  const [countdown, setCountdown] = useState(45);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val[val.length - 1];
    const updated = [...otp];
    updated[index] = val;
    setOtp(updated);

    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    login('WN-SUP-892');
    navigate('/support/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F5F0E6] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#FFFCF5] rounded-2xl border border-[#DDD7CA] shadow-2xl p-8 text-center space-y-6">
        <div className="w-12 h-12 rounded-2xl bg-[#F5F0E6] border border-[#DDD7CA] flex items-center justify-center mx-auto text-[#243FBA]">
          <ShieldCheck className="w-6 h-6" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#172033]">2-Factor Authentication</h2>
          <p className="text-xs text-[#687085] mt-1">
            Enter the 6-digit security code sent to employee registered phone <strong className="text-[#172033]">98******21</strong>
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex justify-center gap-2">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-input-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                className="w-11 h-12 text-center text-lg font-bold font-mono rounded-lg border border-[#DDD7CA] bg-white focus:outline-none focus:ring-2 focus:ring-[#243FBA] text-[#172033]"
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-[#687085]">
            <span>
              Resend code in: <strong className="font-mono text-[#172033]">{countdown}s</strong>
            </span>
            <button
              type="button"
              disabled={countdown > 0}
              onClick={() => setCountdown(45)}
              className="text-[#243FBA] font-semibold hover:underline disabled:opacity-40 inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Resend OTP
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[#243FBA] hover:bg-[#172B82] text-white font-bold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-md"
          >
            <span>Verify & Open Support Panel</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
