"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

export interface PlanStepProps {
  selectedPlan: string;
  setSelectedPlan: (plan: string) => void;
}

// Removed plans - simplified completion step

const PlanStep: React.FC<PlanStepProps> = ({
  selectedPlan,
  setSelectedPlan,
}) => {
  // Auto-select a default plan
  React.useEffect(() => {
    if (!selectedPlan) {
      setSelectedPlan('axova');
    }
  }, [selectedPlan, setSelectedPlan]);

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8">
        {/* Clean Success Icon */}
        <div className="w-12 h-12 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6 text-white" />
        </div>
        
        {/* Clean Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-white mb-2">Setup Complete</h1>
          <p className="text-zinc-400">
            Your store is ready. We've configured everything with our recommended settings.
          </p>
        </div>
        
        {/* Clean Trial Info */}
        <div className="bg-white/5 border border-white/20 rounded-lg p-4 text-center">
          <p className="text-white font-medium mb-1">14-Day Free Trial</p>
          <p className="text-sm text-zinc-400">
            Full access • No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlanStep; 