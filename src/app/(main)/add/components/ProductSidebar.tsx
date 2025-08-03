import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, Store } from 'lucide-react';
import { SidebarCard } from './SidebarCard';

interface ProductSidebarProps {
  statusValue: string;
  onStatusChange: (value: string) => void;
  
  salesChannels: {
    online: boolean;
    pos: boolean;
  };
  onSalesChannelsChange: (channels: { online: boolean; pos: boolean; }) => void;
  
  giftCard: boolean;
  onGiftCardChange: (value: boolean) => void;
  
  templateSuffix: string;
  onTemplateSuffixChange: (value: string) => void;
  
  publishDate: string;
  onPublishDateChange: (value: string) => void;
  
  publishTime: string;
  onPublishTimeChange: (value: string) => void;
  
  // For mobile UI
  isStatusExpanded: boolean;
  onStatusExpandToggle: () => void;
  
  isSalesChannelsExpanded: boolean;
  onSalesChannelsExpandToggle: () => void;
  
  isOrganizationExpanded: boolean;
  onOrganizationExpandToggle: () => void;
}

export const ProductSidebar: React.FC<ProductSidebarProps> = ({
  statusValue,
  onStatusChange,
  salesChannels,
  onSalesChannelsChange,
  giftCard,
  onGiftCardChange,
  templateSuffix,
  onTemplateSuffixChange,
  publishDate,
  onPublishDateChange,
  publishTime,
  onPublishTimeChange,
  isStatusExpanded,
  onStatusExpandToggle,
  isSalesChannelsExpanded,
  onSalesChannelsExpandToggle,
  isOrganizationExpanded,
  onOrganizationExpandToggle
}) => {
  return (
    <div className="w-full lg:w-[280px] lg:space-y-5 lg:sticky lg:top-[8.5rem] lg:self-start">
      {/* Status */}
      <SidebarCard 
        title="Status" 
        isExpanded={isStatusExpanded}
        onToggleExpand={onStatusExpandToggle}
      >
        <Select 
          value={statusValue} 
          onValueChange={onStatusChange}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                  Draft
                </span>
              </div>
            </SelectItem>
            <SelectItem value="active">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                  Active
                </span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </SidebarCard>

      {/* Sales channels */}
      <SidebarCard 
        title="Sales channels" 
        isExpanded={isSalesChannelsExpanded}
        onToggleExpand={onSalesChannelsExpandToggle}
        action={
          <Button variant="ghost" size="sm" className="text-xs">
            Manage
          </Button>
        }
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-gray-500" />
              <span className="text-sm">Online Store</span>
            </div>
            <Switch 
              checked={salesChannels.online}
              onCheckedChange={(checked) => 
                onSalesChannelsChange({ ...salesChannels, online: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-gray-500" />
              <span className="text-sm">Point of Sale</span>
            </div>
            <Switch 
              checked={salesChannels.pos}
              onCheckedChange={(checked) => 
                onSalesChannelsChange({ ...salesChannels, pos: checked })
              }
            />
          </div>
        </div>
      </SidebarCard>

      {/* Organization */}
      <SidebarCard 
        title="Organization" 
        isExpanded={isOrganizationExpanded}
        onToggleExpand={onOrganizationExpandToggle}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Product category</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
                <SelectItem value="footwear">Footwear</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Product type</Label>
            <Input placeholder="e.g., T-Shirt" />
          </div>
          <div className="space-y-2">
            <Label>Vendor</Label>
            <Input placeholder="e.g., Nike" />
          </div>
          <div className="space-y-2">
            <Label>Collections</Label>
            <Input placeholder="Search for collections" />
          </div>
          <div className="space-y-2">
            <Label>Tags</Label>
            <Input placeholder="Vintage, cotton, summer" />
          </div>
        </div>
      </SidebarCard>

      {/* Gift card */}
      <SidebarCard title="Gift card">
        <div className="flex items-center space-x-2">
          <Switch 
            id="gift-card"
            checked={giftCard}
            onCheckedChange={onGiftCardChange}
          />
          <Label htmlFor="gift-card">This is a gift card product</Label>
        </div>
      </SidebarCard>

      {/* Template */}
      <SidebarCard title="Template">
        <Select
          value={templateSuffix}
          onValueChange={onTemplateSuffixChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Default product template" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default product template</SelectItem>
            <SelectItem value="special">Special template</SelectItem>
            <SelectItem value="featured">Featured template</SelectItem>
          </SelectContent>
        </Select>
      </SidebarCard>

      {/* Publishing */}
      <SidebarCard title="Publishing">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Publish date</Label>
            <Input 
              type="date"
              value={publishDate}
              onChange={(e) => onPublishDateChange(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Publish time</Label>
            <Input 
              type="time"
              value={publishTime}
              onChange={(e) => onPublishTimeChange(e.target.value)}
            />
          </div>
        </div>
      </SidebarCard>
    </div>
  );
}; 