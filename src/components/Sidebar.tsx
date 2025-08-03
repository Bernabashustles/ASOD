'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Home,
  ShoppingBag,
  Package,
  Users,
  LayoutGrid,
  BarChart,
  Megaphone,
  Tags,
  Globe,
  TabletSmartphone,
  Store,
  Settings,
  Plus,
  ChevronDown,
  FileText,
  ShoppingCart,
  UserPlus,
  PieChart,
  Mail,
  Percent,
  AppWindow,
  ChevronRight,
  ChevronLeft,
  X,
  ArrowRight,
  Palette,
  Check,
  PlusCircle,
  Paperclip,
  BarChart3,
  LineChart,
  Bell,
  MapPin,
  Building2,
  Truck,
  User,
  Shield
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';

interface Team {
  id: number;
  name: string;
  stores: Store[];
}

interface Store {
  id: number;
  name: string;
  domain: string;
}

const teams: Team[] = [
  {
    id: 1,
    name: 'Teams',
    stores: [
      { id: 1, name: 'Axova Store', domain: 'axova.store' },
      { id: 2, name: 'Fashion Store', domain: 'fashion.store' },
      { id: 3, name: 'Tech Store', domain: 'tech.store' },
    ]
  }
];

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  children?: NavItem[];
  badge?: { label: string; variant: string };
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

const navigation: NavSection[] = [
  {
    title: "Main",
    items: [
      { icon: <Home className="w-4 h-4" />, label: 'Home', href: '/' },
      
      { 
        icon: <MapPin className="w-4 h-4" />, 
        label: 'Location',
        children: [
          { icon: <Store className="w-4 h-4" />, label: 'Shop Details', href: '/location/shop' },
          { icon: <Globe className="w-4 h-4" />, label: 'Location Info', href: '/location' }
        ]
      },
      
      { 
        icon: <ShoppingBag className="w-4 h-4" />, 
        label: 'Orders',
        children: [
          { icon: <FileText className="w-4 h-4" />, label: 'All Orders', href: '/orders' },
          { icon: <ShoppingCart className="w-4 h-4" />, label: 'Abandoned Cart', href: '/orders/abandoned' },
          { icon: <Package className="w-4 h-4" />, label: 'Shipments', href: '/orders/shipments' }
        ],
        badge: { label: 'New', variant: 'blue' }
      },
      { 
        icon: <Package className="w-4 h-4" />, 
        label: 'Products',
        children: [
          { icon: <Package className="w-4 h-4" />, label: 'All Products', href: '/products' },
         
          { icon: <Settings className="w-4 h-4" />, label: 'Inventory', href: '/products/inventory' },
          { icon: <ArrowRight className="w-4 h-4" />, label: 'Transfers', href: '/products/transfers' },
          { icon: <LayoutGrid className="w-4 h-4" />, label: 'Collections', href: '/products/collections' }
        ]
      },
      { 
        icon: <Users className="w-4 h-4" />, 
        label: 'Customers',
        children: [
          { icon: <Users className="w-4 h-4" />, label: 'All Customers', href: '/customers' },
          { icon: <UserPlus className="w-4 h-4" />, label: 'Add Customer', href: '/customers/add' },
          { icon: <Tags className="w-4 h-4" />, label: 'Segments', href: '/customers/segments' }
        ]
      },
      { icon: <Bell className="w-4 h-4" />, label: 'Notifications', href: '/notifications', badge: { label: '3', variant: 'red' } },
    ]
  },
  {
    title: "Menu",
    items: [
      { 
        icon: <Building2 className="w-4 h-4" />, 
        label: 'Suppliers',
        children: [
          { icon: <Building2 className="w-4 h-4" />, label: 'All Suppliers', href: '/supplier' },
          { icon: <Plus className="w-4 h-4" />, label: 'Add Supplier', href: '/supplier?add=true' },
          { icon: <Truck className="w-4 h-4" />, label: 'Orders', href: '/supplier?tab=orders' }
        ],
        badge: { label: 'New', variant: 'green' }
      },
      { 
        icon: <LayoutGrid className="w-4 h-4" />, 
        label: 'Content',
        children: [
      
          { icon: <FileText className="w-4 h-4" />, label: 'Blog Posts', href: '/content/blog' },
          { icon: <PlusCircle className="w-4 h-4" />, label: 'Add Blog Post', href: '/content/blog/create' },
     
        ]
        
      },
      { 
        icon: <BarChart3 className="w-4 h-4" />, 
        label: 'Analytics',
        children: [
          { icon: <PieChart className="w-4 h-4" />, label: 'Dashboard', href: '/analytics' },
          { icon: <FileText className="w-4 h-4" />, label: 'Reports', href: '/reports' },
       
        ]
      },
      { 
        icon: <Megaphone className="w-4 h-4" />, 
        label: 'Marketing',
        children: [
          { icon: <PlusCircle className="w-4 h-4" />, label: 'Campaigns', href: '/marketing/campaigns' },
          
        ]
      },
      { 
        icon: <Percent className="w-4 h-4" />, 
        label: 'Discounts',
        children: [
          { icon: <Tags className="w-4 h-4" />, label: 'All Discounts', href: '/discounts' },
          { icon: <Plus className="w-4 h-4" />, label: 'Add Discount', href: '/discounts/add' }
        ]
      }
    ]
  },
  {
    title: "Sales Channels",
    items: [
      { 
        icon: <Globe className="w-4 h-4" />, 
        label: 'Online Store',
        children: [
          { icon: <Palette className="w-4 h-4" />, label: 'Themes', href: '/online-store/themes' },
          { icon: <Settings className="w-4 h-4" />, label: 'Preferences', href: '/online-store/preferences' }
        ]
      },
      { 
        icon: <Store className="w-4 h-4" />, 
        label: 'Marketplace',
        children: [
          { icon: <Store className="w-4 h-4" />, label: 'Configuration', href: '/marketplace' },
          { icon: <BarChart3 className="w-4 h-4" />, label: 'Analytics', href: '/marketplace/analytics' },
          { icon: <Settings className="w-4 h-4" />, label: 'Settings', href: '/marketplace/settings' }
        ]
      },
      { 
        icon: <TabletSmartphone className="w-4 h-4" />, 
        label: 'Point of Sale',
        children: [
          { icon: <Store className="w-4 h-4" />, label: 'Locations', href: '/pos/locations' },
        ]
      }
    ]
  },
  {
    title: "Apps",
    items: [
      { 
        icon: <AppWindow className="w-4 h-4" />, 
        label: 'Apps',
        children: [
          { icon: <Plus className="w-4 h-4" />, label: 'Add Apps', href: '/apps/add' },
          { icon: <Settings className="w-4 h-4" />, label: 'Manage Apps', href: '/apps/manage' }
        ]
      }
    ]
  },
  {
    title: "Settings",
    items: [
      { 
        icon: <User className="w-4 h-4" />, 
        label: 'Profile Settings',
        href: '/profile-settings'
      },
      { 
        icon: <Settings className="w-4 h-4" />, 
        label: 'Account Settings',
        children: [
          { icon: <Settings className="w-4 h-4" />, label: 'General', href: '/settings/general' },
          { icon: <Shield className="w-4 h-4" />, label: 'Security', href: '/settings/security' },
          { icon: <Bell className="w-4 h-4" />, label: 'Notifications', href: '/settings/notifications' }
        ]
      }
    ]
  }
];

interface NavItemProps {
  item: NavItem;
  isCollapsed: boolean;
  isChild?: boolean;
  onClick?: () => void;
  isOpen: boolean;
}

const NavItem = ({ item, isCollapsed, isChild = false, onClick, isOpen }: NavItemProps) => {
  const pathname = usePathname();
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.href === pathname || 
    (item.children?.some(child => child.href === pathname));

  const content = (
    <div
      className={cn(
        "w-full flex items-center justify-between",
        "px-2 py-1.5 text-sm",
        "text-gray-700 hover:text-gray-900",
        "hover:bg-gray-100/80",
        "rounded-md",
        "transition-colors duration-200",
        hasChildren ? 'cursor-pointer' : '',
        isCollapsed ? 'justify-center px-0' : '',
        isActive && 'bg-gray-100/80 text-gray-900',
        isOpen && 'bg-gray-100/80 text-gray-900'
      )}
      onClick={() => {
        if (hasChildren) {
          onClick?.();
        }
      }}
    >
      <div className={cn(
        "flex items-center gap-2 min-w-0",
        isCollapsed ? 'justify-center' : ''
      )}>
        <div className="flex-shrink-0">
          {item.icon}
        </div>
        {!isCollapsed && (
          <span className="truncate font-medium">{item.label}</span>
        )}
      </div>
      {hasChildren && !isCollapsed && (
        <ChevronRight className={cn(
          "w-4 h-4 flex-shrink-0 text-gray-400",
          "transition-transform duration-200",
          isOpen ? 'rotate-90' : ''
        )} />
      )}
    </div>
  );

  return (
    <div>
      {item.href ? (
        <Link href={item.href} onClick={onClick}>
          {content}
        </Link>
      ) : (
        content
      )}
      {isOpen && !isCollapsed && item.children && (
        <div className="relative ml-4 mt-1">
          <div className="absolute left-2.5 top-0 bottom-0 w-px bg-gray-200" />
          <div className="space-y-1 py-1.5">
            {item.children.map((child, index) => (
              <div key={index} className="relative">
                <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-px bg-gray-200" />
                <Link href={child.href || '#'} onClick={() => onClick?.()}>
                  <button className={cn(
                    "flex items-center gap-2 w-full rounded-md py-1.5 pl-8 pr-2 text-sm",
                    "text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 transition-colors min-w-0",
                    pathname === child.href && "bg-gray-100/80 text-gray-900"
                  )}>
                    {child.icon}
                    <span className="truncate">{child.label}</span>
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const StoreSwitcher = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStore, setCurrentStore] = useState(teams[0].stores[0]);

  // Generate initials from store name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  // Generate random pastel color based on store name
  const getStoreColor = (name: string) => {
    const colors = [
      'bg-[#36B37E]', 'bg-[#2563EB]', 'bg-[#9333EA]',
      'bg-[#F59E0B]', 'bg-[#EC4899]', 'bg-[#10B981]'
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <div className="p-3 mt-auto border-t bg-white/50 backdrop-blur-sm">
      {isCollapsed ? (
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-xl"
        >
          <div className={cn(
            "w-full h-full rounded-lg flex items-center justify-center",
            getStoreColor(currentStore.name)
          )}>
            <span className="text-white font-medium text-sm">
              {getInitials(currentStore.name)}
            </span>
          </div>
        </Button>
      ) : (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-full h-[52px] px-2 justify-between hover:bg-gray-100 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center shadow-sm",
                  getStoreColor(currentStore.name)
                )}>
                  <span className="text-white font-medium">
                    {getInitials(currentStore.name)}
                  </span>
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium truncate">
                    {currentStore.name}
                  </span>
                  <span className="text-xs text-gray-500 truncate">
                    {currentStore.domain}
                  </span>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            className="w-[240px] p-2" 
            align="start" 
            alignOffset={11}
            sideOffset={8}
          >
            <div className="space-y-4">
              {teams.map((team) => (
                <div key={team.id}>
                  <div className="px-2 mb-2">
                    <h4 className="text-xs font-medium text-gray-500">{team.name}</h4>
                  </div>
                  <div className="space-y-1">
                    {team.stores.map((store) => (
                      <DropdownMenuItem 
                        key={store.id}
                        className="p-2 focus:bg-gray-100 rounded-lg cursor-pointer"
                        onClick={() => {
                          setCurrentStore(store);
                          setIsOpen(false);
                        }}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center",
                            getStoreColor(store.name)
                          )}>
                            <span className="text-white text-sm font-medium">
                              {getInitials(store.name)}
                            </span>
                          </div>
                          <div className="flex flex-col flex-1 min-w-0">
                            <span className="text-sm font-medium truncate">
                              {store.name}
                            </span>
                            <span className="text-xs text-gray-500 truncate">
                              {store.domain}
                            </span>
                          </div>
                          {store.id === currentStore.id && (
                            <Check className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <DropdownMenuSeparator className="my-2" />
            <Button 
              variant="ghost" 
              className="w-full h-9 justify-start text-sm font-normal"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add new store
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: (collapsed: boolean) => void;
  isMobile: boolean;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const Sidebar = ({ 
  isCollapsed, 
  onToggleCollapse, 
  isMobile,
  isOpen,
  onOpenChange
}: SidebarProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleMenuClick = (label: string) => {
    setOpenMenu(prev => (prev === label ? null : label));
  };

  return (
    <>
      {/* Mobile Overlay - Only show when menu is actively opened (not on hover) */}
      {isMobile && isOpen && !isHovered && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-200"
          onClick={() => onOpenChange(false)}
        />
      )}
      
      {/* Hover Area for Mobile */}
      {isMobile && (
        <div 
          className="fixed left-0 top-0 bottom-0 w-4 z-40"
          onMouseEnter={() => setIsHovered(true)}
        />
      )}
      
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-40",
          "flex flex-col h-screen bg-white shadow-sm",
          "transition-all duration-300 ease-in-out",
          // Mobile: Show on hover or when explicitly opened
          isMobile ? (
            isHovered || isOpen 
              ? "w-[250px] translate-x-0" 
              : "w-[250px] -translate-x-[calc(100%-4px)]"
          ) : (
            isCollapsed ? "w-[60px]" : "w-[250px]"
          )
        )}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Unified Header */}
        <div className="h-14 flex items-center border-b">
          <div className="flex items-center">
            {(!isCollapsed && !isMobile) ? (
              <Image
                src="/assets/logo.png"
                alt="Store Logo"
                width={150}
                height={150}
                className="object-contain"
              />
            ) : (
              <div className="pl-3">
                <Image
                  src="/assets/icon.png"
                  alt="Store Icon"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
            )}
          </div>
          {isMobile && (isHovered || isOpen) && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 h-8 w-8"
              onClick={() => {
                setIsHovered(false);
                onOpenChange(false);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Main Navigation */}
        <div className="flex-1 overflow-y-auto custom-scrollbar py-6 px-3">
          {/* Collapse Button - Adjusted position */}
          {!isMobile && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onToggleCollapse(!isCollapsed)}
              className={cn(
                "absolute top-20",
                "-right-3",
                "h-7 w-7",
                "rounded-full",
                "bg-white border shadow-md",
                "hover:bg-gray-100 hover:border-gray-300",
                "flex items-center justify-center",
                "transition-all duration-200",
                "z-50"
              )}
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          )}

          {navigation.map((section, index) => (
            <div key={index} className={cn(
              "mb-8",
              index === 0 && "mt-2"
            )}>
              {(isMobile || !isCollapsed) && section.title && (
                <h2 className="mb-3 px-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                  {section.title}
                </h2>
              )}
              <nav className="space-y-1.5">
                {section.items.map((item, itemIndex) => (
                  <NavItem 
                    key={itemIndex} 
                    item={item} 
                    isCollapsed={isMobile ? false : isCollapsed}
                    isOpen={openMenu === item.label}
                    onClick={() => {
                      handleMenuClick(item.label);
                      if (isMobile && !item.children) {
                        setIsHovered(false);
                        onOpenChange(false);
                      }
                    }}
                  />
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Store Switcher */}
        <StoreSwitcher isCollapsed={isCollapsed} />
      </div>
    </>
  );
};

export default Sidebar;
