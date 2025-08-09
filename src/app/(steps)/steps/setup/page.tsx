"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";

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
import { storeService } from "@/lib/axios/store_svc";

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
    description: "Business size & team",
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


// Store name validation - no availability checking needed
const validateStoreName = (name: string) => {
  // Basic validation: length and format
  return name.length >= 2 && name.length <= 50 && /^[a-zA-Z0-9\s\-_]+$/.test(name);
};

const checkDomainAvailability = async (domainName: string) => {
  try {
    const result = await storeService.checkSubdomainAvailability(domainName);
    return result.available;
  } catch (error) {
    console.error('Error checking domain availability:', error);
    // Fallback to basic check
    return domainName.length > 3 && 
      !["google", "amazon", "facebook", "microsoft"].includes(domainName.toLowerCase());
  }
};

export default function StoreSetup() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [currentStep, setCurrentStep] = useState(1);
  const [isCreatingStore, setIsCreatingStore] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdStore, setCreatedStore] = useState<any>(null);

  // Check authentication status
  useEffect(() => {
    if (!isPending && !session) {
      console.log('🔐 No session found, redirecting to auth...');
      router.push('/auth');
      return;
    }
    if (session) {
      console.log('✅ Session found:', session);
    }
  }, [session, isPending, router]);

  // Expose test and debug functions to global scope for easy testing
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).testSubdomainAPI = (subdomain: string = 'test-store') => {
        storeService.testSubdomainEndpoint(subdomain);
      };
      
      (window as any).debugAuth = () => {
        storeService.debugAuthStatus();
      };
      
      (window as any).setAuthToken = (token: string) => {
        storeService.setAuthToken(token);
      };
      
      (window as any).setBetterAuthSession = (sessionData: any) => {
        storeService.setBetterAuthSession(sessionData);
      };
      
      (window as any).setBetterAuthSessionToken = (token: string) => {
        storeService.setBetterAuthSessionToken(token);
      };
      
      (window as any).extractSessionToken = () => {
        return storeService.extractSessionToken();
      };
      
      (window as any).testRequestHeaders = () => {
        storeService.testRequestHeaders();
      };
      
      (window as any).testActualRequest = async () => {
        await storeService.testActualRequest();
      };

      (window as any).testAuthMethods = async () => {
        await storeService.testAuthMethods();
      };

      // Add session debugging function
      (window as any).debugSession = () => {
        console.log('🔍 Current session state:', {
          session: session,
          isPending: isPending,
          sessionExists: !!session,
          cookies: document.cookie
        });
      };
      
      (window as any).setTestCookie = () => {
        storeService.setTestCookie();
      };
      
      console.log('🧪 Test functions available:');
      console.log('- testSubdomainAPI("your-test-subdomain")');
      console.log('- debugAuth() - Check authentication status');
      console.log('- setAuthToken("your-token") - Set auth token manually');
      console.log('- setBetterAuthSession({sessionToken: "your-token"}) - Set better-auth session');
      console.log('- setBetterAuthSessionToken("your-token") - Set better-auth session token directly');
      console.log('- extractSessionToken() - Extract token from better-auth session');
      console.log('- testRequestHeaders() - Test request headers that would be sent');
      console.log('- testActualRequest() - Send actual test request to see headers in Network tab');
      console.log('- setTestCookie() - Set a test cookie to verify cookie functionality');
    }
  }, []);

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

  // Store name validation check
  useEffect(() => {
    if (storeName) {
      setIsCheckingAvailability(true);
      setIsAvailable(null);

      const timeoutId = setTimeout(() => {
        const isValid = validateStoreName(storeName);
        setIsAvailable(isValid);
        setIsCheckingAvailability(false);
      }, 200);

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

  const handleFinish = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setIsCreatingStore(true);

    try {
      // Check authentication status before proceeding
      console.log('🔍 Checking authentication status before store creation...');
      
      if (!session) {
        toast.error('❌ Please log in to create a store.');
        router.push('/auth');
        return;
      }

      console.log('✅ Session verified, proceeding with store creation...');
      
      // Prepare form data for submission
      const formData = {
        storeName,
        storeDescription,
        businessType,
        businessSize,
        selectedPlatforms,
        selectedNiches,
        selectedPlan,
        domain,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        currency: 'USD'
      };

      console.log('🚀 Submitting store creation with data:', formData);
      
      // Create the store using the store service
      const createdStoreResponse = await storeService.createStore(formData);
      
      console.log('✅ Store created successfully:', createdStoreResponse);
      setCreatedStore(createdStoreResponse);
      
      // Show success message
      toast.success(`🎉 ${storeName} has been created successfully!`);
      
      // Keep isCreatingStore true to continue with the loading animation
      // The StoreCreationLoader will call handleStoreCreationComplete when done
      
    } catch (error: any) {
      console.error('❌ Failed to create store:', error);
      // Enhanced error handling with authentication focus
      if (error.response?.status === 401) {
        toast.error('❌ Authentication failed. Please login again and try creating your store.');
        console.error('🔐 Authentication error details:', error.response.data);
        
        // Show helpful debugging info
        console.log('💡 To debug authentication:');
        console.log('1. Run debugSession() to check current session state');
        console.log('2. Run testAuthMethods() to test different auth approaches');
        console.log('3. Run debugAuth() in console to check current auth status');
        console.log('4. Run testRequestHeaders() to see exactly what headers would be sent');
        console.log('5. Check the Network tab in DevTools to see the actual request headers');
        console.log('6. Verify you are logged in by checking the session:', !!session);
        console.log('7. Check if better-auth cookies are present:', document.cookie.includes('better-auth.session_token'));
        
      } else if (error.response?.status === 409) {
        toast.error('Store name or domain already exists. Please try different options.');
      } else if (error.response?.status === 422) {
        toast.error('Please check all form fields and try again.');
      } else if (error.response?.status === 403) {
        toast.error('You do not have permission to create stores. Please contact support.');
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
      
      // Stop loading states and STAY on the page for debugging
      setIsCreatingStore(false);
      setIsSubmitting(false);
      
      // Add additional debugging info for the user
      console.log('🚨 Store creation failed - staying on page for debugging');
      console.log('🔍 Available debug functions:');
      console.log('- debugAuth() - Check authentication status');
      console.log('- testRequestHeaders() - Test request headers');
      console.log('- setBetterAuthSessionToken("your-token") - Set session token');
      console.log('- testActualRequest() - Send test request');
      
      // Show a toast to inform user they're staying on the page
    }
  };

  const handleStoreCreationComplete = () => {
    console.log('✅ Store creation completed successfully!');
    console.log('📊 Created store data:', createdStore);

    // Persist the created store briefly for post-redirect use
    if (createdStore) {
      try { localStorage.setItem('newStore', JSON.stringify(createdStore)); } catch {}
    }

    setIsSubmitting(false);
    setIsCreatingStore(false);

    // Redirect to choose after success
    router.push('/steps/choose');
  };

  const handleStoreCreationCancel = () => {
    // Allow user to cancel the store creation process
    setIsCreatingStore(false);
    setIsSubmitting(false);
    setCreatedStore(null);
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
            storeName={storeName}
            selectedNiches={selectedNiches}
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

  // Show loading while checking session
  if (isPending) {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    );
  }

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
              isLoading={isSubmitting}
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
      storeData={{
        businessType,
        businessSize,
        selectedPlatforms,
        selectedNiches,
        domain,
        createdStore
      }}
    />
    </>
  );
}