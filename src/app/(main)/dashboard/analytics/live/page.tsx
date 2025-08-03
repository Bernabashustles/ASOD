"use client";

import React, { useState, useEffect } from 'react';
import { WorldMap } from "@/components/ui/world-map";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Search,
  Clock,
  Users,
  Eye,
  MapPin,
  ChevronRight,
  Info,
  Globe,
  Calendar,
  Store,
  ShoppingBag,
  Bell,
  Settings,
  ArrowUpRight,
  ArrowDownRight,
  X
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Add this constant at the top level
const LIVE_CONNECTIONS = [
  {
    start: { lat: 9.0820, lng: 8.6753, label: "Nigeria" },
    end: { lat: 51.5074, lng: -0.1278, label: "London" }
  },
  {
    start: { lat: 8.9806, lng: 38.7578, label: "Addis Ababa" },
    end: { lat: -1.2921, lng: 36.8219, label: "Nairobi" }
  },
  {
    start: { lat: 9.0320, lng: 38.7482, label: "Ethiopia" },
    end: { lat: 25.2048, lng: 55.2708, label: "Dubai" }
  },
  {
    start: { lat: 1.3521, lng: 103.8198, label: "Singapore" },
    end: { lat: -33.8688, lng: 151.2093, label: "Sydney" }
  }
];

export default function LiveAnalyticsPage() {
  const [currentTime, setCurrentTime] = useState('');
  const [showPromo, setShowPromo] = useState(true);

  useEffect(() => {
    // Set initial time
    setCurrentTime(new Date().toLocaleString());
    
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Promotional Banner */}
      {showPromo && (
        <div className="bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-white p-3.5">
          <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Get real-time insights with Analytics Pro</span>
              <span className="hidden md:block text-gray-400">·</span>
              <span className="hidden md:block text-sm text-gray-300">Advanced reporting, custom dashboards, and more</span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="secondary" size="sm" className="h-8 bg-white hover:bg-gray-100 text-black">
                Upgrade now
              </Button>
              <button 
                className="text-white/80 hover:text-white transition-colors"
                onClick={() => setShowPromo(false)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-lg font-medium">Live View</h1>
                <div className="flex items-center gap-2 mt-1">
                  {currentTime && (
                    <span className="text-sm text-gray-500">{currentTime} GMT+3</span>
                  )}
                  <span className="text-gray-300">·</span>
                  <Button variant="link" className="h-auto p-0 text-sm">
                    Change timezone
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-sm bg-gray-50 px-3 py-1.5 rounded-full border">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  Orders
                </span>
                <span className="mx-2 text-gray-300">·</span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Live visitors
                </span>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="w-4 h-4" />
                Customize view
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="grid grid-cols-[300px,1fr] gap-6">
          {/* Sidebar */}
          <div className="space-y-4">
            {/* Visitors */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">Visitors right now</div>
                    <div className="text-2xl font-semibold mt-1">45</div>
                    <div className="flex items-center gap-1 mt-1">
                      <ArrowUpRight className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600">12% from last hour</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Total Sales */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">Total sales today</div>
                    <div className="text-2xl font-semibold mt-1">ETB 12,450.00</div>
                    <div className="flex items-center gap-1 mt-1">
                      <ArrowUpRight className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600">8% from yesterday</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Total Sessions */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">Active sessions</div>
                    <div className="text-2xl font-semibold mt-1">156</div>
                    <div className="flex items-center gap-1 mt-1">
                      <ArrowDownRight className="w-3 h-3 text-red-600" />
                      <span className="text-xs text-red-600">3% from last hour</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Total Orders */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">Orders today</div>
                    <div className="text-2xl font-semibold mt-1">24</div>
                    <div className="flex items-center gap-1 mt-1">
                      <ArrowUpRight className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600">15% from yesterday</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Top Locations */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-medium">Top locations</div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {[
                    { city: "Addis Ababa", country: "Ethiopia", visitors: 15 },
                    { city: "Nairobi", country: "Kenya", visitors: 8 },
                    { city: "Lagos", country: "Nigeria", visitors: 6 }
                  ].map((location, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="text-sm font-medium">{location.city}</div>
                          <div className="text-xs text-gray-500">{location.country}</div>
                        </div>
                      </div>
                      <div className="text-sm font-medium">{location.visitors}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Customer Behavior */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-medium">Customer behavior</div>
                  <div className="text-xs text-gray-500">Last 10 min</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <ShoppingCart className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-xl font-semibold">12</div>
                    <div className="text-xs text-gray-500">Active carts</div>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="text-xl font-semibold">5</div>
                    <div className="text-xs text-gray-500">Checking out</div>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <ShoppingCart className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-xl font-semibold">8</div>
                    <div className="text-xs text-gray-500">Purchased</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {/* World Map */}
            <Card>
              <CardHeader className="p-4 pb-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Live activity map</CardTitle>
                  <Button variant="ghost" size="sm">
                    View details
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <WorldMap
                  dots={LIVE_CONNECTIONS}
                  lineColor="#0ea5e9"
                />
              </CardContent>
            </Card>

            {/* Live Feed */}
            <Card>
              <CardHeader className="p-4 pb-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Live activity feed</CardTitle>
                  <Button variant="ghost" size="sm">
                    View all activity
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {[
                    {
                      type: 'view',
                      icon: Eye,
                      color: 'bg-blue-100 text-blue-600',
                      message: 'Someone viewed Homepage',
                      location: 'Addis Ababa, Ethiopia',
                      time: '2 minutes ago',
                      details: 'Viewing product: Cotton T-Shirt'
                    },
                    {
                      type: 'search',
                      icon: Search,
                      color: 'bg-purple-100 text-purple-600',
                      message: 'Product search: "t-shirt"',
                      location: 'Nairobi, Kenya',
                      time: '5 minutes ago',
                      details: '24 results found'
                    },
                    {
                      type: 'cart',
                      icon: ShoppingCart,
                      color: 'bg-green-100 text-green-600',
                      message: 'Item added to cart',
                      location: 'Lagos, Nigeria',
                      time: '8 minutes ago',
                      details: 'Cart value: ETB 450.00'
                    }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className={`w-10 h-10 rounded-full ${activity.color} flex items-center justify-center`}>
                        <activity.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{activity.message}</div>
                          <span className="text-sm text-gray-500">{activity.time}</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">{activity.details}</div>
                        <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
                          <MapPin className="w-3 h-3" />
                          {activity.location}
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Globe className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Top referrer</div>
                      <div className="font-medium mt-1">Google Search</div>
                      <div className="text-sm text-gray-500">45% of traffic</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <ShoppingBag className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Popular product</div>
                      <div className="font-medium mt-1">Cotton T-Shirt</div>
                      <div className="text-sm text-gray-500">12 views this hour</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">New customers</div>
                      <div className="font-medium mt-1">15 today</div>
                      <div className="text-sm text-gray-500">↑ 25% from yesterday</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}