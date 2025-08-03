import React from 'react';
import { Package, Layers, Settings, Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface MobileNavigationProps {
  activeTab: 'details' | 'variants' | 'settings';
  onTabChange: (tab: 'details' | 'variants' | 'settings') => void;
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: (isOpen: boolean) => void;
  onOpenPreview: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  activeTab,
  onTabChange,
  isMobileMenuOpen,
  onMobileMenuToggle,
  onOpenPreview
}) => {
  // Helper function for mobile navigation
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Mobile Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-30 lg:hidden">
        <div className="grid grid-cols-3 gap-px bg-gray-200">
          <button
            className={cn(
              "flex flex-col items-center justify-center h-16 bg-white transition-colors",
              activeTab === 'details' && "text-black",
              activeTab !== 'details' && "text-gray-500"
            )}
            onClick={() => {
              onTabChange('details');
              scrollToSection('product-details');
            }}
          >
            <Package className="h-5 w-5 mb-1" />
            <span className="text-xs">Details</span>
          </button>
          <button
            className={cn(
              "flex flex-col items-center justify-center h-16 bg-white transition-colors",
              activeTab === 'variants' && "text-black",
              activeTab !== 'variants' && "text-gray-500"
            )}
            onClick={() => {
              onTabChange('variants');
              scrollToSection('product-variants');
            }}
          >
            <Layers className="h-5 w-5 mb-1" />
            <span className="text-xs">Variants</span>
          </button>
          <button
            className={cn(
              "flex flex-col items-center justify-center h-16 bg-white transition-colors",
              activeTab === 'settings' && "text-black",
              activeTab !== 'settings' && "text-gray-500"
            )}
            onClick={() => onMobileMenuToggle(true)}
          >
            <Settings className="h-5 w-5 mb-1" />
            <span className="text-xs">Settings</span>
          </button>
        </div>
      </div>

      {/* Floating Action Button for mobile */}
      <div className="fixed right-4 bottom-20 lg:hidden">
        <Button
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg bg-black hover:bg-black/90"
          onClick={onOpenPreview}
        >
          <Eye className="h-5 w-5" />
        </Button>
      </div>
    </>
  );
}; 