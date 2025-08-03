'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  ChevronLeft,
  Calendar as CalendarIcon,
  DollarSign,
  Users,
  Target,
  BarChart2,
  Megaphone,
  Globe,
  Mail,
  LineChart,
  Search,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Save,
  Upload,
  Image as ImageIcon,
  Settings,
  Info,
  Sparkles,
  Zap,
  TrendingUp,
  Clock,
  Eye,
  Share2,
  Download,
  MoreVertical,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from 'lucide-react';

const campaignFormSchema = z.object({
  name: z.string().min(2, "Campaign name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  type: z.enum(["email", "social", "display", "search"]),
  status: z.enum(["draft", "active"]),
  startDate: z.date(),
  endDate: z.date(),
  budget: z.number().min(100, "Budget must be at least $100"),
  targetAudience: z.string().min(1, "Please select a target audience"),
  goals: z.array(z.string()).min(1, "Select at least one goal"),
  channels: z.array(z.string()).min(1, "Select at least one channel"),
  targetReach: z.number().min(1000, "Target reach must be at least 1,000"),
  imageUrl: z.string().optional(),
  advancedSettings: z.object({
    frequencyCapping: z.boolean(),
    geoTargeting: z.boolean(),
    deviceTargeting: z.boolean(),
    timeTargeting: z.boolean(),
    customAudience: z.boolean(),
  }).optional(),
});

type CampaignFormValues = z.infer<typeof campaignFormSchema>;

const defaultValues: Partial<CampaignFormValues> = {
  status: "draft",
  type: "social",
  goals: [],
  channels: [],
  advancedSettings: {
    frequencyCapping: false,
    geoTargeting: false,
    deviceTargeting: false,
    timeTargeting: false,
    customAudience: false,
  },
};

const GOALS = [
  { value: "brand_awareness", label: "Brand Awareness" },
  { value: "lead_generation", label: "Lead Generation" },
  { value: "sales", label: "Sales" },
  { value: "traffic", label: "Website Traffic" },
  { value: "engagement", label: "Engagement" },
];

const CHANNELS = [
  { value: "facebook", label: "Facebook", icon: "Facebook" },
  { value: "instagram", label: "Instagram", icon: "Instagram" },
  { value: "twitter", label: "Twitter", icon: "Twitter" },
  { value: "linkedin", label: "LinkedIn", icon: "LinkedIn" },
  { value: "google_ads", label: "Google Ads", icon: "Search" },
  { value: "email", label: "Email", icon: "Mail" },
];

const AUDIENCES = [
  { value: "all_customers", label: "All Customers" },
  { value: "new_customers", label: "New Customers" },
  { value: "returning_customers", label: "Returning Customers" },
  { value: "premium_members", label: "Premium Members" },
  { value: "inactive_customers", label: "Inactive Customers" },
];

export default function CreateCampaignPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: CampaignFormValues) => {
    setIsSubmitting(true);
    try {
      // Here you would typically make an API call to create the campaign
      console.log("Creating campaign:", data);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      router.push('/campaign');
    } catch (error) {
      console.error("Error creating campaign:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="gap-2 w-full sm:w-auto"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={() => setShowPreview(true)}
            className="gap-2 flex-1 sm:flex-none"
          >
            <Eye className="w-4 h-4" />
            Preview
          </Button>
          <Button
            variant="outline"
            className="gap-2 flex-1 sm:flex-none"
          >
            <Save className="w-4 h-4" />
            Save Draft
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Create New Campaign</h1>
          <p className="text-muted-foreground">Set up your marketing campaign details</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Enter the essential details of your campaign</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Campaign Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Summer Sale 2024" {...field} />
                        </FormControl>
                        <FormDescription>
                          Choose a name that clearly describes your campaign
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your campaign goals and target audience..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Provide a detailed description of your campaign
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Campaign Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select campaign type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="social">
                              <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4" />
                                Social Media
                              </div>
                            </SelectItem>
                            <SelectItem value="email">
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                Email Marketing
                              </div>
                            </SelectItem>
                            <SelectItem value="display">
                              <div className="flex items-center gap-2">
                                <LineChart className="w-4 h-4" />
                                Display Ads
                              </div>
                            </SelectItem>
                            <SelectItem value="search">
                              <div className="flex items-center gap-2">
                                <Search className="w-4 h-4" />
                                Search Ads
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Select the type of campaign you want to create
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Campaign Image</FormLabel>
                        <FormControl>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <Button
                              type="button"
                              variant="outline"
                              className="gap-2 w-full sm:w-auto"
                              onClick={() => {/* Handle image upload */}}
                            >
                              <Upload className="w-4 h-4" />
                              Upload Image
                            </Button>
                            {field.value && (
                              <div className="relative w-full sm:w-20 h-20 rounded-lg overflow-hidden">
                                <img
                                  src={field.value}
                                  alt="Campaign"
                                  className="w-full h-full object-cover"
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  className="absolute top-1 right-1 h-6 w-6"
                                  onClick={() => field.onChange("")}
                                >
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormDescription>
                          Upload an image that represents your campaign
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Targeting & Goals</CardTitle>
                  <CardDescription>Define your target audience and campaign goals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="targetAudience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Audience</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select target audience" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {AUDIENCES.map((audience) => (
                              <SelectItem key={audience.value} value={audience.value}>
                                {audience.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Choose your target audience for this campaign
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="goals"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Campaign Goals</FormLabel>
                        <FormControl>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {GOALS.map((goal) => (
                              <Button
                                key={goal.value}
                                type="button"
                                variant={field.value?.includes(goal.value) ? "default" : "outline"}
                                className="justify-start gap-2"
                                onClick={() => {
                                  const newValue = field.value?.includes(goal.value)
                                    ? field.value.filter((v) => v !== goal.value)
                                    : [...(field.value || []), goal.value];
                                  field.onChange(newValue);
                                }}
                              >
                                <Sparkles className="w-4 h-4" />
                                {goal.label}
                              </Button>
                            ))}
                          </div>
                        </FormControl>
                        <FormDescription>
                          Select one or more goals for your campaign
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="channels"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marketing Channels</FormLabel>
                        <FormControl>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {CHANNELS.map((channel) => (
                              <Button
                                key={channel.value}
                                type="button"
                                variant={field.value?.includes(channel.value) ? "default" : "outline"}
                                className="justify-start gap-2"
                                onClick={() => {
                                  const newValue = field.value?.includes(channel.value)
                                    ? field.value.filter((v) => v !== channel.value)
                                    : [...(field.value || []), channel.value];
                                  field.onChange(newValue);
                                }}
                              >
                                {channel.icon === "Facebook" && <Facebook className="w-4 h-4" />}
                                {channel.icon === "Instagram" && <Instagram className="w-4 h-4" />}
                                {channel.icon === "Twitter" && <Twitter className="w-4 h-4" />}
                                {channel.icon === "LinkedIn" && <Linkedin className="w-4 h-4" />}
                                {channel.icon === "Search" && <Search className="w-4 h-4" />}
                                {channel.icon === "Mail" && <Mail className="w-4 h-4" />}
                                {channel.label}
                              </Button>
                            ))}
                          </div>
                        </FormControl>
                        <FormDescription>
                          Select the channels you want to use for your campaign
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="targetReach"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Reach</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g., 10000"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>
                          Set your target audience reach
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Budget & Schedule</CardTitle>
                  <CardDescription>Set your campaign budget and schedule</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Campaign Budget</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                            <Input
                              type="number"
                              placeholder="e.g., 5000"
                              className="pl-8"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Set your total campaign budget
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Start Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            When do you want to start your campaign?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>End Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            When do you want to end your campaign?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Advanced Settings</CardTitle>
                  <CardDescription>Configure advanced campaign settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="advancedSettings.frequencyCapping"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Frequency Capping</FormLabel>
                          <FormDescription>
                            Limit how often your ads are shown to the same user
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="advancedSettings.geoTargeting"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Geo-Targeting</FormLabel>
                          <FormDescription>
                            Target specific geographic locations
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="advancedSettings.deviceTargeting"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Device Targeting</FormLabel>
                          <FormDescription>
                            Target specific devices or platforms
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="advancedSettings.timeTargeting"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Time Targeting</FormLabel>
                          <FormDescription>
                            Schedule ads for specific times of day
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="advancedSettings.customAudience"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Custom Audience</FormLabel>
                          <FormDescription>
                            Create custom audience segments
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <Clock className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Create Campaign
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Campaign Preview</DialogTitle>
            <DialogDescription>
              Review your campaign settings before creating
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{form.watch("name") || "Untitled Campaign"}</CardTitle>
                <CardDescription>{form.watch("description")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Type</Label>
                    <p className="text-sm text-muted-foreground">
                      {form.watch("type")}
                    </p>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <p className="text-sm text-muted-foreground">
                      {form.watch("status")}
                    </p>
                  </div>
                  <div>
                    <Label>Budget</Label>
                    <p className="text-sm text-muted-foreground">
                      ${form.watch("budget")?.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <Label>Target Reach</Label>
                    <p className="text-sm text-muted-foreground">
                      {form.watch("targetReach")?.toLocaleString()}
                    </p>
                  </div>
                </div>
                <Separator />
                <div>
                  <Label>Goals</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.watch("goals")?.map((goal) => (
                      <Badge key={goal} variant="secondary">
                        {GOALS.find((g) => g.value === goal)?.label}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Channels</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.watch("channels")?.map((channel) => (
                      <Badge key={channel} variant="outline">
                        {CHANNELS.find((c) => c.value === channel)?.label}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPreview(false)}
              className="w-full sm:w-auto"
            >
              Close
            </Button>
            <Button
              onClick={() => {
                setShowPreview(false);
                form.handleSubmit(onSubmit)();
              }}
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? "Creating..." : "Create Campaign"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
