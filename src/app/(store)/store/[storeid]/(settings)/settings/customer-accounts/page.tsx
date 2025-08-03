'use client';

import { useState } from 'react';
import { Info, LogIn, ExternalLink, Copy, Check } from 'lucide-react';
import { SettingsPage } from '../components/settings-page';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function CustomerAccountsPage() {
  // State Management
  const [showLoginLinks, setShowLoginLinks] = useState(true);
  const [accountType, setAccountType] = useState('customer_accounts');
  const [allowSelfServeReturns, setAllowSelfServeReturns] = useState(false);
  const [allowStoreCredit, setAllowStoreCredit] = useState(true);
  const [showReturnRulesDialog, setShowReturnRulesDialog] = useState(false);
  const [showUrlManageDialog, setShowUrlManageDialog] = useState(false);
  const [customUrl, setCustomUrl] = useState('https://Axova.com/74659332315/account');
  const [isCopied, setIsCopied] = useState(false);

  // Handle Return Rules Dialog
  const ReturnRulesDialog = () => (
    <Dialog open={showReturnRulesDialog} onOpenChange={setShowReturnRulesDialog}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Return rules</DialogTitle>
          <DialogDescription>
            Configure how customers can manage their returns
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Return window</Label>
            <div className="flex items-center gap-2 mt-2">
              <Input 
                type="number" 
                className="w-20" 
                min={0}
                defaultValue={30}
              />
              <span className="text-sm text-gray-600">days after delivery</span>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">Return reasons</Label>
            <div className="mt-2 space-y-2">
              {['Wrong size', 'Defective', 'Not as described', 'Changed mind'].map((reason) => (
                <div key={reason} className="flex items-center gap-2">
                  <Switch defaultChecked />
                  <Label>{reason}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => setShowReturnRulesDialog(false)}>
            Cancel
          </Button>
          <Button onClick={() => {
            setShowReturnRulesDialog(false);
            toast.success('Return rules updated successfully');
          }}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  // Handle Copy URL
  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(customUrl);
      setIsCopied(true);
      toast.success('URL copied to clipboard');
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy URL');
    }
  };

  // Handle Account Type Change
  const handleAccountTypeChange = (value: string) => {
    setAccountType(value);
    toast.success(`Switched to ${value === 'customer_accounts' ? 'Customer accounts' : 'Legacy'} mode`);
  };

  // Handle Feature Toggles
  const handleFeatureToggle = (feature: string, enabled: boolean) => {
    if (feature === 'login_links') {
      setShowLoginLinks(enabled);
      toast.success(`Login links ${enabled ? 'enabled' : 'disabled'}`);
    } else if (feature === 'self_serve_returns') {
      setAllowSelfServeReturns(enabled);
      toast.success(`Self-serve returns ${enabled ? 'enabled' : 'disabled'}`);
    } else if (feature === 'store_credit') {
      setAllowStoreCredit(enabled);
      toast.success(`Store credit ${enabled ? 'enabled' : 'disabled'}`);
    }
  };

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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-1.5">
            <div className="flex items-start sm:items-center gap-3">
              <LogIn className="w-5 h-5 text-gray-500 mt-1 sm:mt-0" />
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
            <div className="flex flex-col sm:flex-row items-start space-x-0 sm:space-x-3 space-y-4 sm:space-y-0 p-4 border rounded-lg">
              <RadioGroupItem value="customer_accounts" id="customer_accounts" className="mt-1" />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
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

            <div className="flex flex-col sm:flex-row items-start space-x-0 sm:space-x-3 space-y-4 sm:space-y-0 p-4 border rounded-lg">
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

      {/* URL Card */}
      <Card>
        <CardHeader className="space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <CardTitle className="text-base">URL</CardTitle>
              <CardDescription className="text-sm text-gray-500">
                Use this URL anywhere you'd like customers to access customer accounts
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowUrlManageDialog(true)}
              className="w-full sm:w-auto whitespace-nowrap"
            >
              Manage URL
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg space-y-3 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="w-full sm:flex-1 break-all">
                <code className="text-sm text-gray-600">{customUrl}</code>
              </div>
              <div className="flex w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyUrl}
                  className="w-full sm:w-auto h-9 px-4 flex items-center justify-center gap-2"
                >
                  {isCopied ? (
                    <>
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy URL</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* URL Management Dialog */}
      <Dialog open={showUrlManageDialog} onOpenChange={setShowUrlManageDialog}>
        <DialogContent className="sm:max-w-[500px] p-6">
          <DialogHeader className="space-y-3">
            <DialogTitle>Manage account URL</DialogTitle>
            <DialogDescription>
              Customize the URL where customers access their accounts
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="custom-url" className="text-sm font-medium">
                Custom URL
              </Label>
              <Input
                id="custom-url"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="w-full"
                placeholder="Enter custom URL"
              />
            </div>
          </div>

          <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setShowUrlManageDialog(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => {
                setShowUrlManageDialog(false);
                toast.success('Account URL updated successfully');
              }}
              className="w-full sm:w-auto"
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogs */}
      <ReturnRulesDialog />
    </SettingsPage>
  );
} 