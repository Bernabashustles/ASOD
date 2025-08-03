import React, { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SidebarCardProps {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export const SidebarCard: React.FC<SidebarCardProps> = ({
  title,
  action,
  children,
  isExpanded = true,
  onToggleExpand
}) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  const isExpandable = isMobile && onToggleExpand;

  return (
    <Card>
      <CardHeader 
        className="p-6 pb-0 flex items-center justify-between"
        onClick={isExpandable ? onToggleExpand : undefined}
        style={isExpandable ? { cursor: 'pointer' } : undefined}
      >
        <CardTitle className="text-base">{title}</CardTitle>
        <div className="flex items-center gap-2">
          {action}
          {isExpandable && (
            <ChevronDown className={cn(
              "h-4 w-4 transition-transform lg:hidden",
              isExpanded && "transform rotate-180"
            )} />
          )}
        </div>
      </CardHeader>
      <CardContent className={cn(
        "p-6",
        isMobile && !isExpanded && "hidden lg:block"
      )}>
        {children}
      </CardContent>
    </Card>
  );
}; 