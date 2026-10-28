import React, { useState } from 'react';
import { X, Award, AlertCircle, Sparkles } from 'lucide-react';
import { useCampaign } from '../../context/CampaignContext';

interface AddAmbassadorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddAmbassadorModal: React.FC<AddAmbassadorModalProps> = ({
  isOpen,
  onClose
}) => {
  const { addAmbassador, ambassadors, activeDay } = useCampaign();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [target, setTarget] = useState<number>(35);
  const [code, setCode] = useState(() => `CAMP${101 + ambassadors.length}`);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerateCode = () => {
    const nextNum = 101 + ambassadors.length + Math.floor(Math.random() * 10);
    setCode(`CAMP${nextNum}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Ambassador name is required.');
      return;
    }
    if (!college.trim()) {
      setError('College is required.');
      return;
    }
    if (!code.trim()) {
      setError('Referral code is required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please provide a valid email address.');
      return;
    }

    const res = addAmbassador({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      college: college.trim(),
      code: code.trim().toUpperCase(),
      target: target,
      joinedDay: activeDay
    });

    if (res.success) {
      setName('');
      setEmail('');
      setCollege('');
      onClose();
    } else {
      setError(res.error || 'Failed to add ambassador');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Add Student Ambassador</h3>
              <p className="text-xs text-slate-500">Recruit campus lead with unique referral tracking</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mt-3 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Ambassador Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Varun Teja"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Student Email <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="e.g. varun.t@vnr.edu.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Engineering College <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. VNR VJIET"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Unique Referral Code
              </label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white uppercase"
                />
                <button
                  type="button"
                  onClick={handleGenerateCode}
                  className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 transition"
                  title="Generate new code"
                >
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Registration Target
              </label>
              <input
                type="number"
                min="5"
                max="100"
                value={target}
                onChange={(e) => setTarget(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
              />
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-md transition flex items-center gap-1.5"
            >
              <Award className="w-4 h-4" />
              Enroll Ambassador
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
