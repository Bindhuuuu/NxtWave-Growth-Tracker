import React from 'react';
import { 
  Users, 
  Target, 
  Calendar, 
  Wallet, 
  TrendingUp, 
  Zap, 
  PlusCircle, 
  ArrowUpRight, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { useCampaign } from '../../context/CampaignContext';
import { formatINR, formatPercent, formatDate } from '../../utils/formatters';
import type { ActiveTab } from '../../types';

interface OverviewDashboardProps {
  onNavigate: (tab: ActiveTab) => void;
  onOpenAddModal: () => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  onNavigate,
  onOpenAddModal
}) => {
  const { metrics, registrations, schedule, activeDay } = useCampaign();

  // Daily registrations distribution for chart
  const dailyData = [1, 2, 3, 4, 5, 6, 7].map(d => {
    const dayRegs = registrations.filter(r => r.day === d);
    const daySchedule = schedule.find(s => s.day === d);
    const isPastOrCurrent = d <= activeDay;
    
    return {
      day: `Day ${d}`,
      actual: isPastOrCurrent ? dayRegs.length : 0,
      plannedMilestone: daySchedule ? daySchedule.suggestedMilestone : 0,
      isSimulatedPast: isPastOrCurrent
    };
  });

  // Channel breakdown data for Donut Chart
  const channelData = metrics.channelStats.map(c => ({
    name: c.name,
    value: c.actual,
    target: c.target,
    percent: c.percent,
    color: c.color
  }));

  const recentRegistrations = registrations.slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner / Welcome & Quick Action */}
      <div className="bg-gradient-to-r from-nxtwave-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-nxtwave-500/20 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-nxtwave-200 text-xs font-semibold backdrop-blur-md mb-3 border border-white/10">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Growth Intern Command Center • Campaign Sprint
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              "Build Your First AI Project in 60 Mins"
            </h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">
              Tracking simulated registrations for final-year engineering students (CSE/IT/AI-ML). Target: <strong>500 students</strong> across 7 days with a budget of <strong>₹2,000</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenAddModal}
              className="px-4 py-2.5 rounded-xl bg-nxtwave-500 hover:bg-nxtwave-400 text-white font-bold text-sm shadow-lg shadow-nxtwave-500/30 transition flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              Add Registration
            </button>
            <button
              onClick={() => onNavigate('planner')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-sm border border-white/15 transition flex items-center gap-2 cursor-pointer"
            >
              View 7-Day Plan
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Target Registrations */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Registrations Target
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {metrics.totalRegistrations}
              </span>
              <span className="text-sm font-semibold text-slate-400">
                / {metrics.totalTarget}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs font-medium text-slate-600">
              <span>{metrics.remainingRegistrations} remaining</span>
              <span className="font-bold text-blue-600">
                {formatPercent(metrics.completionRate)}
              </span>
            </div>
            {/* Progress Mini Bar */}
            <div className="mt-2 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-blue-600 h-full rounded-full transition-all duration-700"
                style={{ width: `${Math.min(100, metrics.completionRate)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card 2: Campaign Timeline */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Sprint Timeline
            </span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Day {metrics.activeDay}
              </span>
              <span className="text-sm font-semibold text-slate-400">/ 7 Days</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs font-medium text-slate-600">
              <span>{metrics.daysRemaining} days left</span>
              <span className="text-indigo-600 font-bold">
                {metrics.dailyVelocity} regs/day avg
              </span>
            </div>
            {/* Progress Mini Bar */}
            <div className="mt-2 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-600 h-full rounded-full transition-all duration-700"
                style={{ width: `${(metrics.activeDay / 7) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card 3: Budget Spent & Remaining */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Campaign Budget
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {formatINR(metrics.totalSpent)}
              </span>
              <span className="text-sm font-semibold text-slate-400">
                / {formatINR(metrics.totalBudget)}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs font-medium text-slate-600">
              <span>{formatINR(metrics.remainingBudget)} remaining</span>
              <span className="font-bold text-emerald-600">
                {formatPercent(metrics.burnRate)} burned
              </span>
            </div>
            {/* Progress Mini Bar */}
            <div className="mt-2 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-700 ${
                  metrics.burnRate > 90 ? 'bg-rose-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.min(100, metrics.burnRate)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card 4: Growth Efficiency / CAC */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Blended Acquisition Cost
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                ₹{metrics.overallCAC}
              </span>
              <span className="text-xs font-semibold text-slate-400">/ student</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs font-medium text-slate-600">
              <span>Projected finish</span>
              <span className={`font-bold ${metrics.isProjectedToHitTarget ? 'text-emerald-600' : 'text-amber-600'}`}>
                ~{metrics.projectedRegistrations} regs
              </span>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
              {metrics.isProjectedToHitTarget ? (
                <span className="text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> On pace to reach 500
                </span>
              ) : (
                <span className="text-amber-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Shortfall risk of {metrics.totalTarget - metrics.projectedRegistrations}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Primary Goal Progress Bar with Milestone Checkpoints */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Target className="w-4 h-4 text-nxtwave-600" />
              Target Milestones: 500 Final-Year Students
            </h3>
            <p className="text-xs text-slate-500">
              Cumulative simulated registration progress toward the 500 engineering student goal.
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-nxtwave-700 bg-nxtwave-50 px-3 py-1 rounded-full border border-nxtwave-200">
              {metrics.totalRegistrations} of 500 Registered ({formatPercent(metrics.completionRate)})
            </span>
          </div>
        </div>

        {/* Milestone Steps Bar */}
        <div className="relative pt-2 pb-6">
          <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden shadow-inner">
            <div
              className="bg-gradient-to-r from-nxtwave-600 via-indigo-500 to-emerald-500 h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${Math.min(100, metrics.completionRate)}%` }}
            />
          </div>

          {/* Milestone markers */}
          <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-2 px-1">
            <div className="text-left">
              <span className="block text-slate-800">0</span>
              <span className="text-[10px] text-slate-400 font-normal">Kickoff</span>
            </div>
            <div className="text-center">
              <span className={`block ${metrics.totalRegistrations >= 125 ? 'text-nxtwave-600 font-bold' : 'text-slate-500'}`}>125</span>
              <span className="text-[10px] text-slate-400 font-normal">25% Pace</span>
            </div>
            <div className="text-center">
              <span className={`block ${metrics.totalRegistrations >= 250 ? 'text-nxtwave-600 font-bold' : 'text-slate-500'}`}>250</span>
              <span className="text-[10px] text-slate-400 font-normal">50% Halfway</span>
            </div>
            <div className="text-center">
              <span className={`block ${metrics.totalRegistrations >= 375 ? 'text-nxtwave-600 font-bold' : 'text-slate-500'}`}>375</span>
              <span className="text-[10px] text-slate-400 font-normal">75% Sprint</span>
            </div>
            <div className="text-right">
              <span className={`block ${metrics.totalRegistrations >= 500 ? 'text-emerald-600 font-extrabold' : 'text-slate-800 font-bold'}`}>500</span>
              <span className="text-[10px] text-emerald-600 font-semibold">Target Goal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Charts & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Daily Registration Trend Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-nxtwave-600" />
                  Daily Registration Velocity (Day 1 - 7)
                </h3>
                <p className="text-xs text-slate-500">
                  Simulated registrations per campaign day against suggested daily milestones.
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                Active: Day {activeDay}
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                    formatter={(value: any, name: any) => [
                      value === 0 ? 'Upcoming / Unsimulated' : `${value} students`,
                      name === 'actual' ? 'Actual Registrations' : 'Target Milestone'
                    ]}
                  />
                  <Bar 
                    dataKey="actual" 
                    fill="#3b82f6" 
                    radius={[6, 6, 0, 0]} 
                    name="Actual Registrations"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
              Day 1–{activeDay} completed ({registrations.filter(r => r.day <= activeDay).length} registrations)
            </span>
            <button
              onClick={() => onNavigate('analytics')}
              className="font-bold text-nxtwave-600 hover:text-nxtwave-700 flex items-center gap-1 cursor-pointer"
            >
              Deep Channel Analytics →
            </button>
          </div>
        </div>

        {/* Right 1 Col: Channel Breakdown & Donut */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Channel Breakdown
                </h3>
                <p className="text-xs text-slate-500">
                  Actual contribution vs channel targets
                </p>
              </div>
            </div>

            <div className="h-44 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={channelData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                  >
                    {channelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}
                    formatter={(val: any, name: any) => [`${val} regs`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Channel List */}
            <div className="space-y-2.5 mt-2">
              {metrics.channelStats.map(c => (
                <div key={c.id} className="text-xs">
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                      {c.name}
                    </span>
                    <span>
                      {c.actual} <span className="text-slate-400 font-normal">/ {c.target}</span> ({c.percent}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500" 
                      style={{ width: `${Math.min(100, c.percent)}%`, backgroundColor: c.color }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={() => onNavigate('planner')}
              className="w-full text-center text-xs font-bold text-nxtwave-600 hover:text-nxtwave-700 cursor-pointer"
            >
              Adjust Channel Targets & Schedule →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Registrations & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Registrations Table snippet */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-nxtwave-600" />
                Recent Simulated Registrations
              </h3>
              <p className="text-xs text-slate-500">
                Latest student sign-ups across engineering colleges
              </p>
            </div>
            <button
              onClick={() => onNavigate('registrations')}
              className="text-xs font-bold text-nxtwave-600 hover:text-nxtwave-700 cursor-pointer"
            >
              View All ({registrations.length}) →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-y border-slate-100">
                <tr>
                  <th className="py-2.5 px-3">Student</th>
                  <th className="py-2.5 px-3">College</th>
                  <th className="py-2.5 px-3">Channel</th>
                  <th className="py-2.5 px-3">Ref Code</th>
                  <th className="py-2.5 px-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {recentRegistrations.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-2.5 px-3">
                      <div className="font-bold text-slate-900">{r.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{r.email}</div>
                    </td>
                    <td className="py-2.5 px-3 text-slate-700 max-w-[140px] truncate" title={r.college}>
                      {r.college}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="capitalize px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                        {r.channel}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-600">
                      {r.referralCode ? (
                        <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-200 font-semibold text-[11px]">
                          {r.referralCode}
                        </span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 whitespace-nowrap">
                      {formatDate(r.date)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Engine Highlights Card */}
        <div className="bg-gradient-to-br from-purple-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> AI Growth Radar
              </span>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-semibold">
                Live Rule-Engine
              </span>
            </div>

            <h4 className="text-base font-bold text-white mb-2">
              Top Growth Driver
            </h4>
            <p className="text-xs text-purple-200 leading-relaxed">
              <strong>{metrics.leaderChannel.channel.name}</strong> is generating {metrics.leaderChannel.percent}% of its planned target, leading all acquisition channels.
            </p>

            <div className="mt-4 p-3 rounded-xl bg-white/10 border border-white/10">
              <span className="text-[11px] font-bold text-amber-300 block mb-1">
                ⚠️ Key Bottleneck:
              </span>
              <p className="text-xs text-purple-100 leading-snug">
                {metrics.laggingChannel.channel.name} has a deficit of {metrics.laggingChannel.deficit} registrations behind target.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('insights')}
            className="mt-5 w-full py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs shadow-md transition cursor-pointer text-center"
          >
            Open Full AI Insights & Simulator →
          </button>
        </div>
      </div>
    </div>
  );
};
