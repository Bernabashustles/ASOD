'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="text-center">
        <h1 className="text-8xl font-extrabold text-gray-800 mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link href="/">
          <Button className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700">
            <Home className="w-5 h-5" />
            Go to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
} 