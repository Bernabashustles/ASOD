'use client';

import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  ExternalLink, 
  Share2, 
  ShoppingBag, 
  Heart, 
  Star, 
  ChevronRight, 
  TruckIcon, 
  PackageCheck, 
  RotateCcw, 
  Check, 
  Info, 
  Monitor, 
  Tablet, 
  Smartphone 
} from 'lucide-react';

// Use the same interfaces from the product form
interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'model';
  size: number;
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

interface ProductFormData {
  title: string;
  description: string;
  status: 'active' | 'draft' | 'archived';
  salesChannels: string[];
  markets: string[];
  scheduledAt?: Date | null;
  productCategory?: string;
  type?: string;
  vendor?: string;
  collections?: string[];
  tags?: string[];
  media?: MediaFile[];
  price?: number;
  compareAtPrice?: number;
  chargeTax?: boolean;
  costPerItem?: number;
  trackQuantity?: boolean;
  sku?: string;
  barcode?: string;
  hasSkuOrBarcode?: boolean;
  continueSellingWhenOutOfStock?: boolean;
  isPhysicalProduct?: boolean;
  weight?: number;
  weightUnit?: string;
  customsCountryOfOrigin?: string;
  customsHsCode?: string;
  hasVariants?: boolean;
  options?: ProductOption[];
  variants?: ProductVariant[];
  seoTitle?: string;
  seoDescription?: string;
  urlHandle?: string;
}

interface ProductPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productData: ProductFormData;
}

const ProductPreviewDialog: React.FC<ProductPreviewDialogProps> = ({
  open,
  onOpenChange,
  productData
}) => {
  const [activeTab, setActiveTab] = React.useState('desktop');
  const [selectedVariantIndex, setSelectedVariantIndex] = React.useState(0);

  // Add additional state for enhanced UI
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1);
  const [selectedTab, setSelectedTab] = React.useState("description");
  const [isStockAvailable] = React.useState(true);
  
  // Mock additional data for enhanced UI
  const specifications = [
    { name: "Material", value: "Premium Cotton" },
    { name: "Weight", value: `${productData.weight || 0.5} ${productData.weightUnit || 'kg'}` },
    { name: "Dimensions", value: "30 × 40 × 5 cm" },
    { name: "Care Instructions", value: "Machine wash cold, tumble dry low" },
  ];
  
  const reviews = [
    { id: 1, author: "John D.", rating: 5, date: "2 weeks ago", text: "Excellent product, exactly as described!" },
    { id: 2, author: "Sarah M.", rating: 4, date: "1 month ago", text: "Good quality and fast shipping. Very satisfied." },
    { id: 3, author: "Robert K.", rating: 5, date: "3 months ago", text: "Exceeded my expectations. Will order again." },
  ];
  
  const relatedProducts = [
    { id: 1, name: "Related Item 1", price: 24.99, image: "https://placehold.co/200x200?text=Related+1" },
    { id: 2, name: "Related Item 2", price: 32.99, image: "https://placehold.co/200x200?text=Related+2" },
    { id: 3, name: "Related Item 3", price: 19.99, image: "https://placehold.co/200x200?text=Related+3" },
    { id: 4, name: "Related Item 4", price: 27.99, image: "https://placehold.co/200x200?text=Related+4" },
  ];

  // Get all product images including variant images
  const allProductImages = [
    ...(productData.media || []),
    ...(productData.variants?.flatMap(v => v.image ? [{ id: `variant-${v.id}`, url: v.image, name: 'Variant Image', type: 'image' as const, size: 0 }] : []) || [])
  ];
  
  // Get current image for display
  const currentImage = allProductImages.length > 0 && selectedImageIndex < allProductImages.length
    ? allProductImages[selectedImageIndex].url
    : 'https://placehold.co/600x400?text=No+Image';

  // Get main product image
  const mainImage = productData.media && productData.media.length > 0 
    ? productData.media[0].url 
    : 'https://placehold.co/600x400?text=No+Image';

  // Get formatted price
  const formatPrice = (price?: number) => {
    if (price === undefined) return 'ETB 0.00';
    return `ETB ${price.toFixed(2)}`;
  };

  // Get selected variant if variants exist
  const selectedVariant = productData.hasVariants && productData.variants && productData.variants.length > 0 
    ? productData.variants[selectedVariantIndex] 
    : null;

  // Get price to display (variant price or main price)
  const displayPrice = selectedVariant?.price ?? productData.price;
  const displayComparePrice = productData.compareAtPrice;

  // Calculate discount percentage if compare price exists
  const discountPercentage = displayPrice && displayComparePrice && displayPrice < displayComparePrice
    ? Math.round(((displayComparePrice - displayPrice) / displayComparePrice) * 100)
    : null;

  // Function to open preview in a new tab
  const openInNewTab = () => {
    const previewHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Preview: ${productData.title || 'New Product'}</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-100 p-4">
        <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
          <div class="p-6">
            <div class="flex flex-col md:flex-row gap-8">
              <div class="md:w-1/2">
                ${productData.media && productData.media.length > 0 
                  ? `<img src="${productData.media[0].url}" alt="${productData.title || 'Product'}" class="w-full h-auto rounded-lg">`
                  : '<div class="bg-gray-200 w-full aspect-square rounded-lg flex items-center justify-center"><span class="text-gray-500">No image</span></div>'
                }
              </div>
              <div class="md:w-1/2">
                ${productData.vendor ? `<div class="text-sm text-gray-500 mb-1">${productData.vendor}</div>` : ''}
                <h1 class="text-2xl font-bold mb-4">${productData.title || 'Product Title'}</h1>
                <div class="flex items-center gap-2 mb-6">
                  <span class="text-xl font-semibold">${formatPrice(displayPrice)}</span>
                  ${displayComparePrice && displayComparePrice > (displayPrice || 0) 
                    ? `<span class="text-gray-500 line-through">${formatPrice(displayComparePrice)}</span>
                       ${discountPercentage ? `<span class="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">${discountPercentage}% OFF</span>` : ''}`
                    : ''
                  }
                </div>
                <button class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 mb-6">Add to Cart</button>
                <div class="prose prose-sm">
                  <h3 class="text-base font-medium mb-2">Description</h3>
                  <div class="text-gray-700">
                    ${productData.description || 'No description provided.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4 text-center text-sm text-gray-500">
          <p>This is a preview. The actual product page may appear differently.</p>
        </div>
      </body>
      </html>
    `;

    // Create a blob and open it in a new tab
    const blob = new Blob([previewHTML], { type: 'text/html' });
    const previewUrl = URL.createObjectURL(blob);
    window.open(previewUrl, '_blank');
  };

  // Function to handle sharing preview link
  const handleSharePreview = () => {
    // In a real implementation, this would create a temporary link that could be shared
    // For now, we'll show an alert
    alert('Share functionality would be implemented in production.');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl p-0 h-[92vh] max-h-[950px] overflow-hidden bg-slate-50">
        <DialogHeader className="p-5 border-b bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DialogTitle className="text-xl font-bold text-gray-800">
                Product Preview
              </DialogTitle>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-medium">
                {productData.status === 'draft' ? 'Draft' : 'Active'}
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                Preview how customers would see this product
              </span>
              <Tabs defaultValue="desktop" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-[200px] grid-cols-3 p-1 bg-gray-100">
                  <TabsTrigger value="desktop" className="flex items-center justify-center gap-1.5 data-[state=active]:bg-white">
                    <Monitor className="h-3.5 w-3.5" />
                    <span className="text-xs">Desktop</span>
                  </TabsTrigger>
                  <TabsTrigger value="tablet" className="flex items-center justify-center gap-1.5 data-[state=active]:bg-white">
                    <Tablet className="h-3.5 w-3.5" />
                    <span className="text-xs">Tablet</span>
                  </TabsTrigger>
                  <TabsTrigger value="mobile" className="flex items-center justify-center gap-1.5 data-[state=active]:bg-white">
                    <Smartphone className="h-3.5 w-3.5" />
                    <span className="text-xs">Mobile</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 p-6 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            {/* Desktop View */}
            <TabsContent value="desktop" className="h-full mt-0 relative">
              <div className="mx-auto relative bg-white rounded-lg shadow-md overflow-hidden h-full max-w-6xl border border-gray-200">
                {/* Device frame header */}
                <div className="h-7 bg-gray-100 border-b flex items-center px-3 gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <div className="mx-auto">
                    <div className="w-96 h-4 rounded bg-white border border-gray-300 text-[8px] text-gray-500 flex items-center justify-center">
                      yourstore.com/products/{productData.urlHandle || 'product-name'}
                    </div>
                  </div>
                </div>
                <ScrollArea className="h-[calc(100%-1.75rem)]">
                  <div className="p-8 md:p-12">
                    {/* Navigation breadcrumbs */}
                    <div className="mb-6 flex items-center text-sm text-gray-500">
                      <span>Home</span>
                      <ChevronRight className="h-3 w-3 mx-1" />
                      <span>{productData.productCategory || 'Products'}</span>
                      <ChevronRight className="h-3 w-3 mx-1" />
                      <span className="text-gray-700">{productData.title || 'Product'}</span>
                    </div>
                    
                    {/* Product Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      {/* Left Column - Media */}
                      <div>
                        <div className="aspect-square rounded-lg overflow-hidden bg-white border shadow-sm hover:shadow-md transition-all duration-300">
                          <img 
                            src={currentImage} 
                            alt={productData.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Thumbnail Grid */}
                        {allProductImages.length > 1 && (
                          <div className="grid grid-cols-6 gap-2 mt-4">
                            {allProductImages.slice(0, 6).map((item, idx) => (
                              <div 
                                key={item.id} 
                                className={`aspect-square rounded-md overflow-hidden border cursor-pointer ${selectedImageIndex === idx ? 'ring-2 ring-blue-500 border-blue-500' : 'hover:border-gray-400'}`}
                                onClick={() => setSelectedImageIndex(idx)}
                              >
                                <img 
                                  src={item.url} 
                                  alt={`${productData.title} thumbnail ${idx + 1}`} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {/* Right Column - Details */}
                      <div className="flex flex-col">
                        {/* Vendor & ratings */}
                        <div className="flex items-center justify-between mb-2">
                          {productData.vendor && (
                            <div className="text-sm font-medium text-indigo-600">
                              {productData.vendor}
                            </div>
                          )}
                          
                          <div className="flex items-center">
                            <div className="flex items-center">
                              {Array(5).fill(0).map((_, i) => (
                                <Star key={i} className={`h-4 w-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill={i < 4 ? 'currentColor' : 'none'} />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600 ml-2">(42 reviews)</span>
                          </div>
                        </div>
                        
                        {/* Title */}
                        <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                          {productData.title || 'Product Title'}
                        </h1>
                        
                        {/* Price */}
                        <div className="flex items-center gap-2 mb-6">
                          <span className="text-2xl font-bold text-gray-900">{formatPrice(displayPrice)}</span>
                          {displayComparePrice && displayComparePrice > (displayPrice || 0) && (
                            <>
                              <span className="text-lg text-gray-500 line-through">{formatPrice(displayComparePrice)}</span>
                              {discountPercentage && (
                                <Badge className="ml-2 bg-green-100 text-green-800 border-green-200 font-medium">
                                  SAVE {discountPercentage}%
                                </Badge>
                              )}
                            </>
                          )}
                        </div>
                        
                        {/* Short description */}
                        <div className="text-gray-600 mb-6 text-sm">
                          {productData.description ? (
                            <div dangerouslySetInnerHTML={{ __html: productData.description.slice(0, 150) + '...' }} />
                          ) : (
                            <p>No description provided.</p>
                          )}
                        </div>
                        
                        {/* Variants */}
                        {productData.hasVariants && productData.options && productData.options.length > 0 && (
                          <div className="space-y-5 mb-8">
                            {productData.options.map(option => (
                              <div key={option.id}>
                                <h3 className="text-sm font-medium text-gray-900 mb-3">
                                  Select {option.name}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                  {option.values.filter(v => v.trim() !== '').map((value, idx) => (
                                    <Badge 
                                      key={idx}
                                      variant="outline" 
                                      className={`rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-100 ${idx === 0 ? 'bg-gray-100 border-gray-400' : 'bg-white'}`}
                                    >
                                      {value}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Quantity selector */}
                        <div className="mb-6">
                          <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
                          <div className="flex w-32 border border-gray-300 rounded-md">
                            <button 
                              className="w-10 h-10 flex items-center justify-center border-r border-gray-300 text-gray-500 hover:bg-gray-50"
                              onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                            >
                              -
                            </button>
                            <div className="flex-1 text-center flex items-center justify-center">
                              {quantity}
                            </div>
                            <button 
                              className="w-10 h-10 flex items-center justify-center border-l border-gray-300 text-gray-500 hover:bg-gray-50"
                              onClick={() => setQuantity(prev => prev + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        
                        {/* Action buttons */}
                        <div className="flex gap-3 mb-8">
                          <Button className="flex-1 h-12 bg-indigo-600 hover:bg-indigo-700 font-medium">
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            Add to Cart
                          </Button>
                          <Button 
                            variant="outline" 
                            className="h-12 w-12 p-0 border-gray-300"
                            onClick={() => setIsFavorite(!isFavorite)}
                          >
                            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                          </Button>
                        </div>
                        
                        {/* Shipping/returns info */}
                        <div className="bg-gray-50 rounded-lg p-4 mb-8 space-y-3">
                          <div className="flex gap-3 items-center text-sm text-gray-600">
                            <TruckIcon className="h-5 w-5 text-gray-500" />
                            <span>Free shipping on orders over $50</span>
                          </div>
                          <div className="flex gap-3 items-center text-sm text-gray-600">
                            <PackageCheck className="h-5 w-5 text-gray-500" />
                            <span>In stock, ready to ship</span>
                          </div>
                          <div className="flex gap-3 items-center text-sm text-gray-600">
                            <RotateCcw className="h-5 w-5 text-gray-500" />
                            <span>30-day returns policy</span>
                          </div>
                        </div>
                        
                        {/* Product specifications */}
                        <div className="mb-4">
                          <h3 className="font-medium text-lg mb-3">Product Details</h3>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {specifications.map((spec, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" />
                                <span className="text-gray-900 font-medium">{spec.name}:</span>
                                <span className="text-gray-600">{spec.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Product Tabs */}
                    <div className="mt-16 mb-10">
                      <div className="border-b">
                        <div className="flex -mb-px space-x-8">
                          {["description", "specifications", "reviews"].map((tab) => (
                            <button
                              key={tab}
                              className={`py-4 text-sm font-medium border-b-2 ${
                                selectedTab === tab
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                              }`}
                              onClick={() => setSelectedTab(tab)}
                            >
                              {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="py-8">
                        {selectedTab === "description" && (
                          <div className="prose prose-sm max-w-none text-gray-600">
                            {productData.description ? (
                              <div dangerouslySetInnerHTML={{ __html: productData.description }} />
                            ) : (
                              <p>No description provided.</p>
                            )}
                          </div>
                        )}
                        
                        {selectedTab === "specifications" && (
                          <div className="bg-white rounded-lg border">
                            {specifications.map((spec, idx) => (
                              <div key={idx} className={`flex py-3 px-4 ${idx !== specifications.length - 1 ? 'border-b' : ''}`}>
                                <div className="w-1/3 font-medium text-gray-900">{spec.name}</div>
                                <div className="w-2/3 text-gray-600">{spec.value}</div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {selectedTab === "reviews" && (
                          <div className="space-y-8">
                            <div className="flex items-center">
                              <div className="flex items-center">
                                {Array(5).fill(0).map((_, i) => (
                                  <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill={i < 4 ? 'currentColor' : 'none'} />
                                ))}
                              </div>
                              <p className="ml-2 text-gray-900">4.0 out of 5</p>
                              <span className="ml-4 text-sm text-gray-600">{reviews.length} reviews</span>
                            </div>
                            
                            <div className="space-y-6">
                              {reviews.map(review => (
                                <div key={review.id} className="border-b pb-6">
                                  <div className="flex items-center mb-1">
                                    <div className="flex items-center">
                                      {Array(5).fill(0).map((_, i) => (
                                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill={i < review.rating ? 'currentColor' : 'none'} />
                                      ))}
                                    </div>
                                    <span className="ml-3 text-sm font-medium text-gray-900">{review.author}</span>
                                    <span className="ml-3 text-sm text-gray-500">{review.date}</span>
                                  </div>
                                  <p className="text-gray-600">{review.text}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Related products */}
                    <div className="mb-10">
                      <h3 className="text-lg font-medium text-gray-900 mb-5">You might also like</h3>
                      <div className="grid grid-cols-4 gap-5">
                        {relatedProducts.map(product => (
                          <div key={product.id} className="border rounded-lg overflow-hidden group">
                            <div className="aspect-square bg-gray-100 relative">
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="p-3">
                              <h4 className="font-medium text-gray-900 truncate">{product.name}</h4>
                              <div className="flex justify-between items-center mt-1">
                                <span className="text-gray-900">${product.price.toFixed(2)}</span>
                                <Button variant="ghost" size="sm">
                                  <ShoppingBag className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>
            
            {/* Tablet View */}
            <TabsContent value="tablet" className="h-full mt-0">
              <div className="mx-auto bg-white rounded-lg shadow-md overflow-hidden h-full max-w-[768px] border border-gray-200">
                <ScrollArea className="h-full">
                  <div className="p-6">
                    {/* Navigation breadcrumbs */}
                    <div className="mb-4 flex items-center text-xs text-gray-500">
                      <span>Home</span>
                      <ChevronRight className="h-3 w-3 mx-1" />
                      <span>{productData.productCategory || 'Products'}</span>
                      <ChevronRight className="h-3 w-3 mx-1" />
                      <span className="text-gray-700">{productData.title || 'Product'}</span>
                    </div>
                    
                    {/* Similar layout as desktop but adapted for tablet */}
                    <div className="flex flex-col">
                      {/* Media */}
                      <div className="mb-6">
                        <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 max-w-[500px] mx-auto shadow-sm border">
                          <img 
                            src={currentImage} 
                            alt={productData.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Thumbnail Grid */}
                        {allProductImages.length > 1 && (
                          <div className="grid grid-cols-6 gap-2 mt-4 max-w-[500px] mx-auto">
                            {allProductImages.slice(0, 6).map((item, idx) => (
                              <div 
                                key={item.id} 
                                className={`aspect-square rounded-md overflow-hidden border cursor-pointer ${selectedImageIndex === idx ? 'ring-2 ring-blue-500 border-blue-500' : 'hover:border-gray-400'}`}
                                onClick={() => setSelectedImageIndex(idx)}
                              >
                                <img 
                                  src={item.url} 
                                  alt={`${productData.title} thumbnail ${idx + 1}`} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {/* Product Info */}
                      <div className="px-3">
                        {/* Vendor & ratings */}
                        <div className="flex items-center justify-between mb-2">
                          {productData.vendor && (
                            <div className="text-sm font-medium text-indigo-600">
                              {productData.vendor}
                            </div>
                          )}
                          
                          <div className="flex items-center">
                            <div className="flex">
                              {Array(5).fill(0).map((_, i) => (
                                <Star key={i} className={`h-3.5 w-3.5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill={i < 4 ? 'currentColor' : 'none'} />
                              ))}
                            </div>
                            <span className="text-xs text-gray-600 ml-2">(42)</span>
                          </div>
                        </div>
                        
                        {/* Title */}
                        <h1 className="text-xl font-bold mb-3">
                          {productData.title || 'Product Title'}
                        </h1>
                        
                        {/* Price */}
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-lg font-bold">{formatPrice(displayPrice)}</span>
                          {displayComparePrice && displayComparePrice > (displayPrice || 0) && (
                            <>
                              <span className="text-sm text-gray-500 line-through">{formatPrice(displayComparePrice)}</span>
                              {discountPercentage && (
                                <Badge className="ml-1 bg-green-100 text-green-800 text-xs">
                                  {discountPercentage}% OFF
                                </Badge>
                              )}
                            </>
                          )}
                        </div>
                        
                        {/* Variants simplified */}
                        {productData.hasVariants && productData.options && productData.options.length > 0 && (
                          <div className="space-y-4 mb-5">
                            {productData.options.map(option => (
                              <div key={option.id}>
                                <h3 className="text-sm font-medium mb-2">{option.name}</h3>
                                <div className="flex flex-wrap gap-2">
                                  {option.values.filter(v => v.trim() !== '').map((value, idx) => (
                                    <Badge 
                                      key={idx}
                                      variant="outline" 
                                      className={`rounded-lg px-3 py-1 cursor-pointer ${idx === 0 ? 'bg-gray-100 border-gray-400' : 'bg-white'}`}
                                    >
                                      {value}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Action buttons */}
                        <div className="flex gap-2 mb-6">
                          <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            Add to Cart
                          </Button>
                          <Button variant="outline" className="w-10 p-0">
                            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                          </Button>
                        </div>
                        
                        {/* Tabs */}
                        <Tabs defaultValue="details" className="mb-6">
                          <TabsList className="grid w-full grid-cols-3 h-10">
                            <TabsTrigger value="details">Details</TabsTrigger>
                            <TabsTrigger value="shipping">Shipping</TabsTrigger>
                            <TabsTrigger value="reviews">Reviews</TabsTrigger>
                          </TabsList>
                          <TabsContent value="details" className="pt-4 px-1 text-sm text-gray-600">
                            {productData.description ? (
                              <div className="mb-4" dangerouslySetInnerHTML={{ __html: productData.description }} />
                            ) : (
                              <p>No description provided.</p>
                            )}
                            
                            <div className="mt-3 pt-3 border-t">
                              <h4 className="font-medium text-gray-900 mb-2">Product Specifications</h4>
                              <div className="grid grid-cols-1 gap-1.5">
                                {specifications.map((spec, idx) => (
                                  <div key={idx} className="flex items-center gap-1.5">
                                    <Check className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                                    <span className="text-gray-900 font-medium">{spec.name}:</span>
                                    <span className="text-gray-600">{spec.value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </TabsContent>
                          <TabsContent value="shipping" className="pt-4 px-1 space-y-3">
                            <p className="text-sm text-gray-500 flex items-center gap-2">
                              <TruckIcon className="h-4 w-4" />
                              Fast delivery: 2-4 business days
                            </p>
                            <p className="text-sm text-gray-500 flex items-center gap-2">
                              <PackageCheck className="h-4 w-4" />
                              Available in stock: Ready to ship
                            </p>
                            <p className="text-sm text-gray-500 flex items-center gap-2">
                              <RotateCcw className="h-4 w-4" />
                              Easy returns within 30 days
                            </p>
                          </TabsContent>
                          <TabsContent value="reviews" className="pt-4 px-1">
                            <div className="space-y-4">
                              {reviews.slice(0, 2).map(review => (
                                <div key={review.id} className="border-b pb-4">
                                  <div className="flex items-center mb-1">
                                    <div className="flex items-center">
                                      {Array(5).fill(0).map((_, i) => (
                                        <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill={i < review.rating ? 'currentColor' : 'none'} />
                                      ))}
                                    </div>
                                    <span className="ml-2 text-xs font-medium text-gray-900">{review.author}</span>
                                  </div>
                                  <p className="text-xs text-gray-600">{review.text}</p>
                                </div>
                              ))}
                              <Button variant="outline" size="sm" className="w-full text-xs">
                                View all {reviews.length} reviews
                              </Button>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>
            
            {/* Mobile View */}
            <TabsContent value="mobile" className="h-full mt-0">
              <div className="mx-auto bg-white rounded-lg shadow-md overflow-hidden h-full max-w-[375px] border border-gray-200">
                <ScrollArea className="h-full">
                  <div className="p-4">
                    {/* Mobile Header */}
                    <div className="flex items-center justify-between mb-4">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ChevronRight className="h-4 w-4 rotate-180" />
                      </Button>
                      <div className="flex gap-3">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} onClick={() => setIsFavorite(!isFavorite)} />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Mobile Product View */}
                    <div className="flex flex-col">
                      {/* Media */}
                      <div className="mb-4">
                        <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                          <img 
                            src={currentImage} 
                            alt={productData.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      {/* Thumbnail indicator dots */}
                      {allProductImages.length > 1 && (
                        <div className="flex justify-center gap-1.5 mb-4">
                          {allProductImages.slice(0, 5).map((_, idx) => (
                            <button
                              key={idx}
                              className={`h-1.5 rounded-full ${selectedImageIndex === idx ? 'w-4 bg-blue-500' : 'w-1.5 bg-gray-300'}`}
                              onClick={() => setSelectedImageIndex(idx)}
                            />
                          ))}
                        </div>
                      )}
                      
                      {/* Product Info */}
                      <div className="px-2">
                        {/* Vendor & ratings */}
                        <div className="flex items-center justify-between mb-1">
                          {productData.vendor && (
                            <div className="text-xs font-medium text-indigo-600">
                              {productData.vendor}
                            </div>
                          )}
                          
                          <div className="flex items-center">
                            <div className="flex">
                              {Array(5).fill(0).map((_, i) => (
                                <Star key={i} className={`h-3 w-3 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill={i < 4 ? 'currentColor' : 'none'} />
                              ))}
                            </div>
                            <span className="text-xs text-gray-600 ml-1">(42)</span>
                          </div>
                        </div>
                        
                        {/* Title */}
                        <h1 className="text-lg font-bold mb-2">
                          {productData.title || 'Product Title'}
                        </h1>
                        
                        {/* Price */}
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-base font-bold">{formatPrice(displayPrice)}</span>
                          {displayComparePrice && displayComparePrice > (displayPrice || 0) && (
                            <span className="text-xs text-gray-500 line-through">{formatPrice(displayComparePrice)}</span>
                          )}
                        </div>
                        
                        {/* Simplified variants */}
                        {productData.hasVariants && productData.options && productData.options.length > 0 && (
                          <div className="space-y-3 mb-4">
                            {productData.options.map(option => (
                              <div key={option.id}>
                                <h3 className="text-xs font-medium mb-1.5">{option.name}</h3>
                                <div className="flex flex-wrap gap-1.5">
                                  {option.values.filter(v => v.trim() !== '').map((value, idx) => (
                                    <Badge 
                                      key={idx}
                                      variant="outline" 
                                      className={`text-xs rounded px-2 py-0.5 cursor-pointer ${idx === 0 ? 'bg-gray-100 border-gray-400' : 'bg-white'}`}
                                    >
                                      {value}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Add to Cart Button (not fixed) */}
                        <div className="mb-6">
                          <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            Add to Cart
                          </Button>
                        </div>
                        
                        {/* Brief description */}
                        <div className="text-xs text-gray-600 mb-6">
                          {productData.description ? (
                            <div dangerouslySetInnerHTML={{ __html: productData.description.slice(0, 100) + '...' }} />
                          ) : (
                            <p>No description provided.</p>
                          )}
                          <Button variant="link" size="sm" className="text-xs p-0 h-auto mt-1">
                            Read more
                          </Button>
                        </div>
                        
                        {/* Mobile shipping info */}
                        <div className="space-y-2 mb-4">
                          <div className="flex gap-2 items-center text-xs text-gray-600">
                            <Check className="h-3.5 w-3.5 text-green-500" />
                            <span>In stock, ships in 1-2 days</span>
                          </div>
                          <div className="flex gap-2 items-center text-xs text-gray-600">
                            <Check className="h-3.5 w-3.5 text-green-500" />
                            <span>Free returns within 30 days</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <DialogFooter className="p-4 border-t bg-gray-50">
          <div className="flex justify-between w-full">
            <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
              Close Preview
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleSharePreview}>
                <Share2 className="h-4 w-4 mr-1.5" />
                Share Preview
              </Button>
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700" onClick={openInNewTab}>
                <ExternalLink className="h-4 w-4 mr-1.5" />
                Open in New Tab
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductPreviewDialog; 