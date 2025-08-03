'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download,
  Calendar,
  ArrowUpDown,
  Package,
  Truck,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  MoreVertical,
  FileText,
  Send,
  Printer,
  ExternalLink,
  Store,
  DollarSign,
  Timer
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface Shipment {
  id: string;
  orderId: string;
  customer: {
    name: string;
    address: string;
  };
  store: {
    name: string;
    location: string;
  };
  carrier: string;
  trackingNumber: string;
  status: 'pending' | 'in_transit' | 'delivered' | 'failed';
  items: number;
  shippedDate: string;
  estimatedDelivery: string;
  shippingFee: number;
  deliveryTime: string;
}

const shipments: Shipment[] = [
  {
    id: 'SHP001',
    orderId: '#1001',
    customer: {
      name: 'John Doe',
      address: '123 Main St, New York, NY 10001'
    },
    store: {
      name: 'Downtown Store',
      location: 'New York, NY'
    },
    carrier: 'FedEx',
    trackingNumber: '1234567890',
    status: 'in_transit',
    items: 3,
    shippedDate: '2024-02-20T10:00:00',
    estimatedDelivery: '2024-02-22T10:00:00',
    shippingFee: 12.99,
    deliveryTime: '2-3 days'
  },
  {
    id: 'SHP002',
    orderId: '#1002',
    customer: {
      name: 'Jane Smith',
      address: '456 Oak Ave, Los Angeles, CA 90001'
    },
    store: {
      name: 'West Coast Store',
      location: 'Los Angeles, CA'
    },
    carrier: 'UPS',
    trackingNumber: '0987654321',
    status: 'delivered',
    items: 2,
    shippedDate: '2024-02-19T15:30:00',
    estimatedDelivery: '2024-02-21T15:30:00',
    shippingFee: 9.99,
    deliveryTime: '1-2 days'
  },
  {
    id: 'SHP003',
    orderId: '#1003',
    customer: {
      name: 'Bob Wilson',
      address: '789 Pine Rd, Chicago, IL 60601'
    },
    store: {
      name: 'Midwest Store',
      location: 'Chicago, IL'
    },
    carrier: 'USPS',
    trackingNumber: '5432109876',
    status: 'pending',
    items: 4,
    shippedDate: '2024-02-21T09:15:00',
    estimatedDelivery: '2024-02-23T09:15:00',
    shippingFee: 14.99,
    deliveryTime: '3-4 days'
  }
];

const getStatusBadge = (status: Shipment['status']) => {
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
  }
};

export default function ShipmentsPage() {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Shipment;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleSort = (key: keyof Shipment) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedShipments = [...shipments].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="p-4 sm:p-6 max-w-full sm:max-w-[3500px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-8 w-full">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">Shipments</h1>
          <p className="text-sm text-gray-500 mt-1">
            Track and manage your order shipments
          </p>
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export shipments
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 mb-4 sm:mb-8 w-full">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Shipments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{shipments.length}</div>
            <p className="text-xs text-gray-500 mt-1">
              All time
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              In Transit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-black">
              {shipments.filter(s => s.status === 'in_transit').length}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Currently shipping
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Delivered
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-black">
              {shipments.filter(s => s.status === 'delivered').length}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Successfully delivered
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-black">
              {shipments.filter(s => s.status === 'pending').length}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Awaiting shipment
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4 sm:mb-6 w-full">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search by tracking number or order ID"
            className="pl-10"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-6">
          <Select>
            <SelectTrigger className="w-full sm:w-[250px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_transit">In Transit</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full sm:w-[250px]">
              <SelectValue placeholder="Carrier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All carriers</SelectItem>
              <SelectItem value="fedex">FedEx</SelectItem>
              <SelectItem value="ups">UPS</SelectItem>
              <SelectItem value="usps">USPS</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            More filters
          </Button>
        </div>
      </div>

      {/* Shipments Content */}
      <div className="hidden md:block w-full">
        <div className="border rounded-lg w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer w-[160px]" onClick={() => handleSort('orderId')}>
                  <div className="flex items-center gap-2">
                    Order ID
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </TableHead>
                <TableHead className="w-[160px]">Customer</TableHead>
                <TableHead className="w-[160px]">Store</TableHead>
                <TableHead className="w-[160px]">Status</TableHead>
                <TableHead className="w-[160px]">Carrier</TableHead>
                <TableHead className="w-[160px]">Tracking</TableHead>
                <TableHead className="w-[160px]">Items</TableHead>
                <TableHead className="w-[160px]">Shipping</TableHead>
                <TableHead className="w-[160px]">Delivery</TableHead>
                <TableHead className="text-right w-[160px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedShipments.map((shipment) => (
                <TableRow key={shipment.id}>
                  <TableCell className="font-medium truncate">{shipment.orderId}</TableCell>
                  <TableCell className="truncate">{shipment.customer.name}</TableCell>
                  <TableCell className="truncate">
                    <div className="flex items-center gap-2">
                      <Store className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="truncate">{shipment.store.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(shipment.status)}</TableCell>
                  <TableCell className="truncate">{shipment.carrier}</TableCell>
                  <TableCell className="truncate">{shipment.trackingNumber}</TableCell>
                  <TableCell>{shipment.items}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      {shipment.shippingFee}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Timer className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      {shipment.deliveryTime}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <FileText className="w-4 h-4 mr-2" />
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Track shipment
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Send className="w-4 h-4 mr-2" />
                          Send tracking info
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Printer className="w-4 h-4 mr-2" />
                          Print label
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {sortedShipments.map((shipment) => (
          <Card key={shipment.id} className="p-4 border rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Package className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                </div>
                <div>
                  <div className="font-medium">{shipment.orderId}</div>
                  <div className="text-sm text-gray-500">{shipment.items} items</div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="text-black font-semibold">
                  ${shipment.items * 49.99}
                </div>
                {getStatusBadge(shipment.status)}
              </div>
            </div>
            <div className="mb-2">
              <div className="font-medium">Customer</div>
              <div className="text-sm text-gray-500">{shipment.customer.name}</div>
              <div className="text-sm text-gray-500">{shipment.customer.address}</div>
            </div>
            <div className="mb-2">
              <div className="font-medium">Store</div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Store className="w-4 h-4" />
                {shipment.store.name}
              </div>
              <div className="text-sm text-gray-500">{shipment.store.location}</div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <div>
                <div className="font-medium">Shipping Fee</div>
                <div className="text-xs text-black flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  {shipment.shippingFee}
                </div>
              </div>
              <div>
                <div className="font-medium">Delivery Time</div>
                <div className="text-xs text-black flex items-center gap-1">
                  <Timer className="w-3 h-3" />
                  {shipment.deliveryTime}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <FileText className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ExternalLink className="w-4 h-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <FileText className="w-4 h-4 mr-2" />
                    View details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Track shipment
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Send className="w-4 h-4 mr-2" />
                    Send tracking info
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Printer className="w-4 h-4 mr-2" />
                    Print label
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}