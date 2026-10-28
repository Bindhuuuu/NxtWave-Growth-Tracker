import React, { useState, useMemo } from 'react';
import { 
  Share2, 
  Award, 
  Trophy, 
  Copy, 
  Check, 
  UserPlus, 
  Users, 
  ShieldCheck
} from 'lucide-react';
import { useCampaign } from '../../context/CampaignContext';
import { AddAmbassadorModal } from './AddAmbassadorModal';
import { formatPercent } from '../../utils/formatters';

export const ReferralTracker: React.FC = () => {
  const { ambassadors, registrations, showToast } = useCampaign();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Dynamically compute leaderboard from current registrations array
  const leaderboard = useMemo(() => {
    const totalRegs = registrations.length || 1;

    return ambassadors.map(amb => {
      const codeUpper = amb.code.toUpperCase();
      const attributed = registrations.filter(
        r => r.referralCode && r.referralCode.toUpperCase() === codeUpper
      ).length;

      const completionRate = amb.target > 0 ? (attributed / amb.target) * 100 : 0;
      const shareOfTotal = (attributed / totalRegs) * 100;

      return {
        ...amb,
        attributed,
        completionRate,
        shareOfTotal
      };
    }).sort((a, b) => b.attributed - a.attributed);
  }, [ambassadors, registrations]);

  // Total referral registrations count
  const totalReferralRegs = useMemo(() => {
    return registrations.filter(r => Boolean(r.referralCode)).length;
  }, [registrations]);

  const referralShareOfAll = registrations.length > 0
    ? (totalReferralRegs / registrations.length) * 100
    : 0;

  const topAmbassador = leaderboard[0];

  const handleCopyLink = (code: string) => {
    const link = `https://nxtwave.in/workshop/ai-project?ref=${code}`;
    navigator.clipboard.writeText(link).catch(() => {});
    setCopiedCode(code);
    showToast(`Copied referral link for ${code}!`, 'success');
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Share2 className="w-6 h-6 text-purple-600" />
            Student Ambassador & Referral Tracker
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Real-time attribution leaderboard calculated dynamically from registration records.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          Add Student Ambassador
        </button>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metric 1: Total Attributed */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Attributed Signups
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {totalReferralRegs}
            </span>
            <span className="text-xs font-semibold text-purple-600">
              ({formatPercent(referralShareOfAll)} of campaign)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1.5">
            Peer-to-peer viral coefficient across engineering campuses
          </p>
        </div>

        {/* Metric 2: Active Ambassadors */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Campus Ambassadors
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {ambassadors.length}
            </span>
            <span className="text-xs font-semibold text-blue-600">
              across 5 colleges
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1.5">
            Average {(totalReferralRegs / Math.max(1, ambassadors.length)).toFixed(1)} signups per ambassador
          </p>
        </div>

        {/* Metric 3: Top Performer */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Leaderboard Leader
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Trophy className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-base truncate">
              {topAmbassador ? topAmbassador.name : '—'}
              {topAmbassador && (
                <span className="text-[11px] font-mono text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">
                  {topAmbassador.code}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5 truncate">
              {topAmbassador ? `${topAmbassador.attributed} registrations (${formatPercent(topAmbassador.completionRate)} of goal)` : 'No data'}
            </p>
          </div>
        </div>
      </div>

      {/* Simulated Tracking Notice */}
      <div className="p-4 bg-purple-50/60 rounded-2xl border border-purple-200/80 text-xs text-purple-900 flex items-start gap-2.5">
        <ShieldCheck className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Dynamic Referral Calculation:</strong> This leaderboard calculates ranks directly by filtering all registration objects matching each ambassador's unique code. In a production campaign, attribution links use UTM query parameters (e.g. <code>?ref=CAMP101</code>) that persist into hidden form inputs upon submission.
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              Ambassador Performance Leaderboard
            </h3>
            <p className="text-xs text-slate-500">
              Rankings dynamically updated whenever registrations are added or removed.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 w-12 text-center">Rank</th>
                <th className="py-3 px-4">Ambassador</th>
                <th className="py-3 px-4">College</th>
                <th className="py-3 px-4">Referral Code</th>
                <th className="py-3 px-4">Attributed Signups</th>
                <th className="py-3 px-4">Goal Progress</th>
                <th className="py-3 px-4">% of All Signups</th>
                <th className="py-3 px-4 text-right">Referral Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {leaderboard.map((amb, idx) => {
                const rank = idx + 1;
                const isCopied = copiedCode === amb.code;

                return (
                  <tr key={amb.id} className="hover:bg-slate-50/80 transition">
                    {/* Rank Badge */}
                    <td className="py-3 px-4 text-center">
                      {rank === 1 ? (
                        <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 font-black inline-flex items-center justify-center text-xs shadow-sm">
                          🥇
                        </span>
                      ) : rank === 2 ? (
                        <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-black inline-flex items-center justify-center text-xs">
                          🥈
                        </span>
                      ) : rank === 3 ? (
                        <span className="w-6 h-6 rounded-full bg-amber-50 text-amber-900 font-black inline-flex items-center justify-center text-xs">
                          🥉
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-slate-400">
                          #{rank}
                        </span>
                      )}
                    </td>

                    {/* Ambassador Name */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{amb.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{amb.email}</div>
                    </td>

                    {/* College */}
                    <td className="py-3 px-4 text-slate-700 font-semibold">
                      {amb.college}
                    </td>

                    {/* Code */}
                    <td className="py-3 px-4">
                      <span className="font-mono font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-lg border border-purple-200 text-xs">
                        {amb.code}
                      </span>
                    </td>

                    {/* Attributed Signups */}
                    <td className="py-3 px-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-extrabold text-slate-900">
                          {amb.attributed}
                        </span>
                        <span className="text-[11px] text-slate-400 font-normal">
                          / {amb.target} goal
                        </span>
                      </div>
                    </td>

                    {/* Goal Progress Bar */}
                    <td className="py-3 px-4 min-w-[120px]">
                      <div className="flex justify-between text-[11px] font-semibold text-slate-600 mb-1">
                        <span>{formatPercent(amb.completionRate)}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            amb.completionRate >= 100
                              ? 'bg-emerald-500'
                              : amb.completionRate >= 50
                              ? 'bg-purple-600'
                              : 'bg-amber-500'
                          }`}
                          style={{ width: `${Math.min(100, amb.completionRate)}%` }}
                        />
                      </div>
                    </td>

                    {/* Share of Total */}
                    <td className="py-3 px-4 font-bold text-slate-700">
                      {formatPercent(amb.shareOfTotal)}
                    </td>

                    {/* Share link action */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleCopyLink(amb.code)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                          isCopied
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-slate-100 text-slate-700 hover:bg-purple-50 hover:text-purple-700 border border-slate-200'
                        }`}
                        title="Copy shareable referral URL"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            Copy Link
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <AddAmbassadorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};
