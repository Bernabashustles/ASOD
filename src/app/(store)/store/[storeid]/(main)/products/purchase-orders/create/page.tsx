'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Calendar, 
  Search,
  Plus,
  X,
  ChevronDown,
  Package,
  Building2,
  DollarSign,
  Truck,
  FileText,
  Tag
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function CreatePurchaseOrderPage() {
  const router = useRouter();
  const [isProductBrowserOpen, setIsProductBrowserOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

  // Form state
  const [formData, setFormData] = useState({
    supplier: '',
    destination: '',
    paymentTerms: '',
    currency: 'ETB',
    estimatedArrival: '',
    shippingCarrier: '',
    trackingNumber: '',
    referenceNumber: '',
    notes: '',
    tags: '',
  });

  // Cost summary
  const [costSummary, setCostSummary] = useState({
    subtotal: 0,
    taxes: 0,
    shipping: 0,
    total: 0
  });

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="px-4 py-4 max-w-[1200px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleBack}
                className="hover:bg-gray-100 rounded-full flex-shrink-0"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Button>
              <div className="min-w-0">
                <h1 className="text-xl font-semibold text-gray-900 truncate">Create Purchase Order</h1>
                <p className="text-sm text-gray-500 truncate">Create a new purchase order for your inventory</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">Save as Draft</Button>
              <Button size="sm" className="flex-1 sm:flex-none">Create Order</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-12 gap-4">
          {/* Main Form */}
          <div className="col-span-12 lg:col-span-8 space-y-4">
            {/* Basic Information */}
            <Card>
              <CardContent className="p-4 sm:p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-gray-600">Supplier</Label>
                      <Select value={formData.supplier} onValueChange={(value) => handleFormChange('supplier', value)}>
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="Select supplier" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sup1">Addis Textiles Ltd</SelectItem>
                          <SelectItem value="sup2">Bishoftu Electronics</SelectItem>
                          <SelectItem value="sup3">Awassa Food Supplies</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-gray-600">Payment Terms (optional)</Label>
                      <Select value={formData.paymentTerms} onValueChange={(value) => handleFormChange('paymentTerms', value)}>
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="None" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="net15">Net 15</SelectItem>
                          <SelectItem value="net30">Net 30</SelectItem>
                          <SelectItem value="net45">Net 45</SelectItem>
                          <SelectItem value="net60">Net 60</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-gray-600">Destination</Label>
                      <Select value={formData.destination} onValueChange={(value) => handleFormChange('destination', value)}>
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="Select destination" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="loc1">Main Warehouse</SelectItem>
                          <SelectItem value="loc2">Downtown Store</SelectItem>
                          <SelectItem value="loc3">Distribution Center</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-gray-600">Supplier Currency</Label>
                      <Select value={formData.currency} onValueChange={(value) => handleFormChange('currency', value)}>
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ETB">Ethiopian Birr (ETB)</SelectItem>
                          <SelectItem value="USD">US Dollar (USD)</SelectItem>
                          <SelectItem value="EUR">Euro (EUR)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipment Details */}
            <Card>
              <CardContent className="p-4 sm:p-5">
                <h3 className="text-base font-medium text-gray-900 mb-4">Shipment Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-gray-600">Estimated Arrival</Label>
                    <div className="relative mt-1">
                      <Input
                        type="date"
                        value={formData.estimatedArrival}
                        onChange={(e) => handleFormChange('estimatedArrival', e.target.value)}
                        className="w-full pl-10"
                      />
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-600">Shipping Carrier</Label>
                    <Select value={formData.shippingCarrier} onValueChange={(value) => handleFormChange('shippingCarrier', value)}>
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Select carrier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ethio">Ethiopian Airlines Cargo</SelectItem>
                        <SelectItem value="dhl">DHL</SelectItem>
                        <SelectItem value="fedex">FedEx</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-gray-600">Tracking Number</Label>
                    <Input
                      type="text"
                      value={formData.trackingNumber}
                      onChange={(e) => handleFormChange('trackingNumber', e.target.value)}
                      placeholder="Enter tracking number"
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Products */}
            <Card>
              <CardContent className="p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <h3 className="text-base font-medium text-gray-900">Products</h3>
                  <Button size="sm" onClick={() => setIsProductBrowserOpen(true)} className="w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Products
                  </Button>
                </div>

                {selectedProducts.length === 0 ? (
                  <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                    <Package className="h-12 w-12 mx-auto text-gray-300" />
                    <p className="mt-2 text-sm text-gray-500">No products added yet</p>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => setIsProductBrowserOpen(true)}
                      className="mt-3"
                    >
                      Browse Products
                    </Button>
                  </div>
                ) : (
                  <div className="border rounded-lg overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead className="text-right">Quantity</TableHead>
                          <TableHead className="text-right hidden sm:table-cell">Unit Price</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {/* Product rows will go here */}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Additional Details */}
            <Card>
              <CardContent className="p-4 sm:p-5">
                <h3 className="text-base font-medium text-gray-900 mb-4">Additional Details</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-600">Reference Number</Label>
                    <Input
                      type="text"
                      value={formData.referenceNumber}
                      onChange={(e) => handleFormChange('referenceNumber', e.target.value)}
                      placeholder="Enter reference number"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-600">Note to Supplier</Label>
                    <Textarea
                      value={formData.notes}
                      onChange={(e) => handleFormChange('notes', e.target.value)}
                      placeholder="Add any notes or instructions for the supplier"
                      className="mt-1 h-24"
                    />
                    <div className="text-xs text-gray-500 mt-1 text-right">0/5000</div>
                  </div>
                  <div>
                    <Label className="text-gray-600">Tags</Label>
                    <Input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => handleFormChange('tags', e.target.value)}
                      placeholder="Enter tags separated by commas"
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cost Summary Sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-4">
            <Card>
              <CardContent className="p-4 sm:p-5">
                <h3 className="text-base font-medium text-gray-900 mb-4">Cost Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">ETB 0.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Taxes (Included)</span>
                    <span className="font-medium">ETB 0.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">ETB 0.00</span>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between text-sm font-medium">
                    <span>Total</span>
                    <span>ETB 0.00</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    0 items
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Product Browser Dialog */}
      <Dialog open={isProductBrowserOpen} onOpenChange={setIsProductBrowserOpen}>
        <DialogContent className="sm:max-w-[800px] w-[95vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Products</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-10"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="food">Food & Beverages</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="border rounded-lg overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]"></TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead className="hidden sm:table-cell">SKU</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead className="text-right">Unit Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Product rows will go here */}
                </TableBody>
              </Table>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 