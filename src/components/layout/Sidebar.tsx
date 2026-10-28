import React from 'react';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Users, 
  Share2, 
  BarChart3, 
  Wallet, 
  Sparkles, 
  X,
  Target,
  BookOpen
} from 'lucide-react';
import type { ActiveTab } from '../../types';
import { useCampaign } from '../../context/CampaignContext';
import { formatPercent } from '../../utils/formatters';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile
}) => {
  const { metrics, registrations } = useCampaign();

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string | number; badgeColor?: string }[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <LayoutDashboard className="w-4 h-4" />
    },
    {
      id: 'planner',
      label: 'Campaign Planner',
      icon: <CalendarCheck className="w-4 h-4" />,
      badge: `Day ${metrics.activeDay}/7`
    },
    {
      id: 'registrations',
      label: 'Registrations',
      icon: <Users className="w-4 h-4" />,
      badge: registrations.length,
      badgeColor: 'bg-blue-100 text-blue-700'
    },
    {
      id: 'referrals',
      label: 'Referral Tracker',
      icon: <Share2 className="w-4 h-4" />
    },
    {
      id: 'analytics',
      label: 'Channel Analytics',
      icon: <BarChart3 className="w-4 h-4" />
    },
    {
      id: 'budget',
      label: 'Budget Tracker',
      icon: <Wallet className="w-4 h-4" />,
      badge: `₹${metrics.remainingBudget} left`
    },
    {
      id: 'insights',
      label: 'AI Growth Insights',
      icon: <Sparkles className="w-4 h-4 text-purple-500" />,
      badge: 'Smart Engine',
      badgeColor: 'bg-purple-100 text-purple-700'
    }
  ];

  const handleSelect = (tab: ActiveTab) => {
    onSelectTab(tab);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Top Header in Sidebar */}
        <div>
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-nxtwave-600 to-indigo-800 text-white flex items-center justify-center font-black shadow-md shadow-nxtwave-500/20">
                ⚡
              </div>
              <div>
                <span className="font-extrabold text-slate-900 text-base tracking-tight block">
                  NxtWave Growth
                </span>
                <span className="text-[11px] font-medium text-slate-500 block">
                  Campaign Control Center
                </span>
              </div>
            </div>

            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Navigation
            </div>
            {navItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-nxtwave-50 text-nxtwave-700 shadow-sm border border-nxtwave-200 font-bold'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-nxtwave-600' : 'text-slate-400'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        item.badgeColor || (isActive ? 'bg-nxtwave-100 text-nxtwave-800' : 'bg-slate-100 text-slate-600')
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Campaign Brief Card */}
        <div className="p-4 border-t border-slate-100">
          <div className="bg-gradient-to-br from-slate-900 to-nxtwave-950 text-white rounded-2xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-nxtwave-400 flex items-center gap-1">
                <BookOpen className="w-3 h-3" /> Workshop Brief
              </span>
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full font-semibold text-slate-200">
                7 Days
              </span>
            </div>

            <p className="text-xs font-bold leading-snug text-white">
              Build Your First AI Project in 60 Mins
            </p>
            <p className="text-[11px] text-slate-300 mt-1">
              Target: 500 Final-Year Engg Students (CSE/IT/AI-ML)
            </p>

            <div className="mt-3 pt-2 border-t border-white/10">
              <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                <span className="flex items-center gap-1">
                  <Target className="w-3 h-3 text-nxtwave-400" /> Target Progress
                </span>
                <span className="font-bold text-white">
                  {formatPercent(metrics.completionRate)}
                </span>
              </div>
              <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, metrics.completionRate)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
