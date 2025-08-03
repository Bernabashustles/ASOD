'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  CreditCard,
  Building2,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Star,
  StarOff,
  ChevronRight,
  Plus,
  Bank,
  Copy,
  Shield,
  Info,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock data for saved payment methods
const savedPaymentMethods = [
  {
    id: 1,
    type: 'bank',
    name: 'Commercial Bank of Ethiopia',
    accountNumber: '•••• •••• 1234',
    accountHolder: 'John Doe',
    isDefault: true,
  },
  {
    id: 2,
    type: 'bank',
    name: 'Dashen Bank',
    accountNumber: '•••• •••• 5678',
    accountHolder: 'John Doe',
    isDefault: false,
  },
];

const ethiopianBanks = [
  { id: 'cbe', name: 'Commercial Bank of Ethiopia' },
  { id: 'dashen', name: 'Dashen Bank' },
  { id: 'awash', name: 'Awash Bank' },
  { id: 'abyssinia', name: 'Bank of Abyssinia' },
  { id: 'wegagen', name: 'Wegagen Bank' },
  { id: 'united', name: 'United Bank' },
  { id: 'nib', name: 'Nib International Bank' },
  { id: 'zemen', name: 'Zemen Bank' },
];

const AddPaymentPage = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('bank');
  const [bankFormData, setBankFormData] = useState({
    accountName: '',
    accountNumber: '',
    routingNumber: '',
    bankName: '',
    accountType: 'checking'
  });
  const [cardFormData, setCardFormData] = useState({
    holderName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handleBankFormChange = (field: string, value: string) => {
    setBankFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCardFormChange = (field: string, value: string) => {
    setCardFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBankSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle bank account submission
    router.push('/wallet');
  };

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle card submission
    router.push('/wallet');
  };

  const handleDeletePaymentMethod = (id: number) => {
    // Handle deletion
    console.log('Deleting payment method:', id);
  };

  const handleSetDefault = (id: number) => {
    // Handle setting default
    console.log('Setting default payment method:', id);
  };

  return (
    <div className="p-3 sm:p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 sm:h-9 sm:w-9" 
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <h1 className="text-xl sm:text-2xl font-semibold">Add Payment Method</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Connect a new payment method to your account
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-3 sm:gap-6">
        <div className="space-y-3 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add New Payment Method</CardTitle>
              <CardDescription>Choose how you want to get paid</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
                <TabsList className="grid w-full grid-cols-2 h-11 sm:h-9">
                  <TabsTrigger value="bank" className="text-base sm:text-sm">
                    <Building2 className="h-5 w-5 sm:h-4 sm:w-4 mr-2" />
                    Bank Account
                  </TabsTrigger>
                  <TabsTrigger value="card" className="text-base sm:text-sm">
                    <CreditCard className="h-5 w-5 sm:h-4 sm:w-4 mr-2" />
                    Credit Card
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="bank">
                  <form onSubmit={handleBankSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Account Holder Name</Label>
                        <Input
                          required
                          placeholder="Enter account holder name"
                          value={bankFormData.accountName}
                          onChange={(e) => handleBankFormChange('accountName', e.target.value)}
                          className="h-11 sm:h-9"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Account Number</Label>
                        <Input
                          required
                          type="password"
                          placeholder="Enter account number"
                          value={bankFormData.accountNumber}
                          onChange={(e) => handleBankFormChange('accountNumber', e.target.value)}
                          className="h-11 sm:h-9"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Routing Number</Label>
                        <Input
                          required
                          placeholder="Enter routing number"
                          value={bankFormData.routingNumber}
                          onChange={(e) => handleBankFormChange('routingNumber', e.target.value)}
                          className="h-11 sm:h-9"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Bank Name</Label>
                        <Input
                          required
                          placeholder="Enter bank name"
                          value={bankFormData.bankName}
                          onChange={(e) => handleBankFormChange('bankName', e.target.value)}
                          className="h-11 sm:h-9"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Account Type</Label>
                        <Select
                          value={bankFormData.accountType}
                          onValueChange={(value) => handleBankFormChange('accountType', value)}
                        >
                          <SelectTrigger className="h-11 sm:h-9">
                            <SelectValue placeholder="Select account type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="checking">Checking Account</SelectItem>
                            <SelectItem value="savings">Savings Account</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Alert className="bg-muted/50">
                      <Shield className="h-4 w-4" />
                      <AlertDescription>
                        Your bank account details are encrypted and secure
                      </AlertDescription>
                    </Alert>

                    <Separator />

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                      <Button 
                        variant="outline" 
                        type="button" 
                        onClick={() => router.back()}
                        className="w-full sm:w-auto h-11 sm:h-9 order-1 sm:order-none"
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit"
                        className="w-full sm:w-auto h-11 sm:h-9"
                      >
                        Add Bank Account
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="card">
                  <form onSubmit={handleCardSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Card Holder Name</Label>
                        <Input
                          required
                          placeholder="Enter card holder name"
                          value={cardFormData.holderName}
                          onChange={(e) => handleCardFormChange('holderName', e.target.value)}
                          className="h-11 sm:h-9"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Card Number</Label>
                        <div className="relative">
                          <Input
                            required
                            placeholder="Enter card number"
                            value={cardFormData.cardNumber}
                            onChange={(e) => handleCardFormChange('cardNumber', e.target.value)}
                            className="h-11 sm:h-9"
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                            <img src="/visa.svg" alt="Visa" className="h-4" />
                            <img src="/mastercard.svg" alt="Mastercard" className="h-4" />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Expiry Date</Label>
                          <Input
                            required
                            placeholder="MM/YY"
                            value={cardFormData.expiry}
                            onChange={(e) => handleCardFormChange('expiry', e.target.value)}
                            className="h-11 sm:h-9"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>CVV</Label>
                          <Input
                            required
                            type="password"
                            placeholder="•••"
                            maxLength={3}
                            value={cardFormData.cvv}
                            onChange={(e) => handleCardFormChange('cvv', e.target.value)}
                            className="h-11 sm:h-9"
                          />
                        </div>
                      </div>
                    </div>

                    <Alert className="bg-muted/50">
                      <Shield className="h-4 w-4" />
                      <AlertDescription>
                        Your card details are encrypted and secure
                      </AlertDescription>
                    </Alert>

                    <Separator />

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                      <Button 
                        variant="outline" 
                        type="button" 
                        onClick={() => router.back()}
                        className="w-full sm:w-auto h-11 sm:h-9 order-1 sm:order-none"
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit"
                        className="w-full sm:w-auto h-11 sm:h-9"
                      >
                        Add Card
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Saved Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Saved Payment Methods</CardTitle>
            <CardDescription>Your connected accounts and cards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {savedPaymentMethods.map((method) => (
              <div
                key={method.id}
                className="group flex items-center justify-between p-4 rounded-lg border hover:border-primary/50 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                    {method.type === 'bank' ? (
                      <Building2 className="h-5 w-5 text-primary" />
                    ) : (
                      <CreditCard className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{method.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {method.accountNumber}
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                You can add up to 5 payment methods
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddPaymentPage; 