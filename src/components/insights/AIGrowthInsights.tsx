import React, { useState } from 'react';
import { 
  BrainCircuit, 
  TrendingUp, 
  Sliders, 
  ShieldCheck, 
  Lightbulb, 
  Info
} from 'lucide-react';
import { useCampaign } from '../../context/CampaignContext';
import { formatPercent } from '../../utils/formatters';

export const AIGrowthInsights: React.FC = () => {
  const { metrics, insights, activeDay, schedule } = useCampaign();

  // What-If Scenario Simulator state
  const [ambassadorBoost, setAmbassadorBoost] = useState<number>(15); // +15%
  const [whatsAppBoost, setWhatsAppBoost] = useState<number>(10); // +10%
  const [extraAdSpend, setExtraAdSpend] = useState<number>(200); // ₹200 from contingency

  // Simulated what-if projection
  const currentActual = metrics.totalRegistrations;
  const simulatedAmbassadorGains = Math.round((metrics.channelStats.find(c => c.id === 'ambassador')?.actual || 120) * (ambassadorBoost / 100));
  const simulatedWhatsAppGains = Math.round((metrics.channelStats.find(c => c.id === 'whatsapp')?.actual || 80) * (whatsAppBoost / 100));
  // Assuming ₹12 per registration for targeted ads
  const simulatedAdGains = Math.round(extraAdSpend / 14);

  const scenarioTotal = currentActual + simulatedAmbassadorGains + simulatedWhatsAppGains + Math.round(metrics.dailyVelocity * metrics.daysRemaining * 0.7);
  const scenarioCompletion = (scenarioTotal / 500) * 100;
  const scenarioHitTarget = scenarioTotal >= 500;

  const currentDaySchedule = schedule.find(s => s.day === activeDay) || schedule[0];

  const typeStyles = {
    success: { bg: 'bg-emerald-50 border-emerald-200 text-emerald-900', badge: 'bg-emerald-100 text-emerald-800' },
    warning: { bg: 'bg-amber-50 border-amber-200 text-amber-900', badge: 'bg-amber-100 text-amber-800' },
    info: { bg: 'bg-blue-50 border-blue-200 text-blue-900', badge: 'bg-blue-100 text-blue-800' },
    critical: { bg: 'bg-rose-50 border-rose-200 text-rose-900', badge: 'bg-rose-100 text-rose-800' }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold mb-2">
            <BrainCircuit className="w-4 h-4 text-purple-600" />
            Deterministic Rule-Based Intelligence Engine
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            AI Growth Intelligence & Decision Engine
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Data-driven strategic synthesis derived directly from live campaign registrations, pacing velocity, and budget utilization.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-semibold self-start sm:self-auto">
          <Info className="w-4 h-4 text-purple-600" />
          <span>No external black-box LLM API required</span>
        </div>
      </div>

      {/* Transparent Disclaimer Notice */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-slate-800">Transparency Notice:</strong> This growth intelligence module uses a deterministic rule-based heuristic engine rather than an external generative AI API. All diagnoses, velocity projections, and budget recommendations are computed algorithmically from your local registration records and channel targets.
        </div>
      </div>

      {/* Primary Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map(item => {
          const style = typeStyles[item.type] || typeStyles.info;
          return (
            <div
              key={item.id}
              className={`p-6 rounded-3xl border ${style.bg} shadow-sm flex flex-col justify-between transition hover:shadow-md`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border border-black/10 ${style.badge}`}>
                    {item.metricBadge}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 capitalize">
                    Impact: {item.impact}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-black/10">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-bold text-slate-900 uppercase block tracking-wider">
                      Strategic Action Item:
                    </span>
                    <p className="text-xs text-slate-800 font-medium leading-relaxed mt-0.5">
                      {item.recommendation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* What-If Scenario Sandbox */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-purple-600" />
              Interactive "What-If" Growth Scenario Sandbox
            </h3>
            <p className="text-xs text-slate-500">
              Simulate strategic shifts in ambassador incentives, community viral pushes, and contingency reallocation.
            </p>
          </div>

          <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Interactive Forecast Simulator
          </span>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Slider 1: Ambassador Boost */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <div className="flex justify-between text-xs font-bold text-slate-800 mb-2">
              <span>Ambassador Outreach Lift</span>
              <span className="text-purple-600">+{ambassadorBoost}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={ambassadorBoost}
              onChange={(e) => setAmbassadorBoost(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>Baseline (0%)</span>
              <span>Aggressive (+50%)</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Projected gain: <strong>+{simulatedAmbassadorGains} students</strong> via peer virality.
            </p>
          </div>

          {/* Slider 2: WhatsApp Batch Drops */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <div className="flex justify-between text-xs font-bold text-slate-800 mb-2">
              <span>WhatsApp Batch Conversion</span>
              <span className="text-emerald-600">+{whatsAppBoost}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={whatsAppBoost}
              onChange={(e) => setWhatsAppBoost(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>Standard (0%)</span>
              <span>Viral blitz (+50%)</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Projected gain: <strong>+{simulatedWhatsAppGains} students</strong> from placement groups.
            </p>
          </div>

          {/* Slider 3: Contingency Reallocation to Ads */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <div className="flex justify-between text-xs font-bold text-slate-800 mb-2">
              <span>Contingency Reallocation</span>
              <span className="text-blue-600">₹{extraAdSpend}</span>
            </div>
            <input
              type="range"
              min="0"
              max="400"
              step="50"
              value={extraAdSpend}
              onChange={(e) => setExtraAdSpend(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>₹0</span>
              <span>Max (₹400 reserve)</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Projected gain: <strong>+{simulatedAdGains} students</strong> via targeted retargeting.
            </p>
          </div>
        </div>

        {/* Simulator Results Comparison Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-900 to-indigo-950 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
          <div>
            <span className="text-xs font-bold text-purple-300 uppercase tracking-wider block">
              Simulated Final Outcome
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-white">
                ~{scenarioTotal} Registrations
              </span>
              <span className="text-sm font-semibold text-purple-200">
                ({formatPercent(scenarioCompletion)} of target)
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              {scenarioHitTarget 
                ? '✅ Excellent! With these adjustments, the campaign will safely cross the 500-student threshold.' 
                : '⚠️ Under this projection, additional campus outreach or ambassador onboarding is recommended to reach 500.'}
            </p>
          </div>

          <div className="text-right flex-shrink-0">
            <span className="text-xs text-purple-300 uppercase font-bold block">
              Lift vs Current Baseline
            </span>
            <span className="text-2xl font-black text-emerald-400">
              +{simulatedAmbassadorGains + simulatedWhatsAppGains + simulatedAdGains} Extra Regs
            </span>
          </div>
        </div>
      </div>

      {/* Intern Daily Playbook */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-nxtwave-600" />
              Growth Intern Playbook for Day {activeDay}
            </h3>
            <p className="text-xs text-slate-500">
              Immediate operational tasks scheduled for today's campaign phase ({currentDaySchedule.title}).
            </p>
          </div>
          <span className="text-xs font-bold text-nxtwave-700 bg-nxtwave-50 px-2.5 py-1 rounded-lg border border-nxtwave-200">
            Day {activeDay} Focus
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {currentDaySchedule.activities.map((act, i) => (
            <div key={i} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 text-xs flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-nxtwave-100 text-nxtwave-700 font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                {i + 1}
              </span>
              <span className="font-semibold text-slate-800 leading-relaxed">
                {act}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
