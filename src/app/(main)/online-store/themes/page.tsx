'use client';

import React, { useState, useEffect } from 'react';
import { 
  Palette,
  Plus,
  ExternalLink,
  MoreVertical,
  Lock,
  Eye,
  Copy,
  Trash2,
  Download,
  Settings,
  ChevronDown,
  Code,
  FileJson,
  Laptop,
  Smartphone,
  Tablet,
  ArrowUpDown,
  Check,
  AlertTriangle,
  Globe,
  FileText,
  Brush,
  Layout,
  Share2,
  History,
  Save,
  Undo,
  Redo,
  Loader2,
  X,
  Terminal,
  GitBranch,
  Clock,
  ShoppingBag,
  Users,
  DollarSign,
  TrendingUp,
  Settings2,
  PaintBucket,
  BoxSelect,
  Layers
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ThemesPage() {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('dawn');
  const [previewTimestamp, setPreviewTimestamp] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setPreviewTimestamp(Date.now());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-medium">Store Design</h1>
            <div className="h-6 w-px " />
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <PaintBucket className="w-4 h-4" />
              Dawn Theme
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Settings2 className="w-4 h-4 mr-2" />
              Customize Theme
            </Button>
            <Button>
              <Globe className="w-4 h-4 mr-2" />
              Visit Store
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-8">
        {/* Theme Info */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Palette className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-medium">Dawn Theme</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>Current Theme</span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        <BoxSelect className="w-3 h-3" />
                        Active
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline">
                    <Layers className="w-4 h-4 mr-2" />
                    Browse Themes
                  </Button>
                  <Button>
                    <Settings2 className="w-4 h-4 mr-2" />
                    Customize
                  </Button>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-6">
                <div className="space-y-1">
                  <div className="text-sm text-gray-500">Last Customized</div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    2 hours ago
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-500">Theme Version</div>
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-gray-400" />
                    v2.1.0
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-500">Store URL</div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-400" />
                    mystore.com
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Store Analytics */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">Store Performance</h2>
          <div className="grid grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-500">Today's Orders</div>
                  <ShoppingBag className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-2xl font-semibold">24</div>
                <div className="text-sm text-green-600 mt-1">↑ 8% from yesterday</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-500">Active Visitors</div>
                  <Users className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-2xl font-semibold">156</div>
                <div className="text-sm text-green-600 mt-1">↑ 12% from last hour</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-500">Today's Revenue</div>
                  <DollarSign className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-2xl font-semibold">$2,845</div>
                <div className="text-sm text-green-600 mt-1">↑ 15% from yesterday</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-500">Conversion Rate</div>
                  <TrendingUp className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-2xl font-semibold">3.2%</div>
                <div className="text-sm text-green-600 mt-1">↑ 0.5% improvement</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Preview Section */}
        <div>
          <h2 className="text-lg font-medium mb-4">Store Preview</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Label className="text-base">Live Preview</Label>
                    <Button variant="outline" size="sm">
                      <Settings2 className="w-4 h-4 mr-2" />
                      Customize Theme
                    </Button>
                  </div>
                  <div className="rounded-lg overflow-hidden bg-gray-50">
                    <div className="flex items-center justify-between p-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Globe className="w-4 h-4" />
                        test.myaxova.online
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setPreviewTimestamp(Date.now())}
                          className="h-8"
                        >
                          <Redo className="w-4 h-4 mr-2" />
                          Refresh
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8"
                          onClick={() => window.open('https://test.myaxova.online/', '_blank')}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="relative h-[calc(100vh-400px)] min-h-[500px]">
                      <iframe
                        key={previewTimestamp}
                        src="https://test.myaxova.online/"
                        className="w-full h-full"
                      />
                      {isCustomizing && (
                        <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                          <div className="bg-white rounded-lg p-4 flex items-center gap-3">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Customizing theme...</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-2 flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        Auto-refreshing every 10 seconds
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        Last refreshed: {new Date(previewTimestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-3">
                  <Button variant="outline">
                    <Undo className="w-4 h-4 mr-2" />
                    Discard Changes
                  </Button>
                  <Button>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}