'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Laptop,
  Tablet,
  Smartphone,
  Globe,
  Save,
  Undo,
  Redo,
  History,
  Search,
  ShoppingCart,
  ChevronRight,
  Plus,
  X,
  Check,
  Layout,
  Type,
  Palette,
  Box,
  Image as ImageIcon,
  Zap,
  Settings,
  Download,
  Upload,
  RefreshCw,
  Database,
  Terminal
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ThemeSettings {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    heading: string;
    border: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    baseSize: string;
    scale: string;
  };
  layout: {
    containerWidth: string;
    spacing: string;
    borderRadius: string;
  };
  header: {
    sticky: boolean;
    transparent: boolean;
    height: string;
    showSearch: boolean;
    showCart: boolean;
    menuStyle: 'dropdown' | 'mega' | 'sidebar';
  };
  footer: {
    columns: string;
    showNewsletter: boolean;
    showSocial: boolean;
    showPaymentIcons: boolean;
    darkMode: boolean;
  };
  buttons: {
    style: 'rounded' | 'pill' | 'square';
    size: 'small' | 'medium' | 'large';
    animation: boolean;
  };
  cards: {
    shadow: 'none' | 'small' | 'medium' | 'large';
    hover: boolean;
    borderWidth: string;
  };
  images: {
    aspectRatio: string;
    roundedCorners: boolean;
    hoverEffect: 'none' | 'zoom' | 'overlay';
  };
  animations: {
    pageTransitions: boolean;
    scrollEffects: boolean;
    duration: string;
  };
}

const defaultSettings: ThemeSettings = {
  colors: {
    primary: '#000000',
    secondary: '#4F46E5',
    background: '#FFFFFF',
    text: '#111827',
    heading: '#111827',
    border: '#E5E7EB'
  },
  typography: {
    headingFont: 'Inter',
    bodyFont: 'Inter',
    baseSize: '16px',
    scale: '1.2'
  },
  layout: {
    containerWidth: '1200px',
    spacing: '1rem',
    borderRadius: '0.5rem'
  },
  header: {
    sticky: true,
    transparent: false,
    height: '80px',
    showSearch: true,
    showCart: true,
    menuStyle: 'dropdown'
  },
  footer: {
    columns: '4',
    showNewsletter: true,
    showSocial: true,
    showPaymentIcons: true,
    darkMode: false
  },
  buttons: {
    style: 'rounded',
    size: 'medium',
    animation: true
  },
  cards: {
    shadow: 'small',
    hover: true,
    borderWidth: '1px'
  },
  images: {
    aspectRatio: '1/1',
    roundedCorners: true,
    hoverEffect: 'zoom'
  },
  animations: {
    pageTransitions: true,
    scrollEffects: true,
    duration: '300ms'
  }
};

const PreviewContent: React.FC<{ settings: ThemeSettings }> = ({ settings }) => {
  return (
    <iframe
      src="https://test.myaxova.online"
      className="w-full h-full border-0"
      style={{
        backgroundColor: settings.colors.background,
      }}
    />
  );
};

export default function ThemeCustomizer() {
  const [settings, setSettings] = useState<ThemeSettings>(defaultSettings);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeSection, setActiveSection] = useState('colors');
  const [history, setHistory] = useState<ThemeSettings[]>([defaultSettings]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const updateSettings = <K extends keyof ThemeSettings>(
    key: K,
    value: ThemeSettings[K]
  ) => {
    const newSettings = {
      ...settings,
      [key]: value
    };
    
    setSettings(newSettings);
    
    // Add to history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newSettings);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setSettings(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setSettings(history[historyIndex + 1]);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastRefreshed(new Date());
    setIsRefreshing(false);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="h-14 border-b bg-white flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/online-store/themes">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to themes
            </Button>
          </Link>
          <h1 className="font-medium">Customizing theme</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleUndo}
            disabled={historyIndex === 0}
          >
            <Undo className="w-4 h-4 mr-2" />
            Undo
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleRedo}
            disabled={historyIndex === history.length - 1}
          >
            <Redo className="w-4 h-4 mr-2" />
            Redo
          </Button>
          <Button variant="ghost" size="sm">
            <History className="w-4 h-4 mr-2" />
            History
          </Button>
          <Button size="sm">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-[300px] border-r bg-gray-50/80 flex flex-col">
          <div className="p-4 flex-1 overflow-y-auto">
            <Tabs defaultValue="theme">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="theme">Theme</TabsTrigger>
                <TabsTrigger value="pages">Pages</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="theme" className="mt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setActiveSection('colors')}
                      className={`p-3 rounded-lg border text-left hover:bg-white transition-colors ${
                        activeSection === 'colors' ? 'bg-white shadow-sm' : 'bg-transparent'
                      }`}
                    >
                      <Palette className="w-4 h-4 mb-2 text-gray-400" />
                      <div className="text-sm font-medium">Colors</div>
                    </button>
                    <button
                      onClick={() => setActiveSection('typography')}
                      className={`p-3 rounded-lg border text-left hover:bg-white transition-colors ${
                        activeSection === 'typography' ? 'bg-white shadow-sm' : 'bg-transparent'
                      }`}
                    >
                      <Type className="w-4 h-4 mb-2 text-gray-400" />
                      <div className="text-sm font-medium">Typography</div>
                    </button>
                    <button
                      onClick={() => setActiveSection('layout')}
                      className={`p-3 rounded-lg border text-left hover:bg-white transition-colors ${
                        activeSection === 'layout' ? 'bg-white shadow-sm' : 'bg-transparent'
                      }`}
                    >
                      <Layout className="w-4 h-4 mb-2 text-gray-400" />
                      <div className="text-sm font-medium">Layout</div>
                    </button>
                    <button
                      onClick={() => setActiveSection('buttons')}
                      className={`p-3 rounded-lg border text-left hover:bg-white transition-colors ${
                        activeSection === 'buttons' ? 'bg-white shadow-sm' : 'bg-transparent'
                      }`}
                    >
                      <Box className="w-4 h-4 mb-2 text-gray-400" />
                      <div className="text-sm font-medium">Buttons</div>
                    </button>
                    <button
                      onClick={() => setActiveSection('images')}
                      className={`p-3 rounded-lg border text-left hover:bg-white transition-colors ${
                        activeSection === 'images' ? 'bg-white shadow-sm' : 'bg-transparent'
                      }`}
                    >
                      <ImageIcon className="w-4 h-4 mb-2 text-gray-400" />
                      <div className="text-sm font-medium">Images</div>
                    </button>
                    <button
                      onClick={() => setActiveSection('animations')}
                      className={`p-3 rounded-lg border text-left hover:bg-white transition-colors ${
                        activeSection === 'animations' ? 'bg-white shadow-sm' : 'bg-transparent'
                      }`}
                    >
                      <Zap className="w-4 h-4 mb-2 text-gray-400" />
                      <div className="text-sm font-medium">Animations</div>
                    </button>
                    <button
                      onClick={() => setActiveSection('advanced')}
                      className={`p-3 rounded-lg border text-left hover:bg-white transition-colors ${
                        activeSection === 'advanced' ? 'bg-white shadow-sm' : 'bg-transparent'
                      }`}
                    >
                      <Settings className="w-4 h-4 mb-2 text-gray-400" />
                      <div className="text-sm font-medium">Advanced</div>
                    </button>
                  </div>

                  {activeSection === 'colors' && (
                    <Card>
                      <CardHeader className="p-4 pb-0">
                        <CardTitle className="text-sm">Color Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 space-y-4">
                        <div className="space-y-2">
                          <Label>Primary Color</Label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={settings.colors.primary}
                              onChange={(e) => updateSettings('colors', {
                                ...settings.colors,
                                primary: e.target.value
                              })}
                              className="w-8 h-8 rounded overflow-hidden"
                            />
                            <Input 
                              value={settings.colors.primary}
                              onChange={(e) => updateSettings('colors', {
                                ...settings.colors,
                                primary: e.target.value
                              })}
                              className="flex-1"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Secondary Color</Label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={settings.colors.secondary}
                              onChange={(e) => updateSettings('colors', {
                                ...settings.colors,
                                secondary: e.target.value
                              })}
                              className="w-8 h-8 rounded overflow-hidden"
                            />
                            <Input 
                              value={settings.colors.secondary}
                              onChange={(e) => updateSettings('colors', {
                                ...settings.colors,
                                secondary: e.target.value
                              })}
                              className="flex-1"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Background Color</Label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={settings.colors.background}
                              onChange={(e) => updateSettings('colors', {
                                ...settings.colors,
                                background: e.target.value
                              })}
                              className="w-8 h-8 rounded overflow-hidden"
                            />
                            <Input 
                              value={settings.colors.background}
                              onChange={(e) => updateSettings('colors', {
                                ...settings.colors,
                                background: e.target.value
                              })}
                              className="flex-1"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Text Color</Label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={settings.colors.text}
                              onChange={(e) => updateSettings('colors', {
                                ...settings.colors,
                                text: e.target.value
                              })}
                              className="w-8 h-8 rounded overflow-hidden"
                            />
                            <Input 
                              value={settings.colors.text}
                              onChange={(e) => updateSettings('colors', {
                                ...settings.colors,
                                text: e.target.value
                              })}
                              className="flex-1"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {activeSection === 'typography' && (
                    <Card>
                      <CardHeader className="p-4 pb-0">
                        <CardTitle className="text-sm">Typography Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 space-y-4">
                        <div className="space-y-2">
                          <Label>Heading Font</Label>
                          <Select
                            value={settings.typography.headingFont}
                            onValueChange={(value) => updateSettings('typography', {
                              ...settings.typography,
                              headingFont: value
                            })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Inter">Inter</SelectItem>
                              <SelectItem value="Roboto">Roboto</SelectItem>
                              <SelectItem value="Poppins">Poppins</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Body Font</Label>
                          <Select
                            value={settings.typography.bodyFont}
                            onValueChange={(value) => updateSettings('typography', {
                              ...settings.typography,
                              bodyFont: value
                            })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Inter">Inter</SelectItem>
                              <SelectItem value="Roboto">Roboto</SelectItem>
                              <SelectItem value="Poppins">Poppins</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Base Size</Label>
                          <Select
                            value={settings.typography.baseSize}
                            onValueChange={(value) => updateSettings('typography', {
                              ...settings.typography,
                              baseSize: value
                            })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="14px">Small (14px)</SelectItem>
                              <SelectItem value="16px">Medium (16px)</SelectItem>
                              <SelectItem value="18px">Large (18px)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Type Scale</Label>
                          <Select
                            value={settings.typography.scale}
                            onValueChange={(value) => updateSettings('typography', {
                              ...settings.typography,
                              scale: value
                            })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1.1">Minor Second (1.1)</SelectItem>
                              <SelectItem value="1.2">Major Second (1.2)</SelectItem>
                              <SelectItem value="1.333">Perfect Fourth (1.333)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {activeSection === 'layout' && (
                    <Card>
                      <CardHeader className="p-4 pb-0">
                        <CardTitle className="text-sm">Layout Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 space-y-4">
                        <div className="space-y-2">
                          <Label>Container Width</Label>
                          <Select
                            value={settings.layout.containerWidth}
                            onValueChange={(value) => updateSettings('layout', {
                              ...settings.layout,
                              containerWidth: value
                            })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1000px">Small (1000px)</SelectItem>
                              <SelectItem value="1200px">Medium (1200px)</SelectItem>
                              <SelectItem value="1400px">Large (1400px)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Spacing Scale</Label>
                          <Select
                            value={settings.layout.spacing}
                            onValueChange={(value) => updateSettings('layout', {
                              ...settings.layout,
                              spacing: value
                            })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0.75rem">Compact (0.75rem)</SelectItem>
                              <SelectItem value="1rem">Normal (1rem)</SelectItem>
                              <SelectItem value="1.5rem">Relaxed (1.5rem)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Border Radius</Label>
                          <Select
                            value={settings.layout.borderRadius}
                            onValueChange={(value) => updateSettings('layout', {
                              ...settings.layout,
                              borderRadius: value
                            })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">None</SelectItem>
                              <SelectItem value="0.25rem">Small (0.25rem)</SelectItem>
                              <SelectItem value="0.5rem">Medium (0.5rem)</SelectItem>
                              <SelectItem value="1rem">Large (1rem)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {activeSection === 'header' && (
                    <Card>
                      <CardHeader className="p-4 pb-0">
                        <CardTitle className="text-sm">Header Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Sticky Header</Label>
                            <p className="text-sm text-gray-500">Keep header visible while scrolling</p>
                          </div>
                          <Switch
                            checked={settings.header.sticky}
                            onCheckedChange={(checked) => updateSettings('header', {
                              ...settings.header,
                              sticky: checked
                            })}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Transparent</Label>
                            <p className="text-sm text-gray-500">Make header background transparent</p>
                          </div>
                          <Switch
                            checked={settings.header.transparent}
                            onCheckedChange={(checked) => updateSettings('header', {
                              ...settings.header,
                              transparent: checked
                            })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Height</Label>
                          <Select
                            value={settings.header.height}
                            onValueChange={(value) => updateSettings('header', {
                              ...settings.header,
                              height: value
                            })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="60px">Compact (60px)</SelectItem>
                              <SelectItem value="80px">Normal (80px)</SelectItem>
                              <SelectItem value="100px">Large (100px)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Show Search</Label>
                            <p className="text-sm text-gray-500">Display search icon in header</p>
                          </div>
                          <Switch
                            checked={settings.header.showSearch}
                            onCheckedChange={(checked) => updateSettings('header', {
                              ...settings.header,
                              showSearch: checked
                            })}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Show Cart</Label>
                            <p className="text-sm text-gray-500">Display cart icon in header</p>
                          </div>
                          <Switch
                            checked={settings.header.showCart}
                            onCheckedChange={(checked) => updateSettings('header', {
                              ...settings.header,
                              showCart: checked
                            })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Menu Style</Label>
                          <Select
                            value={settings.header.menuStyle}
                            onValueChange={(value: 'dropdown' | 'mega' | 'sidebar') => updateSettings('header', {
                              ...settings.header,
                              menuStyle: value
                            })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="dropdown">Dropdown Menu</SelectItem>
                              <SelectItem value="mega">Mega Menu</SelectItem>
                              <SelectItem value="sidebar">Sidebar Menu</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {activeSection === 'footer' && (
                    <Card>
                      <CardHeader className="p-4 pb-0">
                        <CardTitle className="text-sm">Footer Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 space-y-4">
                        <div className="space-y-2">
                          <Label>Columns</Label>
                          <Select
                            value={settings.footer.columns}
                            onValueChange={(value) => updateSettings('footer', {
                              ...settings.footer,
                              columns: value
                            })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2">2 columns</SelectItem>
                              <SelectItem value="3">3 columns</SelectItem>
                              <SelectItem value="4">4 columns</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Newsletter</Label>
                            <p className="text-sm text-gray-500">Show newsletter signup form</p>
                          </div>
                          <Switch
                            checked={settings.footer.showNewsletter}
                            onCheckedChange={(checked) => updateSettings('footer', {
                              ...settings.footer,
                              showNewsletter: checked
                            })}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Social Links</Label>
                            <p className="text-sm text-gray-500">Show social media icons</p>
                          </div>
                          <Switch
                            checked={settings.footer.showSocial}
                            onCheckedChange={(checked) => updateSettings('footer', {
                              ...settings.footer,
                              showSocial: checked
                            })}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Payment Icons</Label>
                            <p className="text-sm text-gray-500">Show accepted payment methods</p>
                          </div>
                          <Switch
                            checked={settings.footer.showPaymentIcons}
                            onCheckedChange={(checked) => updateSettings('footer', {
                              ...settings.footer,
                              showPaymentIcons: checked
                            })}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Dark Mode</Label>
                            <p className="text-sm text-gray-500">Use dark background for footer</p>
                          </div>
                          <Switch
                            checked={settings.footer.darkMode}
                            onCheckedChange={(checked) => updateSettings('footer', {
                              ...settings.footer,
                              darkMode: checked
                            })}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {activeSection === 'buttons' && (
                    <Card>
                      <CardHeader className="p-4 pb-0">
                        <CardTitle className="text-sm">Button Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 space-y-4">
                        <div className="space-y-2">
                          <Label>Style</Label>
                          <Select
                            value={settings.buttons.style}
                            onValueChange={(value: 'rounded' | 'pill' | 'square') => updateSettings('buttons', {
                              ...settings.buttons,
                              style: value
                            })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="rounded">Rounded</SelectItem>
                              <SelectItem value="pill">Pill</SelectItem>
                              <SelectItem value="square">Square</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Size</Label>
                          <Select
                            value={settings.buttons.size}
                            onValueChange={(value: 'small' | 'medium' | 'large') => updateSettings('buttons', {
                              ...settings.buttons,
                              size: value
                            })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="small">Small</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="large">Large</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Animation</Label>
                            <p className="text-sm text-gray-500">Add hover and click effects</p>
                          </div>
                          <Switch
                            checked={settings.buttons.animation}
                            onCheckedChange={(checked) => updateSettings('buttons', {
                              ...settings.buttons,
                              animation: checked
                            })}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {activeSection === 'cards' && (
                    <Card>
                      <CardHeader className="p-4 pb-0">
                        <CardTitle className="text-sm">Card Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 space-y-4">
                        <div className="space-y-2">
                          <Label>Shadow</Label>
                          <Select
                            value={settings.cards.shadow}
                            onValueChange={(value: 'none' | 'small' | 'medium' | 'large') => updateSettings('cards', {
                              ...settings.cards,
                              shadow: value
                            })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="small">Small</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="large">Large</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Hover Effect</Label>
                            <p className="text-sm text-gray-500">Lift card on hover</p>
                          </div>
                          <Switch
                            checked={settings.cards.hover}
                            onCheckedChange={(checked) => updateSettings('cards', {
                              ...settings.cards,
                              hover: checked
                            })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Border Width</Label>
                          <Select
                            value={settings.cards.borderWidth}
                            onValueChange={(value) => updateSettings('cards', {
                              ...settings.cards,
                              borderWidth: value
                            })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">None</SelectItem>
                              <SelectItem value="1px">Thin (1px)</SelectItem>
                              <SelectItem value="2px">Medium (2px)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {activeSection === 'images' && (
                    <Card>
                      <CardHeader className="p-4 pb-0">
                        <CardTitle className="text-sm">Image Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 space-y-4">
                        <div className="space-y-2">
                          <Label>Aspect Ratio</Label>
                          <Select
                            value={settings.images.aspectRatio}
                            onValueChange={(value) => updateSettings('images', {
                              ...settings.images,
                              aspectRatio: value
                            })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1/1">Square (1:1)</SelectItem>
                              <SelectItem value="4/3">Standard (4:3)</SelectItem>
                              <SelectItem value="16/9">Widescreen (16:9)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Rounded Corners</Label>
                            <p className="text-sm text-gray-500">Apply border radius to images</p>
                          </div>
                          <Switch
                            checked={settings.images.roundedCorners}
                            onCheckedChange={(checked) => updateSettings('images', {
                              ...settings.images,
                              roundedCorners: checked
                            })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Hover Effect</Label>
                          <Select
                            value={settings.images.hoverEffect}
                            onValueChange={(value: 'none' | 'zoom' | 'overlay') => updateSettings('images', {
                              ...settings.images,
                              hoverEffect: value
                            })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="zoom">Zoom</SelectItem>
                              <SelectItem value="overlay">Overlay</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {activeSection === 'animations' && (
                    <Card>
                      <CardHeader className="p-4 pb-0">
                        <CardTitle className="text-sm">Animation Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Page Transitions</Label>
                            <p className="text-sm text-gray-500">Animate page changes</p>
                          </div>
                          <Switch
                            checked={settings.animations.pageTransitions}
                            onCheckedChange={(checked) => updateSettings('animations', {
                              ...settings.animations,
                              pageTransitions: checked
                            })}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Scroll Effects</Label>
                            <p className="text-sm text-gray-500">Animate elements on scroll</p>
                          </div>
                          <Switch
                            checked={settings.animations.scrollEffects}
                            onCheckedChange={(checked) => updateSettings('animations', {
                              ...settings.animations,
                              scrollEffects: checked
                            })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Duration</Label>
                          <Select
                            value={settings.animations.duration}
                            onValueChange={(value) => updateSettings('animations', {
                              ...settings.animations,
                              duration: value
                            })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="150ms">Fast (150ms)</SelectItem>
                              <SelectItem value="300ms">Normal (300ms)</SelectItem>
                              <SelectItem value="500ms">Slow (500ms)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {activeSection === 'advanced' && (
                    <Card>
                      <CardHeader className="p-4 pb-0">
                        <CardTitle className="text-sm">Advanced Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 space-y-4">
                        <div className="space-y-2">
                          <Label>Custom CSS</Label>
                          <textarea
                            className="w-full h-32 p-2 text-sm font-mono border rounded-md"
                            placeholder=".my-class { color: red; }"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Custom JavaScript</Label>
                          <textarea
                            className="w-full h-32 p-2 text-sm font-mono border rounded-md"
                            placeholder="// Your custom JavaScript code"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Meta Tags</Label>
                          <div className="space-y-3">
                            <Input placeholder="Meta Title" />
                            <textarea
                              className="w-full h-20 p-2 text-sm border rounded-md"
                              placeholder="Meta Description"
                            />
                            <Input placeholder="Meta Keywords" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Social Media</Label>
                          <div className="space-y-3">
                            <Input placeholder="OG Title" />
                            <Input placeholder="OG Description" />
                            <Input placeholder="OG Image URL" />
                            <Input placeholder="Twitter Card Type" />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Lazy Loading</Label>
                              <p className="text-sm text-gray-500">Enable image lazy loading</p>
                            </div>
                            <Switch />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Minification</Label>
                              <p className="text-sm text-gray-500">Minify CSS and JavaScript</p>
                            </div>
                            <Switch />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Browser Caching</Label>
                              <p className="text-sm text-gray-500">Enable browser caching</p>
                            </div>
                            <Switch />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Analytics</Label>
                          <div className="space-y-3">
                            <Input placeholder="Google Analytics ID" />
                            <Input placeholder="Facebook Pixel ID" />
                            <Input placeholder="Hotjar ID" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Code Injection</Label>
                          <div className="space-y-3">
                            <div className="space-y-2">
                              <Label className="text-sm text-gray-500">Header</Label>
                              <textarea
                                className="w-full h-24 p-2 text-sm font-mono border rounded-md"
                                placeholder="<!-- Code to inject in <head> -->"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm text-gray-500">Footer</Label>
                              <textarea
                                className="w-full h-24 p-2 text-sm font-mono border rounded-md"
                                placeholder="<!-- Code to inject before </body> -->"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Advanced Tooling</Label>
                          <div className="grid grid-cols-2 gap-3">
                            <Card className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                              <Terminal className="w-4 h-4 mb-2 text-gray-400" />
                              <h3 className="text-sm font-medium">Theme CLI</h3>
                              <p className="text-xs text-gray-500 mt-1">
                                Command-line theme management
                              </p>
                            </Card>

                            <Card className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                              <Database className="w-4 h-4 mb-2 text-gray-400" />
                              <h3 className="text-sm font-medium">Theme Database</h3>
                              <p className="text-xs text-gray-500 mt-1">
                                Manage theme data and backups
                              </p>
                            </Card>

                            <Card className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                              <Settings className="w-4 h-4 mb-2 text-gray-400" />
                              <h3 className="text-sm font-medium">Theme API</h3>
                              <p className="text-xs text-gray-500 mt-1">
                                Access theme API endpoints
                              </p>
                            </Card>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Development Tools</Label>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Debug Mode</Label>
                                <p className="text-sm text-gray-500">Enable development debugging</p>
                              </div>
                              <Switch />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Hot Reload</Label>
                                <p className="text-sm text-gray-500">Auto-refresh on theme changes</p>
                              </div>
                              <Switch />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Error Tracking</Label>
                                <p className="text-sm text-gray-500">Monitor JavaScript errors</p>
                              </div>
                              <Switch />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Theme Validation</Label>
                          <Button variant="outline" className="w-full">
                            Run Theme Validator
                          </Button>
                          <p className="text-xs text-gray-500">
                            Check theme for common issues and best practices
                          </p>
                        </div>

                        <div className="space-y-3">
                          <Button variant="outline" className="w-full">
                            <Download className="w-4 h-4 mr-2" />
                            Export Theme Settings
                          </Button>
                          <Button variant="outline" className="w-full">
                            <Upload className="w-4 h-4 mr-2" />
                            Import Theme Settings
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="pages">
                <div className="text-center py-8 text-gray-500">
                  <p>Page customization coming soon</p>
                </div>
              </TabsContent>

              <TabsContent value="settings">
                <div className="text-center py-8 text-gray-500">
                  <p>Theme settings coming soon</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 bg-gray-100 p-4">
          <div className="h-full flex flex-col">
            {/* Preview Controls */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-white rounded-full px-1 py-1 shadow-sm border">
                  <button
                    onClick={() => setPreviewDevice('desktop')}
                    className={`p-1 rounded-md transition-colors ${
                      previewDevice === 'desktop' 
                        ? 'text-black bg-gray-100' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Laptop className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPreviewDevice('tablet')}
                    className={`p-1 rounded-md transition-colors ${
                      previewDevice === 'tablet' 
                        ? 'text-black bg-gray-100' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Tablet className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPreviewDevice('mobile')}
                    className={`p-1 rounded-md transition-colors ${
                      previewDevice === 'mobile' 
                        ? 'text-black bg-gray-100' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                  <span>
                    Last refreshed: {lastRefreshed.toLocaleTimeString()}
                  </span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Globe className="w-4 h-4" />
                View live site
              </Button>
            </div>

            {/* Preview Frame */}
            <div className="flex-1 rounded-lg border bg-white overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${
                  previewDevice === 'mobile' ? 'w-[375px] mx-auto' :
                  previewDevice === 'tablet' ? 'w-[768px] mx-auto' :
                  'w-full'
                }`}
                style={{
                  height: '100%',
                  overflow: 'hidden'
                }}
              >
                <PreviewContent settings={settings} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}