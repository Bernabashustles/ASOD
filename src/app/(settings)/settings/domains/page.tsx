'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { Globe, CheckCircle2, XCircle, Loader2, RefreshCw, Search, Calendar, Settings, Plus, Edit2, Trash2, AlertCircle, Sparkles, Wand2, Brain, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Store } from 'lucide-react';

const domainFormSchema = z.object({
  domainName: z.string().min(3, "Domain name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  isPrimary: z.boolean().default(false),
  enableSSL: z.boolean().default(true),
  enableDNSSEC: z.boolean().default(false),
  redirectToPrimary: z.boolean().default(false),
  enableStorefront: z.boolean().default(true),
  enableCheckout: z.boolean().default(true),
  enableBlog: z.boolean().default(false),
  enableSupport: z.boolean().default(false),
  storeType: z.string(),
});

type DomainFormValues = z.infer<typeof domainFormSchema>;

// Sample current domains data - replace with actual data from your backend
const CURRENT_DOMAINS = [
  {
    id: "1",
    domain: "mystore.com",
    status: "active",
    isPrimary: true,
    sslEnabled: true,
    expiryDate: "2024-12-31",
    storefrontEnabled: true,
    checkoutEnabled: true,
    blogEnabled: false,
    supportEnabled: false,
  },
  {
    id: "2",
    domain: "blog.mystore.com",
    status: "active",
    isPrimary: false,
    sslEnabled: true,
    expiryDate: "2024-12-31",
    storefrontEnabled: false,
    checkoutEnabled: false,
    blogEnabled: true,
    supportEnabled: false,
  },
];

const STORE_TYPES = [
  { value: "main_store", label: "Main Store", description: "Your primary e-commerce store" },
  { value: "marketplace", label: "Marketplace", description: "Multi-vendor marketplace" },
  { value: "wholesale", label: "Wholesale", description: "B2B wholesale store" },
  { value: "blog", label: "Blog", description: "Content and blog site" },
  { value: "support", label: "Support", description: "Customer support portal" },
];

const REGIONS = [
  { value: "global", label: "Global" },
  { value: "north_america", label: "North America" },
  { value: "europe", label: "Europe" },
  { value: "asia", label: "Asia" },
  { value: "australia", label: "Australia" },
];

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "zh", label: "Chinese" },
  { value: "ja", label: "Japanese" },
];

const TLD_OPTIONS = [
  { value: ".com", label: ".com", popular: true },
  { value: ".net", label: ".net", popular: true },
  { value: ".org", label: ".org", popular: true },
  { value: ".io", label: ".io", popular: true },
  { value: ".co", label: ".co", popular: true },
  { value: ".ai", label: ".ai", popular: true },
  { value: ".app", label: ".app", popular: true },
  { value: ".dev", label: ".dev", popular: true },
  { value: ".me", label: ".me", popular: true },
  { value: ".store", label: ".store", popular: true },
  { value: ".shop", label: ".shop", popular: true },
  { value: ".tech", label: ".tech", popular: true },
  { value: ".online", label: ".online", popular: true },
  { value: ".site", label: ".site", popular: true },
  { value: ".xyz", label: ".xyz", popular: true },
];

export default function DomainsPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [domainStatus, setDomainStatus] = useState<Record<string, 'available' | 'taken' | 'checking' | 'error'>>({});
  const [selectedDomain, setSelectedDomain] = useState<typeof CURRENT_DOMAINS[0] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [aiFormData, setAIFormData] = useState({
    storeName: '',
    description: '',
    storeType: 'main_store'
  });
  const [activeQuickAction, setActiveQuickAction] = useState<string | null>(null);
  const [dnsRecords, setDnsRecords] = useState([
    { type: 'A', name: '@', value: '192.168.1.1', ttl: '3600' },
    { type: 'CNAME', name: 'www', value: 'mystore.com', ttl: '3600' },
    { type: 'MX', name: '@', value: 'mail.mystore.com', ttl: '3600' },
  ]);

  const form = useForm<DomainFormValues>({
    resolver: zodResolver(domainFormSchema),
    defaultValues: {
      isPrimary: false,
      enableSSL: true,
      enableDNSSEC: false,
      redirectToPrimary: false,
      enableStorefront: true,
      enableCheckout: true,
      enableBlog: false,
      enableSupport: false,
    },
  });

  const checkDomainAvailability = async (domain: string) => {
    setIsChecking(true);
    setDomainStatus(prev => ({ ...prev, [domain]: 'checking' }));
    
    try {
      // Simulate domain availability check
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Randomly determine availability for demo purposes
      const isAvailable = Math.random() > 0.5;
      setDomainStatus(prev => ({
        ...prev,
        [domain]: isAvailable ? 'available' : 'taken'
      }));
    } catch (error) {
      setDomainStatus(prev => ({ ...prev, [domain]: 'error' }));
    } finally {
      setIsChecking(false);
    }
  };

  const generateDomainSuggestions = async (storeName: string, description: string) => {
    setIsGenerating(true);
    try {
      // Simulate AI domain generation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Extract keywords from description
      const keywords = description.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 3);
      
      // AI-powered domain generation logic
      const baseName = storeName.toLowerCase().replace(/\s+/g, '');
      const generated = [];
      
      // Generate variations based on keywords
      for (const keyword of keywords) {
        generated.push(
          `${keyword}store`,
          `${keyword}shop`,
          `shop${keyword}`,
          `${keyword}market`,
          `${keyword}mall`,
          `buy${keyword}`,
          `${keyword}deals`,
          `${baseName}${keyword}`,
          `${keyword}${baseName}`
        );
      }
      
      // Add base name variations
      generated.push(
        `${baseName}store`,
        `${baseName}shop`,
        `shop${baseName}`,
        `${baseName}market`,
        `${baseName}mall`,
        `buy${baseName}`,
        `${baseName}deals`
      );
      
      // Remove duplicates and limit to 10 suggestions
      setSuggestions(Array.from(new Set(generated)).slice(0, 10));
    } catch (error) {
      console.error("Error generating suggestions:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEditDomain = (domain: typeof CURRENT_DOMAINS[0]) => {
    setSelectedDomain(domain);
    form.reset({
      domainName: domain.domain.split('.')[0],
      isPrimary: domain.isPrimary,
      enableSSL: domain.sslEnabled,
      enableStorefront: domain.storefrontEnabled,
      enableCheckout: domain.checkoutEnabled,
      enableBlog: domain.blogEnabled,
      enableSupport: domain.supportEnabled,
    });
    setIsModalOpen(true);
  };

  const onSubmit = async (data: DomainFormValues) => {
    try {
      // Here you would typically make an API call to save/update the domain
      console.log("Domain data:", data);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsModalOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error submitting domain:", error);
    }
  };

  const handleDeleteDomain = async (domainId: string) => {
    if (window.confirm("Are you sure you want to delete this domain?")) {
      try {
        // Here you would typically make an API call to delete the domain
        console.log("Deleting domain:", domainId);
        await new Promise(resolve => setTimeout(resolve, 500));
        // Refresh the domain list
      } catch (error) {
        console.error("Error deleting domain:", error);
      }
    }
  };

  const handleRenewDomain = async (domainId: string) => {
    try {
      // Here you would typically make an API call to renew the domain
      console.log("Renewing domain:", domainId);
      await new Promise(resolve => setTimeout(resolve, 500));
      // Refresh the domain list
    } catch (error) {
      console.error("Error renewing domain:", error);
    }
  };

  const handleQuickAction = (action: string) => {
    setActiveQuickAction(action);
  };

  const QuickActionDialog = () => {
    if (!activeQuickAction) return null;

    const renderContent = () => {
      switch (activeQuickAction) {
        case 'settings':
          return (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Domain Settings</h3>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SSL Certificate</Label>
                      <p className="text-sm text-muted-foreground">Manage your SSL certificate settings</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>DNSSEC</Label>
                      <p className="text-sm text-muted-foreground">Enable DNSSEC for enhanced security</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-Renewal</Label>
                      <p className="text-sm text-muted-foreground">Automatically renew domains before expiration</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setActiveQuickAction(null)}>
                  Cancel
                </Button>
                <Button>Save Changes</Button>
              </div>
            </div>
          );

        case 'renewAll':
          return (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Renew All Domains</h3>
                <div className="space-y-2">
                  {CURRENT_DOMAINS.map((domain) => (
                    <div key={domain.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="space-y-0.5">
                        <p className="font-medium">{domain.domain}</p>
                        <p className="text-sm text-muted-foreground">Expires: {domain.expiryDate}</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-sm">
                    Total renewal cost: <span className="font-medium">$29.98</span>
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setActiveQuickAction(null)}>
                  Cancel
                </Button>
                <Button>Proceed to Payment</Button>
              </div>
            </div>
          );

        case 'dnsRecords':
          return (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">DNS Records</h3>
                <div className="rounded-lg border">
                  <div className="grid grid-cols-4 gap-4 p-4 border-b bg-muted/50">
                    <div className="font-medium">Type</div>
                    <div className="font-medium">Name</div>
                    <div className="font-medium">Value</div>
                    <div className="font-medium">TTL</div>
                  </div>
                  {dnsRecords.map((record, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 p-4 border-b last:border-0">
                      <div>{record.type}</div>
                      <div>{record.name}</div>
                      <div className="font-mono text-sm">{record.value}</div>
                      <div>{record.ttl}</div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add DNS Record
                </Button>
              </div>
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setActiveQuickAction(null)}>
                  Close
                </Button>
                <Button>Save Changes</Button>
              </div>
            </div>
          );

        default:
          return null;
      }
    };

    return (
      <Dialog open={!!activeQuickAction} onOpenChange={() => setActiveQuickAction(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {activeQuickAction === 'settings' && 'Domain Settings'}
              {activeQuickAction === 'renewAll' && 'Renew All Domains'}
              {activeQuickAction === 'dnsRecords' && 'DNS Records'}
            </DialogTitle>
            <DialogDescription>
              {activeQuickAction === 'settings' && 'Configure your domain settings and security options'}
              {activeQuickAction === 'renewAll' && 'Review and renew all your domains'}
              {activeQuickAction === 'dnsRecords' && 'View and manage your DNS records'}
            </DialogDescription>
          </DialogHeader>
          {renderContent()}
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto p-4 sm:p-6 space-y-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Domain Settings</h1>
            <p className="text-sm text-muted-foreground">Manage your store domains and settings</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Domain
          </Button>
        </div>

        <Card className="border-none shadow-sm">
          <CardHeader className="border-b px-6 py-4">
            <CardTitle className="text-lg font-semibold">Your Domains</CardTitle>
            <CardDescription>
              View and manage your current domains
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {CURRENT_DOMAINS.map((domain) => (
                <div key={domain.id} className="p-6 hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-md bg-muted">
                          <Globe className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{domain.domain}</h3>
                          {domain.isPrimary && (
                            <Badge variant="default" className="rounded-full">Primary</Badge>
                          )}
                          <Badge variant={domain.status === "active" ? "success" : "destructive"} className="rounded-full">
                            {domain.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {domain.storefrontEnabled && (
                          <Badge variant="secondary" className="rounded-full">Storefront</Badge>
                        )}
                        {domain.checkoutEnabled && (
                          <Badge variant="secondary" className="rounded-full">Checkout</Badge>
                        )}
                        {domain.blogEnabled && (
                          <Badge variant="secondary" className="rounded-full">Blog</Badge>
                        )}
                        {domain.supportEnabled && (
                          <Badge variant="secondary" className="rounded-full">Support</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Expires: {domain.expiryDate}</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEditDomain(domain)}
                        className="w-full sm:w-auto"
                      >
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRenewDomain(domain.id)}
                        className="w-full sm:w-auto"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Renew
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteDomain(domain.id)}
                        className="text-destructive hover:text-destructive w-full sm:w-auto"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-none shadow-sm">
            <CardHeader className="border-b px-6 py-4">
              <CardTitle className="text-lg font-semibold">Domain Status</CardTitle>
              <CardDescription>
                Overview of your domain configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Primary Domain</span>
                  <Badge variant="default" className="rounded-full">mystore.com</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">SSL Status</span>
                  <Badge variant="success" className="rounded-full">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">DNS Status</span>
                  <Badge variant="success" className="rounded-full">Configured</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader className="border-b px-6 py-4">
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
              <CardDescription>
                Common domain management tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleQuickAction('settings')}
              >
                <Settings className="h-4 w-4 mr-2" />
                Domain Settings
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleQuickAction('renewAll')}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Renew All Domains
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleQuickAction('dnsRecords')}
              >
                <AlertCircle className="h-4 w-4 mr-2" />
                View DNS Records
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <QuickActionDialog />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedDomain ? 'Edit Domain' : 'Add New Domain'}</DialogTitle>
            <DialogDescription>
              {selectedDomain ? 'Update your domain settings' : 'Configure a new domain for your store'}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="domainName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Domain Name</FormLabel>
                      <FormControl>
                        <div className="flex gap-2">
                    <Input
                            placeholder="Enter your domain name"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setAIFormData(prev => ({ ...prev, storeName: field.value }));
                              setIsAIModalOpen(true);
                            }}
                          >
                            <Sparkles className="h-4 w-4 mr-2" />
                            Get AI Suggestions
                          </Button>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Enter your desired domain name or get AI suggestions
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
                      <FormLabel>Store Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your store, products, and target audience..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Provide a detailed description to help generate better domain suggestions
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Domain Settings</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="isPrimary"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Primary Domain</FormLabel>
                            <FormDescription>
                              Set this domain as your primary domain
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
                      name="enableSSL"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Enable SSL</FormLabel>
                            <FormDescription>
                              Automatically enable SSL certificate
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
                  </div>
                </div>

               
              </div>

              <div className="flex justify-end gap-4">
                    <Button
                      type="button"
                      variant="outline"
                  onClick={() => {
                    setIsModalOpen(false);
                    form.reset();
                    setSelectedDomain(null);
                  }}
                    >
                      Cancel
                    </Button>
                <Button type="submit">
                  {selectedDomain ? 'Update Domain' : 'Add Domain'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={isAIModalOpen} onOpenChange={setIsAIModalOpen}>
        <DialogContent className="max-w-md p-0 overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/50" />
            <div className="relative">
              <DialogHeader className="px-6 pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <DialogTitle className="text-lg font-semibold">AI Domain Assistant</DialogTitle>
                    <DialogDescription>
                      Get intelligent domain suggestions for your store
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Store Name</Label>
                    <div className="relative">
                      <Input
                        value={aiFormData.storeName}
                        onChange={(e) => setAIFormData(prev => ({ ...prev, storeName: e.target.value }))}
                        placeholder="Your store name"
                        className="pl-9"
                      />
                      <Store className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Store Description</Label>
                    <div className="relative">
                      <Textarea
                        value={aiFormData.description}
                        onChange={(e) => setAIFormData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe your store, products, and target audience..."
                        className="min-h-[120px] pl-9"
                      />
                      <Brain className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Provide details about your store to get better suggestions
                    </p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    type="button"
                    onClick={() => generateDomainSuggestions(
                      aiFormData.storeName,
                      aiFormData.description
                    )}
                    disabled={isGenerating || !aiFormData.description || aiFormData.description.length < 10}
                    className="w-full"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate Suggestions
                      </>
                    )}
                  </Button>
                </div>

                {suggestions.length > 0 && !isGenerating && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Generated Suggestions</Label>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Lightbulb className="h-3 w-3" />
                        AI-Powered
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {suggestions.map((suggestion) => (
                        <Button
                          key={suggestion}
                          type="button"
                          variant="outline"
                          className="w-full h-auto p-3 flex items-center justify-between hover:bg-muted/50"
                          onClick={() => {
                            form.setValue('domainName', suggestion);
                            checkDomainAvailability(suggestion);
                            setIsAIModalOpen(false);
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-md bg-muted">
                              <Globe className="h-3.5 w-3.5" />
                            </div>
                            <span className="font-medium">{suggestion}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {domainStatus[suggestion] === 'checking' && (
                              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                            )}
                            {domainStatus[suggestion] === 'available' && (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            )}
                            {domainStatus[suggestion] === 'taken' && (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}                                                                                                                                                                                                                                                                                                                                                 