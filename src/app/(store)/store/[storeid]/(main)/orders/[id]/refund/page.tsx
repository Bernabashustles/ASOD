'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Info, 
  Package,
  RefreshCcw,
  DollarSign,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Helper function to format currency
const formatCurrency = (value: number) => {
  return `ETB ${value.toFixed(2)}`;
};

export default function RefundPage() {
  const router = useRouter();
  const { id } = useParams();
  const [refundAmount, setRefundAmount] = useState('0.00');
  const [refundReason, setRefundReason] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock order details
  const orderDetails = {
    id: '1004',
    items: [
      {
        id: '1',
        name: 'test',
        variant: 'Bardot / Unisex',
        price: 4600.00,
        quantity: 1,
        image: '/placeholder-product.png'
      }
    ],
    totalAmount: 4600.00,
    availableForRefund: 4600.00
  };

  // Update refund amount when items are selected
  useEffect(() => {
    if (selectedItems.length > 0) {
      const total = orderDetails.items
        .filter(item => selectedItems.includes(item.id))
        .reduce((sum, item) => sum + item.price, 0);
      setRefundAmount(total.toFixed(2));
    } else {
      setRefundAmount('0.00');
    }
  }, [selectedItems]);

  const handleItemSelection = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleRefund = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      router.push(`/orders/${id}`);
    }, 800);
  };

  return (
    <div className="w-full">
      {/* Breadcrumb and header */}
      <div className="border-b pb-5">
        <div className="container">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/orders" className="hover:text-primary">Orders</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/orders/${id}`} className="hover:text-primary">Order #{orderDetails.id}</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Refund</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href={`/orders/${id}`}>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-semibold">Process Refund</h1>
              <Badge variant="outline" className="ml-2">
                #{orderDetails.id}
              </Badge>
            </div>
            
            <Link href={`/orders/${id}/return`}>
              <Button variant="outline" className="flex items-center gap-2">
                <RefreshCcw className="h-4 w-4" />
                Create Return Instead
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main content with background */}
      <div className="bg-gray-50 py-6">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="md:col-span-2">
              <Tabs defaultValue="items" className="mb-6">
                <TabsList className="w-full grid grid-cols-2 bg-muted/30">
                  <TabsTrigger value="items">Order Items</TabsTrigger>
                  <TabsTrigger value="reason">Refund Reason</TabsTrigger>
                </TabsList>

                <TabsContent value="items" className="pt-6">
                  {orderDetails.items.map((item) => (
                    <div key={item.id} className="flex items-center border rounded-md mb-4 p-4 bg-white">
                      <div className="flex-1 flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" />
                          ) : (
                            <Package className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">{item.variant}</div>
                          <div className="text-sm">{formatCurrency(item.price)} × {item.quantity}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Input 
                          type="number"
                          min="0"
                          max={item.quantity}
                          value={selectedItems.includes(item.id) ? "1" : "0"}
                          onChange={(e) => {
                            if (parseInt(e.target.value) > 0) {
                              if (!selectedItems.includes(item.id)) {
                                handleItemSelection(item.id);
                              }
                            } else {
                              if (selectedItems.includes(item.id)) {
                                handleItemSelection(item.id);
                              }
                            }
                          }}
                          className="w-16 text-center mr-2"
                        />
                        <span className="text-sm text-muted-foreground">/ {item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="reason" className="pt-6">
                  <div className="mb-5 bg-white p-6 rounded-md border">
                    <div className="flex items-center gap-2 mb-4">
                      <Info className="h-5 w-5 text-amber-500" />
                      <h2 className="text-lg font-medium">Reason for Refund</h2>
                    </div>
                    <Textarea 
                      placeholder="Enter detailed reason for refund..."
                      value={refundReason}
                      onChange={(e) => setRefundReason(e.target.value)}
                      className="min-h-[180px] resize-none"
                    />
                    <div className="text-sm text-muted-foreground mt-2 flex items-center gap-1.5">
                      <Info className="h-3.5 w-3.5" />
                      <span>Only you and other staff can see this reason</span>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="text-center text-sm text-muted-foreground mt-8 p-4 bg-white rounded-md border">
                Need help? Learn more about <Link href="#" className="text-blue-600 hover:underline">refunding orders</Link>
              </div>
            </div>

            {/* Sidebar / Summary */}
            <div>
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-6">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                    <h2 className="text-lg font-medium">Refund Summary</h2>
                  </div>
                  
                  {selectedItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-6 text-center space-y-3">
                      <Package className="h-10 w-10 text-gray-300" />
                      <div className="text-muted-foreground">No items selected for refund</div>
                    </div>
                  ) : (
                    <div className="mb-6">
                      <div className="text-muted-foreground mb-2">Selected items:</div>
                      {orderDetails.items
                        .filter(item => selectedItems.includes(item.id))
                        .map(item => (
                          <div key={item.id} className="flex justify-between py-1">
                            <span>{item.name} × 1</span>
                            <span>{formatCurrency(item.price)}</span>
                          </div>
                        ))
                      }
                    </div>
                  )}

                  <div className="border-t pt-4 pb-2 space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Refund amount</h3>
                      <Badge className="mb-2 bg-gray-100 text-gray-600 font-normal">Manual</Badge>
                      <div className="relative">
                        <div className="absolute left-0 inset-y-0 flex items-center px-3 pointer-events-none">
                          <span className="text-gray-500">ETB</span>
                        </div>
                        <Input 
                          type="text"
                          value={refundAmount}
                          onChange={(e) => setRefundAmount(e.target.value)}
                          className="pl-12"
                        />
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">
                        {formatCurrency(orderDetails.availableForRefund)} available for refund
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 mt-4"
                      onClick={handleRefund}
                      disabled={parseFloat(refundAmount) <= 0 || isSubmitting}
                    >
                      {isSubmitting ? "Processing..." : `Refund ETB ${parseFloat(refundAmount).toFixed(2)}`}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 