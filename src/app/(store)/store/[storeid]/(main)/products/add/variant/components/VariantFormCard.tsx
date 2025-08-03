'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Package, ChevronDown, Sparkles } from 'lucide-react';
import BasicInfoForm from './BasicInfoForm';
import AttributesForm from './AttributesForm';
import CustomFieldsForm from './CustomFieldsForm';
import SpecificationsForm from './SpecificationsForm';
import HighlightedFeatures from './HighlightedFeatures';
import MediaUploader from './MediaUploader';
import SalesChannelForm from './SalesChannelForm';
import InventoryManager from './InventoryManager';
import DimensionsInput from './DimensionsInput';

interface VariantData {
  id: string;
  title: string;
  price: number;
  comparePrice: number;
  costPerItem: number;
  sku: string;
  status: 'active' | 'inactive';
  attributes: {
    color: string;
    size: string;
    style: string;
    material: string;
  };
  customFields: {
    [key: string]: string;
  };
  specifications: {
    [key: string]: string;
  };
  highlightedFeatures: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  media: Array<{
    id: string;
    url: string;
    name: string;
  }>;
  salesChannels: {
    pos: {
      inStock: boolean;
      showInCatalog: boolean;
      displayOrder: number;
    };
    onlineStore: {
      inStock: boolean;
      showInCatalog: boolean;
      discount: number;
      discountType: 'percentage' | 'fixed';
    };
    marketplace: {
      enabled: boolean;
    };
  };
  inventory: {
    [locationId: string]: {
      available: number;
      committed: number;
      unavailable: number;
      incoming: number;
      breakdown: {
        damaged: number;
        qc: number;
        reserved: number;
      };
    };
  };
  dimensions: {
    weight: number;
    length: number;
    width: number;
    height: number;
  };
}

interface VariantFormCardProps {
  variantData: VariantData;
  onVariantChange: (data: VariantData) => void;
}

const VariantFormCard: React.FC<VariantFormCardProps> = ({ variantData, onVariantChange }) => {
  const [openSections, setOpenSections] = useState<string[]>(['basic-info']);

  const handleSectionChange = (value: string) => {
    setOpenSections(typeof value === 'string' ? [value] : value);
  };

  const updateVariantData = (field: keyof VariantData, value: any) => {
    onVariantChange({
      ...variantData,
      [field]: value
    });
  };

  const updateNestedField = (section: keyof VariantData, field: string, value: any) => {
    onVariantChange({
      ...variantData,
      [section]: {
        ...variantData[section],
        [field]: value
      }
    });
  };

  const getSectionIcon = (section: string) => {
    switch (section) {
      case 'basic-info': return '📝';
      case 'attributes': return '🧬';
      case 'custom-fields': return '🧩';
      case 'specifications': return '📐';
      case 'features': return '⭐️';
      case 'media': return '🖼';
      case 'sales-channels': return '🛍';
      case 'inventory': return '📦';
      case 'dimensions': return '📏';
      default: return '📄';
    }
  };

  return (
    <Card className="bg-white border-gray-200 shadow-sm">
      <CardHeader className="bg-gray-900 text-white border-b border-gray-800 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/10 rounded-xl">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-white flex items-center space-x-2">
                <span>📦 Variant: "{variantData.title}"</span>
                <Sparkles className="h-4 w-4 text-yellow-300" />
              </CardTitle>
              <div className="flex items-center space-x-3 mt-1">
                <Badge 
                  variant={variantData.status === 'active' ? 'default' : 'secondary'}
                  className="bg-white/20 text-white border-white/30"
                >
                  {variantData.status === 'active' ? '● Active' : '○ Inactive'}
                </Badge>
                <span className="text-gray-300 text-sm">ID: {variantData.id}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="bg-white/10 text-white border-white/30">
              {variantData.media.length} images
            </Badge>
            <Badge variant="outline" className="bg-white/10 text-white border-white/30">
              ${variantData.price}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <Accordion
          type="multiple"
          value={openSections}
          onValueChange={handleSectionChange}
          className="w-full"
        >
          {/* Basic Info Section */}
          <AccordionItem value="basic-info" className="border-b border-gray-100">
            <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 transition-all duration-200">
              <div className="flex items-center space-x-4 w-full">
                <div className="p-2 bg-gray-900 rounded-lg">
                  <span className="text-white text-sm">{getSectionIcon('basic-info')}</span>
                </div>
                <div className="flex items-center justify-between flex-1">
                  <span className="text-lg font-semibold text-gray-900">Basic Info</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      ${variantData.price}
                    </Badge>
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                      {variantData.sku}
                    </Badge>
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 bg-gray-50">
              <BasicInfoForm
                data={variantData}
                onChange={(field, value) => updateVariantData(field, value)}
              />
            </AccordionContent>
          </AccordionItem>

          {/* Variant Attributes Section */}
          <AccordionItem value="attributes" className="border-b border-gray-100">
            <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 transition-all duration-200">
              <div className="flex items-center space-x-4 w-full">
                <div className="p-2 bg-gray-900 rounded-lg">
                  <span className="text-white text-sm">{getSectionIcon('attributes')}</span>
                </div>
                <div className="flex items-center justify-between flex-1">
                  <span className="text-lg font-semibold text-gray-900">Variant Attributes</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      {variantData.attributes.color}
                    </Badge>
                    <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">
                      {variantData.attributes.size}
                    </Badge>
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 bg-gray-50">
              <AttributesForm
                data={variantData.attributes}
                onChange={(field, value) => updateNestedField('attributes', field, value)}
              />
            </AccordionContent>
          </AccordionItem>

          {/* Custom Fields Section */}
          <AccordionItem value="custom-fields" className="border-b border-gray-100">
            <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 transition-all duration-200">
              <div className="flex items-center space-x-4 w-full">
                <div className="p-2 bg-gray-900 rounded-lg">
                  <span className="text-white text-sm">{getSectionIcon('custom-fields')}</span>
                </div>
                <div className="flex items-center justify-between flex-1">
                  <span className="text-lg font-semibold text-gray-900">Custom Fields</span>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    {Object.keys(variantData.customFields).length} fields
                  </Badge>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 bg-gray-50">
              <CustomFieldsForm
                data={variantData.customFields}
                onChange={(value) => updateVariantData('customFields', value)}
              />
            </AccordionContent>
          </AccordionItem>

          {/* Specifications Section */}
          <AccordionItem value="specifications" className="border-b border-gray-100">
            <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 transition-all duration-200">
              <div className="flex items-center space-x-4 w-full">
                <div className="p-2 bg-gray-900 rounded-lg">
                  <span className="text-white text-sm">{getSectionIcon('specifications')}</span>
                </div>
                <div className="flex items-center justify-between flex-1">
                  <span className="text-lg font-semibold text-gray-900">Specifications</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {Object.keys(variantData.specifications).length} specs
                  </Badge>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 bg-gray-50">
              <SpecificationsForm
                data={variantData.specifications}
                onChange={(value) => updateVariantData('specifications', value)}
              />
            </AccordionContent>
          </AccordionItem>

          {/* Highlighted Features Section */}
          <AccordionItem value="features" className="border-b border-gray-100">
            <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 transition-all duration-200">
              <div className="flex items-center space-x-4 w-full">
                <div className="p-2 bg-gray-900 rounded-lg">
                  <span className="text-white text-sm">{getSectionIcon('features')}</span>
                </div>
                <div className="flex items-center justify-between flex-1">
                  <span className="text-lg font-semibold text-gray-900">Highlighted Features</span>
                  <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">
                    {variantData.highlightedFeatures.length} features
                  </Badge>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 bg-gray-50">
              <HighlightedFeatures
                data={variantData.highlightedFeatures}
                onChange={(value) => updateVariantData('highlightedFeatures', value)}
              />
            </AccordionContent>
          </AccordionItem>

          {/* Media Upload Section */}
          <AccordionItem value="media" className="border-b border-gray-100">
            <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 transition-all duration-200">
              <div className="flex items-center space-x-4 w-full">
                <div className="p-2 bg-gray-900 rounded-lg">
                  <span className="text-white text-sm">{getSectionIcon('media')}</span>
                </div>
                <div className="flex items-center justify-between flex-1">
                  <span className="text-lg font-semibold text-gray-900">Media Upload</span>
                  <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                    {variantData.media.length} files
                  </Badge>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 bg-gray-50">
              <MediaUploader
                data={variantData.media}
                onChange={(value) => updateVariantData('media', value)}
              />
            </AccordionContent>
          </AccordionItem>

          {/* Sales Channels Section */}
          <AccordionItem value="sales-channels" className="border-b border-gray-100">
            <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 transition-all duration-200">
              <div className="flex items-center space-x-4 w-full">
                <div className="p-2 bg-gray-900 rounded-lg">
                  <span className="text-white text-sm">{getSectionIcon('sales-channels')}</span>
                </div>
                <div className="flex items-center justify-between flex-1">
                  <span className="text-lg font-semibold text-gray-900">Sales Channels</span>
                  <div className="flex items-center space-x-1">
                    <Badge variant={variantData.salesChannels.pos.inStock ? 'default' : 'secondary'} className="text-xs">
                      POS
                    </Badge>
                    <Badge variant={variantData.salesChannels.onlineStore.inStock ? 'default' : 'secondary'} className="text-xs">
                      Online
                    </Badge>
                    <Badge variant={variantData.salesChannels.marketplace.enabled ? 'default' : 'secondary'} className="text-xs">
                      Marketplace
                    </Badge>
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 bg-gray-50">
              <SalesChannelForm
                data={variantData.salesChannels}
                onChange={(value) => updateVariantData('salesChannels', value)}
              />
            </AccordionContent>
          </AccordionItem>

          {/* Inventory & Stock Section */}
          <AccordionItem value="inventory" className="border-b border-gray-100">
            <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 transition-all duration-200">
              <div className="flex items-center space-x-4 w-full">
                <div className="p-2 bg-gray-900 rounded-lg">
                  <span className="text-white text-sm">{getSectionIcon('inventory')}</span>
                </div>
                <div className="flex items-center justify-between flex-1">
                  <span className="text-lg font-semibold text-gray-900">Inventory & Stock</span>
                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                    {Object.keys(variantData.inventory).length} locations
                  </Badge>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 bg-gray-50">
              <InventoryManager
                data={variantData.inventory}
                onChange={(value) => updateVariantData('inventory', value)}
              />
            </AccordionContent>
          </AccordionItem>

          {/* Dimensions Section */}
          <AccordionItem value="dimensions" className="border-b border-gray-100">
            <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 transition-all duration-200">
              <div className="flex items-center space-x-4 w-full">
                <div className="p-2 bg-gray-900 rounded-lg">
                  <span className="text-white text-sm">{getSectionIcon('dimensions')}</span>
                </div>
                <div className="flex items-center justify-between flex-1">
                  <span className="text-lg font-semibold text-gray-900">Dimensions</span>
                  <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">
                    {variantData.dimensions.weight}kg
                  </Badge>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 bg-gray-50">
              <DimensionsInput
                data={variantData.dimensions}
                onChange={(value) => updateVariantData('dimensions', value)}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Action Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Last saved: {new Date().toLocaleString()}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-sm text-gray-400">
                ──────────────────────────────────────────────
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VariantFormCard; 