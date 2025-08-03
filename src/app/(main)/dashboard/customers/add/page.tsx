'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Globe,
  Tag,
  Save,
  Plus,
  AlertTriangle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";

export default function AddCustomerPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    country: '',
    state: '',
    zipCode: '',
    tags: '',
    notes: '',
    acceptsMarketing: true,
    taxExempt: false
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-40">
        <div className="max-w-[1000px] mx-auto">
          <div className="flex h-14 items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <Link href="/customers">
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg font-medium truncate">
                  Add customer
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Discard</Button>
              <Button size="sm" className="bg-black hover:bg-black/90">
                <Save className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Save</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto p-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="space-y-4 sm:space-y-6">
            {/* Customer Overview */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base">Customer overview</CardTitle>
                <CardDescription>
                  Basic information about the customer
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          firstName: e.target.value
                        }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          lastName: e.target.value
                        }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        className="pl-10"
                        placeholder="customer@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          email: e.target.value
                        }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        className="pl-10"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          phone: e.target.value
                        }))}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Address */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <CardTitle className="text-base">Address</CardTitle>
                    <CardDescription>
                      Customer's shipping and billing address
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    <Plus className="w-4 h-4 mr-2" />
                    Add another address
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company (optional)</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="company"
                        className="pl-10"
                        placeholder="Company name"
                        value={formData.company}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          company: e.target.value
                        }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address1">Address line 1</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="address1"
                        className="pl-10"
                        placeholder="Street address, P.O. box, company name"
                        value={formData.address1}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          address1: e.target.value
                        }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address2">Address line 2 (optional)</Label>
                    <Input
                      id="address2"
                      placeholder="Apartment, suite, unit, building, floor, etc."
                      value={formData.address2}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        address2: e.target.value
                      }))}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          city: e.target.value
                        }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) => setFormData(prev => ({
                          ...prev,
                          country: value
                        }))}
                      >
                        <SelectTrigger id="country" className="w-full">
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province</Label>
                      <Input
                        id="state"
                        placeholder="State/Province"
                        value={formData.state}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          state: e.target.value
                        }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP/Postal code</Label>
                      <Input
                        id="zipCode"
                        placeholder="ZIP or postal code"
                        value={formData.zipCode}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          zipCode: e.target.value
                        }))}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base">Notes</CardTitle>
                <CardDescription>
                  Add notes about your customer
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <Textarea
                  placeholder="Add notes about your customer (only visible to staff)"
                  className="min-h-[100px]"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    notes: e.target.value
                  }))}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Tags */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base">Tags</CardTitle>
                <CardDescription>
                  Used to organize and filter customers
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="VIP, wholesale, retail, etc."
                    className="pl-10"
                    value={formData.tags}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      tags: e.target.value
                    }))}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Separate tags with commas
                </p>
              </CardContent>
            </Card>

            {/* Marketing */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base">Marketing</CardTitle>
                <CardDescription>
                  Customer communication preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email marketing</Label>
                    <p className="text-sm text-gray-500">
                      Accept marketing emails
                    </p>
                  </div>
                  <Switch
                    checked={formData.acceptsMarketing}
                    onCheckedChange={(checked) => setFormData(prev => ({
                      ...prev,
                      acceptsMarketing: checked
                    }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tax Settings */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base">Tax settings</CardTitle>
                <CardDescription>
                  Manage customer's tax collection settings
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Tax exempt</Label>
                    <p className="text-sm text-gray-500">
                      Exclude customer from tax charges
                    </p>
                  </div>
                  <Switch
                    checked={formData.taxExempt}
                    onCheckedChange={(checked) => setFormData(prev => ({
                      ...prev,
                      taxExempt: checked
                    }))}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}