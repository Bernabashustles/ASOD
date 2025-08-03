'use client';

import React, { useState } from 'react';
import { 
  ChevronLeft,
  Save,
  Undo,
  Redo,
  ExternalLink,
} from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function CustomizePage() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-[320px] flex flex-col border-r">
        {/* Header */}
        <div className="h-12 border-b flex items-center justify-between px-3">
          <div className="flex items-center gap-1.5">
            <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
              <a href="/online-store/themes">
                <ChevronLeft className="h-4 w-4" />
              </a>
            </Button>
            <span className="text-sm font-medium">Store Customization</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Button variant="outline" size="sm" className="h-7 text-xs">
              <Undo className="h-3.5 w-3.5 mr-1.5" />
              Undo
            </Button>
            <Button size="sm" className="h-7 text-xs">
              <Save className="h-3.5 w-3.5 mr-1.5" />
              Save
            </Button>
          </div>
        </div>

        {/* Settings Navigation */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-3 text-center text-muted-foreground text-sm">
            Customization options coming soon...
          </div>
        </div>
      </div>

      {/* Preview Area - Full Size iframe */}
      <div className="flex-1">
        <iframe
          src="https://test.myaxova.online/"
          className="w-full h-full border-none"
        />
      </div>
    </div>
  );
} 