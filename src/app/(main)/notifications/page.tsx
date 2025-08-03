'use client';

import React, { useState } from 'react';
import { 
  Bell, 
  Package, 
  AlertCircle, 
  CreditCard, 
  Filter, 
  Search, 
  CheckCircle2, 
  Clock, 
  ArrowLeft,
  Trash2,
  MoreHorizontal,
  ChevronDown
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  date: string;
  type: string;
  priority: string;
  isRead: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New order received',
      description: 'Order #1234 needs processing. Customer has requested express shipping.',
      time: '2 min ago',
      date: 'Today',
      type: 'order',
      priority: 'high',
      isRead: false
    },
    {
      id: '2',
      title: 'Low stock alert',
      description: 'Product "Basic T-Shirt" is running low. Only 3 items left in inventory.',
      time: '1 hour ago',
      date: 'Today',
      type: 'inventory',
      priority: 'medium',
      isRead: false
    },
    {
      id: '3',
      title: 'Payment successful',
      description: 'Payment for order #1233 was received. Amount: $129.99',
      time: '2 hours ago',
      date: 'Today',
      type: 'payment',
      priority: 'low',
      isRead: true
    },
    {
      id: '4',
      title: 'New customer registered',
      description: 'John Doe has created a new account. Send a welcome email?',
      time: '3 hours ago',
      date: 'Today',
      type: 'customer',
      priority: 'medium',
      isRead: true
    },
    {
      id: '5',
      title: 'Product review received',
      description: 'New 5-star review for "Wireless Headphones". Customer: Sarah M.',
      time: '5 hours ago',
      date: 'Today',
      type: 'review',
      priority: 'low',
      isRead: true
    },
    {
      id: '6',
      title: 'Shipping update',
      description: 'Order #1230 has been delivered. Tracking information updated.',
      time: '1 day ago',
      date: 'Yesterday',
      type: 'order',
      priority: 'medium',
      isRead: true
    },
    {
      id: '7',
      title: 'Discount code created',
      description: 'New discount code "SUMMER25" is now active. Valid until July 31.',
      time: '1 day ago',
      date: 'Yesterday',
      type: 'marketing',
      priority: 'medium',
      isRead: true
    },
    {
      id: '8',
      title: 'System update completed',
      description: 'The system has been updated to version 2.4.0. New features available.',
      time: '2 days ago',
      date: 'This Week',
      type: 'system',
      priority: 'low',
      isRead: true
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Package className="w-4 h-4" />;
      case 'inventory':
        return <AlertCircle className="w-4 h-4" />;
      case 'payment':
        return <CreditCard className="w-4 h-4" />;
      case 'customer':
        return <Bell className="w-4 h-4" />;
      case 'review':
        return <Bell className="w-4 h-4" />;
      case 'marketing':
        return <Bell className="w-4 h-4" />;
      case 'system':
        return <Bell className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'order':
        return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'inventory':
        return 'bg-amber-100 text-amber-600 border-amber-200';
      case 'payment':
        return 'bg-emerald-100 text-emerald-600 border-emerald-200';
      case 'customer':
        return 'bg-purple-100 text-purple-600 border-purple-200';
      case 'review':
        return 'bg-pink-100 text-pink-600 border-pink-200';
      case 'marketing':
        return 'bg-indigo-100 text-indigo-600 border-indigo-200';
      case 'system':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getPriorityIndicator = (priority: string) => {
    if (priority === 'high') return 'bg-red-500';
    if (priority === 'medium') return 'bg-amber-500';
    if (priority === 'low') return 'bg-emerald-500';
    return 'bg-gray-400';
  };

  const getPriorityLabel = (priority: string) => {
    if (priority === 'high') return 'High';
    if (priority === 'medium') return 'Medium';
    if (priority === 'low') return 'Low';
    return 'Normal';
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
  };

  const filteredNotifications = notifications.filter(notification => {
    // Filter by read/unread status
    if (filter === 'unread' && notification.isRead) return false;
    if (filter === 'read' && !notification.isRead) return false;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        notification.title.toLowerCase().includes(query) ||
        notification.description.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  // Group notifications by date
  const groupedNotifications: Record<string, Notification[]> = {};
  filteredNotifications.forEach(notification => {
    if (!groupedNotifications[notification.date]) {
      groupedNotifications[notification.date] = [];
    }
    groupedNotifications[notification.date].push(notification);
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <Badge variant="secondary" className="rounded-full px-2.5 py-0.5 ml-2">
          {unreadCount} unread
        </Badge>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden mb-8">
        <div className="p-4 border-b bg-gray-50 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <Tabs defaultValue="all" className="w-auto">
              <TabsList className="h-9">
                <TabsTrigger 
                  value="all" 
                  className="text-xs px-3"
                  onClick={() => setFilter('all')}
                >
                  All
                </TabsTrigger>
                <TabsTrigger 
                  value="unread" 
                  className="text-xs px-3"
                  onClick={() => setFilter('unread')}
                >
                  Unread
                </TabsTrigger>
                <TabsTrigger 
                  value="read" 
                  className="text-xs px-3"
                  onClick={() => setFilter('read')}
                >
                  Read
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="h-6 w-px bg-gray-200 mx-1 hidden sm:block"></div>

            <Select>
              <SelectTrigger className="w-[140px] h-9 text-xs">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                <SelectItem value="order">Orders</SelectItem>
                <SelectItem value="inventory">Inventory</SelectItem>
                <SelectItem value="payment">Payments</SelectItem>
                <SelectItem value="customer">Customers</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search notifications..." 
                className="pl-9 h-9 w-full sm:w-[200px] text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-9 text-xs"
              onClick={markAllAsRead}
            >
              <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
              Mark all as read
            </Button>
          </div>
        </div>

        <div className="divide-y">
          {Object.keys(groupedNotifications).length > 0 ? (
            Object.entries(groupedNotifications).map(([date, notifications]) => (
              <div key={date} className="divide-y">
                <div className="px-4 py-2 bg-gray-50/50">
                  <h3 className="text-xs font-medium text-gray-500">{date}</h3>
                </div>
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={cn(
                      "p-4 hover:bg-gray-50 transition-colors",
                      !notification.isRead && "bg-blue-50/30"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 border",
                        getNotificationColor(notification.type)
                      )}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-medium text-gray-900">
                                {notification.title}
                              </h4>
                              {!notification.isRead && (
                                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.description}
                            </p>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="text-xs text-gray-400">
                                {notification.time}
                              </span>
                              <div className="flex items-center gap-1">
                                <span className={cn(
                                  "w-1.5 h-1.5 rounded-full",
                                  getPriorityIndicator(notification.priority)
                                )}></span>
                                <span className="text-xs text-gray-500">
                                  {getPriorityLabel(notification.priority)} priority
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {!notification.isRead && (
                                  <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                    <CheckCircle2 className="w-4 h-4 mr-2" />
                                    Mark as read
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem onClick={() => deleteNotification(notification.id)}>
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No notifications found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {searchQuery 
                  ? "Try adjusting your search or filter criteria."
                  : filter === 'unread' 
                    ? "You've read all your notifications. Great job!"
                    : "You don't have any notifications yet."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 