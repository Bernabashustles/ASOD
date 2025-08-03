"use client";

import React, { ReactNode } from "react";
import { CheckCircle2, LucideIcon } from "lucide-react";

export interface OptionCardProps {
  id: string;
  title: string;
  description?: string;
  icon: LucideIcon;
  isSelected?: boolean;
  isDisabled?: boolean;
  onClick: (id: string) => void;
  variant?: 'default' | 'radio' | 'multiselect';
  size?: 'sm' | 'md' | 'lg';
  gradientTheme?: 'indigo' | 'blue' | 'green' | 'purple' | 'amber' | 'cyan' | 'emerald';
  className?: string;
  children?: ReactNode;
  showCheckmark?: boolean;
  isVertical?: boolean;
}

const gradientThemes = {
  indigo: "from-indigo-500/20 via-indigo-400/15 to-indigo-500/10 border-indigo-400/40",
  blue: "from-blue-500/20 via-blue-400/15 to-blue-500/10 border-blue-400/40",
  green: "from-white/30 via-white/25 to-white/20 border-white/60",
  purple: "from-white/30 via-white/25 to-white/20 border-white/60",
  amber: "from-amber-500/20 via-amber-400/15 to-amber-500/10 border-amber-400/40",
  cyan: "from-cyan-500/20 via-cyan-400/15 to-cyan-500/10 border-cyan-400/40",
  emerald: "from-white/30 via-white/25 to-white/20 border-white/60",
};

const sizeClasses = {
  sm: "p-3 gap-2 text-xs",
  md: "p-4 gap-3 text-sm", 
  lg: "p-5 gap-4 text-base",
};

const OptionCard: React.FC<OptionCardProps> = ({
  id,
  title,
  description,
  icon: Icon,
  isSelected = false,
  isDisabled = false,
  onClick,
  variant = 'default',
  size = 'md',
  gradientTheme = 'blue',
  className = '',
  children,
  showCheckmark = true,
  isVertical = false,
}) => {
  const handleClick = () => {
    if (!isDisabled) {
      onClick(id);
    }
  };

  const baseClasses = `
    relative rounded-lg border-2 cursor-pointer transition-all duration-200
    ${sizeClasses[size]}
    ${isSelected 
      ? `bg-gradient-to-br ${gradientThemes[gradientTheme]} shadow-lg shadow-white/10` 
      : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/15'
    }
    ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${isSelected ? 'transform scale-[1.02]' : 'hover:transform hover:scale-[1.01]'}
    ${className}
  `;

  return (
    <div className={baseClasses} onClick={handleClick} style={{ isolation: 'isolate' }}>
      <div className={`flex ${isVertical ? 'flex-col items-center text-center' : 'items-center'}`}>
        {/* Icon */}
        <div className={`p-2 rounded-lg ${isSelected ? 'bg-white/20' : 'bg-white/10'}`}>
          <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-zinc-300'}`} />
        </div>

        {/* Content */}
        <div className={`flex-1 ${isVertical ? 'mt-2' : 'ml-3'}`}>
          <h3 className={`font-semibold ${isSelected ? 'text-white' : 'text-zinc-200'}`}>
            {title}
          </h3>
          {description && (
            <p className={`text-xs ${isSelected ? 'text-zinc-200' : 'text-zinc-400'} mt-1`}>
              {description}
            </p>
          )}
          {children}
        </div>

        {/* Selection Indicator */}
        {isSelected && (variant === 'multiselect' || variant === 'radio') && showCheckmark && (
          <div className="absolute top-2 right-2 z-10 bg-blue-600 rounded-full p-1 shadow-md">
            <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={2.5} />
          </div>
        )}
      </div>
    </div>
  );
};

export default OptionCard; 