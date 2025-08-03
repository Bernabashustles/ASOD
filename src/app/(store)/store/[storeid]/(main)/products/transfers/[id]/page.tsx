'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft,
  Package,
  Store,
  Truck,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Printer,
  Send,
  MoreVertical,
  MapPin,
  Box,
  User,
  ChevronRight,
  Edit,
  Download,
  ExternalLink,
  ClipboardCheck,
  PackageCheck,
  Loader2,
  Info,
  ChevronDown,
  BarChart3,
  ShieldCheck,
  AlertCircle,
  CheckCircle,
  CircleDot
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from 'next/link';

// Enhanced mock data
const transferDetail = {
  id: 'TRF002',
  status: 'in_transit',
  priority: 'high',
  fromLocation: {
    name: 'Main Warehouse',
    address: '123 Warehouse St, Industrial District',
    contact: 'John Smith',
    phone: '+1 234 567 890',
    coordinates: { lat: 40.7128, lng: -74.0060 }
  },
  toLocation: {
    name: 'Mall Store',
    address: '456 Mall Avenue, Shopping District',
    contact: 'Jane Doe',
    phone: '+1 234 567 891',
    coordinates: { lat: 40.7589, lng: -73.9851 }
  },
  items: [
    {
      id: 'ITEM001',
      name: 'Basic White T-Shirt',
      sku: 'TS-WHT-001',
      quantity: 5,
      status: 'packed',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      value: 125.00,
      weight: '2.5kg',
      temperature: 'Room temperature'
    },
    {
      id: 'ITEM002',
      name: 'Slim Fit Jeans',
      sku: 'JN-BLU-002',
      quantity: 3,
      status: 'packed',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      value: 179.97,
      weight: '1.8kg',
      temperature: 'Room temperature'
    }
  ],
  timeline: [
    {
      date: '2024-02-20T11:30:00',
      status: 'created',
      description: 'Transfer request created',
      user: 'Sarah Johnson',
      details: 'Initial transfer request submitted through system'
    },
    {
      date: '2024-02-20T14:45:00',
      status: 'packed',
      description: 'Items packed and ready for pickup',
      user: 'Mike Wilson',
      details: 'All items verified and packed according to handling instructions'
    },
    {
      date: '2024-02-21T09:15:00',
      status: 'in_transit',
      description: 'Transfer in transit to destination',
      user: 'Delivery Service',
      details: 'Picked up by authorized delivery personnel'
    }
  ],
  createdAt: '2024-02-20T11:30:00',
  expectedDate: '2024-02-22T11:30:00',
  trackingNumber: 'TRK123456789',
  notes: 'Handle with care. Temperature-sensitive items included.',
  stats: {
    totalValue: 304.97,
    totalWeight: '4.3kg',
    distance: '12.5km',
    estimatedTime: '45 mins'
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return (
        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
          Completed
        </Badge>
      );
    case 'in_transit':
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <Truck className="w-3.5 h-3.5 mr-1" />
          In Transit
        </Badge>
      );
    case 'packed':
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
          <Box className="w-3.5 h-3.5 mr-1" />
          Packed
        </Badge>
      );
    case 'pending':
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
          <AlertTriangle className="w-3.5 h-3.5 mr-1" />
          Pending
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
          <Clock className="w-3.5 h-3.5 mr-1" />
          {status}
        </Badge>
      );
  }
};

const TransferProgress = () => {
  const steps = [
    { status: 'completed', label: 'Created', icon: FileText },
    { status: 'completed', label: 'Packed', icon: PackageCheck },
    { status: 'current', label: 'In Transit', icon: Truck },
    { status: 'upcoming', label: 'Delivered', icon: CheckCircle2 }
  ];

  return (
    <div className="flex items-center justify-between w-full px-2 overflow-x-auto min-w-[500px]">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center relative flex-1">
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center
            ${step.status === 'completed' ? 'bg-emerald-100 text-emerald-600' :
              step.status === 'current' ? 'bg-blue-100 text-blue-600' :
              'bg-gray-100 text-gray-400'}
          `}>
            {React.createElement(step.icon, { className: 'w-4 h-4' })}
          </div>
          <span className="text-xs mt-2 font-medium text-gray-600 whitespace-nowrap">{step.label}</span>
          {index < steps.length - 1 && (
            <div className={`
              absolute top-4 left-full w-full h-0.5
              ${step.status === 'completed' ? 'bg-emerald-200' : 'bg-gray-200'}
            `} />
          )}
        </div>
      ))}
    </div>
  );
};

export default function TransferDetailPage() {
  const params = useParams();

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <Link href="/products/transfers" className="text-gray-500 hover:text-gray-700">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <h1 className="text-xl font-semibold text-gray-900">Transfer #{transferDetail.id}</h1>
                  {getStatusBadge(transferDetail.status)}
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    High Priority
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 mt-0.5">
                  Created on {new Date(transferDetail.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:ml-auto">
              <Button variant="outline" size="sm" className="gap-2">
                <Edit className="w-4 h-4" />
                <span className="hidden sm:inline">Edit</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <MoreVertical className="w-4 h-4" />
                    <span className="hidden sm:inline">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem>
                    <FileText className="w-4 h-4 mr-2" />
                    Download PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Printer className="w-4 h-4 mr-2" />
                    Print details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Send className="w-4 h-4 mr-2" />
                    Send via email
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <XCircle className="w-4 h-4 mr-2" />
                    Cancel transfer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

     

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Location Details and Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Value</p>
                      <p className="text-xl font-semibold mt-1">${transferDetail.stats.totalValue}</p>
                    </div>
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-emerald-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Weight</p>
                      <p className="text-xl font-semibold mt-1">{transferDetail.stats.totalWeight}</p>
                    </div>
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Package className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Distance</p>
                      <p className="text-xl font-semibold mt-1">{transferDetail.stats.distance}</p>
                    </div>
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Est. Time</p>
                      <p className="text-xl font-semibold mt-1">{transferDetail.stats.estimatedTime}</p>
                    </div>
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                      <Clock className="w-4 h-4 text-amber-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Transfer Route */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Transfer Route</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-4">
                  <div className="flex-1 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                      <Store className="w-4 h-4" />
                      From
                    </div>
                    <h3 className="font-medium">{transferDetail.fromLocation.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{transferDetail.fromLocation.address}</p>
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-sm">
                        <span className="text-gray-500">Contact: </span>
                        {transferDetail.fromLocation.contact}
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-500">Phone: </span>
                        {transferDetail.fromLocation.phone}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex flex-col items-center pt-8">
                    <div className="relative">
                      <Truck className="w-6 h-6 text-blue-500 animate-pulse" />
                   
                    </div>
                    <div className="w-px h-full bg-gray-200 my-2"></div>
                  </div>
                  <div className="flex-1 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                      <Store className="w-4 h-4" />
                      To
                    </div>
                    <h3 className="font-medium">{transferDetail.toLocation.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{transferDetail.toLocation.address}</p>
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-sm">
                        <span className="text-gray-500">Contact: </span>
                        {transferDetail.toLocation.contact}
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-500">Phone: </span>
                        {transferDetail.toLocation.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Items List */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Transfer Items</CardTitle>
                    <CardDescription>
                      {transferDetail.items.length} items in this transfer
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2 w-full sm:w-auto">
                    <Download className="w-4 h-4" />
                    Export list
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Mobile View - Cards */}
                <div className="space-y-4 lg:hidden">
                  {transferDetail.items.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <h4 className="font-medium truncate">{item.name}</h4>
                                <p className="text-sm text-gray-500 mt-0.5">{item.sku}</p>
                              </div>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-2">
                              <div>
                                <p className="text-xs text-gray-500">Quantity</p>
                                <p className="text-sm font-medium">{item.quantity}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Value</p>
                                <p className="text-sm font-medium">${item.value.toFixed(2)}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Weight</p>
                                <p className="text-sm font-medium">{item.weight}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Status</p>
                                <div className="mt-0.5">{getStatusBadge(item.status)}</div>
                              </div>
                            </div>
                            <div className="mt-3 flex items-center gap-1 text-gray-500">
                              <Info className="w-3.5 h-3.5" />
                              <span className="text-xs">Temperature: {item.temperature}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Desktop View - Table */}
                <div className="hidden lg:block">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50/50">
                        <TableHead>Item</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Weight</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transferDetail.items.map((item) => (
                        <TableRow key={item.id} className="group">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="min-w-0">
                                <span className="font-medium truncate block">{item.name}</span>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Info className="w-3.5 h-3.5 text-gray-400 ml-1 inline-block" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Temperature: {item.temperature}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-500 text-sm">{item.sku}</TableCell>
                          <TableCell className="text-sm">{item.quantity}</TableCell>
                          <TableCell className="text-sm">${item.value.toFixed(2)}</TableCell>
                          <TableCell className="text-sm">{item.weight}</TableCell>
                          <TableCell>{getStatusBadge(item.status)}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Timeline and Details */}
          <div className="space-y-6">
            {/* Transfer Details */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Transfer Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Expected Delivery</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{new Date(transferDetail.expectedDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Tracking Number</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span className="text-sm break-all">{transferDetail.trackingNumber}</span>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs ml-auto">
                      Copy
                    </Button>
                  </div>
                </div>
                <Separator />
                <div>
                  <label className="text-sm text-gray-500">Notes</label>
                  <p className="mt-1 text-sm">{transferDetail.notes}</p>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transferDetail.timeline.map((event, index) => (
                    <Accordion type="single" collapsible key={index}>
                      <AccordionItem value={`item-${index}`} className="border-none">
                        <div className="flex gap-3">
                          <div className="flex flex-col items-center flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            {index !== transferDetail.timeline.length - 1 && (
                              <div className="w-0.5 h-full bg-gray-200"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <AccordionTrigger className="hover:no-underline py-0">
                              <div className="text-left">
                                <p className="text-sm font-medium truncate">{event.description}</p>
                                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                                  <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                                  <span className="truncate">{new Date(event.date).toLocaleString()}</span>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="mt-2 pl-4 border-l-2 border-gray-100">
                                <p className="text-sm text-gray-600">{event.details}</p>
                                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                                  <User className="w-3.5 h-3.5 flex-shrink-0" />
                                  <span className="truncate">{event.user}</span>
                                </div>
                              </div>
                            </AccordionContent>
                          </div>
                        </div>
                      </AccordionItem>
                    </Accordion>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 