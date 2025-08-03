'use client';

import React, { useState } from 'react';
import { 
  Store, 
  Upload,
  Image as ImageIcon,
  Edit,
  Globe,
  MessageSquare,
  Share2,
  AlertCircle,
  Percent,
  Users,
  Shield,
  DollarSign,
  Clock,
  CheckCircle2,
  BadgeCheck,
  Settings,
  Building2,
  Wallet,
  Bell,
  X,
  Plus,
  Package,
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface StoreConfig {
  logoUrl: string;
  thumbnailUrl: string;
  bannerUrl: string;
  brandTagline: string;
  bio: string;
  commissionRate: number;
  minWithdrawalAmount: number;
  autoApproveProducts: boolean;
  verificationRequired: boolean;
  allowMultipleShops: boolean;
  maxProductsPerSeller: number;
  categories: string[];
  paymentMethods: string[];
  sellerVerificationCriteria: {
    idRequired: boolean;
    addressProofRequired: boolean;
    businessLicenseRequired: boolean;
    minimumBalance: number;
  };
}

const defaultConfig: StoreConfig = {
  logoUrl: "https://example.com/logo.png",
  thumbnailUrl: "https://example.com/thumbnail.png",
  bannerUrl: "https://example.com/banner.jpg",
  brandTagline: "Quality products for everyday life",
  bio: "Our marketplace was founded in 2020 with a focus on connecting local artisans with global customers. We believe in sustainable business practices and fair trade. Each seller on our platform is carefully vetted to ensure they meet our quality and ethical standards.",
  commissionRate: 5,
  minWithdrawalAmount: 100,
  autoApproveProducts: false,
  verificationRequired: true,
  allowMultipleShops: true,
  maxProductsPerSeller: 1000,
  categories: ['Electronics', 'Fashion', 'Home & Garden', 'Beauty', 'Sports'],
  paymentMethods: ['stripe', 'paypal', 'bank_transfer'],
  sellerVerificationCriteria: {
    idRequired: true,
    addressProofRequired: true,
    businessLicenseRequired: false,
    minimumBalance: 50,
  },
};

export default function MarketplacePage() {
  const [config, setConfig] = useState<StoreConfig>(defaultConfig);
  const [previewBanner, setPreviewBanner] = useState<string | null>(null);
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);
  const [previewThumbnail, setPreviewThumbnail] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('branding');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'thumbnail' | 'banner') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        switch (type) {
          case 'logo':
            setPreviewLogo(result);
            setConfig(prev => ({ ...prev, logoUrl: result }));
            break;
          case 'thumbnail':
            setPreviewThumbnail(result);
            setConfig(prev => ({ ...prev, thumbnailUrl: result }));
            break;
          case 'banner':
            setPreviewBanner(result);
            setConfig(prev => ({ ...prev, bannerUrl: result }));
            break;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Marketplace Configuration</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your marketplace appearance and settings
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Share2 className="w-4 h-4" />
            Preview
          </Button>
          <Button className="gap-2">
            <Globe className="w-4 h-4" />
            Publish Changes
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Users className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Sellers</p>
                <p className="text-xl font-semibold">1,234</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-xl font-semibold">$52,389</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Package className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Products</p>
                <p className="text-xl font-semibold">8,567</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-50 rounded-lg">
                <Clock className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending Approvals</p>
                <p className="text-xl font-semibold">23</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Marketplace Settings</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full justify-start gap-6 h-12 px-6 border-b rounded-none">
                  <TabsTrigger value="branding">Branding</TabsTrigger>
                  <TabsTrigger value="rules">Rules & Policies</TabsTrigger>
                  <TabsTrigger value="commission">Commission</TabsTrigger>
                  <TabsTrigger value="verification">Verification</TabsTrigger>
                </TabsList>

                <div className="p-6">
                  <TabsContent value="branding" className="m-0">
                    <div className="space-y-6">
                      {/* Banner Upload */}
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium mb-1.5">Store Banner</h3>
                          <p className="text-sm text-gray-500 mb-3">
                            This banner will be displayed at the top of your marketplace
                          </p>
                        </div>
                        <div className="aspect-[21/9] relative overflow-hidden rounded-lg border-2 border-dashed border-gray-200 bg-gray-50">
                          {(previewBanner || config.bannerUrl) ? (
                            <img 
                              src={previewBanner || config.bannerUrl} 
                              alt="Store Banner"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <ImageIcon className="mx-auto h-12 w-12 text-gray-300" />
                                <p className="mt-2 text-sm text-gray-500">No banner uploaded</p>
                              </div>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                            <label className="relative cursor-pointer">
                              <Button variant="secondary" className="pointer-events-none">
                                <Upload className="w-4 h-4 mr-2" />
                                Upload Banner
                              </Button>
                              <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, 'banner')}
                              />
                            </label>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          Recommended size: 1920x820px. Maximum file size: 5MB
                        </p>
                      </div>

                      {/* Brand Information */}
                      <div className="space-y-4">
                        <div>
                          <Label>Brand Tagline</Label>
                          <Input
                            placeholder="Enter your brand tagline"
                            value={config.brandTagline}
                            onChange={(e) => setConfig(prev => ({ ...prev, brandTagline: e.target.value }))}
                          />
                          <p className="text-sm text-gray-500 mt-1.5">
                            A short, catchy phrase that describes your marketplace
                          </p>
                        </div>
                        <div>
                          <Label>Bio</Label>
                          <Textarea
                            placeholder="Tell your story..."
                            className="min-h-[150px]"
                            value={config.bio}
                            onChange={(e) => setConfig(prev => ({ ...prev, bio: e.target.value }))}
                          />
                          <p className="text-sm text-gray-500 mt-1.5">
                            Share your marketplace's story, mission, and values
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="rules" className="m-0">
                    <div className="space-y-6">
                      <div className="grid gap-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Auto-approve Products</Label>
                            <p className="text-sm text-gray-500">
                              Automatically approve new products from verified sellers
                            </p>
                          </div>
                          <Switch
                            checked={config.autoApproveProducts}
                            onCheckedChange={(checked) => 
                              setConfig(prev => ({ ...prev, autoApproveProducts: checked }))
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Allow Multiple Shops</Label>
                            <p className="text-sm text-gray-500">
                              Let sellers create multiple shops under one account
                            </p>
                          </div>
                          <Switch
                            checked={config.allowMultipleShops}
                            onCheckedChange={(checked) => 
                              setConfig(prev => ({ ...prev, allowMultipleShops: checked }))
                            }
                          />
                        </div>
                        <div>
                          <Label>Maximum Products per Seller</Label>
                          <Input
                            type="number"
                            value={config.maxProductsPerSeller}
                            onChange={(e) => setConfig(prev => ({ 
                              ...prev, 
                              maxProductsPerSeller: parseInt(e.target.value) 
                            }))}
                            className="mt-1.5"
                          />
                          <p className="text-sm text-gray-500 mt-1.5">
                            Set a limit for the number of products each seller can list
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label>Marketplace Categories</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {config.categories.map((category, index) => (
                            <div 
                              key={index}
                              className="flex items-center gap-2 p-2 border rounded-lg"
                            >
                              <span className="text-sm">{category}</span>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="h-6 w-6 ml-auto"
                                onClick={() => {
                                  setConfig(prev => ({
                                    ...prev,
                                    categories: prev.categories.filter((_, i) => i !== index)
                                  }));
                                }}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button 
                            variant="outline" 
                            className="h-[40px]"
                            onClick={() => {
                              const category = prompt('Enter category name');
                              if (category) {
                                setConfig(prev => ({
                                  ...prev,
                                  categories: [...prev.categories, category]
                                }));
                              }
                            }}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Category
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="commission" className="m-0">
                    <div className="space-y-6">
                      <div>
                        <Label>Commission Rate (%)</Label>
                        <Input
                          type="number"
                          value={config.commissionRate}
                          onChange={(e) => setConfig(prev => ({ 
                            ...prev, 
                            commissionRate: parseFloat(e.target.value) 
                          }))}
                          className="mt-1.5"
                        />
                        <p className="text-sm text-gray-500 mt-1.5">
                          Percentage fee charged on each sale
                        </p>
                      </div>

                      <div>
                        <Label>Minimum Withdrawal Amount</Label>
                        <Input
                          type="number"
                          value={config.minWithdrawalAmount}
                          onChange={(e) => setConfig(prev => ({ 
                            ...prev, 
                            minWithdrawalAmount: parseFloat(e.target.value) 
                          }))}
                          className="mt-1.5"
                        />
                        <p className="text-sm text-gray-500 mt-1.5">
                          Minimum balance required for sellers to withdraw earnings
                        </p>
                      </div>

                      <div className="space-y-4">
                        <Label>Payment Methods</Label>
                        <div className="grid gap-3">
                          {config.paymentMethods.map((method, index) => (
                            <div 
                              key={index}
                              className="flex items-center justify-between p-3 border rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <Wallet className="h-5 w-5 text-gray-500" />
                                <span className="capitalize">{method.replace('_', ' ')}</span>
                              </div>
                              <Switch
                                checked={true}
                                onCheckedChange={(checked) => {
                                  if (!checked) {
                                    setConfig(prev => ({
                                      ...prev,
                                      paymentMethods: prev.paymentMethods.filter((_, i) => i !== index)
                                    }));
                                  }
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="verification" className="m-0">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Require Seller Verification</Label>
                          <p className="text-sm text-gray-500">
                            Verify seller identity before allowing them to list products
                          </p>
                        </div>
                        <Switch
                          checked={config.verificationRequired}
                          onCheckedChange={(checked) => 
                            setConfig(prev => ({ ...prev, verificationRequired: checked }))
                          }
                        />
                      </div>

                      <div className="space-y-4">
                        <Label>Verification Requirements</Label>
                        <div className="grid gap-3">
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <BadgeCheck className="h-5 w-5 text-gray-500" />
                              <div>
                                <p className="font-medium">ID Verification</p>
                                <p className="text-sm text-gray-500">Government-issued ID required</p>
                              </div>
                            </div>
                            <Switch
                              checked={config.sellerVerificationCriteria.idRequired}
                              onCheckedChange={(checked) => 
                                setConfig(prev => ({
                                  ...prev,
                                  sellerVerificationCriteria: {
                                    ...prev.sellerVerificationCriteria,
                                    idRequired: checked
                                  }
                                }))
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <Building2 className="h-5 w-5 text-gray-500" />
                              <div>
                                <p className="font-medium">Address Proof</p>
                                <p className="text-sm text-gray-500">Proof of business address</p>
                              </div>
                            </div>
                            <Switch
                              checked={config.sellerVerificationCriteria.addressProofRequired}
                              onCheckedChange={(checked) => 
                                setConfig(prev => ({
                                  ...prev,
                                  sellerVerificationCriteria: {
                                    ...prev.sellerVerificationCriteria,
                                    addressProofRequired: checked
                                  }
                                }))
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <Shield className="h-5 w-5 text-gray-500" />
                              <div>
                                <p className="font-medium">Business License</p>
                                <p className="text-sm text-gray-500">Valid business license</p>
                              </div>
                            </div>
                            <Switch
                              checked={config.sellerVerificationCriteria.businessLicenseRequired}
                              onCheckedChange={(checked) => 
                                setConfig(prev => ({
                                  ...prev,
                                  sellerVerificationCriteria: {
                                    ...prev.sellerVerificationCriteria,
                                    businessLicenseRequired: checked
                                  }
                                }))
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label>Minimum Balance Requirement</Label>
                        <Input
                          type="number"
                          value={config.sellerVerificationCriteria.minimumBalance}
                          onChange={(e) => setConfig(prev => ({ 
                            ...prev, 
                            sellerVerificationCriteria: {
                              ...prev.sellerVerificationCriteria,
                              minimumBalance: parseFloat(e.target.value)
                            }
                          }))}
                          className="mt-1.5"
                        />
                        <p className="text-sm text-gray-500 mt-1.5">
                          Minimum balance required to maintain verified status
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Logo Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Store Logo</CardTitle>
              <CardDescription>
                Your marketplace's primary identifier
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="w-32 h-32 mx-auto relative overflow-hidden rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50">
                  {(previewLogo || config.logoUrl) ? (
                    <img 
                      src={previewLogo || config.logoUrl} 
                      alt="Store Logo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Store className="h-12 w-12 text-gray-300" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="relative cursor-pointer">
                      <Button variant="secondary" size="sm" className="pointer-events-none">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload
                      </Button>
                      <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'logo')}
                      />
                    </label>
                  </div>
                </div>
                <p className="text-sm text-gray-500 text-center">
                  Square format, at least 512x512px
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full gap-2">
                <Users className="w-4 h-4" />
                View Seller Applications
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <Bell className="w-4 h-4" />
                Notification Settings
              </Button>
            </CardContent>
          </Card>

          {/* Help Card */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Need help?</AlertTitle>
            <AlertDescription>
              Check our guide on optimizing your marketplace presence or contact support.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
} 