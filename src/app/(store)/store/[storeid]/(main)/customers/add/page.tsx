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
  AlertTriangle,
  User,
  Building,
  CreditCard,
  Bell,
  Receipt,
  Shield,
  CheckCircle2,
  XCircle
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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

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

  const [formProgress, setFormProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const calculateProgress = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address1', 'city', 'country'];
    const filledFields = requiredFields.filter(field => formData[field as keyof typeof formData] !== '');
    return Math.round((filledFields.length / requiredFields.length) * 100);
  };

  React.useEffect(() => {
    setFormProgress(calculateProgress());
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setShowSuccess(true);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b">
        <div className="max-w-[900px] mx-auto">
          <div className="flex h-14 items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <Link href="/customers">
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div className="min-w-0">
                <h1 className="text-base font-semibold truncate">
                  Add customer
                </h1>
                <p className="text-xs text-gray-500">Create a new customer profile</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button variant="outline" size="sm" className="h-8 hidden sm:inline-flex">Discard</Button>
              <Button 
                size="sm" 
                className="h-8 bg-black hover:bg-black/90"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                <Save className="w-3 h-3 sm:mr-2" />
                <span className="hidden sm:inline">{isSubmitting ? 'Saving...' : 'Save'}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto p-4">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium">Profile completion</span>
            <span className="text-xs text-gray-500">{formProgress}%</span>
          </div>
          <Progress value={formProgress} className="h-1" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-4">
          {/* Main Content */}
          <div className="space-y-4">
            {/* Customer Overview */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-50 rounded-lg">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Customer overview</CardTitle>
                    <CardDescription className="text-xs">
                      Basic information about the customer
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="firstName" className="text-xs font-medium">First name</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          firstName: e.target.value
                        }))}
                        className="h-8 text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="lastName" className="text-xs font-medium">Last name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          lastName: e.target.value
                        }))}
                        className="h-8 text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs font-medium">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        className="pl-8 h-8 text-sm"
                        placeholder="customer@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          email: e.target.value
                        }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-xs font-medium">Phone number</Label>
                    <div className="relative">
                      <Phone className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        className="pl-8 h-8 text-sm"
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
            <Card className="border-0 shadow-sm">
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-green-50 rounded-lg">
                      <MapPin className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Address</CardTitle>
                      <CardDescription className="text-xs">
                        Customer's shipping and billing address
                      </CardDescription>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="h-8">
                    <Plus className="w-3 h-3 mr-1.5" />
                    Add another address
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="company" className="text-xs font-medium">Company (optional)</Label>
                    <div className="relative">
                      <Building className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                      <Input
                        id="company"
                        className="pl-8 h-8 text-sm"
                        placeholder="Company name"
                        value={formData.company}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          company: e.target.value
                        }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="address1" className="text-xs font-medium">Address line 1</Label>
                    <div className="relative">
                      <MapPin className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                      <Input
                        id="address1"
                        className="pl-8 h-8 text-sm"
                        placeholder="Street address, P.O. box, company name"
                        value={formData.address1}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          address1: e.target.value
                        }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="address2" className="text-xs font-medium">Address line 2 (optional)</Label>
                    <Input
                      id="address2"
                      className="h-8 text-sm"
                      placeholder="Apartment, suite, unit, building, floor, etc."
                      value={formData.address2}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        address2: e.target.value
                      }))}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="city" className="text-xs font-medium">City</Label>
                      <Input
                        id="city"
                        className="h-8 text-sm"
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          city: e.target.value
                        }))}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="country" className="text-xs font-medium">Country</Label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) => setFormData(prev => ({
                          ...prev,
                          country: value
                        }))}
                      >
                        <SelectTrigger className="h-8 text-sm">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="state" className="text-xs font-medium">State/Province</Label>
                      <Input
                        id="state"
                        className="h-8 text-sm"
                        placeholder="State or province"
                        value={formData.state}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          state: e.target.value
                        }))}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="zipCode" className="text-xs font-medium">ZIP/Postal code</Label>
                      <Input
                        id="zipCode"
                        className="h-8 text-sm"
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

            {/* Additional Information */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-purple-50 rounded-lg">
                    <Tag className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Additional Information</CardTitle>
                    <CardDescription className="text-xs">
                      Tags, notes, and preferences
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="tags" className="text-xs font-medium">Tags</Label>
                    <Input
                      id="tags"
                      className="h-8 text-sm"
                      placeholder="Add tags separated by commas"
                      value={formData.tags}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        tags: e.target.value
                      }))}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="notes" className="text-xs font-medium">Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Add any additional notes about this customer"
                      value={formData.notes}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        notes: e.target.value
                      }))}
                      className="min-h-[80px] text-sm"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-3.5 w-3.5 text-gray-500" />
                        <div>
                          <Label htmlFor="acceptsMarketing" className="text-xs font-medium">Marketing emails</Label>
                          <p className="text-xs text-gray-500">Receive marketing communications</p>
                        </div>
                      </div>
                      <Switch
                        id="acceptsMarketing"
                        checked={formData.acceptsMarketing}
                        onCheckedChange={(checked) => setFormData(prev => ({
                          ...prev,
                          acceptsMarketing: checked
                        }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="h-3.5 w-3.5 text-gray-500" />
                        <div>
                          <Label htmlFor="taxExempt" className="text-xs font-medium">Tax exempt</Label>
                          <p className="text-xs text-gray-500">Customer is tax exempt</p>
                        </div>
                      </div>
                      <Switch
                        id="taxExempt"
                        checked={formData.taxExempt}
                        onCheckedChange={(checked) => setFormData(prev => ({
                          ...prev,
                          taxExempt: checked
                        }))}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Quick Actions */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="p-4">
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-2">
                  <Button variant="outline" className="w-full h-8 justify-start gap-2 text-sm">
                    <CreditCard className="h-3.5 w-3.5" />
                    Add payment method
                  </Button>
                  <Button variant="outline" className="w-full h-8 justify-start gap-2 text-sm">
                    <Receipt className="h-3.5 w-3.5" />
                    View order history
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Form Status */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="p-4">
                <CardTitle className="text-base">Form Status</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      formData.firstName && formData.lastName ? "bg-green-500" : "bg-gray-200"
                    )} />
                    <span className="text-xs">Basic Information</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      formData.email ? "bg-green-500" : "bg-gray-200"
                    )} />
                    <span className="text-xs">Contact Details</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      formData.address1 && formData.city && formData.country ? "bg-green-500" : "bg-gray-200"
                    )} />
                    <span className="text-xs">Address Information</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Success Message */}
            {showSuccess && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                <AlertTitle className="text-sm text-green-800">Success!</AlertTitle>
                <AlertDescription className="text-xs text-green-700">
                  Customer profile has been created successfully.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}