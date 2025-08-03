'use client';

import { useState } from 'react';
import { Package, Ruler, Weight, Truck, Globe, Calculator, Settings, Info, AlertCircle } from 'lucide-react';
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
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Dimensions {
  length: number;
  width: number;
  height: number;
  weight: number;
  unit: 'in' | 'cm';
  weightUnit: 'lb' | 'kg';
}

interface ShippingData {
  dimensions: Dimensions;
  requiresShipping: boolean;
  shippingClass: string;
  customsValue: number;
  countryOfOrigin: string;
  harmonizedCode: string;
  hazardous: boolean;
  fragile: boolean;
  temperatureControlled: boolean;
}

export default function DimensionsInput({ data, onChange }: { data: any; onChange: (data: any) => void }) {
  const [shipping, setShipping] = useState<ShippingData>({
    dimensions: {
      length: 12,
      width: 8,
      height: 4,
      weight: 2.5,
      unit: 'in',
      weightUnit: 'lb',
    },
    requiresShipping: true,
    shippingClass: 'standard',
    customsValue: 29.99,
    countryOfOrigin: 'US',
    harmonizedCode: '8517.12.0000',
    hazardous: false,
    fragile: false,
    temperatureControlled: false,
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateDimensions = (field: keyof Dimensions, value: any) => {
    setShipping(prev => ({
      ...prev,
      dimensions: { ...prev.dimensions, [field]: value }
    }));
  };

  const updateShipping = (field: keyof ShippingData, value: any) => {
    setShipping(prev => ({ ...prev, [field]: value }));
  };

  const calculateVolume = () => {
    const { length, width, height } = shipping.dimensions;
    const volume = length * width * height;
    return shipping.dimensions.unit === 'in' ? 
      `${volume.toFixed(2)} in³` : 
      `${volume.toFixed(2)} cm³`;
  };

  const calculateDimensionalWeight = () => {
    const { length, width, height } = shipping.dimensions;
    const volume = length * width * height;
    
    if (shipping.dimensions.unit === 'in') {
      return (volume / 166).toFixed(2);
    } else {
      return (volume / 6000).toFixed(2);
    }
  };

  const getShippingClassColor = (classType: string) => {
    switch (classType) {
      case 'standard': return 'bg-gray-100 text-gray-800';
      case 'express': return 'bg-gray-200 text-gray-800';
      case 'overnight': return 'bg-gray-300 text-gray-800';
      case 'economy': return 'bg-gray-400 text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const shippingClasses = [
    { value: 'standard', label: 'Standard', description: '3-5 business days' },
    { value: 'express', label: 'Express', description: '1-2 business days' },
    { value: 'overnight', label: 'Overnight', description: 'Next business day' },
    { value: 'economy', label: 'Economy', description: '5-7 business days' },
  ];

  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'MX', name: 'Mexico' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'CN', name: 'China' },
    { code: 'JP', name: 'Japan' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Shipping & Dimensions</h2>
          <p className="text-gray-600 mt-1">Configure product dimensions and shipping settings</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
            <Calculator className="h-4 w-4 mr-2" />
            Shipping Calculator
          </Button>
          <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
            <Settings className="h-4 w-4 mr-2" />
            Bulk Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="dimensions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1">
          <TabsTrigger value="dimensions" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
            <Ruler className="h-4 w-4 mr-2" />
            Dimensions
          </TabsTrigger>
          <TabsTrigger value="shipping" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
            <Truck className="h-4 w-4 mr-2" />
            Shipping
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dimensions" className="space-y-6">
          {/* Physical Dimensions */}
          <Card className="border-0 shadow-sm bg-gradient-to-br from-gray-50 to-gray-100">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <span className="text-2xl">📦</span>
                Physical Dimensions
              </CardTitle>
              <p className="text-gray-600 text-sm">Enter the product's physical dimensions and weight</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Unit Selection */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Label className="text-sm font-medium text-gray-700">Dimensions:</Label>
                  <Select 
                    value={shipping.dimensions.unit} 
                    onValueChange={(value) => updateDimensions('unit', value)}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in">inches</SelectItem>
                      <SelectItem value="cm">cm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Label className="text-sm font-medium text-gray-700">Weight:</Label>
                  <Select 
                    value={shipping.dimensions.weightUnit} 
                    onValueChange={(value) => updateDimensions('weightUnit', value)}
                  >
                    <SelectTrigger className="w-16">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lb">lbs</SelectItem>
                      <SelectItem value="kg">kg</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Dimensions Input */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Length</Label>
                  <div className="relative">
                    <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="number"
                      value={shipping.dimensions.length}
                      onChange={(e) => updateDimensions('length', parseFloat(e.target.value))}
                      className="pl-10"
                      step="0.1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Width</Label>
                  <div className="relative">
                    <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="number"
                      value={shipping.dimensions.width}
                      onChange={(e) => updateDimensions('width', parseFloat(e.target.value))}
                      className="pl-10"
                      step="0.1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Height</Label>
                  <div className="relative">
                    <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="number"
                      value={shipping.dimensions.height}
                      onChange={(e) => updateDimensions('height', parseFloat(e.target.value))}
                      className="pl-10"
                      step="0.1"
                    />
                  </div>
                </div>
              </div>

              {/* Weight Input */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Weight</Label>
                <div className="relative">
                  <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="number"
                    value={shipping.dimensions.weight}
                    onChange={(e) => updateDimensions('weight', parseFloat(e.target.value))}
                    className="pl-10"
                    step="0.1"
                  />
                </div>
              </div>

              {/* Calculations */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Calculations</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{calculateVolume()}</div>
                    <div className="text-sm text-gray-500">Volume</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-700">
                      {shipping.dimensions.weight} {shipping.dimensions.weightUnit}
                    </div>
                    <div className="text-sm text-gray-500">Actual Weight</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-600">
                      {calculateDimensionalWeight()} {shipping.dimensions.weightUnit}
                    </div>
                    <div className="text-sm text-gray-500">Dimensional Weight</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping" className="space-y-6">
          {/* Shipping Settings */}
          <Card className="border-0 shadow-sm bg-gradient-to-br from-gray-50 to-gray-100">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <span className="text-2xl">🚚</span>
                Shipping Settings
              </CardTitle>
              <p className="text-gray-600 text-sm">Configure shipping options and requirements</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Settings */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Requires Shipping</Label>
                    <p className="text-xs text-gray-500">Product needs to be shipped to customer</p>
                  </div>
                  <Switch
                    checked={shipping.requiresShipping}
                    onCheckedChange={(checked) => updateShipping('requiresShipping', checked)}
                  />
                </div>

                {shipping.requiresShipping && (
                  <>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Shipping Class</Label>
                      <Select 
                        value={shipping.shippingClass} 
                        onValueChange={(value) => updateShipping('shippingClass', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {shippingClasses.map((classType) => (
                            <SelectItem key={classType.value} value={classType.value}>
                              <div className="flex items-center justify-between w-full">
                                <span>{classType.label}</span>
                                <Badge className={getShippingClassColor(classType.value)}>
                                  {classType.description}
                                </Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Customs Value</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          type="number"
                          value={shipping.customsValue}
                          onChange={(e) => updateShipping('customsValue', parseFloat(e.target.value))}
                          className="pl-10"
                          step="0.01"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Advanced Settings */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Advanced Settings</Label>
                    <p className="text-xs text-gray-500">Customs and special handling options</p>
                  </div>
                  <Switch
                    checked={showAdvanced}
                    onCheckedChange={setShowAdvanced}
                  />
                </div>

                {showAdvanced && (
                  <div className="space-y-4 bg-white rounded-lg p-4 border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Country of Origin</Label>
                        <Select 
                          value={shipping.countryOfOrigin} 
                          onValueChange={(value) => updateShipping('countryOfOrigin', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country.code} value={country.code}>
                                {country.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Harmonized Code</Label>
                        <Input
                          value={shipping.harmonizedCode}
                          onChange={(e) => updateShipping('harmonizedCode', e.target.value)}
                          placeholder="e.g., 8517.12.0000"
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <h5 className="font-medium text-gray-900">Special Handling</h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={shipping.hazardous}
                            onCheckedChange={(checked) => updateShipping('hazardous', checked)}
                          />
                          <Label className="text-sm">Hazardous Material</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={shipping.fragile}
                            onCheckedChange={(checked) => updateShipping('fragile', checked)}
                          />
                          <Label className="text-sm">Fragile</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={shipping.temperatureControlled}
                            onCheckedChange={(checked) => updateShipping('temperatureControlled', checked)}
                          />
                          <Label className="text-sm">Temperature Controlled</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Shipping Alerts */}
              {shipping.hazardous && (
                <Alert className="border-orange-200 bg-orange-50">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    Hazardous materials require special shipping arrangements and documentation.
                  </AlertDescription>
                </Alert>
              )}

              {shipping.fragile && (
                <Alert className="border-blue-200 bg-blue-50">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    Fragile items will be marked for special handling during shipping.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 