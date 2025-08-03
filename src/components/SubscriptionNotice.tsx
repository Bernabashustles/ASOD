"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp, X, Crown, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SubscriptionModal } from './SubscriptionModal';
import { Progress } from "@/components/ui/progress";

// Mock subscription data
const mockSubscriptionData = {
  status: 'trial',
  daysLeft: 7,
  totalTrialDays: 14,
};

export function SubscriptionNotice() {
  const [isOpen, setIsOpen] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isOpen) return null;

  const progressPercentage = ((mockSubscriptionData.totalTrialDays - mockSubscriptionData.daysLeft) / mockSubscriptionData.totalTrialDays) * 100;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-6 duration-500">
        <div className={cn(
          "bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700",
          "backdrop-blur-sm transition-all duration-300 ease-out overflow-hidden",
          isExpanded ? "w-[380px]" : "w-[320px]",
          "hover:shadow-xl dark:shadow-black/50"
        )}>
          {/* Header - Always Visible */}
          <div 
            className={cn(
              "flex items-center justify-between p-4 cursor-pointer group",
              "hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200",
              !isExpanded && "border-b border-gray-200 dark:border-gray-700"
            )}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 group-hover:scale-105 transition-transform duration-200 border border-gray-200 dark:border-gray-700">
                  <Crown className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-black dark:bg-white rounded-full animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Free Trial</h3>
                  <div className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full border border-gray-200 dark:border-gray-700">
                    {mockSubscriptionData.daysLeft} days left
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {isExpanded ? "Click to minimize" : "Click for details"}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="p-1.5 rounded-lg text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                <ChevronDown className={cn(
                  "h-4 w-4 transition-transform duration-300 ease-out",
                  isExpanded ? "rotate-180" : "rotate-0"
                )} />
              </div>
            </div>
          </div>

          {/* Expandable Content */}
          <div className={cn(
            "overflow-hidden transition-all duration-300 ease-out",
            isExpanded ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          )}>
            <div className="p-4 pt-0 space-y-5">
              {/* Progress Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Trial Progress</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
                <div className="space-y-2">
                  <Progress 
                    value={progressPercentage} 
                    className="h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden [&>div]:bg-black dark:[&>div]:bg-white"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Day {mockSubscriptionData.totalTrialDays - mockSubscriptionData.daysLeft + 1}</span>
                    <span>of {mockSubscriptionData.totalTrialDays} days</span>
                  </div>
                </div>
              </div>

              {/* Special Offer Section */}
              <div className="relative bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="absolute top-2 right-2">
                  <Sparkles className="h-4 w-4 text-gray-600 dark:text-gray-400 animate-pulse" />
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">Special Launch Offer</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300">Get 96% off for the first 3 months</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">50 ETB</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">/month</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-400 line-through">1,200 ETB</span>
                        <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">Save 96%</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-700 dark:text-gray-300 font-medium">Limited Time</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Ends soon</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  className={cn(
                    "w-full bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200",
                    "text-white dark:text-black font-medium border-0 h-11 rounded-xl shadow-lg",
                    "hover:shadow-xl hover:scale-[1.02] transition-all duration-200",
                    "group relative overflow-hidden"
                  )}
                  onClick={() => setIsModalOpen(true)}
                >
                  <span className="flex items-center justify-center gap-2">
                    Upgrade Now
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </Button>
                
                <button 
                  className="w-full text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors font-medium"
                  onClick={() => setIsModalOpen(true)}
                >
                  View all plans & features
                </button>
              </div>

              {/* Trust Badge */}
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse" />
                  <span>Secure checkout • Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SubscriptionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}