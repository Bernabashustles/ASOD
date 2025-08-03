import React from 'react';
import { X, ImageIcon, Store, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Smartphone } from 'lucide-react';
import { MediaFile } from './MediaUpload';
import { Variant } from './VariantsSection';
import { VariantCombination } from './VariantsSection';

interface ProductPreviewProps { 
  isOpen: boolean;
  onClose: () => void;
  title: string;
  price: string;
  compareAtPrice: string;
  description: string;
  variants: Variant[];
  selectedVariant: { [key: string]: string };
  onVariantChange: (name: string, value: string) => void;
  mediaFiles: MediaFile[];
  variantCombinations: VariantCombination[];
}

export const ProductPreview: React.FC<ProductPreviewProps> = ({ 
  isOpen, 
  onClose,
  title,
  price,
  compareAtPrice,
  description,
  variants,
  selectedVariant,
  onVariantChange,
  mediaFiles,
  variantCombinations,
}) => {
  if (!isOpen) return null;

  const sanitizeHTML = (html: string) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  // Find matching variant combination based on selected options
  const matchingCombo = variantCombinations.find(combo => 
    variants.every((variant) => combo.options[variants.indexOf(variant)] === selectedVariant[variant.name])
  );

  const variantPrice = matchingCombo?.price || price;
  const variantComparePrice = matchingCombo?.compareAtPrice || compareAtPrice;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[420px] h-[80vh] p-0">
        <DialogHeader className="sticky top-0 bg-white border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-gray-400" />
              <DialogTitle>Mobile preview</DialogTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>
        <div className="overflow-y-auto h-[calc(80vh-4rem)]">
          <div className="p-4">
            {mediaFiles.length > 0 ? (
              <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img 
                  src={mediaFiles[0].preview} 
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <ImageIcon className="w-8 h-8 text-gray-400" />
              </div>
            )}
            
            <h1 className="text-2xl font-medium text-gray-900 mb-2">
              {title || "Product title"}
            </h1>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-medium text-gray-900">
                ${variantPrice || "0.00"}
              </span>
              {variantComparePrice && (
                <span className="text-lg text-gray-500 line-through">
                  ${variantComparePrice}
                </span>
              )}
            </div>

            {variants.length > 0 && (
              <div className="space-y-4 mb-6">
                {variants.map((variant) => (
                  <div key={variant.id} className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">{variant.name}</label>
                    <Select
                      value={selectedVariant[variant.name] || ''}
                      onValueChange={(value) => onVariantChange(variant.name, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={`Select ${variant.name.toLowerCase()}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {variant.values.map((value) => (
                          <SelectItem key={value} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            )}

            <div className="prose prose-sm mb-6">
              {sanitizeHTML(description) || "No description provided"}
            </div>

            <Button className="w-full">Add to cart</Button>

            <div className="mt-6 space-y-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4" />
                <span>Usually ready in 24 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>Ships worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 