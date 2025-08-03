'use client';

import { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Plus,
  Package,
  Trash2,
  User,
  MapPin,
  CreditCard,
  Info,
  Store,
  Globe,
  Phone
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";

interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  orders: number;
}

// Add these sample data
const sampleProducts = [
  { id: '1', name: 'Premium T-Shirt', price: 29.99, sku: 'TS-001', stock: 150, image: '/shirt.jpg' },
  { id: '2', name: 'Classic Jeans', price: 59.99, sku: 'JN-001', stock: 80, image: '/jeans.jpg' },
  // Add more products...
];

const sampleCustomers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+1 234-567-8900', orders: 5 },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '+1 234-567-8901', orders: 3 },
  // Add more customers...
];

export default function CreateOrderPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [note, setNote] = useState('');
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  const [isProductSearchOpen, setIsProductSearchOpen] = useState(false);
  const [isCustomerSearchOpen, setIsCustomerSearchOpen] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1; // 10% tax
  const shipping = 10; // Fixed shipping rate
  const total = subtotal + tax + shipping;

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="sticky top-0 z-10 ">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold">Create new order</h1>
                <p className="text-sm text-gray-500">Draft • Last saved 2 mins ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
            <Button variant="outline" className="flex-1">
                Save as draft
              </Button>


              
              <Button variant="outline">Cancel</Button>
              <Button>Create order</Button>

            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Customer Selection */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Customer</CardTitle>
                    <CardDescription>Select or create a new customer</CardDescription>
                  </div>
                  {selectedCustomer && (
                    <Badge variant="secondary" className="font-normal">
                      {selectedCustomer.orders} previous orders
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <Popover open={isCustomerSearchOpen} onOpenChange={setIsCustomerSearchOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={isCustomerSearchOpen}
                      className="w-full justify-start text-left font-normal"
                    >
                      <User className="mr-2 h-4 w-4" />
                      {selectedCustomer ? selectedCustomer.name : "Search customers..."}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search customers..." />
                      <CommandEmpty>No customer found.</CommandEmpty>
                      <CommandGroup>
                        <ScrollArea className="h-[200px]">
                          {sampleCustomers.map((customer) => (
                            <CommandItem
                              key={customer.id}
                              onSelect={() => {
                                setSelectedCustomer(customer);
                                setIsCustomerSearchOpen(false);
                              }}
                              className="flex items-center gap-2 p-2"
                            >
                              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                {customer.name.charAt(0)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium">{customer.name}</p>
                                <p className="text-sm text-gray-500 truncate">
                                  {customer.email}
                                </p>
                              </div>
                              <Badge variant="secondary" className="ml-auto">
                                {customer.orders} orders
                              </Badge>
                            </CommandItem>
                          ))}
                        </ScrollArea>
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>

                {selectedCustomer && (
                  <div className="mt-4">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-medium">
                        {selectedCustomer.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{selectedCustomer.name}</h3>
                          <Badge variant="secondary" className="font-normal">
                            {selectedCustomer.orders} orders
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-500 space-y-1">
                          <p>{selectedCustomer.email}</p>
                          <p>{selectedCustomer.phone}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Products */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Products</CardTitle>
                    <CardDescription>Add products to this order</CardDescription>
                  </div>
                  <Badge variant="secondary" className="font-normal">
                    {items.length} items
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Popover open={isProductSearchOpen} onOpenChange={setIsProductSearchOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={isProductSearchOpen}
                      className="w-full justify-start text-left font-normal"
                    >
                      <Search className="mr-2 h-4 w-4" />
                      Search products...
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search products..." />
                      <CommandEmpty>No products found.</CommandEmpty>
                      <CommandGroup>
                        <ScrollArea className="h-[300px]">
                          {sampleProducts.map((product) => (
                            <CommandItem
                              key={product.id}
                              onSelect={() => {
                                setItems([...items, { 
                                  id: Math.random().toString(),
                                  productId: product.id,
                                  name: product.name,
                                  price: product.price,
                                  quantity: 1,
                                  image: product.image
                                }]);
                                setIsProductSearchOpen(false);
                              }}
                              className="flex items-center gap-3 p-2"
                            >
                              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <Package className="h-5 w-5 text-gray-500" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium">{product.name}</p>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <span>${product.price}</span>
                                  <span>•</span>
                                  <span>SKU: {product.sku}</span>
                                </div>
                              </div>
                              <Badge variant="secondary">
                                {product.stock} in stock
                              </Badge>
                            </CommandItem>
                          ))}
                        </ScrollArea>
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>

                {/* Product List */}
                <div className="mt-4 space-y-3">
                  {items.map((item) => (
                    <div 
                      key={item.id}
                      className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <Package className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">${item.price.toFixed(2)}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 w-8 rounded-r-none"
                            onClick={() => {
                              setItems(items.map(i => 
                                i.id === item.id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i
                              ));
                            }}
                          >
                            -
                          </Button>
                          <Input 
                            type="number" 
                            value={item.quantity}
                            onChange={(e) => {
                              const newQuantity = parseInt(e.target.value);
                              if (newQuantity > 0) {
                                setItems(items.map(i => 
                                  i.id === item.id ? { ...i, quantity: newQuantity } : i
                                ));
                              }
                            }}
                            className="w-14 h-8 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 w-8 rounded-l-none"
                            onClick={() => {
                              setItems(items.map(i => 
                                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                              ));
                            }}
                          >
                            +
                          </Button>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-600 h-8"
                          onClick={() => setItems(items.filter(i => i.id !== item.id))}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Shipping address</CardTitle>
                <CardDescription>Enter the delivery address</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label>Street address</Label>
                    <Input 
                      value={shippingAddress.street}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                    />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <Label>City</Label>
                      <Input 
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>State</Label>
                      <Input 
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>ZIP code</Label>
                      <Input 
                        value={shippingAddress.zipCode}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Country</Label>
                    <Select 
                      value={shippingAddress.country}
                      onValueChange={(value) => setShippingAddress({ ...shippingAddress, country: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary - Enhanced version */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Order summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Subtotal ({items.length} items)</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="flex items-center gap-1 text-gray-500">
                            Tax (10%)
                            <Info className="h-3 w-3" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Calculated based on shipping address</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center font-medium">
                    <span>Total</span>
                    <span className="text-lg">${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Payment</CardTitle>
                <CardDescription>Select payment method</CardDescription>
              </CardHeader>
              <CardContent>
                <Select defaultValue="card">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">Credit Card</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Sales Channels */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Sales channels</CardTitle>
                <CardDescription>Select which channels to sell through</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Globe className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="text-sm font-medium">Online Store</span>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Store className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="text-sm font-medium">Point of Sale</span>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  
                  
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Order note</CardTitle>
                <CardDescription>Add a note to this order</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea 
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Enter note..."
                  className="min-h-[100px]"
                />
              </CardContent>
            </Card>

            
          </div>
        </div>
      </div>
    </div>
  );
} 