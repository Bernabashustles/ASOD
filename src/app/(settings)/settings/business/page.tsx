'use client';

import { useState } from 'react';
import { SettingsPage } from '../components/settings-page';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, MapPin, FileText, Calendar, Edit2, Save, X, AlertCircle, ChevronDown } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

// Mock data - replace with actual API call
const mockBusinessData = {
  businessType: "INDIVIDUAL",
  businessName: "Acme Corporation",
  businessRegistrationNumber: "",
  taxIdentificationNumber: "TAX123456789",
  businessAddress: {
    city: "San Francisco",
    state: "CA",
    street: "456 Market St"
  },
  createdAt: "2025-03-30T15:35:09.414Z",
  updatedAt: "2025-04-09T08:51:11.157Z"
};

export default function BusinessPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(mockBusinessData);
  const [isSaving, setIsSaving] = useState(false);
  const [saveProgress, setSaveProgress] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call with progress
    for (let i = 0; i <= 100; i += 10) {
      setSaveProgress(i);
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    // TODO: Add actual API call to update business details
    setIsEditing(false);
    setIsSaving(false);
    setSaveProgress(0);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <SettingsPage title="Business Details">
      <div className="space-y-4 sm:space-y-6">
        {/* Status Card */}
        <Card className="bg-gradient-to-br from-gray-900 to-black text-white border-gray-800">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-semibold">Business Profile</h3>
                <p className="text-xs sm:text-sm text-gray-400">Complete your business profile to unlock all features</p>
              </div>
              <Badge variant="outline" className="bg-white/10 text-white border-white/20 w-fit">
                {formData.businessType === 'INDIVIDUAL' ? 'Individual' : 'Company'}
              </Badge>
            </div>
            <Progress value={75} className="mt-4 h-1.5 bg-white/10" />
            <p className="text-xs text-gray-400 mt-2">Profile completion: 75%</p>
          </CardContent>
        </Card>

        {/* Main Form Card */}
        <Card className="border-gray-200">
          <CardHeader className="border-b border-gray-200 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <CardTitle className="text-base sm:text-lg">Business Information</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Manage your business details and legal information
                </CardDescription>
              </div>
              <Button
                variant={isEditing ? "outline" : "default"}
                onClick={() => setIsEditing(!isEditing)}
                className="gap-2 w-full sm:w-auto"
              >
                {isEditing ? (
                  <>
                    <X className="h-4 w-4" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit2 className="h-4 w-4" />
                    Edit Details
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Business Type */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Business Type</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <AlertCircle className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Select your business type to ensure proper tax handling</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                {isEditing ? (
                  <Select
                    value={formData.businessType}
                    onValueChange={(value) => setFormData({ ...formData, businessType: value })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INDIVIDUAL">Individual</SelectItem>
                      <SelectItem value="COMPANY">Company</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                    <Building2 className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      {formData.businessType === 'INDIVIDUAL' ? 'Individual' : 'Company'}
                    </span>
                  </div>
                )}
              </div>

              {/* Business Name */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Business Name</Label>
                {isEditing ? (
                  <Input
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full"
                  />
                ) : (
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                    <Building2 className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{formData.businessName}</span>
                  </div>
                )}
              </div>

              {/* Company-specific fields */}
              {formData.businessType === 'COMPANY' && (
                <>
                  {/* Business Registration Number */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Business Registration Number</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <AlertCircle className="h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Your official business registration number</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    {isEditing ? (
                      <Input
                        value={formData.businessRegistrationNumber}
                        onChange={(e) => setFormData({ ...formData, businessRegistrationNumber: e.target.value })}
                        className="w-full"
                        placeholder="Enter business registration number"
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">
                          {formData.businessRegistrationNumber || 'Not provided'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Tax ID */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Tax Identification Number</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <AlertCircle className="h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Required for tax reporting and compliance</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    {isEditing ? (
                      <Input
                        value={formData.taxIdentificationNumber}
                        onChange={(e) => setFormData({ ...formData, taxIdentificationNumber: e.target.value })}
                        className="w-full"
                        placeholder="Enter tax identification number"
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">
                          {formData.taxIdentificationNumber || 'Not provided'}
                        </span>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Business Address */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Business Address</Label>
                {isEditing ? (
                  <div className="space-y-3">
                    <Input
                      placeholder="Street"
                      value={formData.businessAddress.street}
                      onChange={(e) => setFormData({
                        ...formData,
                        businessAddress: { ...formData.businessAddress, street: e.target.value }
                      })}
                      className="w-full"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Input
                        placeholder="City"
                        value={formData.businessAddress.city}
                        onChange={(e) => setFormData({
                          ...formData,
                          businessAddress: { ...formData.businessAddress, city: e.target.value }
                        })}
                      />
                      <Input
                        placeholder="State"
                        value={formData.businessAddress.state}
                        onChange={(e) => setFormData({
                          ...formData,
                          businessAddress: { ...formData.businessAddress, state: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                    <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0" />
                    <span className="text-sm break-words">
                      {formData.businessAddress.street}, {formData.businessAddress.city}, {formData.businessAddress.state}
                    </span>
                  </div>
                )}
              </div>

              {/* Timestamps */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Account Information</Label>
                <div className="space-y-2 p-2 bg-gray-50 rounded-md">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 flex-shrink-0" />
                    <span>Created: {formatDate(formData.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 flex-shrink-0" />
                    <span>Last Updated: {formatDate(formData.updatedAt)}</span>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="gap-2 w-full sm:w-auto"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <Progress value={saveProgress} className="w-20 h-1.5" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </SettingsPage>
  );
} 