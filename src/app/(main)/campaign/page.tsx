'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  PlusCircle, 
  BarChart2, 
  Settings, 
  Users, 
  DollarSign,
  Calendar as CalendarIcon,
  Target,
  TrendingUp,
  Filter,
  Search,
  MoreVertical,
  Download,
  Share2,
  Eye,
  Pause,
  Play,
  Trash2,
  Edit2,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Bell,
  AlertCircle,
  CheckCircle2,
  XCircle,
  LineChart,
  PieChart,
  Users2,
  Globe,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Hash,
  Sparkles,
  Star,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Zap
} from "lucide-react";
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
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DateRange } from "react-day-picker";
import { addDays, format, subDays } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed' | 'draft';
  budget: number;
  spent: number;
  startDate: Date;
  endDate: Date;
  targetAudience: string;
  type: 'email' | 'social' | 'display' | 'search';
  performance: {
    impressions: number;
    clicks: number;
    conversions: number;
    ctr: number;
    cpc: number;
    roas: number;
  };
  dailyStats: {
    date: Date;
    impressions: number;
    clicks: number;
    conversions: number;
  }[];
}

export default function CampaignManagementPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 0, 20), 20),
  });
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Summer Sale 2024',
      status: 'active',
      budget: 5000,
      spent: 2500,
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-08-31'),
      targetAudience: 'All Customers',
      type: 'social',
      performance: {
        impressions: 10000,
        clicks: 500,
        conversions: 50,
        ctr: 5.0,
        cpc: 2.5,
        roas: 4.2
      },
      dailyStats: Array.from({ length: 30 }, (_, i) => ({
        date: addDays(new Date(), -i),
        impressions: Math.floor(Math.random() * 1000),
        clicks: Math.floor(Math.random() * 100),
        conversions: Math.floor(Math.random() * 10)
      }))
    },
    {
      id: '2',
      name: 'New Product Launch',
      status: 'draft',
      budget: 3000,
      spent: 0,
      startDate: new Date('2024-07-01'),
      endDate: new Date('2024-07-31'),
      targetAudience: 'Premium Members',
      type: 'email',
      performance: {
        impressions: 0,
        clicks: 0,
        conversions: 0,
        ctr: 0,
        cpc: 0,
        roas: 0
      },
      dailyStats: []
    },
    {
      id: '3',
      name: 'Holiday Special',
      status: 'completed',
      budget: 8000,
      spent: 8000,
      startDate: new Date('2023-12-01'),
      endDate: new Date('2023-12-31'),
      targetAudience: 'All Customers',
      type: 'display',
      performance: {
        impressions: 25000,
        clicks: 1200,
        conversions: 180,
        ctr: 4.8,
        cpc: 3.2,
        roas: 5.6
      },
      dailyStats: Array.from({ length: 31 }, (_, i) => ({
        date: addDays(new Date('2023-12-01'), i),
        impressions: Math.floor(Math.random() * 1000),
        clicks: Math.floor(Math.random() * 100),
        conversions: Math.floor(Math.random() * 10)
      }))
    }
  ]);

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || campaign.status === filterStatus;
    const matchesType = filterType === "all" || campaign.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);
  const totalConversions = campaigns.reduce((sum, c) => sum + c.performance.conversions, 0);
  const averageROAS = campaigns.reduce((sum, c) => sum + c.performance.roas, 0) / campaigns.length;

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 p-4 sm:p-6 rounded-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold">Campaign Management</h1>
            <Badge variant="outline" className="text-blue-500 border-blue-200">
              Axova
            </Badge>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground">Monitor and optimize your marketing campaigns</p>
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <Badge variant="secondary" className="gap-1">
              <CheckCircle2 className="w-3 h-3" />
              {campaigns.filter(c => c.status === 'active').length} Active
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Clock className="w-3 h-3" />
              {campaigns.filter(c => c.status === 'draft').length} Drafts
            </Badge>
            <Badge variant="outline" className="gap-1">
              <XCircle className="w-3 h-3" />
              {campaigns.filter(c => c.status === 'paused').length} Paused
            </Badge>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
                  <Bell className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Campaign Notifications</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button variant="outline" className="gap-2 h-8 sm:h-10">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Report</span>
          </Button>
          <Button variant="outline" className="gap-2 h-8 sm:h-10">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
          </Button>
          <Button className="gap-2 h-8 sm:h-10">
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Create Campaign</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-none shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <div className="rounded-full bg-blue-100 p-2 text-blue-600">
              <DollarSign className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">${totalBudget.toLocaleString()}</div>
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs mb-1">
                <span>Spent: ${totalSpent.toLocaleString()}</span>
                <span className="text-green-600">{((totalSpent / totalBudget) * 100).toFixed(1)}%</span>
              </div>
              <Progress value={(totalSpent / totalBudget) * 100} className="h-1.5" />
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3 text-green-500" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-none shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            <div className="rounded-full bg-green-100 p-2 text-green-600">
              <TrendingUp className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalConversions.toLocaleString()}</div>
            <div className="mt-2 space-y-2">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Rate</span>
                  <span className="font-medium">4.28%</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Previous</span>
                  <span className="font-medium">3.96%</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3 text-green-500" />
              +8.1% conversion rate
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-none shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROAS</CardTitle>
            <div className="rounded-full bg-purple-100 p-2 text-purple-600">
              <BarChart2 className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageROAS.toFixed(1)}x</div>
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <Progress value={75} className="h-1.5" />
                <span className="text-xs font-medium">75%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500" />
              Top performing metric
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-none shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <div className="rounded-full bg-orange-100 p-2 text-orange-600">
              <Zap className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaigns.filter(c => c.status === 'active').length}
            </div>
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs">
                <div className="space-x-1">
                  <Badge variant="secondary" className="bg-green-100 text-green-700">Social</Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">Email</Badge>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <Users2 className="w-3 h-3" />
              {campaigns.length} total campaigns
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card className="border-none shadow-xl">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <CardTitle>Active Campaigns</CardTitle>
                  <CardDescription>Manage and monitor your running campaigns</CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="relative w-full sm:w-[200px]">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search campaigns..."
                      className="pl-8 w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full sm:w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-full sm:w-[140px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="social">Social</SelectItem>
                      <SelectItem value="display">Display</SelectItem>
                      <SelectItem value="search">Search</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] sm:h-[600px] pr-4">
                <div className="space-y-4">
                  {filteredCampaigns.map((campaign) => (
                    <Card key={campaign.id} className="hover:bg-muted/50 transition-all duration-200 border border-border/50">
                      <CardContent className="p-4">
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="font-semibold text-base sm:text-lg">{campaign.name}</h3>
                                <div className="flex flex-wrap gap-2">
                                  <Badge variant={
                                    campaign.status === 'active' ? 'default' :
                                    campaign.status === 'completed' ? 'secondary' :
                                    campaign.status === 'paused' ? 'destructive' :
                                    'outline'
                                  }>
                                    {campaign.status}
                                  </Badge>
                                  <Badge
                                    variant="outline" 
                                    className={cn(
                                      "gap-1",
                                      campaign.type === 'social' && "text-blue-600 border-blue-200",
                                      campaign.type === 'email' && "text-green-600 border-green-200",
                                      campaign.type === 'display' && "text-purple-600 border-purple-200",
                                      campaign.type === 'search' && "text-orange-600 border-orange-200"
                                    )}
                                  >
                                    {campaign.type === 'social' && <Globe className="w-3 h-3" />}
                                    {campaign.type === 'email' && <Mail className="w-3 h-3" />}
                                    {campaign.type === 'display' && <LineChart className="w-3 h-3" />}
                                    {campaign.type === 'search' && <Search className="w-3 h-3" />}
                                    {campaign.type}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                                <CalendarIcon className="w-4 h-4" />
                                {format(campaign.startDate, 'MMM d, yyyy')} - {format(campaign.endDate, 'MMM d, yyyy')}
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="hover:bg-muted">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuLabel>Campaign Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit2 className="mr-2 h-4 w-4" />
                                  Edit Campaign
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share2 className="mr-2 h-4 w-4" />
                                  Share Report
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {campaign.status === 'active' && (
                                  <DropdownMenuItem>
                                    <Pause className="mr-2 h-4 w-4" />
                                    Pause Campaign
                                  </DropdownMenuItem>
                                )}
                                {campaign.status === 'paused' && (
                                  <DropdownMenuItem>
                                    <Play className="mr-2 h-4 w-4" />
                                    Resume Campaign
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete Campaign
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="space-y-1">
                              <Label className="text-muted-foreground">Budget Usage</Label>
                              <div className="flex items-center justify-between">
                                <p className="text-lg font-semibold">
                                  ${campaign.spent.toLocaleString()}
                                  <span className="text-xs text-muted-foreground ml-1">
                                    /${campaign.budget.toLocaleString()}
                                  </span>
                                </p>
                              </div>
                              <Progress 
                                value={(campaign.spent / campaign.budget) * 100} 
                                className="h-1.5"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-muted-foreground">Performance</Label>
                              <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">Impressions</span>
                                  <span className="font-medium">{campaign.performance.impressions.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">Clicks</span>
                                  <span className="font-medium">{campaign.performance.clicks.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-muted-foreground">Metrics</Label>
                              <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">CTR</span>
                                  <span className="font-medium">{campaign.performance.ctr.toFixed(1)}%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">CPC</span>
                                  <span className="font-medium">${campaign.performance.cpc.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-muted-foreground">ROI</Label>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">ROAS</span>
                                <Badge variant="outline" className={cn(
                                  "font-semibold",
                                  campaign.performance.roas >= 4 ? "text-green-600 border-green-200" :
                                  campaign.performance.roas >= 2 ? "text-blue-600 border-blue-200" :
                                  "text-orange-600 border-orange-200"
                                )}>
                                  {campaign.performance.roas.toFixed(1)}x
                                </Badge>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                <ArrowUpRight className="w-3 h-3 text-green-500" />
                                <span>Performing well</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="border-none shadow-xl">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base sm:text-lg font-semibold">Campaign Calendar</CardTitle>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <CalendarIcon className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={1}
                      className="rounded-md border-0"
                      classNames={{
                        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                        month: "space-y-4",
                        caption: "flex justify-center pt-1 relative items-center",
                        caption_label: "text-sm font-medium",
                        nav: "space-x-1 flex items-center",
                        nav_button: cn(
                          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                        ),
                        nav_button_previous: "absolute left-1",
                        nav_button_next: "absolute right-1",
                        table: "w-full border-collapse space-y-1",
                        head_row: "flex",
                        head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
                        row: "flex w-full mt-2",
                        cell: cn(
                          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent",
                          "first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                        ),
                        day: cn(
                          "h-8 w-8 p-0 font-normal aria-selected:opacity-100",
                          "hover:bg-accent hover:text-accent-foreground"
                        ),
                        day_range_start: "day-range-start",
                        day_range_end: "day-range-end",
                        day_selected:
                          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                        day_today: "bg-accent text-accent-foreground",
                        day_outside: "text-muted-foreground opacity-50",
                        day_disabled: "text-muted-foreground opacity-50",
                        day_range_middle:
                          "aria-selected:bg-accent aria-selected:text-accent-foreground",
                        day_hidden: "invisible",
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  {campaigns
                    .filter(c => c.status === 'active' || c.status === 'draft')
                    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
                    .slice(0, 4)
                    .map(campaign => (
                      <div
                        key={campaign.id}
                        className="flex items-center gap-3 rounded-lg border p-3 text-sm hover:bg-muted/50 transition-colors"
                      >
                        <div className={cn(
                          "h-2 w-2 rounded-full",
                          campaign.status === 'active' ? "bg-green-500" : "bg-blue-500"
                        )} />
                        <div className="flex-1 space-y-1">
                          <p className="font-medium leading-none">
                            {campaign.name}
                          </p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <CalendarIcon className="mr-1 h-3 w-3" />
                            {format(campaign.startDate, 'MMM d')} - {format(campaign.endDate, 'MMM d')}
                          </div>
                        </div>
                        <Badge variant={campaign.status === 'active' ? 'default' : 'outline'}>
                          {campaign.status}
                        </Badge>
                      </div>
                    ))}
                </div>
                {campaigns.filter(c => c.status === 'active' || c.status === 'draft').length > 4 && (
                  <Button variant="outline" className="w-full">
                    View all campaigns
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl">
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Top Platform</p>
                    <div className="flex items-center gap-2">
                      <Instagram className="w-4 h-4 text-pink-500" />
                      <span className="text-sm text-muted-foreground">Instagram</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-pink-500 border-pink-200">
                    +24.5%
                  </Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Best Performing</p>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-muted-foreground">Summer Sale</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-yellow-500 border-yellow-200">
                    4.8x ROAS
                  </Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Audience Growth</p>
                    <div className="flex items-center gap-2">
                      <Users2 className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">+2.4k New</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-500 border-green-200">
                    +12.3%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 