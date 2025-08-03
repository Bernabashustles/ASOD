'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Package, 
  Plus,
  Upload,
  ChevronRight,
  DollarSign,
  RefreshCcw,
  ExternalLink,
  Search,
  Clock,
  ShoppingBag,
  Upload as UploadIcon,
  Globe,
  AlertCircle,
  CheckCircle2,
  X,
  Info,
  Link as LinkIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

// Helper function to format currency
const formatCurrency = (value: number) => {
  return `ETB ${value.toFixed(2)}`;
};

export default function ReturnPage() {
  const router = useRouter();
  const { id } = useParams();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [shippingMethod, setShippingMethod] = useState<'label' | 'url' | 'none'>('label');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shippingCarrier, setShippingCarrier] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [labelUrl, setLabelUrl] = useState('');
  
  // Mock order data
  const orderDetails = {
    id: '1004-F1',
    items: [
      {
        id: '1',
        name: 'test',
        variant: 'Bardot / Unisex',
        price: 4000.00,
        quantity: 1,
        weight: '0 kg',
        image: '/placeholder-product.png'
      }
    ],
    shippedFrom: 'Shop location'
  };

  const handleItemSelection = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleCreateReturn = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setShowSuccessMessage(true);
      setTimeout(() => {
        router.push(`/orders/${id}`);
      }, 1500);
    }, 1000);
  };

  const handleFileUpload = () => {
    // Simulate file upload
    alert('File upload would be handled here');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container py-8 space-y-6 max-w-5xl">
        {/* Header with breadcrumbs */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/orders" className="hover:text-primary transition-colors">Orders</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/orders/${id}`} className="hover:text-primary transition-colors">Order #{orderDetails.id.split('-')[0]}</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">Return & Exchange</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href={`/orders/${id}`}>
                <Button variant="outline" size="icon" className="h-9 w-9 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-md">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">Return and Exchange</h1>
              <Badge variant="outline" className="rounded-full px-3 py-1 text-sm font-semibold bg-gray-100">
                #{orderDetails.id}
              </Badge>
            </div>
            
            <div className="flex items-center gap-3">
              <Link href={`/orders/${id}/refund`}>
                <Button variant="outline" className="gap-2">
                  <DollarSign className="h-4 w-4" />
                  Process Refund Instead
                </Button>
              </Link>
            </div>
          </div>
          
          <Separator className="my-2" />
        </div>

        {/* Self-serve returns section */}
        <Card className="overflow-hidden border-blue-100 shadow-md transition-all duration-200 hover:shadow-lg">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-0.5">
            <CardContent className="p-6 bg-white rounded-t-lg">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">Self-serve returns</h3>
                    <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-200 font-normal">New</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground max-w-lg">
                    Customers can now submit return requests from their accounts without having to email or call you. It streamlines your returns process and saves you time.
                  </p>
                  <Button variant="outline" size="sm" className="gap-2 group">
                    <span>Go to self-serve returns</span>
                    <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </div>
                <div className="flex-shrink-0 hidden md:block">
                  <div className="w-24 h-24 rounded-lg bg-blue-50 flex items-center justify-center">
                    <RefreshCcw className="h-10 w-10 text-blue-500" />
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="md:col-span-2 space-y-6">
            <Tabs defaultValue="items" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="items" className="text-sm font-medium">Return Items</TabsTrigger>
                <TabsTrigger value="exchange" className="text-sm font-medium">Exchange Items</TabsTrigger>
                <TabsTrigger value="shipping" className="text-sm font-medium">Shipping Options</TabsTrigger>
              </TabsList>
              
              <TabsContent value="items" className="space-y-6">
                {/* Select return items */}
                <Card className="overflow-hidden">
                  <CardHeader className="bg-gray-50 border-b">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5 text-gray-600" />
                      Return Items Selection
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="bg-gray-50 px-5 py-3 border-b flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium">Shipped from {orderDetails.shippedFrom}</span>
                      </div>
                      <Badge variant="outline" className="font-normal bg-white">
                        {orderDetails.id}
                      </Badge>
                    </div>
                    
                    <div className="divide-y">
                      {orderDetails.items.map((item) => (
                        <div key={item.id} 
                          className={cn(
                            "flex items-center gap-4 p-5 transition-colors",
                            selectedItems.includes(item.id) ? "bg-blue-50/50" : "hover:bg-gray-50"
                          )}
                        >
                          <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden border shadow-sm">
                            {item.image ? (
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            ) : (
                              <Package className="h-8 w-8 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-lg truncate">{item.name}</div>
                            <div className="text-sm text-muted-foreground mb-1.5">{item.variant}</div>
                            <div className="flex flex-wrap items-center gap-3">
                              <Badge variant="secondary" className="font-normal bg-gray-100 text-gray-700">
                                {formatCurrency(item.price)}
                              </Badge>
                              <div className="flex items-center gap-1.5">
                                <span className="text-sm text-muted-foreground">×</span>
                                <Badge variant="outline" className="font-mono">
                                  {item.quantity}
                                </Badge>
                              </div>
                              <div className="text-sm text-muted-foreground">{item.weight}</div>
                            </div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="relative">
                              <Input 
                                type="number"
                                min="0"
                                max={item.quantity}
                                value={selectedItems.includes(item.id) ? "1" : "0"}
                                onChange={(e) => {
                                  if (parseInt(e.target.value) > 0) {
                                    if (!selectedItems.includes(item.id)) {
                                      handleItemSelection(item.id);
                                    }
                                  } else {
                                    if (selectedItems.includes(item.id)) {
                                      handleItemSelection(item.id);
                                    }
                                  }
                                }}
                                className={cn(
                                  "w-20 text-center font-medium transition-all",
                                  selectedItems.includes(item.id) && "border-blue-400 ring-1 ring-blue-200"
                                )}
                              />
                              {selectedItems.includes(item.id) && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                  <CheckCircle2 className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                            <div className="text-center text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                              <span>of</span>
                              <span className="font-medium">{item.quantity}</span>
                              <span>available</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="exchange" className="space-y-6">
                {/* Exchange items */}
                <Card className="overflow-hidden">
                  <CardHeader className="bg-gray-50 border-b">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <RefreshCcw className="h-5 w-5 text-gray-600" />
                      Exchange Products
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5">
                    <div className="text-sm text-muted-foreground mb-4">
                      Select items to be sent to the customer as replacements
                    </div>
                    
                    <div className="bg-gray-50 border rounded-lg p-8 flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <Plus className="h-6 w-6 text-gray-400" />
                      </div>
                      <h3 className="font-medium text-lg mb-2">Add Exchange Products</h3>
                      <p className="text-sm text-muted-foreground mb-4 max-w-md">
                        Choose products from your inventory to send as replacements for the returned items
                      </p>
                      <Button className="gap-2">
                        <Search className="h-4 w-4" />
                        Browse Products
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="shipping" className="space-y-6">
                {/* Return shipping options */}
                <Card className="overflow-hidden">
                  <CardHeader className="bg-gray-50 border-b">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Globe className="h-5 w-5 text-gray-600" />
                      Shipping Options
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 divide-y">
                    <div className="pb-5">
                      <RadioGroup 
                        defaultValue="label" 
                        onValueChange={(val) => setShippingMethod(val as any)}
                        className="space-y-4"
                      >
                        <div className={cn(
                          "flex items-start gap-3 p-4 rounded-lg border transition-all",
                          shippingMethod === 'label' ? "bg-blue-50/50 border-blue-200 ring-1 ring-blue-100" : "hover:bg-gray-50"
                        )}>
                          <RadioGroupItem value="label" id="r1" className="mt-1" />
                          <div className="space-y-1.5">
                            <Label htmlFor="r1" className="font-medium">Upload a return label</Label>
                            <p className="text-sm text-muted-foreground">
                              Upload a pre-paid shipping label for the customer to use
                            </p>
                          </div>
                        </div>
                        
                        <div className={cn(
                          "flex items-start gap-3 p-4 rounded-lg border transition-all",
                          shippingMethod === 'url' ? "bg-blue-50/50 border-blue-200 ring-1 ring-blue-100" : "hover:bg-gray-50"
                        )}>
                          <RadioGroupItem value="url" id="r2" className="mt-1" />
                          <div className="space-y-1.5">
                            <Label htmlFor="r2" className="font-medium">Use return label URL</Label>
                            <p className="text-sm text-muted-foreground">
                              Provide a URL where the customer can download or access the return label
                            </p>
                            {shippingMethod === 'url' && (
                              <div className="pt-3">
                                <Input 
                                  value={labelUrl}
                                  onChange={(e) => setLabelUrl(e.target.value)}
                                  placeholder="https://example.com/return-label.pdf"
                                  className="w-full"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className={cn(
                          "flex items-start gap-3 p-4 rounded-lg border transition-all",
                          shippingMethod === 'none' ? "bg-blue-50/50 border-blue-200 ring-1 ring-blue-100" : "hover:bg-gray-50"
                        )}>
                          <RadioGroupItem value="none" id="r3" className="mt-1" />
                          <div className="space-y-1.5">
                            <Label htmlFor="r3" className="font-medium">No shipping required</Label>
                            <p className="text-sm text-muted-foreground">
                              The customer doesn't need to ship anything back
                            </p>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    {shippingMethod === 'label' && (
                      <div className="pt-5 space-y-5">
                        <div>
                          <h3 className="font-medium mb-3">Upload return label</h3>
                          <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer" onClick={handleFileUpload}>
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                              <UploadIcon className="h-5 w-5 text-blue-600" />
                            </div>
                            <p className="font-medium mb-1">Drop file here or click to upload</p>
                            <p className="text-sm text-muted-foreground mb-3">
                              Accepted file formats: PDF, PNG, JPG
                            </p>
                            <Button variant="outline" size="sm" className="gap-2">
                              <UploadIcon className="h-3.5 w-3.5" />
                              Select File
                            </Button>
                          </div>
                          <div className="mt-3 flex justify-end">
                            <Button variant="link" className="p-0 h-auto text-sm gap-1" onClick={() => setShippingMethod('url')}>
                              <LinkIcon className="h-3.5 w-3.5" />
                              Use return label URL instead
                            </Button>
                          </div>
                        </div>

                        {/* Tracking information */}
                        <div className="space-y-4 pt-4">
                          <h3 className="font-medium mb-2">Shipping details</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="tracking" className="text-sm">Tracking number</Label>
                              <Input 
                                id="tracking" 
                                value={trackingNumber}
                                onChange={(e) => setTrackingNumber(e.target.value)}
                                placeholder="Enter tracking number"
                                className="focus:ring-1 focus:ring-blue-200"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="carrier" className="text-sm">Shipping carrier</Label>
                              <Select value={shippingCarrier} onValueChange={setShippingCarrier}>
                                <SelectTrigger id="carrier" className="focus:ring-1 focus:ring-blue-200">
                                  <SelectValue placeholder="Select carrier" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="fedex">FedEx</SelectItem>
                                  <SelectItem value="ups">UPS</SelectItem>
                                  <SelectItem value="dhl">DHL</SelectItem>
                                  <SelectItem value="usps">USPS</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="text-center text-sm bg-gray-50 border rounded-lg p-4 mt-6">
              <span className="text-muted-foreground">Need help? Learn more about </span>
              <Link href="#" className="text-blue-600 hover:underline font-medium">creating returns</Link>
            </div>
          </div>

          {/* Sidebar / Summary */}
          <div className="space-y-6">
            <div className="sticky top-6">
              <Card className="border-blue-100 shadow-md overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-gray-50 border-b pb-5">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <RefreshCcw className="h-5 w-5 text-blue-600" />
                    Return Summary
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-5">
                  {selectedItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                        <Package className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">No items selected</p>
                        <p className="text-xs text-muted-foreground">Select items to process return</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm font-medium mb-2">Selected Items</div>
                        {orderDetails.items
                          .filter(item => selectedItems.includes(item.id))
                          .map(item => (
                            <div key={item.id} className="flex justify-between items-center text-sm py-1">
                              <span>{item.name} × 1</span>
                              <span>{formatCurrency(item.price)}</span>
                            </div>
                          ))
                        }
                      </div>
                      
                      {shippingMethod !== 'none' && (
                        <div className="flex items-center gap-2 px-3 py-2 bg-yellow-50 rounded-md border border-yellow-100 text-sm">
                          <AlertCircle className="h-4 w-4 text-yellow-600 flex-shrink-0" />
                          <span className="text-yellow-800">
                            {shippingMethod === 'label' ? 'Return label required' : 'Return label URL required'}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
                
                <CardFooter className="p-5 pt-0">
                  <Button 
                    className="w-full h-11 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all duration-200"
                    onClick={handleCreateReturn}
                    disabled={selectedItems.length === 0 || isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </div>
                    ) : showSuccessMessage ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Return Created!</span>
                      </div>
                    ) : (
                      <span>Create Return</span>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 