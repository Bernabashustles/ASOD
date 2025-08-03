'use client';

import { useState } from 'react';
import { 
  Plus, 
  CreditCard, 
  Info, 
  ExternalLink, 
  Search, 
  Check, 
  AlertCircle, 
  ChevronRight, 
  Settings,
  Landmark,
  Building2,
  ArrowRight,
  ArrowLeft,
  Copy,
  DollarSign,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar
} from 'lucide-react';
import { SettingsPage } from '../components/settings-page';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

type SetupStep = 'provider' | 'business' | 'bank' | 'review';

interface PersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  occupation: string;
  companyName?: string;
}

interface BankDetails {
  accountName: string;
  accountNumber: string;
  bankName: string;
  routingNumber: string;
}

interface EthiopianBank {
  id: string;
  name: string;
  code: string;
}

export default function PaymentsPage() {
  const [captureMethod, setCaptureMethod] = useState('automatic');
  const [showProviderDialog, setShowProviderDialog] = useState(false);
  const [showPaymentMethodDialog, setShowPaymentMethodDialog] = useState(false);
  const [showManualMethodDialog, setShowManualMethodDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [manualMethodName, setManualMethodName] = useState('');
  const [manualMethodInstructions, setManualMethodInstructions] = useState('');
  const [setupStep, setSetupStep] = useState<SetupStep>('provider');
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    },
    occupation: '',
    companyName: ''
  });
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    accountName: '',
    accountNumber: '',
    bankName: '',
    routingNumber: ''
  });

  const renderDialogContent = () => {
    switch (setupStep) {
      case 'provider':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Choose payment provider</DialogTitle>
              <DialogDescription>
                Select a payment provider to accept payments
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <Input
                  placeholder="Search payment providers"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {paymentProviders.map((provider) => (
                  <div
                    key={provider.id}
                    onClick={() => setSelectedProvider(provider.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedProvider === provider.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <provider.icon className="w-8 h-8 text-gray-600" />
                      <div>
                        <h3 className="font-medium">{provider.name}</h3>
                        <p className="text-sm text-gray-500">{provider.description}</p>
                      </div>
                      {selectedProvider === provider.id && (
                        <Check className="w-5 h-5 text-blue-500 ml-auto" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowProviderDialog(false)}>
                Cancel
              </Button>
              <Button 
                onClick={() => setSetupStep('business')}
                disabled={!selectedProvider}
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </DialogFooter>
          </>
        );

      case 'business':
        return (
          <>
            <DialogHeader className="sticky top-0 bg-white z-10 pb-4">
              <DialogTitle>Personal Information</DialogTitle>
              <DialogDescription>
                Please provide your personal details for verification
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium flex items-center gap-2 text-gray-700 sticky top-0 bg-white">
                  <User className="w-4 h-4" />
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input
                      value={personalDetails.firstName}
                      onChange={(e) => setPersonalDetails({
                        ...personalDetails,
                        firstName: e.target.value
                      })}
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input
                      value={personalDetails.lastName}
                      onChange={(e) => setPersonalDetails({
                        ...personalDetails,
                        lastName: e.target.value
                      })}
                      placeholder="Doe"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium flex items-center gap-2 text-gray-700 sticky top-0 bg-white">
                  <Mail className="w-4 h-4" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      value={personalDetails.email}
                      onChange={(e) => setPersonalDetails({
                        ...personalDetails,
                        email: e.target.value
                      })}
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input
                      type="tel"
                      value={personalDetails.phone}
                      onChange={(e) => setPersonalDetails({
                        ...personalDetails,
                        phone: e.target.value
                      })}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium flex items-center gap-2 text-gray-700 sticky top-0 bg-white">
                  <Calendar className="w-4 h-4" />
                  Personal Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Date of Birth</Label>
                    <Input
                      type="date"
                      value={personalDetails.dateOfBirth}
                      onChange={(e) => setPersonalDetails({
                        ...personalDetails,
                        dateOfBirth: e.target.value
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Nationality</Label>
                    <Select
                      value={personalDetails.nationality}
                      onValueChange={(value) => setPersonalDetails({
                        ...personalDetails,
                        nationality: value
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="et">Ethiopian</SelectItem>
                        <SelectItem value="us">American</SelectItem>
                        <SelectItem value="gb">British</SelectItem>
                        {/* Add more nationalities */}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium flex items-center gap-2 text-gray-700 sticky top-0 bg-white">
                  <MapPin className="w-4 h-4" />
                  Address
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Street Address</Label>
                    <Input
                      value={personalDetails.address.street}
                      onChange={(e) => setPersonalDetails({
                        ...personalDetails,
                        address: {
                          ...personalDetails.address,
                          street: e.target.value
                        }
                      })}
                      placeholder="123 Main St"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>City</Label>
                      <Input
                        value={personalDetails.address.city}
                        onChange={(e) => setPersonalDetails({
                          ...personalDetails,
                          address: {
                            ...personalDetails.address,
                            city: e.target.value
                          }
                        })}
                        placeholder="City"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>State/Province</Label>
                      <Input
                        value={personalDetails.address.state}
                        onChange={(e) => setPersonalDetails({
                          ...personalDetails,
                          address: {
                            ...personalDetails.address,
                            state: e.target.value
                          }
                        })}
                        placeholder="State"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Postal Code</Label>
                      <Input
                        value={personalDetails.address.postalCode}
                        onChange={(e) => setPersonalDetails({
                          ...personalDetails,
                          address: {
                            ...personalDetails.address,
                            postalCode: e.target.value
                          }
                        })}
                        placeholder="12345"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Country</Label>
                      <Select
                        value={personalDetails.address.country}
                        onValueChange={(value) => setPersonalDetails({
                          ...personalDetails,
                          address: {
                            ...personalDetails.address,
                            country: value
                          }
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="et">Ethiopia</SelectItem>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="gb">United Kingdom</SelectItem>
                          {/* Add more countries */}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Occupation */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium flex items-center gap-2 text-gray-700 sticky top-0 bg-white">
                  <Briefcase className="w-4 h-4" />
                  Professional Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Occupation</Label>
                    <Input
                      value={personalDetails.occupation}
                      onChange={(e) => setPersonalDetails({
                        ...personalDetails,
                        occupation: e.target.value
                      })}
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Company Name (Optional)</Label>
                    <Input
                      value={personalDetails.companyName}
                      onChange={(e) => setPersonalDetails({
                        ...personalDetails,
                        companyName: e.target.value
                      })}
                      placeholder="Company Name"
                    />
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="sticky bottom-0 bg-white pt-4 mt-6">
              <div className="flex justify-between w-full">
                <Button
                  variant="outline"
                  onClick={() => setSetupStep('provider')}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setShowProviderDialog(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => setSetupStep('bank')}
                    disabled={!personalDetails.firstName || !personalDetails.lastName || !personalDetails.email}
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </>
        );

      case 'bank':
        return (
          <>
            <DialogHeader className="sticky top-0 bg-white z-10 pb-4">
              <DialogTitle>Bank Account Details</DialogTitle>
              <DialogDescription>
                Add your bank account for receiving payments
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Bank Selection */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium flex items-center gap-2 text-gray-700">
                  <Landmark className="w-4 h-4" />
                  Select Your Bank
                </h3>
                <div className="space-y-2">
                  <Label>Bank Name</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your bank" />
                    </SelectTrigger>
                    <SelectContent 
                      className="w-[calc(100vw-32px)] sm:w-full p-0" 
                      position="popper"
                      align="start"
                      side="bottom"
                    >
                      <div className="sticky top-0 bg-white p-2 border-b">
                        <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                          <Input
                            placeholder="Search banks..."
                            className="pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="max-h-[40vh] overflow-y-auto py-1">
                        {ethiopianBanks
                          .filter(bank => 
                            bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            bank.code.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map((bank) => (
                            <SelectItem 
                              key={bank.id} 
                              value={bank.id}
                              className="py-2.5 px-2 focus:bg-gray-50"
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center flex-shrink-0">
                                  <Landmark className="w-4 h-4 text-gray-600" />
                                </div>
                                <div className="flex flex-col min-w-0">
                                  <span className="font-medium text-sm truncate">{bank.name}</span>
                                  <span className="text-xs text-gray-500">{bank.code}</span>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                      </div>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Account Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium flex items-center gap-2 text-gray-700">
                  <CreditCard className="w-4 h-4" />
                  Account Information
                </h3>
                <div className="p-4 border rounded-lg space-y-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      Account Holder Name
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="w-4 h-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            Enter the name exactly as it appears on your bank account
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    <Input
                      value={bankDetails.accountName}
                      onChange={(e) => setBankDetails({
                        ...bankDetails,
                        accountName: e.target.value
                      })}
                      placeholder="e.g. John Doe"
                      className="font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      Account Number
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="w-4 h-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            Your bank account number without spaces
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    <div className="relative">
                      <Input
                        value={bankDetails.accountNumber}
                        onChange={(e) => setBankDetails({
                          ...bankDetails,
                          accountNumber: e.target.value
                        })}
                        placeholder="Enter your account number"
                        className="pr-10 font-medium"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => {
                          navigator.clipboard.writeText(bankDetails.accountNumber);
                          // Add toast notification here
                        }}
                      >
                        <Copy className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Information */}
              <div className="space-y-4">
                <Alert className="bg-blue-50 border-blue-200">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-600">
                    Make sure all account details are correct. Incorrect information may delay your payments.
                  </AlertDescription>
                </Alert>

                <div className="rounded-lg border p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Payment Processing</h4>
                      <p className="text-sm text-gray-500">
                        Payments are typically processed within 2-3 business days after the transaction is completed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="sticky bottom-0 bg-white pt-4 mt-6">
              <div className="flex justify-between w-full">
                <Button
                  variant="outline"
                  onClick={() => setSetupStep('business')}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setShowProviderDialog(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => setSetupStep('review')}
                    disabled={!bankDetails.accountName || !bankDetails.accountNumber || !bankDetails.bankName}
                    className="bg-[#1a73e8] hover:bg-[#174ea6]"
                  >
                    Review Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </>
        );

      case 'review':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Review details</DialogTitle>
              <DialogDescription>
                Review your payment provider setup
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Payment Provider</h4>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-gray-600" />
                    <div>
                      <div className="font-medium">
                        {paymentProviders.find(p => p.id === selectedProvider)?.name}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium mb-2">Business Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Business name</span>
                    <span>{personalDetails.firstName} {personalDetails.lastName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Email</span>
                    <span>{personalDetails.email}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Phone</span>
                    <span>{personalDetails.phone}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium mb-2">Bank Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Account holder</span>
                    <span>{bankDetails.accountName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Bank</span>
                    <span>{bankDetails.bankName}</span>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <div className="flex justify-between w-full">
                <Button
                  variant="outline"
                  onClick={() => setSetupStep('bank')}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setShowProviderDialog(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => {
                      setShowProviderDialog(false);
                      setSetupStep('provider');
                      setSelectedProvider(null);
                      setPersonalDetails({
                        firstName: '',
                        lastName: '',
                        email: '',
                        phone: '',
                        dateOfBirth: '',
                        nationality: '',
                        address: {
                          street: '',
                          city: '',
                          state: '',
                          postalCode: '',
                          country: ''
                        },
                        occupation: '',
                        companyName: ''
                      });
                      setBankDetails({
                        accountName: '',
                        accountNumber: '',
                        bankName: '',
                        routingNumber: ''
                      });
                    }}
                  >
                    Complete setup
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </>
        );
    }
  };

  return (
    <SettingsPage title="Payments">
      {/* Payment Providers */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-base">Payment providers</CardTitle>
              <CardDescription>
                Accept payments and get paid
              </CardDescription>
            </div>
            <Button 
              onClick={() => setShowProviderDialog(true)}
              className="w-full sm:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Set up payment provider
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Empty State */}
            <div className="text-center py-8 px-4 border rounded-lg">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="font-medium mb-2">No payment provider set up</h3>
              <p className="text-sm text-gray-500 mb-4">
                Choose a payment provider to start accepting payments from customers
              </p>
              <Button 
                variant="outline" 
                onClick={() => setShowProviderDialog(true)}
                className="w-full sm:w-auto"
              >
                Set up payments
              </Button>
            </div>

            {/* Info Alert */}
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You'll need to set up a payment provider to accept payments and get paid
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      {/* Payment Capture Method */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-base">Payment capture method</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Choose when to capture payment for orders</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={captureMethod} 
            onValueChange={setCaptureMethod}
            className="space-y-4"
          >
            <div className="flex items-start space-x-3">
              <RadioGroupItem value="automatic" id="automatic" className="mt-1" />
              <div>
                <Label htmlFor="automatic" className="font-medium">
                  Automatically at checkout
                </Label>
                <p className="text-sm text-gray-500 mt-0.5">
                  Capture payment when an order is placed
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <RadioGroupItem value="fulfilled" id="fulfilled" className="mt-1" />
              <div>
                <Label htmlFor="fulfilled" className="font-medium">
                  When order is fulfilled
                </Label>
                <p className="text-sm text-gray-500 mt-0.5">
                  Authorize payment at checkout and capture when fulfilled
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <RadioGroupItem value="manual" id="manual" className="mt-1" />
              <div>
                <Label htmlFor="manual" className="font-medium">
                  Manually
                </Label>
                <p className="text-sm text-gray-500 mt-0.5">
                  Authorize at checkout and capture manually
                </p>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Manual Payment Methods */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Manual payment methods</CardTitle>
          <CardDescription>
            Payments made outside your online store
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-[15px] text-[#6d7175] text-center">
              Add payment methods for orders paid outside your online store
            </p>
            
            <Button 
              variant="outline" 
              onClick={() => setShowManualMethodDialog(true)}
              className="w-full flex items-center gap-2 justify-start h-auto py-3 px-4"
            >
              <Plus className="w-4 h-4" />
              Add manual payment method
            </Button>

            <div className="text-[13px] text-[#6d7175]">
              Manual payment methods must be{' '}
              <Button 
                variant="link" 
                className="h-auto p-0 text-[#1a73e8] hover:text-[#174ea6] inline-flex items-center"
              >
                approved before fulfillment
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Customizations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Payment customizations</CardTitle>
          <CardDescription>
            Control how payment methods appear at checkout
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-between h-auto py-3 px-4"
            >
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Customize payment methods display
              </div>
              <ChevronRight className="w-4 h-4" />
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-between h-auto py-3 px-4"
            >
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Payment method settings
              </div>
              <ChevronRight className="w-4 h-4" />
            </Button>

            <div className="text-[13px] text-[#6d7175]">
              Learn more about{' '}
              <Button 
                variant="link" 
                className="h-auto p-0 text-[#1a73e8] hover:text-[#174ea6] inline-flex items-center"
              >
                payment customizations
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Updated Provider Selection Dialog */}
      <Dialog 
        open={showProviderDialog} 
        onOpenChange={(open) => {
          setShowProviderDialog(open);
          if (!open) {
            setSetupStep('provider');
            setSelectedProvider(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-[600px] h-[100dvh] sm:h-auto sm:max-h-[90vh] w-full overflow-hidden flex flex-col bg-white p-0">
          <div className="sticky top-0 z-20 bg-white pt-4 px-4 sm:pt-6 sm:px-6 border-b">
            <Tabs value={setupStep} className="w-full">
              <TabsList className="grid w-full grid-cols-4 gap-2">
                <TabsTrigger value="provider" disabled className="text-xs sm:text-sm">Provider</TabsTrigger>
                <TabsTrigger value="business" disabled className="text-xs sm:text-sm">Personal</TabsTrigger>
                <TabsTrigger value="bank" disabled className="text-xs sm:text-sm">Bank</TabsTrigger>
                <TabsTrigger value="review" disabled className="text-xs sm:text-sm">Review</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Make the content area scrollable with custom scrollbar */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-6 custom-scrollbar">
            {renderDialogContent()}
          </div>
        </DialogContent>
      </Dialog>
    </SettingsPage>
  );
}

// Sample data
const paymentProviders = [
  {
    id: 'axova-payments',
    name: 'Axova Payments',
    description: 'Accept credit cards and popular payment methods',
    icon: CreditCard
  },
  // Add more providers as needed
];

// Add Ethiopian banks data
const ethiopianBanks: EthiopianBank[] = [
  { id: 'cbe', name: 'Commercial Bank of Ethiopia', code: 'CBE' },
  { id: 'dashen', name: 'Dashen Bank', code: 'DASHEN' },
  { id: 'awash', name: 'Awash Bank', code: 'AWASH' },
  { id: 'abyssinia', name: 'Bank of Abyssinia', code: 'BOA' },
  { id: 'wegagen', name: 'Wegagen Bank', code: 'WEGAGEN' },
  { id: 'united', name: 'United Bank', code: 'UNITED' },
  { id: 'nib', name: 'Nib International Bank', code: 'NIB' },
  { id: 'cooperative', name: 'Cooperative Bank of Oromia', code: 'COOPBANK' },
  { id: 'lion', name: 'Lion International Bank', code: 'LION' },
  { id: 'zemen', name: 'Zemen Bank', code: 'ZEMEN' },
  { id: 'oromia', name: 'Oromia International Bank', code: 'OIB' },
  { id: 'bunna', name: 'Bunna International Bank', code: 'BUNNA' },
  { id: 'berhan', name: 'Berhan International Bank', code: 'BERHAN' },
  { id: 'abay', name: 'Abay Bank', code: 'ABAY' },
  { id: 'addis', name: 'Addis International Bank', code: 'ADDIS' },
  { id: 'debub', name: 'Debub Global Bank', code: 'DEBUB' },
  { id: 'enat', name: 'Enat Bank', code: 'ENAT' },
  { id: 'hibret', name: 'Hibret Bank', code: 'HIBRET' },
  { id: 'development', name: 'Development Bank of Ethiopia', code: 'DBE' },
  { id: 'zamzam', name: 'ZamZam Bank', code: 'ZAMZAM' },
  { id: 'hijra', name: 'Hijra Bank', code: 'HIJRA' },
  { id: 'siinqee', name: 'Siinqee Bank', code: 'SIINQEE' },
  { id: 'tsehay', name: 'Tsehay Bank', code: 'TSEHAY' },
  { id: 'goh', name: 'Goh Betoch Bank', code: 'GOH' },
  { id: 'ahadu', name: 'Ahadu Bank', code: 'AHADU' },
  { id: 'amhara', name: 'Amhara Bank', code: 'AMHARA' },
  { id: 'shabelle', name: 'Shabelle Bank', code: 'SHABELLE' },
  { id: 'ethio-lease', name: 'Ethio Lease', code: 'LEASE' },
  { id: 'oef', name: 'OEF International Bank', code: 'OEF' },
  { id: 'ray', name: 'Ray Bank', code: 'RAY' }
]; 