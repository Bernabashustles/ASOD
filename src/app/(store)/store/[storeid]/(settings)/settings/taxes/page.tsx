'use client';

import { useState } from 'react';
import { Info, Search, Check, ChevronRight } from 'lucide-react';
import { SettingsPage } from '../components/settings-page';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Region {
  id: string;
  name: string;
  flag: string;
  collectingTax: boolean;
  collectingDuties: boolean;
}

export default function TaxesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const regions: Region[] = [
    { id: 'au', name: 'Australia', flag: '🇦🇺', collectingTax: false, collectingDuties: false },
    { id: 'ca', name: 'Canada', flag: '🇨🇦', collectingTax: false, collectingDuties: false },
    { id: 'et', name: 'Ethiopia', flag: '🇪🇹', collectingTax: true, collectingDuties: false },
    { id: 'eu', name: 'European Union', flag: '🇪🇺', collectingTax: false, collectingDuties: false },
    { id: 'hk', name: 'Hong Kong SAR', flag: '🇭🇰', collectingTax: false, collectingDuties: false },
    { id: 'il', name: 'Israel', flag: '🇮🇱', collectingTax: false, collectingDuties: false },
    { id: 'jp', name: 'Japan', flag: '🇯🇵', collectingTax: false, collectingDuties: false },
    { id: 'my', name: 'Malaysia', flag: '🇲🇾', collectingTax: false, collectingDuties: false },
    { id: 'nz', name: 'New Zealand', flag: '🇳🇿', collectingTax: false, collectingDuties: false },
    { id: 'no', name: 'Norway', flag: '🇳🇴', collectingTax: false, collectingDuties: false },
  ];

  const filteredRegions = regions.filter(region => 
    region.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [collectDuties, setCollectDuties] = useState(false);
  const [globalSettings, setGlobalSettings] = useState({
    includeSalesTax: false,
    excludeTaxByCountry: false,
    chargeTaxOnShipping: false,
    chargeVATOnDigital: false
  });

  return (
    <SettingsPage title="Taxes and duties">
      {/* Regional Settings */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-base">Regional settings</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Manage tax collection settings by region</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <CardDescription>
            Create a{' '}
            <Button variant="link" className="h-auto p-0 text-blue-600">
              shipping zone
            </Button>
            {' '}in the region(s) you want to collect tax in. Then, find the region in this list and select it to manage its tax settings. If you're unsure about where you're liable, check with a tax professional.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
            </div>

            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Region</TableHead>
                    <TableHead>Collecting tax</TableHead>
                    <TableHead>Collecting duties</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRegions.map((region) => (
                    <TableRow 
                      key={region.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => {/* Handle region selection */}}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{region.flag}</span>
                          {region.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        {region.collectingTax ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <span>—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {region.collectingDuties ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <span>—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Collected Tax Report */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base">Collected tax report</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full">
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View and download tax collection reports</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Button variant="ghost" size="sm">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Apps Section with Tax Compliance Services */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Apps</CardTitle>
          <CardDescription>
            Connect your preferred sales tax service to Axova. More partners coming soon.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Avalara Tax Compliance */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#ff6b6c] rounded-lg flex items-center justify-center text-white">
                  A
                </div>
                <div>
                  <h3 className="font-medium">Avalara Tax Compliance</h3>
                  <p className="text-sm text-gray-500">Tax compliance done right</p>
                </div>
              </div>
              <Button variant="outline">Install</Button>
            </div>

            {/* Vertex Tax & Compliance */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#2d87f3] rounded-lg flex items-center justify-center text-white">
                  V
                </div>
                <div>
                  <h3 className="font-medium">Vertex Tax & Compliance</h3>
                  <p className="text-sm text-gray-500">Transact, Comply, and Grow with Confidence</p>
                </div>
              </div>
              <Button variant="outline">Install</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Duties and Import Taxes */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-base">Duties and import taxes</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Manage duties and import taxes for international orders</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <CardDescription>
            Help international customers avoid unexpected fees by collecting duties and import taxes at checkout.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="font-medium">Collect duties and import taxes</div>
            <Button variant="outline">Turn on</Button>
          </div>
          
          <div className="text-sm text-gray-600">
            You can't use Axova Shipping to buy{' '}
            <Button variant="link" className="h-auto p-0 text-blue-600">
              delivered duty paid labels
            </Button>.
          </div>

          <div className="text-sm text-gray-600">
            The duty calculation fee is 0.5%.
          </div>
        </CardContent>
      </Card>

      {/* Global Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Global settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Include Sales Tax Option */}
          <div className="flex items-start gap-3">
            <Checkbox
              id="includeSalesTax"
              checked={globalSettings.includeSalesTax}
              onCheckedChange={(checked) => 
                setGlobalSettings(prev => ({ ...prev, includeSalesTax: checked as boolean }))
              }
            />
            <div>
              <Label htmlFor="includeSalesTax" className="font-medium">
                Include sales tax in product price and shipping rate
              </Label>
              <Button variant="link" className="h-auto p-0 text-blue-600 block">
                Learn more
              </Button>
              <p className="text-sm text-gray-500">about when to use this setting</p>
            </div>
          </div>

          {/* Tax by Country Option */}
          <div className="flex items-start gap-3">
            <Checkbox
              id="excludeTaxByCountry"
              checked={globalSettings.excludeTaxByCountry}
              onCheckedChange={(checked) => 
                setGlobalSettings(prev => ({ ...prev, excludeTaxByCountry: checked as boolean }))
              }
            />
            <div>
              <Label htmlFor="excludeTaxByCountry" className="font-medium">
                Include or exclude tax based on your customer's country
              </Label>
              <Button variant="link" className="h-auto p-0 text-blue-600 block">
                Go to Markets preferences
              </Button>
              <p className="text-sm text-gray-500">to turn this setting on</p>
            </div>
          </div>

          {/* Tax on Shipping Option */}
          <div className="flex items-start gap-3">
            <Checkbox
              id="chargeTaxOnShipping"
              checked={globalSettings.chargeTaxOnShipping}
              onCheckedChange={(checked) => 
                setGlobalSettings(prev => ({ ...prev, chargeTaxOnShipping: checked as boolean }))
              }
            />
            <div>
              <Label htmlFor="chargeTaxOnShipping" className="font-medium">
                Charge sales tax on shipping
              </Label>
              <p className="text-sm text-gray-500">
                Automatically calculated for Canada, European Union, and United States
              </p>
            </div>
          </div>

          {/* VAT on Digital Goods Option */}
          <div className="flex items-start gap-3">
            <Checkbox
              id="chargeVATOnDigital"
              checked={globalSettings.chargeVATOnDigital}
              onCheckedChange={(checked) => 
                setGlobalSettings(prev => ({ ...prev, chargeVATOnDigital: checked as boolean }))
              }
            />
            <div>
              <Label htmlFor="chargeVATOnDigital" className="font-medium">
                Charge VAT on digital goods
              </Label>
              <p className="text-sm text-gray-500">
                Creates a collection of digital goods that will be{' '}
                <Button variant="link" className="h-auto p-0 text-blue-600 inline">
                  charged VAT
                </Button>
                {' '}at checkout (for European customers)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 text-center">
        <Button variant="link" className="text-blue-600">
          Learn more about sales tax
        </Button>
      </div>
    </SettingsPage>
  );
} 