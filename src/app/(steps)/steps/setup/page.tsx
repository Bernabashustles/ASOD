"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Import components
import StepIndicator from "./components/StepIndicator";
import StepNavigation from "./components/StepNavigation";
import StoreDetailsStep from "./components/steps/StoreDetailsStep";
import BusinessTypeStep from "./components/steps/BusinessTypeStep";
import BusinessSizeStep from "./components/steps/BusinessSizeStep";
import PlatformsStep from "./components/steps/PlatformsStep";
import NicheStep from "./components/steps/NicheStep";
import DomainStep from "./components/steps/DomainStep";
import PlanStep from "./components/steps/PlanStep";
import StoreCreationLoader from "@/components/ui/store-creation-loader";

// Import step data
import { 
  Building2, 
  CreditCard,
  Globe,
  Store as StoreIcon,
  Users,
  Target,
  Globe2,
} from "lucide-react";

const steps = [
  {
    title: "Store",
    description: "Basic store details",
    icon: StoreIcon,
  },
  {
    title: "Business",
    description: "Business information",
    icon: Building2,
  },
  {
    title: "Size",
    description: "Business size",
    icon: Users,
  },
  {
    title: "Platforms",
    description: "Current platforms",
    icon: Globe2,
  },
  {
    title: "Niche",
    description: "Your market focus",
    icon: Target,
  },
  {
    title: "Domain",
    description: "Choose your domain",
    icon: Globe,
  },
  {
    title: "Plan",
    description: "Choose your plan",
    icon: CreditCard,
  }
];

// Fast utility functions - no delays
const checkAvailability = async (name: string) => {
  return name.length > 3 && !["taken", "unavailable"].includes(name.toLowerCase());
};

const checkDomainAvailability = async (domainName: string) => {
  return domainName.length > 3 && 
    !["google", "amazon", "facebook"].includes(domainName.toLowerCase());
};

export default function StoreSetup() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isCreatingStore, setIsCreatingStore] = useState(false);

  // Store Details Step (Step 1)
  const [storeName, setStoreName] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  // Business Type Step (Step 2)
  const [businessType, setBusinessType] = useState("");

  // Business Size Step (Step 3)
  const [businessSize, setBusinessSize] = useState("");

  // Platforms Step (Step 4)
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  // Niche Step (Step 5)
  const [selectedNiches, setSelectedNiches] = useState<string[]>([]);

  // Domain Step (Step 6)
  const [domain, setDomain] = useState("");
  const [isDomainChecking, setIsDomainChecking] = useState(false);
  const [isDomainAvailable, setIsDomainAvailable] = useState<boolean | null>(null);
  const [storeDescription, setStoreDescription] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAiHelper, setShowAiHelper] = useState(false);

  // Plan Step (Step 7)
  const [selectedPlan, setSelectedPlan] = useState("");

  // Fast store name availability check
  useEffect(() => {
    if (storeName) {
    setIsCheckingAvailability(true);
    setIsAvailable(null);

      const timeoutId = setTimeout(async () => {
        const available = await checkAvailability(storeName);
    setIsAvailable(available);
    setIsCheckingAvailability(false);
      }, 200); // Reduced from 500ms

      return () => clearTimeout(timeoutId);
    } else {
      setIsAvailable(null);
    }
  }, [storeName]);

  // Fast domain availability check
  useEffect(() => {
    if (domain) {
      setIsDomainChecking(true);
      setIsDomainAvailable(null);

      const timeoutId = setTimeout(async () => {
        const available = await checkDomainAvailability(domain);
        setIsDomainAvailable(available);
        setIsDomainChecking(false);
      }, 200); // Reduced from 500ms

      return () => clearTimeout(timeoutId);
    } else {
      setIsDomainAvailable(null);
    }
  }, [domain]);

  // Instant navigation
  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    const targetStep = stepIndex + 1;
    if (targetStep <= currentStep) {
      setCurrentStep(targetStep);
    }
  };

  const handleFinish = () => {
    // Start the store creation animation
    setIsCreatingStore(true);
  };

  const handleStoreCreationComplete = () => {
    // Navigate to dashboard after store creation animation completes
    router.push('/dashboard');
  };

  const handleStoreCreationCancel = () => {
    // Allow user to cancel the store creation process
    setIsCreatingStore(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <StoreDetailsStep
            storeName={storeName}
            setStoreName={setStoreName}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            isCheckingAvailability={isCheckingAvailability}
            isAvailable={isAvailable}
          />
        );
      case 2:
        return (
          <BusinessTypeStep
            businessType={businessType}
            setBusinessType={setBusinessType}
          />
        );
      case 3:
        return (
          <BusinessSizeStep
            businessSize={businessSize}
            setBusinessSize={setBusinessSize}
          />
        );
      case 4:
        return (
          <PlatformsStep
            selectedPlatforms={selectedPlatforms}
            setSelectedPlatforms={setSelectedPlatforms}
          />
        );
      case 5:
        return (
          <NicheStep
            selectedNiches={selectedNiches}
            setSelectedNiches={setSelectedNiches}
          />
        );
      case 6:
        return (
          <DomainStep
            domain={domain}
            setDomain={setDomain}
            isDomainChecking={isDomainChecking}
            isDomainAvailable={isDomainAvailable}
            storeDescription={storeDescription}
            setStoreDescription={setStoreDescription}
            aiSuggestions={aiSuggestions}
            setAiSuggestions={setAiSuggestions}
            isGenerating={isGenerating}
            setIsGenerating={setIsGenerating}
            showAiHelper={showAiHelper}
            setShowAiHelper={setShowAiHelper}
          />
        );
      case 7:
        return (
          <PlanStep
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
          />
        );
      default:
        return null;
    }
  };

  const isNextDisabled = () => {
    switch (currentStep) {
      case 1:
        return selectedOptions.length === 0 || !storeName || isAvailable === false;
      case 2:
        return !businessType;
      case 3:
        return !businessSize;
      case 4:
        return selectedPlatforms.length === 0;
      case 5:
        return selectedNiches.length === 0;
      case 6:
        return !domain || !isDomainAvailable;
      case 7:
        return !selectedPlan;
      default:
        return false;
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl space-y-4 relative z-10">
        {/* Simple Header */}
          <div className="flex flex-col items-center mb-6">
          <div className="bg-gradient-to-br from-white/90 to-slate-100/90 p-2 rounded-lg mb-3">
              <Image 
                src="/assets/icon.png" 
                alt="Logo" 
                width={24} 
                height={24} 
                className="w-6 h-6 object-contain"
              />
          </div>
          <h1 className="text-xl font-bold text-white">Set Up Your Store</h1>
              </div>

        {/* Step Indicator */}
        <StepIndicator
          steps={steps}
          currentStep={currentStep}
          onStepClick={handleStepClick}
          isTransitioning={false}
        />

        {/* Content Area - Simplified */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg p-6">
          <div className="min-h-[320px]">
            {renderStepContent()}
          </div>

          {/* Navigation */}
          <div className="mt-6">
            <StepNavigation
              currentStep={currentStep}
              totalSteps={steps.length}
              isNextDisabled={isNextDisabled()}
              isLoading={false}
              onNext={handleNext}
              onBack={handleBack}
              isTransitioning={false}
              onFinish={handleFinish}
            />
          </div>
        </div>
      </div>
    </div>
    
    {/* Store Creation Loader */}
    <StoreCreationLoader
      loading={isCreatingStore}
      onComplete={handleStoreCreationComplete}
      onCancel={handleStoreCreationCancel}
      storeName={storeName || "your store"}
    />
    </>
  );
}