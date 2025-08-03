"use client";

import React from 'react';
import { 
  Grid3x3, 
  ArrowUp, 
  ArrowDown, 
  Package, 
  Loader2, 
  ShoppingCart, 
  UserPlus, 
  Plus, 
  Settings, 
  Star,
  Users, 
  Mail, 
  MousePointer, 
  Target, 
  DollarSign, 
  ShoppingBag, 
  ArrowRight, 
  Globe, 
  Store, 
  MapPin, 
  Building2, 
  Percent, 
  Truck, 
  Tag, 
  Pencil, 
  Trash2,
  CreditCard,
  Smartphone,
  Building,
  CheckCircle,
  Clock,
  Layers,
  FileText,
  Eye,
  Heart,
  MessageCircle,
  BarChart2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Line,
  Bar,
  Legend
} from 'recharts';
import Link from 'next/link';
import { Switch } from "@/components/ui/switch";

const data = [
  { month: 'SEP', value1: 40, value2: 30 },
  { month: 'OCT', value1: 30, value2: 25 },
  { month: 'NOV', value1: 45, value2: 35 },
  { month: 'DEC', value1: 25, value2: 20 },
  { month: 'JAN', value1: 35, value2: 30 },
  { month: 'FEB', value1: 40, value2: 35 },
];

const topProducts = [
  { name: 'Premium Headphones', sales: 1234, revenue: 61700, trend: 'up', growth: 12.5 },
  { name: 'Smartwatch Pro', sales: 1000, revenue: 50000, trend: 'up', growth: 8.2 },
  { name: 'Wireless Earbuds', sales: 856, revenue: 34240, trend: 'down', growth: -2.4 }
];

const recentOrders = [
  { 
    id: '#1234',
    customer: 'John Doe',
    total: 'ETB 120.00',
    status: 'Paid',
    items: 3,
    date: '2 hours ago',
    paymentMethod: 'Credit Card'
  },
  { 
    id: '#1235',
    customer: 'Jane Smith',
    total: 'ETB 85.50',
    status: 'Processing',
    items: 2,
    date: '3 hours ago',
    paymentMethod: 'PayPal'
  },
  { 
    id: '#1236',
    customer: 'Bob Johnson',
    total: 'ETB 200.00',
    status: 'Shipped',
    items: 4,
    date: '5 hours ago',
    paymentMethod: 'Bank Transfer'
  }
];

const trafficData = [
  { name: 'Direct Traffic', value: 8456, color: '#4F46E5' },
  { name: 'Social Media', value: 6778, color: '#06B6D4' },
  { name: 'Search', value: 3421, color: '#10B981' }
];

const customerInsights = {
  totalCustomers: 24892,
  newThisMonth: 892,
  returningRate: 65.2,
  activeNow: 234,
  lifetimeValue: 850,
  growthRate: 5.2,
  customerSegments: [
    { name: 'VIP', count: 234, percentage: 15, growth: 8 },
    { name: 'Regular', count: 892, percentage: 55, growth: 3 },
    { name: 'Occasional', count: 486, percentage: 30, growth: -2 }
  ],
  topCountries: [
    { country: 'Ethiopia', customers: 450, percentage: 45, growth: 12 },
    { country: 'Kenya', customers: 250, percentage: 25, growth: 8 },
    { name: 'Nigeria', customers: 180, percentage: 18, growth: 15 },
    { name: 'Ghana', customers: 120, percentage: 12, growth: 5 }
  ],
  recentActivity: [
    { type: 'purchase', customer: 'John D.', action: 'Made a purchase', amount: 1200, time: '2m ago' },
    { type: 'signup', customer: 'Sarah M.', action: 'Created account', time: '5m ago' },
    { type: 'review', customer: 'Mike R.', action: '5-star review', time: '15m ago' }
  ]
};

const inventoryStatus = {
  summary: {
    totalProducts: 156,
    lowStock: 12,
    outOfStock: 3,
    reorderNeeded: 8
  },
  products: [
    { 
      name: 'Premium Headphones',
      sku: 'PH-001',
      stock: 45,
      status: 'In Stock',
      reorderPoint: 20,
      demand: 'High',
      lastRestocked: '2024-03-15',
      monthlyTurnover: 85
    },
    // ... other products
  ],
  categories: [
    { name: 'Electronics', inStock: 85, lowStock: 5, outOfStock: 2 },
    { name: 'Accessories', inStock: 45, lowStock: 3, outOfStock: 1 },
    { name: 'Wearables', inStock: 26, lowStock: 4, outOfStock: 0 }
  ]
};

const marketingMetrics = {
  emailCampaigns: {
    sent: 15000,
    opened: 8250,
    clicked: 2250,
    openRate: 55,
    clickRate: 15,
    conversionRate: 8.5,
    revenue: 12500,
    campaigns: [
      { name: 'Spring Sale', status: 'Active', progress: 75, engagement: 8.9, revenue: 4500 },
      { name: 'New Collection', status: 'Scheduled', progress: 0, engagement: 0, revenue: 0 },
      { name: 'Holiday Special', status: 'Draft', progress: 30, engagement: 6.5, revenue: 2800 }
    ]
  },
  socialMedia: {
    followers: 12500,
    engagement: 8.5,
    reachGrowth: 12,
    platforms: [
      { name: 'Instagram', followers: 5500, engagement: 9.2, growth: 12, posts: 156 },
      { name: 'Facebook', followers: 4200, engagement: 7.8, growth: 8, posts: 142 },
      { name: 'Twitter', followers: 2800, engagement: 6.5, growth: 15, posts: 89 }
    ]
  },
  websiteAnalytics: {
    visitors: 25600,
    pageViews: 89000,
    bounceRate: 35.8,
    avgSessionDuration: '3:45',
    topSources: [
      { name: 'Google', visits: 12500, conversion: 3.2 },
      { name: 'Direct', visits: 8900, conversion: 2.8 },
      { name: 'Social', visits: 4200, conversion: 4.5 }
    ]
  }
};

const useMemoizedData = <T,>(data: T): T => {
  return React.useMemo(() => data, []);
};

export default function DashboardPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  
  const memoizedChartData = useMemoizedData(data);
  const memoizedTopProducts = useMemoizedData(topProducts);
  const memoizedRecentOrders = useMemoizedData(recentOrders);
  const memoizedTrafficData = useMemoizedData(trafficData);
  const memoizedCustomerInsights = useMemoizedData(customerInsights);
  const memoizedInventoryStatus = useMemoizedData(inventoryStatus);
  const memoizedMarketingMetrics = useMemoizedData(marketingMetrics);
  
  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8">
      {/* Header - Make more compact on mobile */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-[32px] font-semibold text-gray-900">Welcome Back, Yeab</h1>
          <p className="text-sm sm:text-[15px] text-[#6B7280] mt-1">
            Here is the analytics information all about your store
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="7">
            <SelectTrigger className="w-[100px] sm:w-[120px] h-[34px] sm:h-[38px] bg-[#F9FAFB] border-[#E5E7EB] text-[13px] sm:text-[14px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Last 24 hours</SelectItem>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="h-[34px] sm:h-[38px] text-xs sm:text-sm">
            <ArrowDown className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* First Row - Stats and Net Profit */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Stats Grid - Make it 2x2 on mobile */}
        <div className="lg:col-span-5">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {/* Update each stat card for better mobile display */}
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-3 sm:p-4 h-auto sm:h-[139px] relative">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-[13px] sm:text-[15px] font-medium text-gray-900">Total Sales</h2>
                  <p className="text-[11px] sm:text-[13px] text-[#6B7280] mt-0.5">Last 7 days</p>
                </div>
                
                <div>
                  <div className="text-lg sm:text-[24px] font-semibold text-gray-900">$45,892.50</div>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="flex items-center text-[11px] sm:text-[13px] font-medium text-[#10B981]">
                      <ArrowUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      6%
                    </div>
                    <span className="text-[11px] sm:text-[13px] text-[#6B7280]">vs last 7 days</span>
                  </div>
                </div>
              </div>

              {/* Make the graph smaller on mobile */}
              <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-[60px] sm:w-[80px]">
                <svg className="w-full h-[24px] sm:h-[32px]" viewBox="0 0 80 32">
                  <path 
                    d="M0 24 C16 24, 24 8, 40 16 S56 4, 80 2" 
                    fill="none" 
                    stroke="#10B981" 
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </div>

            {/* Total Orders */}
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-3 sm:p-4 h-auto sm:h-[139px] relative">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-[13px] sm:text-[15px] font-medium text-gray-900">Total Orders</h2>
                  <p className="text-[11px] sm:text-[13px] text-[#6B7280] mt-0.5">Last 7 days</p>
                </div>
                
                <div>
                  <div className="text-lg sm:text-[24px] font-semibold text-gray-900">2544</div>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="flex items-center text-[11px] sm:text-[13px] font-medium text-[#10B981]">
                      <ArrowUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      12%
                    </div>
                    <span className="text-[11px] sm:text-[13px] text-[#6B7280]">vs last 7 days</span>
                  </div>
                </div>
              </div>

              <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-[60px] sm:w-[80px]">
                <svg className="w-full h-[24px] sm:h-[32px]" viewBox="0 0 80 32">
                  <path 
                    d="M0 24 C16 24, 24 8, 40 16 S56 4, 80 2" 
                    fill="none" 
                    stroke="#10B981" 
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </div>

            {/* Conversion Rate */}
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-3 sm:p-4 h-auto sm:h-[139px] relative">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-[13px] sm:text-[15px] font-medium text-gray-900">Conversion Rate</h2>
                  <p className="text-[11px] sm:text-[13px] text-[#6B7280] mt-0.5">Last 7 days</p>
                </div>
                
                <div>
                  <div className="text-lg sm:text-[24px] font-semibold text-gray-900">3.2%</div>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="flex items-center text-[11px] sm:text-[13px] font-medium text-[#EF4444]">
                      <ArrowDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      2%
                    </div>
                    <span className="text-[11px] sm:text-[13px] text-[#6B7280]">vs last 7 days</span>
                  </div>
                </div>
              </div>

              <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-[60px] sm:w-[80px]">
                <svg className="w-full h-[24px] sm:h-[32px]" viewBox="0 0 80 32">
                  <path 
                    d="M0 8 C16 8, 24 24, 40 16 S56 28, 80 30" 
                    fill="none" 
                    stroke="#EF4444" 
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </div>

            {/* Average Order Value */}
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-3 sm:p-4 h-auto sm:h-[139px] relative">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-[13px] sm:text-[15px] font-medium text-gray-900">Average Order Value</h2>
                  <p className="text-[11px] sm:text-[13px] text-[#6B7280] mt-0.5">Last 7 days</p>
                </div>
                
                <div>
                  <div className="text-lg sm:text-[24px] font-semibold text-gray-900">16.5K</div>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="flex items-center text-[11px] sm:text-[13px] font-medium text-[#EF4444]">
                      <ArrowDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      3%
                    </div>
                    <span className="text-[11px] sm:text-[13px] text-[#6B7280]">vs last 7 days</span>
                  </div>
                </div>
              </div>

              <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-[60px] sm:w-[80px]">
                <svg className="w-full h-[24px] sm:h-[32px]" viewBox="0 0 80 32">
                  <path 
                    d="M0 8 C16 8, 24 24, 40 16 S56 28, 80 30" 
                    fill="none" 
                    stroke="#EF4444" 
                    strokeWidth="1.5"
                  />
                </svg>
              </div>  
            </div>
          </div>
        </div>

        {/* Net Profit Chart - Full width on mobile */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-[#E5E7EB] p-3 sm:p-4">
          {/* Update chart header for mobile */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 sm:justify-between mb-3 sm:mb-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="bg-[#F3F4F6] p-2 rounded-lg">
                <Grid3x3 className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <h3 className="text-[13px] sm:text-[15px] font-semibold text-gray-900">Net Profit</h3>
                <div className="text-[11px] sm:text-[13px] text-[#6B7280]">Total Earnings</div>
                <div className="text-base sm:text-[20px] font-semibold text-gray-900 mt-0.5">$43,489.50</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-7 sm:h-8 px-2 sm:px-3 text-[11px] sm:text-xs">
                <ArrowDown className="h-3 w-3 mr-1" />
                Export
              </Button>
            </div>
          </div>

          {/* Adjust chart height for mobile */}
          <div className="h-[160px] sm:h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={[
                  { month: 'SEP', profit: 40000, revenue: 65000, orders: 156 },
                  { month: 'OCT', profit: 30000, revenue: 52000, orders: 142 },
                  { month: 'NOV', profit: 45000, revenue: 70000, orders: 168 },
                  { month: 'DEC', profit: 25000, revenue: 45000, orders: 132 },
                  { month: 'JAN', profit: 35000, revenue: 58000, orders: 145 },
                  { month: 'FEB', profit: 40000, revenue: 62000, orders: 160 }
                ]}
                margin={{ top: 5, right: 20, bottom: 5, left: 10 }}
              >
                <defs>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  vertical={false} 
                  stroke="#E5E7EB"
                  opacity={0.5}
                />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  yAxisId="left"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  dx={-10}
                  tickFormatter={(value) => `$${value/1000}k`}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  dx={10}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white border border-gray-100 shadow-lg rounded-lg p-3 space-y-2">
                          <div className="text-sm font-medium text-gray-600">{label}</div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-[#4F46E5]" />
                              <span className="text-sm text-gray-600">Profit:</span>
                              <span className="text-sm font-medium">${payload[0]?.value?.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-[#E5E7EB]" />
                              <span className="text-sm text-gray-600">Revenue:</span>
                              <span className="text-sm font-medium">${payload[1]?.value?.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-[#10B981]" />
                              <span className="text-sm text-gray-600">Orders:</span>
                              <span className="text-sm font-medium">{payload[2]?.value}</span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  yAxisId="left"
                  dataKey="revenue" 
                  fill="#E5E7EB"
                  radius={[4, 4, 0, 0]}
                  barSize={32}
                  opacity={0.2}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="profit"
                  stroke="#4F46E5"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{
                    r: 6,
                    fill: '#4F46E5',
                    stroke: '#fff',
                    strokeWidth: 2
                  }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="orders"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    r: 4,
                    fill: '#10B981',
                    stroke: '#fff',
                    strokeWidth: 2
                  }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Links Section - Make scrollable on mobile */}
      <div className="bg-white rounded-lg border border-[#E5E7EB] p-3 sm:p-4 md:p-6 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 sm:justify-between mb-3 sm:mb-4 md:mb-6">
          <div>
            <h3 className="text-[13px] sm:text-[15px] font-semibold text-gray-900">Quick Links</h3>
            <p className="text-[11px] sm:text-sm text-gray-500 mt-1">Frequently accessed pages and actions</p>
          </div>
        </div>

        {/* Make quick links scrollable horizontally on mobile */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0">
          {[
            {
              title: 'Add New Product',
              description: 'Create and publish new products',
              icon: <Package className="h-5 w-5" />,
              href: '/products/add',
              color: 'purple',
              bgColor: 'purple'
            },
            {
              title: 'Create Discount',
              description: 'Manage special offers and deals',
              icon: <Tag className="h-5 w-5" />,
              href: '/discounts/add',
              color: 'blue',
              bgColor: 'blue'
            },
            {
              title: 'Add Blog Post',
              description: 'Write and publish new content',
              icon: <FileText className="h-5 w-5" />,
              href: '/blog/add',
              color: 'green',
              bgColor: 'green'
            },
            {
              title: 'View Reports',
              description: 'Access detailed analytics',
              icon: <BarChart2 className="h-5 w-5" />,
              href: '/analytics/reports',
              color: 'orange',
              bgColor: 'orange'
            }
          ].map((link, index) => (
            <Link 
              key={index} 
              href={link.href}
              className={`flex-shrink-0 w-[280px] sm:w-auto p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-${link.color}-500 hover:bg-${link.color}-50 transition-all group cursor-pointer`}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className={`w-9 sm:w-10 h-9 sm:h-10 rounded-lg bg-${link.color}-100 flex items-center justify-center group-hover:bg-${link.color}-200 transition-colors`}>
                  <div className={`text-${link.color}-600`}>
                    {link.icon}
                  </div>
                </div>
                <div>
                  <h4 className="text-[13px] sm:text-sm font-medium text-gray-900 group-hover:text-gray-900">
                    {link.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 group-hover:text-gray-600">
                    {link.description}
                  </p>
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="h-3 sm:h-4 w-3 sm:w-4 text-gray-400" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Dashboard Grid - Single column on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        <div className="space-y-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-[15px] font-semibold text-gray-900">Recent Orders</h3>
                <p className="text-sm text-gray-500 mt-1">Latest transactions</p>
              </div>
              <Link href="/orders">
                <Button variant="outline" size="sm" className="gap-2">
                  <ArrowRight className="h-4 w-4" />
                  View All
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {memoizedRecentOrders.slice(0, 3).map((order, index) => (
                <div key={order.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium text-gray-900">{order.id}</div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Paid' ? 'bg-green-100 text-green-700' :
                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          order.status === 'Paid' ? 'bg-green-600' :
                          order.status === 'Processing' ? 'bg-yellow-600' :
                          order.status === 'Shipped' ? 'bg-blue-600' :
                          'bg-gray-600'
                        }`} />
                        {order.status}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-gray-900">{order.total}</div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">{order.customer}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500">{order.items} items</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <span>{order.paymentMethod}</span>
                      <span className="text-gray-400">•</span>
                      <span>{order.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-500">Total Orders</div>
                <div className="flex items-center gap-3">
                  <span className="font-medium text-gray-900">{156}</span>
                  <span className="text-xs text-green-600 flex items-center">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    8.2%
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Customer Activity */}
          <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-[15px] font-semibold text-gray-900">Customer Activity</h3>
                <p className="text-sm text-gray-500 mt-1">Recent customer interactions</p>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowRight className="h-4 w-4" />
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {[
                { action: 'New Purchase', customer: 'Sarah M.', time: '2 mins ago', amount: 'ETB 1,200' },
                { action: 'Added Review', customer: 'John D.', time: '15 mins ago', rating: 5 },
                { action: 'New Signup', customer: 'Michael R.', time: '1 hour ago' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.action === 'New Purchase' ? 'bg-green-100 text-green-600' :
                      activity.action === 'Added Review' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {activity.action === 'New Purchase' ? <ShoppingCart className="h-4 w-4" /> :
                       activity.action === 'Added Review' ? <Star className="h-4 w-4" /> :
                       <UserPlus className="h-4 w-4" />}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{activity.action}</div>
                      <div className="text-xs text-gray-500">{activity.customer} • {activity.time}</div>
                    </div>
                  </div>
                  {activity.amount && (
                    <div className="text-sm font-medium text-gray-900">{activity.amount}</div>
                  )}
                  {activity.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-900">{activity.rating}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Shop Locations */}
          <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-[15px] font-semibold text-gray-900">Shop Locations</h3>
                <p className="text-sm text-gray-500 mt-1">Store network overview</p>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <MapPin className="h-4 w-4" />
                Share Location
              </Button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-sm text-gray-600">Total Stores</div>
                  <div className="mt-1">
                    <span className="text-2xl font-semibold text-gray-900">12</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-sm text-gray-600">Active Stores</div>
                  <div className="mt-1">
                    <span className="text-2xl font-semibold text-gray-900">10</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-sm text-gray-600">Total Staff</div>
                  <div className="mt-1">
                    <span className="text-2xl font-semibold text-gray-900">156</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Addis Ababa Main Store', country: 'Ethiopia', staff: 45, status: 'active' },
                  { name: 'Nairobi Central', country: 'Kenya', staff: 32, status: 'active' },
                  { name: 'Lagos Store', country: 'Nigeria', staff: 38, status: 'maintenance' }
                ].map((store, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200">
                        <Building2 className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{store.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{store.country}</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">{store.staff} staff</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        store.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                      <span className="text-xs text-gray-500 capitalize">{store.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Top Selling Products */}
          <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-[15px] font-semibold text-gray-900">Top Selling Products</h3>
                <p className="text-sm text-gray-500 mt-1">Best performing products</p>
              </div>
              <Link href="/products">
                <Button variant="outline" size="sm" className="gap-2">
                  <ArrowRight className="h-4 w-4" />
                  View All
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {memoizedTopProducts.slice(0, 3).map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                      <Package className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-500">{product.sales.toLocaleString()} sales</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className={`text-xs flex items-center gap-1 ${
                          product.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {product.trend === 'up' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                          {Math.abs(product.growth)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">
                      ETB {product.revenue.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Avg. ETB {Math.round(product.revenue / product.sales).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Total Revenue</span>
                <span className="font-medium text-gray-900">
                  ETB {memoizedTopProducts.reduce((sum, product) => sum + product.revenue, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          
          {/* Inventory Alerts */}
          <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-[15px] font-semibold text-gray-900">Inventory Alerts</h3>
                <p className="text-sm text-gray-500 mt-1">Stock levels and updates</p>
              </div>
              <Link href="/inventory">
                <Button variant="outline" size="sm" className="gap-2">
                  <ArrowRight className="h-4 w-4" />
                  Manage
                </Button>
              </Link>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-sm text-gray-600">Low Stock Items</div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-2xl font-semibold text-gray-900">12</span>
                    <span className="text-xs text-yellow-600 flex items-center">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      +3 this week
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-sm text-gray-600">Out of Stock</div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-2xl font-semibold text-gray-900">3</span>
                    <span className="text-xs text-red-600 flex items-center">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      Critical
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Wireless Earbuds', stock: 8, total: 50, status: 'low' },
                  { name: 'Smart Watch', stock: 0, total: 30, status: 'out' },
                  { name: 'Bluetooth Speaker', stock: 5, total: 40, status: 'low' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        item.status === 'out' ? 'bg-red-500' : 'bg-yellow-500'
                      }`} />
                      <span className="text-sm font-medium text-gray-900">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{item.stock} in stock</div>
                      <div className="text-xs text-gray-500">of {item.total} units</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Country Distribution */}
          <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-[15px] font-semibold text-gray-900">Country Distribution</h3>
                <p className="text-sm text-gray-500 mt-1">Store presence by country</p>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Select Region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="east">East Africa</SelectItem>
                    <SelectItem value="west">West Africa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-6">
              {[
                { country: 'Ethiopia', stores: 5, revenue: 4500000, percentage: 45 },
                { country: 'Kenya', stores: 3, revenue: 2800000, percentage: 28 },
                { country: 'Nigeria', stores: 2, revenue: 1800000, percentage: 18 },
                { country: 'Ghana', stores: 2, revenue: 900000, percentage: 9 }
              ].map((country, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{country.country}</span>
                      <span className="text-xs text-gray-500">{country.stores} stores</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      ETB {(country.revenue / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${country.percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{country.percentage}% market share</span>
                      <span>{(country.revenue / country.stores / 1000000).toFixed(1)}M per store</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Store Traffic */}
          <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
            <h3 className="text-[15px] font-semibold text-gray-900 mb-4">Store Traffic</h3>
            <div className="flex items-center justify-between">
              <div className="h-[200px] w-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={memoizedTrafficData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                    >
                      {memoizedTrafficData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-4">
                {memoizedTrafficData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-[#6B7280]">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Warehouse Inventory */}
          <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-[15px] font-semibold text-gray-900">Warehouse Inventory</h3>
                <p className="text-sm text-gray-500 mt-1">Distribution center status</p>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Package className="h-4 w-4" />
                View Inventory
              </Button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-sm text-gray-600">Total Warehouses</div>
                  <div className="mt-1">
                    <span className="text-2xl font-semibold text-gray-900">6</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-sm text-gray-600">Total Inventory</div>
                  <div className="mt-1">
                    <span className="text-2xl font-semibold text-gray-900">24,580</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-sm text-gray-600">Capacity Used</div>
                  <div className="mt-1">
                    <span className="text-2xl font-semibold text-gray-900">78%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Addis Central Warehouse', inventory: 8500, capacity: 10000, utilization: 85 },
                  { name: 'Nairobi Distribution Center', inventory: 6200, capacity: 8000, utilization: 77 },
                  { name: 'Lagos Fulfillment Center', inventory: 5100, capacity: 7000, utilization: 73 }
                ].map((warehouse, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200">
                          <Package className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{warehouse.name}</div>
                          <div className="text-xs text-gray-500">
                            {warehouse.inventory.toLocaleString()} of {warehouse.capacity.toLocaleString()} units
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{warehouse.utilization}% utilized</div>
                      </div>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          warehouse.utilization > 90 ? 'bg-red-500' :
                          warehouse.utilization > 75 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${warehouse.utilization}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Active Discounts */}
          <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-[15px] font-semibold text-gray-900">Active Discounts</h3>
                <p className="text-sm text-gray-500 mt-1">Current promotions and coupons</p>
              </div>
              <div className="flex items-center gap-2">
                <Link href="/discounts/add">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Discount
                  </Button>
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              {/* Summary Stats */}
              

              {/* Active Coupons List */}
              <div className="space-y-3">
                {[
                  {
                    code: 'SUMMER2024',
                    type: 'Percentage',
                    value: 20,
                    usageLimit: 1000,
                    used: 456,
                    expires: '2024-06-30',
                    status: 'active'
                  },
                  {
                    code: 'FREESHIP',
                    type: 'Free Shipping',
                    value: 0,
                    usageLimit: 500,
                    used: 123,
                    expires: '2024-04-15',
                    status: 'active'
                  },
                  {
                    code: 'FLASH50',
                    type: 'Fixed Amount',
                    value: 50,
                    usageLimit: 200,
                    used: 198,
                    expires: '2024-03-25',
                    status: 'ending'
                  }
                ].map((coupon, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          coupon.type === 'Percentage' ? 'bg-blue-100 text-blue-600' :
                          coupon.type === 'Free Shipping' ? 'bg-green-100 text-green-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                          {coupon.type === 'Percentage' ? <Percent className="h-5 w-5" /> :
                           coupon.type === 'Free Shipping' ? <Truck className="h-5 w-5" /> :
                           <Tag className="h-5 w-5" />}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{coupon.code}</div>
                          <div className="text-xs text-gray-500">
                            {coupon.type === 'Percentage' ? `${coupon.value}% off` :
                             coupon.type === 'Free Shipping' ? 'Free Shipping' :
                             `ETB ${coupon.value} off`}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {coupon.status === 'ending' && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                            Ending Soon
                          </span>
                        )}
                        <Link href={`/discounts/${coupon.code}`}>
                          <Button variant="outline" size="sm" className="gap-2">
                            <ArrowRight className="h-4 w-4" />
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-3">
                        <span>{coupon.used} of {coupon.usageLimit} used</span>
                        <span>•</span>
                        <span>Expires {new Date(coupon.expires).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          (coupon.used / coupon.usageLimit) > 0.9 ? 'bg-red-500' :
                          (coupon.used / coupon.usageLimit) > 0.7 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${(coupon.used / coupon.usageLimit) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Analytics Sections - Single column on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* Payment Analytics */}
        <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-[15px] font-semibold text-gray-900">Payment Analytics</h3>
              <p className="text-sm text-gray-500 mt-1">Payment methods & transactions</p>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowRight className="h-4 w-4" />
              View All
            </Button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm text-gray-600">Success Rate</div>
                <div className="text-2xl font-semibold text-gray-900">98.5%</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm text-gray-600">Failed</div>
                <div className="text-2xl font-semibold text-gray-900">45</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm text-gray-600">Avg. Value</div>
                <div className="text-2xl font-semibold text-gray-900">ETB 850</div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { method: 'Credit Card', icon: <CreditCard className="h-5 w-5" />, volume: '45%', amount: 'ETB 45,670', trend: '+12%' },
                { method: 'Mobile Money', icon: <Smartphone className="h-5 w-5" />, volume: '35%', amount: 'ETB 35,450', trend: '+18%' },
                { method: 'Bank Transfer', icon: <Building className="h-5 w-5" />, volume: '20%', amount: 'ETB 20,120', trend: '+5%' }
              ].map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200">
                      {payment.icon}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{payment.method}</div>
                      <div className="text-xs text-gray-500">{payment.volume} of volume</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{payment.amount}</div>
                    <div className="text-xs text-green-600">{payment.trend}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Types */}
        <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-[15px] font-semibold text-gray-900">Order Types</h3>
              <p className="text-sm text-gray-500 mt-1">Order fulfillment status</p>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowRight className="h-4 w-4" />
              View All Orders
            </Button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Fulfilled</div>
                    <div className="text-2xl font-semibold text-gray-900">842</div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Layers className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Partial</div>
                    <div className="text-2xl font-semibold text-gray-900">28</div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Unfulfilled</div>
                    <div className="text-2xl font-semibold text-gray-900">45</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { 
                  id: '#ORD-12345',
                  customer: 'John Smith',
                  items: 3,
                  total: 'ETB 1,250',
                  status: 'fulfilled',
                  date: '2 hours ago'
                },
                { 
                  id: '#ORD-12346',
                  customer: 'Sarah Wilson',
                  items: 4,
                  total: 'ETB 2,850',
                  status: 'partial',
                  fulfilled: 2,
                  date: '1 hour ago'
                },
                { 
                  id: '#ORD-12347',
                  customer: 'Michael Brown',
                  items: 2,
                  total: 'ETB 850',
                  status: 'unfulfilled',
                  date: '3 hours ago'
                }
              ].map((order, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        order.status === 'fulfilled' ? 'bg-green-500' :
                        order.status === 'partial' ? 'bg-blue-500' :
                        'bg-yellow-500'
                      }`} />
                      <div className="text-sm font-medium text-gray-900">{order.id}</div>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'fulfilled' ? 'bg-green-100 text-green-700' :
                      order.status === 'partial' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status === 'fulfilled' ? 'Fulfilled' :
                       order.status === 'partial' ? `Partial (${order.fulfilled}/${order.items})` :
                       'Unfulfilled'}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-500">{order.customer}</div>
                    <div className="font-medium text-gray-900">{order.total}</div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                    <div>{order.items} items</div>
                    <div>{order.date}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Stats */}
            <div className="pt-4 mt-4 border-t border-gray-100">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Avg. Fulfillment</div>
                  <div className="text-lg font-medium text-gray-900 mt-1">2.4 hours</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Fulfillment Rate</div>
                  <div className="text-lg font-medium text-gray-900 mt-1">94.8%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Pending Value</div>
                  <div className="text-lg font-medium text-gray-900 mt-1">ETB 12.5k</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Feedback */}
        <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-[15px] font-semibold text-gray-900">Customer Feedback</h3>
              <p className="text-sm text-gray-500 mt-1">Recent reviews and ratings</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium ml-1">4.8</span>
              </div>
              <span className="text-sm text-gray-500">Overall rating</span>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { 
                customer: 'Sarah M.',
                rating: 5,
                comment: 'Excellent product quality and fast delivery!',
                product: 'Wireless Earbuds',
                time: '2 hours ago'
              },
              { 
                customer: 'John D.',
                rating: 4,
                comment: 'Good product but packaging could be better',
                product: 'Smart Watch',
                time: '5 hours ago'
              },
              { 
                customer: 'Mike R.',
                rating: 5,
                comment: 'Amazing sound quality, worth every penny',
                product: 'Premium Headphones',
                time: '1 day ago'
              }
            ].map((review, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">
                        {review.customer.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{review.customer}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{review.comment}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{review.product}</span>
                  <span>{review.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Analytics */}
        <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-[15px] font-semibold text-gray-900">Delivery Analytics</h3>
              <p className="text-sm text-gray-500 mt-1">Shipping and delivery metrics</p>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Truck className="h-4 w-4" />
              Track Orders
            </Button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm text-gray-600">In Transit</div>
                <div className="text-2xl font-semibold text-gray-900">24</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm text-gray-600">Delivered</div>
                <div className="text-2xl font-semibold text-gray-900">156</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm text-gray-600">Delayed</div>
                <div className="text-2xl font-semibold text-gray-900">3</div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { 
                  id: '#1234',
                  destination: 'Addis Ababa',
                  status: 'In Transit',
                  eta: '2 hours',
                  items: 3
                },
                { 
                  id: '#1235',
                  destination: 'Nairobi',
                  status: 'Delivered',
                  eta: 'Delivered',
                  items: 2
                },
                { 
                  id: '#1236',
                  destination: 'Lagos',
                  status: 'Delayed',
                  eta: '1 day delay',
                  items: 4
                }
              ].map((delivery, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      delivery.status === 'In Transit' ? 'bg-blue-500' :
                      delivery.status === 'Delivered' ? 'bg-green-500' :
                      'bg-red-500'
                    }`} />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Order {delivery.id}</div>
                      <div className="text-xs text-gray-500">{delivery.destination}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{delivery.status}</div>
                    <div className="text-xs text-gray-500">ETA: {delivery.eta}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Replace Staff Performance with Blogs section */}
        <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-[15px] font-semibold text-gray-900">Latest Blog Posts</h3>
              <p className="text-sm text-gray-500 mt-1">Recent articles and updates</p>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <FileText className="h-4 w-4" />
              View All Posts
            </Button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm text-gray-600">Total Posts</div>
                <div className="text-2xl font-semibold text-gray-900">156</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm text-gray-600">Published This Month</div>
                <div className="text-2xl font-semibold text-gray-900">12.5k</div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { 
                  title: 'Top 10 Fashion Trends for 2024',
                  excerpt: 'Discover the latest fashion trends that are taking the industry by storm...',
                  author: 'Sarah Johnson',
                  category: 'Fashion',
                  publishedAt: '2 hours ago',
                  image: '/blog-1.jpg'
                },
                { 
                  title: 'Essential Tech Gadgets for Modern Life',
                  excerpt: 'A curated list of must-have tech gadgets that will simplify your daily routine...',
                  author: 'Michael Chen',
                  category: 'Technology',
                  publishedAt: '5 hours ago',
                  image: '/blog-2.jpg'
                }
              ].map((post, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          {post.category}
                        </span>
                        <span className="text-xs text-gray-500">{post.publishedAt}</span>
                      </div>
                      <h4 className="text-sm font-medium text-gray-900 truncate mb-1">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <span>{post.author}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                  Create New Post
                </Button>
                <span className="text-gray-500">
                  Last updated 2 hours ago
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Returns & Refunds */}
        <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-[15px] font-semibold text-gray-900">Returns & Refunds</h3>
              <p className="text-sm text-gray-500 mt-1">Return rates and refund analytics</p>
            </div>
            <Select defaultValue="month">
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm text-gray-600">Return Rate</div>
                <div className="text-2xl font-semibold text-gray-900">3.2%</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm text-gray-600">Total Returns</div>
                <div className="text-2xl font-semibold text-gray-900">45</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm text-gray-600">Refunded</div>
                <div className="text-2xl font-semibold text-gray-900">ETB 12.5k</div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { 
                  product: 'Wireless Earbuds',
                  reason: 'Defective',
                  status: 'Approved',
                  amount: 'ETB 2,500'
                },
                { 
                  product: 'Smart Watch',
                  reason: 'Wrong Size',
                  status: 'Pending',
                  amount: 'ETB 3,200'
                },
                { 
                  product: 'Bluetooth Speaker',
                  reason: 'Not as Described',
                  status: 'Rejected',
                  amount: 'ETB 1,800'
                }
              ].map((refund, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      refund.status === 'Approved' ? 'bg-green-500' :
                      refund.status === 'Pending' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`} />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{refund.product}</div>
                      <div className="text-xs text-gray-500">{refund.reason}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{refund.amount}</div>
                    <div className="text-xs text-gray-500">{refund.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sales Performance */}
      
    </div>
  );
}