'use client';

import { useState } from 'react';
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Wallet,
  ArrowUpRight,
  CreditCard,
  Building2,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Clock,
  Building,
  Receipt,
  Calendar,
  Info,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useRouter } from 'next/navigation';

const mockCards = [
  {
    id: 1,
    type: 'visa',
    number: '4532 •••• •••• 7895',
    expiry: '12/25',
    name: 'Yeabkibir Tadesse',
    balance: 13970.10,
    isDefault: true
  }
];

const mockBankAccounts = [
  {
    id: 1,
    name: 'Main Business Account',
    accountNumber: '•••• •••• 1234',
    bankName: 'Chase Bank',
    type: 'checking',
    isDefault: true
  },
  {
    id: 2,
    name: 'Savings Account',
    accountNumber: '•••• •••• 5678',
    bankName: 'Bank of America',
    type: 'savings',
    isDefault: false
  }
];

const PayoutRequestPage = () => {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/wallet');
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
            <h1 className="text-xl sm:text-2xl font-semibold">Request Payout</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Transfer your available balance to your preferred payment method
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-3 sm:gap-6">
        <div className="space-y-3 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payout Details</CardTitle>
              <CardDescription>Enter the amount and select a payment method</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Amount</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 sm:h-4 sm:w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="pl-10 h-11 sm:h-9"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      Available balance: $13,970.10
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Label>Select Payment Method</Label>
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        Bank Accounts
                      </h3>
                      {mockBankAccounts.map((account) => (
                        <div
                          key={account.id}
                          className={`relative p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedMethod === `bank-${account.id}`
                              ? 'border-primary bg-primary/5'
                              : 'hover:border-primary/50'
                          }`}
                          onClick={() => setSelectedMethod(`bank-${account.id}`)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                              <Building2 className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{account.name}</p>
                              <p className="text-sm text-muted-foreground">{account.accountNumber}</p>
                            </div>
                            {account.isDefault && (
                              <Badge variant="secondary" className="ml-auto">Default</Badge>
                            )}
                          </div>
                        </div>
                      ))}

                      <div className="space-y-3">
                        <h3 className="text-sm font-medium flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          Cards
                        </h3>
                        {mockCards.map((card) => (
                          <div
                            key={card.id}
                            className={`relative p-4 border rounded-lg cursor-pointer transition-colors ${
                              selectedMethod === `card-${card.id}`
                                ? 'border-primary bg-primary/5'
                                : 'hover:border-primary/50'
                            }`}
                            onClick={() => setSelectedMethod(`card-${card.id}`)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                                <CreditCard className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">{card.type.toUpperCase()} •••• {card.number.slice(-4)}</p>
                                <p className="text-sm text-muted-foreground">Expires {card.expiry}</p>
                              </div>
                              {card.isDefault && (
                                <Badge variant="secondary" className="ml-auto">Default</Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Note (Optional)</Label>
                    <Input
                      placeholder="Add a note for your reference"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="h-11 sm:h-9"
                    />
                  </div>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Payouts are typically processed within 1-3 business days
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
                    Request Payout
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payout Information</CardTitle>
            <CardDescription>Important details about payouts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                  <Receipt className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Processing Time</p>
                  <p className="text-sm text-muted-foreground">1-3 business days</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Next Payout Date</p>
                  <p className="text-sm text-muted-foreground">March 20, 2024</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                  <Building className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Bank Transfer Fee</p>
                  <p className="text-sm text-muted-foreground">No fee for standard transfers</p>
                </div>
              </div>
            </div>

            <Alert className="bg-muted/50">
              <Clock className="h-4 w-4" />
              <AlertDescription>
                Instant payouts are available for verified accounts
              </AlertDescription>
            </Alert>

            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-3">Need Help?</h4>
              <Button variant="outline" className="w-full h-11 sm:h-9 text-base sm:text-sm">
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PayoutRequestPage; 