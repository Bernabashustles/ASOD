"use client";

import React from "react";
import OptionCard from "../OptionCard";
import { Users, TrendingUp, Building, ShieldCheck, Sparkles } from "lucide-react";

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
    chips: ["Lightweight", "Quick setup", "Low cost"],
    theme: "emerald",
  },
  {
    id: "small",
    title: "Small team",
    description: "2-10 employees",
    icon: TrendingUp,
    metrics: "2-10 people",
    chips: ["Collaboration", "Multi-user", "Automation"],
    theme: "cyan",
  },
  {
    id: "medium",
    title: "Growing business",
    description: "11-50 employees",
    icon: Building,
    metrics: "11-50 people",
    chips: ["Workflows", "Inventory", "Analytics"],
    theme: "purple",
  },
  {
    id: "large",
    title: "Established company",
    description: "50+ employees",
    icon: Building,
    metrics: "50+ people",
    chips: ["SSO", "Permissions", "APIs"],
    theme: "indigo",
  }
] as const;

type SizeId = typeof businessSizes[number]["id"];

const BusinessSizeStep: React.FC<BusinessSizeStepProps> = ({
  businessSize,
  setBusinessSize,
}) => {
  const selectedSize = businessSizes.find(size => size.id === businessSize);

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          Team details
        </div>
        <h1 className="text-xl font-semibold text-white">
          What's the size of your business?
        </h1>
        <p className="text-sm text-zinc-400">
          This helps us recommend the right features and support level
        </p>
      </div>

      {/* Business Size Selection */}
      <div className="space-y-4">
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
              gradientTheme={size.theme as any}
              variant="radio"
              size="lg"
              className="min-h-[120px]"
            >
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 bg-white/10 rounded text-xs text-zinc-300 border border-white/20">
                  {size.metrics}
                </span>
                {size.chips.map((chip) => (
                  <span key={chip} className="px-2 py-0.5 bg-white/10 rounded text-[10px] text-white/80 border border-white/20">
                    {chip}
                  </span>
                ))}
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
                <h4 className="font-medium text-white text-sm flex items-center gap-2">
                  {selectedSize.title}
                  <span className="inline-flex items-center gap-1 text-emerald-300 text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Tailored recommendations enabled
                  </span>
                </h4>
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