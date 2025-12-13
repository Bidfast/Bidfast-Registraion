
import React from 'react';
import { Project, Stage, StageStatus } from '../../types';
import { Card } from '../ui/Card';
import { 
  CheckIcon, 
  ArrowIcon, 
  AlertIcon, 
  PlayIcon, 
  ChevronLeftIcon
} from '../ui/Icons';

interface ProjectDashboardProps {
  project: Project;
  onBack: () => void;
  onOpenStage: (stageId: string) => void;
}

export const ProjectDashboard: React.FC<ProjectDashboardProps> = ({ project, onBack, onOpenStage }) => {
  
  const getStatusColor = (status: StageStatus) => {
    switch (status) {
      case 'COMPLETED': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'NEEDS_REVIEW': return 'text-flash-400 bg-flash-400/10 border-flash-400/20';
      case 'IN_PROGRESS': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      default: return 'text-white/20 bg-white/5 border-white/10';
    }
  };

  const getStatusIcon = (status: StageStatus) => {
    switch (status) {
      case 'COMPLETED': return <CheckIcon className="w-5 h-5" />;
      case 'NEEDS_REVIEW': return <AlertIcon className="w-5 h-5" />;
      case 'IN_PROGRESS': return <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />;
      case 'READY': return <div className="w-3 h-3 rounded-full bg-current" />;
      default: return <div className="w-3 h-3 rounded-full border border-current" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      
      {/* Header */}
      <div className="mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono text-white/40 hover:text-white mb-4 transition-colors"
        >
          <ChevronLeftIcon className="w-4 h-4" /> BACK TO PROJECTS
        </button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{project.name}</h1>
            <p className="text-white/60 flex items-center gap-4 text-sm">
              <span>{project.address}</span>
              <span className="w-1 h-1 bg-white/20 rounded-full"></span>
              <span>{project.sheetCount} Sheets</span>
              <span className="w-1 h-1 bg-white/20 rounded-full"></span>
              <span>Last active {project.lastActive}</span>
            </p>
          </div>
          <div className="flex gap-3">
             <button className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded hover:bg-white/10 transition-colors text-sm font-medium">
               Project Settings
             </button>
             <button className="px-6 py-2 bg-flash-400 text-navy-950 font-bold rounded shadow-[0_0_15px_rgba(250,204,21,0.4)] hover:shadow-[0_0_25px_rgba(250,204,21,0.6)] hover:bg-flash-400/90 transition-all flex items-center gap-2">
               Resume
               <PlayIcon className="w-4 h-4 fill-current" />
             </button>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-12">
        <div className="flex justify-between text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">
          <span>Project Progress</span>
          <span>{project.progress}%</span>
        </div>
        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-flash-600 to-flash-400 transition-all duration-1000 ease-out" 
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Stage Checklist */}
      <div className="space-y-6 relative">
        {/* Connector Line */}
        <div className="absolute left-[27px] top-8 bottom-8 w-px bg-gradient-to-b from-white/10 via-white/5 to-transparent z-0"></div>

        {project.stages.map((stage, index) => {
          const isNext = stage.status === 'READY' || stage.status === 'NEEDS_REVIEW';
          
          return (
            <div key={stage.id} className="relative z-10 group">
              <div className="flex gap-6">
                
                {/* Status Indicator Column */}
                <div className="pt-6 flex flex-col items-center gap-2">
                   <div className={`
                      w-14 h-14 rounded-full border-2 flex items-center justify-center bg-navy-950 shadow-xl
                      ${getStatusColor(stage.status)}
                   `}>
                     {getStatusIcon(stage.status)}
                   </div>
                </div>

                {/* Card */}
                <Card className={`flex-1 p-6 flex items-center justify-between gap-6 ${stage.status === 'PENDING' ? 'opacity-50 grayscale' : ''}`}>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold text-white">{stage.name}</h3>
                      {stage.status === 'NEEDS_REVIEW' && (
                        <span className="px-2 py-0.5 rounded bg-flash-400/10 border border-flash-400/20 text-flash-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                          Action Required
                        </span>
                      )}
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed max-w-xl">
                      {stage.description}
                    </p>
                    {stage.lastUpdated && (
                      <p className="text-white/20 text-xs mt-3 font-mono">Last updated {stage.lastUpdated}</p>
                    )}
                  </div>

                  {stage.status !== 'PENDING' && (
                    <div className="flex flex-col items-end gap-3 min-w-[140px]">
                       <button 
                         onClick={() => onOpenStage(stage.id)}
                         className={`
                           w-full py-3 px-4 text-sm font-bold flex items-center justify-center gap-2 rounded transition-all
                           ${isNext 
                             ? 'bg-white text-navy-950 hover:bg-flash-400 shadow-lg' 
                             : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'}
                         `}
                       >
                         {stage.actionLabel || 'View Details'}
                         {isNext && <ArrowIcon className="w-4 h-4" />}
                       </button>
                       <button className="text-xs text-white/30 hover:text-white transition-colors">
                         What does this step do?
                       </button>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
