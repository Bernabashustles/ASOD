'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import TiptapEditor from '@/components/TiptapEditor';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Info, Lightbulb, Sparkles, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";

// Define the expected shape for the specific fields this component handles
interface GeneralInfoData {
  title: string;
  description: string;
}

interface GeneralInfoSectionProps {
  formData: GeneralInfoData; // Use the specific shape
  onChange: (field: keyof GeneralInfoData, value: any) => void; // Use keyof specific shape
  errors?: { [key: string]: string }; // Added errors prop
}

const MAX_TITLE_LENGTH = 70; // Example length, adjust as needed

const GeneralInfoSection: React.FC<GeneralInfoSectionProps> = ({ formData, onChange, errors }) => {
  const titleError = errors?.title;
  const titleLength = formData.title?.length || 0;
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [productPrompt, setProductPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [generationStep, setGenerationStep] = useState(0);
  
  // Add a ref to track if the component is mounted
  const isMountedRef = useRef(false);
  
  // Effect to add CSS styles - runs ONCE on mount
  useEffect(() => {
    // Set the mounted ref
    isMountedRef.current = true;
    
    // Create the style element only once
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      .animate-shimmer {
        animation: shimmer 2s infinite linear;
      }
      .ai-btn-glow {
        transition: all 0.2s ease;
      }
      .ai-btn-glow:hover {
        box-shadow: 0 0 15px rgba(79, 70, 229, 0.5);
        transform: translateY(-2px);
      }
    `;
    
    // Only append if not already present (guard against double-execution)
    if (!document.head.querySelector('#ai-button-styles')) {
      style.id = 'ai-button-styles';
      document.head.appendChild(style);
    }
    
    // Clean up on unmount
    return () => {
      isMountedRef.current = false;
      const existingStyle = document.head.querySelector('#ai-button-styles');
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  // AI generation steps - Break down into multiple effects with proper guards
  const generateAIDescription = async () => {
    if (!productPrompt.trim() || isGenerating) return; // Guard against empty prompt or already generating
    
    setIsGenerating(true);
    setGenerationStep(1);
    
    // Use a safe timeout pattern that checks if component is still mounted
    const safeTimeout = (callback: () => void, delay: number) => {
      const timeoutId = setTimeout(() => {
        if (isMountedRef.current) {
          callback();
        }
      }, delay);
      return timeoutId;
    };
    
    // Step 1: Analyzing prompt
    const timeout1 = safeTimeout(() => {
      if (isMountedRef.current) {
        setGenerationStep(2);
        
        // Step 2: Generating content
        const timeout2 = safeTimeout(() => {
          if (isMountedRef.current) {
            setGenerationStep(3);
            
            // Step 3: Formatting and finalizing
            const timeout3 = safeTimeout(() => {
              if (isMountedRef.current) {
                // Example generated description based on prompt
                const descriptionSample = `<h2>${formData.title || 'Product'}</h2>
                <p>${productPrompt}</p>
                
                <h3>Features</h3>
                <ul>
                  <li>Premium quality materials for durability</li>
                  <li>Ergonomic design for comfort and ease of use</li>
                  <li>Versatile functionality for various applications</li>
                </ul>
                
                <h3>Specifications</h3>
                <p>This product is designed to meet the highest standards in the industry, ensuring customer satisfaction and long-term value.</p>`;
                
                setGeneratedDescription(descriptionSample);
                setIsGenerating(false);
                setGenerationStep(4);
              }
            }, 700);
            
            return () => clearTimeout(timeout3);
          }
        }, 800);
        
        return () => clearTimeout(timeout2);
      }
    }, 600);
    
    return () => clearTimeout(timeout1);
  };

  // Messages for each generation step
  const generationMessages = [
    "",
    "Analyzing product information...",
    "Creating compelling description...",
    "Formatting and enhancing content...",
    "Description generated!"
  ];

  // Safe apply function with guard
  const applyGeneratedDescription = () => {
    if (generatedDescription && !isGenerating) {
      onChange('description', generatedDescription);
      setAiModalOpen(false);
      setProductPrompt('');
      setGeneratedDescription('');
      setGenerationStep(0);
    }
  };

  return (
    <Card className="border-gray-200 shadow-sm hover:shadow transition-shadow duration-200">
      <CardHeader className="pb-3 border-b">
         <CardTitle className="text-lg font-medium flex flex-wrap items-center gap-2">
           Product Information
           <Badge variant="outline" className="font-normal bg-amber-50 text-amber-800 border-amber-200">Required</Badge>
         </CardTitle> 
      </CardHeader>
      <CardContent className="pt-4 sm:pt-6 space-y-4 sm:space-y-6"> {/* Adjusted spacing for mobile */}
        {/* --- Title Field --- */}
        <div className="space-y-1.5 sm:space-y-2">
           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <Label htmlFor="title" className="flex items-center text-sm sm:text-base font-medium text-gray-800">
                 Product Title
                 <TooltipProvider delayDuration={100}>
                    <Tooltip>
                       <TooltipTrigger asChild>
                         <Info className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-1.5 sm:ml-2 text-gray-400 cursor-help" />
                       </TooltipTrigger>
                       <TooltipContent side="top" align="start" className="p-3 max-w-[300px]">
                         <p className="text-sm">Enter a clear and concise title for your product. This is important for search results and customer understanding.</p>
                         <div className="flex items-center mt-2 pt-2 border-t text-amber-700 text-xs">
                           <Lightbulb className="h-3.5 w-3.5 mr-1.5" />
                           <span>Descriptive titles with key features perform better in search results.</span>
                         </div>
                       </TooltipContent>
                    </Tooltip>
                 </TooltipProvider>
              </Label>
              <span className={`text-xs font-medium ${titleLength > MAX_TITLE_LENGTH ? 'text-red-600' : titleLength > (MAX_TITLE_LENGTH * 0.8) ? 'text-amber-600' : 'text-gray-500'}`}>
                 {titleLength}/{MAX_TITLE_LENGTH}
              </span>
           </div>
          <Input 
            id="title"
            value={formData.title}
            onChange={(e) => onChange('title', e.target.value)}
            placeholder="e.g. Premium Cotton T-Shirt"
            aria-invalid={!!titleError}
            aria-describedby={titleError ? "title-error" : undefined}
            className={`text-sm sm:text-base py-2 sm:py-2.5 ${titleError ? 'border-red-500 focus-visible:ring-red-500' : 'focus-visible:ring-indigo-500'}`}
            maxLength={MAX_TITLE_LENGTH + 10} // Allow slight overtyping, visual feedback handles limit
          />
           {titleError ? (
              <p id="title-error" className="text-xs text-red-600 mt-1">
                  {titleError}
              </p>
           ) : (
              <p className="text-xs text-gray-500 mt-1">Create a unique, descriptive title that helps customers find your product.</p>
           )}
        </div>
        
        {/* --- Description Field --- */}
        <div className="space-y-1.5 sm:space-y-2 pt-1 sm:pt-2">
           <div className="flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
             <Label htmlFor="description" className="flex items-center text-sm sm:text-base font-medium text-gray-800">
                 Product Description
                  <TooltipProvider delayDuration={100}>
                      <Tooltip>
                         <TooltipTrigger asChild>
                           <Info className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-1.5 sm:ml-2 text-gray-400 cursor-help" />
                         </TooltipTrigger>
                         <TooltipContent side="top" align="start" className="p-3 max-w-[300px]">
                           <p className="text-sm">Provide a detailed description of your product. Use formatting options to highlight key features and benefits.</p>
                           <div className="flex items-center mt-2 pt-2 border-t text-amber-700 text-xs">
                             <Lightbulb className="h-3.5 w-3.5 mr-1.5" />
                             <span>Include dimensions, materials, care instructions, and benefits to reduce customer questions.</span>
                           </div>
                         </TooltipContent>
                      </Tooltip>
                   </TooltipProvider>
             </Label>
             
             {/* Simplified AI Button - Made more mobile friendly */}
             <Button 
               variant="outline" 
               size="sm" 
               className="ai-btn-glow flex items-center gap-1.5 text-indigo-700 border-indigo-200 bg-indigo-50 hover:bg-indigo-100 relative overflow-hidden rounded-md w-full sm:w-auto justify-center sm:justify-start"
               onClick={() => setAiModalOpen(true)}
             >
               {/* Simple gradient background */}
               <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
               
               {/* Simple animated border */}
               <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-shimmer"></div>
               
               <div className="relative z-10 flex items-center gap-1.5">
                 <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                 <span className="font-medium">Generate with AI</span>
               </div>
             </Button>
           </div>
           <div className="border-0 rounded-md overflow-hidden">
              <TiptapEditor
                content={formData.description}
                onChange={(newContent) => onChange('description', newContent)}
                className="border rounded-md min-h-[120px] sm:min-h-[200px] max-h-[250px] sm:max-h-[350px] overflow-y-auto"
              />
           </div>
           <p className="text-xs text-gray-500 mt-1">
              Format your description with headings, bullet points, and bold text to improve readability.
           </p>
        </div>
      </CardContent>

      {/* AI Description Generator Dialog */}
      <Dialog open={aiModalOpen} onOpenChange={(open) => {
        if (isMountedRef.current) {
          setAiModalOpen(open);
          if (!open) {
            setGenerationStep(0);
            setProductPrompt('');
            setGeneratedDescription('');
          }
        }
      }}>
        <DialogContent className="w-[calc(100%-2rem)] sm:max-w-[550px] max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />
              AI Description Generator
            </DialogTitle>
            <DialogDescription className="text-sm">
              Describe your product in a few words and our AI will create a detailed description.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 sm:space-y-4 my-1 sm:my-2">
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="productPrompt" className="text-xs sm:text-sm font-medium">
                What are you selling? Include key details like materials, uses, and unique features.
              </Label>
              <Textarea
                id="productPrompt"
                placeholder="Example: A premium cotton t-shirt with eco-friendly dyes, suitable for casual and athletic wear."
                rows={3}
                value={productPrompt}
                onChange={(e) => setProductPrompt(e.target.value)}
                className="resize-none text-sm"
                disabled={isGenerating}
              />
            </div>
            
            {/* Generation Progress */}
            <AnimatePresence>
              {isGenerating && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3 bg-indigo-50 rounded-md p-2 sm:p-3 border border-indigo-100"
                >
                  <div className="flex items-center justify-center space-x-3">
                    <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 animate-spin" />
                    <span className="text-xs sm:text-sm font-medium text-indigo-700">
                      {generationMessages[generationStep]}
                    </span>
                  </div>
                  
                  {/* Progress Steps */}
                  <div className="w-full flex gap-2 mt-1">
                    {[1, 2, 3].map((step) => (
                      <div 
                        key={step} 
                        className="flex-1 h-1.5 rounded-full overflow-hidden bg-indigo-100"
                      >
                        <motion.div 
                          className="h-full bg-indigo-600"
                          initial={{ width: "0%" }}
                          animate={{ 
                            width: generationStep >= step ? "100%" : "0%",
                          }}
                          transition={{ 
                            duration: 0.5,
                            ease: "easeInOut",
                            delay: (step - 1) * 0.2
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Generated Content */}
            <AnimatePresence>
              {generatedDescription && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-1.5 sm:space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <Label className="text-xs sm:text-sm font-medium">Generated Description</Label>
                    {generationStep === 4 && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                          ✓ Ready to use
                        </Badge>
                      </motion.div>
                    )}
                  </div>
                  <motion.div 
                    className="border rounded-md p-2 sm:p-3 bg-gray-50 max-h-[150px] sm:max-h-[200px] overflow-y-auto"
                    initial={{ boxShadow: "0 0 0 0 rgba(79, 70, 229, 0)" }}
                    animate={{ boxShadow: "0 0 0 3px rgba(79, 70, 229, 0.2)" }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <div dangerouslySetInnerHTML={{ __html: generatedDescription }} className="text-sm" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <DialogFooter className="flex flex-col-reverse sm:flex-row items-center justify-between sm:justify-between gap-3 mt-2">
            <Button 
              variant="outline" 
              onClick={() => {
                setAiModalOpen(false);
                setProductPrompt('');
                setGeneratedDescription('');
                setGenerationStep(0);
              }}
              disabled={isGenerating}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                onClick={generateAIDescription}
                disabled={!productPrompt.trim() || isGenerating}
                variant="outline"
                className="gap-2 w-full sm:w-auto"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    Generate
                    <Sparkles className="h-4 w-4" />
                  </>
                )}
              </Button>
              <Button
                onClick={applyGeneratedDescription}
                disabled={!generatedDescription || isGenerating}
                className={`w-full sm:w-auto ${generatedDescription && !isGenerating ? "animate-pulse" : ""}`}
              >
                Apply
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default GeneralInfoSection;
