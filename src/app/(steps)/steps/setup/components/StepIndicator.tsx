"use client";

import React from "react";
import { CheckCircle2, LucideIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface Step {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  isTransitioning?: boolean;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  onStepClick,
  isTransitioning = false,
}) => {
  const handleStepClick = (stepIndex: number) => {
    if (onStepClick && !isTransitioning && stepIndex + 1 <= currentStep) {
      onStepClick(stepIndex);
    }
  };

  return (
    <TooltipProvider delayDuration={200}>
      <div className="relative mb-4">
        <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 shadow-lg p-4 overflow-hidden">
          {/* Step counter */}
          <div className="absolute top-2 right-3">
            <span className="text-xs text-white/40 font-normal">
              {currentStep}/{steps.length}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="relative mb-5">
            {/* Compact Steps with track behind icons */}
            <div className="relative flex items-center justify-between px-6">
              {/* Track behind icons (pure white, thin) */}
              <div className="absolute left-6 right-6 h-px bg-white/25 rounded-full pointer-events-none" aria-hidden />
              {/* Progress fill behind icons (pure white with glow) */}
              <div
                className="absolute left-6 h-px bg-white rounded-full transition-all duration-500 ease-out shadow-[0_0_14px_rgba(255,255,255,0.45)]"
                style={{ width: `calc(${((currentStep - 1) / (steps.length - 1)) * 100}% * (100% - 3rem) / 100)` }}
                aria-hidden
              />
              {steps.map((step, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber === currentStep;
                const isCompleted = stepNumber < currentStep;
                const isClickable = onStepClick && stepNumber <= currentStep;

                return (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                       <div
                         className={`relative flex flex-col items-center group transition-all duration-200 ${
                          isClickable ? 'cursor-pointer hover:scale-105' : 'cursor-default'
                        }`}
                        onClick={() => handleStepClick(index)}
                      >
                         {/* Line eraser under each icon to create a gap in the track */}
                         <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 w-14 h-3 bg-black/40 rounded-full z-[5]" aria-hidden />
                        {/* Step node */}
                        <div
                          className={`relative z-10 flex items-center justify-center w-11 h-11 rounded-full border transition-all duration-200 shadow-sm ${
                            isActive
                              ? "bg-white/20 border-white/50 ring-2 ring-white/30"
                              : isCompleted
                              ? "bg-white/30 border-white/60"
                              : "bg-black/20 border-white/10 hover:bg-black/30 hover:border-white/20"
                          }`}
                        >
                          <step.icon className={`w-5 h-5 transition-colors duration-300 ${
                            isActive
                              ? "text-white"
                              : isCompleted
                              ? "text-white"
                              : "text-white/60 group-hover:text-white/80"
                          }`} />
                          
                          {/* Completion indicator */}
                          {isCompleted && (
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow ring-1 ring-black/10">
                              <CheckCircle2 className="w-3 h-3 text-black" />
                            </div>
                          )}
                        </div>

                        {/* Compact labels */}
                        <div className="mt-2 text-center min-w-[80px]">
                          <div className={`text-[12px] font-medium transition-colors duration-300 ${
                            isActive 
                              ? "text-white" 
                              : isCompleted 
                              ? "text-white" 
                              : "text-white/70 group-hover:text-white/90"
                          }`}>
                            {step.title}
                          </div>
                          <div className="text-[10px] text-white/40 mt-0.5 max-w-[90px] mx-auto leading-tight">
                            {step.description}
                          </div>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent
                      className="bg-black/90 backdrop-blur-xl border-white/10 px-3 py-1.5 text-xs text-white shadow-xl rounded-lg"
                      side="bottom"
                    >
                      <div className="flex items-center gap-2">
                        <step.icon className="w-3 h-3" />
                        <span>{step.description}</span>
                        {isCompleted && <span className="text-white">✓</span>}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </div>

          {/* Progress percentage */}
          <div className="text-center">
            <div className="text-xs text-white/60">
              {Math.round(((currentStep - 1) / (steps.length - 1)) * 100)}% Complete
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default StepIndicator; 