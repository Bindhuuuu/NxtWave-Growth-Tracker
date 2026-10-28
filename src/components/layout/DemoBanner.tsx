import React, { useState } from 'react';
import { ShieldAlert, RotateCcw, AlertTriangle, X } from 'lucide-react';
import { useCampaign } from '../../context/CampaignContext';

export const DemoBanner: React.FC = () => {
  const { resetToDemoData } = useCampaign();
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white px-4 py-2 text-xs md:text-sm font-medium shadow-sm flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center bg-white/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider text-[11px] border border-white/30">
            <ShieldAlert className="w-3.5 h-3.5 mr-1" /> DEMO MODE
          </span>
          <span className="leading-tight">
            All registrations, student profiles, and campaign results are <strong>simulated for the NxtWave Challenge</strong>. No real students are contacted.
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowConfirm(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/20 hover:bg-black/35 text-white transition text-xs font-semibold backdrop-blur-sm border border-white/20 cursor-pointer"
            title="Reset to default baseline demo data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Demo Data
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between">
              <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <button
                onClick={() => setShowConfirm(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-bold text-slate-900">Reset Demo Data to Baseline?</h3>
              <p className="text-sm text-slate-600 mt-2">
                This will restore the original 284 simulated registrations, initial ambassador list, baseline ₹2,000 budget allocations, and Day 4 schedule state. Any custom registrations or expenses you added will be reverted.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  resetToDemoData();
                  setShowConfirm(false);
                }}
                className="px-4 py-2 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow transition cursor-pointer flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Yes, Reset All Data
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
