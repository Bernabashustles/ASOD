"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

export interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  isNextDisabled?: boolean;
  isLoading?: boolean;
  onNext: () => void;
  onBack: () => void;
  nextLabel?: string;
  backLabel?: string;
  isTransitioning?: boolean;
  showStepInfo?: boolean;
  onFinish?: () => void;
}

const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  totalSteps,
  isNextDisabled = false,
  isLoading = false,
  onNext,
  onBack,
  nextLabel,
  backLabel = "Back",
  isTransitioning = false,
  showStepInfo = true,
  onFinish,
}) => {
  const isLastStep = currentStep === totalSteps;
  const finalNextLabel = nextLabel || (isLastStep ? "Finish Setup" : "Continue");

  const handleNext = () => {
    if (isLastStep && onFinish) {
      onFinish();
    } else {
      onNext();
    }
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs text-zinc-400">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{Math.round(progressPercentage)}% complete</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-white to-white/80 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={currentStep === 1 || isTransitioning}
          className="flex items-center gap-2 bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-4 h-4" />
          {backLabel}
        </Button>

        <Button
          onClick={handleNext}
          disabled={isNextDisabled || isTransitioning}
          className="flex items-center gap-2 bg-gradient-to-r from-white to-white/90 hover:from-white/90 hover:to-white text-black disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              {finalNextLabel}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default StepNavigation; 