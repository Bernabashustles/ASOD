"use client";

import React, { useState } from "react";
import OptionCard from "../OptionCard";
import FormField from "../FormField";
import { 
  ShoppingBag, 
  Laptop, 
  MapPin, 
  Smartphone,
  Instagram,
  Package,
  Globe
} from "lucide-react";

export interface StoreDetailsStepProps {
  storeName: string;
  setStoreName: (name: string) => void;
  selectedOptions: string[];
  setSelectedOptions: (options: string[]) => void;
  isCheckingAvailability: boolean;
  isAvailable: boolean | null;
}

const sellingOptions = [
  {
    id: "online",
    title: "Online Only",
    description: "Sell exclusively through your website",
    icon: Laptop,
  },
  {
    id: "physical",
    title: "Physical Store",
    description: "Brick-and-mortar retail location",
    icon: MapPin,
  },
  {
    id: "mobile",
    title: "Mobile/Pop-up",
    description: "Food trucks, markets, events",
    icon: Smartphone,
  },
  {
    id: "social",
    title: "Social Media",
    description: "Instagram, Facebook, TikTok",
    icon: Instagram,
  },
  {
    id: "wholesale",
    title: "Wholesale",
    description: "Sell to other businesses",
    icon: Package,
  },
  {
    id: "marketplace",
    title: "Marketplaces",
    description: "Amazon, eBay, Etsy",
    icon: Globe,
  }
];

const StoreDetailsStep: React.FC<StoreDetailsStepProps> = ({
  storeName,
  setStoreName,
  selectedOptions,
  setSelectedOptions,
  isCheckingAvailability,
  isAvailable,
}) => {
  const toggleOption = (optionId: string) => {
    setSelectedOptions(
      selectedOptions.includes(optionId)
        ? selectedOptions.filter(id => id !== optionId)
        : [...selectedOptions, optionId]
    );
  };

  const getValidationStatus = () => {
    if (isCheckingAvailability) return 'checking';
    if (isAvailable === true) return 'valid';
    if (isAvailable === false) return 'invalid';
    return 'idle';
  };

  const getValidationMessage = () => {
    if (isCheckingAvailability) return 'Checking availability...';
    if (isAvailable === true) return 'Perfect! This store name is available';
    if (isAvailable === false) return 'This name is already taken. Try another one.';
    return '';
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="text-center space-y-2">
        <h1 className="text-xl font-semibold text-white">
          Let's set up your store
        </h1>
        <p className="text-sm text-zinc-400">
          Start by giving your store a name and telling us how you plan to sell
        </p>
      </div>

      {/* Store Name Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <ShoppingBag className="w-4 h-4 text-blue-400" />
          </div>
          <h3 className="text-lg font-medium text-white">Store Name</h3>
        </div>

        <FormField
          type="text"
          value={storeName}
          onChange={setStoreName}
          placeholder="Enter your store name"
          validationStatus={getValidationStatus()}
          validationMessage={getValidationMessage()}
          helpText="Choose a memorable name that represents your brand"
          maxLength={50}
          showCharCount
          debounceMs={500}
        />
      </div>

      {/* Selling Options Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Package className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-medium text-white">How do you plan to sell?</h3>
        </div>
        
        <p className="text-sm text-zinc-400 mb-4">
          Select all that apply. You can change this later.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sellingOptions.map((option) => (
            <OptionCard
              key={option.id}
              id={option.id}
              title={option.title}
              description={option.description}
              icon={option.icon}
              isSelected={selectedOptions.includes(option.id)}
              onClick={toggleOption}
              gradientTheme="green"
              variant="multiselect"
            />
          ))}
        </div>

        {/* Selection Summary */}
        {selectedOptions.length > 0 && (
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">
                Selected Channels ({selectedOptions.length})
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedOptions.map((optionId) => {
                const option = sellingOptions.find(opt => opt.id === optionId);
                return (
                  <span
                    key={optionId}
                    className="px-2 py-1 bg-white/20 text-white rounded text-xs border border-white/30"
                  >
                    {option?.title}
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

export default StoreDetailsStep; 