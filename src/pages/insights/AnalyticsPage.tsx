import React from 'react';
import { LineChart as LineChartIcon, BarChart3, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

export const AnalyticsPage: React.FC = () => {
  const trendData = [
    { day: 'Mon', volume: 140, resolution: 94 },
    { day: 'Tue', volume: 180, resolution: 92 },
    { day: 'Wed', volume: 160, resolution: 96 },
    { day: 'Thu', volume: 210, resolution: 91 },
    { day: 'Fri', volume: 195, resolution: 95 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#172033]">Platform Support Analytics & Trends</h1>
        <p className="text-xs text-[#687085] mt-0.5">
          Weekly volume trends, peak support hours, complaint category heatmaps, and reopen rates.
        </p>
      </div>

      <div className="bg-[#FFFCF5] p-6 rounded-2xl border border-[#DDD7CA] space-y-4 shadow-xs">
        <h3 className="font-bold text-sm text-[#172033]">7-Day Support Volume Trend</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <XAxis dataKey="day" stroke="#687085" fontSize={11} />
              <YAxis stroke="#687085" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#172033', color: '#fff', borderRadius: '8px', fontSize: '12px' }} />
              <Line type="monotone" dataKey="volume" name="Incoming Volume" stroke="#3155D8" strokeWidth={3} />
              <Line type="monotone" dataKey="resolution" name="Resolution %" stroke="#16A34A" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
