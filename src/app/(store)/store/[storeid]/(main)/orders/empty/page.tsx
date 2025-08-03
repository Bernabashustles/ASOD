'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, Upload, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import EmptyState from '@/components/EmptyState';

export default function EmptyOrdersPage() {
  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Orders</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and fulfill your orders
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" />
            Import
          </Button>
          <Link href="/orders">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create order
            </Button>
          </Link>
        </div>
      </div>

      <EmptyState 
        icon={FileText}
        title="Your orders will show here"
        description="To get orders and accept payments from customers, you need to select a plan. You'll only be charged for your plan after your free trial ends."
        primaryAction={{
          label: "Select plan",
          onClick: () => {},
          icon: Plus
        }}
        footerContent={
          <div>
            <p className="text-sm text-gray-500">
              Learn more about{' '}
              <Button variant="link" className="h-auto p-0 text-blue-600">
                orders
              </Button>
            </p>
          </div>
        }
      />
    </div>
  );
}