import React, { useState, useMemo } from 'react';
import { 
  Wallet, 
  PlusCircle, 
  Trash2, 
  AlertTriangle, 
  PieChart as PieIcon,
  ShieldAlert
} from 'lucide-react';
import { useCampaign } from '../../context/CampaignContext';
import { INITIAL_BUDGET_CATEGORIES } from '../../context/initialData';
import { AddExpenseModal } from './AddExpenseModal';
import { formatINR, formatPercent, formatDate } from '../../utils/formatters';

export const BudgetTracker: React.FC = () => {
  const { expenses, deleteExpense, metrics } = useCampaign();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Group expenses by category
  const categoryStats = useMemo(() => {
    return INITIAL_BUDGET_CATEGORIES.map(cat => {
      const spent = expenses
        .filter(e => e.category === cat.id)
        .reduce((sum, e) => sum + e.amount, 0);

      const remaining = cat.allocated - spent;
      const percent = (spent / cat.allocated) * 100;
      const isOver = spent > cat.allocated;

      return {
        ...cat,
        spent,
        remaining,
        percent,
        isOver
      };
    });
  }, [expenses]);

  const isOverBudget = metrics.totalSpent > metrics.totalBudget;
  const budgetDeficit = metrics.totalSpent - metrics.totalBudget;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Wallet className="w-6 h-6 text-emerald-600" />
            Campaign Budget & Expenditure Tracker
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Tracking ₹2,000 maximum campaign budget across content, social ads, ambassador incentives, and contingency.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          Record New Expense
        </button>
      </div>

      {/* Dynamic Overspend Alert Warning Banner */}
      {isOverBudget ? (
        <div className="p-4 bg-rose-50 border-2 border-rose-300 rounded-2xl text-rose-800 text-xs sm:text-sm font-semibold flex items-center gap-3 shadow-md">
          <ShieldAlert className="w-6 h-6 text-rose-600 flex-shrink-0" />
          <div>
            <span className="font-bold uppercase tracking-wider block text-rose-700">
              ⚠️ CRITICAL: Campaign Budget Exceeded!
            </span>
            Total expenditure has reached <strong>{formatINR(metrics.totalSpent)}</strong>, which exceeds the ₹2,000 limit by <strong>{formatINR(budgetDeficit)}</strong>. Reallocate or delete excessive expenses immediately.
          </div>
        </div>
      ) : metrics.burnRate > 80 ? (
        <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl text-amber-800 text-xs sm:text-sm font-medium flex items-center gap-3 shadow-sm">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <div>
            <span className="font-bold block text-amber-700">High Budget Burn Rate ({formatPercent(metrics.burnRate)})</span>
            You have spent {formatINR(metrics.totalSpent)} with {metrics.daysRemaining} days left in the sprint. Only {formatINR(metrics.remainingBudget)} remaining.
          </div>
        </div>
      ) : null}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {/* Total Budget */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Budget</span>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {formatINR(metrics.totalBudget)}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">Fixed sprint limit</span>
        </div>

        {/* Total Spent */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Spent</span>
          <div className={`text-2xl font-black mt-2 ${isOverBudget ? 'text-rose-600' : 'text-slate-900'}`}>
            {formatINR(metrics.totalSpent)}
          </div>
          <span className="text-xs text-slate-500 mt-1 block font-medium">
            {expenses.length} recorded entries
          </span>
        </div>

        {/* Remaining Budget */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Remaining Buffer</span>
          <div className={`text-2xl font-black mt-2 ${metrics.remainingBudget <= 200 ? 'text-amber-600' : 'text-emerald-600'}`}>
            {formatINR(metrics.remainingBudget)}
          </div>
          <span className="text-xs text-slate-500 mt-1 block font-medium">
            {formatPercent(100 - metrics.burnRate)} uncommitted
          </span>
        </div>

        {/* Cost Per Acquisition */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Cost Per Reg (CAC)</span>
          <div className="text-2xl font-black text-purple-600 mt-2">
            ₹{metrics.overallCAC}
          </div>
          <span className="text-xs text-slate-500 mt-1 block font-medium">
            Across {metrics.totalRegistrations} students
          </span>
        </div>
      </div>

      {/* 4 Category Allocation Cards */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <PieIcon className="w-4 h-4 text-emerald-600" />
          Allocated Budget Breakdown by Activity
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categoryStats.map(cat => (
            <div 
              key={cat.id}
              className={`p-5 rounded-2xl border bg-white shadow-sm flex flex-col justify-between transition ${
                cat.isOver ? 'border-rose-300 ring-1 ring-rose-200' : 'border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  {cat.isOver && (
                    <span className="text-[10px] font-bold bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">
                      Exceeded
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-bold text-slate-900">{cat.name}</h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Spent: {formatINR(cat.spent)}</span>
                  <span className="text-slate-400">of {formatINR(cat.allocated)}</span>
                </div>

                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      cat.isOver ? 'bg-rose-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(100, cat.percent)}%` }}
                  />
                </div>

                <div className="mt-2 flex justify-between text-[11px] text-slate-500">
                  <span>Remaining:</span>
                  <span className={`font-bold ${cat.remaining < 0 ? 'text-rose-600' : 'text-slate-800'}`}>
                    {formatINR(cat.remaining)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expense Log Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Itemized Campaign Expenses Log
            </h3>
            <p className="text-xs text-slate-500">
              All transactions recorded for workshop marketing and student ambassador incentives.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Expense ID</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {expenses.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No expenses logged yet.
                  </td>
                </tr>
              ) : (
                expenses.map(exp => (
                  <tr key={exp.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-mono font-bold text-slate-500">
                      {exp.id}
                    </td>

                    <td className="py-3 px-4">
                      <span className="capitalize px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                        {exp.category.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-semibold text-slate-800">
                      {exp.description}
                    </td>

                    <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                      {formatDate(exp.date)} (Day {exp.day})
                    </td>

                    <td className="py-3 px-4 font-extrabold text-slate-900 text-sm">
                      {formatINR(exp.amount)}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => deleteExpense(exp.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                        title="Remove expense"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
