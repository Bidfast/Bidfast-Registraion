import React from 'react';
import { Zap, CheckCircle2, ArrowRight, Layers, ShieldCheck, Cpu } from 'lucide-react';

export const LogoIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 240 60" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    aria-label="Bidfast Logo"
  >
    {/* Text: BIDFAST */}
    <text 
      x="0" 
      y="38" 
      fill="currentColor" 
      fontFamily="Inter, sans-serif" 
      fontWeight="900" 
      fontSize="42" 
      fontStyle="italic"
      letterSpacing="-1"
    >
      BIDFAST
    </text>
    {/* Text: .ca */}
    <text 
      x="178" 
      y="38" 
      fill="currentColor" 
      fontFamily="Inter, sans-serif" 
      fontWeight="700" 
      fontSize="18" 
      className="text-flash-400"
    >
      .ca
    </text>
    {/* Lightning Bolt Underline */}
    <path 
      d="M10 50 L120 45 L110 55 L200 48" 
      stroke="#facc15" 
      strokeWidth="4" 
      strokeLinecap="square"
      className="drop-shadow-lg"
    />
    <path 
      d="M90 45 L105 35 L100 45" 
      fill="#facc15" 
    />
  </svg>
);

export const CheckIcon = ({ className }: { className?: string }) => (
  <CheckCircle2 className={className} />
);

export const ArrowIcon = ({ className }: { className?: string }) => (
  <ArrowRight className={className} />
);

export const LayersIcon = ({ className }: { className?: string }) => (
  <Layers className={className} />
);

export const ShieldIcon = ({ className }: { className?: string }) => (
  <ShieldCheck className={className} />
);

export const CpuIcon = ({ className }: { className?: string }) => (
  <Cpu className={className} />
);