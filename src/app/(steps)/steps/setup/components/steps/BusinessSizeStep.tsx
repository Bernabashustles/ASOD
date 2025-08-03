"use client";

import React from "react";
import OptionCard from "../OptionCard";
import { Users, TrendingUp, Building } from "lucide-react";

export interface BusinessSizeStepProps {
  businessSize: string;
  setBusinessSize: (size: string) => void;
}

const businessSizes = [
  {
    id: "solo",
    title: "Just me",
    description: "Solo entrepreneur or freelancer",
    icon: Users,
    metrics: "1 person",
  },
  {
    id: "small",
    title: "Small team",
    description: "2-10 employees",
    icon: TrendingUp,
    metrics: "2-10 people",
  },
  {
    id: "medium",
    title: "Growing business",
    description: "11-50 employees",
    icon: Building,
    metrics: "11-50 people",
  },
  {
    id: "large",
    title: "Established company",
    description: "50+ employees",
    icon: Building,
    metrics: "50+ people",
  }
];

const BusinessSizeStep: React.FC<BusinessSizeStepProps> = ({
  businessSize,
  setBusinessSize,
}) => {
  const selectedSize = businessSizes.find(size => size.id === businessSize);

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="text-center space-y-2">
        <h1 className="text-xl font-semibold text-white">
          What's the size of your business?
        </h1>
        <p className="text-sm text-zinc-400">
          This helps us recommend the right features and support level
        </p>
      </div>

      {/* Business Size Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-white/20 rounded-lg">
            <Users className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-medium text-white">Team Size</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {businessSizes.map((size) => (
            <OptionCard
              key={size.id}
              id={size.id}
              title={size.title}
              description={size.description}
              icon={size.icon}
              isSelected={businessSize === size.id}
              onClick={setBusinessSize}
              gradientTheme="green"
              variant="radio"
            >
              <div className="mt-2 px-2 py-1 bg-white/10 rounded text-xs text-zinc-300">
                {size.metrics}
              </div>
            </OptionCard>
          ))}
        </div>

        {/* Selected Size Summary */}
        {selectedSize && (
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <selectedSize.icon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-white text-sm">{selectedSize.title}</h4>
                <p className="text-xs text-zinc-400">{selectedSize.description}</p>
              </div>
              <div className="text-xs text-white font-medium">
                {selectedSize.metrics}
              </div>
            </div>
          </div>
        )}

        {/* Privacy Note */}
        <div className="bg-white/10 border border-white/20 rounded-lg p-3">
          <p className="text-xs text-white">
            This information helps us customize your experience and remains private.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BusinessSizeStep; 