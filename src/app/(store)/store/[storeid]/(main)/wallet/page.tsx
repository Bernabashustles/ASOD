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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Building2,
  DollarSign,
  LineChart,
  AlertCircle,
  CheckCircle2,
  Clock,
  ChevronRight,
  Plus,
  Trash2,
  Edit,
  Copy,
  Eye,
  EyeOff,
  BarChart4,
  PieChart,
  TrendingUp,
  Download,
  Share,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import styles from './styles.module.css';
import { CreditCard as AnimatedCreditCard } from "@/components/CreditCard";
import { useRouter } from 'next/navigation';

// Mock data for demonstration
const mockTransactions = [
  {
    id: 1,
    type: 'incoming',
    amount: 1250.00,
    description: 'Store sales payout',
    date: '2024-03-15',
    status: 'completed'
  },
  {
    id: 2,
    type: 'outgoing',
    amount: 500.00,
    description: 'Withdrawal to bank account',
    date: '2024-03-12',
    status: 'completed'
  },
  {
    id: 3,
    type: 'incoming',
    amount: 875.50,
    description: 'Marketplace earnings',
    date: '2024-03-10',
    status: 'completed'
  },
  {
    id: 4,
    type: 'outgoing',
    amount: 1000.00,
    description: 'Payout request',
    date: '2024-03-08',
    status: 'pending'
  },
];

const mockCards = [
  {
    id: 1,
    type: 'visa',
    number: '4532 •••• •••• 7895',
    fullNumber: '4532 1234 5678 7895',
    expiry: '12/25',
    name: 'Bryan Hozel',
    balance: 13970.10,
    isDefault: true
  }
];

const mockChartData = {
  earnings: [2150, 1850, 2250, 1950, 2500, 2750, 3250],
  months: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
  categories: {
    'Store Sales': 45,
    'Marketplace': 30,
    'Services': 15,
    'Other': 10
  }
};

// Card Logo Components
const CardLogo = ({ type }: { type: string }) => {
  switch (type) {
    case 'visa':
      return (
        <div className="h-8">
          <svg viewBox="0 0 1000 324" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full">
            <path d="M651.185 318.004H530.577L604.528 6.768H725.136L651.185 318.004Z" fill="white"/>
            <path d="M444.51 6.768L329.888 218.346L313.843 143.449L313.839 143.432L289.200 32.882C289.200 32.882 285.055 6.768 252.35 6.768H105.16L103.463 14.695C103.463 14.695 146.334 24.296 193.557 47.903L300.707 318.004H426.227L606.054 6.768H444.51Z" fill="white"/>
            </svg>
          </div>
      );
    case 'mastercard':
      return (
        <div className="h-8">
          <svg viewBox="0 0 1000 618" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full">
            <path d="M382.003 26.005C171.036 26.005 0 197.041 0 408.008C0 618.975 171.036 790.011 382.003 790.011C486.713 790.011 580.959 746.764 647.836 676.368C562.115 768.564 439.136 827.016 303.997 827.016C93.03 827.016 -78.006 655.98 -78.006 445.013C-78.006 234.046 93.03 63.01 303.997 63.01C439.136 63.01 562.115 121.462 647.836 213.658C580.959 143.262 486.713 26.005 382.003 26.005Z" fill="#EA001B"/>
            <path d="M1000 408.008C1000 618.975 828.964 790.011 617.997 790.011C513.287 790.011 419.041 746.764 352.164 676.368C437.885 768.564 560.864 827.016 696.003 827.016C906.97 827.016 1078.01 655.98 1078.01 445.013C1078.01 234.046 906.97 63.01 696.003 63.01C560.864 63.01 437.885 121.462 352.164 213.658C419.041 143.262 513.287 26.005 617.997 26.005C828.964 26.005 1000 197.041 1000 408.008Z" fill="#F79E1B"/>
          </svg>
        </div>
      );
    default:
      return (
        <div className="h-8 w-12 rounded bg-white/20 flex items-center justify-center">
          <CreditCard className="h-5 w-5 text-white" />
        </div>
      );
  }
};

// EMV Chip SVG Component
const EmvChip = () => (
  <svg width="45" height="35" viewBox="0 0 45 35" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-90">
    <rect x="1" y="1" width="43" height="33" rx="4" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M1 12H44" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M1 23H44" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M33 1L33 34" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 1L12 34" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const WalletPage = () => {
  const [currentBalance] = useState(2875.50);
  const [pendingBalance] = useState(450.75);
  const [selectedPayoutMethod, setSelectedPayoutMethod] = useState('bank');
  const [isRequestingPayout, setIsRequestingPayout] = useState(false);
  const [showCardNumber, setShowCardNumber] = useState<Record<number, boolean>>({});
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  // Dialog states
  const [isPayoutDialogOpen, setIsPayoutDialogOpen] = useState(false);
  const [isEditCardDialogOpen, setIsEditCardDialogOpen] = useState(false);
  const [isAllTransactionsDialogOpen, setIsAllTransactionsDialogOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState('');
  const [cardFormData, setCardFormData] = useState({
    holderName: mockCards[0].name,
    cardNumber: mockCards[0].fullNumber,
    expiry: mockCards[0].expiry,
    cvv: '',
    type: mockCards[0].type,
    isDefault: mockCards[0].isDefault
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const toggleCardNumber = (cardId: number) => {
    setShowCardNumber(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  // Event handlers
  const handlePayoutRequest = () => {
    if (!payoutAmount || parseFloat(payoutAmount) <= 0 || parseFloat(payoutAmount) > currentBalance) {
      return;
    }
    setIsRequestingPayout(true);
    // Simulate API call
    setTimeout(() => {
      setIsRequestingPayout(false);
      setIsPayoutDialogOpen(false);
      setPayoutAmount('');
    }, 1500);
  };

  const handleCardEdit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsEditCardDialogOpen(false);
    }, 1000);
  };

  const handleDeleteCard = () => {
    // Simulate API call
    setTimeout(() => {
      setIsEditCardDialogOpen(false);
    }, 1000);
  };

  const handleCardFormChange = (field: string, value: string | boolean) => {
    setCardFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const router = useRouter();

  return (
    <div className="p-3 sm:p-6 space-y-3 sm:space-y-6 max-w-[1200px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div className="w-full sm:w-auto">
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 mb-1 sm:mb-0">
            <Wallet className="h-6 w-6 sm:h-8 sm:w-8" />
            Wallet & Payouts
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your earnings and payment methods
          </p>
        </div>
        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2 mt-2 sm:mt-0">
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto h-12 sm:h-10 text-base sm:text-sm" 
            onClick={() => router.push('/wallet/add-payment')}
          >
            <Plus className="mr-2 h-5 w-5 sm:h-4 sm:w-4" />
            Add Payment Method
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                size="lg" 
                className="w-full sm:w-auto h-12 sm:h-10 text-base sm:text-sm"
              >
                Request Payout
                <ArrowUpRight className="ml-2 h-5 w-5 sm:h-4 sm:w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Request Payout</DialogTitle>
                <DialogDescription>
                  Request a payout of your available balance to your preferred payment method.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label>Amount</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      className="pl-9"
                      max={currentBalance}
                      value={payoutAmount}
                      onChange={(e) => setPayoutAmount(e.target.value)}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    Available balance: {formatCurrency(currentBalance)}
                  </p>
                </div>

                <div className="space-y-4">
                  <Label>Select Payment Method</Label>
                  <div className="grid gap-4">
                    {mockCards.map((card) => (
                      <div
                        key={card.id}
                        className={`relative p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedPayoutMethod === `card-${card.id}`
                            ? 'border-primary bg-primary/5'
                            : 'hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedPayoutMethod(`card-${card.id}`)}
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
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsPayoutDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handlePayoutRequest} disabled={isRequestingPayout}>
                  {isRequestingPayout ? 'Processing...' : 'Confirm Payout'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        <Card className="bg-gradient-to-br from-primary/90 to-primary">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-base sm:text-lg text-white">Available Balance</CardTitle>
            <CardDescription className="text-white/80">Ready to withdraw</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold text-white">{formatCurrency(currentBalance)}</span>
              <Badge variant="outline" className="ml-2 text-white border-white/30">ETB</Badge>
            </div>
            <div className="mt-3 pt-3 sm:mt-4 sm:pt-4 border-t border-white/20">
              <div className="flex items-center justify-between text-sm text-white/80">
                <span>Daily Limit</span>
                <span>{formatCurrency(5000)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pending Balance</CardTitle>
            <CardDescription>Processing payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{formatCurrency(pendingBalance)}</span>
              <Badge variant="outline" className="ml-2">ETB</Badge>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Expected clearance</span>
                <span>2-3 business days</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Monthly Earnings</CardTitle>
            <CardDescription>Current month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{formatCurrency(3250.25)}</span>
                <span className="text-green-500 text-sm flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +12.5%
                </span>
              </div>
              <Progress value={75} className="h-2" />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Previous Month</span>
                <span>{formatCurrency(2890.75)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Wallet and Transactions Row */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr,1fr] gap-3 sm:gap-6">
        {/* Recent Transactions */}
        <Card className="h-fit">
          <CardHeader className="pb-3 border-b space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
              <div>
                <CardTitle className="text-lg sm:text-xl font-semibold">Recent Transactions</CardTitle>
                <CardDescription className="text-sm mt-0.5 sm:mt-1">
                  Latest incoming and outgoing transactions
                </CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full sm:w-auto h-10 sm:h-9 hover:bg-primary hover:text-white transition-colors"
                  >
                    <LineChart className="h-5 w-5 sm:h-4 sm:w-4 mr-2" />
                    View All
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl h-[80vh]">
                  <DialogHeader>
                    <DialogTitle>All Transactions</DialogTitle>
                    <DialogDescription>
                      Complete history of your transactions
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mb-4">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-full h-11 sm:h-9 sm:w-[150px]">
                          <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="incoming">Incoming</SelectItem>
                          <SelectItem value="outgoing">Outgoing</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-full h-11 sm:h-9 sm:w-[150px]">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <Input
                        placeholder="Search transactions..."
                        className="w-full h-11 sm:h-9 sm:w-[200px]"
                      />
                      <Button 
                        variant="outline" 
                        className="w-full h-11 sm:h-9 sm:w-auto"
                      >
                        Export
                      </Button>
                    </div>
                  </div>
                  <div className="overflow-y-auto max-h-[calc(80vh-200px)]">
                    <div className="grid grid-cols-1 gap-3">
                      {[...mockTransactions, ...mockTransactions].map((transaction, index) => (
                        <div
                          key={`${transaction.id}-${index}`}
                          className="group flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-all duration-200 border cursor-pointer"
                          onClick={() => setSelectedTransaction(transaction)}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                              transaction.type === 'incoming' 
                                ? 'bg-green-100 text-green-600'
                                : 'bg-blue-100 text-blue-600'
                            }`}>
                              {transaction.type === 'incoming' 
                                ? <ArrowDownLeft className="h-6 w-6" />
                                : <ArrowUpRight className="h-6 w-6" />
                              }
                            </div>
                            <div>
                              <p className="font-medium text-lg">
                                {transaction.description}
                              </p>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>{formatDate(transaction.date)}</span>
                                <span>•</span>
                                <span>Transaction ID: #{transaction.id}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="flex flex-col items-end gap-1">
                              <p className={`font-medium text-lg ${
                                transaction.type === 'incoming'
                                  ? 'text-green-600'
                                  : 'text-blue-600'
                              }`}>
                                {transaction.type === 'incoming' ? '+' : '-'}
                                {formatCurrency(transaction.amount)}
                              </p>
                              <Badge 
                                variant={transaction.status === 'completed' ? 'default' : 'outline'}
                                className="text-xs"
                              >
                                {transaction.status}
                              </Badge>
                            </div>
                            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <ChevronRight className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <DialogFooter className="mt-4">
                    <div className="flex items-center justify-between w-full">
                      <div className="text-sm text-muted-foreground">
                        Showing 8 of 50 transactions
                      </div>
                      <Button variant="outline">
                        Load More
                      </Button>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3">
              {mockTransactions.slice(0, 3).map((transaction) => (
                <div
                  key={transaction.id}
                  className="group flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 cursor-pointer"
                  onClick={() => setSelectedTransaction(transaction)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      transaction.type === 'incoming' 
                        ? 'bg-green-100 text-green-600'
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {transaction.type === 'incoming' 
                        ? <ArrowDownLeft className="h-5 w-5" />
                        : <ArrowUpRight className="h-5 w-5" />
                      }
                    </div>
                    <div>
                      <p className="font-medium">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(transaction.date)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end gap-1">
                      <p className={`font-medium ${
                        transaction.type === 'incoming'
                          ? 'text-green-600'
                          : 'text-blue-600'
                      }`}>
                        {transaction.type === 'incoming' ? '+' : '-'}
                        {formatCurrency(transaction.amount)}
                      </p>
                      <Badge 
                        variant={transaction.status === 'completed' ? 'default' : 'outline'}
                        className="text-xs"
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Transaction Details Dialog */}
        <Dialog open={!!selectedTransaction} onOpenChange={(open) => !open && setSelectedTransaction(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Transaction Details</DialogTitle>
              <DialogDescription>
                Complete information about this transaction
              </DialogDescription>
            </DialogHeader>
            {selectedTransaction && (
              <div className="space-y-6">
                {/* Transaction Header */}
                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                    selectedTransaction.type === 'incoming' 
                      ? 'bg-green-100 text-green-600'
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {selectedTransaction.type === 'incoming' 
                      ? <ArrowDownLeft className="h-6 w-6" />
                      : <ArrowUpRight className="h-6 w-6" />
                    }
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{selectedTransaction.description}</h3>
                    <p className="text-sm text-muted-foreground">Transaction ID: #{selectedTransaction.id}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xl font-bold ${
                      selectedTransaction.type === 'incoming'
                        ? 'text-green-600'
                        : 'text-blue-600'
                    }`}>
                      {selectedTransaction.type === 'incoming' ? '+' : '-'}
                      {formatCurrency(selectedTransaction.amount)}
                    </p>
                    <Badge 
                      variant={selectedTransaction.status === 'completed' ? 'default' : 'outline'}
                      className="mt-1"
                    >
                      {selectedTransaction.status}
                    </Badge>
                  </div>
                </div>

                {/* Transaction Details */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">{formatDate(selectedTransaction.date)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Type</p>
                      <p className="font-medium capitalize">{selectedTransaction.type}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-medium capitalize">{selectedTransaction.status}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Payment Method</p>
                      <p className="font-medium">Bank Transfer</p>
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Transaction Notes</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedTransaction.type === 'incoming' 
                        ? 'Payment received for store sales and services.'
                        : 'Withdrawal to connected bank account.'}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <DialogFooter className="flex justify-between items-center gap-4 sm:gap-0">
                  <div className="flex gap-2">
                    <Button variant="outline">
                      Download Receipt
                    </Button>
                    <Button variant="outline">
                      Download Invoice
                    </Button>
                  </div>
                  <Button variant="default" onClick={() => setSelectedTransaction(null)}>
                    Close
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Credit Cards Section */}
        <Card className="h-fit bg-transparent border-none shadow-none">
          <CardHeader className="pb-3 border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold">My Card</CardTitle>
                <CardDescription className="text-sm mt-1">
                  Manage your payment method
                </CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="hover:bg-primary hover:text-white transition-colors">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Card Details</DialogTitle>
                    <DialogDescription>
                      Make changes to your card settings here.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCardEdit}>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label>Card Holder Name</Label>
                        <Input 
                          value={cardFormData.holderName}
                          onChange={(e) => handleCardFormChange('holderName', e.target.value)}
                          placeholder="Enter card holder name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Card Number</Label>
                        <div className="relative">
                          <Input 
                            value={cardFormData.cardNumber}
                            onChange={(e) => handleCardFormChange('cardNumber', e.target.value)}
                            placeholder="Enter card number"
                            type={showCardNumber[mockCards[0].id] ? "text" : "password"}
                          />
                          <button
                            type="button"
                            onClick={() => toggleCardNumber(mockCards[0].id)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showCardNumber[mockCards[0].id] ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Expiry Date</Label>
                          <Input 
                            value={cardFormData.expiry}
                            onChange={(e) => handleCardFormChange('expiry', e.target.value)}
                            placeholder="MM/YY"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>CVV</Label>
                          <Input 
                            value={cardFormData.cvv}
                            onChange={(e) => handleCardFormChange('cvv', e.target.value)}
                            type="password"
                            placeholder="•••"
                            maxLength={3}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Card Type</Label>
                        <Select 
                          value={cardFormData.type}
                          onValueChange={(value) => handleCardFormChange('type', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select card type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="visa">Visa</SelectItem>
                            <SelectItem value="mastercard">Mastercard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="default" 
                          checked={cardFormData.isDefault}
                          onCheckedChange={(checked) => handleCardFormChange('isDefault', checked)}
                        />
                        <Label htmlFor="default">Set as default payment method</Label>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" type="button" onClick={handleDeleteCard}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Card
                      </Button>
                      <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            {mockCards.map((card) => (
              <AnimatedCreditCard
                key={card.id}
                cardNumber={card.number}
                fullNumber={card.fullNumber}
                holderName={card.name}
                expiry={card.expiry}
                balance={card.balance}
                showNumber={showCardNumber[card.id]}
                onToggleNumber={() => toggleCardNumber(card.id)}
                type={card.type}
              />
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="analytics" className="space-y-4 sm:space-y-8">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px] h-[48px] sm:h-[40px] bg-muted/50 p-1 rounded-lg">
          <TabsTrigger value="analytics" className="h-full text-base sm:text-sm">
            <BarChart4 className="h-5 w-5 sm:h-4 sm:w-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="settings" className="h-full text-base sm:text-sm">
            <CreditCard className="h-5 w-5 sm:h-4 sm:w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <div className="space-y-4 sm:space-y-6">
            {/* Time Period Selector and Overview */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="space-y-1 w-full sm:w-auto">
                <h2 className="text-lg sm:text-2xl font-semibold tracking-tight">Analytics Dashboard</h2>
                <p className="text-sm text-muted-foreground">
                  Comprehensive overview of your financial performance and metrics
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <Select defaultValue="thisMonth">
                  <SelectTrigger className="w-full h-11 sm:h-9 sm:w-[180px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="thisWeek">This Week</SelectItem>
                    <SelectItem value="thisMonth">This Month</SelectItem>
                    <SelectItem value="lastQuarter">Last Quarter</SelectItem>
                    <SelectItem value="thisYear">This Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 h-11 sm:h-9 w-full sm:w-auto"
                >
                  <Download className="h-5 w-5 sm:h-4 sm:w-4" />
                  Export Report
                </Button>
              </div>
            </div>

            {/* Key Performance Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <Card className="relative overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <div className="text-2xl font-bold">{formatCurrency(24750.00)}</div>
                    <div className="text-sm text-green-600 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +12.5%
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500/20 via-green-500/40 to-green-500/20" />
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Success Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <div className="text-2xl font-bold">98.5%</div>
                    <div className="text-sm text-green-600 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +2.1%
                    </div>
                  </div>
                  <Progress value={98.5} className="h-1 mt-3" />
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Average Transaction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <div className="text-2xl font-bold">{formatCurrency(567.89)}</div>
                    <div className="text-sm text-blue-600 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +5.3%
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Based on {mockTransactions.length} transactions
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Active Customers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <div className="text-2xl font-bold">1,234</div>
                    <div className="text-sm text-green-600 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +8.7%
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Across all channels
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Category Performance</CardTitle>
                  <CardDescription>
                    Revenue distribution by business category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(mockChartData.categories).map(([category, percentage]) => (
                      <div key={category}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-primary" />
                            <span className="font-medium">{category}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">{formatCurrency(percentage * 100)}</span>
                            <Badge variant="secondary">{percentage}%</Badge>
                          </div>
                        </div>
                        <div className="relative">
                          <Progress value={percentage} className="h-2" />
                          <div className="absolute -right-0 -top-2 h-6 w-1 bg-primary rounded-full" 
                            style={{ opacity: percentage > 40 ? 1 : 0 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Transaction Analysis</CardTitle>
                  <CardDescription>
                    Detailed breakdown of transaction metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Success Rate</p>
                        <p className="text-2xl font-bold">98.5%</p>
                        <Progress value={98.5} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Chargeback Rate</p>
                        <p className="text-2xl font-bold">0.4%</p>
                        <Progress value={0.4} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Processing Time</p>
                        <p className="text-2xl font-bold">1.2s</p>
                        <Progress value={80} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Approval Rate</p>
                        <p className="text-2xl font-bold">99.1%</p>
                        <Progress value={99.1} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity and Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <CardTitle className="text-lg sm:text-xl">Recent Activity</CardTitle>
                      <CardDescription className="mt-0.5">Latest transactions and events</CardDescription>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full sm:w-auto h-10 sm:h-9 text-base sm:text-sm"
                    >
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockTransactions.slice(0, 4).map((transaction) => (
                      <div 
                        key={transaction.id} 
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border active:scale-[0.98]"
                      >
                        <div className="flex items-center gap-3 mb-2 sm:mb-0">
                          <div className={`flex items-center justify-center w-12 h-12 sm:w-10 sm:h-10 rounded-full ${
                            transaction.type === 'incoming' 
                              ? 'bg-green-100 text-green-600'
                              : 'bg-blue-100 text-blue-600'
                          }`}>
                            {transaction.type === 'incoming' 
                              ? <ArrowDownLeft className="h-6 w-6 sm:h-5 sm:w-5" />
                              : <ArrowUpRight className="h-6 w-6 sm:h-5 sm:w-5" />
                            }
                          </div>
                          <div>
                            <p className="font-medium text-base sm:text-sm line-clamp-1">{transaction.description}</p>
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-0.5">
                              <span className="text-sm sm:text-xs text-muted-foreground">{formatDate(transaction.date)}</span>
                              <span className="hidden sm:inline text-muted-foreground">•</span>
                              <Badge 
                                variant={transaction.status === 'completed' ? 'default' : 'outline'} 
                                className="text-xs h-5"
                              >
                                {transaction.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-3 pl-[60px] sm:pl-0">
                          <p className={`font-medium text-base sm:text-sm ${
                            transaction.type === 'incoming'
                              ? 'text-green-600'
                              : 'text-blue-600'
                          }`}>
                            {transaction.type === 'incoming' ? '+' : '-'}
                            {formatCurrency(transaction.amount)}
                          </p>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 sm:p-4 rounded-lg border bg-card">
                        <p className="text-sm text-muted-foreground mb-1">Peak Hour</p>
                        <p className="text-xl sm:text-2xl font-bold">2 PM</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Most active time</p>
                      </div>
                      <div className="p-3 sm:p-4 rounded-lg border bg-card">
                        <p className="text-sm text-muted-foreground mb-1">Best Day</p>
                        <p className="text-xl sm:text-2xl font-bold">Friday</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Highest revenue</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-medium mb-3">Quick Actions</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full h-11 sm:h-9 text-base sm:text-sm"
                        >
                          <Download className="h-5 w-5 sm:h-4 sm:w-4 mr-2" />
                          Export Data
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full h-11 sm:h-9 text-base sm:text-sm"
                        >
                          <Share className="h-5 w-5 sm:h-4 sm:w-4 mr-2" />
                          Share Report
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Insights</CardTitle>
                  <CardDescription>Important metrics and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Alert>
                      <TrendingUp className="h-4 w-4" />
                      <AlertTitle>Growth Trend</AlertTitle>
                      <AlertDescription>
                        Your revenue has increased by 23% compared to last month.
                      </AlertDescription>
                    </Alert>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg border bg-card">
                        <p className="text-sm text-muted-foreground">Peak Hour</p>
                        <p className="text-2xl font-bold">2 PM</p>
                        <p className="text-xs text-muted-foreground">Most active time</p>
                      </div>
                      <div className="p-4 rounded-lg border bg-card">
                        <p className="text-sm text-muted-foreground">Best Day</p>
                        <p className="text-2xl font-bold">Friday</p>
                        <p className="text-xs text-muted-foreground">Highest revenue</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-medium mb-2">Quick Actions</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Export Data
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                          <Share className="h-4 w-4 mr-2" />
                          Share Report
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid gap-3 sm:gap-6 grid-cols-1 lg:grid-cols-2">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-lg sm:text-xl">Payout Schedule</CardTitle>
                <CardDescription>
                  Configure automatic payout settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-base sm:text-sm">Minimum Payout Amount</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 sm:h-4 sm:w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      placeholder="Enter minimum amount"
                      className="pl-10 h-11 sm:h-9"
                      defaultValue={100}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Minimum amount required for automatic payout
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-base sm:text-sm">Payout Frequency</Label>
                  <Select defaultValue="monthly">
                    <SelectTrigger className="h-11 sm:h-9">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Important Note</AlertTitle>
                  <AlertDescription>
                    Automatic payouts are processed on the 1st and 15th of each month.
                    Make sure to keep your payment methods up to date.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your security preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-0.5 mb-2 sm:mb-0">
                    <p className="font-medium text-base sm:text-sm">Two-Factor Authentication</p>
                    <p className="text-sm sm:text-xs text-muted-foreground">
                      Add an extra layer of security
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full sm:w-auto h-11 sm:h-9 text-base sm:text-sm"
                  >
                    Enable
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-0.5 mb-2 sm:mb-0">
                    <p className="font-medium text-base sm:text-sm">Payment Notifications</p>
                    <p className="text-sm sm:text-xs text-muted-foreground">
                      Get notified about payment activities
                    </p>
                  </div>
                  <Button variant="outline" className="w-full sm:w-auto h-11 sm:h-9 text-base sm:text-sm">Configure</Button>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-0.5 mb-2 sm:mb-0">
                    <p className="font-medium text-base sm:text-sm">Transaction Limits</p>
                    <p className="text-sm sm:text-xs text-muted-foreground">
                      Set daily and monthly limits
                    </p>
                  </div>
                  <Button variant="outline" className="w-full sm:w-auto h-11 sm:h-9 text-base sm:text-sm">Adjust</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WalletPage; 