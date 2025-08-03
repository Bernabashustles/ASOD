'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Store, X, ExternalLink, Package, Globe, CreditCard, Check, ArrowRight, Building2, Rocket, Settings, ShoppingBag, Bell, Users, Palette, Share2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SetupTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  buttonText?: string;
  icon?: React.ReactNode;
  timeEstimate?: string;
}

interface SetupSection {
  id: string;
  title: string;
  tasks: SetupTask[];
}

interface StoreInfo {
  name: string;
  lastUpdated: string;
  updatedBy: string;
}

export default function Home() {
  const [openSectionId, setOpenSectionId] = useState<string>('store-name');
  const [sections] = useState<SetupSection[]>([
    {
      id: 'store-name',
      title: 'Store name',
      tasks: [
        {
          id: 'name-store',
          title: 'Name your store',
          description: 'Your store name is set to "${storeInfo.name}"',
          completed: true,
          buttonText: 'Edit name',
          icon: <Building2 className="w-4 h-4" />,
          timeEstimate: '2 min'
        }
      ]
    },
    {
      id: 'sell-online',
      title: 'Sell online',
      tasks: [
        {
          id: 'add-product',
          title: 'Add your first product',
          description: 'Write a description and add photos',
          completed: false,
          buttonText: 'Add product',
          icon: <Plus className="w-4 h-4" />,
          timeEstimate: '10 min'
        },
        {
          id: 'customize-store',
          title: 'Customize your online store',
          description: "Choose a theme and add your branding",
          completed: false,
          buttonText: 'Customize',
          icon: <Palette className="w-4 h-4" />,
          timeEstimate: '15 min'
        },
        {
          id: 'add-domain',
          title: 'Add a custom domain',
          description: 'Get a professional web address',
          completed: false,
          buttonText: 'Add domain',
          icon: <Globe className="w-4 h-4" />,
          timeEstimate: '5 min'
        }
      ]
    },
    {
      id: 'store-settings',
      title: 'Store settings',
      tasks: [
        {
          id: 'business-details',
          title: 'Add business details',
          description: 'Add your business information',
          completed: false,
          buttonText: 'Add details',
          icon: <Package className="w-4 h-4" />,
          timeEstimate: '8 min'
        },
        {
          id: 'payment-provider',
          title: 'Set up payments',
          description: "Choose how you'll get paid",
          completed: false,
          buttonText: 'Set up',
          icon: <CreditCard className="w-4 h-4" />,
          timeEstimate: '5 min'
        },
        {
          id: 'tax-settings',
          title: 'Configure tax settings',
          description: 'Set up your tax rates and regions',
          completed: false,
          buttonText: 'Configure',
          icon: <Settings className="w-4 h-4" />,
          timeEstimate: '10 min'
        }
      ]
    },
    {
      id: 'marketing',
      title: 'Marketing setup',
      tasks: [
        {
          id: 'social-media',
          title: 'Connect social accounts',
          description: 'Link your social media profiles',
          completed: false,
          buttonText: 'Connect',
          icon: <Share2 className="w-4 h-4" />,
          timeEstimate: '5 min'
        },
        {
          id: 'notifications',
          title: 'Set up notifications',
          description: 'Configure email and SMS alerts',
          completed: false,
          buttonText: 'Configure',
          icon: <Bell className="w-4 h-4" />,
          timeEstimate: '3 min'
        }
      ]
    }
  ]);

  const totalTasks = sections.reduce((acc, section) => acc + section.tasks.length, 0);
  const completedTasks = sections.reduce((acc, section) => 
    acc + section.tasks.filter(task => task.completed).length, 0);
  const progressPercentage = (completedTasks / totalTasks) * 100;

  const toggleSection = (sectionId: string) => {
    setOpenSectionId(sectionId === openSectionId ? '' : sectionId);
  };

  const [storeInfo, setStoreInfo] = useState<StoreInfo>({
    name: 'My Store',
    lastUpdated: new Date().toISOString(),
    updatedBy: 'Admin'
  });
  const [newStoreName, setNewStoreName] = useState('');
  const [isNameDialogOpen, setIsNameDialogOpen] = useState(false);

  const handleStoreNameChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStoreName && newStoreName.length >= 3) {
      setStoreInfo({
        name: newStoreName,
        lastUpdated: new Date().toISOString(),
        updatedBy: 'Admin'
      });
      setIsNameDialogOpen(false);
      setNewStoreName('');
    }
  };

  const [isDomainDialogOpen, setIsDomainDialogOpen] = useState(false);
  const [domainInfo, setDomainInfo] = useState({
    customDomain: '',
    status: 'pending' as 'pending' | 'active' | 'error',
    currentDomain: 'mystore.axova.store'
  });
  const [domainError, setDomainError] = useState('');

  const validateDomain = (domain: string) => {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
    if (!domain) return 'Domain is required';
    if (!domainRegex.test(domain)) return 'Please enter a valid domain';
    return '';
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Premium Promotional Banner */}
      <div className="relative bg-black border-2 border-gray-200 text-white p-6 rounded-2xl mb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-sm font-medium tracking-wide text-gray-100">SPECIAL OFFER</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold">Get 3 months at 500 ETB / month</span>
                <ArrowRight className="w-4 h-4 text-gray-300 hidden sm:block" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="secondary" 
                size="sm" 
                className="h-9 bg-white hover:bg-gray-100 text-black font-medium border-0 px-6 rounded-lg w-full sm:w-auto transition-all duration-200"
              >
                Select plan
              </Button>
              <button className="text-gray-300 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
      </div>

      <div className="space-y-8">
        <div className="border-l-4 border-black pl-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
            <div className="space-y-3">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-black tracking-tight">Setup Guide</h1>
                <p className="text-gray-600 font-medium">
                  Complete these steps to launch your store
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border-2 border-black bg-white flex items-center justify-center">
                    <span className="text-sm font-bold text-black">{completedTasks}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">of {totalTasks} completed</span>
                </div>
                <div className="h-4 w-px bg-gray-300"></div>
                <span className="text-sm text-gray-500 font-medium">
                  {Math.round(progressPercentage)}% complete
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm"
                className="h-10 border-2 border-gray-300 hover:border-black bg-white hover:bg-gray-50 text-black font-medium px-6 rounded-lg transition-all duration-200"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                View Store
              </Button>
            </div>
          </div>

          {/* Advanced Progress Bar */}
          <div className="space-y-3">
            <div className="relative h-3 bg-gray-100 border border-gray-200 rounded-full overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 bg-black transition-all duration-700 ease-out flex items-center justify-end pr-1 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              >
                {progressPercentage > 15 && (
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            </div>
            <div className="flex justify-between text-xs font-medium">
              <span className="text-gray-500">Getting Started</span>
              <span className="text-gray-500">Store Ready</span>
            </div>
          </div>
        </div>

        {/* Advanced Setup Sections */}
        <div className="space-y-4">
          {sections.map((section, sectionIndex) => (
            <div 
              key={section.id} 
              className={`border-2 bg-white transition-all duration-300 rounded-xl overflow-hidden ${
                section.id === openSectionId 
                  ? 'border-black bg-gray-50/30' 
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <button
                onClick={() => toggleSection(section.id)}
                className={`w-full flex items-center justify-between p-5 transition-all duration-200 group ${
                  section.id === openSectionId 
                    ? 'bg-white border-b-2 border-gray-200' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 border-2 flex items-center justify-center transition-all duration-200 rounded-lg ${
                      section.tasks.every(task => task.completed) 
                        ? 'border-black bg-black' 
                        : 'border-gray-300 bg-white group-hover:border-gray-400'
                    }`}>
                      {section.tasks.every(task => task.completed) ? (
                        <Check className="w-4 h-4 text-white" />
                      ) : (
                        <span className="text-xs font-bold text-gray-600">{sectionIndex + 1}</span>
                      )}
                    </div>
                    <div className="text-left">
                      <span className="font-semibold text-black text-base block">{section.title}</span>
                      <span className="text-xs text-gray-500 font-medium">
                        {section.tasks.filter(task => task.completed).length} of {section.tasks.length} tasks completed
                      </span>
                    </div>
                  </div>
                  {section.tasks.every(task => task.completed) && (
                    <div className="bg-black text-white px-3 py-1 text-xs font-bold tracking-wide rounded-lg">
                      COMPLETED
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {section.id === openSectionId ? (
                    <ChevronUp className="w-5 h-5 text-black" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                  )}
                </div>
              </button>

              {section.id === openSectionId && (
                <div className="bg-white">
                  {section.tasks.map((task, taskIndex) => (
                    <div
                      key={task.id}
                      className={`p-6 flex items-start gap-4 group transition-all duration-200 ${
                        taskIndex !== section.tasks.length - 1 ? 'border-b border-gray-200' : ''
                      } hover:bg-gray-50`}
                    >
                      <button
                        className={`w-6 h-6 border-2 flex-shrink-0 mt-1 flex items-center justify-center transition-all duration-200 rounded-lg ${
                          task.completed 
                            ? 'bg-black border-black' 
                            : 'border-gray-300 bg-white group-hover:border-gray-500'
                        }`}
                      >
                        {task.completed && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <h3 className="font-semibold text-black text-base">{task.title}</h3>
                              {task.timeEstimate && (
                                <div className="bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 border border-gray-200 rounded-md">
                                  {task.timeEstimate}
                                </div>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 font-medium">
                              {task.description}
                            </p>
                          </div>
                          {task.id === 'name-store' && (
                            <Dialog open={isNameDialogOpen} onOpenChange={setIsNameDialogOpen}>
                              <DialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className={`h-10 text-sm font-medium transition-all duration-200 w-full lg:w-auto border-2 rounded-lg ${
                                    task.completed 
                                      ? 'bg-black text-white border-black hover:bg-gray-800' 
                                      : 'bg-white text-black border-gray-300 hover:border-black hover:bg-gray-50'
                                  }`}
                                >
                                  {task.icon}
                                  <span className="ml-2">{task.buttonText}</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[500px] border border-gray-200 rounded-2xl bg-white">
                                <DialogHeader className="border-b border-gray-200 pb-4">
                                  <DialogTitle className="text-xl font-bold text-black">Edit Store Name</DialogTitle>
                                  <DialogDescription className="text-gray-600 font-medium">
                                    Change your store's name. This will be visible to your customers across all channels.
                                  </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleStoreNameChange}>
                                  <div className="space-y-6 py-6">
                                    {/* Current Store Info */}
                                    <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg">
                                      <div className="flex items-center gap-3 text-sm text-gray-700">
                                        <Store className="w-5 h-5" />
                                        <span className="font-medium">Current store name:</span>
                                        <span className="font-bold text-black">{storeInfo.name}</span>
                                      </div>
                                      <div className="mt-3 text-xs text-gray-500 font-medium border-t border-gray-200 pt-3">
                                        Last updated {new Date(storeInfo.lastUpdated).toLocaleDateString()} by {storeInfo.updatedBy}
                                      </div>
                                    </div>

                                    {/* New Name Input */}
                                    <div className="space-y-3">
                                      <Label htmlFor="storeName" className="text-sm font-semibold text-black">New store name</Label>
                                      <div className="relative">
                                        <Input
                                          id="storeName"
                                          value={newStoreName}
                                          onChange={(e) => setNewStoreName(e.target.value)}
                                          placeholder="Enter new store name"
                                          className="pr-24 h-12 border border-gray-300 rounded-lg focus:border-black bg-white text-black font-medium"
                                          autoComplete="off"
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                                          {newStoreName && (
                                            <Button
                                              type="button"
                                              variant="ghost"
                                              size="sm"
                                              className="h-6 w-6 p-0 hover:bg-gray-100 border border-gray-300 rounded-md"
                                              onClick={() => setNewStoreName('')}
                                            >
                                              <X className="h-3 w-3 text-gray-500" />
                                            </Button>
                                          )}
                                          <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 border border-gray-200 rounded-md">
                                            {newStoreName.length}/50
                                          </span>
                                        </div>
                                      </div>
                                      
                                      {/* Validation Messages */}
                                      <div className="text-sm space-y-2">
                                        {newStoreName.length < 3 && newStoreName.length > 0 && (
                                          <p className="text-gray-800 bg-gray-100 p-2 border-l-4 border-gray-400 font-medium">Store name must be at least 3 characters</p>
                                        )}
                                        {newStoreName.length > 50 && (
                                          <p className="text-gray-800 bg-gray-100 p-2 border-l-4 border-gray-400 font-medium">Store name cannot exceed 50 characters</p>
                                        )}
                                        {newStoreName === storeInfo.name && (
                                          <p className="text-gray-600 bg-gray-50 p-2 border-l-4 border-gray-300 font-medium">New name is same as current name</p>
                                        )}
                                      </div>
                                    </div>

                                    {/* Preview */}
                                    {newStoreName && (
                                      <div className="space-y-3">
                                        <Label className="text-sm font-semibold text-black">Preview</Label>
                                        <div className="p-4 border border-gray-200 bg-gray-50 rounded-lg">
                                          <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-black border-2 border-gray-300 flex items-center justify-center rounded-lg">
                                              <span className="text-white font-bold text-sm">
                                                {newStoreName.slice(0, 2).toUpperCase()}
                                              </span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                              <span className="font-bold text-black text-base">{newStoreName}</span>
                                              <span className="text-sm text-gray-600 font-medium">mystore.axova.com</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  <DialogFooter className="border-t border-gray-200 pt-6 flex gap-3">
                                    <Button 
                                      type="button" 
                                      variant="outline"
                                      className="h-11 px-6 border border-gray-300 bg-white text-black font-medium rounded-lg hover:border-gray-500 hover:bg-gray-50"
                                      onClick={() => {
                                        setIsNameDialogOpen(false);
                                        setNewStoreName('');
                                      }}
                                    >
                                      Cancel
                                    </Button>
                                    <Button 
                                      type="submit"
                                      className="h-11 px-6 bg-black text-white font-medium rounded-lg hover:bg-gray-800 border border-black disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-300"
                                      disabled={
                                        !newStoreName || 
                                        newStoreName === storeInfo.name || 
                                        newStoreName.length < 3 ||
                                        newStoreName.length > 50
                                      }
                                    >
                                      Save Changes
                                    </Button>
                                  </DialogFooter>
                                </form>
                              </DialogContent>
                            </Dialog>
                          )}
                          {task.id === 'add-domain' && (
                            <Dialog open={isDomainDialogOpen} onOpenChange={setIsDomainDialogOpen}>
                              <DialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="h-10 text-sm font-medium bg-white text-black border-2 border-gray-300 hover:border-black hover:bg-gray-50 transition-all duration-200 w-full lg:w-auto rounded-lg"
                                >
                                  {task.icon}
                                  <span className="ml-2">{task.buttonText}</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[600px] border-2 border-black rounded-2xl bg-white">
                                <DialogHeader className="border-b-2 border-gray-200 pb-4">
                                  <DialogTitle className="text-xl font-bold text-black">Add Custom Domain</DialogTitle>
                                  <DialogDescription className="text-gray-600 font-medium">
                                    Connect your existing domain to your store.
                                  </DialogDescription>
                                </DialogHeader>

                                <div className="space-y-6 py-6">
                                  {/* Current Domain Info */}
                                  <div className="bg-gray-50 p-4 border-2 border-gray-200 rounded-lg">
                                    <div className="flex items-center gap-3 text-sm text-gray-700">
                                      <Globe className="w-5 h-5" />
                                      <span className="font-medium">Current domain:</span>
                                      <span className="font-bold text-black">{domainInfo.currentDomain}</span>
                                    </div>
                                  </div>

                                  {/* Domain Input */}
                                  <div className="space-y-3">
                                    <Label className="text-sm font-semibold text-black">Enter your domain</Label>
                                    <div className="relative">
                                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                      <Input
                                        value={domainInfo.customDomain}
                                        onChange={(e) => {
                                          const domain = e.target.value;
                                          setDomainInfo(prev => ({ ...prev, customDomain: domain }));
                                          setDomainError(validateDomain(domain));
                                        }}
                                        placeholder="example.com"
                                        className="pl-12 h-12 border-2 border-gray-300 rounded-lg focus:border-black bg-white text-black font-medium"
                                      />
                                    </div>
                                    {domainError && (
                                      <p className="text-sm text-gray-800 bg-gray-100 p-2 border-l-4 border-gray-400 font-medium">{domainError}</p>
                                    )}
                                  </div>

                                  {/* Instructions */}
                                  <div className="space-y-4">
                                    <h4 className="text-base font-bold text-black">Next steps:</h4>
                                    <div className="space-y-3">
                                      {[
                                        'Update your DNS settings at your domain provider',
                                        'Add CNAME record pointing to axova.store',
                                        'Add TXT record for domain verification',
                                        'Wait for DNS propagation (up to 48 hours)'
                                      ].map((step, index) => (
                                        <div key={index} className="flex items-start gap-4 text-sm border-l-2 border-gray-200 pl-4 py-2">
                                          <div className="w-6 h-6 bg-black text-white flex items-center justify-center flex-shrink-0 font-bold text-xs rounded-md">
                                            {index + 1}
                                          </div>
                                          <span className="text-gray-700 font-medium">{step}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Domain Preview */}
                                  {domainInfo.customDomain && !domainError && (
                                    <div className="space-y-3">
                                      <Label className="text-sm font-semibold text-black">Preview</Label>
                                      <div className="p-4 border-2 border-gray-200 bg-gray-50 space-y-4 rounded-lg">
                                        <div className="flex items-center gap-4">
                                          <div className="w-12 h-12 bg-black border-2 border-gray-300 flex items-center justify-center rounded-lg">
                                            <Globe className="w-6 h-6 text-white" />
                                          </div>
                                          <div className="flex flex-col gap-1">
                                            <span className="font-bold text-black text-base">{domainInfo.customDomain}</span>
                                            <span className="text-sm text-gray-600 font-medium">Primary domain</span>
                                          </div>
                                        </div>
                                        <div className="text-sm bg-gray-100 text-gray-800 p-3 border-l-4 border-gray-400 font-medium">
                                          Domain will be connected after DNS verification
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <DialogFooter className="border-t-2 border-gray-200 pt-6 flex gap-3">
                                  <Button 
                                    type="button" 
                                    variant="outline"
                                    className="h-11 px-6 border-2 border-gray-300 bg-white text-black font-medium rounded-lg hover:border-gray-500 hover:bg-gray-50"
                                    onClick={() => {
                                      setIsDomainDialogOpen(false);
                                      setDomainInfo(prev => ({ ...prev, customDomain: '' }));
                                      setDomainError('');
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button 
                                    type="submit"
                                    className="h-11 px-6 bg-black text-white font-medium rounded-lg hover:bg-gray-800 border-2 border-black disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-300"
                                    disabled={!domainInfo.customDomain || !!domainError}
                                  >
                                    Connect Domain
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}