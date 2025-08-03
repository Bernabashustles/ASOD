'use client';

import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { 
  Save, 
  X, 
  ImageIcon, 
  ArrowLeft,
  Plus,
  Trash2,
  Globe,
  Store,
  ChevronDown,
  Info,
  Eye,
  Smartphone,
  HelpCircle,
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageUploadIcon,
  GripVertical,
  Package,
  Truck,
  FileText,
  Languages,
  Search,
  Hash,
  Gift,
  Calendar,
  Clock,
  Sparkles,
  Layers,
  Settings
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";

import {
  ProductHeader,
  ProductDetails,
  MediaUpload,
  PricingForm,
  InventorySection,
  VariantsSection,
  ProductSidebar,
  MobileNavigation,
  ProductPreview,
  LocationDialog,
  AIDescriptionDialog,
  FormData,
  VariantCombination,
  Variant,
  MediaFile,
  mockLocations,
  predefinedVariants
} from './components';

const TiptapEditor = dynamic(() => import('@/components/TiptapEditor'), {
  ssr: false,
  loading: () => (
    <div className="border rounded-md p-4 w-full min-h-[200px] bg-gray-50 animate-pulse" />
  ),
});

// Add this new component for the quantity input
const QuantityInput = ({
  value,
  onChange,
  min = 0,
  max = 999999,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}) => {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const baseButtonClasses = "h-8 w-8 flex items-center justify-center transition-colors";
  const disabledClasses = "text-gray-300 cursor-not-allowed";
  const enabledClasses = "text-gray-600 hover:bg-gray-50";

  return (
    <div className="inline-flex items-center rounded-full border bg-white">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        className={cn(
          baseButtonClasses,
          "rounded-l-full",
          value <= min ? disabledClasses : enabledClasses
        )}
      >
        <span className="sr-only">Decrease</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const newValue = parseInt(e.target.value) || 0;
          if (newValue >= min && newValue <= max) {
            onChange(newValue);
          }
        }}
        className="w-12 h-8 text-center text-sm text-black bg-gray-50 border-x [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max}
        className={cn(
          baseButtonClasses,
          "rounded-r-full",
          value >= max ? disabledClasses : enabledClasses
        )}
      >
        <span className="sr-only">Increase</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};

export default function AddProductPage() {
  // State for UI control
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [showAIDialog, setShowAIDialog] = useState(false);
  const [isStatusExpanded, setIsStatusExpanded] = useState(false);
  const [isSalesChannelsExpanded, setIsSalesChannelsExpanded] = useState(false);
  const [isOrganizationExpanded, setIsOrganizationExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'variants' | 'settings'>('details');

  // Main state
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [selectedPreviewVariant, setSelectedPreviewVariant] = useState<{ [key: string]: string }>({});
  const [variantCombinations, setVariantCombinations] = useState<VariantCombination[]>([]);
  const [salesChannels, setSalesChannels] = useState({
    online: true,
    pos: false
  });
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    price: '',
    compareAtPrice: '',
    sku: '',
    barcode: '',
    quantity: 0,
    trackQuantity: true,
    continueSellingWhenOutOfStock: false,
    requiresShipping: true,
    taxable: true,
    customFields: [],
    countryOfOrigin: '',
    harmonizedSystemCode: '',
    shipping: {
      length: '',
      width: '',
      height: '',
      weight: ''
    },
    giftCard: false,
    templateSuffix: '',
    publishDate: '',
    publishTime: '',
    seoTitle: '',
    seoDescription: '',
    urlHandle: '',
    locations: []
  });

  // Cleanup function for media file previews
  useEffect(() => {
    return () => {
      mediaFiles.forEach(file => {
        URL.revokeObjectURL(file.preview);
      });
    };
  }, [mediaFiles]);

  // Media Handling
  const handleFileChange = (files: FileList | null) => {
    if (!files) return;

    const newFiles: MediaFile[] = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file)
    }));

    setMediaFiles(prev => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (id: string) => {
    setMediaFiles(prev => {
      const filtered = prev.filter(file => file.id !== id);
      const removed = prev.find(file => file.id === id);
      if (removed) {
        URL.revokeObjectURL(removed.preview);
      }
      return filtered;
    });
  };

  const handleDragFile = (dragIndex: number, hoverIndex: number) => {
    const dragFile = mediaFiles[dragIndex];
    const newFiles = [...mediaFiles];
    newFiles.splice(dragIndex, 1);
    newFiles.splice(hoverIndex, 0, dragFile);
    setMediaFiles(newFiles);
  };

  // Variants Handling
  const generateVariantCombinations = (selectedVariants: Variant[]) => {
    const validVariants = selectedVariants.filter(v => v.name && v.values.length > 0);
    
    if (validVariants.length === 0) {
      setVariantCombinations([]);
      return;
    }

    const generateCombos = (variants: Variant[], current: string[] = [], index = 0): string[][] => {
      if (index === variants.length) {
        return [current];
      }

      const variant = variants[index];
      const combinations: string[][] = [];

      variant.values.forEach(value => {
        combinations.push(...generateCombos(variants, [...current, value], index + 1));
      });

      return combinations;
    };

    const combinations = generateCombos(validVariants);
    
    const newCombinations = combinations.map(combo => {
      const title = combo.join(' / ');
      const existingCombo = variantCombinations.find(vc => vc.title === title);

      return existingCombo || {
        id: Math.random().toString(36).substr(2, 9),
        title,
        options: combo,
        price: formData.price,
        compareAtPrice: formData.compareAtPrice,
        sku: '',
        quantity: 0,
        barcode: ''
      };
    });

    setVariantCombinations(newCombinations);
  };

  const handleVariantChange = (name: string, value: string) => {
    setSelectedPreviewVariant(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVariantsChange = (newVariants: Variant[]) => {
    setVariants(newVariants);
    generateVariantCombinations(newVariants);
  };

  // Location Handling
  const handleLocationSelect = (locationId: string, quantity: number) => {
    setFormData(prev => {
      const newLocations = [...prev.locations];
      const existingIndex = newLocations.findIndex(l => l.locationId === locationId);
      
      if (existingIndex >= 0) {
        if (quantity === 0) {
          newLocations.splice(existingIndex, 1);
        } else {
          newLocations[existingIndex].quantity = quantity;
        }
      } else if (quantity > 0) {
        newLocations.push({ locationId, quantity });
      }
      
      return {
        ...prev,
        locations: newLocations
      };
    });
  };

  // Update Form Data
  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="h-full bg-gray-50/50">
      {/* Mobile Navigation */}
      <MobileNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={setIsMobileMenuOpen}
        onOpenPreview={() => setIsPreviewOpen(true)}
      />

      {/* Mobile Settings Sheet */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="bottom" className="h-[80vh] p-0">
          <SheetHeader className="sticky top-0 bg-white border-b p-4">
            <SheetTitle>Product Settings</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto h-full p-4 pb-16 space-y-4">
            <ProductSidebar
              statusValue="draft"
              onStatusChange={() => {}}
              salesChannels={salesChannels}
              onSalesChannelsChange={setSalesChannels}
              giftCard={formData.giftCard}
              onGiftCardChange={(value) => updateFormData('giftCard', value)}
              templateSuffix={formData.templateSuffix}
              onTemplateSuffixChange={(value) => updateFormData('templateSuffix', value)}
              publishDate={formData.publishDate}
              onPublishDateChange={(value) => updateFormData('publishDate', value)}
              publishTime={formData.publishTime}
              onPublishTimeChange={(value) => updateFormData('publishTime', value)}
              isStatusExpanded={isStatusExpanded}
              onStatusExpandToggle={() => setIsStatusExpanded(!isStatusExpanded)}
              isSalesChannelsExpanded={isSalesChannelsExpanded}
              onSalesChannelsExpandToggle={() => setIsSalesChannelsExpanded(!isSalesChannelsExpanded)}
              isOrganizationExpanded={isOrganizationExpanded}
              onOrganizationExpandToggle={() => setIsOrganizationExpanded(!isOrganizationExpanded)}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="pb-[calc(4rem+env(safe-area-inset-bottom))] lg:pb-0">
        {/* Header */}
        <ProductHeader onOpenPreview={() => setIsPreviewOpen(true)} />

        {/* Content */}
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
          <div className="py-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Main Column */}
              <div className="w-full lg:w-[640px] space-y-6">
                {/* Product Details Section */}
                <section id="product-details" className="space-y-6">
                  {/* Title and Description */}
                  <ProductDetails
                    title={formData.title}
                    description={formData.description}
                    onTitleChange={(title) => updateFormData('title', title)}
                    onDescriptionChange={(description) => updateFormData('description', description)}
                    onOpenAIDialog={() => setShowAIDialog(true)}
                  />

                  {/* Media */}
                  <MediaUpload
                    mediaFiles={mediaFiles}
                    onAddFiles={handleFileChange}
                    onRemoveFile={handleRemoveFile}
                    onDragFile={handleDragFile}
                  />

                  {/* Pricing */}
                  <PricingForm
                    price={formData.price}
                    compareAtPrice={formData.compareAtPrice}
                    taxable={formData.taxable}
                    onPriceChange={(price) => updateFormData('price', price)}
                    onCompareAtPriceChange={(price) => updateFormData('compareAtPrice', price)}
                    onTaxableChange={(taxable) => updateFormData('taxable', taxable)}
                  />

                  {/* Inventory */}
                  <InventorySection
                    trackQuantity={formData.trackQuantity}
                    continueSellingWhenOutOfStock={formData.continueSellingWhenOutOfStock}
                    locations={formData.locations}
                    availableLocations={mockLocations}
                    onTrackQuantityChange={(value) => updateFormData('trackQuantity', value)}
                    onContinueSellingChange={(value) => updateFormData('continueSellingWhenOutOfStock', value)}
                    onLocationSelect={handleLocationSelect}
                    onRemoveLocation={(locationId) => {
                      setFormData(prev => ({
                        ...prev,
                        locations: prev.locations.filter(l => l.locationId !== locationId)
                      }));
                    }}
                    onOpenLocationDialog={() => setIsLocationDialogOpen(true)}
                  />
                </section>

                {/* Variants Section */}
                <section id="product-variants" className="space-y-6">
                  <VariantsSection
                    variants={variants}
                    predefinedVariants={predefinedVariants}
                    variantCombinations={variantCombinations}
                    onVariantsChange={handleVariantsChange}
                    onVariantCombinationsChange={setVariantCombinations}
                  />
                </section>

                {/* Custom Fields */}
                <Card className="sm:rounded-lg rounded-none mx-[-1rem] sm:mx-0">
                  <CardHeader className="p-4 pb-0">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Custom information</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          customFields: [...prev.customFields, { id: Math.random().toString(), name: '', value: '' }]
                        }))}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Add field
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {formData.customFields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Input 
                            placeholder="Name"
                            value={field.name}
                            onChange={(e) => {
                              const newFields = [...formData.customFields];
                              newFields[index].name = e.target.value;
                              setFormData(prev => ({ ...prev, customFields: newFields }));
                            }}
                          />
                          <div className="flex gap-2">
                            <Input 
                              placeholder="Value"
                              value={field.value}
                              onChange={(e) => {
                                const newFields = [...formData.customFields];
                                newFields[index].value = e.target.value;
                                setFormData(prev => ({ ...prev, customFields: newFields }));
                              }}
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-10 w-10"
                              onClick={() => {
                                const newFields = formData.customFields.filter(f => f.id !== field.id);
                                setFormData(prev => ({ ...prev, customFields: newFields }));
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* SEO Info */}
                <Card className="sm:rounded-lg rounded-none mx-[-1rem] sm:mx-0">
                  <CardHeader className="p-4 pb-0">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Search engine listing</CardTitle>
                      <Button variant="ghost" size="sm">Edit website SEO</Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    <div className="space-y-2">
                      <Label>Page title</Label>
                      <Input 
                        value={formData.seoTitle}
                        onChange={(e) => updateFormData('seoTitle', e.target.value)}
                        placeholder="Default: Product title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Meta description</Label>
                      <textarea 
                        className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={formData.seoDescription}
                        onChange={(e) => updateFormData('seoDescription', e.target.value)}
                        placeholder="Default: Product description"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>URL handle</Label>
                      <div className="flex gap-2 items-center">
                        <span className="text-gray-500">/products/</span>
                        <Input 
                          value={formData.urlHandle}
                          onChange={(e) => updateFormData('urlHandle', e.target.value)}
                          placeholder="product-handle"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <ProductSidebar
                statusValue="draft"
                onStatusChange={() => {}}
                salesChannels={salesChannels}
                onSalesChannelsChange={setSalesChannels}
                giftCard={formData.giftCard}
                onGiftCardChange={(value) => updateFormData('giftCard', value)}
                templateSuffix={formData.templateSuffix}
                onTemplateSuffixChange={(value) => updateFormData('templateSuffix', value)}
                publishDate={formData.publishDate}
                onPublishDateChange={(value) => updateFormData('publishDate', value)}
                publishTime={formData.publishTime}
                onPublishTimeChange={(value) => updateFormData('publishTime', value)}
                isStatusExpanded={isStatusExpanded}
                onStatusExpandToggle={() => setIsStatusExpanded(!isStatusExpanded)}
                isSalesChannelsExpanded={isSalesChannelsExpanded}
                onSalesChannelsExpandToggle={() => setIsSalesChannelsExpanded(!isSalesChannelsExpanded)}
                isOrganizationExpanded={isOrganizationExpanded}
                onOrganizationExpandToggle={() => setIsOrganizationExpanded(!isOrganizationExpanded)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Product Preview */}
      <ProductPreview 
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title={formData.title}
        price={formData.price}
        compareAtPrice={formData.compareAtPrice}
        description={formData.description}
        variants={variants}
        selectedVariant={selectedPreviewVariant}
        onVariantChange={handleVariantChange}
        mediaFiles={mediaFiles}
        variantCombinations={variantCombinations}
      />

      {/* Location Dialog */}
      <LocationDialog
        isOpen={isLocationDialogOpen}
        onClose={() => setIsLocationDialogOpen(false)}
        onLocationSelect={handleLocationSelect}
        selectedLocations={formData.locations}
        availableLocations={mockLocations}
      />

      {/* AI Dialog */}
      <AIDescriptionDialog
        isOpen={showAIDialog}
        onClose={() => setShowAIDialog(false)}
        onGenerate={(description) => {
          updateFormData('description', description);
          setIsGeneratingDescription(false);
          setShowAIDialog(false);
        }}
        isGenerating={isGeneratingDescription}
      />
    </div>
  );
}