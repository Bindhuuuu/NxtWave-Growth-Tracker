import { Menu, Calendar, TrendingUp, Wallet, Lightbulb } from 'lucide-react';
import { useCampaign } from '../../context/CampaignContext';
import { formatINR, formatPercent } from '../../utils/formatters';

interface NavbarProps {
  onToggleMobileSidebar: () => void;
  onOpenRationale: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleMobileSidebar, onOpenRationale }) => {
  const { activeDay, setActiveDay, metrics } = useCampaign();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 lg:px-8 py-3 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-nxtwave-600 text-white font-black text-sm shadow-sm">
                N
              </span>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                NxtWave Growth Intelligence
                <span className="hidden sm:inline-block text-[11px] font-semibold bg-nxtwave-50 text-nxtwave-700 px-2 py-0.5 rounded-full border border-nxtwave-200">
                  Intern Challenge
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-500 hidden md:block">
              "Build Your First AI Project in 60 Minutes" • 7-Day Sprint Simulation
            </p>
          </div>
        </div>

        {/* Right: Interactive Day Selector & Live KPIs */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Day Stepper / Selector */}
          <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200 text-xs font-semibold">
            <span className="text-slate-500 px-2 hidden md:inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-nxtwave-600" />
              Campaign Day:
            </span>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5, 6, 7].map(d => (
                <button
                  key={d}
                  onClick={() => setActiveDay(d)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition cursor-pointer ${
                    activeDay === d
                      ? 'bg-nxtwave-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-white/80 hover:text-slate-900'
                  }`}
                  title={`Simulate Day ${d} of campaign`}
                >
                  D{d}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Target KPI Pill */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="text-left text-xs">
              <span className="text-slate-500 block leading-tight font-medium">Registrations</span>
              <span className="font-bold text-slate-800">
                {metrics.totalRegistrations} <span className="text-slate-400">/ {metrics.totalTarget}</span>{' '}
                <span className="text-blue-600">({formatPercent(metrics.completionRate)})</span>
              </span>
            </div>
          </div>

          {/* Quick Budget KPI Pill */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
            <div className="text-left text-xs">
              <span className="text-slate-500 block leading-tight font-medium">Budget Used</span>
              <span className="font-bold text-slate-800">
                {formatINR(metrics.totalSpent)}{' '}
                <span className="text-slate-400">/ {formatINR(metrics.totalBudget)}</span>
              </span>
            </div>
          </div>

          {/* Strategic Rationale Button */}
          <button
            onClick={onOpenRationale}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold transition cursor-pointer shadow-sm"
            title="Read Growth Intern Strategic Rationale & Philosophy"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Strategy</span> Rationale
          </button>
        </div>
      </div>
    </header>
  );
};
