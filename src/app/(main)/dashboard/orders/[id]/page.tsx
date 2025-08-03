'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function OrderDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  return (
    <div className="container py-6">
      <div className="flex items-center gap-2 mb-4">
        <Link href="/dashboard/orders">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to orders
          </Button>
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">Order: {id}</h1>
      <p>Order details go here</p>
    </div>
  );
} 