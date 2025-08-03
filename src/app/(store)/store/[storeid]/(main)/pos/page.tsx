'use client';

import React, { useState } from 'react';
import { 
  Search,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Wallet,
  Receipt,
  User,
  Package,
  Percent,
  X,
  ChevronRight,
  Clock,
  DollarSign,
  Filter,
  LayoutGrid,
  List,
  Tags,
  History,
  MoreVertical,
  Banknote,
  Smartphone,
  Gift,
  AlertCircle,
  ChevronDown,
  Printer,
  Calculator,
  Settings,
  HelpCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  category: string;
  sku: string;
  stock: number;
  barcode?: string;
}

interface CartItem extends Product {
  quantity: number;
}

const categories = [
  'All Products',
  'Featured',
  'Electronics',
  'Clothing',
  'Accessories',
  'Home & Living',
  'Books',
  'Sports'
];

const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Earbuds',
    price: 129.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&auto=format&fit=crop',
    sku: 'WE-001',
    stock: 45,
    barcode: '123456789'
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 199.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop',
    sku: 'SW-002',
    stock: 28,
    barcode: '987654321'
  },
  // Add more products...
];

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState<number>(0);

  const addToCart = (product: Product) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id);
      if (existingItem) {
        return currentCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, change: number) => {
    setCart(currentCart =>
      currentCart.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(currentCart => currentCart.filter(item => item.id !== productId));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.15; // 15% tax

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.barcode?.includes(searchQuery);
    const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const calculateDiscount = () => {
    if (discountType === 'percentage') {
      return subtotal * (discountValue / 100);
    }
    return discountValue;
  };

  const discount = calculateDiscount();
  const total = subtotal + tax - discount;

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b">
        <div className="flex h-14 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-medium">Point of Sale</h1>
            <div className="h-6 w-px bg-gray-200" />
            <Select defaultValue="main-register">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select register" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main-register">Main Register</SelectItem>
                <SelectItem value="register-2">Register 2</SelectItem>
                <SelectItem value="mobile-pos">Mobile POS</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Calculator className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Printer className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <HelpCircle className="w-4 h-4" />
            </Button>
            <div className="h-6 w-px bg-gray-200" />
            <Button variant="outline" size="sm">
              <History className="w-4 h-4 mr-2" />
              Orders
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Sale
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-4 sm:gap-6">
          {/* Products Section */}
          <div className="bg-white border rounded-lg overflow-hidden flex flex-col">
            {/* Search and Filters */}
            <div className="p-4 border-b space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, SKU, or scan barcode..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
                <div className="flex items-center rounded-lg border p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode('grid')}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="w-full overflow-auto">
                <div className="flex gap-2 pb-2 min-w-max">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      onClick={() => setSelectedCategory(category)}
                      className="whitespace-nowrap"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <ScrollArea className="flex-1">
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
                  {filteredProducts.map((product) => (
                    <Card 
                      key={product.id}
                      className="cursor-pointer hover:border-blue-500 transition-colors"
                      onClick={() => addToCart(product)}
                    >
                      <CardContent className="p-4">
                        <div className="aspect-square rounded-lg bg-gray-100 mb-3 overflow-hidden relative">
                          {product.image ? (
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Package className="w-full h-full p-4 text-gray-400" />
                          )}
                          {product.stock < 5 && (
                            <div className="absolute top-2 right-2 bg-red-100 text-red-700 text-xs px-2 py-1 rounded">
                              Low Stock
                            </div>
                          )}
                        </div>
                        <div className="space-y-1">
                          <div className="font-medium truncate">{product.name}</div>
                          <div className="text-sm text-gray-500">SKU: {product.sku}</div>
                          <div className="flex items-center justify-between">
                            <div className="font-medium">${product.price.toFixed(2)}</div>
                            <div className="text-sm text-gray-500">{product.stock} in stock</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="p-4">
                  <table className="w-full">
                    <thead>
                      <tr className="text-sm text-gray-500">
                        <th className="text-left pb-4">Product</th>
                        <th className="text-left pb-4">SKU</th>
                        <th className="text-right pb-4">Price</th>
                        <th className="text-right pb-4">Stock</th>
                        <th className="text-right pb-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredProducts.map((product) => (
                        <tr 
                          key={product.id}
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => addToCart(product)}
                        >
                          <td className="py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden">
                                {product.image ? (
                                  <img 
                                    src={product.image} 
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <Package className="w-full h-full p-2 text-gray-400" />
                                )}
                              </div>
                              <div>
                                <div className="font-medium">{product.name}</div>
                                <div className="text-sm text-gray-500">{product.category}</div>
                              </div>
                            </div>
                          </td>
                          <td className="text-sm text-gray-500">{product.sku}</td>
                          <td className="text-right font-medium">${product.price.toFixed(2)}</td>
                          <td className="text-right text-sm">
                            <span className={product.stock < 5 ? 'text-red-600' : 'text-gray-500'}>
                              {product.stock} units
                            </span>
                          </td>
                          <td className="text-right">
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </ScrollArea>
          </div>

          {/* Cart Section */}
          <div className="bg-white border rounded-lg flex flex-col">
            {/* Cart Header */}
            <div className="p-4 border-b space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Current Sale</h2>
                <Button variant="outline" size="sm" className="gap-2">
                  <Clock className="w-4 h-4" />
                  Hold
                </Button>
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Walk-in Customer</span>
                <Button variant="ghost" size="sm" className="ml-auto">
                  Change
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Cart Items */}
            <ScrollArea className="flex-1 p-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <ShoppingCart className="w-12 h-12 text-gray-300 mb-3" />
                  <h3 className="text-lg font-medium text-gray-900">Cart is empty</h3>
                  <p className="text-sm text-gray-500">Add products to begin a sale</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-start gap-3">
                      <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Package className="w-full h-full p-2 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{item.name}</div>
                        <div className="text-sm text-gray-500">${item.price.toFixed(2)}</div>
                        <div className="flex items-center gap-2 mt-2">
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 mt-2 text-red-600 hover:text-red-700"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            {/* Cart Actions */}
            <div className="border-t p-4 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="gap-2">
                  <Gift className="w-4 h-4" />
                  Add Gift Card
                </Button>
                <Button variant="outline" className="gap-2">
                  <Tags className="w-4 h-4" />
                  Add Discount
                </Button>
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (15%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Options */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full gap-2" disabled={cart.length === 0}>
                    <DollarSign className="w-4 h-4" />
                    Charge ${total.toFixed(2)}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Payment Method</DialogTitle>
                    <DialogDescription>
                      Select how you would like to process the payment
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-24 flex flex-col gap-2">
                      <CreditCard className="w-6 h-6" />
                      Card
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col gap-2">
                      <Banknote className="w-6 h-6" />
                      Cash
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col gap-2">
                      <Smartphone className="w-6 h-6" />
                      Mobile Payment
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col gap-2">
                      <Gift className="w-6 h-6" />
                      Gift Card
                    </Button>
                  </div>
                  <DialogFooter className="flex-col gap-2">
                    <Button variant="outline" className="w-full gap-2">
                      <Receipt className="w-4 h-4" />
                      Print Receipt
                    </Button>
                    <Button variant="outline" className="w-full gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Email Receipt
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 