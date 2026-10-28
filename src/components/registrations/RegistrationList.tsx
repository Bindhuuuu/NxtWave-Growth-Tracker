import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Trash2, 
  UserPlus, 
  Download, 
  RotateCcw, 
  AlertTriangle, 
  X, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useCampaign } from '../../context/CampaignContext';
import type { Registration, MarketingChannel } from '../../types';
import { formatDate, exportRegistrationsToCSV } from '../../utils/formatters';

interface RegistrationListProps {
  onOpenAddModal: () => void;
}

export const RegistrationList: React.FC<RegistrationListProps> = ({ onOpenAddModal }) => {
  const { registrations, deleteRegistration, channels, resetToDemoData } = useCampaign();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const [selectedDay, setSelectedDay] = useState<string>('all');
  const [selectedReferralFilter, setSelectedReferralFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<'date' | 'name' | 'college'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  // Deletion Confirmation Modal state
  const [deleteTarget, setDeleteTarget] = useState<Registration | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Filtered & Sorted Registrations
  const filteredRegistrations = useMemo(() => {
    return registrations
      .filter(item => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = item.name.toLowerCase().includes(q);
          const matchesEmail = item.email.toLowerCase().includes(q);
          const matchesCollege = item.college.toLowerCase().includes(q);
          const matchesCode = item.referralCode?.toLowerCase().includes(q);
          const matchesId = item.id.toLowerCase().includes(q);
          if (!matchesName && !matchesEmail && !matchesCollege && !matchesCode && !matchesId) {
            return false;
          }
        }

        // Channel filter
        if (selectedChannel !== 'all' && item.channel !== selectedChannel) {
          return false;
        }

        // Day filter
        if (selectedDay !== 'all' && item.day !== Number(selectedDay)) {
          return false;
        }

        // Referral filter
        if (selectedReferralFilter === 'with_code' && !item.referralCode) {
          return false;
        }
        if (selectedReferralFilter === 'no_code' && item.referralCode) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortField === 'date') {
          return sortOrder === 'desc' 
            ? (b.day - a.day || b.id.localeCompare(a.id))
            : (a.day - b.day || a.id.localeCompare(b.id));
        } else if (sortField === 'name') {
          return sortOrder === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else {
          return sortOrder === 'asc'
            ? a.college.localeCompare(b.college)
            : b.college.localeCompare(a.college);
        }
      });
  }, [registrations, searchQuery, selectedChannel, selectedDay, selectedReferralFilter, sortField, sortOrder]);

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredRegistrations.length / pageSize));
  const paginatedRegistrations = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRegistrations.slice(start, start + pageSize);
  }, [filteredRegistrations, currentPage, pageSize]);

  // Reset page when filters change
  const handleFilterChange = (setter: (val: string) => void, val: string) => {
    setter(val);
    setCurrentPage(1);
  };

  const channelBadges: Record<MarketingChannel, { bg: string; text: string }> = {
    ambassador: { bg: 'bg-blue-50 text-blue-700 border-blue-200', text: 'Ambassador' },
    whatsapp: { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', text: 'WhatsApp' },
    instagram: { bg: 'bg-pink-50 text-pink-700 border-pink-200', text: 'Instagram' },
    referral: { bg: 'bg-purple-50 text-purple-700 border-purple-200', text: 'Personal Ref' }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-nxtwave-600" />
            Registration Management
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Browse, search, validate, and manage {registrations.length} simulated workshop registrations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => exportRegistrationsToCSV(registrations)}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition flex items-center gap-1.5 cursor-pointer"
            title="Download registrations as CSV"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>

          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold text-xs transition flex items-center gap-1.5 cursor-pointer"
            title="Reset dataset to demo baseline"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
            Reset Data
          </button>

          <button
            onClick={onOpenAddModal}
            className="px-4 py-2 rounded-xl bg-nxtwave-600 hover:bg-nxtwave-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            Add Registration
          </button>
        </div>
      </div>

      {/* Privacy Notice Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-nxtwave-600 flex-shrink-0" />
          <span>
            <strong>Simulated Records Only:</strong> All student names, emails, and phone numbers shown here are generated demo data. No real emails or messages are dispatched.
          </span>
        </div>
        <span className="font-semibold text-slate-500 text-[11px] whitespace-nowrap bg-white px-2.5 py-1 rounded-lg border border-slate-200">
          Client-Side Storage (LocalStorage)
        </span>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search Box */}
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by student, email, college, or ref code..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-nxtwave-500 bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Channel Filter */}
          <div>
            <select
              value={selectedChannel}
              onChange={(e) => handleFilterChange(setSelectedChannel, e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-nxtwave-500 capitalize"
            >
              <option value="all">All Channels</option>
              {channels.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Day Filter */}
          <div>
            <select
              value={selectedDay}
              onChange={(e) => handleFilterChange(setSelectedDay, e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-nxtwave-500"
            >
              <option value="all">All Days (1–7)</option>
              {[1, 2, 3, 4, 5, 6, 7].map(d => (
                <option key={d} value={d.toString()}>
                  Day {d}
                </option>
              ))}
            </select>
          </div>

          {/* Referral Presence Filter */}
          <div>
            <select
              value={selectedReferralFilter}
              onChange={(e) => handleFilterChange(setSelectedReferralFilter, e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-nxtwave-500"
            >
              <option value="all">All Referral Types</option>
              <option value="with_code">Has Referral Code</option>
              <option value="no_code">Direct (No Code)</option>
            </select>
          </div>
        </div>

        {/* Filter Summary & Result Count */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 flex-wrap gap-2">
          <span>
            Showing <strong>{filteredRegistrations.length}</strong> of {registrations.length} registrations
            {searchQuery && ` matching "${searchQuery}"`}
          </span>

          <div className="flex items-center gap-3">
            <span className="text-slate-400">Sort by:</span>
            <button
              onClick={() => {
                setSortField('date');
                setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
              }}
              className={`font-semibold cursor-pointer ${sortField === 'date' ? 'text-nxtwave-600' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Date {sortField === 'date' && (sortOrder === 'desc' ? '↓' : '↑')}
            </button>
            <button
              onClick={() => {
                setSortField('name');
                setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
              }}
              className={`font-semibold cursor-pointer ${sortField === 'name' ? 'text-nxtwave-600' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Name {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
              onClick={() => {
                setSortField('college');
                setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
              }}
              className={`font-semibold cursor-pointer ${sortField === 'college' ? 'text-nxtwave-600' : 'text-slate-600 hover:text-slate-900'}`}
            >
              College {sortField === 'college' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
          </div>
        </div>
      </div>

      {/* Registrations Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Student Details</th>
                <th className="py-3.5 px-4">College & Branch</th>
                <th className="py-3.5 px-4">Channel</th>
                <th className="py-3.5 px-4">Referral Code</th>
                <th className="py-3.5 px-4">Date / Day</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {paginatedRegistrations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <Users className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    <p className="text-sm font-semibold text-slate-600">No registrations found</p>
                    <p className="text-xs text-slate-400 mt-1">Try broadening your search term or adjusting channel filters.</p>
                  </td>
                </tr>
              ) : (
                paginatedRegistrations.map(reg => {
                  const badge = channelBadges[reg.channel] || { bg: 'bg-slate-100 text-slate-700', text: reg.channel };
                  return (
                    <tr key={reg.id} className="hover:bg-slate-50/80 transition group">
                      {/* Name & Email */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          {reg.name}
                          <span className="text-[10px] text-slate-400 font-mono font-normal">
                            ({reg.id})
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                          {reg.email}
                        </div>
                      </td>

                      {/* College & Branch */}
                      <td className="py-3 px-4 max-w-xs">
                        <div className="font-semibold text-slate-800 truncate" title={reg.college}>
                          {reg.college}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate" title={reg.branch}>
                          {reg.branch}
                        </div>
                      </td>

                      {/* Channel Badge */}
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${badge.bg}`}>
                          {badge.text}
                        </span>
                      </td>

                      {/* Referral Code */}
                      <td className="py-3 px-4">
                        {reg.referralCode ? (
                          <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 px-2 py-0.5 rounded-lg border border-purple-200 font-mono font-bold text-[11px]">
                            {reg.referralCode}
                          </span>
                        ) : (
                          <span className="text-slate-300 text-xs">—</span>
                        )}
                      </td>

                      {/* Date & Day */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="font-semibold text-slate-800">
                          {formatDate(reg.date)}
                        </div>
                        <span className="text-[10px] text-slate-500 font-medium">
                          Day {reg.day} of 7
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => setDeleteTarget(reg)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                          title="Delete registration"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 flex-wrap gap-3">
          <span>
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="font-bold text-slate-700 px-2">
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between">
              <div className="w-11 h-11 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <button
                onClick={() => setDeleteTarget(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-bold text-slate-900">Confirm Deletion</h3>
              <p className="text-sm text-slate-600 mt-2">
                Are you sure you want to remove the registration for <strong>{deleteTarget.name}</strong> ({deleteTarget.email})?
              </p>
              <p className="text-xs text-slate-500 mt-2">
                This will immediately reduce the total registrations count, update channel metrics, and recompute referral leaderboard attribution.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteRegistration(deleteTarget.id);
                  setDeleteTarget(null);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                Yes, Delete Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between">
              <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-bold text-slate-900">Reset Demo Registrations?</h3>
              <p className="text-sm text-slate-600 mt-2">
                This will restore the original 284 simulated engineering student registrations and default referral attributions.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  resetToDemoData();
                  setShowResetConfirm(false);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow transition cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                Restore Baseline Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
