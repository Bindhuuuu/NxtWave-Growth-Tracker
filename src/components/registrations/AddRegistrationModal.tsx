import React, { useState } from 'react';
import { X, UserPlus, AlertCircle, ShieldCheck } from 'lucide-react';
import { useCampaign } from '../../context/CampaignContext';
import type { MarketingChannel } from '../../types';

interface AddRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddRegistrationModal: React.FC<AddRegistrationModalProps> = ({
  isOpen,
  onClose
}) => {
  const { addRegistration, channels, ambassadors, activeDay } = useCampaign();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [branch, setBranch] = useState('Computer Science & Engineering (CSE)');
  const [channel, setChannel] = useState<MarketingChannel>('ambassador');
  const [referralCode, setReferralCode] = useState('');
  const [day, setDay] = useState<number>(activeDay);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const defaultColleges = [
    'IIT Hyderabad',
    'NIT Warangal',
    'CBIT Hyderabad',
    'VNR VJIET',
    'JNTU College of Engineering',
    'Vasavi College of Engineering',
    'BITS Pilani Hyderabad',
    'Osmania University College of Engg',
    'Gokaraju Rangaraju Institute (GRIET)',
    'Sreenidhi Institute of Science & Tech'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation 1: Required fields
    if (!name.trim()) {
      setErrorMessage('Student name is required.');
      return;
    }
    if (!email.trim()) {
      setErrorMessage('Student email is required.');
      return;
    }
    if (!college.trim()) {
      setErrorMessage('College name is required.');
      return;
    }

    // Validation 2: Email format regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid email format (e.g., student.name@college.edu.in).');
      return;
    }

    // Date computation for the selected campaign day
    const baseDate = new Date('2026-10-24');
    baseDate.setDate(baseDate.getDate() + day);
    const dateStr = baseDate.toISOString().slice(0, 10);

    const result = addRegistration({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      college: college.trim(),
      branch,
      year: '4th Year (Final Year)',
      date: dateStr,
      day: day,
      channel: channel,
      referralCode: referralCode.trim() ? referralCode.trim().toUpperCase() : undefined
    });

    if (result.success) {
      // Reset form and close
      setName('');
      setEmail('');
      setCollege('');
      setReferralCode('');
      setErrorMessage(null);
      onClose();
    } else {
      setErrorMessage(result.error || 'Failed to add registration');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-nxtwave-50 text-nxtwave-600 flex items-center justify-center">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Add Simulated Registration</h3>
              <p className="text-xs text-slate-500">Record a final-year engineering student registration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="mt-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-start gap-2 animate-shake">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Student Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Fictional Student Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Rohith Reddy"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-nxtwave-500 bg-white"
            />
          </div>

          {/* Student Email */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Fictional Student Email <span className="text-rose-500">* (Must be unique)</span>
            </label>
            <input
              type="email"
              required
              placeholder="e.g. rohith.r@iith.edu.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-nxtwave-500 bg-white font-mono text-xs"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Validation will reject duplicate emails in real time.
            </p>
          </div>

          {/* College */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Engineering College <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                list="colleges-list"
                placeholder="Select or type engineering college..."
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-nxtwave-500 bg-white"
              />
              <datalist id="colleges-list">
                {defaultColleges.map((c, i) => (
                  <option key={i} value={c} />
                ))}
              </datalist>
            </div>
          </div>

          {/* Branch & Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Department / Branch
              </label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-nxtwave-500 bg-white"
              >
                <option value="Computer Science & Engineering (CSE)">CSE</option>
                <option value="Information Technology (IT)">IT</option>
                <option value="Artificial Intelligence & Machine Learning (AI & ML)">AI & ML</option>
                <option value="Data Science & Analytics">Data Science</option>
                <option value="Electronics & Communication (ECE)">ECE</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Academic Year
              </label>
              <input
                type="text"
                disabled
                value="4th Year (Final Year)"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-100 text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Marketing Channel & Day */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Acquisition Channel
              </label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value as MarketingChannel)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-nxtwave-500 bg-white capitalize"
              >
                {channels.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Campaign Day
              </label>
              <select
                value={day}
                onChange={(e) => setDay(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-nxtwave-500 bg-white"
              >
                {[1, 2, 3, 4, 5, 6, 7].map(d => (
                  <option key={d} value={d}>
                    Day {d} {d === activeDay ? '(Current)' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Referral Code (Optional) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Referral Code <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. CAMP101"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-nxtwave-500 bg-white uppercase"
              />
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    setReferralCode(e.target.value);
                    setChannel('ambassador');
                  }
                }}
                className="px-2 py-2 text-xs border border-slate-300 rounded-xl bg-slate-50 font-medium text-slate-600"
              >
                <option value="">Choose Ambassador...</option>
                {ambassadors.map(a => (
                  <option key={a.id} value={a.code}>
                    {a.code} ({a.name.split(' ')[0]})
                  </option>
                ))}
              </select>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Entering an ambassador's referral code automatically credits them on the Referral Leaderboard.
            </p>
          </div>

          {/* Privacy Notice Disclaimer */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-nxtwave-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Simulated Data Policy:</strong> This entry is stored only in your browser's localStorage. A real-world production workshop would require encrypted backend storage and consent compliant with DPDP regulations.
            </span>
          </div>

          {/* Form Actions */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold text-white bg-nxtwave-600 hover:bg-nxtwave-700 rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              Save Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
