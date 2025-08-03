'use client';

import React, { useState } from 'react';
import { 
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Users,
  ShoppingCart,
  Package,
  ArrowRight,
  ChevronDown,
  Clock,
  Globe,
  Smartphone,
  Laptop,
  Tablet as TabletIcon,
  Search,
  MapPin,
  ShoppingBag,
  CreditCard,
  Store,
  Filter,
  Download,
  Calendar,
  Repeat
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

// Mock data for the analytics
const revenueData = {
  total: 45892.50,
  percentageChange: 12.5,
  isPositive: true
};

const ordersData = {
  total: 256,
  percentageChange: 8.3,
  isPositive: true
};

const customersData = {
  total: 1458,
  percentageChange: -2.1,
  isPositive: false
};

const conversionData = {
  rate: 3.2,
  percentageChange: 0.5,
  isPositive: true
};

const topProducts = [
  {
    id: '1',
    name: 'Cotton T-Shirt',
    orders: 89,
    revenue: 2670,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: '2',
    name: 'Leather Wallet',
    orders: 75,
    revenue: 3750,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: '3',
    name: 'Running Shoes',
    orders: 62,
    revenue: 5580,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  }
];

const salesByLocation = [
  { country: 'United States', orders: 156, revenue: 15680 },
  { country: 'United Kingdom', orders: 89, revenue: 8900 },
  { country: 'Germany', orders: 65, revenue: 6500 },
  { country: 'France', orders: 45, revenue: 4500 },
  { country: 'Canada', orders: 34, revenue: 3400 }
];

const recentOrders = [
  {
    id: '#1234',
    customer: 'John Doe',
    status: 'completed',
    total: 99.99,
    items: 3,
    date: '2024-02-25T10:00:00'
  },
  {
    id: '#1235',
    customer: 'Jane Smith',
    status: 'processing',
    total: 149.99,
    items: 2,
    date: '2024-02-25T09:30:00'
  },
  {
    id: '#1236',
    customer: 'Mike Johnson',
    status: 'completed',
    total: 79.99,
    items: 1,
    date: '2024-02-25T09:00:00'
  }
];

const visitorsData = {
  total: 12458,
  returning: 4569,
  new: 7889
};

const deviceData = [
  { device: 'Mobile', percentage: 58 },
  { device: 'Desktop', percentage: 35 },
  { device: 'Tablet', percentage: 7 }
];

const trafficSources = [
  { source: 'Direct', visits: 4562, percentage: 35 },
  { source: 'Search', visits: 3890, percentage: 30 },
  { source: 'Social', visits: 2600, percentage: 20 },
  { source: 'Referral', visits: 1950, percentage: 15 }
];

const analyticsData = {
  salesBreakdown: {
    onlineStore: { amount: 32456.78 },
    pos: { amount: 13435.72 }
  },
  averageOrderValue: {
    current: 125.50,
    previous: 115.25,
    percentageChange: 8.9
  },
  returningCustomerRate: {
    current: 42.5,
    previous: 38.8,
    percentageChange: 9.5
  },
  cartAbandonment: {
    rate: 68.2,
    recovered: 15.8,
    potentialRevenue: 12580
  }
};

const chartData = [
  {
    date: "Jan 1",
    revenue: 4000,
    orders: 24,
    customers: 35,
  },
  {
    date: "Jan 2",
    revenue: 3000,
    orders: 18,
    customers: 25,
  },
  {
    date: "Jan 3",
    revenue: 2000,
    orders: 15,
    customers: 20,
  },
  {
    date: "Jan 4",
    revenue: 2780,
    orders: 20,
    customers: 28,
  },
  {
    date: "Jan 5",
    revenue: 1890,
    orders: 14,
    customers: 18,
  },
  {
    date: "Jan 6",
    revenue: 2390,
    orders: 17,
    customers: 23,
  },
  {
    date: "Jan 7",
    revenue: 3490,
    orders: 22,
    customers: 32,
  },
];

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState('7d');
  const [chartMetric, setChartMetric] = useState('revenue');

  return (
    <div className="p-4 md:p-6 max-w-[1400px] mx-auto space-y-6 md:space-y-8">
      {/* Header - Made responsive */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold">Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">
            Track your store's performance and growth
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <Select defaultValue={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="12m">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 sm:flex-none gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button variant="outline" className="flex-1 sm:flex-none gap-2">
              <Calendar className="w-4 h-4" />
              Custom range
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics - Made responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Total Revenue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${revenueData.total.toLocaleString()}</div>
            <div className="flex items-center pt-1">
              <span className={`text-sm ${revenueData.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {revenueData.isPositive ? '+' : ''}{revenueData.percentageChange}%
              </span>
              {revenueData.isPositive ? (
                <ArrowUpRight className="w-4 h-4 text-green-600 ml-1" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-600 ml-1" />
              )}
              <span className="text-sm text-gray-500 ml-1.5">vs. last period</span>
            </div>
            <div className="mt-3 pt-3 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Online Store</span>
                <span className="font-medium">${analyticsData.salesBreakdown.onlineStore.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-500">POS</span>
                <span className="font-medium">${analyticsData.salesBreakdown.pos.amount.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Average Order Value */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Average Order Value
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${analyticsData.averageOrderValue.current}
            </div>
            <div className="flex items-center pt-1">
              <span className="text-sm text-green-600">
                +{analyticsData.averageOrderValue.percentageChange}%
              </span>
              <ArrowUpRight className="w-4 h-4 text-green-600 ml-1" />
              <span className="text-sm text-gray-500 ml-1.5">vs. last period</span>
            </div>
            <div className="mt-3 pt-3 border-t">
              <div className="text-sm text-gray-500">
                Previous: ${analyticsData.averageOrderValue.previous}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Returning Customer Rate */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Returning Customer Rate
            </CardTitle>
            <Repeat className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsData.returningCustomerRate.current}%
            </div>
            <div className="flex items-center pt-1">
              <span className="text-sm text-green-600">
                +{analyticsData.returningCustomerRate.percentageChange}%
              </span>
              <ArrowUpRight className="w-4 h-4 text-green-600 ml-1" />
              <span className="text-sm text-gray-500 ml-1.5">vs. last period</span>
            </div>
            <div className="mt-3 pt-3 border-t">
              <div className="text-sm text-gray-500">
                Previous: {analyticsData.returningCustomerRate.previous}%
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cart Abandonment */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Cart Abandonment
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.cartAbandonment.rate}%</div>
            <div className="flex items-center pt-1">
              <span className="text-sm text-green-600">
                {analyticsData.cartAbandonment.recovered}% recovered
              </span>
            </div>
            <div className="mt-3 pt-3 border-t">
              <div className="text-sm text-gray-500">
                Potential revenue: ${analyticsData.cartAbandonment.potentialRevenue.toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid - Made responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        {/* Sales Chart - Adjusted columns */}
        <Card className="lg:col-span-8">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2">
            <CardTitle className="text-base">Sales Overview</CardTitle>
            <Select 
              defaultValue="revenue" 
              value={chartMetric} 
              onValueChange={setChartMetric}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="revenue">Revenue</SelectItem>
                <SelectItem value="orders">Orders</SelectItem>
                <SelectItem value="customers">Customers</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] md:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="#000000"
                        stopOpacity={0.1}
                      />
                      <stop
                        offset="95%"
                        stopColor="#000000"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => 
                      chartMetric === 'revenue' 
                        ? `$${value}`
                        : value
                    }
                  />
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5E7EB"
                    vertical={false}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-white p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-gray-500">
                                  {chartMetric}
                                </span>
                                <span className="font-bold text-black">
                                  {chartMetric === 'revenue' ? '$' : ''}
                                  {payload[0].value}
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey={chartMetric}
                    stroke="#000000"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorMetric)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Products - Adjusted columns */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-base">Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg border bg-gray-50 overflow-hidden flex-shrink-0">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.orders} orders</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-medium">${product.revenue}</div>
                    <div className="text-sm text-gray-500">Revenue</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders - Adjusted for mobile */}
        <Card className="lg:col-span-8 overflow-x-auto">
          <CardHeader>
            <CardTitle className="text-base">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent className="p-0 md:p-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="hidden sm:table-cell">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-normal
                          ${order.status === 'completed' 
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-100 text-gray-900'
                          }`}>
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>${order.total}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {new Date(order.date).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Visitors Overview - Adjusted columns */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-base">Visitors Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{visitorsData.total.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Total visitors</div>
                </div>
                <Globe className="h-8 w-8 text-gray-400" />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <div className="text-lg font-semibold">{visitorsData.new.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">New visitors</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">{visitorsData.returning.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Returning visitors</div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="text-sm font-medium mb-2">Device Breakdown</div>
                <div className="space-y-2">
                  {deviceData.map((device) => (
                    <div key={device.device} className="flex items-center gap-2">
                      {device.device === 'Mobile' && <Smartphone className="w-4 h-4 text-gray-400" />}
                      {device.device === 'Desktop' && <Laptop className="w-4 h-4 text-gray-400" />}
                      {device.device === 'Tablet' && <TabletIcon className="w-4 h-4 text-gray-400" />}
                      <div className="flex-1 flex items-center gap-2">
                        <div className="text-sm">{device.device}</div>
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-black rounded-full"
                            style={{ width: `${device.percentage}%` }}
                          />
                        </div>
                        <div className="text-sm text-gray-500">{device.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Traffic Sources - Adjusted columns */}
        <Card className="lg:col-span-6">
          <CardHeader>
            <CardTitle className="text-base">Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trafficSources.map((source) => (
                <div key={source.source} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gray-50">
                    {source.source === 'Direct' && <Globe className="w-5 h-5 text-gray-500" />}
                    {source.source === 'Search' && <Search className="w-5 h-5 text-gray-500" />}
                    {source.source === 'Social' && <Users className="w-5 h-5 text-gray-500" />}
                    {source.source === 'Referral' && <ArrowRight className="w-5 h-5 text-gray-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium truncate">{source.source}</div>
                      <div className="text-sm text-gray-500 flex-shrink-0">{source.visits.toLocaleString()} visits</div>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-black rounded-full transition-all duration-500"
                        style={{ width: `${source.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sales by Location - Adjusted columns */}
        <Card className="lg:col-span-6">
          <CardHeader>
            <CardTitle className="text-base">Sales by Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesByLocation.map((location) => (
                <div key={location.country} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-gray-900" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0">
                        <div className="font-medium truncate">{location.country}</div>
                        <div className="text-sm text-gray-500">{location.orders} orders</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-medium">${location.revenue}</div>
                        <div className="text-sm text-gray-500">Revenue</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}