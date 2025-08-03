'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  Download,
  Calendar,
  ArrowUpDown,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  MoreVertical,
  ChevronDown,
  Store,
  Truck,
  CreditCard,
  Mail,
  Printer,
  Archive,
  Tag,
  FileText,
  ExternalLink,
  Send,
  ShoppingBag,
  Globe,
  Building
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
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { Pagination } from '@/components/ui/pagination';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: {
    name: string;
    email: string;
  };
  total: number;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  fulfillmentStatus: 'fulfilled' | 'unfulfilled' | 'partially_fulfilled';
  items: number;
  deliveryMethod: string;
  channel: 'pos' | 'marketplace' | 'storefront';
}

const orders: Order[] = [
  {
    id: '1',
    orderNumber: '#1001',
    date: '2024-02-20T10:00:00',
    customer: {
      name: 'John Doe',
      email: 'john@example.com'
    },
    total: 149.99,
    paymentStatus: 'paid',
    fulfillmentStatus: 'fulfilled',
    items: 3,
    deliveryMethod: 'Standard Shipping',
    channel: 'pos'
  },
  {
    id: '2',
    orderNumber: '#1002',
    date: '2024-02-20T11:30:00',
    customer: {
      name: 'Jane Smith',
      email: 'jane@example.com'
    },
    total: 89.99,
    paymentStatus: 'pending',
    fulfillmentStatus: 'unfulfilled',
    items: 2,
    deliveryMethod: 'Express Shipping',
    channel: 'marketplace'
  },
  {
    id: '3',
    orderNumber: '#1003',
    date: '2024-02-20T09:15:00',
    customer: {
      name: 'Bob Wilson',
      email: 'bob@example.com'
    },
    total: 299.99,
    paymentStatus: 'paid',
    fulfillmentStatus: 'partially_fulfilled',
    items: 4,
    deliveryMethod: 'Local Pickup',
    channel: 'storefront'
  }
];

const getPaymentStatusBadge = (status: Order['paymentStatus']) => {
  switch (status) {
    case 'paid':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle2 className="w-3 h-3" />
          Paid
        </span>
      );
    case 'pending':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <Clock className="w-3 h-3" />
          Pending
        </span>
      );
    case 'refunded':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          <ArrowUpDown className="w-3 h-3" />
          Refunded
        </span>
      );
  }
};

const getFulfillmentStatusBadge = (status: Order['fulfillmentStatus']) => {
  switch (status) {
    case 'fulfilled':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <Package className="w-3 h-3" />
          Fulfilled
        </span>
      );
    case 'unfulfilled':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          <AlertTriangle className="w-3 h-3" />
          Unfulfilled
        </span>
      );
    case 'partially_fulfilled':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <Package className="w-3 h-3" />
          Partially Fulfilled
        </span>
      );
  }
};

const getChannelBadge = (channel: Order['channel']) => {
  const styles = {
    pos: "bg-purple-100 text-purple-800",
    marketplace: "bg-blue-100 text-blue-800",
    storefront: "bg-green-100 text-green-800"
  };

  const icons = {
    pos: Building,
    marketplace: Globe,
    storefront: ShoppingBag
  };

  const Icon = icons[channel];

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${styles[channel]}`}>
      <Icon className="w-3 h-3" />
      {channel.charAt(0).toUpperCase() + channel.slice(1)}
    </span>
  );
};

const InvoiceDialog = ({ isOpen, onClose, selectedOrders }: { isOpen: boolean; onClose: () => void; selectedOrders: Order[] }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Send Invoice</h2>
        <p className="text-sm text-gray-600 mb-4">
          Send invoice to {selectedOrders.length} selected order(s)
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => {
            // Handle send invoice logic here
            onClose();
          }}>
            <Send className="w-4 h-4 mr-2" />
            Send Invoice
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function OrdersPage() {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Order;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);

  const handleSort = (key: keyof Order) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedOrders = [...orders].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(order => order.fulfillmentStatus === 'unfulfilled').length;

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedOrders(orders.map(order => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders(current => 
      current.includes(orderId)
        ? current.filter(id => id !== orderId)
        : [...current, orderId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="w-full">
        {/* Header - Made responsive */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pt-4">
          <div>
            <h1 className="text-2xl font-semibold">Orders</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage and fulfill your orders
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="default" className="gap-3">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Link href="/orders/create">
              <Button size="default" className="gap-3">
                <Tag className="w-4 h-4" />
                <span className="hidden sm:inline">Create order</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Selected Actions Bar */}
        {selectedOrders.length > 0 && (
          <div className="bg-gray-50 border-y py-2 px-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">{selectedOrders.length} selected</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsInvoiceDialogOpen(true)}>
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Send Invoice</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Printer className="w-4 h-4" />
                  <span className="hidden sm:inline">Print Labels</span>
                </Button>
                <Button size="sm" className="gap-2">
                  <Package className="w-4 h-4" />
                  <span className="hidden sm:inline">Fulfill Orders</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search orders"
              className="pl-8 w-full h-11"
            />
          </div>
          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="w-[200px] h-11 bg-white border-gray-200 hover:bg-gray-50">
                <SelectValue placeholder="Payment status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[200px] h-11 bg-white border-gray-200 hover:bg-gray-50">
                <SelectValue placeholder="Fulfillment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="fulfilled">Fulfilled</SelectItem>
                <SelectItem value="unfulfilled">Unfulfilled</SelectItem>
                <SelectItem value="partially">Partially Fulfilled</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="default" className="h-11 px-4 bg-white border-gray-200 hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline ml-2">More filters</span>
            </Button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="hidden md:block border bg-white overflow-hidden">
          <div className="overflow-x-auto pl-4">
            <Table>
              <TableHeader>
                <TableRow className="border-b">
                  <TableHead className="w-[40px] py-2 px-2 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selectedOrders.length === orders.length}
                      onChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="w-[100px] py-2 px-2 whitespace-nowrap">
                    <Button 
                      variant="ghost" 
                      className="gap-2 font-medium"
                      onClick={() => handleSort('orderNumber')}
                    >
                      Order
                      <ArrowUpDown className="w-4 h-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="w-[200px] py-2 px-2 whitespace-nowrap">Date</TableHead>
                  <TableHead className="w-[350px] py-2 px-2 whitespace-nowrap">Customer</TableHead>
                  <TableHead className="w-[200px] py-2 px-2 whitespace-nowrap">Channel</TableHead>
                  <TableHead className="w-[220px] py-2 px-2 whitespace-nowrap">Payment Status</TableHead>
                  <TableHead className="w-[220px] py-2 px-2 whitespace-nowrap">Fulfillment</TableHead>
                  <TableHead className="w-[100px] py-2 px-2 whitespace-nowrap">Items</TableHead>
                  <TableHead className="w-[150px] py-2 px-2 whitespace-nowrap">Total</TableHead>
                  <TableHead className="w-[350px] py-2 px-2 whitespace-nowrap">Delivery</TableHead>
                  <TableHead className="w-[60px] py-2 px-2 whitespace-nowrap"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedOrders.map((order) => (
                  <TableRow key={order.id} className="border-b hover:bg-gray-50">
                    <TableCell className="py-2 px-2 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => handleSelectOrder(order.id)}
                      />
                    </TableCell>
                    <TableCell className="py-2 px-2 whitespace-nowrap">
                      <Link 
                        href={`/orders/${order.id}`}
                        className="font-medium hover:underline"
                      >
                        {order.orderNumber}
                      </Link>
                    </TableCell>
                    <TableCell className="py-2 px-2 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {new Date(order.date).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="py-2 px-2 whitespace-nowrap">
                      <div className="font-medium">{order.customer.name}</div>
                      <div className="text-sm text-gray-500">{order.customer.email}</div>
                    </TableCell>
                    <TableCell className="py-2 px-2 whitespace-nowrap">
                      {getChannelBadge(order.channel)}
                    </TableCell>
                    <TableCell className="py-2 px-2 whitespace-nowrap">
                      {getPaymentStatusBadge(order.paymentStatus)}
                    </TableCell>
                    <TableCell className="py-2 px-2 whitespace-nowrap">
                      {getFulfillmentStatusBadge(order.fulfillmentStatus)}
                    </TableCell>
                    <TableCell className="py-2 px-2 whitespace-nowrap">{order.items}</TableCell>
                    <TableCell className="py-2 px-2 whitespace-nowrap">
                      <div className="font-medium">${order.total.toFixed(2)}</div>
                    </TableCell>
                    <TableCell className="py-2 px-2 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{order.deliveryMethod}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-2 px-2 whitespace-nowrap">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px]">
                          <DropdownMenuItem>
                            <FileText className="w-4 h-4 mr-2" />
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Package className="w-4 h-4 mr-2" />
                            Fulfill order
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Printer className="w-4 h-4 mr-2" />
                            Print label
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <XCircle className="w-4 h-4 mr-2" />
                            Cancel order
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

        {/* Mobile Cards View */}
        <div className="md:hidden">
          <div className="space-y-4 p-4">
            {sortedOrders.map((order) => (
              <div 
                key={order.id} 
                className="bg-white rounded-lg border p-4 space-y-4 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package className="w-4 h-4 text-gray-400" />
                    </div>
                    <div>
                      <div className="font-medium">{order.orderNumber}</div>
                      <div className="text-sm text-gray-500">{order.items} items</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-600 bg-green-50 px-2.5 py-1.5 text-sm font-medium">
                    ${order.total.toFixed(2)}
                  </Badge>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Customer</span>
                    <span className="text-sm text-gray-500">{order.customer.name}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div className="font-medium">{order.customer.email}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="space-y-1">
                    <div className="text-gray-500">Payment Status</div>
                    {getPaymentStatusBadge(order.paymentStatus)}
                  </div>
                  <div className="space-y-1">
                    <div className="text-gray-500">Fulfillment</div>
                    {getFulfillmentStatusBadge(order.fulfillmentStatus)}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 flex-1">
                    <Button variant="outline" size="sm" className="h-9">
                      <FileText className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-9">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="h-9 w-9">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuItem>
                        <FileText className="w-4 h-4 mr-2" />
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Track order
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Send className="w-4 h-4 mr-2" />
                        Send invoice
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Printer className="w-4 h-4 mr-2" />
                        Print packing slip
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Pagination 
          currentPage={currentPage}
          totalItems={orders.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          itemName="orders"
        />
      </div>

      <InvoiceDialog
        isOpen={isInvoiceDialogOpen}
        onClose={() => setIsInvoiceDialogOpen(false)}
        selectedOrders={orders.filter(order => selectedOrders.includes(order.id))}
      />
    </div>
  );
}