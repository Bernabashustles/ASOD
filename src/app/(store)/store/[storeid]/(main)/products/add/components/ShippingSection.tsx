'use client';

import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Info, Box, Ruler, Earth, Search, Hash, ExternalLink, PlusCircle, PackageSearch } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from '@/components/ui/badge';


interface PackagePreset {
  id: string;
  name: string;
  length: number;
  width: number;
  height: number;
  unit: 'cm' | 'in';
}

// Define the expected shape for the specific fields this component handles
interface ShippingData {
    isPhysicalProduct?: boolean;
    weight?: number;
    weightUnit?: string;
    customsCountryOfOrigin?: string;
    customsHsCode?: string;
    packagePresetId?: string;
    requiresFragileHandling?: boolean;
    shippingCategory?: string; // e.g., Electronics, Apparel, Home Goods
}

interface ShippingSectionProps {
  formData: {
    weight?: number;
    weightUnit?: string;
    customsCountryOfOrigin?: string;
    customsHsCode?: string;
  };
  onChange: (field: string, value: any) => void;
}

const weightUnits = [
  { value: 'kg', label: 'Kilograms (kg)' },
  { value: 'g', label: 'Grams (g)' },
  { value: 'lb', label: 'Pounds (lb)' },
  { value: 'oz', label: 'Ounces (oz)' }
];

// Fetch actual country list - (Simulation)
const countries = [
  { value: 'ET', label: 'Ethiopia' },
  { value: 'US', label: 'United States' },
  { value: 'CN', label: 'China' },
  { value: 'DE', label: 'Germany' },
  { value: 'IN', label: 'India' },
  { value: 'JP', label: 'Japan' },
  // Add more countries
];

// Fetch package presets - (Simulation)
const packagePresets: PackagePreset[] = [
  { id: 'preset_small', name: 'Small Box', length: 20, width: 15, height: 10, unit: 'cm' },
  { id: 'preset_medium', name: 'Medium Box', length: 40, width: 30, height: 20, unit: 'cm' },
  { id: 'preset_large', name: 'Large Box', length: 60, width: 40, height: 30, unit: 'cm' },
  { id: 'preset_envelope', name: 'Padded Envelope', length: 30, width: 20, height: 2, unit: 'cm' },
];

const ShippingSection: React.FC<ShippingSectionProps> = ({ formData, onChange }) => {
  const [countryQuery, setCountryQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);

  // Filter countries based on search query
  useEffect(() => {
    if (countryQuery === '') {
      setFilteredCountries(countries);
    } else {
      setFilteredCountries(
        countries.filter((country) =>
          country.label.toLowerCase().includes(countryQuery.toLowerCase())
        )
      );
    }
  }, [countryQuery]);

  const handleWeightChange = (value: string) => {
     const num = value === '' ? undefined : parseFloat(value);
     if (value === '' || (!isNaN(num) && num >= 0)) {
        onChange('weight', num);
     }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gray-50 border-b px-5 py-4">
        <CardTitle className="text-base font-medium">Shipping</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-5">
        {/* Weight section */}
        <div className="border rounded-md">
          <div className="flex items-center border-b px-4 py-3 bg-gray-50">
            <Ruler className="mr-2 h-4 w-4 text-gray-500" />
            <h3 className="text-sm font-medium">Weight</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="weight" className="text-sm font-medium">Weight</Label>
                <div className="mt-1 relative rounded-md">
                  <Input
                    id="weight"
                    type="text"
                    value={formData.weight?.toString() || ''}
                    onChange={(e) => handleWeightChange(e.target.value)}
                    className="pr-16"
                    placeholder="0.0"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <Select
                      value={formData.weightUnit || 'kg'}
                      onValueChange={(value) => onChange('weightUnit', value)}
                      name="weight-unit"
                    >
                      <SelectTrigger className="h-full border-0 bg-transparent w-16">
                        <SelectValue placeholder="kg" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilograms (kg)</SelectItem>
                        <SelectItem value="g">Grams (g)</SelectItem>
                        <SelectItem value="lb">Pounds (lb)</SelectItem>
                        <SelectItem value="oz">Ounces (oz)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Package dimensions section */}
        <div className="border rounded-md">
          <div className="flex items-center border-b px-4 py-3 bg-gray-50">
            <Box className="mr-2 h-4 w-4 text-gray-500" />
            <h3 className="text-sm font-medium">Package dimensions</h3>
          </div>
          <div className="p-4 space-y-4">
            {/* Default Package section */}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center">
                Default Package
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3.5 w-3.5 ml-1.5 text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent side="top" align="start" className="max-w-[250px] p-3">
                      <p className="text-xs">Select a package preset or enter custom dimensions.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Select defaultValue="custom">
                <SelectTrigger>
                  <SelectValue placeholder="Select package type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small-box">Small Box (20×10×5 cm)</SelectItem>
                  <SelectItem value="medium-box">Medium Box (30×20×15 cm)</SelectItem>
                  <SelectItem value="large-box">Large Box (40×30×20 cm)</SelectItem>
                  <SelectItem value="envelope">Envelope (30×20×2 cm)</SelectItem>
                  <SelectItem value="custom">Custom dimensions</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Package dimensions grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="length" className="text-sm font-medium">Length</Label>
                <div className="mt-1 relative rounded-md">
                  <Input
                    id="length"
                    type="text"
                    placeholder="0.0"
                    className="pr-8"
                  />
                  <div className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 text-sm">
                    cm
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="width" className="text-sm font-medium">Width</Label>
                <div className="mt-1 relative rounded-md">
                  <Input
                    id="width"
                    type="text"
                    placeholder="0.0"
                    className="pr-8"
                  />
                  <div className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 text-sm">
                    cm
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="height" className="text-sm font-medium">Height</Label>
                <div className="mt-1 relative rounded-md">
                  <Input
                    id="height"
                    type="text"
                    placeholder="0.0"
                    className="pr-8"
                  />
                  <div className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 text-sm">
                    cm
                  </div>
                </div>
              </div>
            </div>

            {/* Additional shipping options */}
            <div className="pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="fragile" />
                <Label htmlFor="fragile" className="text-sm font-medium">Requires fragile handling</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shipping-category" className="text-sm font-medium">Shipping Category (Optional)</Label>
              <Input
                id="shipping-category"
                type="text"
                placeholder="e.g., Oversized, Hazardous, Standard"
              />
            </div>
          </div>
        </div>

        {/* Customs information section */}
        <div className="border rounded-md">
          <div className="flex items-center border-b px-4 py-3 bg-gray-50">
            <Earth className="mr-2 h-4 w-4 text-gray-500" />
            <h3 className="text-sm font-medium">Customs information</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="text-sm text-gray-500 mb-2">
              Used by carriers to calculate duties and clear customs. Will appear on your customs forms.
            </div>

            {/* Country of Origin */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country-origin" className="text-sm font-medium">Country/Region of origin</Label>
                <div className="relative">
                  <Input 
                    type="text"
                    placeholder="Search country..."
                    value={countryQuery}
                    onChange={(e) => setCountryQuery(e.target.value)}
                    className="mb-1"
                  />
                  <Select
                    value={formData.customsCountryOfOrigin || ''}
                    onValueChange={(value) => onChange('customsCountryOfOrigin', value)}
                  >
                    <SelectTrigger id="country-origin">
                      <SelectValue placeholder="Select country/region" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredCountries.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-xs text-gray-500">Where the product is manufactured or assembled.</p>
              </div>
              
              {/* HS Code */}
              <div className="space-y-2">
                <Label htmlFor="hs-code" className="text-sm font-medium flex items-center">
                  HS (Harmonized System) code
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 ml-1.5 text-gray-400 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent side="top" align="start" className="max-w-[250px] p-3">
                        <p className="text-xs">Manually enter a code to classify products for customs. Must be 6 digits or more.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    id="hs-code"
                    value={formData.customsHsCode || ''}
                    onChange={(e) => onChange('customsHsCode', e.target.value)} 
                    placeholder="Search or enter code"
                    className="pl-10"
                  />
                </div>
                <Button variant="link" size="sm" className="h-auto p-0 text-xs text-black">
                  Find HS code <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShippingSection; 