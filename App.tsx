
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { ProjectDashboard } from './components/views/ProjectDashboard';
import { SheetReview } from './components/views/SheetReview';
import { Card } from './components/ui/Card';
import { Project, ViewState } from './types';
import { PlusIcon, FileText, ArrowRight, UploadCloud } from 'lucide-react';

// Mock Data
const MOCK_PROJECT: Project = {
  id: 'p-1',
  name: 'Lakeside Medical Center',
  address: '1200 Lakeview Dr, Vancouver BC',
  sheetCount: 42,
  lastActive: '2 mins ago',
  progress: 35,
  stages: [
    { 
      id: 'preflight', 
      name: 'Preflight Check', 
      status: 'COMPLETED', 
      description: '42 Sheets processed. No rotation issues detected. Layers available.',
      lastUpdated: 'Today, 9:00 AM'
    },
    { 
      id: 'legend', 
      name: 'Legend Parsing', 
      status: 'COMPLETED', 
      description: 'Found 14 unique symbols. 2 required manual merge.',
      lastUpdated: 'Today, 9:15 AM'
    },
    { 
      id: 'legend-review', 
      name: 'Legend Review', 
      status: 'COMPLETED', 
      description: 'All symbols approved by estimator.',
      lastUpdated: 'Today, 9:20 AM'
    },
    { 
      id: 'detection', 
      name: 'AI Detection', 
      status: 'NEEDS_REVIEW', 
      description: 'Scan complete. Found 842 total items. High confidence on 92%. Review suggestions before proceeding.',
      actionLabel: 'Review Detection Results',
      lastUpdated: 'Just now'
    },
    { 
      id: 'sheet-review', 
      name: 'Sheet Review', 
      status: 'PENDING', 
      description: 'Manual takeoff and verification per sheet.',
      actionLabel: 'Start Review'
    },
    { 
      id: 'export', 
      name: 'Export & Handoff', 
      status: 'PENDING', 
      description: 'Generate CSV and Annotated PDF for Bluebeam.',
      actionLabel: 'Create Export'
    }
  ]
};

const DashboardHome = ({ onOpenProject }: { onOpenProject: (id: string) => void }) => (
  <div className="max-w-7xl mx-auto">
    <div className="flex items-end justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
        <p className="text-white/50">Manage your active takeoffs and estimates.</p>
      </div>
      <button className="bg-flash-400 text-navy-950 font-bold px-6 py-3 rounded flex items-center gap-2 hover:bg-white transition-colors shadow-lg shadow-flash-400/20">
        <PlusIcon className="w-5 h-5" /> New Project
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Active Project Card */}
      <Card hoverEffect onClick={() => onOpenProject('p-1')}>
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
             <div className="w-10 h-10 rounded bg-blue-500/20 flex items-center justify-center text-blue-400">
               <FileText className="w-5 h-5" />
             </div>
             <span className="px-2 py-1 rounded bg-flash-400/10 text-flash-400 text-[10px] font-bold uppercase tracking-wider border border-flash-400/20">
               Active
             </span>
          </div>
          <h3 className="text-xl font-bold text-white mb-1">Lakeside Medical Center</h3>
          <p className="text-white/40 text-sm mb-6">42 Sheets • Last edited 2m ago</p>
          
          <div className="space-y-2">
             <div className="flex justify-between text-xs text-white/60">
               <span>Progress</span>
               <span>35%</span>
             </div>
             <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-flash-400 w-[35%]"></div>
             </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-white/5 bg-white/[0.02] flex items-center justify-between group">
           <span className="text-xs text-white/40">Next: AI Detection Review</span>
           <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-flash-400 transition-colors transform group-hover:translate-x-1" />
        </div>
      </Card>

      {/* Another Project */}
      <Card hoverEffect>
        <div className="p-6 opacity-60">
           <div className="flex items-start justify-between mb-4">
             <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center text-white/40">
               <FileText className="w-5 h-5" />
             </div>
             <span className="px-2 py-1 rounded bg-white/5 text-white/30 text-[10px] font-bold uppercase tracking-wider border border-white/10">
               Completed
             </span>
          </div>
          <h3 className="text-xl font-bold text-white mb-1">Highrise Tower A</h3>
          <p className="text-white/40 text-sm mb-6">128 Sheets • 2 days ago</p>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
             <div className="h-full bg-green-500 w-full"></div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-white/5 bg-white/[0.02] flex items-center justify-between text-white/30">
           <span className="text-xs">Exported CSV, PDF</span>
        </div>
      </Card>
      
      {/* Upload New Card */}
      <div className="border border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center p-6 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/20 transition-all cursor-pointer group h-full min-h-[240px]">
         <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <UploadCloud className="w-8 h-8 text-white/30 group-hover:text-flash-400 transition-colors" />
         </div>
         <p className="text-white font-bold mb-1">Upload Plan Set</p>
         <p className="text-white/40 text-sm">Drag PDF here or click to browse</p>
      </div>

    </div>
  </div>
);

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('DASHBOARD');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const handleOpenProject = (id: string) => {
    setSelectedProjectId(id);
    setCurrentView('PROJECT_DETAIL');
  };

  const handleBackToDashboard = () => {
    setSelectedProjectId(null);
    setCurrentView('DASHBOARD');
  };

  const handleOpenStage = (stageId: string) => {
    // For demo purposes, any stage click goes to sheet review if it's not complete
    setCurrentView('SHEET_REVIEW');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'DASHBOARD':
        return <DashboardHome onOpenProject={handleOpenProject} />;
      case 'PROJECT_DETAIL':
        return selectedProjectId ? (
          <ProjectDashboard 
            project={MOCK_PROJECT} 
            onBack={handleBackToDashboard} 
            onOpenStage={handleOpenStage} 
          />
        ) : null;
      case 'SHEET_REVIEW':
        return <SheetReview onBack={() => setCurrentView('PROJECT_DETAIL')} />;
      case 'UPLOAD':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <UploadCloud className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Upload Area</h2>
              <p className="text-white/50">Drag and drop functionality coming in next update.</p>
            </div>
          </div>
        );
      default:
        return <DashboardHome onOpenProject={handleOpenProject} />;
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView}>
      {renderContent()}
    </Layout>
  );
}
