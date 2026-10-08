import React, { useState } from 'react';
import { MOCK_KNOWLEDGE } from '../../mock/data';
import { BookOpen, Search, ThumbsUp, ThumbsDown, Plus } from 'lucide-react';

export const KnowledgeBasePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const articles = searchQuery
    ? MOCK_KNOWLEDGE.filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : MOCK_KNOWLEDGE;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#172033]">Support Knowledge Base & SOP Manuals</h1>
          <p className="text-xs text-[#687085] mt-0.5">
            Standard operating procedures for express delivery delays, COD cash reconciliation, and refund overrides.
          </p>
        </div>

        <button className="px-4 py-2 rounded-xl bg-[#243FBA] text-white font-bold text-xs flex items-center gap-1.5 shadow-md shrink-0">
          <Plus className="w-4 h-4" />
          <span>Create Article</span>
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="relative max-w-xl">
        <Search className="w-4 h-4 absolute left-3 top-3 text-[#687085]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search SOP articles, keywords, or delivery tags..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#DDD7CA] bg-[#FFFCF5] text-xs text-[#172033] focus:ring-2 focus:ring-[#243FBA]"
        />
      </div>

      {/* ARTICLES LIST */}
      <div className="space-y-4">
        {articles.map((art) => (
          <div key={art.id} className="bg-[#FFFCF5] p-6 rounded-2xl border border-[#DDD7CA] space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#243FBA]">{art.id}</span>
              <span className="text-[10px] text-[#687085] bg-[#F5F0E6] px-2 py-0.5 rounded border border-[#DDD7CA] font-semibold uppercase">
                {art.category}
              </span>
            </div>

            <h3 className="font-bold text-sm text-[#172033]">{art.title}</h3>
            <p className="text-xs text-[#687085] leading-relaxed">{art.content}</p>

            <div className="flex items-center gap-2 pt-2 flex-wrap">
              {art.tags.map((tag) => (
                <span key={tag} className="text-[10px] font-mono text-[#243FBA] bg-blue-50 px-2 py-0.5 rounded">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="pt-3 border-t border-[#DDD7CA] flex items-center justify-between text-xs text-[#687085]">
              <span>Author: {art.author} • Updated {art.lastUpdated}</span>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-1 hover:text-emerald-700">
                  <ThumbsUp className="w-3.5 h-3.5" /> <span>{art.helpfulCount}</span>
                </button>
                <button className="flex items-center gap-1 hover:text-red-700">
                  <ThumbsDown className="w-3.5 h-3.5" /> <span>{art.unhelpfulCount}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
