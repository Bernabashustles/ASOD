'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  X,
  Store,
  Globe,
  Info,
  Calendar,
  Clock,
  Search,
  ChevronRight,
  Plus
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea";

export default function AddDiscountPage() {
  const [discountMethod, setDiscountMethod] = useState<'percentage' | 'fixed' | 'shipping'>('percentage');
  const [code, setCode] = useState('');
  const [value, setValue] = useState('');
  const [minimumRequirements, setMinimumRequirements] = useState<'none' | 'amount' | 'quantity'>('none');
  const [minimumAmount, setMinimumAmount] = useState('');
  const [minimumQuantity, setMinimumQuantity] = useState('');
  const [customerEligibility, setCustomerEligibility] = useState<'all' | 'specific'>('all');
  const [appliesTo, setAppliesTo] = useState<'all' | 'specific'>('all');
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showProductSelector, setShowProductSelector] = useState(false);
  const [usageLimits, setUsageLimits] = useState({
    totalUses: false,
    perCustomer: false
  });
  const [combinations, setCombinations] = useState({
    products: false,
    shipping: false,
    orders: false
  });
  const [activeDate, setActiveDate] = useState(new Date().toISOString().split('T')[0]);
  const [activeTime, setActiveTime] = useState('00:00');
  const [hasEndDate, setHasEndDate] = useState(false);
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('23:59');
  const [salesChannels, setSalesChannels] = useState({
    online: true,
    pos: false
  });
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);

  // Mock products data
  const products = [
    { id: '1', title: 'Basic Cotton T-Shirt', collection: 'Summer Collection' },
    { id: '2', title: 'Leather Wallet', collection: 'Accessories' },
    { id: '3', title: 'Running Shoes', collection: 'Footwear' }
  ];

  // Mock collections data
  const collections = [
    { id: '1', title: 'Summer Collection', productCount: 24 },
    { id: '2', title: 'Accessories', productCount: 15 },
    { id: '3', title: 'Footwear', productCount: 18 }
  ];

  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCode(result);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen ">
      {/* Header - Made responsive */}
      <div className="sticky top-0 z-20 ">
        <div className="max-w-[1000px] mx-auto px-4 md:px-6 py-3">
          <div className="bg-white border rounded-lg shadow-sm">
            <div className="flex h-14 items-center justify-between px-3 md:px-4">
              <div className="flex items-center gap-2 md:gap-3">
                <Link href="/discounts">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                <h1 className="text-base md:text-lg font-medium">Create discount</h1>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Discard</Button>
                <Button size="sm" className="bg-black hover:bg-black/90">Save</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Main Grid - Made responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Discount Code */}
            <Card>
              <CardHeader className="p-4 md:p-6 pb-0">
                <CardTitle className="text-base">Discount code</CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <Input
                      value={code}
                      onChange={(e) => setCode(e.target.value.toUpperCase())}
                      placeholder="e.g. SUMMER2024"
                      className="uppercase"
                    />
                  </div>
                  <Button 
                    variant="outline"
                    onClick={generateRandomCode}
                    className="w-full sm:w-auto"
                  >
                    Generate code
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Customers will enter this code at checkout
                </p>
              </CardContent>
            </Card>

            {/* Title, Description & Image */}
            <Card>
              <CardHeader className="p-4 md:p-6 pb-0">
                <CardTitle className="text-base">Details</CardTitle>
                <CardDescription>
                  Add information about your discount
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 md:p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Summer Sale 2024"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your discount..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Image</Label>
                  <div className="border rounded-lg p-4">
                    {image ? (
                      <div className="space-y-4">
                        <div className="aspect-video rounded-lg bg-gray-100 relative">
                          <img
                            src={URL.createObjectURL(image)}
                            alt="Preview"
                            className="rounded-lg object-cover w-full h-full"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white"
                            onClick={() => setImage(null)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="mt-2">
                          <input
                            id="image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                          <label
                            htmlFor="image"
                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium bg-white border rounded-lg cursor-pointer hover:bg-gray-50"
                          >
                            Choose image
                          </label>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Recommended: 1200x600px, max 2MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Discount Value */}
            <Card>
              <CardHeader className="p-4 md:p-6 pb-0">
                <CardTitle className="text-base">Value</CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="space-y-4">
                  <RadioGroup
                    value={discountMethod}
                    onValueChange={(value) => setDiscountMethod(value as 'percentage' | 'fixed' | 'shipping')}
                    className="grid gap-4"
                  >
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem value="percentage" id="percentage" className="mt-1" />
                      <div className="flex-1 space-y-2">
                        <label
                          htmlFor="percentage"
                          className="text-sm font-medium leading-none"
                        >
                          Percentage
                        </label>
                        {discountMethod === 'percentage' && (
                          <div className="relative w-[120px]">
                            <Input
                              type="number"
                              value={value}
                              onChange={(e) => setValue(e.target.value)}
                              className="pr-8"
                              placeholder="0"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                              %
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem value="fixed" id="fixed" className="mt-1" />
                      <div className="flex-1 space-y-2">
                        <label
                          htmlFor="fixed"
                          className="text-sm font-medium leading-none"
                        >
                          Fixed amount
                        </label>
                        {discountMethod === 'fixed' && (
                          <div className="relative w-[120px]">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                              $
                            </span>
                            <Input
                              type="number"
                              value={value}
                              onChange={(e) => setValue(e.target.value)}
                              className="pl-7"
                              placeholder="0.00"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem value="shipping" id="shipping" className="mt-1" />
                      <div className="space-y-1">
                        <label
                          htmlFor="shipping"
                          className="text-sm font-medium leading-none"
                        >
                          Free shipping
                        </label>
                        <p className="text-sm text-gray-500">
                          Removes shipping charges from order
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Minimum Requirements */}
            <Card>
              <CardHeader className="p-4 md:p-6 pb-0">
                <CardTitle className="text-base">Minimum requirements</CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <RadioGroup
                  value={minimumRequirements}
                  onValueChange={(value) => setMinimumRequirements(value as 'none' | 'amount' | 'quantity')}
                  className="space-y-4"
                >
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="none" id="none" className="mt-1" />
                    <div className="space-y-1">
                      <label
                        htmlFor="none"
                        className="text-sm font-medium leading-none"
                      >
                        No minimum requirements
                      </label>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="amount" id="amount" className="mt-1" />
                    <div className="flex-1 space-y-2">
                      <label
                        htmlFor="amount"
                        className="text-sm font-medium leading-none"
                      >
                        Minimum purchase amount
                      </label>
                      {minimumRequirements === 'amount' && (
                        <div className="relative w-[120px]">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            $
                          </span>
                          <Input
                            type="number"
                            value={minimumAmount}
                            onChange={(e) => setMinimumAmount(e.target.value)}
                            className="pl-7"
                            placeholder="0.00"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="quantity" id="quantity" className="mt-1" />
                    <div className="flex-1 space-y-2">
                      <label
                        htmlFor="quantity"
                        className="text-sm font-medium leading-none"
                      >
                        Minimum quantity of items
                      </label>
                      {minimumRequirements === 'quantity' && (
                        <Input
                          type="number"
                          value={minimumQuantity}
                          onChange={(e) => setMinimumQuantity(e.target.value)}
                          className="w-[120px]"
                          placeholder="0"
                        />
                      )}
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Customer Eligibility */}
            <Card>
              <CardHeader className="p-4 md:p-6 pb-0">
                <CardTitle className="text-base">Customer eligibility</CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <RadioGroup
                  value={customerEligibility}
                  onValueChange={(value) => setCustomerEligibility(value as 'all' | 'specific')}
                  className="space-y-4"
                >
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="all" id="all-customers" className="mt-1" />
                    <div className="space-y-1">
                      <label
                        htmlFor="all-customers"
                        className="text-sm font-medium leading-none"
                      >
                        All customers
                      </label>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="specific" id="specific-customers" className="mt-1" />
                    <div className="space-y-1">
                      <label
                        htmlFor="specific-customers"
                        className="text-sm font-medium leading-none"
                      >
                        Specific customer segments
                      </label>
                      {customerEligibility === 'specific' && (
                        <div className="mt-4 space-y-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="vip" />
                            <label
                              htmlFor="vip"
                              className="text-sm leading-none"
                            >
                              VIP Customers
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="new" />
                            <label
                              htmlFor="new"
                              className="text-sm leading-none"
                            >
                              New Customers
                            </label>
                          </div>
                          <Button variant="outline" className="w-full">
                            <Plus className="w-4 h-4 mr-2" />
                            Add customer segment
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Applies To Section */}
            <Card>
              <CardHeader className="p-4 md:p-6 pb-0">
                <CardTitle className="text-base">Applies to</CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <RadioGroup
                  value={appliesTo}
                  onValueChange={(value) => setAppliesTo(value as 'all' | 'specific')}
                  className="space-y-4"
                >
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="all" id="all-products" className="mt-1" />
                    <div className="space-y-1">
                      <label
                        htmlFor="all-products"
                        className="text-sm font-medium leading-none"
                      >
                        All products
                      </label>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="specific" id="specific-products" className="mt-1" />
                    <div className="flex-1 space-y-2">
                      <label
                        htmlFor="specific-products"
                        className="text-sm font-medium leading-none"
                      >
                        Specific collections
                      </label>
                      {appliesTo === 'specific' && (
                        <div className="mt-4 space-y-4">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="Search collections"
                              className="pl-10"
                            />
                          </div>

                          <div className="border rounded-lg divide-y">
                            {collections.map((collection) => (
                              <div
                                key={collection.id}
                                className="p-3 flex items-center hover:bg-gray-50"
                              >
                                <Checkbox
                                  id={`collection-${collection.id}`}
                                  checked={selectedCollections.includes(collection.id)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedCollections(prev => [...prev, collection.id]);
                                    } else {
                                      setSelectedCollections(prev => 
                                        prev.filter(id => id !== collection.id)
                                      );
                                    }
                                  }}
                                  className="mr-3"
                                />
                                <label
                                  htmlFor={`collection-${collection.id}`}
                                  className="flex-1 flex items-center justify-between cursor-pointer"
                                >
                                  <div>
                                    <div className="font-medium text-sm">
                                      {collection.title}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {collection.productCount} products
                                    </div>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="ml-4"
                                    onClick={() => setShowProductSelector(true)}
                                  >
                                    Browse
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                  </Button>
                                </label>
                              </div>
                            ))}
                          </div>

                          {showProductSelector && (
                            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                              <div className="bg-white rounded-lg shadow-xl w-full max-w-[800px] max-h-[90vh] flex flex-col">
                                <div className="p-4 md:p-6 border-b flex items-center justify-between">
                                  <h2 className="text-lg font-medium">Select products</h2>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setShowProductSelector(false)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>

                                <div className="p-4 md:p-6 flex-1 overflow-auto">
                                  <div className="mb-4">
                                    <div className="relative">
                                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                      <Input
                                        placeholder="Search products"
                                        className="pl-10"
                                      />
                                    </div>
                                  </div>

                                  <div className="border rounded-lg divide-y">
                                    {products.map((product) => (
                                      <div
                                        key={product.id}
                                        className="p-3 flex items-center hover:bg-gray-50"
                                      >
                                        <Checkbox
                                          id={`product-${product.id}`}
                                          checked={selectedProducts.includes(product.id)}
                                          onCheckedChange={(checked) => {
                                            if (checked) {
                                              setSelectedProducts(prev => [...prev, product.id]);
                                            } else {
                                              setSelectedProducts(prev => 
                                                prev.filter(id => id !== product.id)
                                              );
                                            }
                                          }}
                                          className="mr-3"
                                        />
                                        <label
                                          htmlFor={`product-${product.id}`}
                                          className="flex-1 cursor-pointer"
                                        >
                                          <div className="font-medium text-sm">
                                            {product.title}
                                          </div>
                                          <div className="text-sm text-gray-500">
                                            {product.collection}
                                          </div>
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div className="p-4 md:p-6 border-t bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-3">
                                  <div className="text-sm text-gray-500 w-full sm:w-auto text-center sm:text-left">
                                    {selectedProducts.length} products selected
                                  </div>
                                  <div className="flex gap-2 w-full sm:w-auto">
                                    <Button
                                      variant="outline"
                                      onClick={() => setShowProductSelector(false)}
                                      className="flex-1 sm:flex-none"
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      onClick={() => setShowProductSelector(false)}
                                      className="flex-1 sm:flex-none"
                                    >
                                      Done
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          <Button variant="outline" className="w-full">
                            <Plus className="w-4 h-4 mr-2" />
                            Add collection
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Usage Limits */}
            <Card>
              <CardHeader className="p-4 md:p-6 pb-0">
                <CardTitle className="text-base">Usage limits</CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">
                        Limit number of times this discount can be used in total
                      </div>
                    </div>
                    <Switch
                      checked={usageLimits.totalUses}
                      onCheckedChange={(checked) => 
                        setUsageLimits(prev => ({ ...prev, totalUses: checked }))
                      }
                    />
                  </div>
                  {usageLimits.totalUses && (
                    <Input
                      type="number"
                      placeholder="Number of uses"
                      className="max-w-[200px]"
                    />
                  )}
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">
                        Limit to one use per customer
                      </div>
                    </div>
                    <Switch
                      checked={usageLimits.perCustomer}
                      onCheckedChange={(checked) => 
                        setUsageLimits(prev => ({ ...prev, perCustomer: checked }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Dates */}
            <Card>
              <CardHeader className="p-4 md:p-6 pb-0">
                <CardTitle className="text-base">Active dates</CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start date</Label>
                      <Input
                        type="date"
                        value={activeDate}
                        onChange={(e) => setActiveDate(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Start time</Label>
                      <Input
                        type="time"
                        value={activeTime}
                        onChange={(e) => setActiveTime(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="end-date"
                      checked={hasEndDate}
                      onCheckedChange={(checked) => setHasEndDate(checked as boolean)}
                    />
                    <label
                      htmlFor="end-date"
                      className="text-sm font-medium leading-none"
                    >
                      Set end date
                    </label>
                  </div>
                  {hasEndDate && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>End date</Label>
                        <Input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>End time</Label>
                        <Input
                          type="time"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Made sticky on desktop */}
          <div className="space-y-6 lg:sticky lg:top-24">
            {/* Summary */}
            <Card>
              <CardHeader className="p-4 md:p-6 pb-0">
                <CardTitle className="text-base">Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="font-medium">Type</div>
                    <div className="text-gray-500 capitalize">{discountMethod} discount</div>
                  </div>
                  {code && (
                    <div>
                      <div className="font-medium">Code</div>
                      <div className="text-gray-500">{code}</div>
                    </div>
                  )}
                  <div>
                    <div className="font-medium">Details</div>
                    <ul className="text-gray-500 space-y-1 mt-1">
                      <li>• For Online Store</li>
                      {minimumRequirements === 'none' && (
                        <li>• No minimum purchase requirement</li>
                      )}
                      {customerEligibility === 'all' && (
                        <li>• All customers</li>
                      )}
                      {!usageLimits.totalUses && !usageLimits.perCustomer && (
                        <li>• No usage limits</li>
                      )}
                      <li>• Can't combine with other discounts</li>
                      <li>• Active from today</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sales Channels */}
            <Card>
              <CardHeader className="p-4 md:p-6 pb-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Sales channels</CardTitle>
                  <Button variant="ghost" size="sm">
                    Manage
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Online Store</span>
                    </div>
                    <Switch
                      checked={salesChannels.online}
                      onCheckedChange={(checked) => 
                        setSalesChannels(prev => ({ ...prev, online: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Store className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Point of Sale</span>
                    </div>
                    <Switch
                      checked={salesChannels.pos}
                      onCheckedChange={(checked) => 
                        setSalesChannels(prev => ({ ...prev, pos: checked }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}