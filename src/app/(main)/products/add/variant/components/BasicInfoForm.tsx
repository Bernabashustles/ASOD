'use client';

import { useState } from 'react';
import { Globe, Tag, FileText, Hash, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function BasicInfoForm({ data, onChange }: { data: any; onChange: (data: any) => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    handle: '',
    vendor: '',
    productType: '',
    tags: [] as string[],
    collections: [] as string[],
    ...data
  });

  const handleInputChange = (field: string, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onChange(newData);
  };

  const addTag = (tag: string) => {
    if (tag.trim() && !formData.tags.includes(tag.trim())) {
      handleInputChange('tags', [...formData.tags, tag.trim()]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    handleInputChange('tags', formData.tags.filter(tag => tag !== tagToRemove));
  };

  const addCollection = (collection: string) => {
    if (collection.trim() && !formData.collections.includes(collection.trim())) {
      handleInputChange('collections', [...formData.collections, collection.trim()]);
    }
  };

  const removeCollection = (collectionToRemove: string) => {
    handleInputChange('collections', formData.collections.filter(collection => collection !== collectionToRemove));
  };

  return (
    <div className="space-y-8">
      {/* Main Product Information */}
      <Card className="border border-gray-200 bg-gray-50 shadow-lg rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold text-black flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black text-white text-2xl">📝</span>
            Basic Information
          </CardTitle>
          <p className="text-gray-600 text-base mt-1">Set up the fundamental details of your product variant</p>
        </CardHeader>
        <CardContent className="space-y-8 pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <Label htmlFor="title" className="text-base font-semibold text-gray-800">
                  Product Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter product title"
                  className="mt-2 bg-white border border-gray-300 focus:border-black focus:ring-black rounded-lg text-gray-900"
                />
              </div>

              <div>
                <Label htmlFor="shortDescription" className="text-base font-semibold text-gray-800">
                  Short Description
                </Label>
                <Textarea
                  id="shortDescription"
                  value={formData.shortDescription}
                  onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                  placeholder="Brief description for product listings"
                  rows={3}
                  className="mt-2 bg-white border border-gray-300 focus:border-black focus:ring-black rounded-lg text-gray-900"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-base font-semibold text-gray-800">
                  Full Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Detailed product description with features and benefits"
                  rows={6}
                  className="mt-2 bg-white border border-gray-300 focus:border-black focus:ring-black rounded-lg text-gray-900"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="handle" className="text-base font-semibold text-gray-800">
                  URL Handle
                </Label>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-base">
                    yourstore.com/products/
                  </span>
                  <Input
                    id="handle"
                    value={formData.handle}
                    onChange={(e) => handleInputChange('handle', e.target.value)}
                    placeholder="product-name"
                    className="pl-48 bg-white border border-gray-300 focus:border-black focus:ring-black rounded-lg text-gray-900"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="vendor" className="text-base font-semibold text-gray-800">
                  Vendor
                </Label>
                <Input
                  id="vendor"
                  value={formData.vendor}
                  onChange={(e) => handleInputChange('vendor', e.target.value)}
                  placeholder="Brand or manufacturer name"
                  className="mt-2 bg-white border border-gray-300 focus:border-black focus:ring-black rounded-lg text-gray-900"
                />
              </div>

              <div>
                <Label htmlFor="productType" className="text-base font-semibold text-gray-800">
                  Product Type
                </Label>
                <Select value={formData.productType} onValueChange={(value) => handleInputChange('productType', value)}>
                  <SelectTrigger className="mt-2 bg-white border border-gray-300 focus:border-black focus:ring-black rounded-lg text-gray-900">
                    <SelectValue placeholder="Select product type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="home">Home & Garden</SelectItem>
                    <SelectItem value="beauty">Beauty & Health</SelectItem>
                    <SelectItem value="sports">Sports & Outdoors</SelectItem>
                    <SelectItem value="books">Books & Media</SelectItem>
                    <SelectItem value="toys">Toys & Games</SelectItem>
                    <SelectItem value="automotive">Automotive</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between mt-6">
                <div>
                  <Label className="text-base font-semibold text-gray-800">Product Visibility</Label>
                  <p className="text-xs text-gray-500 mt-1">Make this product visible to customers</p>
                </div>
                <Switch
                  checked={isVisible}
                  onCheckedChange={setIsVisible}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <div className="px-6"><hr className="my-6 border-gray-200" /></div>
      </Card>

      {/* Tags and Collections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-gray-200 bg-gray-100 shadow rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-black flex items-center gap-2">
              <Tag className="h-5 w-5 text-black" />
              Tags
            </CardTitle>
            <p className="text-gray-600 text-sm">Add tags to help customers find this product</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Add a tag"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addTag(e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
                className="flex-1 bg-white border border-gray-300 focus:border-black focus:ring-black rounded-lg text-gray-900"
              />
              <Button
                size="sm"
                onClick={(e) => {
                  const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                  addTag(input.value);
                  input.value = '';
                }}
                className="bg-black hover:bg-gray-800 text-white rounded-lg px-4"
              >
                Add
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="px-3 py-1 text-sm bg-gray-200 text-gray-900 hover:bg-gray-300 rounded-lg"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-gray-600 hover:text-black"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-gray-100 shadow rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-black flex items-center gap-2">
              <FileText className="h-5 w-5 text-black" />
              Collections
            </CardTitle>
            <p className="text-gray-600 text-sm">Organize this product into collections</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Add to collection"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addCollection(e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
                className="flex-1 bg-white border border-gray-300 focus:border-black focus:ring-black rounded-lg text-gray-900"
              />
              <Button
                size="sm"
                onClick={(e) => {
                  const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                  addCollection(input.value);
                  input.value = '';
                }}
                className="bg-black hover:bg-gray-800 text-white rounded-lg px-4"
              >
                Add
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {formData.collections.map((collection, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="px-3 py-1 text-sm bg-gray-200 text-gray-900 hover:bg-gray-300 rounded-lg"
                >
                  {collection}
                  <button
                    onClick={() => removeCollection(collection)}
                    className="ml-2 text-gray-600 hover:text-black"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SEO Information */}
      <Card className="border-0 shadow-sm bg-gradient-to-br from-gray-50 to-gray-100">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Globe className="h-5 w-5 text-gray-600" />
            SEO & Search
          </CardTitle>
          <p className="text-gray-600 text-sm">Optimize your product for search engines</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="metaTitle" className="text-sm font-medium text-gray-700">
                Meta Title
              </Label>
              <Input
                id="metaTitle"
                value={formData.metaTitle || ''}
                onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                placeholder="SEO title for search engines"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="metaDescription" className="text-sm font-medium text-gray-700">
                Meta Description
              </Label>
              <Textarea
                id="metaDescription"
                value={formData.metaDescription || ''}
                onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                placeholder="Brief description for search results"
                rows={3}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 