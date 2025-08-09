'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { LucideIcon } from 'lucide-react';
import { 
  Store,
  CreditCard,
  Users,
  ShoppingCart,
  Truck,
  Percent,
  MapPin,
  Globe,
  Box,
  Bell,
  FileText,
  Lock,
  Settings,
  Languages,
  X,
  ChevronRight,
  Menu,
  Building,
  ChevronLeft,
  Building2
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "@/lib/auth-client";

type NavItem = {
  icon: LucideIcon;
  label: string;
  href: string;
  description?: string;
};

const settingsNavigation = [
  {
    title: 'Store',
    items: [
      { 
        icon: Store, 
        label: 'Shop', 
        href: '/settings/shop',
        description: 'Manage your store settings and preferences'
      },
      { 
        icon: Building2, 
        label: 'Business', 
        href: '/settings/business',
        description: 'Manage your business information and legal details'
      },
      { 
        icon: Globe, 
        label: 'Domains', 
        href: '/settings/domains',
        description: 'Manage your store domains and subdomains'
      },
      { 
        icon: MapPin, 
        label: 'Locations', 
        href: '/settings/locations',
        description: 'Manage your store locations and pickup points'
      }
    ]
  },
  {
    title: 'Store settings',
    items: [
      { 
        icon: Store, 
        label: 'General', 
        href: '/settings',
        description: 'Store details and contact information'
      },
      { 
        icon: CreditCard, 
        label: 'Plan', 
        href: '/settings/plan',
        description: 'View and manage your subscription'
      },
      { 
        icon: Building, 
        label: 'Billing', 
        href: '/settings/billing',
        description: 'View and manage billing information'
      },
      { 
        icon: Users, 
        label: 'Users and permissions', 
        href: '/settings/users',
        description: 'Manage staff and permissions'
      },
      { 
        icon: ShoppingCart, 
        label: 'Payments', 
        href: '/settings/payments',
        description: 'Payment providers and methods'
      },
      { 
        icon: ShoppingCart, 
        label: 'Checkout', 
        href: '/settings/checkout',
        description: 'Customize your checkout process'
      },
      { 
        icon: Users, 
        label: 'Customer accounts', 
        href: '/settings/customers',
        description: 'Customer account settings'
      },
      { 
        icon: Truck, 
        label: 'Shipping and delivery', 
        href: '/settings/shipping',
        description: 'Manage shipping rates and delivery'
      },
      { 
        icon: Percent, 
        label: 'Taxes and duties', 
        href: '/settings/taxes',
        description: 'Tax rates and calculations'
      },
      { 
        icon: MapPin, 
        label: 'Locations', 
        href: '/settings/locations',
        description: 'Manage store locations'
      },
      { 
        icon: Globe, 
        label: 'Markets', 
        href: '/settings/markets',
        description: 'Sell in different markets'
      }
    ]
  },
  {
    title: 'Apps and sales channels',
    items: [
      { 
        icon: Box, 
        label: 'Apps and sales channels', 
        href: '/settings/apps',
        description: 'Manage your installed apps'
      },
      { 
        icon: Globe, 
        label: 'Domains', 
        href: '/settings/domains',
        description: 'Manage store domains'
      }
    ]
  },
  {
    title: 'Customer communications',
    items: [
      { 
        icon: Bell, 
        label: 'Notifications', 
        href: '/settings/notifications',
        description: 'Email and notification settings'
      },
      { 
        icon: FileText, 
        label: 'Custom data', 
        href: '/settings/custom-data',
        description: 'Manage custom data fields'
      },
      { 
        icon: Languages, 
        label: 'Languages', 
        href: '/settings/languages',
        description: 'Store language settings'
      }
    ]
  },
  {
    title: 'Policies',
    items: [
      { 
        icon: Lock, 
        label: 'Customer privacy', 
        href: '/settings/privacy',
        description: 'Privacy and data protection'
      },
      { 
        icon: FileText, 
        label: 'Policies', 
        href: '/settings/policies',
        description: 'Store policies and terms'
      }
    ]
  }
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const params = useParams();
  const { data: session } = useSession();
  const storeId = (params?.storeid as string) || "my-store";
  const basePath = `/store/${storeId}`;
  const storeName = storeId.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const storeDomain = `${storeId}.asod.store`;

  const storeInitials = storeName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(s => s[0]?.toUpperCase())
    .join('');

  const avatarColorClasses = (() => {
    const palette = [
      "bg-emerald-100 text-emerald-700",
      "bg-sky-100 text-sky-700",
      "bg-violet-100 text-violet-700",
      "bg-amber-100 text-amber-700",
      "bg-rose-100 text-rose-700",
      "bg-teal-100 text-teal-700",
    ];
    const key = storeId.toLowerCase();
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash << 5) - hash + key.charCodeAt(i);
      hash |= 0;
    }
    return palette[Math.abs(hash) % palette.length];
  })();

  const userColorClasses = (() => {
    const palette = [
      "bg-emerald-100 text-emerald-700",
      "bg-sky-100 text-sky-700",
      "bg-violet-100 text-violet-700",
      "bg-amber-100 text-amber-700",
      "bg-rose-100 text-rose-700",
      "bg-teal-100 text-teal-700",
    ];
    const key = (session?.user?.email || session?.user?.name || 'user').toLowerCase();
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash << 5) - hash + key.charCodeAt(i);
      hash |= 0;
    }
    return palette[Math.abs(hash) % palette.length];
  })();

  const resolveHref = (href: string) => `${basePath}${href}`;
  const [isOpen, setIsOpen] = useState(false);

  // Function to get current page title
  const getCurrentPageTitle = () => {
    const currentRoute = settingsNavigation
      .flatMap(section => section.items)
      .map(item => ({ ...item, href: resolveHref(item.href) }))
      .find(item => item.href === pathname);
    return currentRoute?.label || 'Settings';
  };

  // Check if we're on the main settings page
  const isMainSettingsPage = pathname === `${basePath}/settings`;

  const MobileHeader = () => (
    <header className="h-14 bg-white border-b fixed top-0 left-0 right-0 z-30 lg:hidden">
      <div className="h-full px-4">
        <div className="flex items-center gap-3 h-full">
          <div className="flex items-center gap-3">
            <Link href={basePath}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 hover:bg-[#f6f6f7] group"
              >
                <X className="h-5 w-5 text-[#5c5f62] group-hover:text-[#202223] transition-colors" />
              </Button>
            </Link>
            <div className="h-4 w-[1px] bg-[#e1e3e5]" />
          </div>
          <h1 className="text-[16px] font-medium text-[#202223]">
            {getCurrentPageTitle()}
          </h1>
        </div>
      </div>
    </header>
  );

  const MobileSettingsMenu = () => (
    <div className="lg:hidden space-y-4">
      {/* Store Info Card */}
      <div className="bg-white rounded-lg border border-[#e1e3e5] p-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-[15px] font-semibold text-[#202223] truncate mb-2">{storeName}</div>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 rounded-full">
                <AvatarFallback className={cn("text-sm font-semibold rounded-full", avatarColorClasses)}>
                  {storeInitials || 'ST'}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <div className="text-[13px] text-[#6d7175] truncate">{storeDomain}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Navigation */}
      <div className="bg-white rounded-lg border border-[#e1e3e5] overflow-hidden">
        {settingsNavigation.map((section, index) => (
          <div key={index} className={cn("py-2", index !== 0 && "border-t border-[#e1e3e5]")}>
            <div className="px-4 mb-1">
              <h2 className="text-[12px] font-semibold text-[#6d7175] uppercase tracking-wider">
                {section.title}
              </h2>
            </div>
            <nav>
              {section.items.map((item, itemIndex) => (
                <Link
                  key={itemIndex}
                  href={resolveHref(item.href)}
                  className="flex items-center px-4 py-3.5 gap-3 hover:bg-[#f6f6f7] active:bg-[#f1f2f3] transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <item.icon className="w-[20px] h-[20px] text-[#5c5f62] shrink-0" />
                    <div className="min-w-0 flex-1">
                      <span className="text-[14px] text-[#202223] font-medium">{item.label}</span>
                      {item.description && (
                        <p className="text-[13px] text-[#6d7175] truncate mt-0.5">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#8c9196]" />
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>

      {/* Account Info Card */}
      <div className="bg-white rounded-lg border border-[#e1e3e5] p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 rounded-full">
            <AvatarImage src={session?.user?.image || undefined} alt={session?.user?.name || 'User'} />
            <AvatarFallback className={cn("text-sm font-semibold rounded-full", userColorClasses)}>
              {(session?.user?.name || session?.user?.email || 'U').slice(0,2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="text-[15px] font-medium text-[#202223] truncate">{session?.user?.name || session?.user?.email || 'User'}</div>
            <div className="text-[13px] text-[#6d7175] truncate">{session?.user?.email || ''}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const NavigationContent = () => (
    <>
      {/* Store Selector */}
      <div className="bg-white p-4 border-b border-[#e1e3e5]">
        <div className="w-full flex items-center gap-3 group">
          <Avatar className="h-9 w-9 rounded-full">
            <AvatarFallback className={cn("text-[11px] font-semibold rounded-full", avatarColorClasses)}>
              {storeInitials || 'ST'}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 text-left">
            <div className="text-[14px] font-semibold text-[#202223] truncate mb-0.5">{storeName}</div>
            <div className="text-[13px] text-[#6d7175] truncate">{storeDomain}</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="py-1">
        {settingsNavigation.map((section, index) => (
          <div key={index} className={cn("py-3", index !== 0 && "border-t border-[#e1e3e5]")}>
            <div className="px-4 mb-1">
              <h2 className="text-[11px] font-semibold text-[#6d7175] uppercase tracking-wider">
                {section.title}
              </h2>
            </div>
            <nav>
              {section.items.map((item, itemIndex) => {
                const resolved = resolveHref(item.href);
                const isActive = pathname === resolved;
                return (
                  <Link
                    key={itemIndex}
                    href={resolved}
                    className={cn(
                      "flex items-center px-4 py-2 text-[13px] gap-3",
                      "transition-all duration-150",
                      isActive 
                        ? "bg-[#f1f2f3] text-[#202223] font-medium"
                        : "text-[#202223] hover:bg-[#f6f6f7]"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-[18px] h-[18px] text-[#5c5f62] shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Account Info */}
      <div className="border-t border-[#e1e3e5] p-4">
        <div className="w-full flex items-center gap-3 group">
          <Avatar className="h-9 w-9 rounded-full">
            <AvatarImage src={session?.user?.image || undefined} alt={session?.user?.name || 'User'} />
            <AvatarFallback className={cn("text-[11px] font-semibold rounded-full", userColorClasses)}>
              {(session?.user?.name || session?.user?.email || 'U').slice(0,2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 text-left">
            <div className="text-[14px] font-medium text-[#202223] truncate">{session?.user?.name || session?.user?.email || 'User'}</div>
            <div className="text-[13px] text-[#6d7175] truncate">{session?.user?.email || ''}</div>
          </div>
        </div>
      </div>
    </>
  );

  // Desktop header remains the same
  const DesktopHeader = () => (
    <header className="h-12 bg-white border-b fixed top-0 left-0 right-0 z-30 hidden lg:block">
      <div className="max-w-[960px] mx-auto px-3 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-4">
            {/* Back Button Group */}
            <div className="flex items-center">
              <Link href={`${basePath}/settings`} className="group">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 hover:bg-[#f6f6f7] mr-3 relative"
                >
                  <X className="h-4 w-4 text-[#5c5f62] group-hover:text-[#202223] transition-colors" />
                  <span className="sr-only">Go back</span>
                </Button>
              </Link>
              <div className="h-4 w-[1px] bg-[#e1e3e5]" />
            </div>

            {/* Title with Breadcrumb */}
            <div className="flex items-center gap-2">
              <h1 className="text-[15px] font-medium text-[#202223]">
                {!isMainSettingsPage ? (
                  <>
                    <Link 
                      href={`${basePath}/settings`} 
                      className="text-[#6d7175] hover:text-[#202223] transition-colors"
                    >
                      Settings
                    </Link>
                    <span className="text-[#6d7175] mx-2">/</span>
                    <span>{getCurrentPageTitle()}</span>
                  </>
                ) : (
                  'Settings'
                )}
              </h1>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 text-xs text-[#202223] hover:bg-[#f6f6f7] flex items-center gap-1.5"
            >
              <Bell className="h-3.5 w-3.5" />
              <span>What's new</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 text-[13px] text-[#202223] hover:bg-[#f6f6f7] flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              <span>Help</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );

  return (
    <div className="min-h-screen bg-[#f6f6f7]">
      <MobileHeader />
      <DesktopHeader />

      <main className="pt-12">
        <div className="max-w-[960px] mx-auto px-3">
          <div className="py-4">
            {/* Show mobile menu only on main settings page */}
            {isMainSettingsPage && <MobileSettingsMenu />}

            {/* Desktop layout */}
            <div className="hidden lg:grid lg:grid-cols-[200px,1fr] gap-4">
              <aside>
                <div className="bg-white rounded-md border border-[#e1e3e5] overflow-hidden">
                  <NavigationContent />
                </div>
              </aside>

              <section className="bg-white rounded-md border border-[#e1e3e5] p-4">
                {children}
              </section>
            </div>

            {/* Mobile content */}
            <div className="lg:hidden">
              {!isMainSettingsPage && (
                <div className="bg-white rounded-md border border-[#e1e3e5] p-4">
                  {children}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}