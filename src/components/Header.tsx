'use client';

import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  HelpCircle, 
  Settings, 
  ChevronDown, 
  LogOut, 
  CreditCard, 
  User, 
  Menu,
  Store,
  ExternalLink,
  Mail,
  MessageSquare,
  Gift,
  AlertCircle,
  Package,
  Clock
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface HeaderProps {
  isSidebarCollapsed: boolean;
  isMobile: boolean;
  onMenuClick: () => void;
}

const NotificationsMenu = () => {
  const [notifications] = useState([
    {
      id: '1',
      title: 'New order received',
      description: 'Order #1234 needs processing',
      time: '2 min ago',
      type: 'order',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Low stock alert',
      description: 'Product "Basic T-Shirt" is running low',
      time: '1 hour ago',
      type: 'inventory',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Payment successful',
      description: 'Payment for order #1233 was received',
      time: '2 hours ago',
      type: 'payment',
      priority: 'low'
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Package className="w-4 h-4" />;
      case 'inventory':
        return <AlertCircle className="w-4 h-4" />;
      case 'payment':
        return <CreditCard className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (type === 'order') return 'bg-blue-100 text-blue-600 border-blue-200';
    if (type === 'inventory') return 'bg-amber-100 text-amber-600 border-amber-200';
    if (type === 'payment') return 'bg-emerald-100 text-emerald-600 border-emerald-200';
    return 'bg-gray-100 text-gray-600 border-gray-200';
  };

  const getPriorityIndicator = (priority: string) => {
    if (priority === 'high') return 'bg-red-500';
    if (priority === 'medium') return 'bg-amber-500';
    if (priority === 'low') return 'bg-emerald-500';
    return 'bg-gray-400';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 relative"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[380px] p-0 overflow-hidden rounded-xl border border-gray-200 shadow-lg">
        <div className="bg-gradient-to-r from-gray-50 to-white border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-gray-500" />
              <h4 className="font-medium text-sm">Notifications</h4>
              <Badge variant="secondary" className="rounded-full px-2 py-0.5 text-xs bg-gray-100 text-gray-700 font-normal">
                {notifications.length}
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 text-xs font-normal hover:bg-gray-100 px-2"
              >
                Mark all as read
              </Button>
            </div>
          </div>
        </div>
        
        <div className="max-h-[380px] overflow-y-auto py-1 bg-white">
          {notifications.map((notification, index) => (
            <div key={notification.id} className="px-3">
              <DropdownMenuItem 
                className={cn(
                  "px-3 py-3 rounded-lg my-1 cursor-pointer",
                  "hover:bg-gray-50 focus:bg-gray-50 focus:outline-none",
                  "transition-colors duration-150 ease-in-out",
                  "border border-transparent hover:border-gray-100"
                )}
              >
                <div className="flex items-start gap-3 relative">
                  <div className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 border",
                    getNotificationColor(notification.type, notification.priority)
                  )}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {notification.title}
                      </p>
                      <span className={cn(
                        "w-1.5 h-1.5 rounded-full flex-shrink-0",
                        getPriorityIndicator(notification.priority)
                      )} />
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-1 mt-0.5 mb-1">
                      {notification.description}
                    </p>
                    <div className="flex items-center">
                      <span className="text-[11px] text-gray-400 whitespace-nowrap">
                        {notification.time}
                      </span>
                    </div>
                  </div>
                </div>
              </DropdownMenuItem>
              {index < notifications.length - 1 && (
                <div className="h-px bg-gray-100 mx-3" />
              )}
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-gray-50 to-white border-t p-3 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-xs font-normal text-gray-500 hover:text-gray-700 px-2 h-7"
          >
            <Clock className="w-3.5 h-3.5 mr-1.5" />
            History
          </Button>
          
          <Button 
            variant="ghost" 
            className="h-8 text-xs font-medium justify-center text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 rounded-lg"
            asChild
          >
            <Link href="/notifications">
              View all
              <ExternalLink className="w-3 h-3 ml-1.5 opacity-70" />
            </Link>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 hover:bg-gray-100 p-1.5 rounded-md transition-colors">
          <div className="relative">
            <img
              src="https://avatars.githubusercontent.com/u/124599?v=4"
              alt="User"
              className="w-8 h-8 rounded-full ring-2 ring-white"
            />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
          </div>
          <div className="hidden sm:flex flex-col items-start">
            <span className="text-sm font-medium">Yeabkibir</span>
            <span className="text-xs text-gray-500">m@example.com</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500 ml-2 hidden sm:block" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">Yeabkibir</p>
            <p className="text-xs text-gray-500">m@example.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="w-4 h-4 mr-2" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Store className="w-4 h-4 mr-2" />
            My Store
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Gift className="w-4 h-4 mr-2" />
            What's New
            <Badge className="ml-auto" variant="secondary">New</Badge>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MessageSquare className="w-4 h-4 mr-2" />
            Feedback
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Mail className="w-4 h-4 mr-2" />
            Support
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600">
          <LogOut className="w-4 h-4 mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default function Header({ isSidebarCollapsed, isMobile, onMenuClick }: HeaderProps) {
  return (
    <header className={cn(
      "h-14 border-b bg-white flex items-center justify-between sticky top-0 z-50 transition-all duration-300",
      isMobile ? "pl-4" : (isSidebarCollapsed ? "pl-[76px]" : "pl-[266px]")
    )}>
      <div className="flex items-center gap-2">
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onMenuClick}
          >
            <Menu className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2 px-4 flex-1 max-w-[800px]">
        {/* Enhanced Search Input */}
        <div className="relative flex-1 max-w-2xl mx-auto">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-gray-500 transition-colors" />
            <Input 
              placeholder="Search products, orders, or customers..." 
              className="pl-11 pr-4 h-10 w-full bg-gray-50/50 border-gray-200 rounded-xl
                hover:bg-white focus:bg-white transition-colors duration-200
                hover:border-gray-300 focus:border-gray-300 focus:ring-0"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 px-1.5 h-6 text-[10px] font-mono font-medium text-gray-400 bg-gray-100/80 rounded border border-gray-200/50">
              /
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 hidden sm:flex"
        >
          <HelpCircle className="h-4 w-4" />
        </Button>
        
        <NotificationsMenu />

        <div className="w-px h-6 bg-gray-200 mx-2 hidden sm:block" />
        <UserMenu />
      </div>
    </header>
  );
}