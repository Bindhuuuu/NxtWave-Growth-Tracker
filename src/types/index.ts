export type MarketingChannel = 'ambassador' | 'whatsapp' | 'instagram' | 'referral';

export interface ChannelInfo {
  id: MarketingChannel;
  name: string;
  target: number;
  color: string;
  badgeBg: string;
  badgeText: string;
  description: string;
}

export interface Registration {
  id: string;
  name: string;
  email: string;
  college: string;
  branch: string;
  year: string;
  date: string; // ISO date string YYYY-MM-DD
  day: number; // Campaign day 1 to 7
  channel: MarketingChannel;
  referralCode?: string;
  timestamp: string;
}

export interface Ambassador {
  id: string;
  name: string;
  email: string;
  college: string;
  code: string; // e.g. CAMP101
  target: number;
  joinedDay: number;
}

export type ExpenseCategory = 
  | 'instagram_ads' 
  | 'promotional_content' 
  | 'ambassador_incentives' 
  | 'contingency';

export interface Expense {
  id: string;
  category: ExpenseCategory;
  description: string;
  amount: number; // in INR
  date: string;
  day: number;
}

export interface BudgetCategoryAllocation {
  id: ExpenseCategory;
  name: string;
  allocated: number; // in INR
  color: string;
  description: string;
}

export interface DaySchedule {
  day: number;
  title: string;
  subtitle: string;
  dateStr: string;
  activities: string[];
  suggestedMilestone: number; // cumulative target
  focusChannels: MarketingChannel[];
  keyDeliverable: string;
  completedTasks: string[];
}

export interface GrowthInsight {
  id: string;
  type: 'success' | 'warning' | 'info' | 'critical';
  category: 'channel' | 'pace' | 'budget' | 'referral';
  title: string;
  metricBadge: string;
  summary: string;
  recommendation: string;
  impact: 'High' | 'Medium' | 'Low';
}

export type ActiveTab = 
  | 'overview' 
  | 'planner' 
  | 'registrations' 
  | 'referrals' 
  | 'analytics' 
  | 'budget' 
  | 'insights';
