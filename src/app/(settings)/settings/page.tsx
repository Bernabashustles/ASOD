'use client';

import React, { useState } from 'react';
import { 
  Store, 
  Globe,
  Clock,
  Info,
  ChevronRight,
  MoreHorizontal,
  Users,
  Keyboard,
  Activity,
  Pencil,
  MapPin
} from 'lucide-react';
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function GeneralSettingsPage() {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [storeName, setStoreName] = useState("My Store");
  const [tempStoreName, setTempStoreName] = useState(storeName);

  const handleSaveStoreName = () => {
    setStoreName(tempStoreName);
    setIsEditingName(false);
  };

  return (
    <div className="p-8 max-w-[800px]">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">General</h1>
      </div>

      {/* Store Details */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-base">Store details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between group border-b pb-4">
            <div className="flex items-center gap-3">
              <Store className="w-5 h-5 text-[#5c5f62]" />
              <div>
                <div className="text-[13px] text-[#6d7175]">Store name</div>
                <div className="text-[14px] text-[#202223]">{storeName}</div>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => {
                setTempStoreName(storeName);
                setIsEditingName(true);
              }}
            >
              Edit
            </Button>
          </div>

          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#5c5f62]" />
              <div>
                <div className="text-[13px] text-[#6d7175]">Billing address</div>
                <div className="text-[14px] text-[#202223]">Ethiopia</div>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setIsEditingAddress(true)}
            >
              Edit
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Store Defaults */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-base">Store defaults</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm text-gray-700">Currency display</Label>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  To manage the currencies customers see, go to{' '}
                  <Button variant="link" className="h-auto p-0 text-blue-600">
                    Markets
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Ethiopian Birr (ETB)</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm text-gray-700">Unit system</Label>
                <Select defaultValue="metric">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metric">Metric system</SelectItem>
                    <SelectItem value="imperial">Imperial system</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-gray-700">Default weight unit</Label>
                <Select defaultValue="kg">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kilogram (kg)</SelectItem>
                    <SelectItem value="g">Gram (g)</SelectItem>
                    <SelectItem value="lb">Pound (lb)</SelectItem>
                    <SelectItem value="oz">Ounce (oz)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-gray-700">Time zone</Label>
              <Select defaultValue="nairobi">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nairobi">(GMT+03:00) Nairobi</SelectItem>
                  <SelectItem value="london">(GMT+00:00) London</SelectItem>
                  <SelectItem value="newyork">(GMT-05:00) New York</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                Sets the time for when orders and analytics are recorded
              </p>
            </div>

            <Alert variant="default" className="bg-gray-50 border-gray-200">
              <AlertDescription className="text-sm">
                To change your user level time zone and language visit your{' '}
                <Button variant="link" className="h-auto p-0 text-blue-600">
                  account settings
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      {/* Order ID */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Order ID</CardTitle>
          <CardDescription>
            Shown on the order page, customer pages, and customer order notifications to identify order
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm text-gray-700">Prefix</Label>
                <Input placeholder="#" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-gray-700">Suffix</Label>
                <Input />
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Your order ID will appear as #1001, #1002, #1003 ...
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Order Processing */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-base">Order processing</CardTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-5 h-5 rounded-full"
            >
              <Info className="w-4 h-4" />
            </Button>
          </div>
          <CardDescription>
            Configure how orders are handled after payment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3">
                After an order has been paid
              </h3>
              <RadioGroup defaultValue="none" className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all">
                    Automatically fulfill the order's line items
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gift-cards" id="gift-cards" />
                  <Label htmlFor="gift-cards">
                    Automatically fulfill only the gift cards of the order
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="none" />
                  <Label htmlFor="none">
                    Don't fulfill any of the order's line items automatically
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="pt-6 border-t">
              <h3 className="text-sm font-medium mb-3">
                After an order has been fulfilled and paid, or when all items have been refunded
              </h3>
              <div className="flex items-start space-x-2">
                <Checkbox id="archive" defaultChecked />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="archive">
                    Automatically archive the order
                  </Label>
                  <p className="text-sm text-gray-500">
                    The order will be removed from your list of open orders.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Brand Assets Section */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Brand assets</CardTitle>
              <CardDescription>
                Integrate brand assets across sales channels, themes, and apps
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">Manage</Button>
          </div>
        </CardHeader>
      </Card>

      {/* Resources Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Resources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Change log</span>
            </div>
            <span className="text-sm text-gray-500">View change log</span>
          </Button>
          <Button variant="outline" className="w-full justify-between">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4" />
              <span>Axova Help Center</span>
            </div>
            <span className="text-sm text-gray-500">Get help</span>
          </Button>
          <Button variant="outline" className="w-full justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Hire a Axova Partner</span>
            </div>
            <span className="text-sm text-gray-500">Hire a Partner</span>
          </Button>
          <Button variant="outline" className="w-full justify-between">
            <div className="flex items-center gap-2">
              <Keyboard className="w-4 h-4" />
              <span>Keyboard shortcuts</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="w-full justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              <span>Store activity log</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Edit Store Name Dialog */}
      <Dialog open={isEditingName} onOpenChange={setIsEditingName}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Edit store name</DialogTitle>
            <DialogDescription>
              Your store name appears in your admin and your online store.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="storeName" className="text-[13px] text-[#6d7175]">Store name</Label>
            <Input
              id="storeName"
              value={tempStoreName}
              onChange={(e) => setTempStoreName(e.target.value)}
              className="mt-1.5"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setIsEditingName(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveStoreName}
              disabled={!tempStoreName.trim()}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Billing Address Dialog */}
      <Dialog open={isEditingAddress} onOpenChange={setIsEditingAddress}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit billing address</DialogTitle>
            <DialogDescription>
              This address will be used for your Axova subscription and bills.
            </DialogDescription>
          </DialogHeader>
          {/* Add billing address form fields here */}
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setIsEditingAddress(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setIsEditingAddress(false)}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}