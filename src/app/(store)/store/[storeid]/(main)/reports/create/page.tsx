'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft,
  FileText,
  Calendar,
  Clock,
  Mail,
  Save,
  ChevronRight,
  Settings,
  AlertCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import Link from 'next/link';

export default function CreateReportPage() {
  const [reportType, setReportType] = useState('');
  const [schedule, setSchedule] = useState('one-time');

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-[1000px] mx-auto px-4">
          <div className="flex h-16 items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Link href="/reports" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Reports</span>
              </Link>
              <h1 className="text-lg sm:text-xl font-semibold">Create New Report</h1>
            </div>
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Save Report
            </Button>
          </div>
        </div>
      </div>

      <div className="container max-w-[1000px] mx-auto py-6 px-4">
        <div className="grid gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Configure your report details</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Report Name</Label>
                <Input id="name" placeholder="Enter report name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe the purpose of this report" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Report Type</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales">Sales Report</SelectItem>
                    <SelectItem value="orders">Order Report</SelectItem>
                    <SelectItem value="customers">Customer Report</SelectItem>
                    <SelectItem value="products">Product Report</SelectItem>
                    <SelectItem value="inventory">Inventory Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Data Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Data Configuration</CardTitle>
              <CardDescription>Select data points to include in your report</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label>Date Range</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last7days">Last 7 days</SelectItem>
                    <SelectItem value="last30days">Last 30 days</SelectItem>
                    <SelectItem value="lastMonth">Last month</SelectItem>
                    <SelectItem value="custom">Custom range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Metrics</Label>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <Switch id="revenue" />
                    <Label htmlFor="revenue">Revenue</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="orders" />
                    <Label htmlFor="orders">Order Count</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="customers" />
                    <Label htmlFor="customers">Customer Count</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="avgOrderValue" />
                    <Label htmlFor="avgOrderValue">Average Order Value</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Schedule Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Schedule Settings</CardTitle>
              <CardDescription>Configure when this report should run</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label>Frequency</Label>
                <Select value={schedule} onValueChange={setSchedule}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="one-time">One-time</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {schedule !== 'one-time' && (
                <div className="grid gap-2">
                  <Label>Delivery Settings</Label>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <Switch id="email" />
                      <Label htmlFor="email">Email Report</Label>
                    </div>
                    <Input 
                      placeholder="Enter email addresses (comma-separated)"
                      className="mt-2"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Advanced Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Additional configuration options</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Switch id="charts" />
                  <Label htmlFor="charts">Include Charts</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="comparisons" />
                  <Label htmlFor="comparisons">Include Period Comparisons</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="export" />
                  <Label htmlFor="export">Auto-export to CSV</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 