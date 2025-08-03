import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface PricingFormProps {
  price: string;
  compareAtPrice: string;
  taxable: boolean;
  onPriceChange: (price: string) => void;
  onCompareAtPriceChange: (price: string) => void;
  onTaxableChange: (taxable: boolean) => void;
}

export const PricingForm: React.FC<PricingFormProps> = ({
  price,
  compareAtPrice,
  taxable,
  onPriceChange,
  onCompareAtPriceChange,
  onTaxableChange
}) => {
  return (
    <Card className="sm:rounded-lg rounded-none mx-[-1rem] sm:mx-0">
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-base">Pricing</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Price</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <Input 
                className="pl-7" 
                placeholder="0.00"
                value={price}
                onChange={(e) => onPriceChange(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Compare at price</Label>
              <HelpCircle className="w-4 h-4 text-gray-400" />
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <Input 
                className="pl-7" 
                placeholder="0.00"
                value={compareAtPrice}
                onChange={(e) => onCompareAtPriceChange(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="tax" 
            checked={taxable}
            onCheckedChange={(checked) => onTaxableChange(checked as boolean)}
          />
          <label
            htmlFor="tax"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Charge tax on this product
          </label>
        </div>
      </CardContent>
    </Card>
  );
}; 