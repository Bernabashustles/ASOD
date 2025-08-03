'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft,
  Package,
  Calendar,
  Building2,
  Truck,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Download,
  Printer,
  Edit,
  MoreHorizontal,
  Plus,
  Trash2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Mock data for development - replace with actual data fetching
const mockOrder = {
  id: '1',
  orderNumber: 'PO-2024-001',
  status: 'open',
  paymentStatus: 'unpaid',
  supplier: {
    name: 'Addis Textiles Ltd',
    contact: 'John Doe',
    email: 'john@addistextiles.com',
    phone: '+251 911 234 567',
    address: '123 Bole Road, Addis Ababa'
  },
  destination: 'Main Warehouse',
  currency: 'ETB',
  estimatedArrival: '2024-04-01',
  shippingCarrier: 'Ethiopian Airlines Cargo',
  trackingNumber: 'ET123456789',
  referenceNumber: 'REF-001',
  notes: 'Please ensure all items are properly packaged.',
  createdAt: '2024-03-15',
  items: [
    {
      id: '1',
      product: {
        name: 'Cotton T-Shirt',
        sku: 'TSH-001',
        imageUrl: '/placeholder.png'
      },
      quantity: 100,
      unitPrice: 150,
      totalPrice: 15000,
      received: 0
    }
  ],
  subtotal: 15000,
  tax: 2250,
  shipping: 500,
  total: 17750
};

export default function PurchaseOrderDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isReceiveItemsOpen, setIsReceiveItemsOpen] = useState(false);
  const [currentOrder] = useState(mockOrder); // Replace with actual data fetching

  const handleBack = () => {
    router.back();
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { label: 'Draft', className: 'bg-gray-100 text-gray-800' },
      open: { label: 'Open', className: 'bg-blue-100 text-blue-800' },
      partial: { label: 'Partially Received', className: 'bg-yellow-100 text-yellow-800' },
      received: { label: 'Received', className: 'bg-green-100 text-green-800' },
      canceled: { label: 'Canceled', className: 'bg-red-100 text-red-800' }
    }[status] || { label: 'Unknown', className: 'bg-gray-100 text-gray-800' };

    return (
      <Badge variant="secondary" className={statusConfig.className}>
        {statusConfig.label}
      </Badge>
    );
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig = {
      unpaid: { label: 'Unpaid', className: 'bg-red-100 text-red-800' },
      partial: { label: 'Partially Paid', className: 'bg-yellow-100 text-yellow-800' },
      paid: { label: 'Paid', className: 'bg-green-100 text-green-800' }
    }[status] || { label: 'Unknown', className: 'bg-gray-100 text-gray-800' };

    return (
      <Badge variant="secondary" className={statusConfig.className}>
        {statusConfig.label}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header - Make more responsive */}
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
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-xl font-semibold text-gray-900 truncate">Purchase Order: {currentOrder.orderNumber}</h1>
                  {getStatusBadge(currentOrder.status)}
                </div>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 flex-wrap">
                  <Clock className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">Created on {new Date(currentOrder.createdAt).toLocaleDateString()}</span>
                  <span className="mx-2 hidden sm:inline">•</span>
                  {getPaymentStatusBadge(currentOrder.paymentStatus)}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button 
                size="sm"
                onClick={() => setIsReceiveItemsOpen(true)}
                disabled={!['open', 'partial'].includes(currentOrder.status)}
                className="flex-1 sm:flex-none"
              >
                <Package className="h-4 w-4 mr-2" />
                Receive Items
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-12 gap-4">
          {/* Main Content - Already responsive with col-span-12 lg:col-span-8 */}
          <div className="col-span-12 lg:col-span-8 space-y-4">
            {/* Order Information - Make cards more responsive */}
            <Card>
              <CardContent className="p-4 sm:p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">Supplier Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                          <Building2 className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-gray-900 truncate">{currentOrder.supplier.name}</div>
                          <div className="text-sm text-gray-500 truncate">{currentOrder.supplier.contact}</div>
                        </div>
                      </div>
                      <div className="text-sm space-y-1 text-gray-600">
                        <div className="truncate">{currentOrder.supplier.email}</div>
                        <div className="truncate">{currentOrder.supplier.phone}</div>
                        <div className="truncate">{currentOrder.supplier.address}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">Shipping Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                          <Truck className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-gray-900 truncate">{currentOrder.destination}</div>
                          <div className="text-sm text-gray-500">Delivery Location</div>
                        </div>
                      </div>
                      <div className="text-sm space-y-1 text-gray-600">
                        <div className="truncate">Carrier: {currentOrder.shippingCarrier}</div>
                        <div className="truncate">Tracking: {currentOrder.trackingNumber}</div>
                        <div className="truncate">Expected: {new Date(currentOrder.estimatedArrival).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Items - Make table responsive */}
            <Card>
              <CardContent className="p-4 sm:p-5">
                <h3 className="font-medium text-gray-900 mb-4">Order Items</h3>
                <div className="border rounded-lg overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right hidden sm:table-cell">Unit Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="text-right">Received</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentOrder.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center flex-shrink-0">
                                <Package className="h-5 w-5 text-gray-500" />
                              </div>
                              <div className="min-w-0">
                                <div className="font-medium text-gray-900 truncate">{item.product.name}</div>
                                <div className="text-sm text-gray-500 truncate">SKU: {item.product.sku}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right hidden sm:table-cell">
                            {currentOrder.currency} {item.unitPrice.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">{currentOrder.currency} {item.totalPrice.toLocaleString()}</TableCell>
                          <TableCell className="text-right">{item.received}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Additional Details */}
            <Card>
              <CardContent className="p-4 sm:p-5">
                <h3 className="font-medium text-gray-900 mb-4">Additional Details</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-600">Reference Number</Label>
                    <div className="text-sm text-gray-900 mt-1 break-all">{currentOrder.referenceNumber}</div>
                  </div>
                  <div>
                    <Label className="text-gray-600">Notes</Label>
                    <div className="text-sm text-gray-900 mt-1 whitespace-pre-wrap">{currentOrder.notes}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Already responsive with col-span-12 lg:col-span-4 */}
          <div className="col-span-12 lg:col-span-4 space-y-4">
            {/* Cost Summary */}
            <Card>
              <CardContent className="p-4 sm:p-5">
                <h3 className="font-medium text-gray-900 mb-4">Cost Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{currentOrder.currency} {currentOrder.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">{currentOrder.currency} {currentOrder.tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">{currentOrder.currency} {currentOrder.shipping.toLocaleString()}</span>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{currentOrder.currency} {currentOrder.total.toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    {currentOrder.items.length} items
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Timeline */}
            <Card>
              <CardContent className="p-4 sm:p-5">
                <h3 className="font-medium text-gray-900 mb-4">Activity Timeline</h3>
                <div className="space-y-4">
                  {/* Add activity timeline items here */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Receive Items Dialog - Make dialog responsive */}
      <Dialog open={isReceiveItemsOpen} onOpenChange={setIsReceiveItemsOpen}>
        <DialogContent className="sm:max-w-[800px] w-[95vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Receive Items</DialogTitle>
            <DialogDescription>
              Record received items for this purchase order
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="border rounded-lg overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Ordered</TableHead>
                    <TableHead className="text-right hidden sm:table-cell">Received</TableHead>
                    <TableHead className="text-right">Receiving</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentOrder.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <Package className="h-5 w-5 text-gray-500" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-gray-900 truncate">{item.product.name}</div>
                            <div className="text-sm text-gray-500 truncate">SKU: {item.product.sku}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right hidden sm:table-cell">{item.received}</TableCell>
                      <TableCell className="text-right">
                        <Input 
                          type="number"
                          className="w-[80px] sm:w-[100px] text-right"
                          placeholder="0"
                          min="0"
                          max={item.quantity - item.received}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsReceiveItemsOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button className="w-full sm:w-auto">
              Confirm Receipt
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 