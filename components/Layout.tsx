
import React from 'react';
import { LogoIcon, HomeIcon, ProjectIcon, UploadIcon, HelpIcon, BellIcon, SearchIcon, SettingsIcon } from './ui/Icons';
import { ViewState } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate }) => {
  const navItems = [
    { id: 'DASHBOARD' as ViewState, label: 'Dashboard', icon: <HomeIcon className="w-5 h-5" /> },
    { id: 'PROJECTS' as ViewState, label: 'Projects', icon: <ProjectIcon className="w-5 h-5" /> },
    { id: 'UPLOAD' as ViewState, label: 'Upload', icon: <UploadIcon className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-navy-950 text-white overflow-hidden font-sans">
      <div className="bg-noise z-0"></div>

      {/* Sidebar */}
      <aside className="w-64 bg-navy-900/50 border-r border-white/5 flex flex-col z-10 backdrop-blur-md relative shadow-2xl">
        <div className="p-8 pb-10">
          <LogoIcon className="h-8 w-auto text-white" />
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200
                ${currentView === item.id || (currentView === 'PROJECT_DETAIL' && item.id === 'DASHBOARD')
                  ? 'bg-white/5 text-flash-400 border-l-2 border-flash-400 shadow-[inset_10px_0_20px_-10px_rgba(250,204,21,0.1)]' 
                  : 'text-white/40 hover:text-white hover:bg-white/5 border-l-2 border-transparent'}
              `}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto">
           <button className="w-full flex items-center gap-3 px-4 py-3 text-white/40 hover:text-white text-sm font-medium transition-colors">
              <HelpIcon className="w-5 h-5" />
              Help & Support
           </button>
           <div className="mt-4 pt-4 border-t border-white/5 px-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-flash-400 flex items-center justify-center text-navy-950 font-bold text-xs">
                JS
              </div>
              <div className="text-xs">
                <p className="text-white font-medium">John Smith</p>
                <p className="text-white/40">Estimator</p>
              </div>
              <SettingsIcon className="w-4 h-4 ml-auto text-white/20 hover:text-white cursor-pointer" />
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative z-10 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-navy-950/80 backdrop-blur-sm">
          <div className="flex items-center gap-4 w-96">
            <SearchIcon className="w-4 h-4 text-white/30" />
            <input 
              type="text" 
              placeholder="Search projects, sheets, or symbols..." 
              className="bg-transparent border-none outline-none text-sm text-white placeholder-white/30 w-full"
            />
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-white/40 hover:text-white transition-colors">
              <BellIcon className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-flash-400 rounded-full"></span>
            </button>
            <div className="h-6 w-px bg-white/10"></div>
            <span className="text-xs font-mono text-flash-400/80 px-2 py-1 rounded bg-flash-400/10 border border-flash-400/20">
              BETA v0.9.1
            </span>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-1 overflow-auto p-8 scroll-smooth">
          {children}
        </div>
      </main>
    </div>
  );
};
