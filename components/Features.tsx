import React from 'react';
import { LayersIcon, CpuIcon, ShieldIcon } from './ui/Icons';

export const Features: React.FC = () => {
  const features = [
    {
      id: "01",
      icon: <CpuIcon className="w-5 h-5" />,
      title: 'AI Symbol Detection',
      desc: 'Engine identifies outlets, switches, and fixtures automatically.'
    },
    {
      id: "02",
      icon: <LayersIcon className="w-5 h-5" />,
      title: 'Material Lists',
      desc: 'Auto-generation of complete material lists from detections.'
    },
    {
      id: "03",
      icon: <ShieldIcon className="w-5 h-5" />,
      title: 'Dynamic Pricing',
      desc: 'Real-time market pricing integration.'
    }
  ];

  return (
    <div className="space-y-4">
      {features.map((feature, idx) => (
        <div 
          key={idx} 
          className="group flex items-start gap-6 p-4 border border-transparent hover:border-white/10 hover:bg-white/5 transition-all duration-300"
        >
          <div className="font-mono text-2xl text-white/20 font-light group-hover:text-flash-400 transition-colors">
            {feature.id}
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              {feature.title}
            </h4>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              {feature.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};