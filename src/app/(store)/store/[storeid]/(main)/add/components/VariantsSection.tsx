import React from 'react';
import { Info, GripVertical, Trash2, Plus, ChevronDown, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface Variant {
  id: string;
  name: string;
  values: string[];
}

export interface PredefinedVariant {
  name: string;
  options: string[];
}

export interface VariantCombination {
  id: string;
  title: string;
  price: string;
  compareAtPrice: string;
  sku: string;
  quantity: number;
  barcode: string;
  options: string[];
}

interface VariantsSectionProps {
  variants: Variant[];
  predefinedVariants: PredefinedVariant[];
  variantCombinations: VariantCombination[];
  onVariantsChange: (variants: Variant[]) => void;
  onVariantCombinationsChange: (combinations: VariantCombination[]) => void;
}

export const VariantsSection: React.FC<VariantsSectionProps> = ({
  variants,
  predefinedVariants,
  variantCombinations,
  onVariantsChange,
  onVariantCombinationsChange
}) => {
  const handleAddVariant = () => {
    const newVariant: Variant = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      values: []
    };
    onVariantsChange([...variants, newVariant]);
  };

  return (
    <Card className="sm:rounded-lg rounded-none mx-[-1rem] sm:mx-0">
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Variants</CardTitle>
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500">Options</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-6">
          {/* Option Selection */}
          <div className="space-y-4">
            {variants.map((variant, index) => (
              <div key={variant.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <GripVertical className="w-4 h-4 text-gray-400" />
                    <Select
                      value={variant.name}
                      onValueChange={(value) => {
                        const newVariants = [...variants];
                        newVariants[index].name = value;
                        newVariants[index].values = [];
                        onVariantsChange(newVariants);
                      }}
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select option name" />
                      </SelectTrigger>
                      <SelectContent>
                        {predefinedVariants.map((option) => (
                          <SelectItem 
                            key={option.name} 
                            value={option.name}
                            disabled={variants.some(v => v.name === option.name && v.id !== variant.id)}
                          >
                            {option.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => {
                      const newVariants = variants.filter(v => v.id !== variant.id);
                      onVariantsChange(newVariants);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                {variant.name && (
                  <div className="pl-7">
                    <Input
                      placeholder={`${variant.name} values (comma-separated)`}
                      defaultValue={variant.values.join(', ')}
                      onBlur={(e) => {
                        const newVariants = [...variants];
                        newVariants[index].values = e.target.value
                          .split(',')
                          .map(v => v.trim())
                          .filter(Boolean);
                        onVariantsChange(newVariants);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.currentTarget.blur();
                        }
                      }}
                    />
                    {variant.values.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {variant.values.map((value, valueIndex) => (
                          <div 
                            key={valueIndex}
                            className="bg-gray-100 px-2 py-1 rounded-md text-sm flex items-center gap-1"
                          >
                            <span>{value}</span>
                            <button
                              onClick={() => {
                                const newVariants = [...variants];
                                newVariants[index].values = newVariants[index].values.filter((_, i) => i !== valueIndex);
                                onVariantsChange(newVariants);
                              }}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            
            {variants.length < 3 && (
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleAddVariant}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add another option
              </Button>
            )}
          </div>

          {/* Preview of combinations */}
          {variantCombinations.length > 0 && (
            <div className="overflow-x-auto -mx-6 px-6">
              <div className="min-w-[600px]">
                <div className="border-t pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Variants</h3>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Edit all prices
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg">
                    <div className="grid grid-cols-[1fr,repeat(4,auto)] gap-4 p-3 bg-gray-50 border-b">
                      <div>Variant</div>
                      <div className="text-right">Price</div>
                      <div className="text-right">Quantity</div>
                      <div>SKU</div>
                      <div className="w-8"></div>
                    </div>
                    <div className="divide-y">
                      {variantCombinations.map((combo) => (
                        <div key={combo.id} className="grid grid-cols-[1fr,repeat(4,auto)] gap-4 p-3 items-center">
                          <div className="flex flex-col">
                            <span className="font-medium">{combo.title}</span>
                            <span className="text-sm text-gray-500">
                              {combo.options.join(' / ')}
                            </span>
                          </div>
                          <div className="relative w-24">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                              $
                            </span>
                            <Input
                              className="pl-7 text-right"
                              placeholder="0.00"
                              value={combo.price}
                              onChange={(e) => {
                                const newCombos = variantCombinations.map(vc =>
                                  vc.id === combo.id ? { ...vc, price: e.target.value } : vc
                                );
                                onVariantCombinationsChange(newCombos);
                              }}
                            />
                          </div>
                          <Input
                            type="number"
                            className="w-24 text-right"
                            value={combo.quantity}
                            onChange={(e) => {
                              const newCombos = variantCombinations.map(vc =>
                                vc.id === combo.id ? { ...vc, quantity: parseInt(e.target.value) || 0 } : vc
                              );
                              onVariantCombinationsChange(newCombos);
                            }}
                          />
                          <Input
                            className="w-32"
                            placeholder="SKU"
                            value={combo.sku}
                            onChange={(e) => {
                              const newCombos = variantCombinations.map(vc =>
                                vc.id === combo.id ? { ...vc, sku: e.target.value } : vc
                              );
                              onVariantCombinationsChange(newCombos);
                            }}
                          />
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ChevronDown className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}; 