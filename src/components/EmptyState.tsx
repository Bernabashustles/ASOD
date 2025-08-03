'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  footerContent?: React.ReactNode;
  className?: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  footerContent,
  className
}: EmptyStateProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center px-6 py-16 max-w-[420px] mx-auto",
      className
    )}>
      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-gray-400" />
      </div>

      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h2>

      <p className="text-sm text-gray-500 mb-6">
        {description}
      </p>

      <div className="flex items-center gap-3">
        {primaryAction && (
          <Button 
            onClick={primaryAction.onClick}
            className="gap-2"
          >
            {primaryAction.icon && <primaryAction.icon className="w-4 h-4" />}
            {primaryAction.label}
          </Button>
        )}

        {secondaryAction && (
          <Button 
            variant="outline" 
            onClick={secondaryAction.onClick}
            className="gap-2"
          >
            {secondaryAction.icon && <secondaryAction.icon className="w-4 h-4" />}
            {secondaryAction.label}
          </Button>
        )}
      </div>

      {footerContent && (
        <div className="mt-12">
          {footerContent}
        </div>
      )}
    </div>
  );
}