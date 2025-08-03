'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Info, Sparkles, Calculator, TrendingUp, DollarSign, PercentIcon, Tag, BadgePercent, ArrowDownRight, ArrowUpRight, Clock } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// Define the expected shape for the specific fields this component handles
interface PricingData {
    price?: number;
    compareAtPrice?: number;
    chargeTax?: boolean;
    costPerItem?: number;
    onSale?: boolean;
    saleEndDate?: string;
}

interface PricingSectionProps {
  formData: PricingData; // Use the specific shape
  onChange: (field: keyof PricingData, value: any) => void; // Use keyof specific shape
}

// Helper function to format currency (adjust as needed)
const formatCurrency = (value?: number) => {
   if (value === undefined || value === null) return 'ETB 0.00';
   return `ETB ${value.toFixed(2)}`;
};

const PricingSection: React.FC<PricingSectionProps> = ({ formData, onChange }) => {
  const [localPrice, setLocalPrice] = useState<string>(formData.price?.toString() || '');
  const [priceRecommendation, setPriceRecommendation] = useState<number | null>(null);
  const [isGeneratingPrice, setIsGeneratingPrice] = useState(false);

  const price = formData.price || 0;
  const costPerItem = formData.costPerItem || 0;
  const compareAtPrice = formData.compareAtPrice || 0;
  const profit = price - costPerItem;
  const margin = price > 0 ? ((profit / price) * 100) : 0;
  const discount = compareAtPrice > 0 ? ((compareAtPrice - price) / compareAtPrice * 100) : 0;
  const isOnSale = formData.onSale ?? false;

  // Handle price change with a small delay to improve UX
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localPrice !== (formData.price?.toString() || '')) {
        handleNumberChange('price', localPrice);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [localPrice]);

  const handleNumberChange = (field: keyof PricingData, value: string) => {
     const num = value === '' ? undefined : parseFloat(value);
     if (value === '' || (!isNaN(num) && num >= 0)) {
        onChange(field, num);
     }
  };

  const generatePriceRecommendation = () => {
    if (!costPerItem) return;
    
    setIsGeneratingPrice(true);
    
    // Simulate AI recommendation
    setTimeout(() => {
      // Simple algorithm: cost + 30-50% margin
      const marginMultiplier = 1 + (Math.random() * 0.2 + 0.3); // Random between 1.3 and 1.5
      const recommended = Math.round(costPerItem * marginMultiplier * 100) / 100;
      setPriceRecommendation(recommended);
      setIsGeneratingPrice(false);
    }, 1500);
  };
  
  const setRecommendedPrice = () => {
    if (priceRecommendation) {
      setLocalPrice(priceRecommendation.toString());
      handleNumberChange('price', priceRecommendation.toString());
    }
  };
  
  const getProfitHealthStatus = () => {
    if (margin < 0) return { color: 'text-red-500', status: 'Loss', icon: <ArrowDownRight className="h-3.5 w-3.5" /> };
    if (margin < 20) return { color: 'text-amber-500', status: 'Low Margin', icon: <ArrowDownRight className="h-3.5 w-3.5" /> };
    if (margin < 40) return { color: 'text-emerald-500', status: 'Good', icon: <ArrowUpRight className="h-3.5 w-3.5" /> };
    return { color: 'text-green-600', status: 'Excellent', icon: <ArrowUpRight className="h-3.5 w-3.5" /> };
  };
  
  const profitStatus = getProfitHealthStatus();

  return (
    <Card className="border-gray-200 shadow-sm hover:shadow transition-shadow duration-200">
      <CardHeader className="pb-3 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-lg font-medium">Pricing</CardTitle>
            <CardDescription className="text-sm text-gray-500 mt-1">
              Set the price and compare-at price
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 font-normal self-start sm:self-auto">
            {formatCurrency(price)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4 sm:pt-6 space-y-4 sm:space-y-5">
        {/* Main Price Input - Always visible on top */}
        <div className="border rounded-md p-3 sm:p-4 space-y-2 sm:space-y-3 bg-white">
          <div className="flex items-center justify-between">
            <Label htmlFor="price" className="flex items-center text-sm font-medium">
              Price
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3 w-3 sm:h-3.5 sm:w-3.5 ml-1 sm:ml-1.5 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-[250px] p-3">
                    <p className="text-xs">The price customers will pay for this product.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            {priceRecommendation && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 px-2 text-[10px] sm:text-xs rounded-sm text-black" 
                onClick={setRecommendedPrice}
              >
                Use {formatCurrency(priceRecommendation).replace('ETB', '')}
              </Button>
            )}
          </div>
          <div className="relative">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-gray-500">ETB</span>
            <Input 
              id="price"
              type="text"
              inputMode="decimal"
              value={localPrice}
              onChange={(e) => setLocalPrice(e.target.value)}
              placeholder="0.00"
              className="pl-9 sm:pl-10 font-medium text-sm sm:text-base py-1.5 sm:py-2"
            />
          </div>
        </div>

        {/* Compare at Price Section */}
        <div className="border rounded-md p-3 sm:p-4 space-y-2 sm:space-y-3 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <Label htmlFor="compare-at-price" className="flex items-center text-sm font-medium">
              Compare-at price
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3 w-3 sm:h-3.5 sm:w-3.5 ml-1 sm:ml-1.5 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-[250px] p-3">
                    <p className="text-xs">To show a reduced price, move the product's original price into Compare at price. Enter a lower value into Price.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <Switch 
                id="sale-switch"
                checked={isOnSale}
                onCheckedChange={(checked) => onChange('onSale', checked)}
              />
              <Label htmlFor="sale-switch" className="text-xs font-normal">On Sale</Label>
            </div>
          </div>
          <div className="relative">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-gray-500">ETB</span>
            <Input 
              id="compare-at-price"
              type="number"
              step="0.01"
              value={formData.compareAtPrice === undefined ? '' : formData.compareAtPrice}
              onChange={(e) => handleNumberChange('compareAtPrice', e.target.value)}
              placeholder="0.00"
              className={`pl-9 sm:pl-10 text-sm py-1.5 sm:py-2 ${isOnSale ? 'border-gray-300' : 'border-gray-200 bg-gray-50 text-gray-400'}`}
              disabled={!isOnSale}
            />
            {isOnSale && discount > 0 && (
              <Badge className="absolute top-1/2 right-3 -translate-y-1/2 bg-red-100 text-red-700 border-red-200 text-[10px] sm:text-xs">
                -{Math.round(discount)}% OFF
              </Badge>
            )}
          </div>
          
          {isOnSale && (
            <div className="pt-1 flex items-center gap-1.5 sm:gap-2">
              <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gray-500" />
              <input 
                type="date"
                placeholder="Sale end date"
                className="text-[10px] sm:text-xs text-gray-500 bg-transparent border-0 p-0"
                onChange={(e) => onChange('saleEndDate', e.target.value)}
                value={formData.saleEndDate || ''}
              />
            </div>
          )}
        </div>

        {/* Profit Calculator - Always visible */}
        <div className="border rounded-md p-3 sm:p-4 space-y-2 sm:space-y-3 bg-gray-50/50">
          <h3 className="text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2">
            <Calculator className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-700" />
            Profit Calculator
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="space-y-1.5 sm:space-y-2 col-span-1 sm:col-span-1">
              <Label htmlFor="cost-per-item" className="flex items-center text-[10px] sm:text-xs text-gray-600">
                Cost per item
              </Label>
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] sm:text-xs text-gray-500">ETB</span>
                <Input 
                  id="cost-per-item"
                  type="number"
                  step="0.01"
                  value={formData.costPerItem === undefined ? '' : formData.costPerItem}
                  onChange={(e) => handleNumberChange('costPerItem', e.target.value)}
                  placeholder="0.00"
                  className="pl-8 sm:pl-10 h-7 sm:h-8 text-xs sm:text-sm"
                />
              </div>
            </div>
            
            <div className="col-span-1 sm:col-span-2 grid grid-cols-2 gap-2 sm:gap-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-gray-600 flex items-center gap-1">
                    <DollarSign className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    Profit
                  </span>
                  <span className={profit < 0 ? 'text-red-600 font-medium' : 'font-medium'}>
                    {formatCurrency(profit)}
                  </span>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-gray-600 flex items-center gap-1">
                    <PercentIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    Margin
                  </span>
                  <span className={`font-medium flex items-center gap-1 ${profitStatus.color}`}>
                    {profitStatus.icon}
                    {margin.toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="col-span-1 sm:col-span-3">
              <div className="h-1.5 sm:h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${
                    margin < 0 ? 'bg-red-500' : 
                    margin < 20 ? 'bg-amber-500' : 
                    margin < 40 ? 'bg-emerald-500' : 'bg-green-600'
                  }`}
                  style={{ width: `${Math.min(margin, 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[9px] sm:text-xs mt-1">
                <span>0%</span>
                <p className="text-[9px] sm:text-xs text-gray-500">{profitStatus.status} margin</p>
                <span>100%</span>
              </div>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full gap-1 sm:gap-1.5 text-[10px] sm:text-xs flex items-center justify-center border-gray-300 mt-1 sm:mt-2 h-7 sm:h-8"
            onClick={generatePriceRecommendation}
            disabled={isGeneratingPrice || !costPerItem}
          >
            {isGeneratingPrice ? (
              <>
                <span className="animate-spin">⟳</span>
                Calculating...
              </>
            ) : (
              <>
                <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                Suggest optimal price
              </>
            )}
          </Button>
        </div>

        {/* Tax Option - Always visible */}
        <div className="border rounded-md p-3 sm:p-4 bg-white flex items-center justify-between">
          <Label htmlFor="charge-tax" className="font-normal text-xs sm:text-sm">
            Charge tax on this product
          </Label>
          <Checkbox 
            id="charge-tax"
            checked={formData.chargeTax ?? true}
            onCheckedChange={(checked) => onChange('chargeTax', !!checked)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingSection; 