'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download,
  Calendar,
  ArrowUpDown,
  ShoppingCart,
  Mail,
  Clock,
  AlertTriangle,
  MoreVertical,
  FileText,
  Send,
  Trash2,
  Users,
  DollarSign,
  ExternalLink,
  User
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
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Pagination } from '@/components/ui/pagination';

interface AbandonedCart {
  id: string;
  customer: {
    name: string;
    email: string;
    // Add address if you want to show it
    // address?: string;
  };
  date: string;
  total: number;
  items: number;
  status: 'open' | 'recovered' | 'lost';
  recoveryEmail?: {
    sent: string;
    status: 'sent' | 'opened' | 'clicked';
  };
}

const abandonedCarts: AbandonedCart[] = [
  {
    id: 'CART001',
    customer: {
      name: 'John Doe',
      email: 'john@example.com'
    },
    date: '2024-02-20T10:00:00',
    total: 149.99,
    items: 3,
    status: 'open',
    recoveryEmail: {
      sent: '2024-02-20T10:00:00',
      status: 'sent'
    }
  },
  {
    id: 'CART002',
    customer: {
      name: 'Jane Smith',
      email: 'jane@example.com'
    },
    date: '2024-02-19T15:30:00',
    total: 89.99,
    items: 2,
    status: 'open',
    recoveryEmail: {
      sent: '2024-02-19T15:30:00',
      status: 'sent'
    }
  },
  {
    id: 'CART003',
    customer: {
      name: 'Bob Wilson',
      email: 'bob@example.com'
    },
    date: '2024-02-18T09:15:00',
    total: 299.99,
    items: 4,
    status: 'recovered',
    recoveryEmail: {
      sent: '2024-02-18T09:15:00',
      status: 'sent'
    }
  }
];

const getStatusBadge = (status: AbandonedCart['status']) => {
  switch (status) {
    case 'open':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <Clock className="w-3 h-3" />
          Pending Recovery
        </span>
      );
    case 'recovered':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <ShoppingCart className="w-3 h-3" />
          Recovered
        </span>
      );
    case 'lost':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <AlertTriangle className="w-3 h-3" />
          Lost
        </span>
      );
  }
};

// Update the SortConfig interface
interface SortConfig {
  key: 'id' | 'date' | 'total' | 'items' | 'status' | 'customer.name' | 'customer.email';
  direction: 'asc' | 'desc';
}

export default function AbandonedOrdersPage() {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const sortedCarts = React.useMemo(() => {
    if (!sortConfig) return abandonedCarts;

    return [...abandonedCarts].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      // Handle nested customer properties
      if (sortConfig.key.startsWith('customer.')) {
        const [parent, child] = sortConfig.key.split('.');
        aValue = a.customer[child as keyof AbandonedCart['customer']];
        bValue = b.customer[child as keyof AbandonedCart['customer']];
      } else {
        aValue = a[sortConfig.key as keyof AbandonedCart];
        bValue = b[sortConfig.key as keyof AbandonedCart];
      }

      // Handle null/undefined values
      if (aValue == null) return sortConfig.direction === 'asc' ? -1 : 1;
      if (bValue == null) return sortConfig.direction === 'asc' ? 1 : -1;

      // Compare values
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [sortConfig]);

  // Add this handler for sorting
  const handleSort = (key: SortConfig['key']) => {
    setSortConfig(current => {
      if (current?.key === key) {
        return {
          key,
          direction: current.direction === 'asc' ? 'desc' : 'asc'
        };
      }
      return { key, direction: 'asc' };
    });
  };

  const totalValue = abandonedCarts.reduce((sum, cart) => sum + cart.total, 0);
  const recoveryRate = (abandonedCarts.filter(cart => cart.status === 'recovered').length / abandonedCarts.length) * 100;

  return (
    <div className="p-4 sm:p-6 max-w-[1200px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold">Abandoned Checkouts</h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          {
            title: "Total Abandoned",
            value: "156",
            description: "Last 30 days"
          },
          {
            title: "Recovery Rate",
            value: "24%",
            description: "vs 18% last month",
            valueColor: "text-blue-600"
          },
          {
            title: "Recovered Value",
            value: "$3,240",
            description: "Last 30 days",
            valueColor: "text-green-600"
          },
          {
            title: "Avg. Cart Value",
            value: "$85",
            description: "Per checkout",
            valueColor: "text-yellow-600"
          }
        ].map((stat, index) => (
          <Card 
            key={index} 
            className="bg-white rounded-lg border p-4"
          >
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">
                {stat.title}
              </span>
              
              <span className={cn(
                "text-2xl font-semibold mt-2",
                stat.valueColor || "text-gray-900"
              )}>
                {stat.value}
              </span>
              
              <span className="text-xs text-gray-500 mt-1">
                {stat.description}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-lg border mb-6">
        <div className="flex flex-col gap-3 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Search abandoned checkouts..." className="pl-9" />
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <Button variant="outline" size="sm" className="sm:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Select defaultValue="all">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All abandoned</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="last7days">Last 7 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Table/Cards Section */}
      <div className="rounded-lg">
        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('id')}
                >
                  <div className="flex items-center">
                    Cart ID
                    {sortConfig?.key === 'id' && (
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('customer.name')}
                >
                  <div className="flex items-center">
                    Customer
                    {sortConfig?.key === 'customer.name' && (
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden sm:table-cell">Items</TableHead>
                <TableHead className="hidden sm:table-cell">Value</TableHead>
                <TableHead className="hidden lg:table-cell">Last Activity</TableHead>
                <TableHead className="hidden lg:table-cell">Recovery Emails</TableHead>
                <TableHead className="w-[52px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCarts.map((cart) => (
                <TableRow key={cart.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <ShoppingCart className="w-4 h-4 text-gray-400" />
                      </div>
                      <div>
                        <div className="font-medium">{cart.id}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(cart.date).toLocaleDateString()}
                        </div>
                        {/* Mobile-only info */}
                        <div className="sm:hidden text-sm text-gray-500 mt-1">
                          ${cart.total.toFixed(2)} • {cart.items} items
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium truncate max-w-[200px]">
                        {cart.customer.name}
                      </div>
                      <div className="text-sm text-gray-500 truncate max-w-[200px]">
                        {cart.customer.email}
                      </div>
                      {/* Mobile-only status */}
                      <div className="sm:hidden mt-2">
                        {getStatusBadge(cart.status)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {getStatusBadge(cart.status)}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {cart.items} items
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    ${cart.total.toFixed(2)}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {new Date(cart.date).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {cart.recoveryEmail?.sent} sent
                    </div>
                  </TableCell>
                  <TableCell>
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
                          <Send className="w-4 h-4 mr-2" />
                          Send recovery email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete cart
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Cards View */}
        <div className="md:hidden">
          <div className="space-y-4 p-4">
            {abandonedCarts.map((order) => (
              <div 
                key={order.id} 
                className="bg-white rounded-lg border p-4 space-y-4 hover:shadow-md transition-all duration-200"
              >
                {/* Header with better styling */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium">{order.id}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(order.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-yellow-600 bg-yellow-50 px-2.5 py-1.5 text-sm font-medium">
                    ${order.total.toFixed(2)}
                  </Badge>
                </div>

                {/* Customer Info with better styling */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-gray-600">Customer Details</div>
                    {getStatusBadge(order.status)}
                  </div>
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{order.customer.name}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-500">{order.customer.email}</span>
                    </div>
                  </div>
                </div>

                {/* Cart Info with better styling */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="text-xs font-medium text-gray-500 mb-1">Items</div>
                    <div className="text-sm font-medium">{order.items} products</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="text-xs font-medium text-gray-500 mb-1">Emails Sent</div>
                    <div className="text-sm font-medium">{order.recoveryEmail?.sent} emails</div>
                  </div>
                </div>

                {/* Actions with better styling */}
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-9">
                      <Send className="w-4 h-4 mr-2" />
                      Recover
                    </Button>
                    <Button variant="outline" size="sm" className="h-9">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-9 w-9">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuItem>
                        <Send className="w-4 h-4 mr-2" />
                        Send recovery email
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View cart
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Pagination 
        currentPage={currentPage}
        totalItems={abandonedCarts.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
        itemName="abandoned checkouts"
      />
    </div>
  );
}