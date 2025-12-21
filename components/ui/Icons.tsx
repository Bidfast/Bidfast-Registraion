
import React from 'react';
import { 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Home, 
  FileText, 
  HelpCircle, 
  UploadCloud, 
  Search, 
  Bell, 
  ChevronRight, 
  ChevronLeft,
  Settings,
  MoreVertical,
  Maximize2,
  PenTool,
  Ruler,
  MousePointer2,
  Undo2,
  Save,
  Download,
  AlertTriangle,
  Play
} from 'lucide-react';

export const LogoIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 240 60" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    aria-label="Bidfast Logo"
  >
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

export const CheckIcon = ({ className }: { className?: string }) => <CheckCircle2 className={className} />;
export const ArrowIcon = ({ className }: { className?: string }) => <ArrowRight className={className} />;
export const LayersIcon = ({ className }: { className?: string }) => <Layers className={className} />;
export const ShieldIcon = ({ className }: { className?: string }) => <ShieldCheck className={className} />;
export const CpuIcon = ({ className }: { className?: string }) => <Cpu className={className} />;
export const HomeIcon = ({ className }: { className?: string }) => <Home className={className} />;
export const ProjectIcon = ({ className }: { className?: string }) => <FileText className={className} />;
export const HelpIcon = ({ className }: { className?: string }) => <HelpCircle className={className} />;
export const UploadIcon = ({ className }: { className?: string }) => <UploadCloud className={className} />;
export const SearchIcon = ({ className }: { className?: string }) => <Search className={className} />;
export const BellIcon = ({ className }: { className?: string }) => <Bell className={className} />;
export const ChevronRightIcon = ({ className }: { className?: string }) => <ChevronRight className={className} />;
export const ChevronLeftIcon = ({ className }: { className?: string }) => <ChevronLeft className={className} />;
export const SettingsIcon = ({ className }: { className?: string }) => <Settings className={className} />;
export const MenuIcon = ({ className }: { className?: string }) => <MoreVertical className={className} />;
export const MaximizeIcon = ({ className }: { className?: string }) => <Maximize2 className={className} />;
export const PenIcon = ({ className }: { className?: string }) => <PenTool className={className} />;
export const RulerIcon = ({ className }: { className?: string }) => <Ruler className={className} />;
export const SelectIcon = ({ className }: { className?: string }) => <MousePointer2 className={className} />;
export const UndoIcon = ({ className }: { className?: string }) => <Undo2 className={className} />;
export const SaveIcon = ({ className }: { className?: string }) => <Save className={className} />;
export const DownloadIcon = ({ className }: { className?: string }) => <Download className={className} />;
export const AlertIcon = ({ className }: { className?: string }) => <AlertTriangle className={className} />;
export const PlayIcon = ({ className }: { className?: string }) => <Play className={className} />;
export const ZapIcon = ({ className }: { className?: string }) => <Zap className={className} />;
