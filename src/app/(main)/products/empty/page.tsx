'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, Upload, Package } from 'lucide-react';
import { Button } from "@/components/ui/button";
import EmptyState from '@/components/EmptyState';
import type { JSX } from 'react';

export default function EmptyProductsPage() {
  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your products and inventory
          </p>
        </div>
        <Link href="/products/add">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add product
          </Button>
        </Link>
      </div>

      <EmptyState 
        icon={Package}
        title="Add your first product"
        description="Start adding products to your store. You can add products manually or import them in bulk."
        primaryAction={{
          label: "Add product",
          onClick: () => {},
          icon: Plus
        }}
        secondaryAction={{
          label: "Import products",
          onClick: () => {},
          icon: Upload
        }}
        footerContent={
          <div>
            <div className="text-sm font-medium mb-2">Get products with apps</div>
            <p className="text-sm text-gray-500 mb-4">
              Find products to sell and add them directly to your store.
            </p>
            <Button variant="outline" size="sm">
              Browse apps
            </Button>
          </div>
        }
      />
    </div>
  );
}