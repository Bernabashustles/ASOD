'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  ShoppingBag,
  CreditCard,
  Send,
  Edit,
  MoreVertical,
  Store,
  DollarSign,
  Package,
  Tag,
  AlertTriangle,
  FileText,
  Download
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

interface CustomerDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  joinedDate: string;
  lastOrder: string;
  totalOrders: number;
  totalSpent: number;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  tags: string[];
  segments: string[];
  recentOrders: {
    id: string;
    orderNumber: string;
    date: string;
    status: 'paid' | 'pending' | 'refunded';
    total: number;
    items: number;
  }[];
  stats: {
    averageOrderValue: number;
    lifetimeValue: number;
    ordersCount: number;
    lastVisit: string;
  };
}

// Mock data
const customerDetails: CustomerDetails = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1 234 567 890',
  status: 'active',
  joinedDate: '2024-01-15T10:00:00',
  lastOrder: '2024-02-20T15:30:00',
  totalOrders: 5,
  totalSpent: 549.99,
  address: {
    line1: '123 Main St',
    city: 'New York',
    state: 'NY',
    postal_code: '10001',
    country: 'United States'
  },
  tags: ['VIP', 'Newsletter Subscriber'],
  segments: ['High Value', 'Regular Customers'],
  recentOrders: [
    {
      id: '1',
      orderNumber: '#1001',
      date: '2024-02-20T15:30:00',
      status: 'paid',
      total: 129.99,
      items: 2
    },
    {
      id: '2',
      orderNumber: '#1002',
      date: '2024-02-15T11:20:00',
      status: 'paid',
      total: 89.99,
      items: 1
    }
  ],
  stats: {
    averageOrderValue: 110.00,
    lifetimeValue: 549.99,
    ordersCount: 5,
    lastVisit: '2024-02-25T09:15:00'
  }
};

const getStatusBadge = (status: 'paid' | 'pending' | 'refunded') => {
  const styles = {
    paid: "bg-green-50 text-green-700 border-green-200",
    pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
    refunded: "bg-gray-50 text-gray-700 border-gray-200"
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default function CustomerDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  // Define the customer details with proper typing
  const customerDetails = {
    id: id,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 890',
    status: 'active' as 'active' | 'inactive',
    joinedDate: '2024-01-15T10:00:00',
    lastOrder: '2024-02-20T15:30:00',
    totalOrders: 5,
    totalSpent: 549.99,
    address: {
      line1: '123 Main St',
      line2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      postal_code: '10001',
      country: 'United States'
    },
    tags: ['VIP', 'Newsletter Subscriber'],
    segments: ['High Value', 'Regular Customers'],
    stats: {
      averageOrderValue: 110.00,
      lifetimeValue: 549.99,
      ordersCount: 5,
      lastVisit: '2024-02-25T09:15:00'
    },
    recentOrders: [
      {
        id: '1',
        orderNumber: '#1001',
        date: '2024-02-20T15:30:00',
        status: 'paid' as 'paid' | 'pending' | 'refunded',
        total: 129.99,
        items: 2
      },
      {
        id: '2',
        orderNumber: '#1002',
        date: '2024-02-15T11:20:00',
        status: 'paid' as 'paid' | 'pending' | 'refunded',
        total: 89.99,
        items: 1
      }
    ]
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-5xl flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Link href="/customers" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="font-medium">Customers</span>
            </Link>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">{customerDetails.name}</h1>
              <Badge variant={customerDetails.status === 'active' ? 'success' : 'secondary'}>
                {customerDetails.status === 'active' ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Send className="h-4 w-4 mr-2" />
              Email customer
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem>
                  <Store className="w-4 h-4 mr-2" />
                  View orders
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="w-4 h-4 mr-2" />
                  Export data
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Delete customer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="container max-w-5xl py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content - Make it narrower */}
          <div className="flex-1 max-w-3xl space-y-6">
            {/* Customer Overview - Enhanced */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Customer Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 border flex items-center justify-center">
                      <User className="w-10 h-10 text-gray-500" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold">{customerDetails.name}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{customerDetails.email}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{customerDetails.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid - Enhanced */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm text-muted-foreground">Total Orders</div>
                      <div className="mt-1 flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-gray-400" />
                        <span className="text-xl font-semibold">{customerDetails.totalOrders}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Total Spent</div>
                      <div className="mt-1 flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span className="text-xl font-semibold">${customerDetails.totalSpent.toFixed(2)}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Average Order</div>
                      <div className="mt-1 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-gray-400" />
                        <span className="text-xl font-semibold">${customerDetails.stats.averageOrderValue.toFixed(2)}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Last Order</div>
                      <div className="mt-1 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-xl font-semibold">{new Date(customerDetails.lastOrder).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Orders - Enhanced */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Button variant="outline" size="sm">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  View all orders
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customerDetails.recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-white border flex items-center justify-center">
                          <Package className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                          <Link 
                            href={`/orders/${order.id}`}
                            className="font-medium hover:underline"
                          >
                            {order.orderNumber}
                          </Link>
                          <div className="text-sm text-muted-foreground">
                            {new Date(order.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${order.total.toFixed(2)}</div>
                        <div>{getStatusBadge(order.status)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Enhanced */}
          <div className="lg:w-[280px] space-y-6">
            {/* Customer Details */}
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Address</div>
                    <div className="p-3 bg-gray-50 rounded-lg space-y-1">
                      <div className="font-medium">{customerDetails.name}</div>
                      <div className="text-sm">{customerDetails.address.line1}</div>
                      {customerDetails.address.line2 && (
                        <div className="text-sm">{customerDetails.address.line2}</div>
                      )}
                      <div className="text-sm">
                        {customerDetails.address.city}, {customerDetails.address.state} {customerDetails.address.postal_code}
                      </div>
                      <div className="text-sm">{customerDetails.address.country}</div>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="text-sm text-muted-foreground mb-2">Tags</div>
                    <div className="flex flex-wrap gap-2">
                      {customerDetails.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="text-sm text-muted-foreground mb-2">Segments</div>
                    <div className="flex flex-wrap gap-2">
                      {customerDetails.segments.map((segment, index) => (
                        <Badge key={index} variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                          {segment}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Stats - Enhanced */}
            <Card>
              <CardHeader>
                <CardTitle>Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-muted-foreground">Customer since</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{new Date(customerDetails.joinedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-muted-foreground">Last visit</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{new Date(customerDetails.stats.lastVisit).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-muted-foreground">Lifetime value</div>
                    <div className="flex items-center gap-2 mt-1">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">${customerDetails.stats.lifetimeValue.toFixed(2)}</span>
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