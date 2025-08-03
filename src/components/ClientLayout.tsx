'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Header from './Header';
import MobileNavigation from './MobileNavigation';
import { cn } from "@/lib/utils";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [pathname, isMobile]);

  // Don't show sidebar and header for theme customizer
  if (pathname === '/online-store/themes/customize') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Sidebar 
        isCollapsed={isCollapsed}
        onToggleCollapse={setIsCollapsed}
        isMobile={isMobile}
        isOpen={isSidebarOpen}
        onOpenChange={setSidebarOpen}
      />
      <div className={cn(
        "flex flex-col min-h-screen transition-all duration-300",
        isMobile ? "pl-0" : (isCollapsed ? "pl-[60px]" : "pl-[250px]")
      )}>
        <Header 
          isSidebarCollapsed={isCollapsed} 
          isMobile={isMobile}
          onMenuClick={() => setSidebarOpen(prev => !prev)}
        />
        <main className={cn(
          "flex-1 p-4 md:p-6",
          isMobile && "pb-20" // Add padding for mobile navigation
        )}>
          {children}
        </main>
        {isMobile && <MobileNavigation />}
      </div>
    </div>
  );
}