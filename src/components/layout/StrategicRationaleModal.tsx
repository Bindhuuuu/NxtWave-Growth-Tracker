import React from 'react';
import { X, Lightbulb, Compass, Target, Wallet, BrainCircuit, CheckCircle2 } from 'lucide-react';

interface StrategicRationaleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StrategicRationaleModal: React.FC<StrategicRationaleModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-nxtwave-600 block">
                Growth Intern Strategy & Philosophy
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Strategic Rationale: Why More Than a Landing Page?
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Core Rationale Highlight Box */}
        <div className="mt-5 p-5 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl shadow-md space-y-3">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4" /> Core Growth Philosophy
          </div>
          <blockquote className="text-xs sm:text-sm text-slate-200 leading-relaxed italic border-l-2 border-amber-400 pl-3.5">
            "AI suggested building a simple landing page and using multiple marketing channels to promote the workshop. However, I decided not to limit my solution to a landing page because it would not help me understand which channels were actually generating registrations.
            <br /><br />
            Instead, I built a Workshop Growth Tracker with registration analytics, referral tracking, budget monitoring, and growth insights. I also avoided spending the entire budget on paid advertisements without first checking their effectiveness.
            <br /><br />
            My reason was simple: with a target of 500 registrations, a seven-day timeline, and a budget of ₹2,000, I wanted a solution that could measure results and help make better decisions. I used AI to speed up development, but I made the final decisions based on the campaign's goals and constraints."
          </blockquote>
        </div>

        {/* 4 Pillars of the Decision */}
        <div className="mt-6 space-y-3.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Key Strategic Tradeoffs & Design Decisions:
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Pillar 1: Attribution */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-nxtwave-600" />
                1. Attribution over Assumptions
              </div>
              <p className="text-slate-600 leading-relaxed">
                A landing page is a black box. By building dynamic referral code attribution (CAMP101–105) and channel categorization, we measure true channel ROI rather than guessing.
              </p>
            </div>

            {/* Pillar 2: Unit Economics & Budget Discipline */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Wallet className="w-4 h-4 text-emerald-600" />
                2. Strict Unit Economics (₹4 CAC)
              </div>
              <p className="text-slate-600 leading-relaxed">
                With ₹2,000 for 500 registrations, allowable CAC is ₹4/student. Splashing the entire budget on Instagram ads would result in immediate exhaustion. Phased testing (₹350) protected the runway.
              </p>
            </div>

            {/* Pillar 3: Real-Time Velocity & Pacing */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                3. Real-Time Daily Steering
              </div>
              <p className="text-slate-600 leading-relaxed">
                A 7-day sprint leaves zero room for delayed feedback. Daily tracking (71.0 regs/day pace) enables day-by-day reallocation before the campaign concludes.
              </p>
            </div>

            {/* Pillar 4: AI Leverage + Human Judgment */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <BrainCircuit className="w-4 h-4 text-purple-600" />
                4. AI-Accelerated, Human-Steered
              </div>
              <p className="text-slate-600 leading-relaxed">
                AI was used to rapidly scaffold boilerplate and clean components, but final architectural decisions and business heuristics remained under human control.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            NxtWave Growth Intern Challenge Case Study
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-nxtwave-600 hover:bg-nxtwave-700 rounded-xl shadow transition cursor-pointer"
          >
            Close Rationale
          </button>
        </div>
      </div>
    </div>
  );
};
