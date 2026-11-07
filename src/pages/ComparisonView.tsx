import React, { useState } from 'react';
import { 
  Columns2, 
  AlertOctagon, 
  CheckCircle2, 
  BrainCircuit, 
  Sparkles, 
  ShieldAlert, 
  FileCode
} from 'lucide-react';
import { comparisonScenarios } from '../data/mockComparison';
import { Badge } from '../components/common/Badge';

export const ComparisonView: React.FC = () => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>(comparisonScenarios[0].id);

  const scenario = comparisonScenarios.find((s) => s.id === activeScenarioId) || comparisonScenarios[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4EAEA] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#FEECE3] border border-[#FCD2C0] flex items-center justify-center text-[#F45B0B]">
              <Columns2 className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#142337] tracking-tight">
              Memory Comparison Studio
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1 font-normal">
            Side-by-side evidence: Generic LLM query generation vs TribalSQL with persistent Hindsight memory.
          </p>
        </div>

        <Badge variant="powder" dot>
          Interactive Benchmark Demo
        </Badge>
      </div>

      {/* Scenario Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs text-[#64748B] font-bold shrink-0">Scenarios:</span>
        {comparisonScenarios.map((sc) => (
          <button
            key={sc.id}
            onClick={() => setActiveScenarioId(sc.id)}
            className={`text-xs px-3.5 py-2 rounded-xl border transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 font-bold ${
              activeScenarioId === sc.id
                ? 'bg-[#F45B0B] border-[#F45B0B] text-white shadow-xs'
                : 'bg-white hover:bg-[#F5F7F7] border-[#E4EAEA] text-[#142337]'
            }`}
          >
            <span>{sc.title}</span>
            <span className="text-[10px] opacity-80">({sc.category})</span>
          </button>
        ))}
      </div>

      {/* Active User Prompt Card */}
      <div className="p-4 rounded-2xl bg-white border border-[#E4EAEA] flex items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#FEECE3] text-[#F45B0B]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider">Target User Question</p>
            <p className="text-sm sm:text-base font-bold text-[#142337] mt-0.5">&quot;{scenario.userPrompt}&quot;</p>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT COLUMN: WITHOUT HINDSIGHT */}
        <div className="rounded-2xl bg-white border-2 border-[#FECDD3] shadow-xs overflow-hidden flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="p-4 bg-[#FEF2F2] border-b border-[#FECDD3] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-[#E5484D]" />
                <div>
                  <h3 className="text-xs font-black text-[#E5484D] tracking-wider uppercase">
                    WITHOUT HINDSIGHT MEMORY
                  </h3>
                  <p className="text-[10px] text-[#E5484D]/80">Standard Generic Text-to-SQL LLM</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#E5484D] bg-white border border-[#FECDD3] px-2.5 py-0.5 rounded-full">
                {scenario.withoutMemory.status}
              </span>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4 text-xs">
              <div>
                <p className="text-[10px] uppercase font-bold text-[#64748B] mb-1.5 flex items-center gap-1">
                  <FileCode className="w-3.5 h-3.5" />
                  <span>Generated Naive SQL</span>
                </p>
                <pre className="p-3.5 rounded-xl bg-[#F5F7F7] border border-[#FECDD3] text-[#142337] font-mono text-[11px] overflow-x-auto leading-relaxed">
                  {scenario.withoutMemory.sql}
                </pre>
              </div>

              {/* Status Outcome */}
              <div className="p-3 rounded-xl bg-[#FEF2F2] border border-[#FECDD3] space-y-1">
                <p className="text-[#E5484D] font-bold flex items-center gap-1.5">
                  <AlertOctagon className="w-4 h-4 text-[#E5484D]" />
                  <span>Outcome: {scenario.withoutMemory.statusLabel}</span>
                </p>
                <p className="text-[#64748B] text-[11px]">{scenario.withoutMemory.financialOrDataImpact}</p>
              </div>

              {/* Shortcomings Checklist */}
              <div className="space-y-1.5">
                <p className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider">
                  Critical Vulnerabilities & Missing Context:
                </p>
                {scenario.withoutMemory.shortcomings.map((sc, i) => (
                  <div key={i} className="flex items-start gap-2 text-[#142337] bg-[#F5F7F7] p-2.5 rounded-lg border border-[#E4EAEA]">
                    <span className="text-[#E5484D] font-bold shrink-0">✕</span>
                    <span className="text-[11px] font-medium">{sc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#F5F7F7] border-t border-[#E4EAEA] text-[11px] text-[#64748B] flex items-center justify-between">
            <span>Result Verification:</span>
            <span className="font-mono text-[#E5484D] font-bold">{scenario.withoutMemory.sampleResultSummary}</span>
          </div>
        </div>

        {/* RIGHT COLUMN: WITH HINDSIGHT (Racing Orange Accents) */}
        <div className="rounded-2xl bg-white border-2 border-[#F45B0B] shadow-md overflow-hidden flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="p-4 bg-[#FEECE3] border-b border-[#FCD2C0] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-[#F45B0B]" />
                <div>
                  <h3 className="text-xs font-black text-[#F45B0B] tracking-wider uppercase">
                    WITH HINDSIGHT PERSISTENT MEMORY
                  </h3>
                  <p className="text-[10px] text-[#1E5755] font-semibold">TribalSQL Autonomous Learning Agent</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-white bg-[#F45B0B] px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                <CheckCircle2 className="w-3 h-3" />
                <span>{scenario.withMemory.status}</span>
              </span>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4 text-xs">
              {/* Recalled Knowledge Cards */}
              <div className="space-y-1.5">
                <p className="text-[10px] uppercase font-bold text-[#F45B0B] tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#F45B0B]" />
                  <span>Recalled Institutional Memories</span>
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {scenario.withMemory.recalledKnowledge.map((rk) => (
                    <div key={rk.id} className="p-2.5 rounded-xl bg-[#EAF3F3] border border-[#A8C9C8]">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#142337]">{rk.title}</span>
                        <span className="text-[9px] font-mono text-[#1E5755] font-bold">{rk.id}</span>
                      </div>
                      <p className="text-[11px] text-[#64748B] mt-0.5">{rk.ruleText}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Generated Compliant SQL */}
              <div>
                <p className="text-[10px] uppercase font-bold text-[#64748B] mb-1.5 flex items-center gap-1">
                  <FileCode className="w-3.5 h-3.5 text-[#16A36A]" />
                  <span>Institutional Guarded SQL</span>
                </p>
                <pre className="p-3.5 rounded-xl bg-[#F5F7F7] border border-[#A8C9C8] text-[#142337] font-mono text-[11px] overflow-x-auto leading-relaxed shadow-2xs">
                  {scenario.withMemory.sql}
                </pre>
              </div>

              {/* Improvements list */}
              <div className="space-y-1.5">
                <p className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider">
                  Audited Advantages & Compliance Guardrails:
                </p>
                {scenario.withMemory.improvements.map((imp, i) => (
                  <div key={i} className="flex items-start gap-2 text-[#142337] bg-[#ECFDF5] p-2.5 rounded-lg border border-[#A7F3D0]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16A36A] mt-0.5 shrink-0" />
                    <span className="text-[11px] font-medium">{imp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#F5F7F7] border-t border-[#E4EAEA] text-[11px] text-[#64748B] flex items-center justify-between">
            <span className="text-[#16A36A] font-bold">{scenario.withMemory.accuracyGain}</span>
            <span className="font-mono text-[#F45B0B] font-bold">{scenario.withMemory.sampleResultSummary}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
