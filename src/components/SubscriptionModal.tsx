"use client";

import { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const plans = [
  {
    name: 'Basic',
    subtitle: 'For solo entrepreneurs',
    originalPrice: 1200,
    promoPrice: 50,
    period: 'ETB/month',
    promoText: 'for first 3 months',
    cardRate: '2% 3rd-party payment providers',
    features: [
      '10 inventory locations',
      '24/7 chat support',
      'Localized global selling (3 markets)',
      'POS Lite'
    ],
    popular: true
  },
  {
    name: 'Axova',
    subtitle: 'For small teams',
    originalPrice: 3450,
    promoPrice: 50,
    period: 'ETB/month',
    promoText: 'for first 3 months',
    cardRate: '1% 3rd-party payment providers',
    features: [
      '10 inventory locations',
      '24/7 chat support',
      'Localized global selling (3 markets)',
      '5 additional staff accounts',
      'POS Lite'
    ]
  },
  {
    name: 'Advanced',
    subtitle: 'As your business scales',
    originalPrice: 14950,
    promoPrice: 50,
    period: 'ETB/month',
    promoText: 'for first 3 months',
    cardRate: '0.6% 3rd-party payment providers',
    features: [
      '10 inventory locations',
      'Enhanced 24/7 chat support',
      'Localized global selling (3 markets) + add markets for 2,950 ETB/mo each',
      '15 additional staff accounts',
      '10x checkout capacity',
      'POS Lite'
    ]
  },
  {
    name: 'Plus',
    subtitle: 'For more complex businesses',
    price: 115000,
    period: 'ETB/month',
    cardRate: '0.2% 3rd-party payment providers',
    features: [
      '200 inventory locations',
      'Priority 24/7 chat support',
      'Localized global selling (50 markets)',
      'Unlimited staff accounts',
      'Customizable checkout with 40x capacity',
      'Sell wholesale/B2B',
      'Up to 200 POS Pro locations'
    ]
  }
];

export function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  if (!isOpen) return null;

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in-0 duration-300" onClick={onClose} />
      
      {/* Modal Container */}
      <div className="relative h-full overflow-y-auto">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black" />
        <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/0" />
        
        {/* Content */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="flex items-start justify-between mb-12">
              <div className="max-w-2xl">
                <button 
                  onClick={onClose}
                  className="inline-flex items-center text-sm text-gray-400 hover:text-white bg-white/5 px-4 py-2 rounded-lg transition-colors hover:bg-white/10"
                >
                  <X className="h-4 w-4 mr-2" />
                  Back
                </button>
                <h1 className="text-3xl font-semibold text-white mt-4">Pick your plan</h1>
                <p className="text-gray-400 mt-2">Choose the perfect plan for your business needs</p>
              </div>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan) => (
                <div 
                  key={plan.name}
                  className={cn(
                    "bg-gradient-to-b from-white/10 to-white/5 border border-white/10 rounded-xl overflow-hidden",
                    "backdrop-blur-sm hover:border-white/20 transition-all duration-300",
                    "hover:shadow-xl hover:shadow-white/5 hover:translate-y-[-2px]",
                    "group",
                    plan.popular && "relative"
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-px left-4">
                      <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded-b-lg shadow-sm">
                        Most popular
                      </span>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                    <p className="text-sm text-gray-400 mb-4">{plan.subtitle}</p>
                    
                    <div className="mb-6">
                      <div className="flex items-baseline gap-2 mb-1">
                        {'promoPrice' in plan ? (
                          <>
                            <span className="text-2xl line-through text-gray-500">${plan.originalPrice}</span>
                            <span className="text-3xl font-bold text-white">${plan.promoPrice}</span>
                          </>
                        ) : (
                          <span className="text-3xl font-bold text-white">${plan.price}</span>
                        )}
                        <span className="text-sm text-gray-400">{plan.period}</span>
                      </div>
                      {'promoPrice' in plan && (
                        <p className="text-sm text-gray-400">{plan.promoText}</p>
                      )}
                    </div>

                    <Button
                      className={cn(
                        "w-full mb-6 transition-all duration-300",
                        plan.popular
                          ? "bg-white text-gray-900 hover:bg-gray-100 hover:shadow-lg"
                          : "bg-white/10 text-white hover:bg-white/20 hover:shadow-lg"
                      )}
                      onClick={onClose}
                    >
                      Select {plan.name}
                    </Button>

                    <div className="text-sm text-gray-400 mb-4">
                      Card rates starting at<br />
                      {plan.cardRate}
                    </div>

                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                          <Check className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 