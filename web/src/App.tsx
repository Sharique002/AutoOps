import React from 'react';
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

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="app-layout">
        <Navbar />
        <main id="main-content">
          <HeroSection />
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
      </div>
    </ThemeProvider>
  );
};

export default App;
