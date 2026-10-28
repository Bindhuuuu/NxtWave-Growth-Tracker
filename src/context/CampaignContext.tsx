import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { 
  Registration, 
  ChannelInfo, 
  Ambassador, 
  Expense, 
  DaySchedule, 
  GrowthInsight 
} from '../types';
import { 
  INITIAL_CHANNELS, 
  INITIAL_AMBASSADORS, 
  INITIAL_EXPENSES, 
  INITIAL_SCHEDULE, 
  generateInitialRegistrations 
} from './initialData';
import { 
  type CampaignMetrics, 
  calculateCampaignMetrics, 
  generateRuleBasedInsights 
} from '../utils/analyticsRules';

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface CampaignContextType {
  activeDay: number;
  setActiveDay: (day: number) => void;
  channels: ChannelInfo[];
  updateChannelTargets: (updated: { id: string; target: number }[]) => { success: boolean; error?: string };
  registrations: Registration[];
  addRegistration: (data: Omit<Registration, 'id' | 'timestamp'>) => { success: boolean; error?: string };
  deleteRegistration: (id: string) => void;
  ambassadors: Ambassador[];
  addAmbassador: (data: Omit<Ambassador, 'id'>) => { success: boolean; error?: string };
  expenses: Expense[];
  addExpense: (data: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
  schedule: DaySchedule[];
  toggleScheduleTask: (day: number, task: string) => void;
  metrics: CampaignMetrics;
  insights: GrowthInsight[];
  resetToDemoData: () => void;
  toast: ToastMessage | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  hideToast: () => void;
}

const STORAGE_KEYS = {
  REGISTRATIONS: 'nxtwave_growth_registrations_v1',
  CHANNELS: 'nxtwave_growth_channels_v1',
  AMBASSADORS: 'nxtwave_growth_ambassadors_v1',
  EXPENSES: 'nxtwave_growth_expenses_v1',
  SCHEDULE: 'nxtwave_growth_schedule_v1',
  ACTIVE_DAY: 'nxtwave_growth_active_day_v1'
};

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export const CampaignProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Active Campaign Day (defaults to Day 4 - mid campaign)
  const [activeDay, setActiveDayState] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_DAY);
    return saved ? parseInt(saved, 10) : 4;
  });

  const setActiveDay = (day: number) => {
    setActiveDayState(day);
    localStorage.setItem(STORAGE_KEYS.ACTIVE_DAY, day.toString());
  };

  // 2. Marketing Channels & Targets
  const [channels, setChannels] = useState<ChannelInfo[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CHANNELS);
    return saved ? JSON.parse(saved) : INITIAL_CHANNELS;
  });

  // 3. Registrations
  const [registrations, setRegistrations] = useState<Registration[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
    return saved ? JSON.parse(saved) : generateInitialRegistrations();
  });

  // 4. Ambassadors
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AMBASSADORS);
    return saved ? JSON.parse(saved) : INITIAL_AMBASSADORS;
  });

  // 5. Budget Expenses
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EXPENSES);
    return saved ? JSON.parse(saved) : INITIAL_EXPENSES;
  });

  // 6. Schedule & Checklist
  const [schedule, setSchedule] = useState<DaySchedule[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SCHEDULE);
    return saved ? JSON.parse(saved) : INITIAL_SCHEDULE;
  });

  // Toast notification state
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ id: Date.now().toString(), message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 3800);
    return () => clearTimeout(timer);
  }, [toast]);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CHANNELS, JSON.stringify(channels));
  }, [channels]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AMBASSADORS, JSON.stringify(ambassadors));
  }, [ambassadors]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(schedule));
  }, [schedule]);

  // Registrations Management
  const addRegistration = (data: Omit<Registration, 'id' | 'timestamp'>) => {
    // Check duplicate email (case-insensitive)
    const normalizedEmail = data.email.trim().toLowerCase();
    const exists = registrations.some(r => r.email.trim().toLowerCase() === normalizedEmail);
    if (exists) {
      return { 
        success: false, 
        error: `A registration with email "${data.email}" already exists. Duplicate registrations are prohibited.` 
      };
    }

    const newId = `REG-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRecord: Registration = {
      ...data,
      id: newId,
      email: normalizedEmail,
      timestamp: new Date().toISOString()
    };

    setRegistrations(prev => [newRecord, ...prev]);
    showToast(`Registered ${data.name} successfully! (${newId})`, 'success');
    return { success: true };
  };

  const deleteRegistration = (id: string) => {
    const target = registrations.find(r => r.id === id);
    setRegistrations(prev => prev.filter(r => r.id !== id));
    showToast(`Removed registration ${id} (${target?.name || ''})`, 'info');
  };

  // Channel Targets Management
  const updateChannelTargets = (updated: { id: string; target: number }[]) => {
    for (const item of updated) {
      if (isNaN(item.target) || item.target < 0) {
        return { success: false, error: 'Targets must be non-negative numbers.' };
      }
    }

    const newChannels = channels.map(c => {
      const match = updated.find(u => u.id === c.id);
      return match ? { ...c, target: match.target } : c;
    });

    setChannels(newChannels);
    showToast('Channel targets updated successfully!', 'success');
    return { success: true };
  };

  // Ambassador Management
  const addAmbassador = (data: Omit<Ambassador, 'id'>) => {
    const normalizedCode = data.code.trim().toUpperCase();
    const codeExists = ambassadors.some(a => a.code.toUpperCase() === normalizedCode);
    if (codeExists) {
      return { success: false, error: `Referral code "${normalizedCode}" is already assigned to another ambassador.` };
    }

    const newAmbassador: Ambassador = {
      ...data,
      id: `AMB-${Math.floor(100 + Math.random() * 900)}`,
      code: normalizedCode
    };

    setAmbassadors(prev => [...prev, newAmbassador]);
    showToast(`Ambassador ${data.name} added with code ${normalizedCode}!`, 'success');
    return { success: true };
  };

  // Expense Management
  const addExpense = (data: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...data,
      id: `EXP-${Math.floor(100 + Math.random() * 900)}`
    };
    setExpenses(prev => [...prev, newExpense]);
    showToast(`Logged ₹${data.amount} for "${data.description}"`, 'success');
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
    showToast(`Expense deleted`, 'info');
  };

  // Schedule task toggle
  const toggleScheduleTask = (day: number, task: string) => {
    setSchedule(prev => prev.map(s => {
      if (s.day !== day) return s;
      const isCompleted = s.completedTasks.includes(task);
      const updatedTasks = isCompleted
        ? s.completedTasks.filter(t => t !== task)
        : [...s.completedTasks, task];
      return { ...s, completedTasks: updatedTasks };
    }));
  };

  // Reset to initial demo dataset
  const resetToDemoData = () => {
    const initialRegs = generateInitialRegistrations();
    setRegistrations(initialRegs);
    setChannels(INITIAL_CHANNELS);
    setAmbassadors(INITIAL_AMBASSADORS);
    setExpenses(INITIAL_EXPENSES);
    setSchedule(INITIAL_SCHEDULE);
    setActiveDay(4);
    
    localStorage.removeItem(STORAGE_KEYS.REGISTRATIONS);
    localStorage.removeItem(STORAGE_KEYS.CHANNELS);
    localStorage.removeItem(STORAGE_KEYS.AMBASSADORS);
    localStorage.removeItem(STORAGE_KEYS.EXPENSES);
    localStorage.removeItem(STORAGE_KEYS.SCHEDULE);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_DAY);

    showToast('Demo environment restored to fresh baseline!', 'info');
  };

  // Dynamic calculated metrics & insights
  const totalTarget = useMemo(() => {
    return channels.reduce((sum, c) => sum + c.target, 0);
  }, [channels]);

  const metrics = useMemo(() => {
    return calculateCampaignMetrics(
      registrations,
      channels,
      expenses,
      activeDay,
      totalTarget,
      2000
    );
  }, [registrations, channels, expenses, activeDay, totalTarget]);

  const insights = useMemo(() => {
    return generateRuleBasedInsights(metrics);
  }, [metrics]);

  return (
    <CampaignContext.Provider
      value={{
        activeDay,
        setActiveDay,
        channels,
        updateChannelTargets,
        registrations,
        addRegistration,
        deleteRegistration,
        ambassadors,
        addAmbassador,
        expenses,
        addExpense,
        deleteExpense,
        schedule,
        toggleScheduleTask,
        metrics,
        insights,
        resetToDemoData,
        toast,
        showToast,
        hideToast
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaign = () => {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return context;
};
