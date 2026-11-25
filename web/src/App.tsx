import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MetricsGrid } from './components/MetricsGrid';
import { ArchitectureSection } from './components/ArchitectureSection';
import { PipelineSection } from './components/PipelineSection';
import { MonitoringPanel } from './components/MonitoringPanel';
import { SecuritySection } from './components/SecuritySection';
import { MilestoneTimeline } from './components/MilestoneTimeline';
import { VerificationTable } from './components/VerificationTable';
import { DocumentationGrid } from './components/DocumentationGrid';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { QuickDemoModal } from './components/QuickDemoModal';

export const App: React.FC = () => {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="app-layout">
        <Navbar onOpenDemo={() => setDemoModalOpen(true)} />
        <main id="main-content">
          <HeroSection onOpenDemo={() => setDemoModalOpen(true)} />
          <MetricsGrid />
          <ArchitectureSection />
          <PipelineSection />
          <MonitoringPanel />
          <SecuritySection />
          <MilestoneTimeline />
          <VerificationTable />
          <DocumentationGrid />
        </main>
        <Footer />
        <BackToTop />
        <QuickDemoModal
          isOpen={demoModalOpen}
          onClose={() => setDemoModalOpen(false)}
        />
      </div>
    </ThemeProvider>
  );
};

export default App;
