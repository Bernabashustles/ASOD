'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft,
  Package,
  Truck,
  FileText,
  Printer,
  Send,
  MoreVertical,
  User,
  Mail,
  Phone,
  MapPin,
  Clock,
  Calendar,
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  ShoppingBag,
  ExternalLink,
  Download,
  Pencil,
  ArrowRight,
  MoreHorizontal,
  ChevronRight,
  RefreshCcw,
  DollarSign
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface OrderDetails {
  id: string;
  orderNumber: string;
  date: string;
  status: 'paid' | 'pending' | 'refunded';
  fulfillmentStatus: 'fulfilled' | 'unfulfilled' | 'partially_fulfilled';
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  items: {
    id: string;
    title: string;
    sku: string;
    quantity: number;
    price: number;
    image?: string;
  }[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  notes?: string;
  paymentMethod: string;
  deliveryMethod: string;
}

// Mock data
const orderDetails: OrderDetails = {
  id: '1',
  orderNumber: '#1001',
  date: '2024-02-20T10:00:00',
  status: 'paid',
  fulfillmentStatus: 'partially_fulfilled',
  customer: {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 890'
  },
  shippingAddress: {
    line1: '123 Main St',
    line2: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    postal_code: '10001',
    country: 'United States'
  },
  items: [
    {
      id: '1',
      title: 'Basic Cotton T-Shirt',
      sku: 'TCT-WHT-L',
      quantity: 2,
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800'
    },
    {
      id: '2',
      title: 'Leather Wallet',
      sku: 'WAL-BRW',
      quantity: 1,
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800'
    }
  ],
  subtotal: 109.97,
  shipping: 10.00,
  tax: 9.00,
  total: 128.97,
  paymentMethod: 'Credit Card',
  deliveryMethod: 'Standard Shipping'
};

// Mock order log data
const orderLogs = [
  {
    id: '1',
    message: "You updated the customer for this order.",
    timestamp: "2 minutes ago"
  },
  {
    id: '2',
    message: "This order was archived.",
    timestamp: "2 minutes ago"
  },
  {
    id: '3',
    message: "You fulfilled 1 item from Shop location.",
    timestamp: "2 minutes ago"
  },
  {
    id: '4',
    message: "You manually marked ETB4,600.00 as paid for this order.",
    timestamp: "2 minutes ago"
  },
  {
    id: '5',
    message: "Confirmation #373AJ3AJN was generated for this order.",
    timestamp: "2 minutes ago"
  },
  {
    id: '6',
    message: "You created this order from draft order #D2.",
    timestamp: "2 minutes ago"
  }
];

const getStatusBadge = (status: OrderDetails['status']) => {
  const styles = {
    paid: "bg-green-50 text-green-700 border-green-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    refunded: "bg-gray-50 text-gray-700 border-gray-200"
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
      <CheckCircle2 className="w-3 h-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const getFulfillmentBadge = (status: OrderDetails['fulfillmentStatus']) => {
  const styles = {
    fulfilled: "bg-green-50 text-green-700 border-green-200",
    unfulfilled: "bg-gray-50 text-gray-700 border-gray-200",
    partially_fulfilled: "bg-amber-50 text-amber-700 border-amber-200"
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
      <Package className="w-3 h-3" />
      {status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
    </span>
  );
};

export default function OrderDetailPage() {
  const params = useParams();
  
  const id = params.id as string;
  
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/75">
        <div className="container flex h-auto flex-col px-4 sm:px-6 sm:h-16 sm:flex-row items-start sm:items-center justify-between py-4 gap-4 sm:gap-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center   gap-4 w-full sm:w-auto">
            <Link href="/orders" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="font-medium">Orders</span>
            </Link>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <h1 className="text-base sm:text-lg md:text-xl font-semibold">Order {orderDetails.orderNumber}</h1>
              <div className="flex flex-wrap gap-2">
                {getStatusBadge(orderDetails.status)}
                {getFulfillmentBadge(orderDetails.fulfillmentStatus)}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="sm:hidden">
                <Package className="h-4 w-4 mr-2" />
                Fulfill
              </Button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="sm:hidden h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem asChild>
                  <Link href={`/orders/${id}/edit`} className="flex items-center">
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="w-4 h-4 mr-2" />
                  Invoice
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/orders/${id}/refund`} className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Refund
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/orders/${id}/return`} className="flex items-center">
                    <RefreshCcw className="w-4 h-4 mr-2" />
                    Return & Exchange
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Send className="w-4 h-4 mr-2" />
                  Resend confirmation
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="w-4 h-4 mr-2" />
                  Export order
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Cancel order
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Invoice
              </Button>
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Link href={`/orders/${id}/refund`}>
                <Button variant="outline" size="sm">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Refund
                </Button>
              </Link>
              <Link href={`/orders/${id}/return`}>
                <Button variant="outline" size="sm">
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Return
                </Button>
              </Link>
              <Link href={`/orders/${id}/edit`}>
                <Button variant="outline" size="sm">
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </Link>
              <Button size="sm">
                <Package className="h-4 w-4 mr-2" />
                Fulfill
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4 px-4 sm:px-6 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Content - Takes up 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Order Items Card */}
            <Card className="overflow-hidden border-none shadow-md">
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gray-50 border-b p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl font-semibold">Order Items</CardTitle>
                <Button variant="outline" size="sm" className="w-full sm:w-auto bg-white hover:bg-gray-50 transition-all">
                  <Package className="w-4 h-4 mr-2 text-blue-600" />
                  Track shipment
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div>
                  {orderDetails.items.map((item, index) => (
                    <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-5 first:pt-5 hover:bg-gray-50 transition-colors border-b last:border-0">
                      <div className="w-full sm:w-20 h-40 sm:h-20 rounded-lg border overflow-hidden shadow-sm flex-shrink-0">
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <Package className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-3 flex-1 w-full">
                        <div className="space-y-1.5 w-full sm:w-auto">
                          <div className="font-medium text-base sm:text-lg">{item.title}</div>
                          <div className="text-sm text-muted-foreground flex flex-wrap items-center gap-2">
                            <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-medium">SKU: {item.sku}</span>
                            <span className="text-xs hidden sm:inline">•</span>
                            <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs font-medium">Qty: {item.quantity}</span>
                          </div>
                        </div>
                        <div className="text-left sm:text-right w-full sm:w-auto mt-2 sm:mt-0">
                          <div className="font-semibold text-base sm:text-lg">${(item.quantity * item.price).toFixed(2)}</div>
                          <div className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="space-y-3 p-4 sm:p-5 bg-gray-50">
                    <div className="flex justify-between text-sm p-3 bg-white rounded-lg shadow-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">${orderDetails.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm p-3 bg-white rounded-lg shadow-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">${orderDetails.shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm p-3 bg-white rounded-lg shadow-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="font-medium">${orderDetails.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-medium text-lg mt-4 p-3 bg-black/5 rounded-lg shadow-sm">
                      <span>Total</span>
                      <span className="font-semibold text-blue-800">${orderDetails.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Add Timeline */}
            <Card className="overflow-hidden border border-gray-200 shadow-sm">
              <CardHeader className="bg-gray-50 border-b pb-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold">Order Timeline</CardTitle>
                  <Button variant="ghost" size="sm" className="text-xs font-normal text-muted-foreground flex items-center gap-1 hover:text-black">
                    View full history
                    <ChevronRight className="h-3 w-3" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="py-5 px-6">
                  <div className="relative">
                    <div className="absolute top-0 left-4 h-full w-0.5 bg-gray-300 rounded"></div>
                    
                    <div className="space-y-6 relative">
                      <div className="flex gap-5">
                        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center z-10 shadow-sm border border-green-100">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex-1">
                          <div className="font-medium">Order confirmed</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3" />
                            {new Date(orderDetails.date).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-5">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center z-10 shadow-sm border border-blue-100">
                          <CreditCard className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex-1">
                          <div className="font-medium">Payment received</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3" />
                            {new Date(orderDetails.date).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      
                      {orderDetails.fulfillmentStatus === 'partially_fulfilled' && (
                        <div className="flex gap-5">
                          <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center z-10 shadow-sm border border-amber-100">
                            <Package className="w-4 h-4 text-amber-600" />
                          </div>
                          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex-1">
                            <div className="font-medium">Partially fulfilled</div>
                            <div className="text-sm text-muted-foreground mt-1">
                              Some items have been shipped
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Log - Enhanced Design */}
            <Card className="overflow-hidden border border-gray-200 shadow-sm">
              <CardHeader className="bg-gray-50 border-b pb-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold">Order Activity Log</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        Export log
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Print log
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="bg-gray-100 px-5 py-3 border-b flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <div className="text-sm font-medium">Today</div>
                </div>
                <div className="divide-y">
                  {orderLogs.map((log, index) => (
                    <div key={log.id} 
                      className={`flex items-start p-5 hover:bg-gray-50 transition-colors ${index === 0 ? 'bg-gray-50 border-l-4 border-blue-300' : ''}`}>
                      <div className={`w-2 h-2 rounded-full mt-1.5 mr-4 flex-shrink-0 ${index === 0 ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
                      <div className="flex-1">
                        <p className={`${index === 0 ? 'font-medium' : ''}`}>{log.message}</p>
                        <span className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                          <Clock className="h-3 w-3 text-gray-500" />
                          {log.timestamp}
                        </span>
                      </div>
                      {index === 0 && (
                        <Badge variant="outline" className="text-xs bg-white border-blue-200 text-blue-700 ml-auto">
                          Latest
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
                <div className="px-5 py-3 bg-gray-50 border-t text-center">
                  <Button variant="ghost" size="sm" className="text-xs font-normal text-muted-foreground hover:text-black">
                    View more activity
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Takes up 1 column on large screens */}
          <div className="space-y-4 sm:space-y-6">
            {/* Customer */}
            <Card className="overflow-hidden border-none shadow-sm">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle>Customer</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{orderDetails.customer.name}</div>
                      <Link 
                        href={`/customers/${id}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        View profile
                      </Link>
                    </div>
                  </div>
                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex items-center gap-3 text-sm p-3 bg-gray-50 rounded-lg break-all">
                      <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-sm">{orderDetails.customer.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm p-3 bg-gray-50 rounded-lg">
                      <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-sm">{orderDetails.customer.phone}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Delivery method</div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <Truck className="w-5 h-5 text-gray-400" />
                      <span className="font-medium">{orderDetails.deliveryMethod}</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="text-sm text-muted-foreground mb-2">Shipping address</div>
                    <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                      <div className="font-medium">{orderDetails.customer.name}</div>
                      <div className="text-sm space-y-1">
                        <p>{orderDetails.shippingAddress.line1}</p>
                        {orderDetails.shippingAddress.line2 && (
                          <p>{orderDetails.shippingAddress.line2}</p>
                        )}
                        <p>
                          {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.postal_code}
                        </p>
                        <p>{orderDetails.shippingAddress.country}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment */}
            <Card>
              <CardHeader>
                <CardTitle>Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Payment method</div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <CreditCard className="w-5 h-5 text-gray-400" />
                      <span className="font-medium">{orderDetails.paymentMethod}</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="text-sm text-muted-foreground mb-2">Payment status</div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      {getStatusBadge(orderDetails.status)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 