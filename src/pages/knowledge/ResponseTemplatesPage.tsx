import React from 'react';
import { MOCK_TEMPLATES } from '../../mock/data';
import { FileText, Plus } from 'lucide-react';

export const ResponseTemplatesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#172033]">Communication Response Templates</h1>
          <p className="text-xs text-[#687085] mt-0.5">
            Pre-approved message templates with dynamic variables for In-App Chat, Email, SMS, and WhatsApp.
          </p>
        </div>

        <button className="px-4 py-2 rounded-xl bg-[#243FBA] text-white font-bold text-xs flex items-center gap-1.5 shadow-md shrink-0">
          <Plus className="w-4 h-4" />
          <span>Create New Template</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_TEMPLATES.map((tpl) => (
          <div key={tpl.id} className="bg-[#FFFCF5] p-5 rounded-2xl border border-[#DDD7CA] space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#DDD7CA] pb-2">
              <div>
                <h3 className="font-bold text-sm text-[#172033]">{tpl.name}</h3>
                <span className="font-mono text-[10px] text-[#243FBA] font-semibold">{tpl.id} • {tpl.channel}</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-300">
                {tpl.status}
              </span>
            </div>

            <div className="p-3 bg-[#F5F0E6] rounded-xl text-xs text-[#172033] leading-relaxed font-sans">
              {tpl.message}
            </div>

            <div className="flex items-center gap-1.5 text-[10px] flex-wrap">
              <span className="text-[#687085] font-semibold">Variables:</span>
              {tpl.variables.map((v) => (
                <span key={v} className="font-mono bg-white px-1.5 py-0.5 rounded border border-[#DDD7CA] text-[#243FBA]">
                  {`{{${v}}}`}
                </span>
              ))}
            </div>

            <div className="pt-2 border-t border-[#DDD7CA] text-[11px] text-[#687085]">
              Created by {tpl.createdBy} • Updated {tpl.updatedAt}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
