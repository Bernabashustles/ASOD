"use client";

import React from "react";
import OptionCard from "../OptionCard";
import { 
  ShoppingBag, 
  Store, 
  Smartphone,
  Facebook,
  Instagram,
  Sparkles,
  Globe
} from "lucide-react";

export interface PlatformsStepProps {
  selectedPlatforms: string[];
  setSelectedPlatforms: (platforms: string[]) => void;
}

const platforms = [
  {
    id: "none",
    title: "I don't sell anywhere yet",
    description: "Starting fresh with Axova",
    icon: ShoppingBag,
    theme: "emerald",
  },
  {
    id: "shopify",
    title: "Shopify",
    description: "E-commerce platform",
    icon: Store,
    theme: "cyan",
  },
  {
    id: "woocommerce",
    title: "WooCommerce",
    description: "WordPress e-commerce",
    icon: Store,
    theme: "cyan",
  },
  {
    id: "etsy",
    title: "Etsy",
    description: "Handmade & vintage marketplace",
    icon: ShoppingBag,
    theme: "purple",
  },
  {
    id: "amazon",
    title: "Amazon",
    description: "Global marketplace",
    icon: ShoppingBag,
    theme: "purple",
  },
  {
    id: "facebook",
    title: "Facebook Shop",
    description: "Social commerce",
    icon: Facebook,
    theme: "blue",
  },
  {
    id: "instagram",
    title: "Instagram Shop",
    description: "Visual commerce",
    icon: Instagram,
    theme: "blue",
  },
  {
    id: "mobile",
    title: "Mobile App",
    description: "Custom mobile application",
    icon: Smartphone,
    theme: "amber",
  },
  {
    id: "other",
    title: "Other",
    description: "Different platform",
    icon: Store,
    theme: "indigo",
  }
] as const;

type PlatformId = typeof platforms[number]["id"];

const PlatformsStep: React.FC<PlatformsStepProps> = ({
  selectedPlatforms,
  setSelectedPlatforms,
}) => {
  const togglePlatform = (platformId: string) => {
    if (platformId === "none") {
      setSelectedPlatforms(["none"]);
    } else {
      const newSelection = selectedPlatforms.filter(id => id !== "none");
      if (selectedPlatforms.includes(platformId)) {
        const filtered = newSelection.filter(id => id !== platformId);
        setSelectedPlatforms(filtered.length > 0 ? filtered : ["none"]);
      } else {
        setSelectedPlatforms([...newSelection, platformId]);
      }
    }
  };

  const count = selectedPlatforms.includes("none") ? 0 : selectedPlatforms.length;

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          Sales channels
        </div>
        <h1 className="text-xl font-semibold text-white">
          Where do you currently sell?
        </h1>
        <p className="text-sm text-zinc-400">
          Select all platforms you're currently using
        </p>
      </div>

      {/* Platform Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-white/20 rounded-lg">
            <Store className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-medium text-white">Current Platforms</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {platforms.map((platform) => (
            <OptionCard
              key={platform.id}
              id={platform.id}
              title={platform.title}
              description={platform.description}
              icon={platform.icon}
              isSelected={selectedPlatforms.includes(platform.id)}
              onClick={togglePlatform}
              gradientTheme={platform.theme as any}
              variant="multiselect"
              size="sm"
            >
              {platform.id !== 'none' && (
                <div className="mt-2 text-[10px] text-white/80 flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20">Channel</span>
                  <span className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20">Sync</span>
                </div>
              )}
            </OptionCard>
          ))}
        </div>

        {/* Selection Summary */}
        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">
              Selected Platforms ({count})
            </span>
          </div>
          {count === 0 ? (
            <p className="text-xs text-zinc-400">No platforms selected. You can start anywhere.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {selectedPlatforms.filter(p => p !== 'none').map((platformId) => {
                const platform = platforms.find(p => p.id === platformId);
                return (
                  <span
                    key={platformId}
                    className="px-2 py-1 bg-white/20 text-white rounded text-xs border border-white/30"
                  >
                    {platform?.title}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlatformsStep; 