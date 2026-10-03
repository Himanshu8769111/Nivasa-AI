import React from 'react';
import { LivingOSProvider, useLivingOS } from './context/LivingOSContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DemoScenarioDrawer } from './components/DemoScenarioDrawer';

import { HomeView } from './views/HomeView';
import { LivingTwinView } from './views/LivingTwinView';
import { AICommandView } from './views/AICommandView';
import { ScannerView } from './views/ScannerView';
import { SimulatorView } from './views/SimulatorView';
import { AutomationsView } from './views/AutomationsView';
import { InsightsView } from './views/InsightsView';
import { DeviceCenterView } from './views/DeviceCenterView';
import { PrivacySettingsView } from './views/PrivacySettingsView';

const AppContent: React.FC = () => {
  const { activeTab } = useLivingOS();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView />;
      case 'twin':
        return <LivingTwinView />;
      case 'ai':
        return <AICommandView />;
      case 'scanner':
        return <ScannerView />;
      case 'simulator':
        return <SimulatorView />;
      case 'automations':
        return <AutomationsView />;
      case 'insights':
        return <InsightsView />;
      case 'devices':
        return <DeviceCenterView />;
      case 'privacy':
        return <PrivacySettingsView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      {/* Top Desktop & Responsive Website Navbar */}
      <Header />

      {/* Main Website Canvas */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 lg:pb-8">
        {renderActiveView()}
      </main>

      {/* Pitch Demo Scenarios Drawer */}
      <DemoScenarioDrawer />

      {/* Mobile Only Bottom Bar */}
      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <LivingOSProvider>
      <AppContent />
    </LivingOSProvider>
  );
}
