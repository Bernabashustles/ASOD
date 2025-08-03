"use client";

import React from "react";
import OptionCard from "../OptionCard";
import { 
  ShoppingBag, 
  Store, 
  Smartphone,
  Facebook,
  Instagram
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
  },
  {
    id: "shopify",
    title: "Shopify",
    description: "E-commerce platform",
    icon: Store,
  },
  {
    id: "woocommerce",
    title: "WooCommerce",
    description: "WordPress e-commerce",
    icon: Store,
  },
  {
    id: "etsy",
    title: "Etsy",
    description: "Handmade & vintage marketplace",
    icon: ShoppingBag,
  },
  {
    id: "amazon",
    title: "Amazon",
    description: "Global marketplace",
    icon: ShoppingBag,
  },
  {
    id: "facebook",
    title: "Facebook Shop",
    description: "Social commerce",
    icon: Facebook,
  },
  {
    id: "instagram",
    title: "Instagram Shop",
    description: "Visual commerce",
    icon: Instagram,
  },
  {
    id: "mobile",
    title: "Mobile App",
    description: "Custom mobile application",
    icon: Smartphone,
  },
  {
    id: "other",
    title: "Other",
    description: "Different platform",
    icon: Store,
  }
];

const PlatformsStep: React.FC<PlatformsStepProps> = ({
  selectedPlatforms,
  setSelectedPlatforms,
}) => {
  const togglePlatform = (platformId: string) => {
    if (platformId === "none") {
      // If "none" is selected, clear all others
      setSelectedPlatforms(["none"]);
    } else {
      // If any other platform is selected, remove "none" and toggle the platform
      const newSelection = selectedPlatforms.filter(id => id !== "none");
      if (selectedPlatforms.includes(platformId)) {
        const filtered = newSelection.filter(id => id !== platformId);
        setSelectedPlatforms(filtered.length > 0 ? filtered : ["none"]);
      } else {
        setSelectedPlatforms([...newSelection, platformId]);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="text-center space-y-2">
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
              gradientTheme="green"
              variant="multiselect"
              size="sm"
            />
          ))}
        </div>

        {/* Selection Summary */}
        {selectedPlatforms.length > 0 && (
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Store className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">
                Selected Platforms ({selectedPlatforms.length})
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedPlatforms.map((platformId) => {
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
          </div>
        )}
      </div>
    </div>
  );
};

export default PlatformsStep; 