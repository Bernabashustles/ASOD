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
  
  return (
    <div className="container py-6">
      <div className="flex items-center gap-2 mb-4">
        <Link href="/dashboard/customers">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to customers
          </Button>
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">Customer: {id}</h1>
      <p>Customer details go here</p>
    </div>
  );
} 