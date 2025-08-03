'use client';

import React from 'react';
import { 
  ArrowLeft, 
  Package, 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  FileText,
  Send,
  Printer,
  ExternalLink,
  Calendar,
  DollarSign,
  User,
  Phone,
  Mail,
  Building2,
  Box,
  Scale,
  Tag,
  BarChart3,
  History,
  Shield,
  CreditCard,
  TruckIcon,
  Map,
  Navigation,
  Star
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

// Mock data - replace with actual data fetching
const shipmentData = {
  id: 'SHP001',
  orderId: '#1001',
  customer: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    company: 'Acme Corp'
  },
  carrier: 'FedEx',
  deliveryMan: {
    name: 'Michael Johnson',
    phone: '+1 (555) 987-6543',
    employeeId: 'DM-2024-001',
    rating: 4.8
  },
  trackingNumber: '1234567890',
  status: 'in_transit',
  items: 3,
  totalWeight: '2.5 kg',
  dimensions: '30 x 20 x 15 cm',
  shippedDate: '2024-02-20T10:00:00',
  estimatedDelivery: '2024-02-22T10:00:00',
  totalAmount: 149.97,
  paymentStatus: 'paid',
  fulfillmentStatus: 'fulfilled',
  trackingHistory: [
    {
      date: '2024-02-20T10:00:00',
      status: 'Order Placed',
      location: 'New York, NY',
      description: 'Order has been placed and is being processed'
    },
    {
      date: '2024-02-20T14:30:00',
      status: 'Picked Up',
      location: 'New York, NY',
      description: 'Package has been picked up by FedEx'
    },
    {
      date: '2024-02-21T09:15:00',
      status: 'In Transit',
      location: 'Chicago, IL',
      description: 'Package is in transit to destination'
    }
  ],
  items: [
    {
      id: 'ITEM001',
      name: 'Premium Headphones',
      quantity: 2,
      price: 49.99,
      sku: 'HD-001'
    },
    {
      id: 'ITEM002',
      name: 'Wireless Mouse',
      quantity: 1,
      price: 49.99,
      sku: 'MS-002'
    }
  ]
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'delivered':
      return (
        <Badge className="bg-green-100 text-green-800">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Delivered
        </Badge>
      );
    case 'in_transit':
      return (
        <Badge className="bg-blue-100 text-blue-800">
          <Truck className="w-3 h-3 mr-1" />
          In Transit
        </Badge>
      );
    case 'pending':
      return (
        <Badge className="bg-yellow-100 text-yellow-800">
          <Clock className="w-3 h-3 mr-1" />
          Pending
        </Badge>
      );
    case 'failed':
      return (
        <Badge className="bg-red-100 text-red-800">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Failed
        </Badge>
      );
    default:
      return null;
  }
};

export default function ShipmentDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-2 sm:p-4 md:p-6 w-full max-w-[100vw] sm:max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">Shipment Details</h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Tracking ID: {shipmentData.trackingNumber}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-3 sm:space-y-4 md:space-y-6">
          {/* Status Card */}
          <Card className="overflow-hidden">
            <CardHeader className="p-3 sm:p-4 md:p-6">
              <CardTitle className="text-base sm:text-lg">Shipment Status</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6 pt-0">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {getStatusBadge(shipmentData.status)}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">
                    Estimated Delivery: {new Date(shipmentData.estimatedDelivery).toLocaleDateString()}
                  </div>
                </div>
                <div className="relative mt-6">
                  <Progress value={75} className="h-1.5 bg-gray-100" />
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full">
                    <div className="flex justify-between">
                      <div className="relative group">
                        <div className="w-5 h-5 rounded-full bg-primary border-4 border-white shadow-[0_0_0_2px] shadow-primary/30 transition-all duration-300 group-hover:scale-110" />
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-primary text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                            20 Feb, 10:00 AM
                          </div>
                          <div className="w-2 h-2 bg-primary transform rotate-45 absolute -top-1 left-1/2 -translate-x-1/2" />
                        </div>
                      </div>
                      <div className="relative group">
                        <div className="w-5 h-5 rounded-full bg-primary border-4 border-white shadow-[0_0_0_2px] shadow-primary/30 transition-all duration-300 group-hover:scale-110" />
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-primary text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                            20 Feb, 2:30 PM
                          </div>
                          <div className="w-2 h-2 bg-primary transform rotate-45 absolute -top-1 left-1/2 -translate-x-1/2" />
                        </div>
                      </div>
                      <div className="relative group">
                        <div className="w-5 h-5 rounded-full bg-primary border-4 border-white shadow-[0_0_0_2px] shadow-primary/30 transition-all duration-300 group-hover:scale-110 animate-pulse" />
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-primary text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                            21 Feb, 9:15 AM
                          </div>
                          <div className="w-2 h-2 bg-primary transform rotate-45 absolute -top-1 left-1/2 -translate-x-1/2" />
                        </div>
                      </div>
                      <div className="relative group">
                        <div className="w-5 h-5 rounded-full bg-gray-200 border-4 border-white shadow-[0_0_0_2px] shadow-gray-200/30 transition-all duration-300 group-hover:scale-110" />
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-gray-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                            Pending
                          </div>
                          <div className="w-2 h-2 bg-gray-700 transform rotate-45 absolute -top-1 left-1/2 -translate-x-1/2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-xs sm:text-sm mt-6">
                  <span>Order Placed</span>
                  <span className="hidden sm:block">Picked Up</span>
                  <span>In Transit</span>
                  <span>Delivered</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tracking History */}
          <Card className="overflow-hidden">
            <CardHeader className="p-3 sm:p-4 md:p-6">
              <CardTitle className="text-base sm:text-lg">Tracking History</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6 pt-0">
              <div className="space-y-4">
                {shipmentData.trackingHistory.map((event, index) => (
                  <div key={index} className="flex gap-2 sm:gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <History className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                      </div>
                      {index < shipmentData.trackingHistory.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                        <div>
                          <h4 className="font-medium text-sm sm:text-base">{event.status}</h4>
                          <p className="text-xs sm:text-sm text-gray-500">{event.location}</p>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-500">
                          {new Date(event.date).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Items */}
          <Card className="overflow-hidden">
            <CardHeader className="p-3 sm:p-4 md:p-6">
              <CardTitle className="text-base sm:text-lg">Items</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6 pt-0">
              <div className="space-y-3 sm:space-y-4">
                {shipmentData.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex items-center gap-2 sm:gap-4">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Box className="w-4 h-4 sm:w-6 sm:h-6 text-gray-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm sm:text-base">{item.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-500">SKU: {item.sku}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-sm sm:text-base">${item.price}</div>
                      <div className="text-xs sm:text-sm text-gray-500">Qty: {item.quantity}</div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="font-medium text-sm sm:text-base">Total Amount</span>
                  <span className="font-medium text-sm sm:text-base">${shipmentData.totalAmount}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Details */}
        <div className="space-y-3 sm:space-y-4 md:space-y-6">
          {/* Customer Info */}
          <Card className="overflow-hidden">
            <CardHeader className="p-3 sm:p-4 md:p-6">
              <CardTitle className="text-base sm:text-lg">Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6 pt-0">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="font-medium text-sm sm:text-base">{shipmentData.customer.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm break-all">{shipmentData.customer.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">{shipmentData.customer.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">{shipmentData.customer.company}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">{shipmentData.customer.address}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipment Details */}
          <Card className="overflow-hidden">
            <CardHeader className="p-3 sm:p-4 md:p-6">
              <CardTitle className="text-base sm:text-lg">Shipment Details</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6 pt-0">
              <div className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Carrier</p>
                    <div className="flex items-center gap-2 mt-1">
                      <TruckIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="font-medium text-sm sm:text-base">{shipmentData.carrier}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Tracking Number</p>
                    <div className="flex items-center gap-2 mt-1">
                      <BarChart3 className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="font-medium text-sm sm:text-base break-all">{shipmentData.trackingNumber}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Total Weight</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Scale className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="font-medium text-sm sm:text-base">{shipmentData.totalWeight}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Dimensions</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Package className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="font-medium text-sm sm:text-base">{shipmentData.dimensions}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 sm:pt-4 border-t">
                  <p className="text-xs sm:text-sm text-gray-500 mb-3">Assigned Delivery Man</p>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm sm:text-base">{shipmentData.deliveryMan.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-500">ID: {shipmentData.deliveryMan.employeeId}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1">
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                          <span className="text-xs sm:text-sm text-gray-500">{shipmentData.deliveryMan.phone}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                          <span className="text-xs sm:text-sm text-gray-500">{shipmentData.deliveryMan.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="overflow-hidden">
            <CardHeader className="p-3 sm:p-4 md:p-6">
              <CardTitle className="text-base sm:text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6 pt-0">
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
                <Button variant="outline" className="w-full justify-start gap-2 text-xs sm:text-sm">
                  <FileText className="w-4 h-4" />
                  View Invoice
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 text-xs sm:text-sm">
                  <ExternalLink className="w-4 h-4" />
                  Track on Carrier
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 text-xs sm:text-sm">
                  <Send className="w-4 h-4" />
                  Send Tracking
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2 text-xs sm:text-sm"
                  onClick={() => window.location.href = `${params.id}/print-label`}
                >
                  <Printer className="w-4 h-4" />
                  Print Label
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 