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
        <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 shadow-lg p-4">
          {/* Step counter */}
          <div className="absolute top-2 right-3">
            <span className="text-xs text-white/40 font-normal">
              {currentStep}/{steps.length}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="relative mb-5">
            <div className="absolute top-4 left-0 w-full px-4">
              {/* Background track */}
              <div className="h-px w-full bg-white/10 rounded-full" />
              {/* Progress fill */}
              <div 
                className="absolute top-0 left-0 h-px bg-gradient-to-r from-white to-white/80 rounded-full transition-all duration-600 ease-out"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              />
            </div>

            {/* Compact Steps */}
            <div className="relative flex justify-between px-4">
              {steps.map((step, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber === currentStep;
                const isCompleted = stepNumber < currentStep;
                const isClickable = onStepClick && stepNumber <= currentStep;

                return (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <div
                        className={`flex flex-col items-center group transition-all duration-200 ${
                          isClickable ? 'cursor-pointer hover:scale-105' : 'cursor-default'
                        }`}
                        onClick={() => handleStepClick(index)}
                      >
                        {/* Compact Step circle */}
                        <div
                          className={`relative flex items-center justify-center w-8 h-8 rounded-lg border transition-all duration-200 ${
                            isActive
                              ? "bg-white/20 border-white/50"
                              : isCompleted
                              ? "bg-white/30 border-white/60"
                              : "bg-black/20 border-white/10 hover:bg-black/30 hover:border-white/20"
                          }`}
                        >
                          <step.icon className={`w-4 h-4 transition-colors duration-300 ${
                            isActive
                              ? "text-white"
                              : isCompleted
                              ? "text-white"
                              : "text-white/60 group-hover:text-white/80"
                          }`} />
                          
                          {/* Completion indicator */}
                          {isCompleted && (
                            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-white rounded-full flex items-center justify-center">
                              <CheckCircle2 className="w-2 h-2 text-black" />
                            </div>
                          )}
                        </div>

                        {/* Compact labels */}
                        <div className="mt-2 text-center">
                          <div className={`text-xs font-medium transition-colors duration-300 ${
                            isActive 
                              ? "text-white" 
                              : isCompleted 
                              ? "text-white" 
                              : "text-white/70 group-hover:text-white/90"
                          }`}>
                            {step.title}
                          </div>
                          <div className="text-[10px] text-white/40 mt-0.5 max-w-[60px] mx-auto leading-tight">
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