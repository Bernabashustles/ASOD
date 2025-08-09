'use client';

import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  HelpCircle, 
  Settings, 
  ChevronDown, 
  CreditCard, 
  Menu,
  Store,
  ExternalLink,
  MessageSquare,
  AlertCircle,
  Package,
  Clock,
  Globe,
  ArrowLeftRight,
  ChevronRight,
  Copy,
  Check
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
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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

const StoreMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const params = useParams();
  const storeId = (params?.storeid as string) || "my-store";
  const storeName = storeId.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const storeDomain = `${storeId}.asod.store`;
  const initials = storeName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");

  const avatarColorClasses = (() => {
    const palette = [
      "bg-emerald-100 text-emerald-700",
      "bg-sky-100 text-sky-700",
      "bg-violet-100 text-violet-700",
      "bg-amber-100 text-amber-700",
      "bg-rose-100 text-rose-700",
      "bg-teal-100 text-teal-700",
    ];
    const key = (storeId || storeName || "store").toLowerCase();
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash << 5) - hash + key.charCodeAt(i);
      hash |= 0;
    }
    const index = Math.abs(hash) % palette.length;
    return palette[index];
  })();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`https://${storeDomain}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="group flex items-center gap-3 hover:bg-gray-100/70 px-2.5 py-1.5 rounded-xl transition-all">
          <div className="relative p-[1.5px] rounded-full bg-gradient-to-br from-gray-200 via-gray-100 to-white shadow-sm">
            <Avatar className="h-8 w-8 ring-2 ring-white">
              <AvatarFallback className={cn("text-[11px] font-semibold", avatarColorClasses)}>
                {initials || 'ST'}
              </AvatarFallback>
            </Avatar>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>
          <div className="hidden sm:flex flex-col items-start leading-tight">
            <span className="text-sm font-semibold text-gray-900">
              {storeName}
            </span>
            <span className="text-[11px] text-gray-500 flex items-center gap-1">
              <Globe className="w-3 h-3" />
              {storeDomain}
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500 ml-1 hidden sm:block" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-start gap-3">
            <div className="p-[2px] rounded-xl bg-gradient-to-br from-gray-200 via-gray-100 to-white shadow-sm">
            <Avatar className="h-10 w-10 ring-2 ring-white">
              <AvatarFallback className={cn("text-sm font-semibold", avatarColorClasses)}>
                {initials || 'ST'}
              </AvatarFallback>
            </Avatar>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{storeName}</p>
              <p className="text-xs text-gray-500 flex items-center gap-1 truncate">
                <Globe className="w-3 h-3" /> https://{storeDomain}
              </p>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant="secondary" className="px-1.5 py-0 text-[10px]">Active</Badge>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/steps/choose`} className="flex items-center">
              <ArrowLeftRight className="w-4 h-4 mr-2" />
              View or Switch Store
              <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href={`https://${storeDomain}`} target="_blank" rel="noreferrer" className="flex items-center">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Online Store
              <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/store/${storeId}`} className="flex items-center">
              <Store className="w-4 h-4 mr-2" />
              Manage Store
              <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/store/${storeId}/settings`} className="flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Settings
              <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleCopy} className="flex items-center">
            {copied ? ( 
              <Check className="w-4 h-4 mr-2 text-emerald-600" />
            ) : (
              <Copy className="w-4 h-4 mr-2" />
            )}
            Copy Store Link
            {copied && <span className="ml-auto text-xs text-emerald-600">Copied</span>}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MessageSquare className="w-4 h-4 mr-2" />
            Feedback
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default function Header({ isSidebarCollapsed, isMobile, onMenuClick }: HeaderProps) {
  return (
    <header className={cn(
      "h-14 border-b bg-white grid grid-cols-[auto,1fr,auto] items-center sticky top-0 z-50 transition-all duration-300",
      isMobile ? "px-4" : (isSidebarCollapsed ? "pl-[76px] pr-4" : "pl-[266px] pr-4")
    )}>
      {/* Left: Menu button */}
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

      {/* Center: Search (perfectly centered) */}
      <div className="justify-self-center w-full max-w-2xl px-4">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-gray-500 transition-colors" />
          <Input
            placeholder="Search products, orders, or customers..."
            className="pl-11 pr-14 h-10 w-full bg-gray-50/60 border-gray-200 rounded-2xl shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)]
              hover:bg-white focus:bg-white transition-colors duration-200
              hover:border-gray-300 focus:border-gray-300 focus:ring-0"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 px-2 h-6 text-[10px] font-mono font-medium text-gray-500 bg-gray-100 rounded-md border border-gray-200">
            /
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center justify-end gap-2 pr-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 hidden sm:flex"
        >
          <HelpCircle className="h-4 w-4" />
        </Button>
        <NotificationsMenu />
        <div className="w-px h-6 bg-gray-200 mx-2 hidden sm:block" />
        <StoreMenu />
      </div>
    </header>
  );
} 