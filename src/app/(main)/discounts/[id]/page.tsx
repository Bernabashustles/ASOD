'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  MoreHorizontal, 
  Calendar, 
  Clock, 
  Tag, 
  Percent, 
  Store, 
  Users, 
  ShoppingBag, 
  BarChart4, 
  Edit, 
  Copy, 
  Trash2, 
  CheckCircle2, 
  XCircle,
  ExternalLink
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useParams, useRouter } from 'next/navigation';

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
  description?: string;
  image?: string;
}

// Mock data for a single discount
const discountData: Discount = {
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
  collections: ['Summer Collection', 'Beach Essentials'],
  customerEligibility: 'all',
  description: 'Summer promotion offering 20% off on selected collections. Valid until the end of August 2024.',
  image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop'
};

// Mock usage data for the chart
const usageData = [
  { date: 'May 1', count: 5 },
  { date: 'May 2', count: 8 },
  { date: 'May 3', count: 12 },
  { date: 'May 4', count: 7 },
  { date: 'May 5', count: 10 },
  { date: 'May 6', count: 15 },
  { date: 'May 7', count: 20 },
];

// Mock recent orders that used this discount
const recentOrders = [
  { id: '#1234', customer: 'John Doe', date: '2024-05-07T14:23:00', total: 127.95, items: 3 },
  { id: '#1233', customer: 'Sarah Smith', date: '2024-05-07T11:05:00', total: 89.50, items: 2 },
  { id: '#1232', customer: 'Michael Johnson', date: '2024-05-06T16:42:00', total: 215.75, items: 4 },
  { id: '#1231', customer: 'Emily Brown', date: '2024-05-06T09:18:00', total: 64.99, items: 1 },
  { id: '#1230', customer: 'David Wilson', date: '2024-05-05T13:37:00', total: 149.90, items: 3 },
];

const getStatusBadge = (status: Discount['status']) => {
  switch (status) {
    case 'active':
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" />
          Active
        </Badge>
      );
    case 'scheduled':
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Scheduled
        </Badge>
      );
    case 'expired':
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 flex items-center gap-1">
          <XCircle className="w-3 h-3" />
          Expired
        </Badge>
      );
  }
};

export default function DiscountDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  
  // In a real app, you would fetch the discount data based on the ID
  const discount = discountData;
  
  // Calculate usage percentage
  const usagePercentage = discount.usageLimit 
    ? Math.round((discount.usageCount / discount.usageLimit) * 100) 
    : 0;
  
  return (
    <div className="min-h-screen">
      {/* Header - Responsive */}
      <div className="sticky top-0 z-20 bg-white border-b">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3">
              <Link href="/discounts">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <h1 className="text-lg font-medium">{discount.code}</h1>
                {getStatusBadge(discount.status)}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    <MoreHorizontal className="h-4 w-4" />
                    Actions
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem className="cursor-pointer">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit discount
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Deactivate discount
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href={`/discounts/${params.id}/edit`}>
                <Button size="sm" className="gap-1">
                  <Edit className="h-4 w-4" />
                  <span className="hidden sm:inline">Edit discount</span>
                  <span className="sm:hidden">Edit</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Tabs - Responsive */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Main Grid - Responsive */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content - 2/3 width on desktop */}
              <div className="lg:col-span-2 space-y-6">
                {/* Discount Image (if available) */}
                {discount.image && (
                  <Card>
                    <div className="aspect-[3/1] relative overflow-hidden rounded-t-lg">
                      <img 
                        src={discount.image} 
                        alt={discount.code} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardContent className="p-4 md:p-6">
                      {discount.description && (
                        <p className="text-sm text-gray-600">{discount.description}</p>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Discount Details */}
                <Card>
                  <CardHeader className="p-4 md:p-6 pb-0">
                    <CardTitle className="text-base">Discount details</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm font-medium text-gray-500">Discount code</div>
                          <div className="mt-1 font-medium">{discount.code}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Type</div>
                          <div className="mt-1 flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                              {discount.type === 'percentage' ? (
                                <Percent className="w-4 h-4 text-gray-500" />
                              ) : discount.type === 'shipping' ? (
                                <Store className="w-4 h-4 text-gray-500" />
                              ) : (
                                <Tag className="w-4 h-4 text-gray-500" />
                              )}
                            </div>
                            <span className="capitalize">
                              {discount.type === 'percentage' 
                                ? `${discount.value}% off` 
                                : discount.type === 'shipping'
                                ? 'Free shipping'
                                : `$${discount.value} off`}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Minimum purchase</div>
                          <div className="mt-1">
                            {discount.minimumPurchase 
                              ? `$${discount.minimumPurchase.toFixed(2)}` 
                              : 'No minimum'}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Customer eligibility</div>
                          <div className="mt-1 flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-500" />
                            <span>
                              {discount.customerEligibility === 'all' 
                                ? 'All customers' 
                                : 'Specific customer segments'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm font-medium text-gray-500">Active dates</div>
                          <div className="mt-1 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span>
                              {new Date(discount.startDate).toLocaleDateString()} 
                              {discount.endDate && ` to ${new Date(discount.endDate).toLocaleDateString()}`}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Usage limit</div>
                          <div className="mt-1">
                            {discount.usageLimit 
                              ? `${discount.usageCount} of ${discount.usageLimit} used` 
                              : 'Unlimited'}
                          </div>
                          {discount.usageLimit && (
                            <div className="mt-2">
                              <Progress value={usagePercentage} className="h-2" />
                              <div className="mt-1 text-xs text-gray-500 flex justify-between">
                                <span>{usagePercentage}% used</span>
                                <span>{discount.usageLimit - discount.usageCount} remaining</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Applies to</div>
                          <div className="mt-1">
                            {discount.collections.length > 0 
                              ? (
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <ShoppingBag className="w-4 h-4 text-gray-500" />
                                    <span>Specific collections</span>
                                  </div>
                                  <div className="pl-6">
                                    {discount.collections.map((collection, index) => (
                                      <Badge key={index} variant="secondary" className="mr-1 mb-1">
                                        {collection}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              ) 
                              : 'All products'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Usage Chart */}
                <Card>
                  <CardHeader className="p-4 md:p-6 pb-0">
                    <CardTitle className="text-base">Usage over time</CardTitle>
                    <CardDescription>
                      Recent discount usage trends
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6">
                    <div className="h-[200px] md:h-[250px] flex items-end justify-between gap-2">
                      {usageData.map((day, index) => (
                        <div key={index} className="flex flex-col items-center flex-1">
                          <div 
                            className="w-full bg-blue-100 rounded-t-sm" 
                            style={{ height: `${(day.count / 20) * 100}%` }}
                          ></div>
                          <div className="text-xs text-gray-500 mt-2 truncate w-full text-center">
                            {day.date}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <Button variant="outline" size="sm" className="gap-1">
                        <BarChart4 className="w-4 h-4" />
                        View detailed analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar - 1/3 width on desktop */}
              <div className="space-y-6">
                {/* Summary Card */}
                <Card>
                  <CardHeader className="p-4 md:p-6 pb-0">
                    <CardTitle className="text-base">Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="text-sm font-medium text-gray-500">Status</div>
                        <div>{getStatusBadge(discount.status)}</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm font-medium text-gray-500">Total uses</div>
                        <div className="font-medium">{discount.usageCount}</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm font-medium text-gray-500">Created</div>
                        <div className="text-sm">Jan 15, 2024</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm font-medium text-gray-500">Last used</div>
                        <div className="text-sm">May 7, 2024</div>
                      </div>
                      <div className="pt-2">
                        <Button variant="outline" className="w-full gap-1">
                          <ExternalLink className="w-4 h-4" />
                          Share discount
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader className="p-4 md:p-6 pb-0">
                    <CardTitle className="text-base">Quick actions</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6">
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start gap-2">
                        <Copy className="w-4 h-4" />
                        Duplicate discount
                      </Button>
                      <Button variant="outline" className="w-full justify-start gap-2">
                        <BarChart4 className="w-4 h-4" />
                        View analytics
                      </Button>
                      <Button variant="outline" className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                        Deactivate discount
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="orders" className="space-y-6">
            {/* Orders that used this discount */}
            <Card>
              <CardHeader className="p-4 md:p-6 pb-0">
                <CardTitle className="text-base">Recent orders</CardTitle>
                <CardDescription>
                  Orders that used this discount code
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead className="hidden md:table-cell">Date</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="hidden sm:table-cell text-right">Items</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {new Date(order.date).toLocaleString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </TableCell>
                          <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                          <TableCell className="hidden sm:table-cell text-right">{order.items}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" size="sm">
                    View all orders
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 