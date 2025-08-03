'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  PlusIcon,
  MoreVertical,
  Search,
  Calendar,
  TrendingUp,
  DollarSign,
  BarChart4,
  Megaphone,
  Edit,
  Copy,
  Trash2,
  Eye,
  Filter,
  LayoutGrid,
  LayoutList
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'draft' | 'completed';
  startDate: string;
  endDate: string;
  budget: number;
  performance: number;
  description?: string;
  type?: 'email' | 'social' | 'display' | 'search';
  reach?: number;
  image?: string;
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Summer Sale 2024',
      status: 'active',
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      budget: 5000,
      performance: 127,
      description: 'Promoting seasonal products with special discounts',
      type: 'email',
      reach: 15000,
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&auto=format&fit=crop&q=60'
    },
    {
      id: '2',
      name: 'Back to School',
      status: 'draft',
      startDate: '2024-08-15',
      endDate: '2024-09-15',
      budget: 3000,
      performance: 0,
      description: 'Targeting parents and students for school season',
      type: 'social',
      reach: 8000,
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=60'
    },
    {
      id: '3',
      name: 'Holiday Promotions',
      status: 'completed',
      startDate: '2023-11-15',
      endDate: '2023-12-31',
      budget: 7500,
      performance: 143,
      description: 'End of year holiday special offers and discounts',
      type: 'display',
      reach: 25000,
      image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=600&auto=format&fit=crop&q=60'
    },
    {
      id: '4',
      name: 'Spring Collection Launch',
      status: 'active',
      startDate: '2024-03-01',
      endDate: '2024-04-30',
      budget: 4200,
      performance: 112,
      description: 'Introducing new spring fashion items',
      type: 'search',
      reach: 18000,
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop&q=60'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [isMobile, setIsMobile] = useState(false);

  // Check if the device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Force card view on mobile
  const effectiveViewMode = isMobile ? 'card' : viewMode;
  
  // Filter campaigns based on search and status
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (campaign.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    const matchesStatus = selectedStatus === 'all' || campaign.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate metrics
  const activeCampaigns = campaigns.filter((c) => c.status === 'active').length;
  const totalBudget = campaigns.reduce((acc, curr) => acc + curr.budget, 0);
  const avgPerformance = Math.round(
    campaigns.filter(c => c.performance > 0).reduce((acc, curr) => acc + curr.performance, 0) / 
    campaigns.filter(c => c.performance > 0).length
  );
  const totalReach = campaigns.reduce((acc, curr) => acc + (curr.reach || 0), 0);

  // Helper function for status badge
  const getStatusBadge = (status: Campaign['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 hover:bg-green-100 text-green-800 border-green-200">Active</Badge>;
      case 'draft':
        return <Badge className="bg-gray-100 hover:bg-gray-100 text-gray-800 border-gray-200">Draft</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 hover:bg-blue-100 text-blue-800 border-blue-200">Completed</Badge>;
    }
  };

  const getCampaignTypeIcon = (type?: Campaign['type']) => {
    switch (type) {
      case 'email':
        return <Megaphone className="w-4 h-4 mr-1" />;
      case 'social':
        return <TrendingUp className="w-4 h-4 mr-1" />;
      case 'display':
        return <BarChart4 className="w-4 h-4 mr-1" />;
      case 'search':
        return <Search className="w-4 h-4 mr-1" />;
      default:
        return <Megaphone className="w-4 h-4 mr-1" />;
    }
  };

  return (
    <div className="h-full p-4 sm:p-6 space-y-8">
      <div className="max-w-[1200px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Marketing Campaigns</h1>
            <p className="text-gray-500 mt-1">Manage your marketing initiatives</p>
          </div>
          <Button className="w-full sm:w-auto">
            <PlusIcon className="w-4 h-4 mr-2" />
            Create Campaign
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active Campaigns</CardDescription>
              <CardTitle className="text-2xl font-bold flex items-center">
                {activeCampaigns}
                <span className="ml-2 text-green-500 text-sm font-normal">
                  {(activeCampaigns / campaigns.length * 100).toFixed(0)}%
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-gray-500 text-sm">
                <Megaphone className="w-4 h-4 mr-1" />
                <span>of total campaigns</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Budget</CardDescription>
              <CardTitle className="text-2xl font-bold flex items-center">
                ${totalBudget.toLocaleString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-gray-500 text-sm">
                <DollarSign className="w-4 h-4 mr-1" />
                <span>allocated across all campaigns</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Average Performance</CardDescription>
              <CardTitle className="text-2xl font-bold flex items-center">
                {avgPerformance}%
                <span className={`ml-2 ${avgPerformance > 100 ? 'text-green-500' : 'text-amber-500'} text-sm font-normal`}>
                  {avgPerformance > 100 ? '+' + (avgPerformance - 100) + '%' : (100 - avgPerformance) + '% to goal'}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-gray-500 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>compared to targets</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Audience Reach</CardDescription>
              <CardTitle className="text-2xl font-bold">
                {(totalReach / 1000).toFixed(1)}k
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-gray-500 text-sm">
                <BarChart4 className="w-4 h-4 mr-1" />
                <span>potential impressions</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search campaigns..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* View Switcher - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant={effectiveViewMode === 'table' ? 'default' : 'outline'}
              size="sm"
              className="gap-2"
              onClick={() => setViewMode('table')}
            >
              <LayoutList className="w-4 h-4" />
              Table
            </Button>
            <Button
              variant={effectiveViewMode === 'card' ? 'default' : 'outline'}
              size="sm"
              className="gap-2"
              onClick={() => setViewMode('card')}
            >
              <LayoutGrid className="w-4 h-4" />
              Cards
            </Button>
          </div>
        </div>

        {/* Campaign List */}
        <div>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Campaigns</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              {filteredCampaigns.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-lg border">
                  <Megaphone className="w-12 h-12 mx-auto text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium">No campaigns found</h3>
                  <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
                </div>
              ) : effectiveViewMode === 'table' ? (
                // Table View
                <Card className="overflow-hidden">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="min-w-[250px]">Campaign</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Date Range</TableHead>
                          <TableHead>Budget</TableHead>
                          <TableHead>Performance</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCampaigns.map((campaign) => (
                          <TableRow key={campaign.id} className="group">
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-3">
                                {campaign.image ? (
                                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                                    <img 
                                      src={campaign.image} 
                                      alt={campaign.name} 
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ) : (
                                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                    <Megaphone className="w-5 h-5 text-gray-400" />
                                  </div>
                                )}
                                <div>
                                  <div className="font-medium">{campaign.name}</div>
                                  <div className="text-xs text-gray-500 truncate max-w-[200px]">
                                    {campaign.description}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                            <TableCell>
                              <div className="flex items-center text-gray-600">
                                {getCampaignTypeIcon(campaign.type)}
                                {campaign.type || 'General'}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-gray-600">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span className="text-sm whitespace-nowrap">
                                  {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>${campaign.budget.toLocaleString()}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <span className={`font-medium ${campaign.performance > 100 ? 'text-green-600' : campaign.performance === 0 ? 'text-gray-500' : 'text-amber-600'}`}>
                                  {campaign.performance}%
                                </span>
                                {campaign.performance > 0 && (
                                  <div className={`w-24 bg-gray-100 h-2 rounded-full overflow-hidden`}>
                                    <div 
                                      className={`h-full rounded-full ${campaign.performance >= 100 ? 'bg-green-500' : 'bg-amber-500'}`}
                                      style={{ width: `${Math.min(campaign.performance, 100)}%` }}
                                    ></div>
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Copy className="w-4 h-4 mr-2" />
                                    Duplicate
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </Card>
              ) : (
                // Card View
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCampaigns.map((campaign) => (
                    <Card key={campaign.id} className="overflow-hidden flex flex-col h-full">
                      {/* Card Image */}
                      <div className="relative w-full h-40 overflow-hidden">
                        {campaign.image ? (
                          <img 
                            src={campaign.image} 
                            alt={campaign.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <Megaphone className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                        <div className="absolute top-0 left-0 w-full p-3 bg-gradient-to-b from-black/60 to-transparent">
                          <div className="flex justify-between items-center">
                            {getStatusBadge(campaign.status)}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="secondary" size="icon" className="h-8 w-8 shadow-sm">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Copy className="w-4 h-4 mr-2" />
                                  Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                      
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                          <div className="flex items-center">
                            {getCampaignTypeIcon(campaign.type)}
                            {campaign.type || 'General'}
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(campaign.startDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg line-clamp-1">{campaign.name}</CardTitle>
                      </CardHeader>
                      
                      <CardContent className="pb-3 flex-grow">
                        {campaign.description && (
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {campaign.description}
                          </p>
                        )}
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Budget:</span>
                            <span className="font-medium">${campaign.budget.toLocaleString()}</span>
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Audience:</span>
                            <span className="font-medium">{campaign.reach?.toLocaleString() || 'N/A'}</span>
                          </div>
                          
                          {campaign.performance > 0 && (
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Performance:</span>
                                <span className={`font-medium ${campaign.performance > 100 ? 'text-green-600' : 'text-amber-600'}`}>
                                  {campaign.performance}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${campaign.performance >= 100 ? 'bg-green-500' : 'bg-amber-500'}`}
                                  style={{ width: `${Math.min(campaign.performance, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                      
                      <CardContent className="pt-0 pb-4">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="w-3.5 h-3.5 mr-1" />
                            View
                          </Button>
                          <Button size="sm" className="flex-1">
                            <Edit className="w-3.5 h-3.5 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="active">
              {/* Active campaigns content - similar to "all" but filtered */}
              {/* You can reuse the same structure as above but with filtered data */}
            </TabsContent>
            
            <TabsContent value="draft">
              {/* Draft campaigns content */}
            </TabsContent>
            
            <TabsContent value="completed">
              {/* Completed campaigns content */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
} 