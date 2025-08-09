"use client";

import React, { useState, useEffect } from "react";
import FormField from "../FormField";
import { storeService } from "@/lib/axios/store_svc";
import { aiService, type SubdomainSuggestionItem } from "@/lib/axios/ai_svc";
// Accordion removed for non-collapsible layout
import { 
  Globe, 
  Check, 
  Shield,
  Sparkles,
  Copy,
  ExternalLink,
  Brain,
  Wand2,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  ShieldAlert
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  storeName?: string;
  selectedNiches?: string[];
}

const DomainStep: React.FC<DomainStepProps> = ({
  domain,
  setDomain,
  isDomainChecking,
  isDomainAvailable,
  storeName,
  selectedNiches,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [localIsChecking, setLocalIsChecking] = useState(false);
  const [localIsAvailable, setLocalIsAvailable] = useState<boolean | null>(null);
  const [suggestedUrl, setSuggestedUrl] = useState<string | undefined>(undefined);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiPhase, setAiPhase] = useState<'idle' | 'thinking' | 'generating' | 'done' | 'error'>('idle');
  const [aiSuggestions, setAiSuggestions] = useState<SubdomainSuggestionItem[]>([]);
  const [aiDomain, setAiDomain] = useState('myaxova.store');

  // Derive payload on the fly from previous steps
  const deriveAiPayload = () => {
    const conceptVal = (storeName && storeName.trim().length > 1)
      ? storeName
      : (domain ? `${domain}` : 'Brand');
    const industryVal = (selectedNiches && selectedNiches.length > 0)
      ? selectedNiches[0].split(/[-_]/).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')
      : 'General';
    const nameTokens = (storeName || '')
      .split(/\s+/)
      .map(t => t.toLowerCase())
      .filter(Boolean);
    const nicheTokens = (selectedNiches || [])
      .map(n => n.replace(/[-_]/g, ' ').toLowerCase());
    const keywords = Array.from(new Set([...nameTokens, ...nicheTokens, 'shop', 'store'])).slice(0, 6);
    return { concept: conceptVal, industry: industryVal, geoTarget: 'GLOBAL', keywords };
  };
  
  // Enhanced subdomain availability checking using store service
  useEffect(() => {
    if (domain) {
      setLocalIsChecking(true);
      setLocalIsAvailable(null);

      const timeoutId = setTimeout(async () => {
        try {
          const result = await storeService.checkSubdomainAvailability(domain);
          setLocalIsAvailable(result.available);
          setSuggestedUrl(result.suggestedUrl);
        } catch (error) {
          console.error('Error checking subdomain availability:', error);
          // Fallback to basic validation
          const isValidFormat = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/.test(domain);
          const isReserved = ["taken", "unavailable", "admin", "api", "www", "app", "mail"].includes(domain.toLowerCase());
          setLocalIsAvailable(domain.length > 3 && isValidFormat && !isReserved);
        } finally {
          setLocalIsChecking(false);
        }
      }, 300); // Reduced debounce for faster response

      return () => clearTimeout(timeoutId);
    } else {
      setLocalIsAvailable(null);
      setSuggestedUrl(undefined);
    }
  }, [domain]);

  const getValidationStatus = () => {
    if (localIsChecking) return 'checking';
    if (localIsAvailable === true) return 'valid';
    if (localIsAvailable === false) return 'invalid';
    return 'idle';
  };

  const getValidationMessage = () => {
    if (localIsChecking) return 'Checking subdomain availability...';
    if (localIsAvailable === true) return suggestedUrl ? `Perfect! Your store will be at: ${suggestedUrl}` : 'Perfect! This subdomain is available';
    if (localIsAvailable === false) return 'Subdomain taken. Try one of our suggestions below.';
    return '';
  };

  // Note: No static mock suggestions; suggestions come from Oxa AI

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      {/* Modern Header */}
      <div className="text-center">
        <h1 className="text-xl font-semibold text-white">Choose your Subdomain name</h1>
        <p className="text-sm text-zinc-400 mt-1">Your subdomain will be your store's address on the web</p>
      </div>

      {/* Enhanced Domain Input */}
      <div className="space-y-4">
        <FormField
          label="Subdomain"
          type="text"
          value={domain}
          onChange={setDomain}
          placeholder="Enter subdomain name"
          suffix=".myaxova.store"
          validationStatus={getValidationStatus()}
          validationMessage={getValidationMessage()}
          helpText="Choose something short and memorable"
          maxLength={30}
          showCharCount
          debounceMs={300}
        />

        {/* Oxa AI Suggestions (minimal, no card/header) */}
        <div className="space-y-4 mt-8 border-t border-white/10 pt-6">
            <div className="flex items-center justify-end mb-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 text-xs rounded-md px-2.5 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white"
                  disabled={aiPhase === 'thinking' || aiPhase === 'generating'}
                  onClick={async () => {
                    setAiPhase('thinking');
                    setAiLoading(true);
                    try {
                      await new Promise(r => setTimeout(r, 300));
                      setAiPhase('generating');
                      const payload = deriveAiPayload();
                      const { domain: baseDomain, suggestions } = await aiService.getSubdomainSuggestions(payload);
                      setAiDomain(baseDomain);
                      setAiSuggestions(suggestions);
                      setAiPhase('done');
                      setTimeout(() => setAiPhase('idle'), 1400);
                    } catch (e) {
                      setAiPhase('error');
                      setTimeout(() => setAiPhase('idle'), 1600);
                    } finally {
                      setAiLoading(false);
                    }
                  }}
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  Generate with Oxa AI
                </button>
            </div>
            {/* Status under the button */}
            <div className="flex justify-end">
              <div className="flex items-center gap-3 min-h-[18px]">
                {aiPhase === 'thinking' && (
                  <span className="inline-flex items-center gap-2 text-xs text-white/80">
                    <Brain className="w-3.5 h-3.5 text-cyan-300" /> Thinking…
                  </span>
                )}
                {aiPhase === 'generating' && (
                  <span className="inline-flex items-center gap-3">
                    <span className="inline-flex items-center gap-2 text-xs text-white/90">
                      <Wand2 className="w-3.5 h-3.5 text-blue-300" /> Generating
                    </span>
                    <span className="oxa-dots"><span></span><span></span><span></span></span>
                  </span>
                )}
                {aiPhase === 'done' && (
                  <span className="inline-flex items-center gap-2 text-xs text-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Ready
                  </span>
                )}
                {aiPhase === 'error' && (
                  <span className="inline-flex items-center gap-2 text-xs text-rose-300">
                    <AlertCircle className="w-3.5 h-3.5" /> Error
                  </span>
                )}
              </div>
            </div>

              {/* Static list removed per request */}

            {aiSuggestions.length > 0 && (
                <TooltipProvider>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto w-full">
                    {aiSuggestions.map((s, idx) => (
                      <Tooltip key={idx}>
                        <TooltipTrigger asChild>
                          <div
                            className="group w-full cursor-pointer rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all p-4"
                            onClick={() => setDomain(s.subdomain)}
                          >
                            <div className="flex items-start gap-4">
                              <div className="w-9 h-9 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                                <Globe className="w-4.5 h-4.5 text-white/80" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-mono text-sm text-white truncate" title={s.fullDomain}>{s.subdomain}.{aiDomain}</div>
                                <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] text-white/70">
                                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/10 border border-white/20">Base {aiDomain}</span>
                                  <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border ${s.brandSafety ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25' : 'bg-amber-500/10 text-amber-300 border-amber-500/25'}`}>
                                    {s.brandSafety ? <ShieldCheck className="w-3 h-3" /> : <ShieldAlert className="w-3 h-3" />} safety
                                  </span>
                                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/10 text-white/80 border border-white/20">Pop {s.popularityScore}</span>
                                  {s.platformAvailable && (
                                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/25">
                                      <Check className="w-3 h-3" /> available
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="shrink-0">
                                <button
                                  type="button"
                                  className="relative inline-flex items-center gap-1.5 rounded-md p-[1px] bg-gradient-to-r from-cyan-500/60 to-blue-500/60 hover:from-cyan-400/80 hover:to-blue-400/80 transition-all"
                                  onClick={(e)=>{ e.stopPropagation(); setDomain(s.subdomain); }}
                                >
                                  <span className="rounded-[6px] bg-black/30 hover:bg-black/20 text-[11px] text-white/90 px-2.5 py-1.5 inline-flex items-center gap-1 border border-white/10">
                                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                                    Use
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="bg-zinc-900 text-white border-white/20 max-w-md shadow-xl shadow-black/40 rounded-lg">
                          <div className="text-xs space-y-1">
                            <div className="font-medium">{s.fullDomain}</div>
                            <div className="text-white/80">{s.rationale}</div>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/80 border border-white/20">Base {aiDomain}</span>
                              <span className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded border ${s.brandSafety ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25' : 'bg-amber-500/10 text-amber-300 border-amber-500/25'}`}>
                                {s.brandSafety ? <ShieldCheck className="w-3 h-3" /> : <ShieldAlert className="w-3 h-3" />} safety
                              </span>
                              <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/80 border border-white/20">Pop {s.popularityScore}</span>
                              {s.platformAvailable && <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/25">Available</span>}
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </TooltipProvider>
            )}
        </div>

      {/* Local styles for dots animation */}
      <style jsx>{`
        .oxa-dots { display:inline-flex; gap:6px; align-items:center; }
        .oxa-dots span { width:6px; height:6px; border-radius:9999px; background: rgba(255,255,255,0.8); opacity:0.6; animation: oxa-dot 900ms ease-in-out infinite; }
        .oxa-dots span:nth-child(2){ animation-delay: 150ms; }
        .oxa-dots span:nth-child(3){ animation-delay: 300ms; }
        @keyframes oxa-dot { 0%, 100% { transform: translateY(0); opacity:0.4; } 50% { transform: translateY(-4px); opacity:1; } }
      `}</style>

        {/* Subdomain Preview with Actions */}
        {domain && localIsAvailable && (
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">Your store URL:</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(suggestedUrl || `https://${domain}.myaxova.store`)}
                  className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                  title="Copy URL"
                >
                  <Copy className="w-3 h-3 text-white" />
                </button>
                <button
                  onClick={() => window.open(suggestedUrl || `https://${domain}.myaxova.store`, '_blank')}
                  className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                  title="Preview"
                >
                  <ExternalLink className="w-3 h-3 text-white" />
                </button>
              </div>
            </div>
            <div className="text-white font-mono text-sm bg-black/20 rounded-md p-2">
              {suggestedUrl || `https://${domain}.myaxova.store`}
            </div>
          </div>
        )}
      </div>

      {/* Compact Benefits */}
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-4 h-4 text-white" />
          <span className="text-sm font-medium text-white">What you get with your subdomain</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
          {[
            'SSL Certificate',
            'Custom Branding', 
            '24/7 Support',
            'Easy Management',
            'Mobile Optimized',
            'SEO Ready'
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