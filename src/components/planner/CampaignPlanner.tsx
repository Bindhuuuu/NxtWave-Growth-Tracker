import React, { useState } from 'react';
import { 
  Calendar, 
  Target, 
  CheckCircle2, 
  AlertCircle, 
  Edit3, 
  Save, 
  RotateCcw, 
  Sparkles,
  Info
} from 'lucide-react';
import { useCampaign } from '../../context/CampaignContext';
import { formatPercent } from '../../utils/formatters';

export const CampaignPlanner: React.FC = () => {
  const { channels, updateChannelTargets, schedule, toggleScheduleTask, activeDay, setActiveDay, registrations } = useCampaign();

  // Editing state for targets
  const [isEditing, setIsEditing] = useState(false);
  const [tempTargets, setTempTargets] = useState(() => 
    channels.map(c => ({ id: c.id, target: c.target }))
  );
  const [validationError, setValidationError] = useState<string | null>(null);

  const currentTotal = tempTargets.reduce((s, c) => s + (Number(c.target) || 0), 0);
  const isBalanced = currentTotal === 500;

  const handleTargetChange = (id: string, val: string) => {
    const num = parseInt(val, 10);
    const safeNum = isNaN(num) ? 0 : Math.max(0, num);
    setTempTargets(prev => prev.map(t => t.id === id ? { ...t, target: safeNum } : t));
    setValidationError(null);
  };

  const handleSaveTargets = () => {
    // Check non-negative
    for (const t of tempTargets) {
      if (t.target < 0) {
        setValidationError('Channel targets cannot be negative.');
        return;
      }
    }

    if (currentTotal !== 500) {
      setValidationError(`Total targets currently sum to ${currentTotal}. They must add up to exactly 500 to meet the workshop objective.`);
      return;
    }

    const res = updateChannelTargets(tempTargets);
    if (res.success) {
      setIsEditing(false);
      setValidationError(null);
    } else {
      setValidationError(res.error || 'Failed to update targets');
    }
  };

  const handleAutoBalance = () => {
    // Default baseline: 200, 150, 75, 75
    setTempTargets([
      { id: 'ambassador', target: 200 },
      { id: 'whatsapp', target: 150 },
      { id: 'instagram', target: 75 },
      { id: 'referral', target: 75 }
    ]);
    setValidationError(null);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Calendar className="w-6 h-6 text-nxtwave-600" />
            Campaign Planner & 7-Day Strategy
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Allocate marketing targets across 4 channels to reach 500 final-year registrations and manage the daily execution roadmap.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!isEditing ? (
            <button
              onClick={() => {
                setTempTargets(channels.map(c => ({ id: c.id, target: c.target })));
                setIsEditing(true);
              }}
              className="px-4 py-2 rounded-xl bg-nxtwave-600 hover:bg-nxtwave-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Adjust Channel Targets
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setValidationError(null);
                }}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTargets}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                Save Target Mix
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Target Allocation Grid */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Target className="w-4 h-4 text-nxtwave-600" />
              4-Channel Target Mix (Sum must equal 500)
            </h3>
            <p className="text-xs text-slate-500">
              Each channel represents a dedicated growth funnel for final-year engineering students.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs text-slate-400 font-semibold uppercase block">Total Target</span>
              <span className={`text-lg font-black ${isBalanced ? 'text-emerald-600' : 'text-rose-600'}`}>
                {isEditing ? currentTotal : channels.reduce((s, c) => s + c.target, 0)} / 500
              </span>
            </div>
            {isEditing && !isBalanced && (
              <button
                onClick={handleAutoBalance}
                className="text-xs font-bold text-nxtwave-600 hover:underline flex items-center gap-1 cursor-pointer bg-nxtwave-50 px-2.5 py-1.5 rounded-lg border border-nxtwave-200"
              >
                <RotateCcw className="w-3 h-3" /> Auto-Reset to 500
              </button>
            )}
          </div>
        </div>

        {validationError && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {channels.map(channel => {
            const actualCount = registrations.filter(r => r.channel === channel.id).length;
            const tempVal = tempTargets.find(t => t.id === channel.id)?.target ?? channel.target;
            const currentPercent = channel.target > 0 ? (actualCount / channel.target) * 100 : 0;

            return (
              <div 
                key={channel.id}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: channel.color }} 
                    />
                    <span className="text-[11px] font-bold text-slate-500">
                      Channel #{channel.id === 'ambassador' ? '1' : channel.id === 'whatsapp' ? '2' : channel.id === 'instagram' ? '3' : '4'}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900">{channel.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {channel.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-slate-500 font-medium">Channel Target:</span>
                    {isEditing ? (
                      <input
                        type="number"
                        min="0"
                        max="500"
                        value={tempVal}
                        onChange={(e) => handleTargetChange(channel.id, e.target.value)}
                        className="w-20 px-2 py-1 text-right text-sm font-bold border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nxtwave-500 bg-white"
                      />
                    ) : (
                      <span className="text-sm font-extrabold text-slate-900">
                        {channel.target} regs
                      </span>
                    )}
                  </div>

                  {/* Actual Progress indicator */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                    <span>Simulated Actuals:</span>
                    <span className="font-bold text-slate-700">
                      {actualCount} ({formatPercent(currentPercent)})
                    </span>
                  </div>
                  <div className="w-full bg-slate-200/70 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, currentPercent)}%`, backgroundColor: channel.color }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7-Day Campaign Execution Roadmap */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-nxtwave-600" />
              7-Day Campaign Execution Schedule & Suggested Milestones
            </h3>
            <p className="text-xs text-slate-500">
              Interactive timeline with daily action items. Suggested milestones reflect target pace, not simulated actuals.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
            <Info className="w-4 h-4 text-nxtwave-600" />
            <span>Interactive checklist auto-saves locally</span>
          </div>
        </div>

        {/* 7-Day Cards List */}
        <div className="space-y-4">
          {schedule.map(dayItem => {
            const isCurrentSimulatedDay = dayItem.day === activeDay;
            const isPast = dayItem.day < activeDay;
            const actualDayRegs = registrations.filter(r => r.day === dayItem.day).length;
            const cumulativeActuals = registrations.filter(r => r.day <= dayItem.day).length;

            return (
              <div
                key={dayItem.day}
                className={`rounded-2xl border p-5 transition-all ${
                  isCurrentSimulatedDay
                    ? 'bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-white border-blue-300 shadow-md ring-2 ring-blue-500/20'
                    : isPast
                    ? 'bg-white border-slate-200'
                    : 'bg-slate-50/70 border-slate-200/80 opacity-90'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-200/60">
                  <div className="flex items-start sm:items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm flex-shrink-0 ${
                        isCurrentSimulatedDay
                          ? 'bg-nxtwave-600 text-white shadow-md shadow-nxtwave-500/20'
                          : isPast
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      D{dayItem.day}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm sm:text-base font-bold text-slate-900">
                          Day {dayItem.day}: {dayItem.title}
                        </h4>
                        {isCurrentSimulatedDay && (
                          <span className="text-[10px] font-extrabold bg-blue-600 text-white px-2 py-0.5 rounded-full tracking-wide uppercase">
                            Current Simulated Day
                          </span>
                        )}
                        {isPast && (
                          <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Completed Day
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {dayItem.subtitle} • Key Deliverable: <span className="font-medium text-slate-700">{dayItem.keyDeliverable}</span>
                      </p>
                    </div>
                  </div>

                  {/* Milestones & Status Pills */}
                  <div className="flex items-center gap-3 self-end md:self-center">
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Suggested Milestone</span>
                      <span className="text-xs font-bold text-slate-800">
                        {dayItem.suggestedMilestone} Cumulative Regs
                      </span>
                    </div>

                    {dayItem.day <= activeDay && (
                      <div className="text-right pl-3 border-l border-slate-200">
                        <span className="text-[10px] uppercase font-bold text-nxtwave-600 block">Simulated Actuals</span>
                        <span className="text-xs font-extrabold text-emerald-600">
                          {cumulativeActuals} Regs ({actualDayRegs} on day)
                        </span>
                      </div>
                    )}

                    {dayItem.day !== activeDay && (
                      <button
                        onClick={() => setActiveDay(dayItem.day)}
                        className="text-xs font-bold text-nxtwave-600 hover:bg-nxtwave-50 px-2.5 py-1.5 rounded-lg border border-nxtwave-200 transition cursor-pointer"
                        title={`Simulate timeline at Day ${dayItem.day}`}
                      >
                        Simulate D{dayItem.day}
                      </button>
                    )}
                  </div>
                </div>

                {/* Activities Checklist */}
                <div className="mt-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Action Plan & Execution Checklist:
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {dayItem.activities.map((act, idx) => {
                      const isChecked = dayItem.completedTasks.includes(act);
                      return (
                        <label
                          key={idx}
                          className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition select-none ${
                            isChecked
                              ? 'bg-emerald-50/60 border-emerald-200 text-slate-700'
                              : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleScheduleTask(dayItem.day, act)}
                            className="mt-0.5 rounded text-nxtwave-600 focus:ring-nxtwave-500 cursor-pointer w-4 h-4 rounded"
                          />
                          <span className={`leading-relaxed ${isChecked ? 'line-through text-slate-400' : 'font-medium'}`}>
                            {act}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
