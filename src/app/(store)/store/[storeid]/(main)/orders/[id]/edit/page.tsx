'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Save,
  Plus,
  Trash2,
  Package,
  Search,
  CreditCard,
  Truck,
  AlertCircle,
  X,
  User2,
  FileText,
  ClipboardList,
  CircleDollarSign,
  ShoppingBag,
  StickyNote,
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

// Mock products data
const products = [
  { id: 'prod_1', name: 'Basic Cotton T-Shirt', sku: 'TSH-001', price: 29.99, stock: 150 },
  { id: 'prod_2', name: 'Leather Wallet', sku: 'WAL-001', price: 49.99, stock: 75 },
  { id: 'prod_3', name: 'Running Shoes', sku: 'SHO-001', price: 89.99, stock: 100 },
];

const formSchema = z.object({
  status: z.enum(['pending', 'processing', 'completed', 'cancelled']),
  customer: z.object({
    name: z.string().min(1, "Customer name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
  }),
  items: z.array(z.object({
    productId: z.string(),
    name: z.string(),
    quantity: z.number().min(1),
    price: z.number().min(0),
  })),
  shipping: z.object({
    address: z.string().min(1, "Shipping address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
    method: z.string().min(1, "Shipping method is required"),
  }),
  payment: z.object({
    method: z.string().min(1, "Payment method is required"),
    status: z.enum(['paid', 'pending', 'failed']),
  }),
  notes: z.string().optional(),
});

// First, define the proper types for payment
interface Payment {
  status: 'pending' | 'paid' | 'failed';
  method: string;
}

interface OrderDetails {
  id: string;
  orderNumber: string;
  status: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  shipping: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    method: string;
  };
  payment: Payment;
  notes: string | undefined;
}

const handleOrderUpdate = async (orderData: {
  id: string;
  status: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  shipping: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    method: string;
  };
  payment: Payment;
  notes?: string;
}) => {
  try {
    const response = await fetch(`/api/orders/${orderData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Failed to update order');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};

export default function OrderEditPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const router = useRouter();
  const [isAddingProduct, setIsAddingProduct] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [orderDetails, setOrderDetails] = React.useState<OrderDetails>({
    id: params.id,
    orderNumber: '#1001',
    status: 'processing',
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 890'
    },
    items: [
      {
        productId: 'prod_1',
        name: 'Basic Cotton T-Shirt',
        quantity: 2,
        price: 29.99,
      }
    ],
    shipping: {
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States',
      method: 'standard'
    },
    payment: {
      status: 'pending',
      method: 'credit_card'
    },
    notes: 'Please handle with care'
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: orderDetails.status as any,
      customer: orderDetails.customer,
      items: orderDetails.items,
      shipping: orderDetails.shipping,
      payment: orderDetails.payment,
      notes: orderDetails.notes,
    },
  });

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addProduct = (product: typeof products[0]) => {
    const currentItems = form.getValues('items');
    form.setValue('items', [
      ...currentItems,
      {
        productId: product.id,
        name: product.name,
        quantity: 1,
        price: product.price,
      }
    ]);
    setIsAddingProduct(false);
  };

  const removeProduct = (index: number) => {
    const currentItems = form.getValues('items');
    form.setValue('items', currentItems.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await handleOrderUpdate({
        id: params.id,
        ...data
      });
      toast.success('Order updated successfully');
    } catch (error) {
      toast.error('Failed to update order');
    }
  };

  const calculateTotal = () => {
    const items = form.getValues('items');
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="min-h-screen pb-20 sm:pb-0">
      {/* Header */}
      <div className="sticky top-0 z-40 w-full">
        <div className="absolute inset-0 bg-background/95 backdrop-blur-sm border-b sm:hidden" />
        
        <div className="relative">
          <div className="container flex h-14 sm:h-16 items-center justify-between py-2 sm:py-4">
            <div className="flex items-center gap-4">
              <Link href={`/orders/${params.id}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4" />
                <span className="font-medium sm:inline">Back</span>
              </Link>
              <div className="hidden sm:block font-semibold">Edit Order {orderDetails.orderNumber}</div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => router.push(`/orders/${params.id}`)}>
                <X className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Cancel</span>
              </Button>
              <Button size="sm" onClick={form.handleSubmit(onSubmit)}>
                <Save className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Save Changes</span>
              </Button>
            </div>
          </div>
          
          {/* Mobile Order Title */}
          <div className="sm:hidden px-4 py-3 border-b bg-background/95">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold">Order {orderDetails.orderNumber}</h1>
              <Badge variant="secondary" className="h-6">
                {orderDetails.status.charAt(0).toUpperCase() + orderDetails.status.slice(1)}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4 sm:py-6 px-4 sm:px-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6 max-w-[1200px] mx-auto">
            {/* Mobile Navigation Tabs */}
          

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Customer Information */}
              <Card id="customer-info">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User2 className="h-5 w-5" />
                    <span>Customer Information</span>
                  </CardTitle>
                  <CardDescription>Manage customer details and contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="customer.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="customer.email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="customer.phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input type="tel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Order Status & Payment */}
              <Card id="order-status">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CircleDollarSign className="h-5 w-5" />
                    <span>Order Status & Payment</span>
                  </CardTitle>
                  <CardDescription>Manage order status and payment information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Order Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="payment.method"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Payment Method</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select method" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="credit_card">Credit Card</SelectItem>
                              <SelectItem value="paypal">PayPal</SelectItem>
                              <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="payment.status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Payment Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="paid">Paid</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="failed">Failed</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card id="order-items" className="lg:col-span-2">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5" />
                      <div>
                        <CardTitle>Order Items</CardTitle>
                        <CardDescription>Manage products in this order</CardDescription>
                      </div>
                    </div>
                    <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
                      <DialogTrigger asChild>
                        <Button className="w-full sm:w-auto">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Product
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Add Product to Order</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="flex items-center gap-2">
                            <Search className="w-4 h-4 text-muted-foreground" />
                            <Input 
                              placeholder="Search products..." 
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="flex-1"
                            />
                          </div>
                          <div className="space-y-2 max-h-[300px] overflow-y-auto">
                            {filteredProducts.map((product) => (
                              <div
                                key={product.id}
                                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                                onClick={() => addProduct(product)}
                              >
                                <div>
                                  <div className="font-medium">{product.name}</div>
                                  <div className="text-sm text-muted-foreground">SKU: {product.sku}</div>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium">${product.price.toFixed(2)}</div>
                                  <div className="text-sm text-muted-foreground">{product.stock} in stock</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Desktop Table View */}
                  <div className="hidden sm:block overflow-x-auto -mx-6 px-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead className="w-[100px] text-right">Quantity</TableHead>
                          <TableHead className="w-[100px] text-right">Price</TableHead>
                          <TableHead className="w-[100px] text-right">Total</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {form.watch('items').map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell className="text-right">
                              <Input
                                type="number"
                                className="w-20 ml-auto"
                                value={item.quantity}
                                onChange={(e) => {
                                  const newItems = [...form.getValues('items')];
                                  newItems[index].quantity = parseInt(e.target.value) || 1;
                                  form.setValue('items', newItems);
                                }}
                                min="1"
                              />
                            </TableCell>
                            <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                            <TableCell className="text-right font-medium">
                              ${(item.quantity * item.price).toFixed(2)}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeProduct(index)}
                                className="h-8 w-8 p-0 float-right"
                              >
                                <Trash2 className="h-4 w-4 text-muted-foreground" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      <TableRow className="border-t border-t-2">
                        <TableCell colSpan={3} className="text-right font-medium">
                          Total Amount
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          ${calculateTotal().toFixed(2)}
                        </TableCell>
                        <TableCell />
                      </TableRow>
                    </Table>
                  </div>

                  {/* Mobile Items View */}
                  <div className="sm:hidden space-y-3">
                    {form.watch('items').length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        No items added to this order yet.
                      </div>
                    ) : (
                      form.watch('items').map((item, index) => (
                        <div key={index} className="bg-card rounded-lg border">
                          <div className="p-4 flex items-center justify-between border-b">
                            <div className="font-medium">{item.name}</div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeProduct(index)}
                              className="h-8 w-8 p-0"
                            >
                              <Trash2 className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>
                          <div className="p-4 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <div className="text-sm text-muted-foreground mb-1.5">Quantity</div>
                                <Input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => {
                                    const newItems = [...form.getValues('items')];
                                    newItems[index].quantity = parseInt(e.target.value) || 1;
                                    form.setValue('items', newItems);
                                  }}
                                  min="1"
                                  className="h-9"
                                />
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground mb-1.5">Price</div>
                                <div className="h-9 flex items-center font-medium">
                                  ${item.price.toFixed(2)}
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between items-center pt-3 border-t">
                              <span className="text-sm font-medium">Total</span>
                              <span className="font-medium">
                                ${(item.quantity * item.price).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Information */}
              <Card id="shipping-info">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    <span>Shipping Information</span>
                  </CardTitle>
                  <CardDescription>Manage shipping details and delivery method</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="shipping.method"
                      render={({ field }) => (
                        <FormItem className="w-full sm:w-[300px]">
                          <FormLabel>Shipping Method</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select shipping method" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="standard">Standard Shipping (5-7 days)</SelectItem>
                              <SelectItem value="express">Express Shipping (2-3 days)</SelectItem>
                              <SelectItem value="overnight">Overnight Shipping</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="shipping.address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="shipping.city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="shipping.state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="shipping.postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Postal Code</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="shipping.country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Notes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <StickyNote className="h-5 w-5" />
                    <span>Additional Notes</span>
                  </CardTitle>
                  <CardDescription>Add any special instructions or notes for this order</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Add any additional notes here..."
                            className="min-h-[100px] resize-y"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Mobile Submit Button */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t sm:hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Total Amount</span>
                <span className="font-medium">${calculateTotal().toFixed(2)}</span>
              </div>
              <Button className="w-full" size="lg" onClick={form.handleSubmit(onSubmit)}>
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
} 