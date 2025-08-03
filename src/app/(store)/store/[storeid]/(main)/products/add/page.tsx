'use client';

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Import section components
import GeneralInfoSection from './components/GeneralInfoSection';
import StatusPublishingSection from './components/StatusPublishingSection';
import MediaSection from './components/MediaSection';
import PricingSection from './components/PricingSection';
import InventorySection from './components/InventorySection';
import ShippingSection from './components/ShippingSection';
import VariantsSection from './components/VariantsSection';
import SeoSection from './components/SeoSection';
import OrganizationSection from './components/OrganizationSection';
import ProductFormActions from './components/ProductFormActions';
import ProductPreviewDialog from './components/ProductPreviewDialog';

// --- Interfaces (will be updated as components are enhanced) ---
interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'model';
  size: number;
}

interface LocationQuantity {
  locationId: string;
  locationName: string;
  available: number;
}

interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

interface ProductVariant {
  id: string;
  optionValues: { [optionName: string]: string };
  price?: number;
  sku?: string;
  barcode?: string;
  quantity?: number;
  image?: string;
}
// --- End Interfaces ---

// Updated ProductFormData interface (will evolve)
interface ProductFormData {
  // General Info
  title: string;
  description: string;
  // Status & Publishing
  status: 'active' | 'draft' | 'archived';
  salesChannels: string[];
  markets: string[];
  scheduledAt?: Date | null;
  // Organization
  productCategory?: string; // More specific than 'type'
  type?: string;
  vendor?: string;
  collections?: string[];
  tags?: string[];
  // Media
  media?: MediaFile[];
  // Pricing
  price?: number;
  compareAtPrice?: number;
  chargeTax?: boolean;
  costPerItem?: number;
  // Inventory
  trackQuantity?: boolean;
  sku?: string;
  barcode?: string;
  hasSkuOrBarcode?: boolean;
  continueSellingWhenOutOfStock?: boolean;
  locations?: LocationQuantity[];
   // Shipping
  isPhysicalProduct?: boolean;
  weight?: number;
  weightUnit?: string;
  customsCountryOfOrigin?: string;
  customsHsCode?: string;
  // Variants
  hasVariants?: boolean;
  options?: ProductOption[];
  variants?: ProductVariant[];
  // SEO
  seoTitle?: string;
  seoDescription?: string;
  urlHandle?: string;
}

export default function AddProductPage() {
  const [formData, setFormData] = useState<ProductFormData>({
    // Initialize with sensible defaults reflecting Shopify's state
    title: '',
    description: '',
    status: 'draft',
    salesChannels: [], // Start empty, user selects
    markets: [], // Start empty, user selects
    media: [],
    chargeTax: true,
    trackQuantity: true,
    hasSkuOrBarcode: false,
    isPhysicalProduct: true,
    weightUnit: 'kg',
    hasVariants: false,
    options: [],
    variants: [],
    locations: [], // Populate based on store settings later
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({}); // For validation
  const [showPreview, setShowPreview] = useState(false);

  // Centralized handler (Ensure type safety across components)
  const handleInputChange = <K extends keyof ProductFormData>(field: K, value: ProductFormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user types
    if (formErrors[field as string]) {
       setFormErrors(prev => ({...prev, [field]: ''}));
    }
  };

  // Basic Validation Example
  const validateForm = (): boolean => {
     const errors: { [key: string]: string } = {};
     if (!formData.title.trim()) {
        errors.title = 'Product title is required.';
     }
     // Add more validation rules (description, price, SKU format, etc.)
     setFormErrors(errors);
     return Object.keys(errors).length === 0;
  };

  // Update the handlePreview function to open the preview dialog
  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleSaveDraft = async () => {
     // Set status to draft before saving?
     // const draftData = { ...formData, status: 'draft' };
     setIsSubmitting(true);
     console.log('Saving product as draft (Simulated):', formData);
     await new Promise(resolve => setTimeout(resolve, 1000)); 
     setIsSubmitting(false);
     console.log('Draft saved (Simulated)');
     // Maybe show different notification/redirect?
  };

  const handleSave = async () => {
     // Ensure status is appropriate (e.g., active or draft based on intent)
     // const saveData = { ...formData, status: formData.status === 'archived' ? 'draft' : formData.status };
     if (!validateForm()) {
       console.log("Validation failed:", formErrors);
       return;
    }
    setIsSubmitting(true);
    console.log('Saving product (Published/Active):', formData); 
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    console.log('Product saved (simulated)');
  };

  const handleDiscard = () => {
    console.log('Discarding changes');
    // TODO: Add Shadcn AlertDialog confirmation
    window.history.back(); 
  };

  return (
    // Apply max-width and padding to the main container
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
       <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}> 
         {/* --- Sticky Header --- */}
         <div className="sticky top-0 sm:top-4 z-10 mb-4 sm:mb-6 md:mb-8"> 
            {/* Apply dark border, check padding/height */}
            <div className="bg-white/95 backdrop-blur-sm border border-gray-900 rounded-lg shadow-sm w-full overflow-hidden"> 
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 md:h-14 md:px-5"> 
                     {/* Left side: Back Arrow + Title */} 
                     <div className="flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-0"> 
                         <Link 
                             href="/products" 
                             aria-label="Back to products" 
                             className="p-1.5 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors"
                           >
                             <ArrowLeft className="h-5 w-5" />
                          </Link>
                          {/* Divider */} 
                          <div className="h-5 w-px bg-gray-300 hidden sm:block"></div>
                          <h1 className="text-base font-semibold text-gray-900 tracking-tight">
                            Add product
                          </h1>
                     </div>
                     {/* Right side: Actions */} 
                     <ProductFormActions
                         onPreview={handlePreview}
                         onDiscard={handleDiscard}
                         onSaveDraft={handleSaveDraft}
                         onSave={handleSave}
                         isSubmitting={isSubmitting}
                         canSave={Object.keys(formErrors).length === 0} 
                     />
                 </div>
             </div>
         </div>
         {/* --- End Sticky Header --- */}

         {/* --- Main Content Area --- */}
         <div className="grid grid-cols-1 lg:grid-cols-6 gap-x-8 gap-y-6"> 
             {/* Main Content Sections */} 
             <div className="lg:col-span-4 space-y-6"> {/* Main content takes 4 columns */}
                 <GeneralInfoSection formData={formData} onChange={handleInputChange as any} errors={formErrors} />
                 <MediaSection formData={formData} onChange={handleInputChange as any} />
                 <PricingSection formData={formData} onChange={handleInputChange as any} />
                 <InventorySection formData={formData} onChange={handleInputChange as any} />
                 <ShippingSection formData={formData} onChange={handleInputChange as any} />
                 <VariantsSection formData={formData} onChange={handleInputChange as any} />
                 <SeoSection formData={formData} onChange={handleInputChange as any} />
             </div>

             {/* Sidebar Sections */} 
             <div className="lg:col-span-2 space-y-6"> {/* Sidebar takes 2 columns */} 
                 <StatusPublishingSection formData={formData} onChange={handleInputChange as any} />
                 <OrganizationSection formData={formData} onChange={handleInputChange as any} />
             </div>
         </div>
          {/* --- End Main Content Area --- */}
      </form>

      {/* Product Preview Dialog */}
      <ProductPreviewDialog
        open={showPreview}
        onOpenChange={setShowPreview}
        productData={formData}
      />
    </div>
  );
} 