'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  Calendar,
  ArrowUpDown,
  Store,
  ArrowRight,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle
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

interface Transfer {
  id: string;
  status: 'pending' | 'in_transit' | 'completed' | 'cancelled';
  fromLocation: string;
  toLocation: string;
  items: number;
  createdAt: string;
  expectedDate: string;
}

const transfers: Transfer[] = [
  {
    id: 'TRF001',
    status: 'completed',
    fromLocation: 'Main Warehouse',
    toLocation: 'Downtown Store',
    items: 15,
    createdAt: '2024-02-20T10:00:00',
    expectedDate: '2024-02-21T10:00:00'
  },
  {
    id: 'TRF002',
    status: 'in_transit',
    fromLocation: 'Main Warehouse',
    toLocation: 'Mall Store',
    items: 8,
    createdAt: '2024-02-20T11:30:00',
    expectedDate: '2024-02-22T11:30:00'
  },
  {
    id: 'TRF003',
    status: 'pending',
    fromLocation: 'Downtown Store',
    toLocation: 'Mall Store',
    items: 3,
    createdAt: '2024-02-20T09:15:00',
    expectedDate: '2024-02-23T09:15:00'
  }
];

const getStatusBadge = (status: Transfer['status']) => {
  switch (status) {
    case 'completed':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle2 className="w-3 h-3" />
          Completed
        </span>
      );
    case 'in_transit':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <Clock className="w-3 h-3" />
          In Transit
        </span>
      );
    case 'pending':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <AlertTriangle className="w-3 h-3" />
          Pending
        </span>
      );
    case 'cancelled':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          <XCircle className="w-3 h-3" />
          Cancelled
        </span>
      );
  }
};

export default function TransfersPage() {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Transfer;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleSort = (key: keyof Transfer) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedTransfers = [...transfers].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Add pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  return (
    <div className="p-4 sm:p-6 max-w-full sm:max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">Transfers</h1>
          <p className="text-sm text-gray-500 mt-1">
            Move and track inventory between locations
          </p>
        </div>
        <Button className="mt-4 sm:mt-0 gap-2">
          <Plus className="w-4 h-4" />
          Create transfer
        </Button>
      </div>

      {/* Stats Cards - Commented out
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              In Transit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-blue-600">
              {transfers.filter(t => t.status === 'in_transit').length}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Currently moving
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
            <div className="text-2xl font-semibold text-yellow-600">
              {transfers.filter(t => t.status === 'pending').length}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Awaiting shipment
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-green-600">
              {transfers.filter(t => t.status === 'completed').length}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Successfully delivered
            </p>
          </CardContent>
        </Card>
      </div>
      */}

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4 sm:mb-6">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search transfers"
            className="pl-10"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_transit">In Transit</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All locations</SelectItem>
              <SelectItem value="main">Main Warehouse</SelectItem>
              <SelectItem value="downtown">Downtown Store</SelectItem>
              <SelectItem value="mall">Mall Store</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            More filters
          </Button>
        </div>
      </div>

      {/* Transfers Table for Desktop */}
      <div className="hidden lg:block border rounded-lg overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button 
                  variant="ghost" 
                  className="gap-1 font-medium"
                  onClick={() => handleSort('id')}
                >
                  Transfer
                  <ArrowUpDown className="w-4 h-4" />
                </Button>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  className="gap-1 font-medium"
                  onClick={() => handleSort('items')}
                >
                  Items
                  <ArrowUpDown className="w-4 h-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  className="gap-1 font-medium"
                  onClick={() => handleSort('createdAt')}
                >
                  Created
                  <ArrowUpDown className="w-4 h-4" />
                </Button>
              </TableHead>
              <TableHead>Expected</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTransfers.map((transfer) => (
              <TableRow key={transfer.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="font-medium">{transfer.id}</div>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(transfer.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Store className="w-4 h-4 text-gray-400" />
                    {transfer.fromLocation}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Store className="w-4 h-4 text-gray-400" />
                    {transfer.toLocation}
                  </div>
                </TableCell>
                <TableCell>{transfer.items} items</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {new Date(transfer.createdAt).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {new Date(transfer.expectedDate).toLocaleDateString()}
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
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit transfer</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        Cancel transfer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Transfers Cards for Mobile */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6">
        {sortedTransfers.map((transfer) => (
          <Card key={transfer.id} className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Package className="w-4 h-4 text-gray-400" />
              </div>
              <div>
                <div className="font-medium">{transfer.id}</div>
                <div>{getStatusBadge(transfer.status)}</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">From</div>
                  <div className="flex items-center gap-2">
                    <Store className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">{transfer.fromLocation}</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">To</div>
                  <div className="flex items-center gap-2">
                    <Store className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">{transfer.toLocation}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-500">Items</div>
                <div className="font-medium">{transfer.items} items</div>
              </div>

              <div>
                <div className="text-sm text-gray-500">Created</div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{new Date(transfer.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-500">Expected</div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{new Date(transfer.expectedDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <Button variant="outline" className="gap-2">
                Details
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>View details</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    Cancel transfer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <Pagination 
        currentPage={currentPage}
        totalItems={transfers.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
        itemName="transfers"
      />
    </div>
  );
}