"use client";

import React, { useMemo, useState } from "react";
import OptionCard from "../OptionCard";
import FormField from "../FormField";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Tag, Palette, Users as UsersIcon, Languages as LanguagesIcon, Shirt, Gem, Dumbbell, Camera, Home as HomeIcon, Coffee, Baby, HeartPulse } from "lucide-react";
import AiPresets from "@/data/ai-presets";
const getFlagEmoji = (countryCode: string) =>
  countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
import { 
  ShoppingBag, 
  Laptop, 
  MapPin, 
  Smartphone,
  Instagram,
  Package,
  Globe,
  Sparkles,
  Brain,
  CheckCircle2,
  AlertCircle,
  Wand2,
  ShieldCheck,
  ShieldAlert,
  Languages,
  Heart
} from "lucide-react";
import { aiService, type StoreNameSuggestionItem } from "@/lib/axios/ai_svc";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

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
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<StoreNameSuggestionItem[]>([]);
  const [niche, setNiche] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("modern-minimal");
  const [langs, setLangs] = useState<string[]>(["en"]);
  const [aiPhase, setAiPhase] = useState<'idle' | 'thinking' | 'generating' | 'done' | 'error'>('idle');
  const [useCustomNiche, setUseCustomNiche] = useState(false);
  const [customNiche, setCustomNiche] = useState("");
  const [useCustomTone, setUseCustomTone] = useState(false);
  const [customTone, setCustomTone] = useState("");
  const [useCustomAudience, setUseCustomAudience] = useState(false);
  const [customAudience, setCustomAudience] = useState("");
  const [selectedLang, setSelectedLang] = useState<string>("");
  const [customLang, setCustomLang] = useState("");
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
    if (isCheckingAvailability) return 'Validating store name...';
    if (isAvailable === true) return 'Perfect! This store name looks good';
    if (isAvailable === false) return 'Please enter a valid store name (2-50 characters, letters, numbers, spaces, hyphens, underscores)';
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
      <div className="space-y-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <ShoppingBag className="w-4 h-4 text-blue-400" />
          </div>
          <h3 className="text-lg font-medium text-white">Store Name</h3>
        </div>

        <FormField
          label="Store Name"
          type="text"
          value={storeName}
          onChange={setStoreName}
          placeholder="Enter your store name"
          validationStatus={getValidationStatus()}
          validationMessage={getValidationMessage()}
          helpText="Choose a memorable name that represents your brand"
          maxLength={50}
          showCharCount
          debounceMs={300}
        />
        <Accordion type="single" collapsible className="w-full rounded-lg overflow-hidden bg-white/5 border border-white/10 mt-4">
          <AccordionItem value="oxa-ai" className="border-white/10">
            <AccordionTrigger className="px-4">
              <div className="flex items-center gap-3 text-white">
                <div className="p-2 rounded-md bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border border-white/20 shadow-inner">
                  <Sparkles className="w-5 h-5 text-cyan-300" />
                </div>
                <span className="text-[13px] tracking-[0.08em] font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-white">
                  OXA AI — SMART NAME SUGGESTIONS
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-3 pb-4">
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
                  {/* Niche */}
                  <div className="space-y-2">
                    <label className="text-xs text-white/70 flex items-center gap-2"><Tag className="w-3.5 h-3.5" /> Niche</label>
                    <Select value={useCustomNiche ? "custom" : niche} onValueChange={(val)=>{ if(val==="custom"){setUseCustomNiche(true);} else {setUseCustomNiche(false); setNiche(val);} }}>
                      <SelectTrigger className="h-10 bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select niche" />
                      </SelectTrigger>
                      <SelectContent>
                        {AiPresets.niches.map((n) => (
                          <SelectItem key={n.id} value={n.id}>
                            <div className="flex items-center gap-2">
                              {n.id==="fashion" && <Shirt className="w-3.5 h-3.5" />}
                              {n.id==="beauty" && <Gem className="w-3.5 h-3.5" />}
                              {n.id==="electronics" && <Smartphone className="w-3.5 h-3.5" />}
                              {n.id==="home" && <HomeIcon className="w-3.5 h-3.5" />}
                              {n.id==="food" && <Coffee className="w-3.5 h-3.5" />}
                              {n.id==="sports" && <Dumbbell className="w-3.5 h-3.5" />}
                              {n.id==="art" && <Camera className="w-3.5 h-3.5" />}
                              {n.id==="jewelry" && <Gem className="w-3.5 h-3.5" />}
                              {n.id==="health" && <HeartPulse className="w-3.5 h-3.5" />}
                              {n.id==="kids" && <Baby className="w-3.5 h-3.5" />}
                              <span>{n.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                        <SelectItem value="custom">➕ Custom…</SelectItem>
                      </SelectContent>
                    </Select>
                    {useCustomNiche && (
                      <FormField label="Custom Niche" type="text" value={customNiche} onChange={setCustomNiche} placeholder="Type your niche" debounceMs={200} />
                    )}
                  </div>

                  {/* Brand Tone */}
                  <div className="space-y-2">
                    <label className="text-xs text-white/70 flex items-center gap-2"><Palette className="w-3.5 h-3.5" /> Brand Tone</label>
                    <Select value={useCustomTone ? "custom" : tone} onValueChange={(val)=>{ if(val==="custom"){setUseCustomTone(true);} else {setUseCustomTone(false); setTone(val);} }}>
                      <SelectTrigger className="h-10 bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        {AiPresets.brandTones.map((t) => (
                          <SelectItem key={t.id} value={t.id}>
                            <div className="flex items-center gap-2">
                              <Palette className="w-3.5 h-3.5" />
                              <span>{t.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                        <SelectItem value="custom">➕ Custom…</SelectItem>
                      </SelectContent>
                    </Select>
                    {useCustomTone && (
                      <FormField label="Custom Brand Tone" type="text" value={customTone} onChange={setCustomTone} placeholder="Type your tone" debounceMs={200} />
                    )}
                  </div>

                  {/* Audience */}
                  <div className="space-y-2">
                    <label className="text-xs text-white/70 flex items-center gap-2"><UsersIcon className="w-3.5 h-3.5" /> Audience (psychographics)</label>
                    <Select value={useCustomAudience ? "custom" : audience} onValueChange={(val)=>{ if(val==="custom"){setUseCustomAudience(true);} else {setUseCustomAudience(false); setAudience(val);} }}>
                      <SelectTrigger className="h-10 bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select audience" />
                      </SelectTrigger>
                      <SelectContent>
                        {AiPresets.audiences.map((a) => (
                          <SelectItem key={a.id} value={a.id}>
                            <div className="flex items-center gap-2">
                              <UsersIcon className="w-3.5 h-3.5" />
                              <span>{a.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                        <SelectItem value="custom">➕ Custom…</SelectItem>
                      </SelectContent>
                    </Select>
                    {useCustomAudience && (
                      <FormField label="Custom Audience" type="text" value={customAudience} onChange={setCustomAudience} placeholder="Type your audience" debounceMs={200} />
                    )}
                  </div>

                  {/* Languages */}
                  <div className="space-y-2">
                    <label className="text-xs text-white/70 flex items-center gap-2"><LanguagesIcon className="w-3.5 h-3.5" /> Languages</label>
                    <Select onValueChange={(val) => setSelectedLang(val)} value={selectedLang}>
                      <SelectTrigger className="h-10 bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {AiPresets.languages.map((l) => (
                          <SelectItem key={l.code} value={l.code}>
                            <div className="flex items-center gap-2">
                              <span className="text-base">{getFlagEmoji(l.country)}</span>
                              <span>{l.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                        <SelectItem value="custom">➕ Custom…</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex items-center gap-2 mt-2">
                      <Button type="button" size="sm" className="bg-white/10 hover:bg-white/20" onClick={() => {
                        if(selectedLang && selectedLang!=="custom" && !langs.includes(selectedLang)) setLangs([...langs, selectedLang]);
                      }}>Add</Button>
                      <FormField label="" type="text" value={customLang} onChange={setCustomLang} placeholder="Custom language (e.g., Oromo)" debounceMs={200} />
                      <Button type="button" size="sm" className="bg-white/10 hover:bg-white/20" onClick={() => {
                        if(customLang.trim()) { setLangs([...langs, customLang.trim()]); setCustomLang(""); }
                      }}>Add custom</Button>
                    </div>
                    {langs.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {langs.map((code, i) => (
                          <span key={i} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white/10 border border-white/20 text-xs text-white/90">
                            {AiPresets.languages.find(l=>l.code===code) ? (<>
                              <span className="text-sm">{getFlagEmoji(AiPresets.languages.find(l=>l.code===code)!.country)}</span>
                              {AiPresets.languages.find(l=>l.code===code)!.name}
                            </>) : (<>{code}</>)}
                            <button className="ml-1 text-white/60 hover:text-white" onClick={()=> setLangs(langs.filter((_,idx)=> idx!==i))}>×</button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Status & Action */}
                <div className="rounded-md border border-white/10 bg-white/5 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {aiPhase === 'thinking' && (
                      <span className="inline-flex items-center gap-2 text-sm text-white/90">
                        <Brain className="w-5 h-5 text-cyan-300 animate-pulse" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-300">Thinking…</span>
                      </span>
                    )}
                    {aiPhase === 'generating' && (
                      <div className="inline-flex items-center gap-3">
                        <span className="inline-flex items-center gap-2 text-sm text-white/90">
                          <Wand2 className="w-5 h-5 text-blue-300" />
                          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-white">Generating</span>
                        </span>
                        <span className="oxa-dots"><span></span><span></span><span></span></span>
                      </div>
                    )}
                    {aiPhase === 'done' && (
                      <span className="inline-flex items-center gap-2 text-sm text-emerald-300">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Ready</span>
                      </span>
                    )}
                    {aiPhase === 'error' && (
                      <span className="inline-flex items-center gap-2 text-sm text-rose-300">
                        <AlertCircle className="w-5 h-5" />
                        <span>Error</span>
                      </span>
                    )}
                    {aiPhase === 'idle' && (
                      <span className="inline-flex items-center gap-2 text-sm text-white/70">
                        <Sparkles className="w-5 h-5 text-cyan-300" />
                        <span>Oxa AI is ready</span>
                      </span>
                    )}
                  </div>
                  <Button
                    type="button"
                    disabled={aiPhase === 'thinking' || aiPhase === 'generating'}
                    onClick={async () => {
                      setAiPhase('thinking');
                      setAiLoading(true);
                      await new Promise((r) => setTimeout(r, 500));
                      setAiPhase('generating');
                      try {
                        const suggestions = await aiService.getStoreNameSuggestions({
                          niche: niche || 'general',
                          audiencePsychographics: audience || 'broad',
                          brandTone: tone || 'modern',
                          languages: langs.length > 0 ? langs : ['en'],
                        });
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
                    className="bg-white/10 hover:bg-white/20 inline-flex items-center gap-2"
                  >
                    <Wand2 className="w-5 h-5" />
                    Generate with OXA AI
                  </Button>
                </div>

                <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                  {aiLoading && (
                    <div className="space-y-2">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="p-3 rounded-lg border border-white/10 bg-white/[0.04] relative overflow-hidden">
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-md bg-white/10 sk-shimmer" />
                            <div className="flex-1 space-y-2">
                              <div className="h-3 w-1/2 rounded bg-white/10 sk-shimmer" />
                              <div className="h-3 w-2/3 rounded bg-white/10 sk-shimmer" />
                              <div className="flex gap-2 mt-2">
                                <div className="h-4 w-16 rounded bg-white/10 sk-shimmer" />
                                <div className="h-4 w-24 rounded bg-white/10 sk-shimmer" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {!aiLoading && aiSuggestions.length === 0 && (
                    <div className="text-white/60 text-sm">No suggestions yet.</div>
                  )}
                  {!aiLoading && aiSuggestions.map((s, idx) => (
                    <div key={idx} className="p-3 rounded-lg border border-white/10 bg-white/[0.06]">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <div className="text-white font-medium truncate" title={s.name}>{s.name}</div>
                            {/* Enhanced Use button with gradient border */}
                            <button
                              type="button"
                              onClick={() => setStoreName(s.name)}
                              className="relative inline-flex items-center gap-1.5 rounded-md p-[1px] bg-gradient-to-r from-cyan-500/60 to-blue-500/60 hover:from-cyan-400/80 hover:to-blue-400/80 transition-all"
                            >
                              <span className="rounded-[6px] bg-black/30 hover:bg-black/20 text-xs text-white/90 px-2.5 py-1.5 inline-flex items-center gap-1 border border-white/10">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                                Use
                              </span>
                            </button>
                          </div>
                          <div className="text-xs text-white/70 mt-1 line-clamp-2">{s.rationale}</div>
                          <div className="flex items-center gap-2 flex-wrap mt-2">
                            {/* Sentiment */}
                            {s.sentiment?.label && (
                              <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/80 border border-white/20">
                                <Heart className="w-3 h-3 text-rose-300" /> {s.sentiment.label}
                              </span>
                            )}
                            {/* Trademark */}
                            {s.trademarkStatus?.status && (
                              <span className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded border ${s.trademarkStatus.status === 'clear' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25' : s.trademarkStatus.status === 'potential-conflict' ? 'bg-amber-500/10 text-amber-300 border-amber-500/25' : 'bg-white/10 text-white/80 border-white/20'}`}>
                                {s.trademarkStatus.status === 'clear' ? <ShieldCheck className="w-3 h-3" /> : s.trademarkStatus.status === 'potential-conflict' ? <ShieldAlert className="w-3 h-3" /> : <ShieldCheck className="w-3 h-3" />}
                                {s.trademarkStatus.status}
                              </span>
                            )}
                            {/* Culture score */}
                            {typeof s.culturalSensitivityScore === 'number' && (
                              <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/25">
                                Culture {s.culturalSensitivityScore}
                              </span>
                            )}
                            {/* Variants */}
                            {s.variants && s.variants.length > 0 && (
                              <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/80 border border-white/20">
                                <Languages className="w-3 h-3" /> {s.variants.length} variants
                              </span>
                            )}
                          </div>
                          {s.variants && s.variants.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {s.variants.map((v, i2) => (
                                <span key={i2} className="px-1.5 py-0.5 text-[10px] rounded bg-white/10 text-white/80 border border-white/20">
                                  {v.lang}: {v.value}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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

      {/* Local shimmer for skeletons and progress bar */}
      <style jsx>{`
        .skeleton { position: relative; overflow: hidden; }
        .skeleton::after { content: ''; position: absolute; inset: 0; transform: translateX(-100%); background-image: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0) 100%); animation: shimmer 1.6s infinite; }
        @keyframes shimmer { 100% { transform: translateX(100%); } }
        .animate-oxa-bar { animation: oxa-bar 1.4s ease-in-out infinite; }
        @keyframes oxa-bar { 0% { transform: translateX(-33%); } 50% { transform: translateX(66%); } 100% { transform: translateX(133%); } }
        .oxa-dots { display:inline-flex; gap:6px; align-items:center; }
        .oxa-dots span { width:6px; height:6px; border-radius:9999px; background: rgba(255,255,255,0.8); opacity:0.6; animation: oxa-dot 900ms ease-in-out infinite; }
        .oxa-dots span:nth-child(2){ animation-delay: 150ms; }
        .oxa-dots span:nth-child(3){ animation-delay: 300ms; }
        @keyframes oxa-dot { 0%, 100% { transform: translateY(0); opacity:0.4; } 50% { transform: translateY(-4px); opacity:1; } }
        .sk-shimmer { position: relative; overflow: hidden; }
        .sk-shimmer::after { content:''; position:absolute; inset:0; transform: translateX(-100%); background-image: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.18), rgba(255,255,255,0)); animation: sk-move 1.4s infinite; }
        @keyframes sk-move { 100% { transform: translateX(100%); } }
      `}</style>
    </div>
  );
};

export default StoreDetailsStep; 