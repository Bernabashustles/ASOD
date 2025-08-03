'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Package, 
  Upload, 
  X, 
  Plus, 
  Trash2, 
  Save, 
  Building2, 
  MapPin, 
  AlertCircle,
  Info,
  Check,
  Loader2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from 'next/link';

export default function CreateInventoryItemPage() {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    description: '',
    category: '',
    stockLevel: '',
    reorderPoint: '',
    optimalStock: '',
    location: '',
    supplier: '',
    cost: '',
    retailPrice: '',
    barcode: '',
    weight: '',
    dimensions: {
      length: '',
      width: '',
      height: ''
    },
    trackInventory: true,
    allowBackorders: false,
    isActive: true
  });
  
  const [images, setImages] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('basic');
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleDimensionChange = (dimension: 'length' | 'width' | 'height', value: string) => {
    setFormData(prev => ({
      ...prev,
      dimensions: {
        ...prev.dimensions,
        [dimension]: value
      }
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.sku.trim()) newErrors.sku = 'SKU is required';
    if (!formData.category) newErrors.category = 'Category is required';
    
    if (formData.stockLevel && isNaN(Number(formData.stockLevel))) {
      newErrors.stockLevel = 'Stock level must be a number';
    }
    
    if (formData.reorderPoint && isNaN(Number(formData.reorderPoint))) {
      newErrors.reorderPoint = 'Reorder point must be a number';
    }
    
    if (formData.optimalStock && isNaN(Number(formData.optimalStock))) {
      newErrors.optimalStock = 'Optimal stock must be a number';
    }
    
    if (formData.cost && isNaN(Number(formData.cost))) {
      newErrors.cost = 'Cost must be a number';
    }
    
    if (formData.retailPrice && isNaN(Number(formData.retailPrice))) {
      newErrors.retailPrice = 'Retail price must be a number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Find the first tab with errors and switch to it
      const errorFields = Object.keys(errors);
      if (errorFields.includes('name') || errorFields.includes('sku') || errorFields.includes('category')) {
        setActiveTab('basic');
      } else if (errorFields.includes('stockLevel') || errorFields.includes('reorderPoint') || 
                errorFields.includes('optimalStock') || errorFields.includes('location') || 
                errorFields.includes('supplier')) {
        setActiveTab('inventory');
      } else if (errorFields.includes('cost') || errorFields.includes('retailPrice')) {
        setActiveTab('pricing');
      }
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success - would redirect to the inventory page or show success message
      console.log('Product created successfully', formData);
      
      // Reset form or redirect
      window.location.href = '/products/inventory';
    } catch (error) {
      console.error('Error creating product', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-full sm:max-w-[1200px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Button variant="ghost" size="icon" asChild className="h-8 w-8">
              <Link href="/products/inventory">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">Add New Product</h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 ml-10">
            Create a new product in your inventory
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 sm:mt-0 w-full sm:w-auto">
          <Button variant="outline" asChild className="flex-1 sm:flex-initial text-sm h-9">
            <Link href="/products/inventory">Cancel</Link>
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSaving}
            className="gap-2 flex-1 sm:flex-initial text-sm h-9"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="hidden xs:inline">Saving...</span>
                <span className="xs:hidden">...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span className="hidden xs:inline">Save Product</span>
                <span className="xs:hidden">Save</span>
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 order-2 lg:order-1">
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0 pb-2">
            <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
              <TabsList className="grid grid-cols-4 min-w-[500px] sm:min-w-0 sm:w-full">
                <TabsTrigger value="basic" className="text-xs sm:text-sm">Basic Info</TabsTrigger>
                <TabsTrigger value="inventory" className="text-xs sm:text-sm">Inventory</TabsTrigger>
                <TabsTrigger value="pricing" className="text-xs sm:text-sm">Pricing</TabsTrigger>
                <TabsTrigger value="shipping" className="text-xs sm:text-sm">Shipping</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4 sm:space-y-6">
                <Card>
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base sm:text-lg">Basic Information</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Enter the basic details of your product
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name <span className="text-red-500">*</span></Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter product name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sku">SKU (Stock Keeping Unit) <span className="text-red-500">*</span></Label>
                      <Input
                        id="sku"
                        name="sku"
                        placeholder="e.g. TS-BLK-L"
                        value={formData.sku}
                        onChange={handleInputChange}
                        className={errors.sku ? "border-red-500" : ""}
                      />
                      {errors.sku && (
                        <p className="text-red-500 text-xs mt-1">{errors.sku}</p>
                      )}
                      <p className="text-xs text-gray-500">
                        A unique identifier for your product
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="barcode">Barcode (UPC, EAN)</Label>
                      <Input
                        id="barcode"
                        name="barcode"
                        placeholder="e.g. 123456789012"
                        value={formData.barcode}
                        onChange={handleInputChange}
                      />
                      <p className="text-xs text-gray-500">
                        Optional: Enter the product barcode if available
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
                      <Select 
                        value={formData.category} 
                        onValueChange={(value) => handleSelectChange('category', value)}
                      >
                        <SelectTrigger id="category" className={errors.category ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Apparel">Apparel</SelectItem>
                          <SelectItem value="Footwear">Footwear</SelectItem>
                          <SelectItem value="Electronics">Electronics</SelectItem>
                          <SelectItem value="Outerwear">Outerwear</SelectItem>
                          <SelectItem value="Accessories">Accessories</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <p className="text-red-500 text-xs mt-1">{errors.category}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Enter product description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="isActive">Active Status</Label>
                        <Switch
                          id="isActive"
                          checked={formData.isActive}
                          onCheckedChange={(checked) => handleSwitchChange('isActive', checked)}
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        Active products are visible in your store
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="inventory" className="space-y-4 sm:space-y-6">
                <Card>
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base sm:text-lg">Inventory Information</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Manage stock levels and inventory settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="trackInventory">Track Inventory</Label>
                        <Switch
                          id="trackInventory"
                          checked={formData.trackInventory}
                          onCheckedChange={(checked) => handleSwitchChange('trackInventory', checked)}
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        Enable to track stock levels for this product
                      </p>
                    </div>
                    
                    {formData.trackInventory && (
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="stockLevel">Current Stock</Label>
                            <Input
                              id="stockLevel"
                              name="stockLevel"
                              type="text"
                              placeholder="0"
                              value={formData.stockLevel}
                              onChange={handleInputChange}
                              className={errors.stockLevel ? "border-red-500" : ""}
                            />
                            {errors.stockLevel && (
                              <p className="text-red-500 text-xs mt-1">{errors.stockLevel}</p>
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="reorderPoint">Reorder Point</Label>
                            <Input
                              id="reorderPoint"
                              name="reorderPoint"
                              type="text"
                              placeholder="0"
                              value={formData.reorderPoint}
                              onChange={handleInputChange}
                              className={errors.reorderPoint ? "border-red-500" : ""}
                            />
                            {errors.reorderPoint && (
                              <p className="text-red-500 text-xs mt-1">{errors.reorderPoint}</p>
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="optimalStock">Optimal Stock</Label>
                            <Input
                              id="optimalStock"
                              name="optimalStock"
                              type="text"
                              placeholder="0"
                              value={formData.optimalStock}
                              onChange={handleInputChange}
                              className={errors.optimalStock ? "border-red-500" : ""}
                            />
                            {errors.optimalStock && (
                              <p className="text-red-500 text-xs mt-1">{errors.optimalStock}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="allowBackorders">Allow Backorders</Label>
                            <Switch
                              id="allowBackorders"
                              checked={formData.allowBackorders}
                              onCheckedChange={(checked) => handleSwitchChange('allowBackorders', checked)}
                            />
                          </div>
                          <p className="text-xs text-gray-500">
                            Allow customers to purchase when out of stock
                          </p>
                        </div>
                      </>
                    )}
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Storage Location</Label>
                      <Select 
                        value={formData.location} 
                        onValueChange={(value) => handleSelectChange('location', value)}
                      >
                        <SelectTrigger id="location">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Warehouse A">Warehouse A</SelectItem>
                          <SelectItem value="Warehouse B">Warehouse B</SelectItem>
                          <SelectItem value="Warehouse C">Warehouse C</SelectItem>
                          <SelectItem value="Store Backroom">Store Backroom</SelectItem>
                          <SelectItem value="External Storage">External Storage</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="supplier">Supplier</Label>
                      <Select 
                        value={formData.supplier} 
                        onValueChange={(value) => handleSelectChange('supplier', value)}
                      >
                        <SelectTrigger id="supplier">
                          <SelectValue placeholder="Select supplier" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Global Textiles Inc.">Global Textiles Inc.</SelectItem>
                          <SelectItem value="Fashion Fabrics Ltd.">Fashion Fabrics Ltd.</SelectItem>
                          <SelectItem value="Premium Materials Co.">Premium Materials Co.</SelectItem>
                          <SelectItem value="Tech Distributors Ltd.">Tech Distributors Ltd.</SelectItem>
                          <SelectItem value="Sports Gear Inc.">Sports Gear Inc.</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="pricing" className="space-y-4 sm:space-y-6">
                <Card>
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base sm:text-lg">Pricing Information</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Set product cost and retail pricing
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cost">Cost Price ($)</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                          <Input
                            id="cost"
                            name="cost"
                            type="text"
                            placeholder="0.00"
                            value={formData.cost}
                            onChange={handleInputChange}
                            className={`pl-7 ${errors.cost ? "border-red-500" : ""}`}
                          />
                        </div>
                        {errors.cost && (
                          <p className="text-red-500 text-xs mt-1">{errors.cost}</p>
                        )}
                        <p className="text-xs text-gray-500">
                          The price you pay to acquire or produce this product
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="retailPrice">Retail Price ($)</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                          <Input
                            id="retailPrice"
                            name="retailPrice"
                            type="text"
                            placeholder="0.00"
                            value={formData.retailPrice}
                            onChange={handleInputChange}
                            className={`pl-7 ${errors.retailPrice ? "border-red-500" : ""}`}
                          />
                        </div>
                        {errors.retailPrice && (
                          <p className="text-red-500 text-xs mt-1">{errors.retailPrice}</p>
                        )}
                        <p className="text-xs text-gray-500">
                          The price customers will pay for this product
                        </p>
                      </div>
                    </div>
                    
                    {formData.cost && formData.retailPrice && !isNaN(Number(formData.cost)) && !isNaN(Number(formData.retailPrice)) && (
                      <div className="bg-gray-50 p-4 rounded-lg mt-4">
                        <h4 className="text-sm font-medium mb-2">Profit Margin</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Profit per unit</p>
                            <p className="text-lg font-medium">
                              ${(Number(formData.retailPrice) - Number(formData.cost)).toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Margin percentage</p>
                            <p className="text-lg font-medium">
                              {(((Number(formData.retailPrice) - Number(formData.cost)) / Number(formData.retailPrice)) * 100).toFixed(2)}%
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="shipping" className="space-y-4 sm:space-y-6">
                <Card>
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base sm:text-lg">Shipping Information</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Enter product dimensions and weight for shipping calculations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        name="weight"
                        type="text"
                        placeholder="0.00"
                        value={formData.weight}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Dimensions (cm)</Label>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="length" className="text-xs text-gray-500">Length</Label>
                          <Input
                            id="length"
                            type="text"
                            placeholder="0.00"
                            value={formData.dimensions.length}
                            onChange={(e) => handleDimensionChange('length', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="width" className="text-xs text-gray-500">Width</Label>
                          <Input
                            id="width"
                            type="text"
                            placeholder="0.00"
                            value={formData.dimensions.width}
                            onChange={(e) => handleDimensionChange('width', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="height" className="text-xs text-gray-500">Height</Label>
                          <Input
                            id="height"
                            type="text"
                            placeholder="0.00"
                            value={formData.dimensions.height}
                            onChange={(e) => handleDimensionChange('height', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {formData.weight && formData.dimensions.length && formData.dimensions.width && formData.dimensions.height && (
                      <div className="bg-gray-50 p-4 rounded-lg mt-4">
                        <h4 className="text-sm font-medium mb-2">Shipping Information</h4>
                        <p className="text-sm text-gray-500">
                          Volumetric weight: {(
                            (Number(formData.dimensions.length) * 
                             Number(formData.dimensions.width) * 
                             Number(formData.dimensions.height)) / 5000
                          ).toFixed(2)} kg
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Billable weight: {Math.max(
                            Number(formData.weight),
                            (Number(formData.dimensions.length) * 
                             Number(formData.dimensions.width) * 
                             Number(formData.dimensions.height)) / 5000
                          ).toFixed(2)} kg
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <div className="space-y-4 sm:space-y-6 order-1 lg:order-2 mb-6 lg:mb-0">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg">Product Images</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Upload images of your product
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0 space-y-4">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={image} 
                      alt={`Product image ${index + 1}`} 
                      className="w-full h-24 sm:h-32 object-cover rounded-md border"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-6 w-6 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                
                {images.length < 6 && (
                  <div className="border border-dashed rounded-md flex items-center justify-center h-24 sm:h-32 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                    <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                      <Upload className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 mb-1" />
                      <span className="text-xs text-gray-500">Upload Image</span>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                        multiple={images.length < 5}
                      />
                    </label>
                  </div>
                )}
              </div>
              
              <p className="text-xs text-gray-500">
                You can upload up to 6 images. First image will be used as the product thumbnail.
              </p>
            </CardContent>
          </Card>
          
          <Card className="block lg:sticky lg:top-6">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg">Product Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0 space-y-3">
              <div className="space-y-3">
                {formData.name && (
                  <div>
                    <p className="text-xs text-gray-500">Product Name</p>
                    <p className="font-medium">{formData.name}</p>
                  </div>
                )}
                
                {formData.sku && (
                  <div>
                    <p className="text-xs text-gray-500">SKU</p>
                    <p>{formData.sku}</p>
                  </div>
                )}
                
                {formData.category && (
                  <div>
                    <p className="text-xs text-gray-500">Category</p>
                    <p>{formData.category}</p>
                  </div>
                )}
                
                {formData.stockLevel && (
                  <div>
                    <p className="text-xs text-gray-500">Stock Level</p>
                    <p>{formData.stockLevel} units</p>
                  </div>
                )}
                
                {formData.retailPrice && (
                  <div>
                    <p className="text-xs text-gray-500">Price</p>
                    <p className="font-medium">${Number(formData.retailPrice).toFixed(2)}</p>
                  </div>
                )}
                
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <Badge variant={formData.isActive ? "default" : "secondary"}>
                    {formData.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 border-t p-4 sm:p-6 flex justify-end">
              <Button 
                onClick={handleSubmit} 
                disabled={isSaving}
                className="gap-2 w-full sm:w-auto text-sm"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Save Product</span>
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
} 