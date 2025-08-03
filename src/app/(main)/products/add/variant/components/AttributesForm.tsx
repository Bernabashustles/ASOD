'use client';

import { useState, useEffect, useMemo } from 'react';
import { 
  Plus, Trash2, Settings, Grid, Search, Wand2, CheckCircle, Package, DollarSign, 
  AlertTriangle, Edit, Eye, Copy, MoreHorizontal, Filter, Download, Upload,
  BarChart3, TrendingUp, Percent, Hash, Image, Tag, Box
} from 'lucide-react';
import VariantDetailModal from './VariantDetailModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface VariantAttribute {
  id: string;
  name: string;
  type: 'text' | 'color' | 'size' | 'material' | 'custom';
  values: VariantAttributeValue[];
  required: boolean;
  displayOrder: number;
}

interface VariantAttributeValue {
  id: string;
  value: string;
  colorCode?: string;
  priceModifier?: number;
  description?: string;
  image?: string;
}

interface VariantCombination {
  id: string;
  attributes: Record<string, string>;
  title: string;
  sku: string;
  price: number;
  comparePrice: number;
  cost: number;
  weight: number;
  inventory: number;
  barcode: string;
  images: string[];
  active: boolean;
  trackQuantity: boolean;
  continueSellingWhenOutOfStock: boolean;
  requiresShipping: boolean;
  taxable: boolean;
  metafields: Record<string, any>;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: 'in' | 'cm';
  };
  salesChannels?: {
    online: boolean;
    pos: boolean;
    marketplace: boolean;
    wholesale: boolean;
  };
  inventoryPolicy?: {
    lowStockThreshold: number;
    reorderPoint: number;
    maxStock: number;
  };
}

export default function AttributesForm({ data, onChange }: { data: any; onChange: (data: any) => void }) {
  // Core State
  const [attributes, setAttributes] = useState<VariantAttribute[]>([]);
  const [combinations, setCombinations] = useState<VariantCombination[]>([]);
  const [selectedCombinations, setSelectedCombinations] = useState<string[]>([]);

  // UI State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [showBulkEdit, setShowBulkEdit] = useState(false);
  const [currentTab, setCurrentTab] = useState('options');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Modal State
  const [selectedVariant, setSelectedVariant] = useState<VariantCombination | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Bulk edit state
  const [bulkEditData, setBulkEditData] = useState({
    price: '',
    comparePrice: '',
    cost: '',
    inventory: '',
    weight: '',
    active: null as boolean | null
  });

  // Helper functions
  const addAttribute = () => {
    const newAttribute: VariantAttribute = {
      id: Date.now().toString(),
      name: '',
      type: 'text',
      values: [],
      required: true,
      displayOrder: attributes.length + 1
    };
    setAttributes([...attributes, newAttribute]);
  };

  const removeAttribute = (id: string) => {
    setAttributes(attributes.filter(attr => attr.id !== id));
    // Regenerate combinations (but don't redirect)
    setTimeout(() => generateCombinations(false), 100);
  };

  const updateAttribute = (id: string, field: keyof VariantAttribute, value: any) => {
    setAttributes(attributes.map(attr => 
      attr.id === id ? { ...attr, [field]: value } : attr
    ));
    // Auto-regenerate combinations when attribute name changes (but don't redirect)
    if (field === 'name') {
      setTimeout(() => generateCombinations(false), 100);
    }
  };

  const addValueToAttribute = (attributeId: string, value: string) => {
    if (!value.trim()) return;
    
    const newValue: VariantAttributeValue = {
      id: Date.now().toString() + Math.random(),
      value: value.trim(),
      colorCode: '#000000',
      priceModifier: 0,
      description: ''
    };
    
    setAttributes(attributes.map(attr => 
      attr.id === attributeId 
        ? { ...attr, values: [...attr.values, newValue] }
        : attr
    ));
    
    // Auto-regenerate combinations when values are added (but don't redirect)
    setTimeout(() => generateCombinations(false), 100);
  };

  const removeValueFromAttribute = (attributeId: string, valueId: string) => {
    setAttributes(attributes.map(attr => 
      attr.id === attributeId 
        ? { ...attr, values: attr.values.filter(val => val.id !== valueId) }
        : attr
    ));
    // Regenerate combinations (but don't redirect)
    setTimeout(() => generateCombinations(false), 100);
  };

  const updateAttributeValue = (attributeId: string, valueId: string, field: keyof VariantAttributeValue, value: any) => {
    setAttributes(attributes.map(attr => 
      attr.id === attributeId 
        ? {
            ...attr,
            values: attr.values.map(val => 
              val.id === valueId ? { ...val, [field]: value } : val
            )
          }
        : attr
    ));
    
    // Auto-regenerate combinations when value name changes (but don't redirect)
    if (field === 'value') {
      setTimeout(() => generateCombinations(false), 100);
    }
  };

  // Generate combinations
  const generateCombinations = (isManualGeneration = false) => {
    setIsGenerating(true);
    
    const validAttributes = attributes.filter(attr => attr.name.trim() && attr.values.length > 0);
    if (validAttributes.length === 0) {
      setCombinations([]);
      setIsGenerating(false);
      return;
    }

    const generateCombos = (attrs: VariantAttribute[], index = 0, current: Record<string, string> = {}): Record<string, string>[] => {
      if (index === attrs.length) {
        return [current];
      }
      
      const results: Record<string, string>[] = [];
      const currentAttr = attrs[index];
      
      for (const value of currentAttr.values) {
        results.push(...generateCombos(attrs, index + 1, {
          ...current,
          [currentAttr.name]: value.value
        }));
      }
      return results;
    };

    const combos = generateCombos(validAttributes.sort((a, b) => a.displayOrder - b.displayOrder));
    const newCombinations: VariantCombination[] = combos.map((combo, index) => {
      const skuParts = Object.values(combo).join('-').toUpperCase().replace(/\s+/g, '-');
      const title = Object.values(combo).join(' / ');
      
      // Calculate price modifiers
      let totalPriceModifier = 0;
      Object.entries(combo).forEach(([attrName, attrValue]) => {
        const attr = attributes.find(a => a.name === attrName);
        const value = attr?.values.find(v => v.value === attrValue);
        if (value?.priceModifier) {
          totalPriceModifier += value.priceModifier;
        }
      });

      return {
        id: (Date.now() + index).toString(),
        attributes: combo,
        title,
        sku: `VAR-${skuParts}`,
        price: 29.99 + totalPriceModifier,
        comparePrice: (29.99 + totalPriceModifier) * 1.25,
        cost: (29.99 + totalPriceModifier) * 0.6,
        weight: 0.5,
        inventory: 100,
        barcode: '',
        images: [],
        active: true,
        trackQuantity: true,
        continueSellingWhenOutOfStock: false,
        requiresShipping: true,
        taxable: true,
        metafields: {},
        dimensions: {
          length: 0,
          width: 0,
          height: 0,
          unit: 'in' as const
        },
        salesChannels: {
          online: true,
          pos: true,
          marketplace: false,
          wholesale: false
        },
        inventoryPolicy: {
          lowStockThreshold: 10,
          reorderPoint: 20,
          maxStock: 1000
        }
      };
    });

    setCombinations(newCombinations);
    setIsGenerating(false);
    
    // Only show success message and redirect if this was a manual generation
    if (newCombinations.length > 0 && isManualGeneration) {
      setShowSuccessMessage(true);
      // Auto-switch to variants tab after a short delay
      setTimeout(() => {
        setCurrentTab('variants');
        // Hide success message after 3 seconds
        setTimeout(() => setShowSuccessMessage(false), 3000);
      }, 500);
    }
  };

  const toggleCombinationSelection = (id: string) => {
    setSelectedCombinations(prev =>
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const selectAllCombinations = () => {
    if (selectedCombinations.length === filteredCombinations.length) {
      setSelectedCombinations([]);
    } else {
      setSelectedCombinations(filteredCombinations.map(c => c.id));
    }
  };

  const updateCombination = (id: string, field: keyof VariantCombination, value: any) => {
    setCombinations(combinations.map(combo =>
      combo.id === id ? { ...combo, [field]: value } : combo
    ));
  };

  const duplicateCombination = (id: string) => {
    const original = combinations.find(c => c.id === id);
    if (!original) return;

    const duplicate: VariantCombination = {
      ...original,
      id: Date.now().toString(),
      sku: original.sku + '-COPY',
      title: original.title + ' (Copy)'
    };

    setCombinations([...combinations, duplicate]);
  };

  const deleteCombination = (id: string) => {
    setCombinations(combinations.filter(c => c.id !== id));
    setSelectedCombinations(prev => prev.filter(cId => cId !== id));
  };

  const openVariantModal = (variant: VariantCombination) => {
    console.log('Opening modal for variant:', variant);
    setSelectedVariant(variant);
    setIsModalOpen(true);
  };

  const handleVariantSave = (updatedVariant: VariantCombination) => {
    setCombinations(combinations.map(combo =>
      combo.id === updatedVariant.id ? updatedVariant : combo
    ));
  };

  // Bulk operations
  const applyBulkEdit = () => {
    setCombinations(prev => prev.map(combo => {
      if (!selectedCombinations.includes(combo.id)) return combo;

      const updated = { ...combo };
      
      if (bulkEditData.price) updated.price = parseFloat(bulkEditData.price);
      if (bulkEditData.comparePrice) updated.comparePrice = parseFloat(bulkEditData.comparePrice);
      if (bulkEditData.cost) updated.cost = parseFloat(bulkEditData.cost);
      if (bulkEditData.inventory) updated.inventory = parseInt(bulkEditData.inventory);
      if (bulkEditData.weight) updated.weight = parseFloat(bulkEditData.weight);
      if (bulkEditData.active !== null) updated.active = bulkEditData.active;

      return updated;
    }));

    setBulkEditData({ price: '', comparePrice: '', cost: '', inventory: '', weight: '', active: null });
    setShowBulkEdit(false);
    setSelectedCombinations([]);
  };

  const filteredCombinations = useMemo(() => {
    return combinations.filter(combo => {
      const matchesSearch = 
        combo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        combo.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    Object.values(combo.attributes).some(value =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesStatus = 
        filterStatus === 'all' || 
        (filterStatus === 'active' && combo.active) ||
        (filterStatus === 'inactive' && !combo.active);

      return matchesSearch && matchesStatus;
    });
  }, [combinations, searchTerm, filterStatus]);

  const stats = {
    totalVariants: combinations.length,
    activeVariants: combinations.filter(c => c.active).length,
    inactiveVariants: combinations.filter(c => !c.active).length,
    avgPrice: combinations.reduce((sum, c) => sum + c.price, 0) / (combinations.length || 1),
    totalInventory: combinations.reduce((sum, c) => sum + c.inventory, 0),
    lowStockCount: combinations.filter(c => c.inventory < 10).length
  };

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {showSuccessMessage && (
        <Alert className="border-green-200 bg-green-50/80">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800 font-medium">
            Successfully generated {combinations.length} variants! Switched to variants tab for management.
          </AlertDescription>
        </Alert>
      )}

      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-900">Product Variants</h2>
          <p className="text-slate-600">Configure product options and manage variants with precision</p>
        </div>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-slate-100/80 h-12">
          <TabsTrigger 
            value="options" 
            className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm font-medium transition-all duration-200"
          >
            <Settings className="h-4 w-4 mr-2" />
            Variant Options ({attributes.length})
          </TabsTrigger>
          <TabsTrigger 
            value="variants" 
            className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm font-medium transition-all duration-200"
          >
            <Grid className="h-4 w-4 mr-2" />
            Variants ({combinations.length})
          </TabsTrigger>
        </TabsList>

        {/* Enhanced Variant Options Tab */}
        <TabsContent value="options" className="space-y-6">
          <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl font-bold text-slate-900">Variant Options</CardTitle>
                  <p className="text-slate-600 text-sm">Add options like size or color that create variants</p>
                  {attributes.length > 0 && (
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                        {attributes.reduce((acc, attr) => acc * Math.max(attr.values.length, 1), 1)} variants will be generated
                      </Badge>
                      {combinations.length > 0 && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                          {combinations.length} variants created
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
                <Button 
                  onClick={addAttribute} 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm transition-all duration-200"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Option
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {attributes.map((attribute, index) => (
                <Card key={attribute.id} className="border-0 shadow-sm bg-slate-50/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    {/* Enhanced Option Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-700 text-white rounded-lg flex items-center justify-center text-sm font-bold shadow-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-semibold text-slate-700">Option name</Label>
                            <Input
                              value={attribute.name}
                              onChange={(e) => updateAttribute(attribute.id, 'name', e.target.value)}
                              placeholder="Size, Color, Material, etc."
                              className="mt-2 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-colors"
                            />
                          </div>
                          <div>
                            <Label className="text-sm font-semibold text-slate-700">Option type</Label>
                            <Select 
                              value={attribute.type} 
                              onValueChange={(value) => updateAttribute(attribute.id, 'type', value)}
                            >
                              <SelectTrigger className="mt-2 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="text">Text</SelectItem>
                                <SelectItem value="color">Color</SelectItem>
                                <SelectItem value="size">Size</SelectItem>
                                <SelectItem value="material">Material</SelectItem>
                                <SelectItem value="custom">Custom</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttribute(attribute.id)}
                        className="text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Enhanced Option Values */}
                    <div>
                      <Label className="text-sm font-semibold text-slate-700 mb-4 block">Option values</Label>
                      <div className="space-y-3">
                        {attribute.values.map((value) => (
                          <div key={value.id} className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            {attribute.type === 'color' && (
                              <div className="flex items-center space-x-2">
                                <input
                                  type="color"
                                  value={value.colorCode || '#000000'}
                                  onChange={(e) => updateAttributeValue(attribute.id, value.id, 'colorCode', e.target.value)}
                                  className="w-8 h-8 rounded-lg border border-slate-200 shadow-sm"
                                />
                                <Input
                                  value={value.colorCode || ''}
                                  onChange={(e) => updateAttributeValue(attribute.id, value.id, 'colorCode', e.target.value)}
                                  placeholder="#000000"
                                  className="w-24 text-xs bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                                />
                              </div>
                            )}
                            <Input
                              value={value.value}
                              onChange={(e) => updateAttributeValue(attribute.id, value.id, 'value', e.target.value)}
                              placeholder="Value name"
                              className="flex-1 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                            />
                            <Input
                              type="number"
                              value={value.priceModifier || 0}
                              onChange={(e) => updateAttributeValue(attribute.id, value.id, 'priceModifier', parseFloat(e.target.value) || 0)}
                              placeholder="Price adjustment"
                              className="w-32 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                              step="0.01"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeValueFromAttribute(attribute.id, value.id)}
                              className="text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                        
                        {/* Enhanced Add Value Input */}
                        <div className="flex items-center space-x-3 p-4 border-2 border-dashed border-slate-300 rounded-xl hover:border-slate-400 transition-colors">
                          <Input
                            placeholder="Add another value..."
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                addValueToAttribute(attribute.id, e.currentTarget.value);
                                e.currentTarget.value = '';
                              }
                            }}
                            className="flex-1 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const input = document.querySelector(`input[placeholder="Add another value..."]`) as HTMLInputElement;
                              if (input && input.value.trim()) {
                                addValueToAttribute(attribute.id, input.value);
                                input.value = '';
                              }
                            }}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {/* Enhanced Empty State */}
              {attributes.length === 0 && (
                <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm">
                  <CardContent className="p-12 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">No variant options yet</h3>
                    <p className="text-slate-600 mb-6">Start by adding your first variant option like size, color, or material.</p>
                    <Button 
                      onClick={addAttribute}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm transition-all duration-200"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Option
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Generate Combinations Section */}
              {attributes.length > 0 && (
                <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-semibold text-green-900">Generate Variants</h4>
                        <p className="text-sm text-green-700">
                          Create all possible combinations from your options ({attributes.reduce((acc, attr) => acc * Math.max(attr.values.length, 1), 1)} variants will be created)
                        </p>
                      </div>
                      <Button 
                        onClick={() => generateCombinations(true)}
                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-sm transition-all duration-200"
                        disabled={attributes.some(attr => attr.values.length === 0) || isGenerating}
                      >
                        {isGenerating ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Generating...
                          </>
                        ) : (
                          <>
                            <Wand2 className="h-4 w-4 mr-2" />
                            Generate {attributes.reduce((acc, attr) => acc * Math.max(attr.values.length, 1), 1)} Variants
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enhanced Variants Tab */}
        <TabsContent value="variants" className="space-y-6">
          <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl font-bold text-slate-900">Generated Variants</CardTitle>
                  <p className="text-slate-600 text-sm">Manage individual variant details and settings</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button 
                    onClick={() => generateCombinations(true)}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-sm transition-all duration-200"
                    disabled={attributes.some(attr => attr.values.length === 0) || isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="h-4 w-4 mr-2" />
                        Generate {attributes.reduce((acc, attr) => acc * Math.max(attr.values.length, 1), 1)} Variants
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Enhanced Search and Filters */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search variants..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Variants</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center bg-slate-100/80 rounded-lg p-1">
                    <Button
                      variant={viewMode === 'table' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('table')}
                      className={viewMode === 'table' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'cards' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('cards')}
                      className={viewMode === 'cards' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}
                    >
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Enhanced Bulk Actions */}
              {selectedCombinations.length > 0 && (
                <Alert className="mb-6 border-blue-200 bg-blue-50/80">
                  <Package className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="flex items-center justify-between">
                    <span className="font-medium text-blue-900">{selectedCombinations.length} variants selected</span>
                    <div className="flex space-x-2">
                      <Dialog open={showBulkEdit} onOpenChange={setShowBulkEdit}>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                            <Edit className="h-3 w-3 mr-1" />
                            Bulk Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Bulk Edit Variants</DialogTitle>
                            <DialogDescription>
                              Update {selectedCombinations.length} selected variants
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label className="text-sm font-medium text-slate-700">Price</Label>
                                <Input
                                  type="number"
                                  value={bulkEditData.price}
                                  onChange={(e) => setBulkEditData({...bulkEditData, price: e.target.value})}
                                  placeholder="29.99"
                                  step="0.01"
                                  className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                                />
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-slate-700">Compare Price</Label>
                                <Input
                                  type="number"
                                  value={bulkEditData.comparePrice}
                                  onChange={(e) => setBulkEditData({...bulkEditData, comparePrice: e.target.value})}
                                  placeholder="39.99"
                                  step="0.01"
                                  className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                                />
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-slate-700">Cost</Label>
                                <Input
                                  type="number"
                                  value={bulkEditData.cost}
                                  onChange={(e) => setBulkEditData({...bulkEditData, cost: e.target.value})}
                                  placeholder="15.99"
                                  step="0.01"
                                  className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                                />
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-slate-700">Inventory</Label>
                                <Input
                                  type="number"
                                  value={bulkEditData.inventory}
                                  onChange={(e) => setBulkEditData({...bulkEditData, inventory: e.target.value})}
                                  placeholder="100"
                                  className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                                />
                              </div>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-slate-700">Weight (kg)</Label>
                              <Input
                                type="number"
                                value={bulkEditData.weight}
                                onChange={(e) => setBulkEditData({...bulkEditData, weight: e.target.value})}
                                placeholder="0.5"
                                step="0.1"
                                className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                              />
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                checked={bulkEditData.active === true}
                                onCheckedChange={(checked) => setBulkEditData({...bulkEditData, active: checked ? true : null})}
                              />
                              <Label className="text-sm text-slate-700">Set all variants active</Label>
                            </div>
                            <div className="flex space-x-2 pt-4">
                              <Button 
                                onClick={applyBulkEdit} 
                                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm transition-all duration-200"
                              >
                                Apply Changes
                              </Button>
                              <Button 
                                variant="outline" 
                                onClick={() => setShowBulkEdit(false)} 
                                className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                        <Download className="h-3 w-3 mr-1" />
                        Export
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {/* Enhanced Variants Display */}
              {viewMode === 'table' && (
                <div className="border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50/80 border-b border-slate-200">
                        <tr>
                          <th className="w-12 p-3 text-left">
                            <Checkbox
                              checked={selectedCombinations.length === filteredCombinations.length && filteredCombinations.length > 0}
                              onCheckedChange={selectAllCombinations}
                            />
                          </th>
                          <th className="p-3 text-left text-sm font-semibold text-slate-700">Variant</th>
                          <th className="p-3 text-left text-sm font-semibold text-slate-700">SKU</th>
                          <th className="p-3 text-left text-sm font-semibold text-slate-700">Price</th>
                          <th className="p-3 text-left text-sm font-semibold text-slate-700">Inventory</th>
                          <th className="p-3 text-left text-sm font-semibold text-slate-700">Status</th>
                          <th className="w-20 p-3 text-left text-sm font-semibold text-slate-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-200">
                        {filteredCombinations.map((combination) => (
                          <tr key={combination.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-3">
                              <Checkbox
                                checked={selectedCombinations.includes(combination.id)}
                                onCheckedChange={() => toggleCombinationSelection(combination.id)}
                              />
                            </td>
                            <td className="p-3">
                              <div className="space-y-1">
                                <div className="font-semibold text-slate-900">{combination.title}</div>
                                <div className="flex flex-wrap gap-1">
                                  {Object.entries(combination.attributes).map(([key, value]) => (
                                    <Badge key={key} variant="outline" className="text-xs bg-slate-100 text-slate-700 border-slate-200">
                                      {key}: {value}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </td>
                            <td className="p-3">
                              <Input
                                value={combination.sku}
                                onChange={(e) => updateCombination(combination.id, 'sku', e.target.value)}
                                className="w-32 text-sm bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                              />
                            </td>
                            <td className="p-3">
                              <div className="space-y-1">
                                <Input
                                  type="number"
                                  value={combination.price}
                                  onChange={(e) => updateCombination(combination.id, 'price', parseFloat(e.target.value) || 0)}
                                  className="w-24 text-sm bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                                  step="0.01"
                                />
                                {combination.comparePrice > combination.price && (
                                  <div className="text-xs text-slate-500 line-through">
                                    ${combination.comparePrice.toFixed(2)}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="p-3">
                              <Input
                                type="number"
                                value={combination.inventory}
                                onChange={(e) => updateCombination(combination.id, 'inventory', parseInt(e.target.value) || 0)}
                                className="w-20 text-sm bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                              />
                            </td>
                            <td className="p-3">
                              <Switch
                                checked={combination.active}
                                onCheckedChange={(checked) => updateCombination(combination.id, 'active', checked)}
                              />
                            </td>
                            <td className="p-3">
                              <div className="flex items-center space-x-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => openVariantModal(combination)}
                                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                                >
                                  <Settings className="h-3 w-3" />
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900 hover:bg-slate-50">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="border-slate-200">
                                    <DropdownMenuItem onClick={() => duplicateCombination(combination.id)} className="text-slate-700">
                                      <Copy className="h-3 w-3 mr-2" />
                                      Duplicate
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-slate-700">
                                      <Eye className="h-3 w-3 mr-2" />
                                      Preview
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem 
                                      onClick={() => deleteCombination(combination.id)}
                                      className="text-red-600 focus:text-red-700 focus:bg-red-50"
                                    >
                                      <Trash2 className="h-3 w-3 mr-2" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Enhanced Card View */}
              {viewMode === 'cards' && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredCombinations.map((combination) => (
                    <Card key={combination.id} className="border-0 shadow-sm bg-white/60 backdrop-blur-sm hover:shadow-md transition-all duration-200">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={selectedCombinations.includes(combination.id)}
                              onCheckedChange={() => toggleCombinationSelection(combination.id)}
                            />
                            <Badge 
                              variant={combination.active ? 'default' : 'secondary'} 
                              className={`text-xs ${combination.active ? 'bg-green-100 text-green-700 border-green-200' : 'bg-slate-100 text-slate-700 border-slate-200'}`}
                            >
                              {combination.active ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900 hover:bg-slate-50">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="border-slate-200">
                              <DropdownMenuItem onClick={() => duplicateCombination(combination.id)} className="text-slate-700">
                                <Copy className="h-3 w-3 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-slate-700">
                                <Eye className="h-3 w-3 mr-2" />
                                Preview
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => deleteCombination(combination.id)}
                                className="text-red-600 focus:text-red-700 focus:bg-red-50"
                              >
                                <Trash2 className="h-3 w-3 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-1">{combination.title}</h4>
                            <div className="flex flex-wrap gap-1">
                              {Object.entries(combination.attributes).map(([key, value]) => (
                                <Badge key={key} variant="outline" className="text-xs bg-slate-100 text-slate-700 border-slate-200">
                                  {key}: {value}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <Label className="text-xs text-slate-600 font-medium">SKU</Label>
                              <Input
                                value={combination.sku}
                                onChange={(e) => updateCombination(combination.id, 'sku', e.target.value)}
                                className="mt-1 text-xs border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                              />
                            </div>
                            <div>
                              <Label className="text-xs text-slate-600 font-medium">Price</Label>
                              <Input
                                type="number"
                                value={combination.price}
                                onChange={(e) => updateCombination(combination.id, 'price', parseFloat(e.target.value) || 0)}
                                className="mt-1 text-xs border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                                step="0.01"
                              />
                            </div>
                            <div>
                              <Label className="text-xs text-slate-600 font-medium">Inventory</Label>
                              <Input
                                type="number"
                                value={combination.inventory}
                                onChange={(e) => updateCombination(combination.id, 'inventory', parseInt(e.target.value) || 0)}
                                className="mt-1 text-xs border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                              />
                            </div>
                            <div>
                              <Label className="text-xs text-slate-600 font-medium">Weight</Label>
                              <Input
                                type="number"
                                value={combination.weight}
                                onChange={(e) => updateCombination(combination.id, 'weight', parseFloat(e.target.value) || 0)}
                                className="mt-1 text-xs border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                                step="0.1"
                              />
                            </div>
                          </div>

                          <div className="pt-3 border-t border-slate-200 mt-3">
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                onClick={() => openVariantModal(combination)}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm transition-all duration-200"
                              >
                                <Settings className="h-3 w-3 mr-1" />
                                Manage
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => duplicateCombination(combination.id)}
                                className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50"
                              >
                                <Copy className="h-3 w-3 mr-1" />
                                Duplicate
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Enhanced Empty States */}
              {filteredCombinations.length === 0 && combinations.length > 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No variants match your search</h3>
                  <p className="text-slate-600">Try adjusting your search or filter criteria</p>
                </div>
              )}

              {combinations.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Grid className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No variants generated yet</h3>
                  <p className="text-slate-600 mb-6">Create variant options first, then generate combinations to see them here.</p>
                  <Button 
                    onClick={() => setCurrentTab('options')}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm transition-all duration-200"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Go to Options
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Variant Detail Modal */}
      {selectedVariant && (
        <VariantDetailModal
          variant={selectedVariant}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleVariantSave}
        />
      )}
    </div>
  );
} 