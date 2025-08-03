'use client';

import React, { useState, useRef } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Image as ImageIcon,
  Package,
  Truck,
  Globe,
  Upload,
  X,
  Plus,
  Save,
  Eye,
  Copy,
  Settings,
  Box,
  DollarSign,
  Hash,
  Weight,
  Ruler,
  BarChart3,
  AlertTriangle,
  Check,
  Info,
  Zap,
  Star,
  TrendingUp
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

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

interface VariantDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant: VariantCombination | null;
  onSave: (variant: VariantCombination) => void;
}

export default function VariantDetailModal({ 
  isOpen, 
  onClose, 
  variant, 
  onSave 
}: VariantDetailModalProps) {
  const [activeTab, setActiveTab] = useState('images');
  const [editedVariant, setEditedVariant] = useState<VariantCombination | null>(variant);
  const [draggedOver, setDraggedOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    console.log('Modal received variant:', variant);
    if (variant) {
      const updatedVariant = {
        ...variant,
        dimensions: variant.dimensions || { length: 0, width: 0, height: 0, unit: 'in' },
        salesChannels: variant.salesChannels || { online: true, pos: true, marketplace: false, wholesale: false },
        inventoryPolicy: variant.inventoryPolicy || { lowStockThreshold: 10, reorderPoint: 20, maxStock: 1000 }
      };
      console.log('Setting edited variant:', updatedVariant);
      setEditedVariant(updatedVariant);
    }
  }, [variant]);

  if (!editedVariant) return null;

  const handleSave = () => {
    onSave(editedVariant);
    onClose();
  };

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
    
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setEditedVariant(prev => prev ? {
          ...prev,
          images: [...prev.images, imageUrl]
        } : null);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setEditedVariant(prev => prev ? {
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    } : null);
  };

  const updateField = (field: keyof VariantCombination, value: any) => {
    setEditedVariant(prev => prev ? { ...prev, [field]: value } : null);
  };

  const updateNestedField = (parent: string, field: string, value: any) => {
    setEditedVariant(prev => prev ? {
      ...prev,
      [parent]: { ...(prev as any)[parent], [field]: value }
    } : null);
  };

  const profit = editedVariant.price - editedVariant.cost;
  const profitMargin = editedVariant.price > 0 ? ((profit / editedVariant.price) * 100) : 0;

  console.log('Modal render - isOpen:', isOpen, 'variant:', variant, 'editedVariant:', editedVariant);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0 border-b border-gray-200 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Variant Details
              </DialogTitle>
              <DialogDescription className="mt-1 text-gray-600">
                Manage images, inventory, shipping, and sales channels
              </DialogDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-gray-100 text-gray-700">
                {editedVariant.sku}
              </Badge>
              <Switch
                checked={editedVariant.active}
                onCheckedChange={(checked) => updateField('active', checked)}
              />
            </div>
          </div>
          
          {/* Variant Info */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{editedVariant.title}</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {Object.entries(editedVariant.attributes).map(([key, value]) => (
                    <Badge key={key} variant="secondary" className="text-xs">
                      {key}: {value}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">${editedVariant.price}</div>
                <div className="text-sm text-gray-600">
                  Profit: ${profit.toFixed(2)} ({profitMargin.toFixed(1)}%)
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 flex-shrink-0">
              <TabsTrigger value="images" className="flex items-center space-x-2">
                <ImageIcon className="h-4 w-4" />
                <span>Images</span>
                <Badge variant="secondary" className="text-xs ml-1">
                  {editedVariant.images.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="inventory" className="flex items-center space-x-2">
                <Package className="h-4 w-4" />
                <span>Inventory</span>
                {editedVariant.inventory < 10 && (
                  <AlertTriangle className="h-3 w-3 text-orange-500" />
                )}
              </TabsTrigger>
              <TabsTrigger value="shipping" className="flex items-center space-x-2">
                <Truck className="h-4 w-4" />
                <span>Shipping</span>
              </TabsTrigger>
              <TabsTrigger value="channels" className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span>Sales Channels</span>
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto p-6">
              {/* Images Tab */}
              <TabsContent value="images" className="space-y-6 mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Image Upload Area */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Upload className="h-5 w-5" />
                        <span>Upload Images</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                          draggedOver 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDraggedOver(true);
                        }}
                        onDragLeave={() => setDraggedOver(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setDraggedOver(false);
                          handleImageUpload(e.dataTransfer.files);
                        }}
                      >
                        <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600 mb-2">Drag & drop images here</p>
                        <p className="text-sm text-gray-500 mb-4">or</p>
                        <Button
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Choose Files
                        </Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e.target.files)}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Recommended: 1024x1024px, JPG or PNG, max 5MB each
                      </p>
                    </CardContent>
                  </Card>

                  {/* Image Guidelines */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Info className="h-5 w-5" />
                        <span>Image Guidelines</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <Check className="h-4 w-4 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">High Quality</p>
                          <p className="text-xs text-gray-600">Use high-resolution images (1024x1024px or larger)</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Check className="h-4 w-4 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Multiple Angles</p>
                          <p className="text-xs text-gray-600">Show front, back, side, and detail views</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Check className="h-4 w-4 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Consistent Lighting</p>
                          <p className="text-xs text-gray-600">Use even, natural lighting for best results</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Check className="h-4 w-4 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Clean Background</p>
                          <p className="text-xs text-gray-600">White or neutral backgrounds work best</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Current Images */}
                {editedVariant.images.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Current Images ({editedVariant.images.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {editedVariant.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                              <img
                                src={image}
                                alt={`Variant image ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity space-x-2">
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  onClick={() => removeImage(index)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="secondary">
                                  <Eye className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            {index === 0 && (
                              <Badge className="absolute top-2 left-2 bg-blue-600 text-white text-xs">
                                Primary
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Inventory Tab */}
              <TabsContent value="inventory" className="space-y-6 mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Pricing */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <DollarSign className="h-5 w-5" />
                        <span>Pricing</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="price">Price *</Label>
                          <Input
                            id="price"
                            type="number"
                            step="0.01"
                            value={editedVariant.price}
                            onChange={(e) => updateField('price', parseFloat(e.target.value) || 0)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="comparePrice">Compare at price</Label>
                          <Input
                            id="comparePrice"
                            type="number"
                            step="0.01"
                            value={editedVariant.comparePrice}
                            onChange={(e) => updateField('comparePrice', parseFloat(e.target.value) || 0)}
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="cost">Cost per item</Label>
                        <Input
                          id="cost"
                          type="number"
                          step="0.01"
                          value={editedVariant.cost}
                          onChange={(e) => updateField('cost', parseFloat(e.target.value) || 0)}
                          className="mt-1"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Customers won't see this price
                        </p>
                      </div>
                      
                      {/* Profit Analysis */}
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Profit</span>
                          <span className={`font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ${profit.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Margin</span>
                          <span className={`font-bold ${profitMargin >= 30 ? 'text-green-600' : profitMargin >= 15 ? 'text-orange-600' : 'text-red-600'}`}>
                            {profitMargin.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Stock Management */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Box className="h-5 w-5" />
                        <span>Stock Management</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="inventory">Quantity</Label>
                        <Input
                          id="inventory"
                          type="number"
                          value={editedVariant.inventory}
                          onChange={(e) => updateField('inventory', parseInt(e.target.value) || 0)}
                          className="mt-1"
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="trackQuantity">Track quantity</Label>
                          <Switch
                            id="trackQuantity"
                            checked={editedVariant.trackQuantity}
                            onCheckedChange={(checked) => updateField('trackQuantity', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="continueSellingWhenOutOfStock">Continue selling when out of stock</Label>
                          <Switch
                            id="continueSellingWhenOutOfStock"
                            checked={editedVariant.continueSellingWhenOutOfStock}
                            onCheckedChange={(checked) => updateField('continueSellingWhenOutOfStock', checked)}
                          />
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-3">
                        <h4 className="font-medium">Inventory Alerts</h4>
                        <div>
                          <Label htmlFor="lowStockThreshold">Low stock threshold</Label>
                          <Input
                            id="lowStockThreshold"
                            type="number"
                            value={editedVariant.inventoryPolicy?.lowStockThreshold || 10}
                            onChange={(e) => updateNestedField('inventoryPolicy', 'lowStockThreshold', parseInt(e.target.value) || 10)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="reorderPoint">Reorder point</Label>
                          <Input
                            id="reorderPoint"
                            type="number"
                            value={editedVariant.inventoryPolicy?.reorderPoint || 20}
                            onChange={(e) => updateNestedField('inventoryPolicy', 'reorderPoint', parseInt(e.target.value) || 20)}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* SKU & Barcode */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Hash className="h-5 w-5" />
                        <span>SKU & Barcode</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
                        <Input
                          id="sku"
                          value={editedVariant.sku}
                          onChange={(e) => updateField('sku', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="barcode">Barcode (ISBN, UPC, GTIN, etc.)</Label>
                        <Input
                          id="barcode"
                          value={editedVariant.barcode}
                          onChange={(e) => updateField('barcode', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tax Settings */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <BarChart3 className="h-5 w-5" />
                        <span>Tax Settings</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="taxable">Charge tax on this variant</Label>
                          <p className="text-sm text-gray-600">Tax rates are set in your store settings</p>
                        </div>
                        <Switch
                          id="taxable"
                          checked={editedVariant.taxable}
                          onCheckedChange={(checked) => updateField('taxable', checked)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Shipping Tab */}
              <TabsContent value="shipping" className="space-y-6 mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Physical Properties */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Weight className="h-5 w-5" />
                        <span>Physical Properties</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="weight">Weight</Label>
                        <div className="flex mt-1">
                          <Input
                            id="weight"
                            type="number"
                            step="0.01"
                            value={editedVariant.weight}
                            onChange={(e) => updateField('weight', parseFloat(e.target.value) || 0)}
                            className="rounded-r-none"
                          />
                          <div className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md text-sm text-gray-600">
                            lbs
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <Label>Dimensions</Label>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <Input
                              placeholder="Length"
                              type="number"
                              step="0.01"
                              value={editedVariant.dimensions?.length || 0}
                              onChange={(e) => updateNestedField('dimensions', 'length', parseFloat(e.target.value) || 0)}
                            />
                          </div>
                          <div>
                            <Input
                              placeholder="Width"
                              type="number"
                              step="0.01"
                              value={editedVariant.dimensions?.width || 0}
                              onChange={(e) => updateNestedField('dimensions', 'width', parseFloat(e.target.value) || 0)}
                            />
                          </div>
                          <div>
                            <Input
                              placeholder="Height"
                              type="number"
                              step="0.01"
                              value={editedVariant.dimensions?.height || 0}
                              onChange={(e) => updateNestedField('dimensions', 'height', parseFloat(e.target.value) || 0)}
                            />
                          </div>
                        </div>
                        <Select
                          value={editedVariant.dimensions?.unit || 'in'}
                          onValueChange={(value) => updateNestedField('dimensions', 'unit', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="in">Inches</SelectItem>
                            <SelectItem value="cm">Centimeters</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Shipping Settings */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Truck className="h-5 w-5" />
                        <span>Shipping Settings</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="requiresShipping">This is a physical product</Label>
                          <p className="text-sm text-gray-600">Requires shipping</p>
                        </div>
                        <Switch
                          id="requiresShipping"
                          checked={editedVariant.requiresShipping}
                          onCheckedChange={(checked) => updateField('requiresShipping', checked)}
                        />
                      </div>

                      {editedVariant.requiresShipping && (
                        <Alert>
                          <Info className="h-4 w-4" />
                          <AlertDescription>
                            Shipping rates will be calculated based on weight, dimensions, and destination.
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>

                  {/* Shipping Calculator Preview */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <TrendingUp className="h-5 w-5" />
                        <span>Estimated Shipping Costs</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-blue-700">Standard</span>
                            <span className="font-bold text-blue-900">$5.99</span>
                          </div>
                          <p className="text-xs text-blue-600 mt-1">5-7 business days</p>
                        </div>
                        <div className="p-3 bg-orange-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-orange-700">Express</span>
                            <span className="font-bold text-orange-900">$12.99</span>
                          </div>
                          <p className="text-xs text-orange-600 mt-1">2-3 business days</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-green-700">Overnight</span>
                            <span className="font-bold text-green-900">$24.99</span>
                          </div>
                          <p className="text-xs text-green-600 mt-1">Next business day</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-3">
                        * Estimates based on current weight and dimensions to New York, NY
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Sales Channels Tab */}
              <TabsContent value="channels" className="space-y-6 mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Channel Availability */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Globe className="h-5 w-5" />
                        <span>Sales Channel Availability</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <Globe className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium">Online Store</p>
                              <p className="text-sm text-gray-600">Your main website</p>
                            </div>
                          </div>
                          <Switch
                            checked={editedVariant.salesChannels?.online || false}
                            onCheckedChange={(checked) => updateNestedField('salesChannels', 'online', checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                              <Package className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium">Point of Sale</p>
                              <p className="text-sm text-gray-600">In-store sales</p>
                            </div>
                          </div>
                          <Switch
                            checked={editedVariant.salesChannels?.pos || false}
                            onCheckedChange={(checked) => updateNestedField('salesChannels', 'pos', checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                              <Star className="h-4 w-4 text-purple-600" />
                            </div>
                            <div>
                              <p className="font-medium">Marketplace</p>
                              <p className="text-sm text-gray-600">Amazon, eBay, etc.</p>
                            </div>
                          </div>
                          <Switch
                            checked={editedVariant.salesChannels?.marketplace || false}
                            onCheckedChange={(checked) => updateNestedField('salesChannels', 'marketplace', checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                              <Box className="h-4 w-4 text-orange-600" />
                            </div>
                            <div>
                              <p className="font-medium">Wholesale</p>
                              <p className="text-sm text-gray-600">B2B sales</p>
                            </div>
                          </div>
                          <Switch
                            checked={editedVariant.salesChannels?.wholesale || false}
                            onCheckedChange={(checked) => updateNestedField('salesChannels', 'wholesale', checked)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Channel Performance */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <BarChart3 className="h-5 w-5" />
                        <span>Channel Performance</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Online Store</span>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">87% of sales</Badge>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Point of Sale</span>
                          <Badge variant="outline" className="bg-green-50 text-green-700">10% of sales</Badge>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '10%' }}></div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Marketplace</span>
                          <Badge variant="outline" className="bg-purple-50 text-purple-700">3% of sales</Badge>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: '3%' }}></div>
                        </div>
                      </div>

                      <Separator />

                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">284</div>
                          <div className="text-xs text-gray-600">Total Sales</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-600">$8,520</div>
                          <div className="text-xs text-gray-600">Revenue</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Zap className="h-5 w-5" />
                        <span>Quick Actions</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <Button variant="outline" className="justify-start">
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Analytics
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <Settings className="h-4 w-4 mr-2" />
                          Advanced
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Footer Actions */}
        <div className="flex-shrink-0 border-t border-gray-200 pt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${editedVariant.active ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <span>{editedVariant.active ? 'Active' : 'Inactive'}</span>
            </div>
            <span>•</span>
            <span>{editedVariant.inventory} in stock</span>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-black hover:bg-gray-800 text-white">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
      );
  }