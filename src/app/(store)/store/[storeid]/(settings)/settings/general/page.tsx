'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';

export default function GeneralSettingsPage() {
  return (
    <div className="p-6 max-w-[800px]">
      {/* Store details */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Store details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Store name</Label>
              <Input defaultValue="My Store" />
            </div>
            <div>
              <Label>Legal business name</Label>
              <Input placeholder="Enter your legal business name" />
            </div>
            <div>
              <Label>Phone</Label>
              <Input type="tel" placeholder="Enter your phone number" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Store defaults */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Store defaults</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Currency display</Label>
              <div className="flex items-center gap-2">
                <Select defaultValue="ETB">
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ETB">Ethiopian Birr (ETB)</SelectItem>
                    <SelectItem value="USD">US Dollar (USD)</SelectItem>
                    <SelectItem value="EUR">Euro (EUR)</SelectItem>
                  </SelectContent>
                </Select>
                <Link href="/settings/markets" className="text-sm text-blue-600">
                  Manage markets
                </Link>
              </div>
            </div>
            <div>
              <Label>Unit system</Label>
              <Select defaultValue="metric">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metric">Metric system</SelectItem>
                  <SelectItem value="imperial">Imperial system</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Default weight unit</Label>
              <Select defaultValue="kg">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">Kilogram (kg)</SelectItem>
                  <SelectItem value="g">Gram (g)</SelectItem>
                  <SelectItem value="lb">Pound (lb)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Time zone</Label>
              <Select defaultValue="EAT">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EAT">(GMT+03:00) East Africa Time</SelectItem>
                  <SelectItem value="UTC">(GMT+00:00) UTC</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500 mt-1">
                Sets the time for when orders and analytics are recorded
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order ID */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Order ID</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Shown on the order page, customer pages, and customer order notifications to identify order
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Prefix</Label>
                <Input defaultValue="#" />
              </div>
              <div>
                <Label>Suffix</Label>
                <Input />
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Your order ID will appear as #1001, #1002, #1003 ...
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 