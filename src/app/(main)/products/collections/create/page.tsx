'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  ImageIcon,
  Plus,
  Store,
  Globe,
  Info,
  ChevronDown,
  X,
  Wand2,
  Search,
  Package,
  Upload
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

export default function CreateCollectionPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    onlineStore: true,
    pointOfSale: false,
    seoTitle: '',
    seoDescription: '',
    image: null as File | null,
  });

  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const [selectedProducts, setSelectedProducts] = useState<Array<{
    id: string;
    title: string;
    image: string;
    price: number;
  }>>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const mockProducts = [
    { id: '1', title: 'Classic T-Shirt', image: '/mock/tshirt.jpg', price: 29.99 },
    { id: '2', title: 'Denim Jeans', image: '/mock/jeans.jpg', price: 89.99 },
    { id: '3', title: 'Leather Jacket', image: '/mock/jacket.jpg', price: 199.99 },
  ];

  const handleGenerateDescription = async () => {
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const generatedDescription = `A curated collection of ${formData.title.toLowerCase()} featuring our finest selection of products. Perfect for customers looking for quality and style.`;
      
      setFormData(prev => ({
        ...prev,
        description: generatedDescription
      }));
    } catch (error) {
      console.error('Failed to generate description:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleAddProduct = (product: typeof mockProducts[0]) => {
    if (!selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts(prev => [...prev, product]);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        image: e.target.files![0]
      }));
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <div className="sticky top-0">
        <div className="max-w-[1000px] mx-auto">
          <div className="flex h-14 items-center justify-between px-4 sm:px-6">
            <Link href="/products/collections" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Create collection</span>
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">Discard</Button>
              <Button size="sm">Save</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto p-4 sm:p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="space-y-4 sm:space-y-6">
            {/* Basic Info */}
            <div className="bg-white border rounded-lg p-4 sm:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g. Summer collection, Under $100, Staff picks"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    title: e.target.value 
                  }))}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="description">Description</Label>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Wand2 className="w-4 h-4" />
                        Generate with AI
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Generate Description with AI</DialogTitle>
                        <DialogDescription>
                          Enter a prompt to generate a collection description using AI.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="ai-prompt">Prompt</Label>
                          <Textarea
                            id="ai-prompt"
                            placeholder="e.g. Write a compelling description for a summer fashion collection targeting young adults"
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                            className="min-h-[100px]"
                          />
                        </div>
                        {formData.title && (
                          <div className="text-sm text-muted-foreground">
                            Collection title "{formData.title}" will be used as context for the generation.
                          </div>
                        )}
                      </div>
                      <DialogFooter>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setAiPrompt('')}
                        >
                          Clear
                        </Button>
                        <Button
                          onClick={handleGenerateDescription}
                          disabled={!aiPrompt || isGenerating}
                          className="gap-2"
                        >
                          {isGenerating ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Generating...
                            </>
                          ) : (
                            <>
                              <Wand2 className="w-4 h-4" />
                              Generate
                            </>
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <Textarea
                  id="description"
                  placeholder="Add a description to help customers find this collection"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    description: e.target.value 
                  }))}
                  className="min-h-[120px]"
                />
              </div>

              {/* Collection Image */}
              <div className="space-y-2">
                <Label>Collection Image</Label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  {formData.image ? (
                    <div className="space-y-2">
                      <div className="aspect-video rounded-lg bg-gray-100 flex items-center justify-center">
                        <img 
                          src={URL.createObjectURL(formData.image)} 
                          alt="Collection preview" 
                          className="max-h-full rounded-lg"
                        />
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setFormData(prev => ({ ...prev, image: null }))}
                      >
                        Remove Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="aspect-video rounded-lg bg-gray-100 flex items-center justify-center">
                        <div className="text-center">
                          <Upload className="h-8 w-8 mx-auto text-gray-400" />
                          <p className="text-sm text-gray-600 mt-2">
                            Drag and drop an image, or click to browse
                          </p>
                        </div>
                      </div>
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                        id="collection-image"
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById('collection-image')?.click()}
                      >
                        Choose Image
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Products Section */}
            <div className="bg-white border rounded-lg p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Products</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="gap-2">
                      <Plus className="w-4 h-4" />
                      Add products
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add Products</DialogTitle>
                      <DialogDescription>
                        Search and select products to add to this collection.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="Search products..."
                          className="pl-10"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {mockProducts.map((product) => (
                          <Card key={product.id} className="cursor-pointer hover:border-primary">
                            <CardContent className="p-4 flex items-center gap-4">
                              <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
                                {product.image ? (
                                  <img src={product.image} alt={product.title} className="w-full h-full object-cover rounded-lg" />
                                ) : (
                                  <Package className="w-8 h-8 text-gray-400" />
                                )}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium">{product.title}</h3>
                                <p className="text-sm text-gray-500">${product.price}</p>
                              </div>
                              <Button
                                variant={selectedProducts.find(p => p.id === product.id) ? "secondary" : "outline"}
                                size="sm"
                                onClick={() => handleAddProduct(product)}
                              >
                                {selectedProducts.find(p => p.id === product.id) ? "Added" : "Add"}
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {selectedProducts.length > 0 ? (
                <div className="space-y-2">
                  {selectedProducts.map((product) => (
                    <Card key={product.id}>
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                          {product.image ? (
                            <img src={product.image} alt={product.title} className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            <Package className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{product.title}</h3>
                          <p className="text-sm text-gray-500">${product.price}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveProduct(product.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Package className="w-12 h-12 mx-auto text-gray-400" />
                  <p className="mt-2">No products added yet</p>
                  <p className="text-sm">Click "Add products" to start building your collection</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Visibility */}
            <Card>
              <CardHeader>
                <CardTitle>Visibility</CardTitle>
                <CardDescription>Control where this collection appears</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Online Store</div>
                    <div className="text-sm text-gray-500">Show in your online store</div>
                  </div>
                  <Switch
                    checked={formData.onlineStore}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, onlineStore: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Point of Sale</div>
                    <div className="text-sm text-gray-500">Show in POS system</div>
                  </div>
                  <Switch
                    checked={formData.pointOfSale}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, pointOfSale: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* SEO */}
            <Card>
              <CardHeader>
                <CardTitle>Search Engine Optimization</CardTitle>
                <CardDescription>Optimize your collection for search engines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="seoTitle">Page title</Label>
                  <Input
                    id="seoTitle"
                    placeholder="Enter page title"
                    value={formData.seoTitle}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      seoTitle: e.target.value 
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seoDescription">Meta description</Label>
                  <Textarea
                    id="seoDescription"
                    placeholder="Enter meta description"
                    value={formData.seoDescription}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      seoDescription: e.target.value 
                    }))}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}