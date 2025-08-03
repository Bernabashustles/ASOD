"use client";

import React, { useState } from "react";
import FormField from "../FormField";
import { 
  Globe, 
  Check, 
  Shield,
  Sparkles,
  Copy,
  ExternalLink
} from "lucide-react";

export interface DomainStepProps {
  domain: string;
  setDomain: (domain: string) => void;
  isDomainChecking: boolean;
  isDomainAvailable: boolean | null;
  storeDescription: string;
  setStoreDescription: (description: string) => void;
  aiSuggestions: string[];
  setAiSuggestions: (suggestions: string[]) => void;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
  showAiHelper: boolean;
  setShowAiHelper: (show: boolean) => void;
}

const DomainStep: React.FC<DomainStepProps> = ({
  domain,
  setDomain,
  isDomainChecking,
  isDomainAvailable,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const getValidationStatus = () => {
    if (isDomainChecking) return 'checking';
    if (isDomainAvailable === true) return 'valid';
    if (isDomainAvailable === false) return 'invalid';
    return 'idle';
  };

  const getValidationMessage = () => {
    if (isDomainChecking) return 'Checking domain availability...';
    if (isDomainAvailable === true) return 'Perfect! This domain is available';
    if (isDomainAvailable === false) return 'Domain taken. Try one of our suggestions below.';
    return '';
  };

  const domainSuggestions = [
    'mystore', 'shopnow', 'quickbuy', 'stylehub', 'trendy', 'shopease'
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      {/* Modern Header */}
      <div className="text-center">
        <h1 className="text-xl font-semibold text-white">Choose your domain name</h1>
        <p className="text-sm text-zinc-400 mt-1">Your domain is your store's address on the web</p>
      </div>

      {/* Enhanced Domain Input */}
      <div className="space-y-4">
        <FormField
          type="text"
          value={domain}
          onChange={setDomain}
          placeholder="Enter domain name"
          suffix=".axova.com"
          validationStatus={getValidationStatus()}
          validationMessage={getValidationMessage()}
          helpText="Choose something short and memorable"
          maxLength={30}
          showCharCount
          debounceMs={500}
        />

        {/* Domain Suggestions */}
        {(!domain || isDomainAvailable === false) && (
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Popular suggestions</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {domainSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setDomain(suggestion)}
                  className="text-left p-2 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-sm text-zinc-300 hover:text-white"
                >
                  {suggestion}.axova.com
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Domain Preview with Actions */}
        {domain && isDomainAvailable && (
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">Your store URL:</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(`https://${domain}.axova.com`)}
                  className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                  title="Copy URL"
                >
                  <Copy className="w-3 h-3 text-white" />
                </button>
                <button
                  onClick={() => window.open(`https://${domain}.axova.com`, '_blank')}
                  className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                  title="Preview"
                >
                  <ExternalLink className="w-3 h-3 text-white" />
                </button>
              </div>
            </div>
            <div className="text-white font-mono text-sm bg-black/20 rounded-md p-2">
              https://{domain}.axova.com
            </div>
          </div>
        )}
      </div>

      {/* Compact Benefits */}
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-4 h-4 text-white" />
          <span className="text-sm font-medium text-white">What you get with your domain</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
          {[
            'SSL Certificate',
            'Email Forwarding', 
            '24/7 Support',
            'DNS Management',
            'Domain Privacy',
            'Easy Transfer'
          ].map((benefit) => (
            <div key={benefit} className="flex items-center gap-2">
              <Check className="w-3 h-3 text-white flex-shrink-0" />
              <span className="text-xs text-zinc-300">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DomainStep; 