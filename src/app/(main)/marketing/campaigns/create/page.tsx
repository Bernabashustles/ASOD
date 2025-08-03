'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import {
  ChevronLeft,
  Megaphone,
  Users,
  Target,
  DollarSign,
  BarChart4,
  AlertCircle,
  CheckCircle2,
  Eye,
  ArrowRight,
  Save,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

// Simple interface for campaign data
interface CampaignData {
  name: string;
  description: string;
  type: string;
  status: string;
  startDate: string;
  endDate: string;
  budget: number;
  targetAudience: string;
  goals: string;
  imageUrl: string;
  channels: string[];
  targetReach: number;
}

export default function CreateCampaignPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<string>('details');
  const [progress, setProgress] = useState(25);
  const [formData, setFormData] = useState<CampaignData>({
    name: '',
    description: '',
    type: 'email',
    status: 'draft',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
    budget: 1000,
    targetAudience: '',
    goals: '',
    imageUrl: '',
    channels: ['website'],
    targetReach: 1000,
  });
  const [previewData, setPreviewData] = useState<CampaignData | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleTabChange = (value: string) => {
    setCurrentStep(value);
    
    // Update progress based on tab
    if (value === 'details') setProgress(25);
    else if (value === 'audience') setProgress(50);
    else if (value === 'budget') setProgress(75);
    else if (value === 'preview') {
      setProgress(100);
      setPreviewData({ ...formData });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleChannelChange = (channel: string, checked: boolean) => {
    const updatedChannels = checked 
      ? [...formData.channels, channel]
      : formData.channels.filter(c => c !== channel);
    
    setFormData(prev => ({ ...prev, channels: updatedChannels }));
    
    // Clear error when field is edited
    if (errors['channels']) {
      const newErrors = { ...errors };
      delete newErrors['channels'];
      setErrors(newErrors);
    }
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    
    if (currentStep === 'details') {
      if (!formData.name || formData.name.length < 5) {
        newErrors.name = "Campaign name must be at least 5 characters.";
      }
      if (!formData.description || formData.description.length < 10) {
        newErrors.description = "Description must be at least 10 characters.";
      }
      if (!formData.type) {
        newErrors.type = "Please select a campaign type.";
      }
      if (!formData.startDate) {
        newErrors.startDate = "Start date is required.";
      }
      if (!formData.endDate) {
        newErrors.endDate = "End date is required.";
      }
    } 
    else if (currentStep === 'audience') {
      if (!formData.targetAudience || formData.targetAudience.length < 5) {
        newErrors.targetAudience = "Target audience description is required.";
      }
      if (formData.channels.length === 0) {
        newErrors.channels = "Select at least one channel.";
      }
      if (!formData.goals || formData.goals.length < 5) {
        newErrors.goals = "Goals are required.";
      }
    }
    else if (currentStep === 'budget') {
      if (!formData.budget || formData.budget < 1) {
        newErrors.budget = "Budget must be at least $1.";
      }
      if (!formData.targetReach || formData.targetReach < 1) {
        newErrors.targetReach = "Target reach must be at least 1.";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    console.log(formData);
    // TODO: Submit campaign data to the server
    
    // Navigate back to campaigns list
    setTimeout(() => router.push('/marketing/campaigns'), 1000);
  };

  const nextStep = () => {
    if (validateStep()) {
      if (currentStep === 'details') setCurrentStep('audience');
      else if (currentStep === 'audience') setCurrentStep('budget');
      else if (currentStep === 'budget') {
        setPreviewData({ ...formData });
        setCurrentStep('preview');
      }
    }
  };

  const prevStep = () => {
    if (currentStep === 'audience') setCurrentStep('details');
    else if (currentStep === 'budget') setCurrentStep('audience');
    else if (currentStep === 'preview') setCurrentStep('budget');
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="h-full p-4 sm:p-6 space-y-6">
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            className="mr-4"
            onClick={() => router.push('/marketing/campaigns')}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Create New Campaign</h1>
            <p className="text-gray-500 mt-1">Set up your marketing campaign details</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{progress}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Tabs value={currentStep} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="details">
              <div className="flex flex-col items-center py-1">
                <span className="font-semibold text-sm">1. Details</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="audience">
              <div className="flex flex-col items-center py-1">
                <span className="font-semibold text-sm">2. Audience</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="budget">
              <div className="flex flex-col items-center py-1">
                <span className="font-semibold text-sm">3. Budget</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="preview">
              <div className="flex flex-col items-center py-1">
                <span className="font-semibold text-sm">4. Preview</span>
              </div>
            </TabsTrigger>
          </TabsList>

          {/* Step 1: Campaign Details */}
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Details</CardTitle>
                <CardDescription>
                  Enter the basic information about your campaign
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Campaign Name</Label>
                    <Input 
                      id="name"
                      name="name"
                      placeholder="Summer Sale 2024" 
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    <p className="text-sm text-muted-foreground">
                      A unique name to identify your campaign
                    </p>
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Campaign Type</Label>
                    <Select
                      value={formData.type} 
                      onValueChange={(value) => handleSelectChange('type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select campaign type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email Marketing</SelectItem>
                        <SelectItem value="social">Social Media</SelectItem>
                        <SelectItem value="display">Display Advertising</SelectItem>
                        <SelectItem value="search">Search Engine Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description"
                    name="description"
                    placeholder="Brief description of campaign goals and content"
                    className="min-h-[120px]"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                  {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label>Initial Status</Label>
                    <RadioGroup
                      value={formData.status}
                      onValueChange={(value) => handleSelectChange('status', value)}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="draft" id="status-draft" />
                        <Label htmlFor="status-draft" className="font-normal cursor-pointer">
                          Save as Draft
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="active" id="status-active" />
                        <Label htmlFor="status-active" className="font-normal cursor-pointer">
                          Activate Immediately
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="imageUrl">Campaign Image URL (Optional)</Label>
                    <Input 
                      id="imageUrl"
                      name="imageUrl"
                      placeholder="https://example.com/image.jpg" 
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                    />
                    <p className="text-sm text-muted-foreground">
                      Add a visual representation for your campaign
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input 
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleInputChange}
                    />
                    {errors.startDate && <p className="text-sm text-red-500">{errors.startDate}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input 
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      min={formData.startDate}
                    />
                    {errors.endDate && <p className="text-sm text-red-500">{errors.endDate}</p>}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline"
                  onClick={() => router.push('/marketing/campaigns')}
                >
                  Cancel
                </Button>
                <Button onClick={nextStep}>
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Step 2: Audience Targeting */}
          <TabsContent value="audience">
            <Card>
              <CardHeader>
                <CardTitle>Audience Targeting</CardTitle>
                <CardDescription>
                  Define who you want to reach with this campaign
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <Textarea 
                    id="targetAudience"
                    name="targetAudience"
                    placeholder="Describe your target demographic, interests, behaviors, etc."
                    className="min-h-[120px]"
                    value={formData.targetAudience}
                    onChange={handleInputChange}
                  />
                  <p className="text-sm text-muted-foreground">
                    Be specific about audience characteristics to improve targeting
                  </p>
                  {errors.targetAudience && <p className="text-sm text-red-500">{errors.targetAudience}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Distribution Channels</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                    {['website', 'email', 'facebook', 'instagram', 'twitter', 'linkedin'].map((channel) => (
                      <div key={channel} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`channel-${channel}`}
                          checked={formData.channels.includes(channel)}
                          onChange={(e) => handleChannelChange(channel, e.target.checked)}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label
                          htmlFor={`channel-${channel}`}
                          className="text-sm font-medium leading-none capitalize cursor-pointer"
                        >
                          {channel}
                        </label>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Select all channels where this campaign will be distributed
                  </p>
                  {errors.channels && <p className="text-sm text-red-500">{errors.channels}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goals">Campaign Goals</Label>
                  <Textarea 
                    id="goals"
                    name="goals"
                    placeholder="What do you hope to achieve with this campaign?"
                    className="min-h-[100px]"
                    value={formData.goals}
                    onChange={handleInputChange}
                  />
                  <p className="text-sm text-muted-foreground">
                    Example: Increase store visits, Generate leads, Boost brand awareness
                  </p>
                  {errors.goals && <p className="text-sm text-red-500">{errors.goals}</p>}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline"
                  onClick={prevStep}
                >
                  Previous Step
                </Button>
                <Button onClick={nextStep}>
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Step 3: Budget and Performance */}
          <TabsContent value="budget">
            <Card>
              <CardHeader>
                <CardTitle>Budget and Performance</CardTitle>
                <CardDescription>
                  Set your campaign budget and performance targets
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="budget">Campaign Budget</Label>
                  <div className="flex items-center">
                    <span className="bg-muted px-3 py-2 rounded-l-md border border-r-0 border-input">$</span>
                    <Input 
                      id="budget"
                      name="budget"
                      type="number" 
                      className="rounded-l-none" 
                      placeholder="1000"
                      value={formData.budget}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        handleInputChange({
                          ...e,
                          target: {
                            ...e.target,
                            name: e.target.name,
                            value: isNaN(val) ? '' : val.toString()
                          }
                        });
                      }}
                      min={1}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Total budget allocated for the entire campaign duration
                  </p>
                  {errors.budget && <p className="text-sm text-red-500">{errors.budget}</p>}
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="targetReach">Target Audience Reach</Label>
                  <div className="flex items-center">
                    <Input 
                      id="targetReach"
                      name="targetReach"
                      type="number" 
                      placeholder="1000"
                      value={formData.targetReach}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        handleInputChange({
                          ...e,
                          target: {
                            ...e.target,
                            name: e.target.name,
                            value: isNaN(val) ? '' : val.toString()
                          }
                        });
                      }}
                      min={1}
                    />
                    <span className="ml-2">people</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Estimated number of people your campaign will reach
                  </p>
                  {errors.targetReach && <p className="text-sm text-red-500">{errors.targetReach}</p>}
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Budget Recommendation</AlertTitle>
                  <AlertDescription>
                    Based on your target audience and channels, we recommend a budget of 
                    <span className="font-medium"> ${Math.max(1000, Math.ceil(formData.targetReach / 10)).toLocaleString()}</span> 
                    for optimal results.
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline"
                  onClick={prevStep}
                >
                  Previous Step
                </Button>
                <Button onClick={nextStep}>
                  Preview Campaign
                  <Eye className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Step 4: Preview */}
          <TabsContent value="preview">
            {previewData && (
              <div className="space-y-8">
                <Card>
                  <CardHeader className="border-b">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl">{previewData.name}</CardTitle>
                        <CardDescription>{previewData.description}</CardDescription>
                      </div>
                      <Badge variant={previewData.status === 'active' ? 'default' : 'outline'}>
                        {previewData.status === 'active' ? 'Active' : 'Draft'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-sm text-muted-foreground">CAMPAIGN DETAILS</h3>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Type</h4>
                            <p className="capitalize">{previewData.type}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Duration</h4>
                            <p>{formatDate(previewData.startDate)} - {formatDate(previewData.endDate)}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Budget</h4>
                            <p>${Number(previewData.budget).toLocaleString()}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Target Reach</h4>
                            <p>{Number(previewData.targetReach).toLocaleString()} people</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Goals</h4>
                          <p className="mt-1">{previewData.goals}</p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Distribution Channels</h4>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {previewData.channels.map((channel) => (
                              <Badge key={channel} variant="outline" className="capitalize">
                                {channel}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-semibold text-sm text-muted-foreground">AUDIENCE & TARGETING</h3>
                        
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Target Audience</h4>
                          <p className="mt-1">{previewData.targetAudience}</p>
                        </div>

                        {previewData.imageUrl && (
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-2">Campaign Image</h4>
                            <div className="border rounded-md overflow-hidden h-40">
                              <img 
                                src={previewData.imageUrl} 
                                alt="Campaign preview" 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop';
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8">
                  <Button 
                    variant="outline"
                    onClick={prevStep}
                    className="w-full sm:w-auto"
                  >
                    Go Back and Edit
                  </Button>
                  <Button 
                    variant="default"
                    onClick={onSubmit}
                    className="w-full sm:w-auto"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {previewData.status === 'active' ? 'Launch Campaign' : 'Save as Draft'}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 