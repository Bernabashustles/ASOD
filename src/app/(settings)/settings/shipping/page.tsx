'use client';

import React from 'react';
import { ChevronRight, FileText, Info, Plus, Package, MoreHorizontal, Truck, MapPin, Clock, Settings } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from '@/lib/utils';

export default function ShippingSettingsPage() {
  return (
    <div className="space-y-6 p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="text-lg sm:text-xl font-medium">Shipping Settings</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="w-full sm:w-auto">
              <Settings className="w-4 h-4 mr-2" />
              Preferences
            </Button>
            <Button className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add shipping zone
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Manage your shipping zones and rates
        </p>
      </div>

      <div className="grid gap-6">
        {/* Shipping Rates and Profiles */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base">Shipping rates and profiles</CardTitle>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full">
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Set up shipping rates and profiles</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <CardDescription>
                  Manage shipping rates and profiles for your products
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                Set up
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Shipping Labels */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base">Shipping labels</CardTitle>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full">
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Manage shipping labels</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <CardDescription>
                  Create and manage shipping labels for your products
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                Set up
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Delivery Dates */}
        <Card>
          <CardHeader>
            <div className="space-y-1">
              <CardTitle className="text-base">Delivery dates</CardTitle>
              <CardDescription>
                Control how delivery dates appear to buyers at checkout
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-1.5 border-t">
              <div className="space-y-1">
                <div className="font-medium">Shop Promise</div>
                <div className="text-sm text-muted-foreground">
                  Show delivery dates for orders with the Shop Promise badge and guarantee
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Badge variant="secondary">Coming soon</Badge>
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  Enable
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Saved Packages */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Saved packages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg gap-4">
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Sample box</div>
                  <div className="text-sm text-muted-foreground">22 × 13.7 × 4.2 cm, 0 kg</div>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Badge variant="secondary">Default package</Badge>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Alert className="bg-blue-50 text-blue-700">
              <Info className="w-4 h-4" />
              <AlertDescription>
                Used to calculate shipping rates at checkout and pre-selected when buying labels
              </AlertDescription>
            </Alert>

            <Button variant="outline" className="w-full justify-start">
              <Plus className="w-4 h-4 mr-2" />
              Add package
            </Button>
          </CardContent>
        </Card>

        {/* Third-party Rates */}
        <Card>
          <CardHeader>
            <div className="space-y-1">
              <CardTitle className="text-base">Enable third-party calculated rates at checkout</CardTitle>
              <CardDescription>
                Connect your existing shipping carrier account to use your own rates
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto">
                  Upgrade your plan
                </Button>
                <Button variant="link" className="text-blue-600 w-full sm:w-auto">
                  Learn more
                </Button>
              </div>
              <div className="w-24 hidden sm:block">
                <img src="/delivery-truck.png" alt="Delivery truck illustration" className="w-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Packing Slips */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Packing slips</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className={cn(
                "flex items-center justify-between p-4",
                "hover:bg-gray-50 rounded-md cursor-pointer",
                "transition-colors duration-200"
              )}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <span>Packing slip template</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        {/* Custom Order Fulfillment */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle className="text-base">Custom order fulfillment</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full">
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Set up custom fulfillment services</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <CardDescription>
              Add an email for a custom fulfillment service that fulfills orders for you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full justify-start">
              <Plus className="w-4 h-4 mr-2" />
              Add fulfillment service
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 