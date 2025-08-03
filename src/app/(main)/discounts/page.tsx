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
  Tag,
  Percent,
  Users,
  Store,
  Clock,
  CheckCircle2,
  XCircle
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Discount {
  id: string;
  code: string;
  type: 'percentage' | 'fixed' | 'shipping';
  value: number;
  status: 'active' | 'scheduled' | 'expired';
  usageCount: number;
  usageLimit: number | null;
  startDate: string;
  endDate: string | null;
  minimumPurchase: number | null;
  collections: string[];
  customerEligibility: 'all' | 'specific';
}

const discounts: Discount[] = [
  {
    id: '1',
    code: 'SUMMER2024',
    type: 'percentage',
    value: 20,
    status: 'active',
    usageCount: 145,
    usageLimit: 500,
    startDate: '2024-02-01T00:00:00',
    endDate: '2024-08-31T23:59:59',
    minimumPurchase: 50,
    collections: ['Summer Collection'],
    customerEligibility: 'all'
  },
  {
    id: '2',
    code: 'FREESHIP',
    type: 'shipping',
    value: 100,
    status: 'active',
    usageCount: 89,
    usageLimit: null,
    startDate: '2024-01-15T00:00:00',
    endDate: null,
    minimumPurchase: 100,
    collections: [],
    customerEligibility: 'all'
  },
  {
    id: '3',
    code: 'NEWUSER25',
    type: 'percentage',
    value: 25,
    status: 'active',
    usageCount: 67,
    usageLimit: null,
    startDate: '2024-02-15T00:00:00',
    endDate: null,
    minimumPurchase: null,
    collections: [],
    customerEligibility: 'specific'
  }
];

const getStatusBadge = (status: Discount['status']) => {
  switch (status) {
    case 'active':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
          <CheckCircle2 className="w-3 h-3" />
          Active
        </span>
      );
    case 'scheduled':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
          <Clock className="w-3 h-3" />
          Scheduled
        </span>
      );
    case 'expired':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
          <XCircle className="w-3 h-3" />
          Expired
        </span>
      );
  }
};

export default function DiscountsPage() {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Discount;
    direction: 'asc' | 'desc';
  } | null>(null);

  const activeDiscounts = discounts.filter(d => d.status === 'active').length;
  const totalUsage = discounts.reduce((sum, d) => sum + d.usageCount, 0);
  const averageDiscount = discounts
    .filter(d => d.type === 'percentage')
    .reduce((sum, d) => sum + d.value, 0) / discounts.length;

  const handleSort = (key: keyof Discount) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedDiscounts = [...discounts].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue === null || bValue === null) return 0;
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'asc'
        ? aValue - bValue 
        : bValue - aValue;
    }
    return 0;
  });

  return (
    <div className="p-4 md:p-6 max-w-[1200px] mx-auto">
      {/* Header - Made responsive */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold">Discounts</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create and manage discount codes
          </p>
        </div>
        <Link href="/discounts/add">
          <Button className="w-full sm:w-auto gap-2">
            <Plus className="w-4 h-4" />
            Create discount
          </Button>
        </Link>
      </div>

      {/* Stats - Made responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Active Discounts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{activeDiscounts}</div>
            <p className="text-xs text-gray-500 mt-1">
              Currently running promotions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{totalUsage}</div>
            <p className="text-xs text-gray-500 mt-1">
              Times discounts were used
            </p>
          </CardContent>
        </Card>
        <Card className="sm:col-span-2 lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Average Discount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{averageDiscount.toFixed(1)}%</div>
            <p className="text-xs text-gray-500 mt-1">
              Across all percentage discounts
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search - Made responsive */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search discounts"
            className="pl-10 w-full"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <Select>
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="percentage">Percentage</SelectItem>
              <SelectItem value="fixed">Fixed amount</SelectItem>
              <SelectItem value="shipping">Free shipping</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="w-full sm:w-auto gap-2">
            <Filter className="w-4 h-4" />
            More filters
          </Button>
        </div>
      </div>

      {/* Discounts Table - Made responsive */}
      <div className="border rounded-lg overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    className="gap-1 font-medium"
                    onClick={() => handleSort('code')}
                  >
                    Discount code
                    <ArrowUpDown className="w-4 h-4" />
                  </Button>
                </TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="hidden sm:table-cell">Type</TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    className="gap-1 font-medium"
                    onClick={() => handleSort('usageCount')}
                  >
                    Usage
                    <ArrowUpDown className="w-4 h-4" />
                  </Button>
                </TableHead>
                <TableHead className="hidden lg:table-cell">Limit</TableHead>
                <TableHead className="hidden md:table-cell">
                  <Button 
                    variant="ghost" 
                    className="gap-1 font-medium"
                    onClick={() => handleSort('startDate')}
                  >
                    Start date
                    <ArrowUpDown className="w-4 h-4" />
                  </Button>
                </TableHead>
                <TableHead className="hidden lg:table-cell">End date</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedDiscounts.map((discount) => (
                <TableRow key={discount.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        {discount.type === 'percentage' ? (
                          <Percent className="w-4 h-4 text-gray-400" />
                        ) : discount.type === 'shipping' ? (
                          <Store className="w-4 h-4 text-gray-400" />
                        ) : (
                          <Tag className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{discount.code}</div>
                        <div className="text-sm text-gray-500">
                          {discount.type === 'percentage' 
                            ? `${discount.value}% off` 
                            : discount.type === 'shipping'
                            ? 'Free shipping'
                            : `$${discount.value} off`}
                        </div>
                        {/* Mobile-only status badge */}
                        <div className="md:hidden mt-1">
                          {getStatusBadge(discount.status)}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {getStatusBadge(discount.status)}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell capitalize">
                    {discount.type}
                  </TableCell>
                  <TableCell>{discount.usageCount} uses</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {discount.usageLimit ? `${discount.usageLimit} uses` : 'Unlimited'}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {new Date(discount.startDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {discount.endDate 
                      ? new Date(discount.endDate).toLocaleDateString()
                      : '—'}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem>View analytics</DropdownMenuItem>
                        {/* Mobile-only menu items */}
                        <DropdownMenuItem className="sm:hidden">
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Deactivate
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
    </div>
  );
}