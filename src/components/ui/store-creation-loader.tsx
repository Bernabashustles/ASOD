"use client";
import React, { useState, useEffect } from "react";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { X } from "lucide-react";

const storeCreationStates = [
  {
    text: "Initializing your store foundation...",
  },
  {
    text: "Setting up your domain and branding...",
  },
  {
    text: "Configuring payment systems...",
  },
  {
    text: "Installing essential apps and features...",
  },
  {
    text: "Optimizing for your target market...",
  },
  {
    text: "Setting up inventory management...",
  },
  {
    text: "Configuring shipping and fulfillment...",
  },
  {
    text: "Finalizing store settings...",
  },
  {
    text: "Your store is ready to launch! 🎉",
  },
];

interface StoreCreationLoaderProps {
  loading: boolean;
  onComplete: () => void;
  onCancel?: () => void;
  storeName?: string;
}

export default function StoreCreationLoader({ 
  loading, 
  onComplete, 
  onCancel,
  storeName = "your store"
}: StoreCreationLoaderProps) {
  const [currentStateIndex, setCurrentStateIndex] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    if (!loading) {
      setCurrentStateIndex(0);
      setHasCompleted(false);
      return;
    }

    const totalDuration = 18000; // 18 seconds total
    const stateDelay = totalDuration / storeCreationStates.length;

    const interval = setInterval(() => {
      setCurrentStateIndex((prev) => {
        const next = prev + 1;
        if (next >= storeCreationStates.length) {
          setHasCompleted(true);
          clearInterval(interval);
          // Auto-complete after showing the final state for 2 seconds
          setTimeout(() => {
            onComplete();
          }, 2000);
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
    text: index === 0 
      ? `Initializing ${storeName}...`
      : index === storeCreationStates.length - 1 
      ? `${storeName} is ready to launch! 🎉`
      : state.text
  }));

  return (
    <>
      <Loader 
        loadingStates={customizedStates} 
        loading={loading} 
        duration={2000}
        loop={false}
      />

      {loading && onCancel && (
        <button
          className="fixed top-4 right-4 text-white hover:text-gray-300 z-[120] transition-colors"
          onClick={onCancel}
          aria-label="Cancel store creation"
        >
          <X className="h-8 w-8" />
        </button>
      )}
    </>
  );
} 