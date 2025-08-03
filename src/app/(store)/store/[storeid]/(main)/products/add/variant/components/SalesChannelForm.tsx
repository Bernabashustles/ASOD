'use client';

import { useState } from 'react';
import { DollarSign, Globe, ShoppingCart, TrendingUp, Settings, Eye, EyeOff, Calculator, Tag, Percent, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PricingData {
  basePrice: number;
  comparePrice: number;
  cost: number;
  profit: number;
  margin: number;
  currency: string;
  taxRate: number;
  taxIncluded: boolean;
}

interface SalesChannel {
  id: string;
  name: string;
  type: 'online' | 'marketplace' | 'social' | 'pos';
  enabled: boolean;
  price: number;
  comparePrice: number;
  inventory: number;
  status: 'active' | 'draft' | 'archived';
  commission: number;
  fees: number;
}

export default function SalesChannelForm({ data, onChange }: { data: any; onChange: (data: any) => void }) {
  const [pricing, setPricing] = useState<PricingData>({
    basePrice: 29.99,
    comparePrice: 39.99,
    cost: 15.00,
    profit: 14.99,
    margin: 50.0,
    currency: 'USD',
    taxRate: 8.5,
    taxIncluded: false,
  });

  const [salesChannels, setSalesChannels] = useState<SalesChannel[]>([
    {
      id: '1',
      name: 'Online Store',
      type: 'online',
      enabled: true,
      price: 29.99,
      comparePrice: 39.99,
      inventory: 100,
      status: 'active',
      commission: 0,
      fees: 0,
    },
    {
      id: '2',
      name: 'Amazon',
      type: 'marketplace',
      enabled: true,
      price: 32.99,
      comparePrice: 42.99,
      inventory: 50,
      status: 'active',
      commission: 15,
      fees: 2.99,
    },
    {
      id: '3',
      name: 'eBay',
      type: 'marketplace',
      enabled: false,
      price: 31.99,
      comparePrice: 41.99,
      inventory: 25,
      status: 'draft',
      commission: 10,
      fees: 1.99,
    },
    {
      id: '4',
      name: 'Instagram Shop',
      type: 'social',
      enabled: true,
      price: 29.99,
      comparePrice: 39.99,
      inventory: 75,
      status: 'active',
      commission: 5,
      fees: 0.99,
    },
  ]);

  const [showCost, setShowCost] = useState(false);

  const updatePricing = (field: keyof PricingData, value: any) => {
    const updated = { ...pricing, [field]: value };
    
    // Recalculate profit and margin
    if (field === 'basePrice' || field === 'cost') {
      updated.profit = updated.basePrice - updated.cost;
      updated.margin = updated.cost > 0 ? ((updated.profit / updated.basePrice) * 100) : 0;
    }
    
    setPricing(updated);
  };

  const updateSalesChannel = (id: string, field: keyof SalesChannel, value: any) => {
    setSalesChannels(prev => prev.map(channel =>
      channel.id === id ? { ...channel, [field]: value } : channel
    ));
  };

  const toggleChannel = (id: string) => {
    updateSalesChannel(id, 'enabled', !salesChannels.find(c => c.id === id)?.enabled);
  };

  const calculateNetProfit = (channel: SalesChannel) => {
    const grossProfit = channel.price - pricing.cost;
    const commissionAmount = (channel.price * channel.commission) / 100;
    const netProfit = grossProfit - commissionAmount - channel.fees;
    return Math.max(0, netProfit);
  };

  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'online': return <ShoppingCart className="h-4 w-4" />;
      case 'marketplace': return <Globe className="h-4 w-4" />;
      case 'social': return <TrendingUp className="h-4 w-4" />;
      case 'pos': return <Calculator className="h-4 w-4" />;
      default: return <ShoppingCart className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-gray-100 text-gray-800';
      case 'draft': return 'bg-gray-200 text-gray-800';
      case 'archived': return 'bg-gray-300 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Pricing & Sales Channels</h2>
          <p className="text-gray-600 mt-1">Set pricing strategy and manage sales channel distribution</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
            <Calculator className="h-4 w-4 mr-2" />
            Price Calculator
          </Button>
          <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
            <Zap className="h-4 w-4 mr-2" />
            Bulk Update
          </Button>
        </div>
      </div>

      <Tabs defaultValue="pricing" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1">
          <TabsTrigger value="pricing" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
            <DollarSign className="h-4 w-4 mr-2" />
            Pricing
          </TabsTrigger>
          <TabsTrigger value="channels" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
            <Globe className="h-4 w-4 mr-2" />
            Sales Channels
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pricing" className="space-y-6">
          {/* Base Pricing */}
          <Card className="border-0 shadow-sm bg-gradient-to-br from-gray-50 to-gray-100">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <span className="text-2xl">💰</span>
                Base Pricing
              </CardTitle>
              <p className="text-gray-600 text-sm">Set your product's base pricing and cost structure</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Base Price</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="number"
                      value={pricing.basePrice}
                      onChange={(e) => updatePricing('basePrice', parseFloat(e.target.value))}
                      className="pl-10"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Compare Price</Label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="number"
                      value={pricing.comparePrice}
                      onChange={(e) => updatePricing('comparePrice', parseFloat(e.target.value))}
                      className="pl-10"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    Cost
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowCost(!showCost)}
                      className="h-4 w-4 p-0"
                    >
                      {showCost ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    </Button>
                  </Label>
                  <div className="relative">
                    <Calculator className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type={showCost ? "number" : "password"}
                      value={pricing.cost}
                      onChange={(e) => updatePricing('cost', parseFloat(e.target.value))}
                      className="pl-10"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Currency</Label>
                  <Select value={pricing.currency} onValueChange={(value) => updatePricing('currency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="CAD">CAD (C$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Profit Analysis */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Profit Analysis</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">${pricing.profit.toFixed(2)}</div>
                    <div className="text-sm text-gray-500">Gross Profit</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-700">{pricing.margin.toFixed(1)}%</div>
                    <div className="text-sm text-gray-500">Profit Margin</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-600">
                      {pricing.comparePrice > pricing.basePrice ? 
                        `${(((pricing.comparePrice - pricing.basePrice) / pricing.comparePrice) * 100).toFixed(1)}%` : 
                        '0%'
                      }
                    </div>
                    <div className="text-sm text-gray-500">Discount</div>
                  </div>
                </div>
              </div>

              {/* Tax Settings */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Tax Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Tax Rate (%)</Label>
                    <div className="relative">
                      <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type="number"
                        value={pricing.taxRate}
                        onChange={(e) => updatePricing('taxRate', parseFloat(e.target.value))}
                        className="pl-10"
                        step="0.1"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Tax Included in Price</Label>
                      <p className="text-xs text-gray-500">Price shown includes tax</p>
                    </div>
                    <Switch
                      checked={pricing.taxIncluded}
                      onCheckedChange={(checked) => updatePricing('taxIncluded', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels" className="space-y-6">
          {/* Sales Channels */}
          <Card className="border-0 shadow-sm bg-gradient-to-br from-gray-50 to-gray-100">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <span className="text-2xl">🌐</span>
                Sales Channels
              </CardTitle>
              <p className="text-gray-600 text-sm">Manage pricing and availability across different sales channels</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {salesChannels.map((channel) => (
                <div key={channel.id} className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center text-white">
                        {getChannelIcon(channel.type)}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{channel.name}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(channel.status)}>
                            {channel.status}
                          </Badge>
                          <Badge variant="outline">
                            {channel.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Switch
                        checked={channel.enabled}
                        onCheckedChange={() => toggleChannel(channel.id)}
                      />
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {channel.enabled && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Price</Label>
                        <Input
                          type="number"
                          value={channel.price}
                          onChange={(e) => updateSalesChannel(channel.id, 'price', parseFloat(e.target.value))}
                          step="0.01"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Compare Price</Label>
                        <Input
                          type="number"
                          value={channel.comparePrice}
                          onChange={(e) => updateSalesChannel(channel.id, 'comparePrice', parseFloat(e.target.value))}
                          step="0.01"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Inventory</Label>
                        <Input
                          type="number"
                          value={channel.inventory}
                          onChange={(e) => updateSalesChannel(channel.id, 'inventory', parseInt(e.target.value))}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Net Profit</Label>
                        <div className="text-lg font-semibold text-green-600">
                          ${calculateNetProfit(channel).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Channel Fees */}
                  {channel.enabled && (channel.commission > 0 || channel.fees > 0) && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Channel Fees</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Commission ({channel.commission}%)</span>
                          <span className="text-sm font-medium">
                            ${((channel.price * channel.commission) / 100).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Fixed Fees</span>
                          <span className="text-sm font-medium">${channel.fees.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Add New Channel */}
              <Button
                variant="outline"
                className="w-full border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              >
                <Globe className="h-4 w-4 mr-2" />
                Add Sales Channel
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 