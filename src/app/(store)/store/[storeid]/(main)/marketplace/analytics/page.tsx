'use client';

import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ZAxis,
} from 'recharts';
import {
  TrendingUp,
  Users,
  ShoppingBag,
  DollarSign,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Heart,
  Share2,
  Star,
  RefreshCw,
  Download,
  Calendar,
  Filter,
  BarChart2,
  PieChart as PieChartIcon,
  Activity,
  Target,
  Clock,
  Globe,
  Smartphone,
  Laptop,
  Tablet,
  MapPin,
  ShoppingCart,
  CreditCard,
  AlertCircle,
  Info,
  HelpCircle,
  Settings,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Tooltip as TooltipComponent,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { DateRangePicker } from "@/components/ui/date-range-picker";

// Enhanced interfaces
interface MonthlyData {
  name: string;
  followers: number;
  sales: number;
  revenue: number;
  conversionRate: number;
  avgOrderValue: number;
  newCustomers: number;
  returningCustomers: number;
}

interface Product {
  name: string;
  sales: number;
  revenue: number;
  views: number;
  followers: number;
  conversionRate: number;
  avgOrderValue: number;
  stock: number;
  rating: number;
  reviews: number;
  category: string;
  tags: string[];
}

interface CategoryData {
  name: string;
  value: number;
  growth: number;
  products: number;
  revenue: number;
}

interface AnalyticsData {
  monthlyData: MonthlyData[];
  topProducts: Product[];
  categoryData: CategoryData[];
  stats: {
    followers: number;
    sales: number;
    revenue: number;
    views: number;
    conversionRate: number;
    avgOrderValue: number;
    cartAbandonment: number;
    customerRetention: number;
    newCustomers: number;
    returningCustomers: number;
  };
  performanceMetrics: {
    salesTarget: number;
    salesProgress: number;
    revenueTarget: number;
    revenueProgress: number;
    customerTarget: number;
    customerProgress: number;
  };
  deviceData: {
    device: string;
    percentage: number;
    sessions: number;
    conversionRate: number;
  }[];
  locationData: {
    country: string;
    sales: number;
    revenue: number;
    customers: number;
    growth: number;
  }[];
  engagementMetrics: {
    likes: number;
    shares: number;
    comments: number;
    saves: number;
    averageRating: number;
    responseRate: number;
    responseTime: string;
  };
}

// Enhanced mock data
const monthlyData = [
  { name: 'Jan', followers: 1200, sales: 900, revenue: 12000, conversionRate: 2.5, avgOrderValue: 85, newCustomers: 450, returningCustomers: 450 },
  { name: 'Feb', followers: 1900, sales: 1200, revenue: 15000, conversionRate: 2.8, avgOrderValue: 88, newCustomers: 600, returningCustomers: 600 },
  { name: 'Mar', followers: 2600, sales: 1500, revenue: 18000, conversionRate: 3.0, avgOrderValue: 90, newCustomers: 750, returningCustomers: 750 },
  { name: 'Apr', followers: 3100, sales: 1800, revenue: 22000, conversionRate: 3.2, avgOrderValue: 92, newCustomers: 900, returningCustomers: 900 },
  { name: 'May', followers: 3800, sales: 2100, revenue: 25000, conversionRate: 3.5, avgOrderValue: 95, newCustomers: 1050, returningCustomers: 1050 },
  { name: 'Jun', followers: 4200, sales: 2400, revenue: 28000, conversionRate: 3.8, avgOrderValue: 98, newCustomers: 1200, returningCustomers: 1200 },
];

const topProducts = [
  { 
    name: 'Wireless Earbuds', 
    sales: 1234, 
    revenue: 61700, 
    views: 5400, 
    followers: 890,
    conversionRate: 4.2,
    avgOrderValue: 120,
    stock: 150,
    rating: 4.8,
    reviews: 234,
    category: 'Electronics',
    tags: ['Wireless', 'Audio', 'Bluetooth']
  },
  { 
    name: 'Smart Watch', 
    sales: 890, 
    revenue: 44500, 
    views: 4200, 
    followers: 720,
    conversionRate: 3.8,
    avgOrderValue: 150,
    stock: 200,
    rating: 4.6,
    reviews: 189,
    category: 'Electronics',
    tags: ['Wearable', 'Fitness', 'Smart']
  },
  { 
    name: 'Laptop Stand', 
    sales: 756, 
    revenue: 22680, 
    views: 3800, 
    followers: 650,
    conversionRate: 3.5,
    avgOrderValue: 85,
    stock: 300,
    rating: 4.7,
    reviews: 156,
    category: 'Accessories',
    tags: ['Ergonomic', 'Office', 'Desk']
  },
  { 
    name: 'Phone Case', 
    sales: 654, 
    revenue: 13080, 
    views: 3200, 
    followers: 540,
    conversionRate: 3.2,
    avgOrderValue: 45,
    stock: 500,
    rating: 4.5,
    reviews: 123,
    category: 'Accessories',
    tags: ['Protection', 'Design', 'Case']
  },
  { 
    name: 'USB-C Cable', 
    sales: 543, 
    revenue: 8145, 
    views: 2800, 
    followers: 420,
    conversionRate: 3.0,
    avgOrderValue: 35,
    stock: 1000,
    rating: 4.4,
    reviews: 98,
    category: 'Accessories',
    tags: ['Charging', 'Cable', 'USB-C']
  },
];

const categoryData = [
  { name: 'Electronics', value: 35, growth: 12, products: 150, revenue: 150000 },
  { name: 'Fashion', value: 25, growth: 8, products: 200, revenue: 100000 },
  { name: 'Home & Garden', value: 20, growth: 15, products: 180, revenue: 80000 },
  { name: 'Beauty', value: 15, growth: 20, products: 120, revenue: 60000 },
  { name: 'Sports', value: 5, growth: 5, products: 80, revenue: 20000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function MarketplaceAnalytics() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [showAdvancedMetrics, setShowAdvancedMetrics] = useState(false);
  const [selectedView, setSelectedView] = useState('overview');
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date(),
  });
  const [data, setData] = useState<AnalyticsData>({
    monthlyData: [],
    topProducts: [],
    categoryData: [],
    stats: {
      followers: 0,
      sales: 0,
      revenue: 0,
      views: 0,
      conversionRate: 0,
      avgOrderValue: 0,
      cartAbandonment: 0,
      customerRetention: 0,
      newCustomers: 0,
      returningCustomers: 0,
    },
    performanceMetrics: {
      salesTarget: 10000,
      salesProgress: 0,
      revenueTarget: 100000,
      revenueProgress: 0,
      customerTarget: 5000,
      customerProgress: 0,
    },
    deviceData: [
      { device: 'Mobile', percentage: 58, sessions: 12000, conversionRate: 2.8 },
      { device: 'Desktop', percentage: 35, sessions: 7500, conversionRate: 3.5 },
      { device: 'Tablet', percentage: 7, sessions: 1500, conversionRate: 2.2 },
    ],
    locationData: [
      { country: 'United States', sales: 1200, revenue: 120000, customers: 800, growth: 15 },
      { country: 'United Kingdom', sales: 800, revenue: 80000, customers: 600, growth: 12 },
      { country: 'Germany', sales: 600, revenue: 60000, customers: 400, growth: 10 },
      { country: 'France', sales: 400, revenue: 40000, customers: 300, growth: 8 },
      { country: 'Canada', sales: 300, revenue: 30000, customers: 200, growth: 5 },
    ],
    engagementMetrics: {
      likes: 3200,
      shares: 1400,
      comments: 800,
      saves: 600,
      averageRating: 4.8,
      responseRate: 95,
      responseTime: '2h 15m',
    },
  });

  // Simulate data fetching
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setData({
          monthlyData,
          topProducts,
          categoryData,
          stats: {
            followers: 4200,
            sales: 2400,
            revenue: 28000,
            views: 19400,
            conversionRate: 3.8,
            avgOrderValue: 98,
            cartAbandonment: 68.2,
            customerRetention: 45.5,
            newCustomers: 1200,
            returningCustomers: 1200,
          },
          performanceMetrics: {
            salesTarget: 10000,
            salesProgress: 24,
            revenueTarget: 100000,
            revenueProgress: 28,
            customerTarget: 5000,
            customerProgress: 24,
          },
          deviceData: [
            { device: 'Mobile', percentage: 58, sessions: 12000, conversionRate: 2.8 },
            { device: 'Desktop', percentage: 35, sessions: 7500, conversionRate: 3.5 },
            { device: 'Tablet', percentage: 7, sessions: 1500, conversionRate: 2.2 },
          ],
          locationData: [
            { country: 'United States', sales: 1200, revenue: 120000, customers: 800, growth: 15 },
            { country: 'United Kingdom', sales: 800, revenue: 80000, customers: 600, growth: 12 },
            { country: 'Germany', sales: 600, revenue: 60000, customers: 400, growth: 10 },
            { country: 'France', sales: 400, revenue: 40000, customers: 300, growth: 8 },
            { country: 'Canada', sales: 300, revenue: 30000, customers: 200, growth: 5 },
          ],
          engagementMetrics: {
            likes: 3200,
            shares: 1400,
            comments: 800,
            saves: 600,
            averageRating: 4.8,
            responseRate: 95,
            responseTime: '2h 15m',
          },
        });
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedPeriod, dateRange]);

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate refresh
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto p-2 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">Marketplace Analytics</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Track your marketplace performance and insights
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
            className="w-full sm:w-[300px]"
          />
          <Select 
            value={selectedPeriod} 
            onValueChange={setSelectedPeriod}
          >
            <SelectTrigger className="w-full sm:w-[120px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handleRefresh} className="shrink-0">
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
            <Button variant="outline" className="shrink-0">
              <Download className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Export</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                <DropdownMenuItem>Export as Excel</DropdownMenuItem>
                <DropdownMenuItem>Export as PDF</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="icon" onClick={() => setShowAdvancedMetrics(!showAdvancedMetrics)}>
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* View Tabs */}
      <Tabs value={selectedView} onValueChange={setSelectedView} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        <Card>
          <CardContent className="pt-4">
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-4 w-40" />
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Users className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Followers</p>
                    <p className="text-xl font-semibold">{data.stats.followers.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-green-500">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm">12%</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-4 w-40" />
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <ShoppingBag className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Sales</p>
                    <p className="text-xl font-semibold">{data.stats.sales.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-green-500">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm">8%</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-4 w-40" />
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <DollarSign className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Revenue</p>
                    <p className="text-xl font-semibold">${data.stats.revenue.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-green-500">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm">15%</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-4 w-40" />
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <Eye className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Views</p>
                    <p className="text-xl font-semibold">{data.stats.views.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-red-500">
                  <ArrowDownRight className="w-4 h-4" />
                  <span className="text-sm">3%</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm">Sales Target</CardTitle>
                <CardDescription>Progress towards monthly sales target</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>${data.performanceMetrics.salesProgress.toLocaleString()}</span>
                    <span>${data.performanceMetrics.salesTarget.toLocaleString()}</span>
                  </div>
                  <Progress value={data.performanceMetrics.salesProgress} className="h-2" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm">Revenue Target</CardTitle>
                <CardDescription>Progress towards monthly revenue target</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>${data.performanceMetrics.revenueProgress.toLocaleString()}</span>
                    <span>${data.performanceMetrics.revenueTarget.toLocaleString()}</span>
                  </div>
                  <Progress value={data.performanceMetrics.revenueProgress} className="h-2" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm">Customer Target</CardTitle>
                <CardDescription>Progress towards monthly customer target</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{data.performanceMetrics.customerProgress.toLocaleString()}</span>
                    <span>{data.performanceMetrics.customerTarget.toLocaleString()}</span>
                  </div>
                  <Progress value={data.performanceMetrics.customerProgress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Growth Overview</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Monthly followers and sales growth</CardDescription>
            </CardHeader>
            <CardContent className="p-2 sm:p-4 md:p-6">
                  <div className="h-[300px]">
                {isLoading ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <Skeleton className="w-full h-full" />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data.monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                      <Tooltip />
                          <Legend />
                          <Area type="monotone" dataKey="followers" stackId="1" stroke="#8884d8" fill="#8884d8" />
                          <Area type="monotone" dataKey="sales" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
                          <Area type="monotone" dataKey="revenue" stackId="3" stroke="#ffc658" fill="#ffc658" />
                        </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Top Products</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Best performing products by sales</CardDescription>
            </CardHeader>
            <CardContent className="p-2 sm:p-4 md:p-6">
              <div className="space-y-3 sm:space-y-4">
                {isLoading ? (
                  Array(5).fill(0).map((_, i) => (
                    <Skeleton key={i} className="h-12 sm:h-16 w-full" />
                  ))
                ) : (
                  data.topProducts.map((product, index) => (
                    <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-2 sm:p-3 rounded-lg border">
                      <div className="flex-1 w-full">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-sm sm:text-base">{product.name}</span>
                          {index === 0 && (
                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                              Best Seller
                                </Badge>
                          )}
                              <Badge variant="outline">{product.category}</Badge>
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4" />
                            {product.sales} sales
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                            {product.views} views
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                            {product.followers} followers
                          </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                                {product.rating} ({product.reviews} reviews)
                              </div>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {product.tags.map((tag, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                        </div>
                      </div>
                      <div className="text-right w-full sm:w-auto">
                        <div className="font-medium text-sm sm:text-base">${product.revenue.toLocaleString()}</div>
                        <div className="text-xs sm:text-sm text-gray-500">Revenue</div>
                            <div className="text-xs text-gray-500 mt-1">
                              Stock: {product.stock} units
                            </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Category Distribution</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Sales by category</CardDescription>
            </CardHeader>
            <CardContent className="p-2 sm:p-4 md:p-6">
                  <div className="h-[300px]">
                {isLoading ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <Skeleton className="w-full h-full rounded-full" />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {data.categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: '12px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Engagement Metrics</CardTitle>
              <CardDescription className="text-xs sm:text-sm">User interaction statistics</CardDescription>
            </CardHeader>
            <CardContent className="p-2 sm:p-4 md:p-6">
                  <div className="space-y-4">
                {isLoading ? (
                      Array(4).fill(0).map((_, i) => (
                    <Skeleton key={i} className="h-6 sm:h-8 w-full" />
                  ))
                ) : (
                  <>
                    <div className="flex items-center justify-between text-sm sm:text-base">
                      <div className="flex items-center gap-2">
                        <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                        <span>Likes</span>
                      </div>
                          <span className="font-medium">{data.engagementMetrics.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm sm:text-base">
                      <div className="flex items-center gap-2">
                        <Share2 className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                        <span>Shares</span>
                      </div>
                          <span className="font-medium">{data.engagementMetrics.shares.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm sm:text-base">
                      <div className="flex items-center gap-2">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                        <span>Average Rating</span>
                      </div>
                          <span className="font-medium">{data.engagementMetrics.averageRating}/5.0</span>
                        </div>
                        <div className="flex items-center justify-between text-sm sm:text-base">
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />
                            <span>Avg. Response Time</span>
                          </div>
                          <span className="font-medium">{data.engagementMetrics.responseTime}</span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Product Performance</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Detailed product analytics and metrics</CardDescription>
            </CardHeader>
            <CardContent className="p-2 sm:p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Conversion Rate by Product</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.topProducts}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="conversionRate" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Average Order Value by Product</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.topProducts}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="avgOrderValue" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Customer Analytics</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Customer behavior and demographics</CardDescription>
            </CardHeader>
            <CardContent className="p-2 sm:p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Customer Growth</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data.monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="newCustomers" stroke="#8884d8" name="New Customers" />
                        <Line type="monotone" dataKey="returningCustomers" stroke="#82ca9d" name="Returning Customers" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Customer Location</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={data.locationData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="country" />
                        <PolarRadiusAxis />
                        <Radar name="Sales" dataKey="sales" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Performance Metrics</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Detailed performance analysis</CardDescription>
            </CardHeader>
            <CardContent className="p-2 sm:p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Device Performance</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart>
                        <CartesianGrid />
                        <XAxis type="number" dataKey="sessions" name="Sessions" />
                        <YAxis type="number" dataKey="conversionRate" name="Conversion Rate" />
                        <ZAxis type="number" dataKey="percentage" range={[60, 400]} name="Percentage" />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Scatter data={data.deviceData} fill="#8884d8" />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Location Performance</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.locationData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="country" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="sales" fill="#8884d8" name="Sales" />
                        <Bar dataKey="revenue" fill="#82ca9d" name="Revenue" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 