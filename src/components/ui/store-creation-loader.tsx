"use client";
import React, { useState, useEffect } from "react";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { X } from "lucide-react";

import { Rocket, Globe, Puzzle, CreditCard, CheckCircle2 } from "lucide-react";

const storeCreationStates = [
  { text: "Starting setup", Icon: Rocket },
  { text: "Domain & brand", Icon: Globe },
  { text: "Essentials", Icon: Puzzle },
  { text: "Payments", Icon: CreditCard },
  { text: "Finishing up", Icon: CheckCircle2 },
];

interface StoreCreationLoaderProps {
  loading: boolean;
  onComplete: () => void;
  onCancel?: () => void;
  storeName?: string;
  storeData?: any; // Additional store data for more personalized messages
}

export default function StoreCreationLoader({ 
  loading, 
  onComplete, 
  onCancel,
  storeName = "your store",
  storeData
}: StoreCreationLoaderProps) {
  const [currentStateIndex, setCurrentStateIndex] = useState(0);
  const totalDuration = 10000; // ~10 seconds total
  const stepsCount = storeCreationStates.length;
  const stateDelay = totalDuration / stepsCount;

  useEffect(() => {
    if (!loading) {
      setCurrentStateIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStateIndex((prev) => {
        const next = prev + 1;
        if (next >= stepsCount) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 1200);
          return prev;
        }
        return next;
      });
    }, stateDelay);

    return () => clearInterval(interval);
  }, [loading, onComplete]);

  // Customize the states with the store name
  const customizedStates = storeCreationStates.map((state, index) => ({
    ...state,
    text: index === 0 ? `Starting ${storeName}` : state.text,
  }));

  return (
    <>
      <Loader 
        loadingStates={customizedStates}
        loading={loading}
        duration={stateDelay}
        loop={false}
      />

      {loading && onCancel && (
        <button
          className="fixed top-4 right-4 text-white/90 hover:text-white z-[120] transition-colors"
          onClick={onCancel}
          aria-label="Cancel store creation"
        >
          <X className="h-7 w-7" />
        </button>
      )}

      {loading && (
        <div className="fixed inset-0 z-[115] pointer-events-none flex flex-col items-center justify-end">
          {/* Progress HUD */}
          <div className="w-full max-w-xl px-6 pb-10">
            <div className="mb-2 flex items-center justify-center gap-2 text-white/80 text-sm">
              <span className="font-medium">Setting up</span>
              <span className="text-white">{storeName}</span>
              <span className="text-white/50">({currentStateIndex + 1}/{stepsCount})</span>
            </div>
            <div className="relative h-1.5 bg-white/15 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-500"
                style={{ width: `${Math.min(100, (currentStateIndex / (stepsCount - 1)) * 100)}%` }}
              />
            </div>
            {/* Step dots */}
            <div className="mt-3 flex items-center justify-between">
              {Array.from({ length: stepsCount }).map((_, i) => (
                <div key={i} className="flex-1 flex items-center justify-center">
                  <div className={`w-2.5 h-2.5 rounded-full ${i <= currentStateIndex ? 'bg-white' : 'bg-white/30'}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
} 