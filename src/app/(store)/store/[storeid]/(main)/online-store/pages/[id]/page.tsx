'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function PageDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  return (
    <div className="container py-6">
      <div className="flex items-center gap-2 mb-4">
        <Link href="/online-store/pages">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to pages
          </Button>
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">Page Details: {id}</h1>
      <p>Page content goes here</p>
    </div>
  );
} 