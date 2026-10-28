import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  PieChart as PieIcon, 
  CheckCircle2, 
  AlertTriangle, 
  Zap,
  Info
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { useCampaign } from '../../context/CampaignContext';
import { formatPercent } from '../../utils/formatters';

export const ChannelAnalytics: React.FC = () => {
  const { metrics, registrations, activeDay } = useCampaign();

  // Actual vs Target data for Recharts BarChart
  const comparisonData = metrics.channelStats.map(c => ({
    name: c.name,
    Actual: c.actual,
    Target: c.target,
    Gap: Math.max(0, c.target - c.actual)
  }));

  // Daily distribution by channel for Day 1 to 7
  const dailyChannelData = [1, 2, 3, 4, 5, 6, 7].map(dayNum => {
    const dayRegs = registrations.filter(r => r.day === dayNum);
    return {
      day: `Day ${dayNum}`,
      Ambassador: dayRegs.filter(r => r.channel === 'ambassador').length,
      WhatsApp: dayRegs.filter(r => r.channel === 'whatsapp').length,
      Instagram: dayRegs.filter(r => r.channel === 'instagram').length,
      Referral: dayRegs.filter(r => r.channel === 'referral').length
    };
  });

  // Channel share data for Donut Chart
  const pieData = metrics.channelStats.map(c => ({
    name: c.name,
    value: c.actual,
    color: c.color
  }));

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-nxtwave-600" />
            Channel Analytics & Conversion Intel
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Evaluate performance across all 4 marketing funnels, compare actuals vs targets, and monitor acquisition efficiency.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-semibold">
          <Info className="w-4 h-4 text-nxtwave-600" />
          <span>Real-time data from {registrations.length} registrations</span>
        </div>
      </div>

      {/* Actual vs Target Comparison Chart & Share Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Actual vs Target Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Target className="w-4 h-4 text-nxtwave-600" />
                Actual Registrations vs Planned Targets
              </h3>
              <p className="text-xs text-slate-500">
                Direct side-by-side comparison across all 4 campaign channels
              </p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                  formatter={(val: any, name: any) => [`${val} students`, name]}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="Actual" fill="#2547e8" radius={[6, 6, 0, 0]} name="Actual Registrations" />
                <Bar dataKey="Target" fill="#cbd5e1" radius={[6, 6, 0, 0]} name="Planned Target (500 Total)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right 1 Col: Contribution Donut */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <PieIcon className="w-4 h-4 text-nxtwave-600" />
                  Channel Share
                </h3>
                <p className="text-xs text-slate-500">
                  Percentage contribution to total registrations
                </p>
              </div>
            </div>

            <div className="h-48 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                  >
                    {pieData.map((entry, index) => (
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

            <div className="space-y-2 mt-2">
              {metrics.channelStats.map(c => {
                const total = metrics.totalRegistrations || 1;
                const share = (c.actual / total) * 100;
                return (
                  <div key={c.id} className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                      {c.name}
                    </span>
                    <span>
                      {c.actual} regs <span className="text-slate-400 font-normal">({formatPercent(share)})</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Daily Channel Acquisition Stacking */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-nxtwave-600" />
              Daily Channel Trend (Day 1 - 7)
            </h3>
            <p className="text-xs text-slate-500">
              Breakdown of daily registrations contributed by each channel across the campaign timeline.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
            Simulated Day {activeDay}
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyChannelData} margin={{ top: 15, right: 20, left: -10, bottom: 5 }}>
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <RechartsTooltip 
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="Ambassador" stackId="a" fill="#3b82f6" name="Ambassadors" />
              <Bar dataKey="WhatsApp" stackId="a" fill="#10b981" name="WhatsApp" />
              <Bar dataKey="Instagram" stackId="a" fill="#ec4899" name="Instagram" />
              <Bar dataKey="Referral" stackId="a" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Email / Personal" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comprehensive Channel Scorecard */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900">
            Channel Performance Scorecard & Acquisition Cost (CAC)
          </h3>
          <p className="text-xs text-slate-500">
            Real data calculations derived from registered students and budget expenditures.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Actual Signups</th>
                <th className="py-3 px-4">Planned Target</th>
                <th className="py-3 px-4">Target %</th>
                <th className="py-3 px-4">Contribution Share</th>
                <th className="py-3 px-4">Cost / Reg (CAC)</th>
                <th className="py-3 px-4 text-right">Pacing Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {metrics.channelStats.map(c => {
                const total = metrics.totalRegistrations || 1;
                const share = (c.actual / total) * 100;

                return (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                        {c.name}
                      </div>
                    </td>

                    <td className="py-3 px-4 font-extrabold text-slate-900 text-sm">
                      {c.actual}
                    </td>

                    <td className="py-3 px-4 text-slate-600 font-semibold">
                      {c.target}
                    </td>

                    <td className="py-3 px-4 font-bold text-slate-800">
                      {c.percent}%
                    </td>

                    <td className="py-3 px-4 text-slate-600">
                      {formatPercent(share)}
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-slate-700">
                      ₹{c.cpa}
                    </td>

                    <td className="py-3 px-4 text-right">
                      {c.status === 'ahead' ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full text-[11px] font-bold border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> Ahead of Pace
                        </span>
                      ) : c.status === 'on_track' ? (
                        <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-[11px] font-bold border border-blue-200">
                          On Track
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full text-[11px] font-bold border border-amber-200">
                          <AlertTriangle className="w-3 h-3" /> Lagging Target
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Data-Driven Insights Callout */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 text-white shadow-lg space-y-4">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
          <Zap className="w-4 h-4" /> Data-Driven Channel Observations
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
            <h4 className="font-bold text-white text-sm mb-1">
              Top Volume Channel: {metrics.leaderChannel.channel.name}
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Leading with <strong>{metrics.leaderChannel.actual} registrations</strong> ({metrics.leaderChannel.percent}% of target achieved). Word-of-mouth student leadership is proving to be the most cost-efficient mechanism in this demographic.
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
            <h4 className="font-bold text-white text-sm mb-1">
              Largest Target Deficit: {metrics.laggingChannel.channel.name}
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Currently at <strong>{metrics.laggingChannel.actual} of {metrics.laggingChannel.target}</strong> ({metrics.laggingChannel.percent}%). It needs <strong>{metrics.laggingChannel.deficit} additional registrations</strong> to fulfill its quota.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
