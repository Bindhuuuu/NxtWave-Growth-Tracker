import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useCampaign } from '../../context/CampaignContext';

export const Toast: React.FC = () => {
  const { toast, hideToast } = useCampaign();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />
  };

  const borders = {
    success: 'border-emerald-200 bg-white shadow-emerald-500/10',
    error: 'border-rose-200 bg-white shadow-rose-500/10',
    info: 'border-blue-200 bg-white shadow-blue-500/10'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-bounce-in">
      <div className={`p-4 rounded-2xl border shadow-xl flex items-center justify-between gap-3 ${borders[toast.type]}`}>
        <div className="flex items-center gap-3">
          {icons[toast.type]}
          <p className="text-xs sm:text-sm font-semibold text-slate-800">
            {toast.message}
          </p>
        </div>
        <button
          onClick={hideToast}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
