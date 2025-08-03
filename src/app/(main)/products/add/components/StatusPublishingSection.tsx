'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Settings, Calendar as CalendarIcon, ChevronRight } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"; // Assuming you have this utility

// Define the expected shape for the specific fields this component handles
interface StatusPublishingData {
  status: 'active' | 'draft' | 'archived'; // Added archived
  salesChannels: string[]; // IDs or names of selected channels
  markets: string[]; // IDs or names of selected markets
  scheduledAt?: Date | null; // For scheduling availability
}

interface StatusPublishingSectionProps {
  formData: StatusPublishingData; // Use the specific shape
  onChange: (field: keyof StatusPublishingData, value: any) => void; // Use keyof specific shape
}

// Dummy data (replace with actual data/fetching logic)
const availableSalesChannels = [
  { id: 'online-store', name: 'Online Store' },
  { id: 'pos', name: 'Point of Sale' },
  { id: 'facebook', name: 'Facebook & Instagram' },
  { id: 'google', name: 'Google & YouTube' },
];

const availableMarkets = [
  { id: 'ethiopia', name: 'Ethiopia' },
  { id: 'international', name: 'International' },
];

const StatusPublishingSection: React.FC<StatusPublishingSectionProps> = ({ formData, onChange }) => {
  
  const [showScheduler, setShowScheduler] = useState(!!formData.scheduledAt);
  const selectedChannelsCount = formData.salesChannels?.length || 0;
  const selectedMarketsCount = formData.markets?.length || 0;

  const handleStatusChange = (value: string) => {
    onChange('status', value as StatusPublishingData['status']);
    if (value !== 'active') {
        // Reset schedule if status is not active
        onChange('scheduledAt', null);
        setShowScheduler(false);
    }
  };

  const handleDateSelect = (date?: Date) => {
     onChange('scheduledAt', date);
  };

  // Simulate opening modals for channel/market selection
  const openChannelSelector = () => { 
      console.log('Opening Sales Channel Selector (Simulated)');
      // In reality, this would open a Modal/Drawer/Sheet with Checkboxes
      // Example: onChange('salesChannels', ['online-store', 'pos']); 
  };
  const openMarketSelector = () => { 
      console.log('Opening Market Selector (Simulated)');
       // Example: onChange('markets', ['ethiopia']); 
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
         {/* Status Selector */}
         <Select 
            value={formData.status || 'draft'}
            onValueChange={handleStatusChange}
          >
           <SelectTrigger id="status" aria-label="Product status">
             <SelectValue placeholder="Select status" />
           </SelectTrigger>
           <SelectContent>
             <SelectItem value="active">Active</SelectItem>
             <SelectItem value="draft">Draft</SelectItem>
             <SelectItem value="archived">Archived</SelectItem> 
           </SelectContent>
         </Select>
         <p className="text-xs text-gray-500">
            {formData.status === 'active' && 'This product will be available on selected sales channels.'}
            {formData.status === 'draft' && 'This product is not available on any sales channels.'}
            {formData.status === 'archived' && 'This product is archived and no longer available.'}
         </p>

         {/* Publishing Section (conditional based on status) */}
         {formData.status === 'active' && (
             <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-3">
                    <Label className="font-medium">Publishing</Label>
                    {/* <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Settings className="h-4 w-4" />
                    </Button> */} 
                </div>
                
                {/* Sales Channels */}
                <div className="space-y-1 mb-3">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="sales-channels-btn" className="text-sm">Sales channels</Label>
                        <Button id="sales-channels-btn" variant="link" size="sm" className="h-auto p-0 text-blue-600 hover:text-blue-800" onClick={openChannelSelector}>
                            Manage
                        </Button>
                    </div>
                     <p className="text-xs text-gray-500">
                         {selectedChannelsCount > 0 ? `Available on ${selectedChannelsCount} ${selectedChannelsCount === 1 ? 'channel' : 'channels'}` : 'Not available on any channel'}
                     </p>
                     {/* TODO: Show list/badges of selected channels? */}
                </div>

                {/* Markets */}
                <div className="space-y-1 mb-3">
                   <div className="flex justify-between items-center">
                        <Label htmlFor="markets-btn" className="text-sm">Markets</Label>
                         <Button id="markets-btn" variant="link" size="sm" className="h-auto p-0 text-blue-600 hover:text-blue-800" onClick={openMarketSelector}>
                             Manage
                         </Button>
                    </div>
                     <p className="text-xs text-gray-500">
                         {selectedMarketsCount > 0 ? `Available in ${selectedMarketsCount} ${selectedMarketsCount === 1 ? 'market' : 'markets'}` : 'Not available in any market'}
                     </p>
                     {/* TODO: Show list/badges of selected markets? */}
                </div>
                
                {/* Scheduling */}
                <div className="space-y-1">
                    {!showScheduler ? (
                         <Button variant="link" size="sm" className="h-auto p-0 text-blue-600 hover:text-blue-800" onClick={() => setShowScheduler(true)}>
                            Schedule availability
                         </Button>
                    ) : (
                         <div>
                            <Label htmlFor="schedule-date" className="text-sm mb-1 block">Set availability date</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  id="schedule-date"
                                  variant={"outline"}
                                  className={cn(
                                    "w-full justify-start text-left font-normal h-9",
                                    !formData.scheduledAt && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {formData.scheduledAt ? format(formData.scheduledAt, "PPP") : <span>Pick a date</span>}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={formData.scheduledAt || undefined}
                                  onSelect={handleDateSelect}
                                  initialFocus
                                  // disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))} // Disable past dates
                                />
                                 {/* Add time selection if needed */}
                              </PopoverContent>
                            </Popover>
                            <Button variant="link" size="sm" className="h-auto p-0 text-xs text-gray-500 hover:text-red-600 mt-1" onClick={() => { setShowScheduler(false); onChange('scheduledAt', null); }}>
                                Clear schedule
                            </Button>
                         </div>
                    )}
                </div>
            </div>
         )}
      </CardContent>
    </Card>
  );
};

export default StatusPublishingSection;
