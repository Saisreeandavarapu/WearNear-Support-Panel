import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';
import { SLAState } from '../../types';

interface SLACountdownProps {
  label: string;
  initialSeconds: number;
  status: SLAState;
}

export const SLACountdown: React.FC<SLACountdownProps> = ({ label, initialSeconds, status }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSec: number) => {
    const absSec = Math.abs(totalSec);
    const hrs = Math.floor(absSec / 3600);
    const mins = Math.floor((absSec % 3600) / 60);
    const secs = absSec % 60;

    const pad = (n: number) => n.toString().padStart(2, '0');
    if (hrs > 0) {
      return `${hrs}:${pad(mins)}:${pad(secs)}`;
    }
    return `${pad(mins)}:${pad(secs)}`;
  };

  const isBreached = seconds <= 0 || status === 'BREACHED';

  let stateStyle = 'bg-emerald-50 text-emerald-800 border-emerald-300';
  let Icon = CheckCircle;

  if (status === 'WARNING') {
    stateStyle = 'bg-amber-50 text-amber-900 border-amber-300';
    Icon = Clock;
  } else if (status === 'AT_RISK') {
    stateStyle = 'bg-orange-50 text-orange-900 border-orange-400 font-semibold';
    Icon = AlertTriangle;
  } else if (isBreached) {
    stateStyle = 'bg-red-50 text-red-900 border-red-400 font-bold';
    Icon = ShieldAlert;
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs border ${stateStyle}`}>
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span className="font-sans font-normal opacity-80">{label}:</span>
      <span className="font-mono font-medium">
        {isBreached ? `BREACHED (${formatTime(seconds)} ago)` : `${formatTime(seconds)} remaining`}
      </span>
    </div>
  );
};
