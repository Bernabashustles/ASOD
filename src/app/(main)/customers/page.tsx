'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  Download,
  Upload,
  Users,
  Mail,
  ArrowUpDown,
  Calendar,
  Store,
  ShoppingBag,
  MapPin,
  AlertTriangle,
  FileText,
  UserPlus,
  Settings
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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pagination } from '@/components/ui/pagination';

interface Customer {
  id: string;
  name: string;
  email: string;
  orders: number;
  totalSpent: number;
  location: string;
  lastOrder: string;
  status: 'active' | 'draft' | 'archived';
  tags: string[];
}

const customers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    orders: 5,
    totalSpent: 549.99,
    location: 'New York, USA',
    lastOrder: '2024-02-20T10:00:00',
    status: 'active',
    tags: ['VIP', 'Wholesale']
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    orders: 3,
    totalSpent: 299.99,
    location: 'London, UK',
    lastOrder: '2024-02-19T15:30:00',
    status: 'active',
    tags: ['Retail']
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    orders: 0,
    totalSpent: 0,
    location: 'Toronto, CA',
    lastOrder: '',
    status: 'draft',
    tags: []
  }
];

const EmptyState = () => (
  <div className="text-center max-w-[420px] mx-auto py-12">
    <div className="w-20 h-20 bg-gray-100 rounded-lg mx-auto mb-6 flex items-center justify-center">
      <Users className="w-10 h-10 text-gray-400" />
    </div>
    <h2 className="text-lg font-semibold mb-2">
      Everything customers-related in one place
    </h2>
    <p className="text-sm text-gray-500 mb-6">
      Manage customer details, see customer order history, and group customers into segments.
    </p>
    <div className="flex items-center justify-center gap-3">
      <Button>
        <Plus className="w-4 h-4 mr-2" />
        Add customer
      </Button>
      <Button variant="outline">
        <Upload className="w-4 h-4 mr-2" />
        Import customers
      </Button>
    </div>
    <div className="mt-12">
      <h3 className="text-sm font-medium mb-2">Get customers with apps</h3>
      <p className="text-sm text-gray-500 mb-4">
        Grow your customer list by adding a lead capture form to your store and marketing.
      </p>
      <Button variant="outline" size="sm">
        See app recommendations
      </Button>
    </div>
  </div>
);

const CustomerList = () => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Customer;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleSort = (key: keyof Customer) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedCustomers = [...customers].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Stats */}
      {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{customers.length}</div>
            <p className="text-xs text-gray-500 mt-1">
              All time
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Active Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-green-600">
              {customers.filter(c => c.status === 'active').length}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Made a purchase
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              New Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-blue-600">2</div>
            <p className="text-xs text-gray-500 mt-1">
              Last 30 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Abandoned Checkouts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-yellow-600">3</div>
            <p className="text-xs text-gray-500 mt-1">
              Last 30 days
            </p>
          </CardContent>
        </Card>
      </div> */}

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search customers"
            className="pl-10"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All customers</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Tagged with" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All tags</SelectItem>
              <SelectItem value="vip">VIP</SelectItem>
              <SelectItem value="wholesale">Wholesale</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 sm:flex-none gap-2">
              <Filter className="w-4 h-4" />
              More filters
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex-1 sm:flex-none gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <FileText className="w-4 h-4 mr-2" />
                  Export all customers
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="w-4 h-4 mr-2" />
                  Export selected
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Upload className="w-4 h-4 mr-2" />
                  Import customers
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block border rounded-lg overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button 
                  variant="ghost" 
                  className="gap-1 font-medium"
                  onClick={() => handleSort('name')}
                >
                  Customer
                  <ArrowUpDown className="w-4 h-4" />
                </Button>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  className="gap-1 font-medium"
                  onClick={() => handleSort('orders')}
                >
                  Orders
                  <ArrowUpDown className="w-4 h-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  className="gap-1 font-medium"
                  onClick={() => handleSort('totalSpent')}
                >
                  Total spent
                  <ArrowUpDown className="w-4 h-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  className="gap-1 font-medium"
                  onClick={() => handleSort('lastOrder')}
                >
                  Last order
                  <ArrowUpDown className="w-4 h-4" />
                </Button>
              </TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg font-medium text-gray-600">
                        {customer.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-gray-500">{customer.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    customer.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : customer.status === 'draft'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {customer.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {customer.location}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-gray-400" />
                    {customer.orders} orders
                  </div>
                </TableCell>
                <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                <TableCell>
                  {customer.lastOrder ? (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {new Date(customer.lastOrder).toLocaleDateString()}
                    </div>
                  ) : (
                    '—'
                  )}
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
                        <Mail className="w-4 h-4 mr-2" />
                        Email customer
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Store className="w-4 h-4 mr-2" />
                        View orders
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="w-4 h-4 mr-2" />
                        Edit customer
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Delete customer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sortedCustomers.map((customer) => (
          <Card key={customer.id} className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-lg font-medium text-gray-600">
                  {customer.name.charAt(0)}
                </span>
              </div>
              <div className="min-w-0">
                <div className="font-medium truncate">{customer.name}</div>
                <div className="text-sm text-gray-500 truncate">{customer.email}</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  customer.status === 'active' 
                    ? 'bg-green-100 text-green-800'
                    : customer.status === 'draft'
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {customer.status}
                </span>
                {customer.tags.length > 0 && (
                  <div className="flex gap-1">
                    {customer.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm truncate">{customer.location}</span>
              </div>

              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{customer.orders} orders</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm">${customer.totalSpent.toFixed(2)}</span>
              </div>

              {customer.lastOrder && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">
                    {new Date(customer.lastOrder).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <Button variant="outline" size="sm" className="gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem>
                    <Store className="w-4 h-4 mr-2" />
                    View orders
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Edit customer
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Delete customer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default function CustomersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const hasCustomers = customers.length > 0;

  return (
    <div className="p-4 sm:p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">Customers</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and view customer information
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          <Button 
            variant="outline" 
            className="gap-2 justify-center"
          >
            <Settings className="w-4 h-4" />
            Manage segments
          </Button>
          <Link href="/customers/add" className="w-full sm:w-auto">
            <Button className="gap-2 w-full sm:w-auto justify-center">
              <UserPlus className="w-4 h-4" />
              Add customer
            </Button>
          </Link>
        </div>
      </div>

      {hasCustomers ? <CustomerList /> : <EmptyState />}

      <Pagination 
        currentPage={currentPage}
        totalItems={customers.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
        itemName="customers"
      />
    </div>
  );
}