import React, { useState } from 'react';
import { ToastProvider } from './components/common/ToastContext';
import { MainLayout } from './layouts/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { QueryStudio } from './pages/QueryStudio';
import { DatabaseExplorer } from './pages/DatabaseExplorer';
import { MemoryInspector } from './pages/MemoryInspector';
import { LearningHistory } from './pages/LearningHistory';
import { ComparisonView } from './pages/ComparisonView';
import { Settings } from './pages/Settings';
import { PageView } from './types';
import { motion, AnimatePresence } from 'framer-motion';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('dashboard');
  const [selectedStudioQuery, setSelectedStudioQuery] = useState<string>(
    'Calculate net revenue from premium customers.'
  );

  const handleSelectQueryForStudio = (q: string) => {
    setSelectedStudioQuery(q);
    setCurrentPage('query-studio');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard
            onNavigate={setCurrentPage}
            onSelectQueryForStudio={handleSelectQueryForStudio}
          />
        );
      case 'query-studio':
        return <QueryStudio initialQuery={selectedStudioQuery} />;
      case 'database-explorer':
        return <DatabaseExplorer />;
      case 'memory-inspector':
        return <MemoryInspector />;
      case 'learning-history':
        return <LearningHistory />;
      case 'comparison-view':
        return <ComparisonView />;
      case 'settings':
        return <Settings />;
      default:
        return (
          <Dashboard
            onNavigate={setCurrentPage}
            onSelectQueryForStudio={handleSelectQueryForStudio}
          />
        );
    }
  };

  return (
    <ToastProvider>
      <MainLayout currentPage={currentPage} onNavigate={setCurrentPage}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </MainLayout>
    </ToastProvider>
  );
}

export default App;
