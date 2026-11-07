import React from 'react';
import { Search, Sparkles, Send, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';

interface PromptBarProps {
  query: string;
  onChange: (value: string) => void;
  onSubmit: (query: string) => void;
  isLoading: boolean;
  onSelectSuggestion: (suggestion: string) => void;
}

export const PromptBar: React.FC<PromptBarProps> = ({
  query,
  onChange,
  onSubmit,
  isLoading,
  onSelectSuggestion,
}) => {
  const suggestedQueries = [
    'Calculate net revenue from premium customers.',
    'Which five products generated the highest revenue?',
    'Show monthly sales for the previous quarter.',
    'Which products have the highest refund rate?',
    'Compare revenue across customer segments.',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query.trim());
    }
  };

  return (
    <div className="space-y-3">
      {/* Search Input Box */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center bg-white border-2 border-[#E4EAEA] focus-within:border-[#F45B0B] rounded-2xl shadow-xs overflow-hidden transition-all duration-200">
          <div className="pl-5 pr-2 text-[#64748B]">
            <Search className="w-5 h-5 text-[#F45B0B]" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Ask anything about NovaMart's database in plain English..."
            disabled={isLoading}
            className="w-full py-4 px-2 bg-transparent text-[#142337] placeholder-[#94A3B8] text-sm sm:text-base focus:outline-none font-medium"
          />
          <div className="pr-3 pl-2 flex items-center gap-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              disabled={!query.trim()}
              rightIcon={<Send className="w-4 h-4 ml-1" />}
            >
              <span className="hidden sm:inline">Ask TribalSQL</span>
            </Button>
          </div>
        </div>
      </form>

      {/* Suggested Questions */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
        <span className="text-xs text-[#64748B] flex items-center gap-1 shrink-0 font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#F45B0B]" />
          <span>Suggested:</span>
        </span>
        {suggestedQueries.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              onSelectSuggestion(item);
            }}
            className="text-xs px-3.5 py-1.5 rounded-full bg-white hover:bg-[#EAF3F3] text-[#142337] hover:text-[#1E5755] border border-[#E4EAEA] hover:border-[#A8C9C8] whitespace-nowrap transition-all cursor-pointer shrink-0 flex items-center gap-1.5 font-medium shadow-2xs"
          >
            <span>{item}</span>
            <ArrowRight className="w-3 h-3 text-[#94A3B8] group-hover:text-[#F45B0B]" />
          </button>
        ))}
      </div>
    </div>
  );
};
