import React, { useState } from 'react';
import { CampaignProvider } from './context/CampaignContext';
import type { ActiveTab } from './types';
import { DemoBanner } from './components/layout/DemoBanner';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Toast } from './components/layout/Toast';
import { OverviewDashboard } from './components/overview/OverviewDashboard';
import { CampaignPlanner } from './components/planner/CampaignPlanner';
import { RegistrationList } from './components/registrations/RegistrationList';
import { AddRegistrationModal } from './components/registrations/AddRegistrationModal';
import { ReferralTracker } from './components/referrals/ReferralTracker';
import { ChannelAnalytics } from './components/analytics/ChannelAnalytics';
import { BudgetTracker } from './components/budget/BudgetTracker';
import { AIGrowthInsights } from './components/insights/AIGrowthInsights';
import { StrategicRationaleModal } from './components/layout/StrategicRationaleModal';

const MainLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRationaleOpen, setIsRationaleOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800 antialiased selection:bg-nxtwave-500 selection:text-white">
      {/* 1. Global Simulation Disclaimer Banner */}
      <DemoBanner />

      {/* 2. Top Application Navbar */}
      <Navbar 
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(prev => !prev)} 
        onOpenRationale={() => setIsRationaleOpen(true)}
      />

      {/* 3. Main Body: Sidebar + Dynamic Content View */}
      <div className="flex-1 flex w-full max-w-[1700px] mx-auto">
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-full overflow-x-hidden min-h-[calc(100vh-120px)] flex flex-col justify-between">
          <div>
            {activeTab === 'overview' && (
              <OverviewDashboard 
                onNavigate={setActiveTab} 
                onOpenAddModal={() => setIsAddModalOpen(true)}
              />
            )}

            {activeTab === 'planner' && (
              <CampaignPlanner />
            )}

            {activeTab === 'registrations' && (
              <RegistrationList 
                onOpenAddModal={() => setIsAddModalOpen(true)}
              />
            )}

            {activeTab === 'referrals' && (
              <ReferralTracker />
            )}

            {activeTab === 'analytics' && (
              <ChannelAnalytics />
            )}

            {activeTab === 'budget' && (
              <BudgetTracker />
            )}

            {activeTab === 'insights' && (
              <AIGrowthInsights />
            )}
          </div>

          {/* Clean Dashboard Footer */}
          <footer className="mt-12 pt-6 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700">NxtWave Growth Intern Challenge</span>
              <span>•</span>
              <span>"Build Your First AI Project in 60 Minutes" Campaign Simulator</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Target: 500 Students | 7-Day Sprint | Budget: ₹2,000 | Prototype Mode
            </div>
          </footer>
        </main>
      </div>

      {/* Global Add Registration Modal */}
      <AddRegistrationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {/* Strategic Rationale & Philosophy Modal */}
      <StrategicRationaleModal
        isOpen={isRationaleOpen}
        onClose={() => setIsRationaleOpen(false)}
      />

      {/* Global Notification Toast */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <CampaignProvider>
      <MainLayout />
    </CampaignProvider>
  );
}
