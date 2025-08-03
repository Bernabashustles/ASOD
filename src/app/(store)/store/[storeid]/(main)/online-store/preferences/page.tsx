'use client';

import React from 'react';
import { 
  Save,
  Globe,
  Mail,
  Share2,
  MessageSquare,
  ShoppingCart,
  CreditCard,
  Truck,
  Settings,
  AlertTriangle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function PreferencesPage() {
  return (
    <div className="p-6 max-w-[800px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Preferences</h1>
          <p className="text-sm text-gray-500 mt-1">
            Customize your online store settings
          </p>
        </div>
        <Button className="gap-2">
          <Save className="w-4 h-4" />
          Save changes
        </Button>
      </div>

      <div className="space-y-6">
        {/* Store Details */}
        <Card>
          <CardHeader className="p-6">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-gray-500" />
              <div>
                <CardTitle>Store details</CardTitle>
                <CardDescription>
                  Basic information about your store
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="store-name">Store name</Label>
                <Input id="store-name" defaultValue="My Store" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-email">Store email</Label>
                <Input id="store-email" type="email" defaultValue="contact@mystore.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sender-name">Sender name</Label>
                <Input id="sender-name" defaultValue="My Store" />
                <p className="text-sm text-gray-500">
                  The name that appears as the sender of emails to customers
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sender-email">Sender email</Label>
                <Input id="sender-email" type="email" defaultValue="noreply@mystore.com" />
                <p className="text-sm text-gray-500">
                  The email address that appears as the sender of emails to customers
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card>
          <CardHeader className="p-6">
            <div className="flex items-center gap-2">
              <Share2 className="w-5 h-5 text-gray-500" />
              <div>
                <CardTitle>Social media</CardTitle>
                <CardDescription>
                  Connect your social media accounts
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input id="facebook" placeholder="Facebook page URL" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input id="instagram" placeholder="Instagram profile URL" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input id="twitter" placeholder="Twitter profile URL" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="youtube">YouTube</Label>
                <Input id="youtube" placeholder="YouTube channel URL" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Communication */}
        <Card>
          <CardHeader className="p-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-gray-500" />
              <div>
                <CardTitle>Customer communication</CardTitle>
                <CardDescription>
                  Manage how you communicate with customers
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Order confirmation emails</Label>
                  <p className="text-sm text-gray-500">
                    Send an email when a customer places an order
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Shipping confirmation emails</Label>
                  <p className="text-sm text-gray-500">
                    Send an email when an order ships
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Marketing emails</Label>
                  <p className="text-sm text-gray-500">
                    Send promotional emails to subscribed customers
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Checkout Settings */}
        <Card>
          <CardHeader className="p-6">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-gray-500" />
              <div>
                <CardTitle>Checkout settings</CardTitle>
                <CardDescription>
                  Customize your checkout experience
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Customer accounts</Label>
                  <p className="text-sm text-gray-500">
                    Allow customers to create accounts during checkout
                  </p>
                </div>
                <Select defaultValue="optional">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="disabled">Disabled</SelectItem>
                    <SelectItem value="optional">Optional</SelectItem>
                    <SelectItem value="required">Required</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Guest checkout</Label>
                  <p className="text-sm text-gray-500">
                    Allow customers to check out without creating an account
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Order notes</Label>
                  <p className="text-sm text-gray-500">
                    Allow customers to add notes to their orders
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legal */}
        <Card>
          <CardHeader className="p-6">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-gray-500" />
              <div>
                <CardTitle>Legal</CardTitle>
                <CardDescription>
                  Manage your store's legal information
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="refund-policy">Refund policy</Label>
                <Textarea 
                  id="refund-policy" 
                  placeholder="Enter your refund policy..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="privacy-policy">Privacy policy</Label>
                <Textarea 
                  id="privacy-policy" 
                  placeholder="Enter your privacy policy..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="terms-of-service">Terms of service</Label>
                <Textarea 
                  id="terms-of-service" 
                  placeholder="Enter your terms of service..."
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}