'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'; // Use for tags for now
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// TODO: Replace Input/Textarea with more advanced components later if needed
// import { Combobox } from "@/components/ui/combobox"; // Example
// import { TagInput } from "@/components/ui/tag-input"; // Example

// Define the expected shape for the specific fields this component handles
interface OrganizationData {
    productCategory?: string; // Replaces simple 'type'
    vendor?: string;
    collections?: string[]; // Need a better input component
    tags?: string[]; // Need a better input component
    type?: string; // Keep original type for potential backend compatibility? Or remove?
}

interface OrganizationSectionProps {
  formData: OrganizationData; // Use the specific shape
  onChange: (field: keyof OrganizationData, value: any) => void; // Use keyof specific shape
}

// Dummy data/options (replace with actual data fetching/sources)
const productCategories = [
    'Apparel', 'Apparel > T-Shirts', 'Apparel > Hoodies', 
    'Home Goods', 'Home Goods > Mugs', 
    'Accessories', 'Electronics'
];
const vendors = ['Fashion Co.', 'Home Goods Ltd.', 'Tech Supplies', 'Axova Apparel'];
const collections = ['Summer 2024', 'New Arrivals', 'Sale Items', 'Basics'];

const OrganizationSection: React.FC<OrganizationSectionProps> = ({ formData, onChange }) => {

  // Improved tag handling - uses Textarea, splits/joins on comma
  const handleTagsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const tagsArray = e.target.value
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag);
    onChange('tags', tagsArray);
  };

  // Improved collection handling - uses Textarea, splits/joins on comma
  const handleCollectionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const collectionsArray = e.target.value
      .split(',')
      .map(col => col.trim())
      .filter(col => col);
    onChange('collections', collectionsArray);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center">
          Product organization
           {/* Tooltip removed for cleaner look, can be added back */}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Product Category */}
        <div className="space-y-2">
          <Label htmlFor="product-category">Product category</Label>
          <Input 
            id="product-category"
            value={formData.productCategory || ''}
            onChange={(e) => onChange('productCategory', e.target.value)}
            placeholder="Search for category (e.g., Apparel > T-Shirts)"
            list="product-categories-list" 
          />
          <datalist id="product-categories-list">
            {productCategories.map(cat => <option key={cat} value={cat} />)}
          </datalist>
           <p className="text-xs text-gray-500">Adding a category can help with tax calculations and product discoverability.</p>
        </div>

        {/* Vendor */}
        <div className="space-y-2">
          <Label htmlFor="vendor">Vendor</Label>
          <Input 
            id="vendor"
            value={formData.vendor || ''}
            onChange={(e) => onChange('vendor', e.target.value)}
            placeholder="e.g. Axova Apparel"
            list="vendors-list"
          />
           <datalist id="vendors-list">
             {vendors.map(vendor => <option key={vendor} value={vendor} />)}
          </datalist>
        </div>

        {/* Collections - Using Textarea for now, ideally MultiSelect Combobox */}
        <div className="space-y-2">
          <Label htmlFor="collections">Collections</Label>
          <Textarea
            id="collections"
            value={(formData.collections || []).join(', ')}
            onChange={handleCollectionsChange}
            placeholder="Search or create collections (comma-separated)"
            rows={2}
          />
           {/* TODO: Add a button to browse/manage collections in a modal */}
        </div>

        {/* Tags - Using Textarea for now, ideally TagInput */}
        <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
          <Textarea
            id="tags"
            value={(formData.tags || []).join(', ')}
            onChange={handleTagsChange}
            placeholder="Vintage, cotton, summer (comma-separated)"
            rows={2}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default OrganizationSection; 