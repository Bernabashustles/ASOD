'use client';

import { useState } from 'react';
import { 
  CreditCard, 
  Lock, 
  ChevronRight, 
  ChevronLeft, 
  Shield, 
  Clock, 
  Truck, 
  Package,
  Info,
  X,
  Check
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Checkbox } from "@/components/ui/checkbox";

export default function CheckoutPage() {
  const [step, setStep] = useState<'details' | 'payment'>('details');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="container max-w-[1000px] mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <Button 
              variant="ghost" 
              className="md:hidden"
              onClick={() => step === 'payment' ? setStep('details') : undefined}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-lg font-semibold">Checkout</h1>
            </div>
            <div className="w-10 md:hidden" /> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      <main className="container max-w-[1000px] mx-auto px-4 sm:px-6 py-4 sm:py-6 pb-24 md:pb-6">
        <div className="grid md:grid-cols-[1fr,380px] gap-4 md:gap-8">
          {/* Main Content */}
          <div className="space-y-6 order-2 md:order-1">
            {/* Progress Steps - Desktop */}
            <div className="hidden md:flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 'details' ? 'bg-blue-600 text-white' : 'bg-gray-100'
                }`}>
                  1
                </div>
                <span className="font-medium">Details</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 'payment' ? 'bg-blue-600 text-white' : 'bg-gray-100'
                }`}>
                  2
                </div>
                <span className="font-medium">Payment</span>
              </div>
            </div>

            {step === 'details' ? (
              <div className="space-y-6">
                {/* Contact Information */}
                <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                  <h2 className="text-lg font-semibold">Contact Information</h2>
                  <div className="space-y-4">
                    <div>
                      <Label>Email address</Label>
                      <Input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="h-11 sm:h-10 text-base sm:text-sm"
                      />
                    </div>
                    <div>
                      <Label>Phone number</Label>
                      <Input type="tel" placeholder="Enter your phone number" />
                    </div>
                  </div>
                </div>

                {/* Marketing Options */}
                

                {/* Shipping Address */}
                <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                  <h2 className="text-lg font-semibold">Shipping Address</h2>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>First name</Label>
                        <Input placeholder="Enter first name" />
                      </div>
                      <div>
                        <Label>Last name</Label>
                        <Input placeholder="Enter last name" />
                      </div>
                    </div>
                    <div>
                      <Label>Address</Label>
                      <Input placeholder="Enter street address" />
                    </div>
                    <div>
                      <Label>Apartment, suite, etc. (optional)</Label>
                      <Input placeholder="Enter apartment or suite" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>City</Label>
                        <Input placeholder="Enter city" />
                      </div>
                      <div>
                        <Label>Region</Label>
                        <Select>
                          <SelectTrigger className="h-11 sm:h-10 text-base sm:text-sm">
                            <SelectValue placeholder="Select region" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[300px]">
                            <div className="p-2 sticky top-0 bg-white border-b">
                              <Input 
                                placeholder="Search regions..."
                                className="h-9"
                              />
                            </div>
                            <div className="p-1">
                              <SelectItem value="aa">Addis Ababa</SelectItem>
                              <SelectItem value="or">Oromia</SelectItem>
                              {/* Add more regions */}
                            </div>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Language and Currency */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Language</Label>
                        <Select>
                          <SelectTrigger className="h-11 sm:h-10 text-base sm:text-sm">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="am">Amharic</SelectItem>
                            <SelectItem value="or">Oromiffa</SelectItem>
                            <SelectItem value="ti">Tigrinya</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Currency</Label>
                        <Select>
                          <SelectTrigger className="h-11 sm:h-10 text-base sm:text-sm">
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="etb">Ethiopian Birr (ETB)</SelectItem>
                            <SelectItem value="usd">US Dollar (USD)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Method */}
                <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                  <h2 className="text-lg font-semibold">Shipping Method</h2>
                  <div className="space-y-3">
                    <Card className="p-3 sm:p-4 border-2 border-blue-600">
                      <div className="flex items-center justify-between flex-wrap gap-2 sm:flex-nowrap">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <Truck className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-sm sm:text-base">Standard Shipping</p>
                            <p className="text-xs sm:text-sm text-gray-500">2-3 business days</p>
                          </div>
                        </div>
                        <span className="font-medium text-sm sm:text-base">Free</span>
                      </div>
                    </Card>
                    <Card className="p-4 hover:border-gray-300 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Package className="w-5 h-5" />
                          <div>
                            <p className="font-medium">Express Shipping</p>
                            <p className="text-sm text-gray-500">1-2 business days</p>
                          </div>
                        </div>
                        <span className="font-medium">ETB 150</span>
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Continue Button - Mobile */}
                <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t mobile-safe-bottom">
                  <Button 
                    className="w-full h-12 text-base"
                    onClick={() => setStep('payment')}
                  >
                    Continue to payment
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                {/* Continue Button - Desktop */}
                <div className="hidden md:block">
                  <Button 
                    className="min-w-[200px]"
                    onClick={() => setStep('payment')}
                  >
                    Continue to payment
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Payment Methods */}
                <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                  <h2 className="text-lg font-semibold">Payment Method</h2>
                  <div className="space-y-3">
                    <Card className="p-4 border-2 border-blue-600">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-medium">Credit Card</p>
                            <p className="text-sm text-gray-500">Pay securely with your card</p>
                          </div>
                        </div>
                        <Shield className="w-5 h-5 text-blue-600" />
                      </div>
                    </Card>
                    <Card className="p-4 hover:border-gray-300 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5" />
                          <div>
                            <p className="font-medium">Pay Later</p>
                            <p className="text-sm text-gray-500">Pay within 14 days</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Card Details */}
                <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                  <h2 className="text-lg font-semibold">Card Details</h2>
                  <div className="space-y-4">
                    <div>
                      <Label>Card number</Label>
                      <Input placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Expiry date</Label>
                        <Input placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label>Security code</Label>
                        <div className="relative">
                          <Input placeholder="CVC" />
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="absolute right-0 top-0 h-full px-3"
                                >
                                  <Info className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                3-digit security code on the back of your card
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pay Button - Mobile */}
                <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t mobile-safe-bottom">
                  <Button 
                    className="w-full h-12 text-base"
                    onClick={() => setStep('payment')}
                  >
                    Pay ETB 1,299.00
                    <Lock className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                {/* Pay Button - Desktop */}
                <div className="hidden md:block">
                  <Button className="min-w-[200px]">
                    Pay ETB 1,299.00
                    <Lock className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="order-1 md:order-2">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm space-y-3 sm:space-y-4 sticky top-[4.5rem] md:top-24">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-semibold">Order Summary</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-gray-500 md:hidden -mr-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                {/* Order Items */}
                <div className="space-y-3">
                  {[1, 2].map((item) => (
                    <div key={item} className="flex gap-3 sm:gap-4">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-lg flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm sm:text-base truncate">Product Name Here</p>
                        <p className="text-xs sm:text-sm text-gray-500">Qty: 1</p>
                        <p className="font-medium text-sm sm:text-base">ETB 649.50</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Subtotal */}
                <div className="space-y-2 text-sm sm:text-base">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span>ETB 1,299.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shipping</span>
                    <span>Free</span>
                  </div>
                </div>

                <Separator />

                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm sm:text-base">Total</span>
                  <div className="text-right">
                    <p className="text-xs sm:text-sm text-gray-500">ETB</p>
                    <p className="text-xl sm:text-2xl font-semibold">1,299.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 