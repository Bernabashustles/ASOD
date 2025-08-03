'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  MapPin, 
  Users, 
  ShoppingBag, 
  Clock, 
  CheckCircle2,
  Globe,
  Building2,
  Gauge
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: 'Basic',
    subtitle: 'For solo entrepreneurs',
    startingAt: 'Starting at',
    originalPrice: '$24',
    price: '$1',
    period: 'USD/month',
    promo: 'for first 3 months',
    isPopular: true,
    features: [
      {
        title: 'Card rates starting at',
        value: '2% 3rd-party payment providers'
      },
      {
        icon: MapPin,
        value: '10 inventory locations'
      },
      {
        icon: Clock,
        value: '24/7 chat support'
      },
      {
        icon: Globe,
        value: 'Localized global selling (3 markets)'
      },
      {
        icon: ShoppingBag,
        value: 'POS Lite'
      }
    ]
  },
  {
    name: 'Axova',
    subtitle: 'For small teams',
    startingAt: 'Starting at',
    originalPrice: '$69',
    price: '$1',
    period: 'USD/month',
    promo: 'for first 3 months',
    features: [
      {
        title: 'Card rates starting at',
        value: '1% 3rd-party payment providers'
      },
      {
        icon: MapPin,
        value: '10 inventory locations'
      },
      {
        icon: Clock,
        value: '24/7 chat support'
      },
      {
        icon: Globe,
        value: 'Localized global selling (3 markets)'
      },
      {
        icon: Users,
        value: '5 additional staff accounts'
      },
      {
        icon: ShoppingBag,
        value: 'POS Lite'
      }
    ]
  },
  {
    name: 'Advanced',
    subtitle: 'As your business scales',
    startingAt: 'Starting at',
    originalPrice: '$299',
    price: '$1',
    period: 'USD/month',
    promo: 'for first 3 months',
    features: [
      {
        title: 'Card rates starting at',
        value: '0.6% 3rd-party payment providers'
      },
      {
        icon: MapPin,
        value: '10 inventory locations'
      },
      {
        icon: Clock,
        value: 'Enhanced 24/7 chat support'
      },
      {
        icon: Globe,
        value: 'Localized global selling (3 markets) + add markets for $59 USD/mo each'
      },
      {
        icon: Users,
        value: '15 additional staff accounts'
      },
      {
        icon: ShoppingBag,
        value: '10x checkout capacity'
      },
      {
        icon: Building2,
        value: 'POS Lite'
      }
    ]
  },
  {
    name: 'Plus',
    subtitle: 'For more complex businesses',
    startingAt: 'Starting at',
    price: '$2,300',
    period: 'USD/month',
    features: [
      {
        title: 'Card rates starting at',
        value: '0.2% 3rd-party payment providers'
      },
      {
        icon: MapPin,
        value: '200 inventory locations'
      },
      {
        icon: Clock,
        value: 'Priority 24/7 phone support'
      },
      {
        icon: Globe,
        value: 'Localized global selling (50 markets)'
      },
      {
        icon: Users,
        value: 'Unlimited staff accounts'
      },
      {
        icon: ShoppingBag,
        value: 'Customizable checkout with 40x capacity'
      },
      {
        icon: Building2,
        value: 'Sell wholesale/B2B'
      },
      {
        icon: Building2,
        value: '200 POS Pro locations with Axova Payments'
      }
    ]
  }
];

const commonFeatures = [
  {
    title: 'Best-converting checkout',
    icon: ShoppingBag
  },
  {
    title: 'In-person selling',
    icon: Users
  },
  {
    title: 'Multiple sales channels',
    icon: Building2
  },
  {
    title: 'In-depth analytics',
    icon: Gauge
  }
];

export default function ChoosePlanPage() {
  const router = useRouter();
  
  const regularPlans = plans.slice(0, 3); // Basic, Axova, Advanced
  const plusPlan = plans[3]; // Plus plan

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1200px] mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-12">
          <Button 
            variant="ghost" 
            size="sm"
            className="hover:bg-transparent transition-colors"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Pick your plan
          </Button>
        </div>

        {/* Regular Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {regularPlans.map((plan, index) => (
            <div 
              key={index}
              className={cn(
                "bg-white rounded-lg border border-gray-200 relative",
                "transition-all duration-300 ease-out",
                "hover:border-gray-300",
                "hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]",
                "hover:translate-y-[-4px]",
                plan.isPopular && "ring-1 ring-black ring-opacity-20"
              )}
            >
              {plan.isPopular && (
                <div className="absolute top-4 right-4">
                  <Badge className={cn(
                    "bg-gradient-to-r from-gray-900 to-black",
                    "text-white text-xs font-medium px-3 py-1",
                    "shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
                    "border border-gray-800/20",
                    "rounded-full"
                  )}>
                    Most popular
                  </Badge>
                </div>
              )}
              
              <div className="p-5">
                <h2 className="text-[24px] font-semibold leading-tight mb-1">{plan.name}</h2>
                <p className="text-[15px] text-gray-600">{plan.subtitle}</p>

                <div className="mt-4">
                  <div className="text-[13px] text-gray-600">{plan.startingAt}</div>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    {plan.originalPrice && (
                      <span className="text-base line-through text-gray-400">
                        {plan.originalPrice}
                      </span>
                    )}
                    <span className="text-[32px] font-semibold leading-tight">{plan.price}</span>
                    <span className="text-[15px] text-gray-600">{plan.period}</span>
                  </div>
                  {plan.promo && (
                    <div className="text-[13px] text-gray-600 mt-0.5">{plan.promo}</div>
                  )}
                </div>

                <Button 
                  className={cn(
                    "w-full mt-4 h-10 rounded-md relative overflow-hidden group",
                    "bg-gradient-to-br from-gray-800 via-gray-900 to-black",
                    "hover:from-black hover:via-gray-900 hover:to-gray-800",
                    "shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
                    "transition-all duration-300",
                    "before:absolute before:inset-0",
                    "before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent",
                    "before:translate-x-[-100%] hover:before:translate-x-[100%]",
                    "before:transition-transform before:duration-500 before:ease-out",
                    "text-sm font-medium text-white",
                    "border border-gray-800/20"
                  )}
                  onClick={() => router.push('/settings/plan')}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {`Select ${plan.name}`}
                  </span>
                </Button>

                <div className="mt-5 space-y-4">
                  <div className="pb-3 border-b border-gray-100">
                    <div className="text-sm">Card rates starting at</div>
                    <div className="text-sm text-gray-600 mt-0.5">{plan.features[0].value}</div>
                  </div>

                  <div className="space-y-2.5">
                    {plan.features.slice(1).map((feature, i) => (
                      <div 
                        key={i} 
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        {feature.icon && (
                          <feature.icon className="w-3.5 h-3.5 text-gray-400" />
                        )}
                        <span>{feature.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Plus Plan Card */}
        <div className="mb-16">
          <div 
            className={cn(
              "bg-white rounded-xl border border-gray-200",
              "transition-all duration-300 ease-out",
              "hover:border-gray-300",
              "hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]",
              "hover:translate-y-[-4px]"
            )}
          >
            <div className="p-8">
              <div className="grid md:grid-cols-12 gap-8 items-start">
                {/* Left Column - Plan Info */}
                <div className="md:col-span-3">
                  <h2 className="text-[24px] font-semibold leading-tight">{plusPlan.name}</h2>
                  <p className="text-[15px] text-gray-600 mt-1">{plusPlan.subtitle}</p>
                  
                  <div className="mt-6">
                    <div className="text-[13px] text-gray-600">{plusPlan.startingAt}</div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-[32px] font-semibold leading-tight">
                        {plusPlan.price}
                      </span>
                      <span className="text-[15px] text-gray-600">{plusPlan.period}</span>
                    </div>
                  </div>

                  <Button 
                    className={cn(
                      "w-full mt-6 h-10 rounded-md relative overflow-hidden group",
                      "bg-gradient-to-br from-gray-800 via-gray-900 to-black",
                      "hover:from-black hover:via-gray-900 hover:to-gray-800",
                      "shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
                      "transition-all duration-300",
                      "before:absolute before:inset-0",
                      "before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent",
                      "before:translate-x-[-100%] hover:before:translate-x-[100%]",
                      "before:transition-transform before:duration-500 before:ease-out",
                      "text-sm font-medium text-white",
                      "border border-gray-800/20"
                    )}
                    onClick={() => router.push('/settings/plan')}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Select Plus
                    </span>
                  </Button>
                </div>

                {/* Right Column - Features */}
                <div className="md:col-span-9 grid md:grid-cols-3 gap-8">
                  {/* Card Rates Section */}
                  <div className="space-y-4">
                    <div className="pb-3 border-b">
                      <div className="font-medium">Card rates starting at</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {plusPlan.features[0].value}
                      </div>
                    </div>
                    
                    {/* First Column Features */}
                    <div className="space-y-3.5">
                      {plusPlan.features.slice(1, 4).map((feature, i) => (
                        <div 
                          key={i} 
                          className="flex items-start gap-3 group"
                        >
                          {feature.icon && (
                            <feature.icon className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5 group-hover:text-gray-600 transition-colors" />
                          )}
                          <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                            {feature.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Middle Column Features */}
                  <div className="space-y-3.5 pt-[52px]">
                    {plusPlan.features.slice(4, 7).map((feature, i) => (
                      <div 
                        key={i} 
                        className="flex items-start gap-3 group"
                      >
                        {feature.icon && (
                          <feature.icon className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5 group-hover:text-gray-600 transition-colors" />
                        )}
                        <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                          {feature.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Right Column Features */}
                  <div className="space-y-3.5 pt-[52px]">
                    {plusPlan.features.slice(7).map((feature, i) => (
                      <div 
                        key={i} 
                        className="flex items-start gap-3 group"
                      >
                        {feature.icon && (
                          <feature.icon className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5 group-hover:text-gray-600 transition-colors" />
                        )}
                        <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                          {feature.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Common Features */}
        <div>
          <h2 className="text-lg font-semibold mb-8 text-center">
            What every plan gets you
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {commonFeatures.map((feature, index) => (
              <div 
                key={index}
                className={cn(
                  "bg-white p-6 rounded-xl border border-gray-200",
                  "transition-all duration-300 ease-out",
                  "hover:border-gray-300",
                  "hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]",
                  "hover:translate-y-[-4px]"
                )}
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <feature.icon className="w-6 h-6 text-gray-600" />
                  <p className="font-medium">{feature.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button 
            variant="outline" 
            className={cn(
              "text-sm font-medium",
              "transition-all duration-200",
              "hover:bg-gray-50 hover:border-gray-400"
            )}
          >
            Full list of features
          </Button>
        </div>
      </div>
    </div>
  );
} 