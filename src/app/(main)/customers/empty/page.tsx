'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, Upload, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import EmptyState from '@/components/EmptyState';

export default function EmptyCustomersPage() {
  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Customers</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and view customer information
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" />
            Import
          </Button>
          <Link href="/customers/add">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add customer
            </Button>
          </Link>
        </div>
      </div>

      <EmptyState 
        icon={Users}
        title="Everything customers-related in one place"
        description="Manage customer details, see customer order history, and group customers into segments."
        primaryAction={{
          label: "Add customer",
          onClick: () => {},
          icon: Plus
        }}
        secondaryAction={{
          label: "Import customers",
          onClick: () => {},
          icon: Upload
        }}
        footerContent={
          <div>
            <h3 className="text-sm font-medium mb-2">Get customers with apps</h3>
            <p className="text-sm text-gray-500 mb-4">
              Grow your customer list by adding a lead capture form to your store and marketing.
            </p>
            <Button variant="outline" size="sm">
              See app recommendations
            </Button>
          </div>
        }
      />
    </div>
  );
}