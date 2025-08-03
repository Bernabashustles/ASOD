'use client';

import React from 'react';
import { Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface SettingsPageProps {
  title: string;
  description?: string;
  showInfo?: boolean;
  children: React.ReactNode;
}

export function SettingsPage({ title, description, showInfo = false, children }: SettingsPageProps) {
  return (
    <div className="p-8 max-w-[800px]">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">{title}</h1>
        {description && (
          <p className="mt-2 text-[15px] text-[#6d7175]">{description}</p>
        )}
      </div>
      
      {children}

      {showInfo && (
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-[#5c5f62]" />
              <CardTitle className="text-base">Need help?</CardTitle>
            </div>
            <CardDescription>
              Visit the Axova Help Center or contact support.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
} 