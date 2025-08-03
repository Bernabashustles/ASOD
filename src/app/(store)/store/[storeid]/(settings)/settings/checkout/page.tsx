'use client';

import { useState } from 'react';
import { Info, ExternalLink, Phone, Mail, Store } from 'lucide-react';
import { SettingsPage } from '../components/settings-page';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

export default function CheckoutPage() {
  // Customer Contact Method
  const [contactMethod, setContactMethod] = useState('phone_or_email');
  const [showOrderTracking, setShowOrderTracking] = useState(true);
  const [requireLogin, setRequireLogin] = useState(false);

  // Customer Information
  const [fullNameOption, setFullNameOption] = useState('last_name');
  const [companyNameOption, setCompanyNameOption] = useState('dont_include');
  const [addressLine2Option, setAddressLine2Option] = useState('optional');
  const [phoneNumberOption, setPhoneNumberOption] = useState('dont_include');

  // Marketing Options
  const [emailMarketing, setEmailMarketing] = useState(true);
  const [emailMarketingPreselected, setEmailMarketingPreselected] = useState(false);
  const [smsMarketing, setSmsMarketing] = useState(false);

  // Tipping Options
  const [showTipping, setShowTipping] = useState(false);

  // Address Collection
  const [useShippingAsBilling, setUseShippingAsBilling] = useState(true);

  return (
    <SettingsPage title="Checkout">
      {/* Customer Contact Method */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-base">Customer contact method</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Choose how customers can be contacted about their order</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <CardDescription>
            The contact method customers enter at checkout will receive order and shipping{' '}
            <Button variant="link" className="h-auto p-0 text-blue-600">
              notifications
              <ExternalLink className="w-3 h-3 ml-0.5 inline" />
            </Button>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup 
            value={contactMethod} 
            onValueChange={setContactMethod}
            className="space-y-4"
          >
            <div className="flex items-start space-x-3">
              <RadioGroupItem value="phone_or_email" id="phone_or_email" className="mt-1" />
              <div>
                <Label htmlFor="phone_or_email" className="font-medium flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Phone number or <Mail className="w-4 h-4" /> email
                </Label>
                <p className="text-sm text-gray-500 mt-0.5">
                  To send SMS updates, you need to install an{' '}
                  <Button variant="link" className="h-auto p-0 text-blue-600">
                    SMS App
                  </Button>
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <RadioGroupItem value="email" id="email" className="mt-1" />
              <div>
                <Label htmlFor="email" className="font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email only
                </Label>
              </div>
            </div>
          </RadioGroup>

          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="order_tracking" 
                checked={showOrderTracking}
                onCheckedChange={(checked) => setShowOrderTracking(checked as boolean)}
              />
              <div>
                <Label htmlFor="order_tracking" className="font-medium">
                  Show a link for customers to track their order with{' '}
                  <Store className="w-4 h-4 inline" /> Shop
                </Label>
                <p className="text-sm text-gray-500">
                  Customers will be able to download the app from the order status page
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox 
                id="require_login" 
                checked={requireLogin}
                onCheckedChange={(checked) => setRequireLogin(checked as boolean)}
              />
              <div>
                <Label htmlFor="require_login" className="font-medium">
                  Require customers to log in to their account before checkout
                </Label>
                <p className="text-sm text-gray-500">
                  Customers can only use email when login is required
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Information */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Customer information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Full Name Options */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Full name</Label>
            <RadioGroup 
              value={fullNameOption} 
              onValueChange={setFullNameOption}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="last_name" id="last_name" />
                <Label htmlFor="last_name">Only require last name</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="full_name" id="full_name" />
                <Label htmlFor="full_name">Require first and last name</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Company Name Options */}
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm font-medium">Company name</Label>
              <Badge variant="secondary">Recommended</Badge>
            </div>
            <RadioGroup 
              value={companyNameOption} 
              onValueChange={setCompanyNameOption}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="dont_include" id="company_dont_include" />
                <Label htmlFor="company_dont_include">Don't include</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="optional" id="company_optional" />
                <Label htmlFor="company_optional">Optional</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="required" id="company_required" />
                <Label htmlFor="company_required">Required</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Address Line 2 Options */}
          <div className="pt-4 border-t">
            <Label className="text-sm font-medium mb-3 block">
              Address line 2 (apartment, unit, etc.)
            </Label>
            <RadioGroup 
              value={addressLine2Option} 
              onValueChange={setAddressLine2Option}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="dont_include" id="address_dont_include" />
                <Label htmlFor="address_dont_include">Don't include</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="optional" id="address_optional" />
                <Label htmlFor="address_optional">Optional</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="required" id="address_required" />
                <Label htmlFor="address_required">Required</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Shipping Phone Number Options */}
          <div className="pt-4 border-t">
            <Label className="text-sm font-medium mb-3 block">
              Shipping address phone number
            </Label>
            <RadioGroup 
              value={phoneNumberOption} 
              onValueChange={setPhoneNumberOption}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="dont_include" id="phone_dont_include" />
                <Label htmlFor="phone_dont_include">Don't include</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="optional" id="phone_optional" />
                <Label htmlFor="phone_optional">Optional</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="required" id="phone_required" />
                <Label htmlFor="phone_required">Required</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Marketing Options */}
      {/* <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Marketing options</CardTitle>
            <Button variant="outline" size="sm">
              Customize sign-up labels
            </Button>
          </div>
          <CardDescription>
            Let customers sign up for email or SMS marketing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="email_marketing" 
                checked={emailMarketing}
                onCheckedChange={(checked) => setEmailMarketing(checked as boolean)}
              />
              <div>
                <Label htmlFor="email_marketing" className="font-medium">Email</Label>
                <div className="mt-2 pl-6">
                  <Checkbox 
                    id="email_preselected" 
                    checked={emailMarketingPreselected}
                    onCheckedChange={(checked) => setEmailMarketingPreselected(checked as boolean)}
                    disabled={!emailMarketing}
                  />
                  <Label 
                    htmlFor="email_preselected" 
                    className={`ml-2 ${!emailMarketing && 'text-gray-400'}`}
                  >
                    Preselected
                  </Label>
                  <p className="text-sm text-gray-500 mt-1">
                    Customers can deselect if they don't want email marketing
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox 
                id="sms_marketing" 
                checked={smsMarketing}
                onCheckedChange={(checked) => setSmsMarketing(checked as boolean)}
              />
              <Label htmlFor="sms_marketing" className="font-medium">SMS</Label>
            </div>
          </div>
        </CardContent>
      </Card> */}

      {/* Tipping */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-base">Tipping</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Allow customers to add tips during checkout</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <CardDescription>
            Customers can choose between 3 presets or enter a custom amount
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-3">
            <Checkbox 
              id="show_tipping" 
              checked={showTipping}
              onCheckedChange={(checked) => setShowTipping(checked as boolean)}
            />
            <Label htmlFor="show_tipping" className="font-medium">
              Show tipping options at checkout
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Address Collection */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Address collection preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-3">
            <Checkbox 
              id="shipping_as_billing" 
              checked={useShippingAsBilling}
              onCheckedChange={(checked) => setUseShippingAsBilling(checked as boolean)}
            />
            <div>
              <Label htmlFor="shipping_as_billing" className="font-medium">
                Use the shipping address as the billing address by default
              </Label>
              <p className="text-sm text-gray-500">
                The billing address can still be edited
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Checkout Language */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Checkout language</CardTitle>
            <Button variant="outline" size="sm">
              Edit checkout content
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span>English</span>
            <Button variant="ghost" size="sm">
              Change language
            </Button>
          </div>
        </CardContent>
      </Card>
    </SettingsPage>
  );
} 