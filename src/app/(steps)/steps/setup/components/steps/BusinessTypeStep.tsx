"use client";

import React from "react";
import OptionCard from "../OptionCard";
import { 
  Building2, 
  Store, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Rocket
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
  const chips: Record<string, string[]> = {
    new: ["Guided onboarding", "Starter templates", "Zero-code"],
    "existing-small": ["Import products", "Channel sync", "Growth tips"],
    "existing-large": ["Migration tools", "Dedicated support", "Bulk ops"],
  };

  const themeById: Record<string, "emerald" | "cyan" | "purple"> = {
    new: "emerald",
    "existing-small": "cyan",
    "existing-large": "purple",
  } as const;

  return (
    <div className="space-y-5 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          Personalized setup
        </div>
        <h1 className="mt-2 text-xl font-semibold text-white">Business Information</h1>
        <p className="text-sm text-zinc-400 mt-1">Choose what best describes you</p>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-2">
        {businessTypes.map((type) => {
          const selected = businessType === type.id;
          return (
            <OptionCard
              key={type.id}
              id={type.id}
              title={type.title}
              description={type.description}
              icon={type.icon}
              isSelected={selected}
              onClick={setBusinessType}
              gradientTheme={themeById[type.id] ? (themeById[type.id] as any) : 'green'}
              variant="radio"
              size="lg"
              isVertical={true}
              className="min-h-[140px] flex-1 group"
            >
              <div className="mt-3 flex flex-wrap gap-1.5 justify-center">
                {chips[type.id].map((chip) => (
                  <span
                    key={chip}
                    className={`px-2 py-0.5 rounded-full text-[10px] border ${selected ? 'bg-white/20 text-white border-white/30' : 'bg-white/10 text-white/80 border-white/20'}`}
                  >
                    {chip}
                  </span>
                ))}
              </div>
              {selected && (
                <div className="mt-3 inline-flex items-center gap-2 text-xs text-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5" /> Optimized recommendations enabled
                </div>
              )}
            </OptionCard>
          );
        })}
      </div>

      {/* Footer hint */}
      <div className="text-center mt-1">
        <p className="text-xs text-zinc-500 inline-flex items-center gap-1">
          <Rocket className="w-3.5 h-3.5 text-cyan-300" />
          We’ll tailor the next steps based on your choice
        </p>
      </div>
    </div>
  );
};

export default BusinessTypeStep; 