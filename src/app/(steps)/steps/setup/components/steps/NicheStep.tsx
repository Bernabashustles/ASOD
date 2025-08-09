"use client";

import React, { useState } from "react";
import OptionCard from "../OptionCard";
import { 
  Shirt, Coffee, Home, Gem, Smartphone, Gamepad, Baby, Dog, 
  Dumbbell, Camera, Music, Book, Car, HeartPulse, Flower2, 
  Search, Target, Sparkles
} from "lucide-react";

export interface NicheStepProps {
  selectedNiches: string[];
  setSelectedNiches: (niches: string[]) => void;
}

const niches = [
  { id: "fashion", title: "Fashion & Apparel", description: "Clothing, accessories, footwear", icon: Shirt },
  { id: "food-beverage", title: "Food & Beverage", description: "Specialty foods, drinks, ingredients", icon: Coffee },
  { id: "home-garden", title: "Home & Garden", description: "Furniture, decor, gardening", icon: Home },
  { id: "beauty", title: "Beauty & Cosmetics", description: "Skincare, makeup, personal care", icon: Gem },
  { id: "electronics", title: "Electronics & Gadgets", description: "Tech accessories, smart devices", icon: Smartphone },
  { id: "gaming", title: "Gaming & Entertainment", description: "Video games, toys, hobbies", icon: Gamepad },
  { id: "baby-kids", title: "Baby & Kids", description: "Children's clothing, toys, gear", icon: Baby },
  { id: "pets", title: "Pets", description: "Pet food, supplies, accessories", icon: Dog },
  { id: "sports-fitness", title: "Sports & Fitness", description: "Athletic gear, equipment", icon: Dumbbell },
  { id: "art-photography", title: "Art & Photography", description: "Prints, artwork, equipment", icon: Camera },
  { id: "music", title: "Music & Instruments", description: "Instruments, equipment", icon: Music },
  { id: "books-media", title: "Books & Media", description: "Books, digital content, courses", icon: Book },
  { id: "automotive", title: "Automotive", description: "Car parts, accessories", icon: Car },
  { id: "health-wellness", title: "Health & Wellness", description: "Supplements, wellness products", icon: HeartPulse },
  { id: "jewelry", title: "Jewelry & Accessories", description: "Fine jewelry, watches", icon: Gem },
  { id: "flowers-gifts", title: "Flowers & Gifts", description: "Bouquets, gift baskets", icon: Flower2 },
];

const NicheStep: React.FC<NicheStepProps> = ({ selectedNiches, setSelectedNiches }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNiches = niches.filter(niche => {
    const matchesSearch = !searchTerm || 
      niche.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      niche.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleNicheToggle = (nicheId: string) => {
    if (selectedNiches.includes(nicheId)) {
      setSelectedNiches(selectedNiches.filter(id => id !== nicheId));
    } else if (selectedNiches.length < 3) {
      setSelectedNiches([...selectedNiches, nicheId]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          Market focus
        </div>
        <h1 className="text-xl font-semibold text-white mt-2">What's your primary market focus?</h1>
        <p className="text-sm text-zinc-400 mt-1">Select up to 3 niches ({selectedNiches.length}/3 selected)</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
        <input
          type="text"
          placeholder="Search niches..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {filteredNiches.map((niche) => {
          const isSelected = selectedNiches.includes(niche.id);
          const isDisabled = selectedNiches.length >= 3 && !isSelected;
          return (
            <OptionCard
              key={niche.id}
              id={niche.id}
              title={niche.title}
              description={niche.description}
              icon={niche.icon}
              isSelected={isSelected}
              isDisabled={isDisabled}
              onClick={handleNicheToggle}
              gradientTheme="green"
              variant="multiselect"
              size="sm"
            />
          );
        })}
      </div>

      {/* Empty state */}
      {filteredNiches.length === 0 && (
        <div className="text-center py-2 text-zinc-400 text-sm">
          No niches found matching your search.
        </div>
      )}
    </div>
  );
};

export default NicheStep; 