
import React, { useState } from 'react';
import { 
  ChevronLeftIcon, 
  LayersIcon, 
  SettingsIcon, 
  MaximizeIcon, 
  PenIcon, 
  RulerIcon, 
  SelectIcon, 
  UndoIcon, 
  SaveIcon,
  SearchIcon,
  CheckIcon,
  AlertIcon,
  MenuIcon
} from '../ui/Icons';

interface SheetReviewProps {
  onBack: () => void;
}

export const SheetReview: React.FC<SheetReviewProps> = ({ onBack }) => {
  const [activeTool, setActiveTool] = useState('select');
  const [scale, setScale] = useState(100);

  // Mock data for symbols list
  const symbols = [
    { id: 1, name: 'Duplex Receptacle', count: 42, color: '#facc15' },
    { id: 2, name: 'Data Outlet', count: 12, color: '#3b82f6' },
    { id: 3, name: 'Switch 1P', count: 28, color: '#ef4444' },
    { id: 4, name: 'Recessed Light', count: 85, color: '#10b981' },
  ];

  return (
    <div className="flex flex-col h-full -m-8 bg-[#0a0f1e]">
      
      {/* Review Header */}
      <div className="h-14 border-b border-white/10 flex items-center justify-between px-4 bg-navy-950 shadow-md z-20">
        <div className="flex items-center gap-4">
           <button onClick={onBack} className="p-2 hover:bg-white/5 rounded text-white/60 hover:text-white">
             <ChevronLeftIcon className="w-5 h-5" />
           </button>
           <div className="h-8 w-px bg-white/10"></div>
           <div>
             <h2 className="text-sm font-bold text-white">E-101: Power & Systems Layout</h2>
             <p className="text-[10px] text-white/40 font-mono">SHEET 4 OF 12 • SCALE 1/8" = 1'-0"</p>
           </div>
        </div>

        <div className="flex items-center gap-2">
           <div className="flex items-center gap-2 mr-4 bg-navy-900 border border-white/10 rounded px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-flash-400 animate-pulse"></span>
              <span className="text-xs font-mono text-white/60">AUTOSAVED</span>
           </div>
           <button className="px-4 py-2 bg-white text-navy-950 text-xs font-bold rounded hover:bg-flash-400 transition-colors">
             APPROVE SHEET
           </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Toolbar */}
        <div className="w-14 bg-navy-900 border-r border-white/10 flex flex-col items-center py-4 gap-4 z-10 shadow-[4px_0_20px_rgba(0,0,0,0.2)]">
           {[
             { id: 'select', icon: <SelectIcon className="w-5 h-5" />, label: 'Select' },
             { id: 'count', icon: <PenIcon className="w-5 h-5" />, label: 'Count' },
             { id: 'measure', icon: <RulerIcon className="w-5 h-5" />, label: 'Measure' },
           ].map(tool => (
             <button
               key={tool.id}
               onClick={() => setActiveTool(tool.id)}
               className={`
                 w-10 h-10 rounded flex items-center justify-center transition-all duration-200
                 ${activeTool === tool.id 
                   ? 'bg-flash-400 text-navy-950 shadow-[0_0_15px_rgba(250,204,21,0.3)]' 
                   : 'text-white/40 hover:text-white hover:bg-white/5'}
               `}
               title={tool.label}
             >
               {tool.icon}
             </button>
           ))}

           <div className="w-8 h-px bg-white/10 my-2"></div>

           <button className="w-10 h-10 rounded flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5">
             <UndoIcon className="w-5 h-5" />
           </button>
        </div>

        {/* Canvas Area (Mock) */}
        <div className="flex-1 bg-[#1a1f2e] relative overflow-hidden flex items-center justify-center group">
           {/* Grid Pattern */}
           <div 
             className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{
               backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)',
               backgroundSize: '20px 20px'
             }}
           ></div>

           {/* Placeholder for PDF Canvas */}
           <div className="relative w-[80%] h-[90%] bg-white shadow-2xl transition-transform duration-300">
              <div className="absolute inset-0 flex items-center justify-center text-navy-950/20">
                 <div className="text-center">
                    <p className="text-4xl font-black mb-4">PDF RENDERER</p>
                    <p className="font-mono">Interactive Canvas Mockup</p>
                 </div>
              </div>
              
              {/* Mock Detections */}
              <div className="absolute top-[20%] left-[30%] w-6 h-6 border-2 border-flash-400 rounded-sm bg-flash-400/20 shadow-lg cursor-pointer hover:scale-125 transition-transform flex items-center justify-center">
                <span className="text-[8px] font-bold text-navy-950 bg-flash-400 px-1 rounded-sm absolute -top-4">S</span>
              </div>
              <div className="absolute top-[25%] left-[35%] w-6 h-6 border-2 border-flash-400 rounded-sm bg-flash-400/20 shadow-lg"></div>
              <div className="absolute top-[20%] left-[45%] w-6 h-6 border-2 border-flash-400 rounded-sm bg-flash-400/20 shadow-lg"></div>

              {/* Selection Box Mock */}
              <div className="absolute top-[50%] left-[50%] w-32 h-24 border border-blue-500 bg-blue-500/10 border-dashed"></div>
           </div>

           {/* Floating Controls */}
           <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-navy-900/90 backdrop-blur border border-white/10 rounded-full px-4 py-2 flex items-center gap-4 shadow-xl">
              <button onClick={() => setScale(s => s - 10)} className="text-white hover:text-flash-400">-</button>
              <span className="text-xs font-mono text-white w-12 text-center">{scale}%</span>
              <button onClick={() => setScale(s => s + 10)} className="text-white hover:text-flash-400">+</button>
           </div>
        </div>

        {/* Right Sidebar (Layers & Symbols) */}
        <div className="w-80 bg-navy-900 border-l border-white/10 flex flex-col z-10 shadow-[-4px_0_20px_rgba(0,0,0,0.2)]">
           {/* Tabs */}
           <div className="flex border-b border-white/5">
             <button className="flex-1 py-3 text-xs font-bold text-white border-b-2 border-flash-400 bg-white/5">SYMBOLS</button>
             <button className="flex-1 py-3 text-xs font-bold text-white/40 hover:text-white transition-colors">LAYERS</button>
           </div>

           {/* List */}
           <div className="flex-1 overflow-auto p-4 space-y-3">
              <div className="relative mb-6">
                <SearchIcon className="absolute left-3 top-2.5 w-4 h-4 text-white/30" />
                <input 
                  type="text" 
                  placeholder="Filter symbols..." 
                  className="w-full bg-navy-950 border border-white/10 rounded py-2 pl-9 pr-4 text-xs text-white placeholder-white/30 focus:border-flash-400 outline-none transition-colors"
                />
              </div>

              {symbols.map(symbol => (
                <div key={symbol.id} className="group flex items-center justify-between p-3 rounded border border-transparent hover:bg-white/5 hover:border-white/5 cursor-pointer transition-all">
                   <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: symbol.color }}></div>
                      <span className="text-sm text-white/90">{symbol.name}</span>
                   </div>
                   <span className="text-xs font-mono text-white/40 bg-white/5 px-2 py-0.5 rounded group-hover:bg-white/10 group-hover:text-white transition-colors">
                     {symbol.count}
                   </span>
                </div>
              ))}

              <div className="pt-4 mt-4 border-t border-white/10">
                 <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-3">Suggestions</h4>
                 <div className="p-3 rounded border border-flash-400/20 bg-flash-400/5">
                    <div className="flex justify-between items-start mb-2">
                       <span className="text-sm text-flash-400 font-bold">New Symbol Detected</span>
                       <span className="text-[10px] bg-flash-400 text-navy-950 px-1 rounded font-bold">94%</span>
                    </div>
                    <p className="text-xs text-white/60 mb-3">Found 18 instances similar to "Data Outlet"</p>
                    <div className="flex gap-2">
                       <button className="flex-1 py-1.5 bg-flash-400 text-navy-950 text-xs font-bold rounded hover:bg-white">Review</button>
                       <button className="flex-1 py-1.5 bg-transparent border border-white/20 text-white text-xs font-bold rounded hover:bg-white/10">Dismiss</button>
                    </div>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};
