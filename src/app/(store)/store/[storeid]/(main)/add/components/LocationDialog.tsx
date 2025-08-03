import React, { useState } from 'react';
import { Search, X, Store, Package } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { QuantityInput } from "./QuantityInput";
import { Location } from "./InventorySection";

interface LocationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (locationId: string, quantity: number) => void;
  selectedLocations: { locationId: string; quantity: number; }[];
  availableLocations: Location[];
}

export const LocationDialog: React.FC<LocationDialogProps> = ({
  isOpen,
  onClose,
  onLocationSelect,
  selectedLocations,
  availableLocations
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'shops' | 'warehouses'>('all');

  const filteredLocations = availableLocations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && location.type === (activeTab === 'shops' ? 'shop' : 'warehouse');
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-xl">Add inventory at location</DialogTitle>
          <DialogDescription>
            Select locations and set inventory quantities
          </DialogDescription>
        </DialogHeader>
        
        <div className="px-6 py-4 border-b bg-gray-50">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex rounded-md border bg-white p-1">
              <button
                className={cn(
                  "px-3 py-1.5 text-sm rounded-md transition-colors",
                  activeTab === 'all' ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:text-gray-900"
                )}
                onClick={() => setActiveTab('all')}
              >
                All
              </button>
              <button
                className={cn(
                  "px-3 py-1.5 text-sm rounded-md transition-colors",
                  activeTab === 'shops' ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:text-gray-900"
                )}
                onClick={() => setActiveTab('shops')}
              >
                Shops
              </button>
              <button
                className={cn(
                  "px-3 py-1.5 text-sm rounded-md transition-colors",
                  activeTab === 'warehouses' ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:text-gray-900"
                )}
                onClick={() => setActiveTab('warehouses')}
              >
                Warehouses
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6 max-h-[400px] overflow-y-auto">
          <div className="grid gap-4">
            {filteredLocations.map((location) => {
              const selectedLocation = selectedLocations.find(l => l.locationId === location.id);
              const isSelected = !!selectedLocation;
              
              return (
                <div 
                  key={location.id} 
                  className={cn(
                    "p-4 rounded-lg border transition-colors",
                    isSelected ? "bg-gray-50 border-gray-300" : "bg-white hover:bg-gray-50"
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "p-2 rounded-lg",
                        location.type === 'shop' ? "bg-blue-50" : "bg-purple-50"
                      )}>
                        {location.type === 'shop' ? (
                          <Store className={cn(
                            "h-4 w-4",
                            isSelected ? "text-blue-600" : "text-blue-500"
                          )} />
                        ) : (
                          <Package className={cn(
                            "h-4 w-4",
                            isSelected ? "text-purple-600" : "text-purple-500"
                          )} />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{location.name}</h4>
                        <p className="text-sm text-gray-500">
                          {location.type === 'shop' ? 'Retail Store' : 'Warehouse Location'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <QuantityInput
                        value={selectedLocation?.quantity || 0}
                        onChange={(value) => onLocationSelect(location.id, value)}
                      />
                      {isSelected && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-gray-900"
                          onClick={() => onLocationSelect(location.id, 0)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {filteredLocations.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-gray-900 font-medium mb-1">No locations found</h3>
                <p className="text-gray-500 text-sm">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {selectedLocations.length} location{selectedLocations.length !== 1 ? 's' : ''} selected
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={onClose}>Done</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 