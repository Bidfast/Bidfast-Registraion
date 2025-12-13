
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, hoverEffect = false }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        relative bg-navy-900 border border-white/5 
        shadow-[0_4px_20px_-1px_rgba(0,0,0,0.3)] 
        backdrop-blur-sm
        ${hoverEffect ? 'hover:-translate-y-1 hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.6)] hover:border-flash-400/30 cursor-pointer' : ''}
        transition-all duration-300 ease-out
        ${className}
      `}
    >
      {/* Subtle top highlight for depth */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50 pointer-events-none" />
      
      {children}
    </div>
  );
};
