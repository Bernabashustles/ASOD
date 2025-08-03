"use client";

import React from "react";
import OptionCard from "../OptionCard";
import { 
  Building2, 
  Store, 
  Sparkles
} from "lucide-react";

export interface BusinessTypeStepProps {
  businessType: string;
  setBusinessType: (type: string) => void;
}

const businessTypes = [
  {
    id: "new",
    title: "Just Starting Out",
    description: "New business ready to launch online",
    icon: Sparkles,
  },
  {
    id: "existing-small", 
    title: "Existing Business",
    description: "Already selling, expanding online",
    icon: Store,
  },
  {
    id: "existing-large",
    title: "Platform Migration",
    description: "Moving from another platform",
    icon: Building2,
  }
];

const BusinessTypeStep: React.FC<BusinessTypeStepProps> = ({
  businessType,
  setBusinessType,
}) => {
  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {/* Compact Header */}
      <div className="text-center mb-6">
        <h1 className="text-xl font-semibold text-white">Business Information</h1>
        <p className="text-sm text-zinc-400 mt-1">Choose what best describes you</p>
      </div>

      {/* Optimized Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-2">
        {businessTypes.map((type) => (
          <OptionCard
            key={type.id}
            id={type.id}
            title={type.title}
            description={type.description}
            icon={type.icon}
            isSelected={businessType === type.id}
            onClick={setBusinessType}
            gradientTheme="green"
            variant="radio"
            size="lg"
            isVertical={true}
            className="min-h-[120px] flex-1"
          />
        ))}
      </div>

      {/* Quick Info */}
      <div className="text-center mt-4">
        <p className="text-xs text-zinc-500">
          This helps us customize your experience
        </p>
      </div>
    </div>
  );
};

export default BusinessTypeStep; 