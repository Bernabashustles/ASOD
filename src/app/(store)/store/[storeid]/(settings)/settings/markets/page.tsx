'use client';

import { useState } from 'react';
import { Info, ChevronRight, RefreshCw } from 'lucide-react';
import { SettingsPage } from '../components/settings-page';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Market {
  id: string;
  name: string;
  flag: string;
  status: 'active' | 'inactive';
  isPrimary?: boolean;
  stats: {
    shareOfSales: number;
    sales: number;
    conversionRate: number;
  };
}

export default function MarketsPage() {
  const [markets] = useState<Market[]>([
    {
      id: '1',
      name: 'Ethiopia',
      flag: '🇪🇹',
      status: 'active',
      isPrimary: true,
      stats: {
        shareOfSales: 0,
        sales: 0,
        conversionRate: 0
      }
    },
    {
      id: '2',
      name: 'International',
      flag: 'IN',
      status: 'inactive',
      stats: {
        shareOfSales: 0,
        sales: 0,
        conversionRate: 0
      }
    }
  ]);

  const activeMarkets = markets.filter(m => m.status === 'active');

  return (
    <SettingsPage title="Markets">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold">Markets</h1>
          <Button variant="outline" size="sm">Preferences</Button>
          <Button size="sm">Add market</Button>
        </div>
      </div>

      {/* Overview */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base">Overview</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm text-gray-500">Last 30 days</div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="font-medium mb-2">Active ({activeMarkets.length} of 3)</div>
            {markets.filter(m => m.status === 'active').map((market) => (
              <div 
                key={market.id}
                className="flex items-center justify-between py-4 border-b hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{market.flag}</span>
                  <div>
                    <div className="font-medium">{market.name}</div>
                    {market.isPrimary && (
                      <div className="text-sm text-gray-500">Primary</div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-12">
                  <div className="w-32">
                    <div className="text-sm text-gray-500">Share of total sales</div>
                    <div>{market.stats.shareOfSales}% <span className="text-gray-400">↑ 0%</span></div>
                  </div>
                  <div className="w-32">
                    <div className="text-sm text-gray-500">Sales</div>
                    <div>ETB {market.stats.sales.toFixed(2)} <span className="text-gray-400">↑ 0%</span></div>
                  </div>
                  <div className="w-32">
                    <div className="text-sm text-gray-500">Conversion rate</div>
                    <div>{market.stats.conversionRate}% <span className="text-gray-400">↑ 0%</span></div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="font-medium mb-2">Inactive</div>
            {markets.filter(m => m.status === 'inactive').map((market) => (
              <div 
                key={market.id}
                className="flex items-center justify-between py-4 border-b hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center font-medium">
                    {market.flag}
                  </div>
                  <div className="font-medium">{market.name}</div>
                </div>
                <div className="flex items-center gap-12">
                  <div className="w-32">
                    <div className="text-sm text-gray-500">Share of total sales</div>
                    <div>{market.stats.shareOfSales}% <span className="text-gray-400">↑ 0%</span></div>
                  </div>
                  <div className="w-32">
                    <div className="text-sm text-gray-500">Sales</div>
                    <div>ETB {market.stats.sales.toFixed(2)} <span className="text-gray-400">↑ 0%</span></div>
                  </div>
                  <div className="w-32">
                    <div className="text-sm text-gray-500">Conversion rate</div>
                    <div>{market.stats.conversionRate}% <span className="text-gray-400">↑ 0%</span></div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-sm text-blue-600">
            208 countries/regions are not in any of your markets.
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recommendations</CardTitle>
          <CardDescription>Based on similar stores</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <div>
              <div className="font-medium">Start selling abroad by activating your International market</div>
              <div className="text-sm text-gray-500">22% of worldwide online sales are cross-border.</div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <div>
              <div className="font-medium">Start collecting taxes and duties</div>
              <div className="text-sm text-gray-500">Make sure you're accounting for taxes and duties in all the places you sell.</div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <div>
              <div className="font-medium">Add a cookie banner</div>
              <div className="text-sm text-gray-500">Local privacy laws may require a cookie banner.</div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </CardContent>
      </Card>
    </SettingsPage>
  );
} 