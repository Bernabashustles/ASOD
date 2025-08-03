import React from 'react';
import { Plus, Trash2, Store, Package } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { QuantityInput } from "./QuantityInput";

export interface Location {
  id: string;
  name: string;
  type: 'shop' | 'warehouse';
  inventory: number;
}

interface InventorySectionProps {
  trackQuantity: boolean;
  continueSellingWhenOutOfStock: boolean;
  locations: { locationId: string; quantity: number; }[];
  availableLocations: Location[];
  onTrackQuantityChange: (value: boolean) => void;
  onContinueSellingChange: (value: boolean) => void;
  onLocationSelect: (locationId: string, quantity: number) => void;
  onRemoveLocation: (locationId: string) => void;
  onOpenLocationDialog: () => void;
}

export const InventorySection: React.FC<InventorySectionProps> = ({
  trackQuantity,
  continueSellingWhenOutOfStock,
  locations,
  availableLocations,
  onTrackQuantityChange,
  onContinueSellingChange,
  onLocationSelect,
  onRemoveLocation,
  onOpenLocationDialog
}) => {
  
  const getTotalQuantity = () => {
    return locations.reduce((total, location) => total + location.quantity, 0);
  };

  return (
    <Card className="sm:rounded-lg rounded-none mx-[-1rem] sm:mx-0">
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-base">Inventory</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch 
              id="track-quantity" 
              checked={trackQuantity}
              onCheckedChange={onTrackQuantityChange}
            />
            <Label htmlFor="track-quantity">Track quantity</Label>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs"
            onClick={onOpenLocationDialog}
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            Add location
          </Button>
        </div>
        
        {trackQuantity && (
          <div className="space-y-4">
            {locations.map((location) => {
              const locationData = availableLocations.find(l => l.id === location.locationId);
              if (!locationData) return null;
              
              return (
                <div 
                  key={location.locationId} 
                  className="p-3 rounded-lg border bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={cn(
                        "p-2 rounded-lg",
                        locationData.type === 'shop' ? "bg-blue-50" : "bg-purple-50"
                      )}>
                        {locationData.type === 'shop' ? (
                          <Store className="h-4 w-4 text-blue-600" />
                        ) : (
                          <Package className="h-4 w-4 text-purple-600" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">{locationData.name}</h4>
                        <p className="text-sm text-gray-500">
                          {location.quantity} units in stock
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <QuantityInput
                        value={location.quantity}
                        onChange={(value) => onLocationSelect(location.locationId, value)}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:text-red-600"
                        onClick={() => onRemoveLocation(location.locationId)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {locations.length === 0 && (
              <div className="text-center p-6 border-2 border-dashed rounded-lg">
                <Store className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">No locations added</p>
                <Button
                  variant="link"
                  className="text-xs mt-1"
                  onClick={onOpenLocationDialog}
                >
                  Add a location
                </Button>
              </div>
            )}
            
            {locations.length > 0 && (
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg font-medium">
                <span>Total inventory</span>
                <span>{getTotalQuantity()} available</span>
              </div>
            )}
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="continue-selling" 
            checked={continueSellingWhenOutOfStock}
            onCheckedChange={onContinueSellingChange}
          />
          <Label htmlFor="continue-selling">
            Continue selling when out of stock
          </Label>
        </div>
      </CardContent>
    </Card>
  );
}; 