'use client';

import { useState } from 'react';
import { Info, LogIn, ExternalLink } from 'lucide-react';
import { SettingsPage } from '../components/settings-page';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function CustomerAccountsPage() {
  // Login Links State
  const [showLoginLinks, setShowLoginLinks] = useState(true);
  
  // Account Type State
  const [accountType, setAccountType] = useState('customer_accounts');
  
  // Self-serve Returns State
  const [allowSelfServeReturns, setAllowSelfServeReturns] = useState(false);
  
  // Store Credit State
  const [allowStoreCredit, setAllowStoreCredit] = useState(true);

  return (
    <SettingsPage title="Customer accounts">
      {/* Login Links */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-base">Login links</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Control the visibility of customer login options</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-1.5">
            <div className="flex items-center gap-3">
              <LogIn className="w-5 h-5 text-gray-500" />
              <div>
                <div className="font-medium">Show login links</div>
                <div className="text-sm text-gray-600">
                  Show login links in the header of online store and at checkout
                </div>
              </div>
            </div>
            <Switch
              checked={showLoginLinks}
              onCheckedChange={setShowLoginLinks}
            />
          </div>
        </CardContent>
      </Card>

      {/* Account Type Selection */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">
            Choose which version of customer accounts to link to
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={accountType} 
            onValueChange={setAccountType}
            className="space-y-4"
          >
            <div className="flex items-start space-x-3 p-4 border rounded-lg">
              <RadioGroupItem value="customer_accounts" id="customer_accounts" className="mt-1" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Label htmlFor="customer_accounts" className="font-medium">
                    Customer accounts
                  </Label>
                  <Badge variant="secondary">Recommended</Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Customers log in with a one-time code sent to their email (no passwords)
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 border rounded-lg">
              <RadioGroupItem value="legacy" id="legacy" className="mt-1" />
              <div>
                <Label htmlFor="legacy" className="font-medium">
                  Legacy
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  Customers create an account and log in with email and password
                </p>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Customer Accounts Features */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-base">Customer accounts</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Manage customer account features and permissions</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Self-serve Returns */}
          <div className="flex items-center justify-between py-1.5">
            <div>
              <div className="font-medium">Self-serve returns</div>
              <div className="text-sm text-gray-600">
                Allow customers to request and manage returns. Customize what your customers can return with{' '}
                <Button variant="link" className="h-auto p-0 text-blue-600">
                  return rules
                  <ExternalLink className="w-3 h-3 ml-0.5 inline" />
                </Button>
              </div>
            </div>
            <Switch
              checked={allowSelfServeReturns}
              onCheckedChange={setAllowSelfServeReturns}
            />
          </div>

          {/* Store Credit */}
          <div className="flex items-center justify-between py-1.5 border-t">
            <div>
              <div className="font-medium">Store credit</div>
              <div className="text-sm text-gray-600">
                Allow customers to see and spend store credit
              </div>
            </div>
            <Switch
              checked={allowStoreCredit}
              onCheckedChange={setAllowStoreCredit}
            />
          </div>
        </CardContent>
      </Card>

      {/* Account URL */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">URL</CardTitle>
            <Button variant="outline" size="sm">Manage</Button>
          </div>
          <CardDescription>
            Use this URL anywhere you'd like customers to access customer accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-3 rounded-md">
            <code className="text-sm text-gray-600">
              https://Axova.com/74659332315/account
            </code>
          </div>
        </CardContent>
      </Card>
    </SettingsPage>
  );
} 