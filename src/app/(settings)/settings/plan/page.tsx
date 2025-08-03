'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PlanPage() {
  const router = useRouter();

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-[800px] mx-auto">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold">Plan</h1>
      </div>

      {/* Plan Details Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Plan details</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Plan Status */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border rounded-lg p-4">
            <div className="space-y-2 w-full sm:w-auto">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium">Trial</span>
                <Badge 
                  variant="secondary" 
                  className="bg-green-100 text-green-700 hover:bg-green-100"
                >
                  3 days remaining
                </Badge>
              </div>
              <p className="text-sm text-gray-500 sm:hidden">
                Choose a plan to continue using Axova after your trial ends
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button 
                variant="outline" 
                className="text-red-600 hover:text-red-700 w-full sm:w-auto"
              >
                Cancel trial
              </Button>
              <Button 
                onClick={() => router.push('/settings/plan/choose')}
                className="w-full sm:w-auto"
              >
                Choose plan
              </Button>
            </div>
          </div>

          {/* Trial Message - Desktop */}
          <p className="hidden sm:block text-sm text-gray-500 mt-4">
            Choose a plan to continue using Axova after your trial ends
          </p>

          {/* Links */}
          <div className="mt-4 text-sm text-gray-600 flex flex-wrap gap-2">
            <Button variant="link" className="h-auto p-0 text-blue-600">
              Terms of service
            </Button>
            <span className="text-gray-400">and</span>
            <Button variant="link" className="h-auto p-0 text-blue-600">
              Privacy policy
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Usage Stats */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Staff accounts</div>
            <div className="mt-1 text-lg font-medium">3 of 5 used</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Products</div>
            <div className="mt-1 text-lg font-medium">24 of 100</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">File storage</div>
            <div className="mt-1 text-lg font-medium">2.1 GB of 5 GB</div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Features */}
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Available features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'Basic reports',
                'Up to 1,000 inventory locations',
                'Manual order creation',
                'Discount codes',
                'Free SSL certificate',
                'Abandoned cart recovery',
                'Gift cards',
                'Professional reports'
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 text-sm"
                >
                  <svg
                    className="h-4 w-4 text-green-500 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compare Plans Button */}
      <div className="mt-6 text-center">
        <Button 
          variant="outline"
          onClick={() => router.push('/settings/plan/choose')}
          className="w-full sm:w-auto"
        >
          Compare all plans
        </Button>
      </div>
    </div>
  );
} 