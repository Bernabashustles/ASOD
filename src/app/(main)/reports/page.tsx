'use client';

import React, { useState } from 'react';
import { 
  BarChart3,
  FileText,
  Plus,
  Download,
  Filter,
  ShoppingCart,
  Users,
  Package,
  DollarSign,
  Calendar,
  ArrowRight,
  MoreVertical,
  Clock,
  RefreshCw,
  Eye,
  Copy,
  Trash2,
  Search,
  CheckCircle,
  XCircle
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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Report {
  id: string;
  name: string;
  type: 'sales' | 'orders' | 'customers' | 'products' | 'inventory';
  frequency: 'one-time' | 'daily' | 'weekly' | 'monthly';
  lastRun: string;
  status: 'completed' | 'scheduled' | 'failed';
}

const reports: Report[] = [
  {
    id: '1',
    name: 'Monthly Sales Summary',
    type: 'sales',
    frequency: 'monthly',
    lastRun: '2024-02-25T10:00:00',
    status: 'completed'
  },
  {
    id: '2',
    name: 'Customer Acquisition Report',
    type: 'customers',
    frequency: 'weekly',
    lastRun: '2024-02-24T15:30:00',
    status: 'scheduled'
  },
  {
    id: '3',
    name: 'Low Stock Alert Report',
    type: 'inventory',
    frequency: 'daily',
    lastRun: '2024-02-24T09:15:00',
    status: 'completed'
  }
];

const reportTypes = [
  {
    id: 'sales',
    name: 'Sales Reports',
    icon: DollarSign,
    description: 'Revenue, transactions, and sales performance',
    count: 5
  },
  {
    id: 'orders',
    name: 'Order Reports',
    icon: ShoppingCart,
    description: 'Order analytics and fulfillment metrics',
    count: 3
  },
  {
    id: 'customers',
    name: 'Customer Reports',
    icon: Users,
    description: 'Customer behavior and demographics',
    count: 4
  },
  {
    id: 'products',
    name: 'Product Reports',
    icon: Package,
    description: 'Product performance and analytics',
    count: 6
  }
];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('all');

  const getStatusBadge = (status: Report['status']) => {
    const variants = {
      completed: 'bg-green-50 text-green-700 border-green-200 text-xs font-medium',
      scheduled: 'bg-blue-50 text-blue-700 border-blue-200 text-xs font-medium',
      failed: 'bg-red-50 text-red-700 border-red-200 text-xs font-medium'
    };
    return (
      <Badge variant="outline" className={variants[status]}>
        <div className="flex items-center gap-1">
          {status === 'completed' && <CheckCircle className="w-3 h-3" />}
          {status === 'scheduled' && <Clock className="w-3 h-3" />}
          {status === 'failed' && <XCircle className="w-3 h-3" />}
          {status}
        </div>
      </Badge>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b">
        <div className="flex items-center justify-between px-4 py-4 md:max-w-[1200px] md:mx-auto">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Reports</h2>
            <p className="text-muted-foreground">
              Manage and generate reports
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Report
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-4 p-4 md:p-8 md:max-w-[1200px] md:mx-auto">
        {/* Report Types Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {reportTypes.map((type) => (
            <Card key={type.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-start justify-between">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <type.icon className="w-4 h-4 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-xs">{type.count}</Badge>
                </div>
                <CardTitle className="text-base mt-3">{type.name}</CardTitle>
                <CardDescription className="text-xs mt-1">{type.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Reports List Section */}
        <div className="bg-white rounded-lg border shadow-sm">
          {/* Mobile Search and Filters */}
          <div className="p-4 border-b">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">All Reports</h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Filter className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search reports..."
                  className="pl-9 w-full"
                />
              </div>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left py-3 px-4 text-sm font-medium">Report Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium hidden sm:table-cell">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium hidden md:table-cell">Frequency</th>
                  <th className="text-left py-3 px-4 text-sm font-medium hidden lg:table-cell">Last Run</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Status</th>
                  <th className="text-right py-3 px-4 text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400 shrink-0" />
                        <span className="font-medium">{report.name}</span>
                      </div>
                      <div className="flex flex-col gap-1 sm:hidden mt-1">
                        <Badge variant="secondary" className="w-fit capitalize text-xs">
                          {report.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground capitalize">{report.frequency}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden sm:table-cell">
                      <Badge variant="secondary" className="capitalize">
                        {report.type}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 capitalize hidden md:table-cell">{report.frequency}</td>
                    <td className="py-3 px-4 hidden lg:table-cell">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {new Date(report.lastRun).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(report.status)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 hidden sm:inline-flex">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hidden sm:inline-flex">
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-[200px]">
                            <DropdownMenuItem className="sm:hidden">
                              <Eye className="w-4 h-4 mr-2" />
                              View Report
                            </DropdownMenuItem>
                            <DropdownMenuItem className="sm:hidden">
                              <RefreshCw className="w-4 h-4 mr-2" />
                              Refresh
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="w-4 h-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="sm:hidden divide-y divide-gray-100">
            {reports.map((report) => (
              <div key={report.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-primary/10 rounded">
                        <FileText className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-medium text-sm">{report.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="secondary" 
                        className="capitalize text-xs px-2 py-0.5 bg-secondary/20"
                      >
                        {report.type}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span className="capitalize">{report.frequency}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>Last Run: {new Date(report.lastRun).toLocaleDateString()}</span>
                  </div>
                  {getStatusBadge(report.status)}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 text-xs font-normal"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 text-xs font-normal"
                  >
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Refresh
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 text-xs font-normal"
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 