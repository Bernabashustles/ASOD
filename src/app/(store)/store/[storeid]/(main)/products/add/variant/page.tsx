'use client';

import { useState } from 'react';
import { ArrowLeft, Save, Eye, Package, Settings, BarChart3, Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AttributesForm from './components/AttributesForm';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';

const steps = [
  { id: 'attributes', title: 'Variant Options', icon: Package, description: 'Define variant combinations' },
];

export default function VariantAddPage() {
  const [currentStep, setCurrentStep] = useState('attributes');
  const [formData, setFormData] = useState({
    basic: {},
    attributes: {},
    media: {},
    inventory: {},
    shipping: {},
    channels: {},
    advanced: {
      features: [],
      customFields: {},
      specifications: {},
    },
  });

  const handleStepChange = (step: string) => {
    setCurrentStep(step);
  };

  const handleFormChange = (step: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [step]: data,
    }));
  };

  const getStepStatus = (stepId: string) => {
    const stepIndex = steps.findIndex(step => step.id === stepId);
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Enhanced Header with Border */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors border border-gray-200"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Product
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Go back to the product details page</TooltipContent>
                </Tooltip>
                <Separator orientation="vertical" className="h-6 bg-gray-300" />
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-300">
                    <Package className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold text-gray-900">Add Variant</h1>
                    <p className="text-sm text-gray-500">Premium Cotton T-Shirt - Red, Small</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Preview this variant</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      size="sm" 
                      className="bg-gray-900 hover:bg-black text-white shadow-sm transition-all duration-200 hover:shadow-md border border-gray-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Variant
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Save this variant</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Enhanced Sidebar with Borders */}
            <div className="xl:col-span-1">
              <div className="space-y-6">
                {/* Variant Management Card with Border */}
                <Card className="border border-gray-200 shadow-sm bg-white">
                  <CardHeader className="pb-4 border-b border-gray-100">
                    <CardTitle className="text-base font-semibold text-gray-900 flex items-center">
                      <Settings className="h-4 w-4 mr-2 text-gray-600" />
                      Variant Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-800 text-white rounded-lg flex items-center justify-center shadow-sm border border-gray-300">
                            <Package className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-sm">Variant Options</h3>
                            <p className="text-xs text-gray-600">Define combinations and manage details</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100">
                          <div className="w-2 h-2 bg-gray-600 rounded-full shadow-sm"></div>
                          <span className="text-sm text-gray-700">Create variant options</span>
                        </div>
                        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100">
                          <div className="w-2 h-2 bg-gray-600 rounded-full shadow-sm"></div>
                          <span className="text-sm text-gray-700">Generate combinations</span>
                        </div>
                        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100">
                          <div className="w-2 h-2 bg-gray-400 rounded-full shadow-sm"></div>
                          <span className="text-sm text-gray-700">Manage individual settings</span>
                        </div>
                      </div>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Quick Add Variant
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Add a new variant quickly</TooltipContent>
                      </Tooltip>
                    </div>
                  </CardContent>
                </Card>

                {/* AI Assistant Card with Border */}
                <Card className="border border-gray-200 shadow-sm bg-gray-50">
                  <CardHeader className="pb-4 border-b border-gray-200">
                    <CardTitle className="text-base font-semibold text-gray-900 flex items-center">
                      <Sparkles className="h-4 w-4 mr-2 text-gray-600" />
                      AI Assistant
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm text-gray-600 mb-3">
                      Need help creating variants? Our AI can suggest optimal combinations based on your product.
                    </p>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          size="sm" 
                          className="w-full bg-gray-800 hover:bg-black text-white shadow-sm transition-all duration-200 border border-gray-700"
                        >
                          <Sparkles className="h-4 w-4 mr-2" />
                          Get AI Suggestions
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Let AI suggest variant combinations</TooltipContent>
                    </Tooltip>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Enhanced Main Content with Borders */}
            <div className="xl:col-span-3">
              <div className="space-y-6">
                {/* Modern Header Card with Border */}
                <Card className="border border-gray-200 shadow-sm bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h2 className="text-2xl font-bold text-gray-900">
                          Variant Options & Management
                        </h2>
                        <p className="text-gray-600">
                          Create variant options and manage individual variant details with precision
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300 font-medium">
                          All-in-One Interface
                        </Badge>
                        <Badge className="bg-gray-800 text-white font-medium border border-gray-700">
                          Auto-Save Enabled
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Variant Options Section (restored, no tabs) */}
                <div className="mt-6">
                  <AttributesForm
                    data={formData.attributes}
                    onChange={(data) => handleFormChange('attributes', data)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
} 