'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertCircle, Image as ImageIcon, Upload } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface StoreConfig {
  logoUrl: string;
  thumbnailUrl: string;
  bannerUrl: string;
  brandTagline: string;
  bio: string;
}

const defaultConfig: StoreConfig = {
  logoUrl: "https://example.com/logo.png",
  thumbnailUrl: "https://example.com/thumbnail.png",
  bannerUrl: "https://example.com/banner.jpg",
  brandTagline: "Quality products for everyday life",
  bio: "Our marketplace was founded in 2020 with a focus on connecting local artisans with global customers. We believe in sustainable business practices and fair trade. Each seller on our platform is carefully vetted to ensure they meet our quality and ethical standards."
};

export default function MarketplaceConfigurationPage() {
  const [config, setConfig] = useState<StoreConfig>(defaultConfig);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'thumbnail' | 'banner') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        switch (type) {
          case 'logo':
            setLogoPreview(result);
            setConfig(prev => ({ ...prev, logoUrl: result }));
            break;
          case 'thumbnail':
            setThumbnailPreview(result);
            setConfig(prev => ({ ...prev, thumbnailUrl: result }));
            break;
          case 'banner':
            setBannerPreview(result);
            setConfig(prev => ({ ...prev, bannerUrl: result }));
            break;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving configuration:', config);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto p-2 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">Marketplace Configuration</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Configure your marketplace appearance and settings
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline">Preview</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Store Banner */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Store Banner</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                This image will be displayed at the top of your marketplace
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 sm:p-4 md:p-6">
              <div className="space-y-4">
                <div className="aspect-[21/9] relative rounded-lg border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors">
                  {bannerPreview ? (
                    <img
                      src={bannerPreview}
                      alt="Banner preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">Upload banner image</p>
                      </div>
                    </div>
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => handleImageUpload(e, 'banner')}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Recommended size: 1920x820px. Max file size: 5MB.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Store Info */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Brand Information</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Define your brand identity and message
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 sm:p-4 md:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tagline">Brand Tagline</Label>
                <Input
                  id="tagline"
                  value={config.brandTagline}
                  onChange={(e) => setConfig(prev => ({ ...prev, brandTagline: e.target.value }))}
                  placeholder="Enter your brand tagline"
                />
                <p className="text-xs text-gray-500">
                  A short, catchy phrase that represents your brand
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Brand Bio</Label>
                <Textarea
                  id="bio"
                  value={config.bio}
                  onChange={(e) => setConfig(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell your brand's story"
                  className="min-h-[150px]"
                />
                <p className="text-xs text-gray-500">
                  Describe your marketplace's mission and values
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Store Logo & Thumbnail */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Store Logo & Icon</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Upload your brand logo and favicon
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 sm:p-4 md:p-6 space-y-4">
              {/* Logo Upload */}
              <div className="space-y-2">
                <Label>Store Logo</Label>
                <div className="aspect-square w-32 mx-auto relative rounded-lg border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="w-full h-full object-contain rounded-lg"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Upload className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => handleImageUpload(e, 'logo')}
                  />
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Recommended size: 400x400px
                </p>
              </div>

              {/* Thumbnail Upload */}
              <div className="space-y-2">
                <Label>Store Icon</Label>
                <div className="aspect-square w-20 mx-auto relative rounded-lg border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors">
                  {thumbnailPreview ? (
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="w-full h-full object-contain rounded-lg"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Upload className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => handleImageUpload(e, 'thumbnail')}
                  />
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Recommended size: 96x96px
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Help Card */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Optimize Your Store</AlertTitle>
            <AlertDescription className="text-xs mt-2">
              <ul className="list-disc list-inside space-y-1">
                <li>Use high-quality images for your banner and logo</li>
                <li>Keep your brand tagline clear and memorable</li>
                <li>Write a compelling brand story in your bio</li>
                <li>Maintain consistent branding across all assets</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
} 