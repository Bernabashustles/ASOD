'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { 
  ExternalLink, 
  Info, 
  Plus, 
  X, 
  AlertTriangle, 
  Clock, 
  BarChart3, 
  Package, 
  Truck,
  Search,
  Check,
  ArrowUpDown,
  ChevronDown,
  PlusSquare,
  Store,
  Minus,
  CubeIcon
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LocationQuantity {
  locationId: string;
  locationName: string;
  available: number;
  reserved?: number;
  incoming?: number;
  threshold?: number;
  stockStatus?: 'in_stock' | 'low_stock' | 'out_of_stock';
}

// Define the expected shape for the specific fields this component handles
interface InventoryData {
    trackQuantity?: boolean;
    sku?: string;
    barcode?: string;
    hasSkuOrBarcode?: boolean;
    continueSellingWhenOutOfStock?: boolean;
    locations?: LocationQuantity[];
    lowStockThreshold?: number;
}

interface InventorySectionProps {
  formData: InventoryData; // Use the specific shape
  onChange: (field: keyof InventoryData, value: any) => void; // Use keyof specific shape
}

// --- Advanced: Location Data Fetching (Simulation) ---
interface Location {
    id: string;
    name: string;
    type?: 'warehouse' | 'store' | 'popup';
    address?: string;
    isActive?: boolean;
}

const fetchLocations = async (): Promise<Location[]> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 50)); 
    return [
        { id: 'loc_1', name: 'Main Store', type: 'store', address: '123 Main St, Memphis, TN', isActive: true },
        { id: 'loc_2', name: 'Downtown Shop', type: 'store', address: '456 Main St, Memphis, TN', isActive: true },
        { id: 'loc_3', name: 'Central Warehouse', type: 'warehouse', address: 'Riverfront Market, Memphis, TN', isActive: true },
        { id: 'loc_4', name: 'East Side Store', type: 'store', address: '789 Industrial Blvd, Memphis, TN', isActive: true },
    ];
};
// --- End Location Fetching ---

const InventorySection: React.FC<InventorySectionProps> = ({ formData, onChange }) => {
  const trackQuantity = formData.trackQuantity ?? true;
  const hasSkuOrBarcode = formData.hasSkuOrBarcode ?? false;
  const [storeLocations, setStoreLocations] = useState<Location[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [loadingLocations, setLoadingLocations] = useState(true);
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [locationQuantities, setLocationQuantities] = useState<Record<string, number>>({});
  const [totalInventory, setTotalInventory] = useState(0);
  const [showInactive, setShowInactive] = useState(false);

  // Fetch locations on mount
  useEffect(() => {
      fetchLocations().then(fetchedLocations => {
          setStoreLocations(fetchedLocations);
          setFilteredLocations(fetchedLocations.filter(loc => loc.isActive));
          setLoadingLocations(false);
          
          // Don't auto-populate locations on initial load
          // This ensures we start with empty state
      });
  }, []);

  // Calculate total inventory whenever the location quantities change
  useEffect(() => {
    if (formData.locations) {
      const total = formData.locations.reduce((sum, location) => sum + location.available, 0);
      setTotalInventory(total);
    }
  }, [formData.locations]);

  useEffect(() => {
    // Filter locations based on search query and active/inactive filter
    const filtered = storeLocations.filter(location => {
      const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesActiveFilter = showInactive || location.isActive;
      return matchesSearch && matchesActiveFilter;
    });
    setFilteredLocations(filtered);
  }, [searchQuery, showInactive, storeLocations]);

  const handleQuantityChange = (locationId: string, field: 'available' | 'reserved' | 'incoming' | 'threshold', value: string) => {
    const numValue = value === '' ? 0 : parseInt(value, 10);
    if (value === '' || (!isNaN(numValue) && numValue >= 0)) {
      const updatedLocations = (formData.locations || []).map(loc => {
        if (loc.locationId === locationId) {
          const updated = { ...loc, [field]: numValue };
          
          // Update stock status based on available quantity and threshold
          if (field === 'available' || field === 'threshold') {
            const threshold = field === 'threshold' ? numValue : (loc.threshold || 5);
            const available = field === 'available' ? numValue : loc.available;
            
            if (available <= 0) {
              updated.stockStatus = 'out_of_stock';
            } else if (available <= threshold) {
              updated.stockStatus = 'low_stock';
            } else {
              updated.stockStatus = 'in_stock';
            }
          }
          
          return updated;
        }
        return loc;
      });
      
      onChange('locations', updatedLocations);
    }
  };

  const handleLowStockThresholdChange = (value: string) => {
    const threshold = value === '' ? undefined : parseInt(value, 10);
    if (value === '' || (!isNaN(threshold) && threshold >= 0)) {
      onChange('lowStockThreshold', threshold);
      
      // Update all location thresholds
      if (formData.locations && threshold !== undefined) {
        const updatedLocations = formData.locations.map(loc => ({
          ...loc,
          threshold,
          // Update stock status based on new threshold
          stockStatus: 
            loc.available <= 0 ? 'out_of_stock' :
            loc.available <= threshold ? 'low_stock' : 'in_stock'
        }));
        onChange('locations', updatedLocations);
      }
    }
  };
  
  const addSelectedLocations = () => {
    // Get all locations with quantities > 0
    const locationsToAdd = Object.entries(locationQuantities)
      .filter(([_, quantity]) => quantity > 0)
      .map(([locId, quantity]) => {
        const locationInfo = storeLocations.find(l => l.id === locId);
        return {
          locationId: locId,
          locationName: locationInfo?.name || "Unknown Location",
          available: quantity,
          reserved: 0,
          incoming: 0,
          threshold: formData.lowStockThreshold || 5,
          stockStatus: 
            quantity <= 0 ? 'out_of_stock' :
            quantity <= (formData.lowStockThreshold || 5) ? 'low_stock' : 'in_stock'
        };
      });
    
    if (locationsToAdd.length > 0) {
      // Filter out any locations that already exist in formData.locations
      const existingLocationIds = (formData.locations || []).map(loc => loc.locationId);
      const newLocations = locationsToAdd.filter(loc => !existingLocationIds.includes(loc.locationId));
      
      // Update locations for existing entries
      const updatedExistingLocations = (formData.locations || []).map(loc => {
        const updatedLocation = locationsToAdd.find(newLoc => newLoc.locationId === loc.locationId);
        if (updatedLocation) {
          return {
            ...loc,
            available: updatedLocation.available,
            stockStatus: updatedLocation.stockStatus
          };
        }
        return loc;
      });
      
      // Combine new and updated existing locations
      const combinedLocations = [
        ...updatedExistingLocations,
        ...newLocations
      ];
      
      onChange('locations', combinedLocations);
      
      // Close the dialog after adding locations
      setLocationDialogOpen(false);
      setLocationQuantities({});
      setSearchQuery('');
    } else {
      // Don't close the dialog if no locations were selected
      // Alert the user they need to set quantities
    }
  };
  
  const removeLocation = (locationId: string) => {
    const updatedLocations = (formData.locations || []).filter(loc => loc.locationId !== locationId);
    onChange('locations', updatedLocations);
  };
  
  const bulkUpdateQuantity = (value: number) => {
    if (formData.locations) {
      const updatedLocations = formData.locations.map(loc => ({
        ...loc,
        available: value,
        stockStatus: 
          value <= 0 ? 'out_of_stock' :
          value <= (loc.threshold || 5) ? 'low_stock' : 'in_stock'
      }));
      onChange('locations', updatedLocations);
    }
  };

  // Helper to get stock status color
  const getStockStatusColor = (status?: string) => {
    switch(status) {
      case 'out_of_stock': return 'text-red-600 bg-red-50 border-red-200';
      case 'low_stock': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'in_stock': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  // Add quantity change handler for the popup
  const handlePopupQuantityChange = (locationId: string, value: number) => {
    setLocationQuantities(prev => ({
      ...prev,
      [locationId]: value
    }));
    
    // If value > 0, add to selectedLocations, otherwise remove
    if (value > 0) {
      if (!selectedLocations.includes(locationId)) {
        setSelectedLocations([...selectedLocations, locationId]);
      }
    } else {
      setSelectedLocations(selectedLocations.filter(id => id !== locationId));
    }
  };

  // Initialize locationQuantities when opening dialog
  useEffect(() => {
    if (locationDialogOpen) {
      // Initialize with existing quantities if they exist
      const initialQuantities: Record<string, number> = {};
      storeLocations.forEach(loc => {
        const existingLocation = formData.locations?.find(l => l.locationId === loc.id);
        initialQuantities[loc.id] = existingLocation?.available || 0;
      });
      setLocationQuantities(initialQuantities);
      
      // Set selectedLocations based on locations with quantity > 0
      const selected = Object.entries(initialQuantities)
        .filter(([_, qty]) => qty > 0)
        .map(([id, _]) => id);
      
      setSelectedLocations(selected);
    }
  }, [locationDialogOpen, storeLocations, formData.locations]);

  return (
    <Card className="border-gray-200 shadow-sm hover:shadow transition-shadow duration-200">
      <CardHeader className="pb-3 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-lg font-medium">Inventory Management</CardTitle>
            <CardDescription className="text-sm text-gray-500 mt-1">
              Track stock levels across your locations
            </CardDescription>
          </div>
          {trackQuantity && (
            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 font-normal flex items-center gap-1.5 self-start sm:self-auto">
              <Package className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              Total: {totalInventory} units
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-4 sm:pt-6 space-y-4 sm:space-y-6">
        <div className="flex items-center justify-between bg-gray-50 p-2 sm:p-3 rounded-md border">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="track-quantity"
              checked={trackQuantity}
              onCheckedChange={(checked) => onChange('trackQuantity', !!checked)}
              aria-labelledby="track-quantity-label"
            />
            <Label htmlFor="track-quantity" id="track-quantity-label" className="text-xs sm:text-sm font-medium">
              Track inventory for this product
            </Label>
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="top" align="center" className="max-w-[300px] p-3">
                <p className="text-xs">Turn on inventory tracking to manage stock levels across your locations. Your inventory will update automatically when orders are placed or fulfilled.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Quantity Management (conditionally rendered) */}
        {trackQuantity && (
          <div className="space-y-3 sm:space-y-4">
            {/* Header with actions */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
              <div className="flex items-center gap-2 sm:gap-3">
                <h3 className="text-xs sm:text-sm font-medium">Inventory Locations</h3>
                <Badge variant="outline" className="text-[10px] sm:text-xs bg-blue-50 text-blue-700 border-blue-200">
                  {formData.locations?.length || 0} Locations
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <Dialog open={locationDialogOpen} onOpenChange={setLocationDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1 text-[10px] sm:text-xs h-7 sm:h-8">
                      <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      <span className="hidden xs:inline">Add</span> Inventory Location
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[calc(100%-2rem)] sm:max-w-[500px] max-h-[90vh] overflow-auto">
                    <DialogHeader>
                      <DialogTitle className="text-base sm:text-lg">Add inventory at location</DialogTitle>
                      <DialogDescription className="text-xs sm:text-sm">
                        Select locations and set inventory quantities
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="mt-3 sm:mt-4 space-y-3 sm:space-y-4">
                      <div className="flex flex-col xs:flex-row gap-2">
                        <div className="relative flex-1">
                          <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500" />
                          <Input
                            placeholder="Search locations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-7 sm:pl-8 text-xs sm:text-sm h-8 sm:h-9"
                          />
                        </div>
                        
                        <div className="flex gap-1 sm:gap-2">
                          <Button 
                            variant={!showInactive ? "default" : "outline"}
                            size="sm"
                            onClick={() => setShowInactive(false)}
                            className="text-[10px] sm:text-xs px-1.5 sm:px-2 h-8 sm:h-9"
                          >
                            All
                          </Button>
                          <Button 
                            variant={showInactive ? "default" : "outline"}
                            size="sm"
                            onClick={() => setShowInactive(true)}
                            className="text-[10px] sm:text-xs px-1.5 sm:px-2 h-8 sm:h-9"
                          >
                            Shops
                          </Button>
                          <Button 
                            variant="outline"
                            size="sm"
                            className="text-[10px] sm:text-xs px-1.5 sm:px-2 h-8 sm:h-9"
                          >
                            Warehouses
                          </Button>
                        </div>
                      </div>
                      
                      <div className="max-h-[350px] sm:max-h-[400px] overflow-y-auto space-y-2 sm:space-y-3 py-1 sm:py-2">
                        {filteredLocations.length > 0 ? (
                          filteredLocations.map((location) => {
                            const quantity = locationQuantities[location.id] || 0;
                            return (
                              <div 
                                key={location.id} 
                                className={`border rounded-md p-3 sm:p-4 flex items-center justify-between ${quantity > 0 ? 'bg-blue-50 border-blue-200' : ''}`}
                              >
                                <div className="flex items-center gap-2 sm:gap-3">
                                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-blue-100 flex items-center justify-center text-blue-600">
                                    {location.type === 'warehouse' ? (
                                      <Package className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                    ) : (
                                      <Store className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                    )}
                                  </div>
                                  <div>
                                    <p className="text-xs sm:text-sm font-medium">{location.name}</p>
                                    <p className="text-[10px] sm:text-xs text-gray-500">
                                      {location.type === 'warehouse' ? 'Warehouse Location' : 'Retail Store'}
                                    </p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center h-8 sm:h-9">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 sm:h-9 sm:w-9 rounded-r-none border-r-0"
                                    onClick={() => {
                                      const currentValue = locationQuantities[location.id] || 0;
                                      if (currentValue > 0) {
                                        handlePopupQuantityChange(location.id, currentValue - 1);
                                      }
                                    }}
                                  >
                                    <Minus className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                  </Button>
                                  <Input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => {
                                      const val = e.target.value === '' ? 0 : parseInt(e.target.value);
                                      if (!isNaN(val) && val >= 0) {
                                        handlePopupQuantityChange(location.id, val);
                                      }
                                    }}
                                    className="h-8 sm:h-9 w-10 sm:w-12 rounded-none text-center border-x-0 text-xs sm:text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    min="0"
                                  />
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 sm:h-9 sm:w-9 rounded-l-none border-l-0"
                                    onClick={() => {
                                      const currentValue = locationQuantities[location.id] || 0;
                                      handlePopupQuantityChange(location.id, currentValue + 1);
                                    }}
                                  >
                                    <Plus className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                  </Button>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="text-center text-xs sm:text-sm text-gray-500 py-4">
                            No locations found matching your search
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <DialogFooter className="mt-3 sm:mt-4 flex flex-col xs:flex-row xs:items-center justify-between gap-2 xs:gap-0">
                      <div className="text-xs sm:text-sm text-gray-500 order-2 xs:order-1 text-center xs:text-left">
                        {Object.values(locationQuantities).filter(qty => qty > 0).length} locations selected
                      </div>
                      <div className="flex gap-2 order-1 xs:order-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs h-8 sm:h-9"
                          onClick={() => {
                            setLocationDialogOpen(false);
                            setLocationQuantities({});
                            setSelectedLocations([]);
                            setSearchQuery('');
                          }}
                        >
                          Cancel
                        </Button>
                        <Button 
                          size="sm"
                          className="text-xs h-8 sm:h-9"
                          onClick={addSelectedLocations}
                          disabled={Object.values(locationQuantities).every(qty => qty === 0)}
                        >
                          Done
                        </Button>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="text-[10px] sm:text-xs h-7 sm:h-8">
                      <span>Actions</span>
                      <ChevronDown className="ml-1 sm:ml-1.5 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-[160px]">
                    <DropdownMenuLabel className="text-xs">Bulk Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => bulkUpdateQuantity(0)} className="text-xs">
                      Set all to zero
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => bulkUpdateQuantity(10)} className="text-xs">
                      Set all to 10 units
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => bulkUpdateQuantity(100)} className="text-xs">
                      Set all to 100 units
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            {/* Global low stock threshold setting */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-md border border-gray-200">
              <Label htmlFor="low-stock-threshold" className="text-xs sm:text-sm whitespace-nowrap">
                Low stock threshold:
              </Label>
              <Input
                id="low-stock-threshold"
                type="number"
                min="0"
                value={formData.lowStockThreshold === undefined ? '' : formData.lowStockThreshold}
                onChange={(e) => handleLowStockThresholdChange(e.target.value)}
                className="w-16 sm:w-20 h-7 sm:h-8 text-xs sm:text-sm"
              />
              <p className="text-[10px] sm:text-xs text-gray-500 w-full sm:w-auto">
                Products with quantities at or below this number will be marked as low stock.
              </p>
            </div>
            
            {/* Inventory Table */}
            {loadingLocations ? (
              <div className="text-center py-6 sm:py-8">
                <div className="animate-spin h-5 w-5 sm:h-6 sm:w-6 border-2 border-gray-300 border-t-black rounded-full mx-auto mb-2"></div>
                <p className="text-xs sm:text-sm text-gray-500">Loading inventory locations...</p>
              </div>
            ) : (formData.locations && formData.locations.length > 0) ? (
              <div className="border rounded-md overflow-hidden">
                <Tabs defaultValue="all">
                  <div className="flex flex-col xs:flex-row xs:items-center justify-between p-2 sm:px-4 sm:py-2 border-b bg-gray-50 gap-2 xs:gap-0">
                    <TabsList className="bg-gray-100 h-7 sm:h-8 min-w-0 w-full xs:w-auto">
                      <TabsTrigger value="all" className="text-[10px] sm:text-xs px-2 sm:px-3 h-6 sm:h-7">All Locations</TabsTrigger>
                      <TabsTrigger value="low" className="text-[10px] sm:text-xs px-2 sm:px-3 h-6 sm:h-7">Low Stock</TabsTrigger>
                      <TabsTrigger value="out" className="text-[10px] sm:text-xs px-2 sm:px-3 h-6 sm:h-7">Out of Stock</TabsTrigger>
                    </TabsList>
                    
                    <div className="text-[10px] sm:text-xs text-gray-500 text-center xs:text-left">
                      Total Units: <span className="font-medium">{totalInventory}</span>
                    </div>
                  </div>
                
                  <TabsContent value="all" className="m-0 overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-[10px] sm:text-xs py-2 sm:py-3 whitespace-nowrap">Location</TableHead>
                          <TableHead className="text-center text-[10px] sm:text-xs py-2 sm:py-3 whitespace-nowrap">Status</TableHead>
                          <TableHead className="text-right text-[10px] sm:text-xs py-2 sm:py-3 whitespace-nowrap">Available</TableHead>
                          <TableHead className="text-right text-[10px] sm:text-xs py-2 sm:py-3 whitespace-nowrap">Reserved</TableHead>
                          <TableHead className="text-right text-[10px] sm:text-xs py-2 sm:py-3 whitespace-nowrap">Incoming</TableHead>
                          <TableHead className="text-right w-12 sm:w-24 text-[10px] sm:text-xs py-2 sm:py-3 whitespace-nowrap">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {formData.locations.map(loc => (
                          <TableRow key={loc.locationId}>
                            <TableCell className="text-xs sm:text-sm py-1.5 sm:py-2 font-medium whitespace-nowrap">{loc.locationName}</TableCell>
                            <TableCell className="text-center whitespace-nowrap">
                              <Badge variant="outline" className={`text-[9px] sm:text-xs px-1 sm:px-2 py-0 h-4 sm:h-5 ${getStockStatusColor(loc.stockStatus)}`}>
                                {loc.stockStatus === 'in_stock' && 'In Stock'}
                                {loc.stockStatus === 'low_stock' && 'Low Stock'}
                                {loc.stockStatus === 'out_of_stock' && 'Out of Stock'}
                              </Badge>
                            </TableCell>
                            <TableCell className="py-1.5 sm:py-2 whitespace-nowrap">
                              <Input 
                                type="number"
                                min="0"
                                value={loc.available}
                                onChange={(e) => handleQuantityChange(loc.locationId, 'available', e.target.value)}
                                className="h-7 sm:h-8 w-16 sm:w-20 ml-auto text-right text-xs sm:text-sm"
                                aria-label={`Quantity available at ${loc.locationName}`}
                              />
                            </TableCell>
                            <TableCell className="py-1.5 sm:py-2 whitespace-nowrap">
                              <Input 
                                type="number"
                                min="0"
                                value={loc.reserved || 0}
                                onChange={(e) => handleQuantityChange(loc.locationId, 'reserved', e.target.value)}
                                className="h-7 sm:h-8 w-16 sm:w-20 ml-auto text-right text-xs sm:text-sm"
                                aria-label={`Quantity reserved at ${loc.locationName}`}
                              />
                            </TableCell>
                            <TableCell className="py-1.5 sm:py-2 whitespace-nowrap">
                              <Input 
                                type="number"
                                min="0"
                                value={loc.incoming || 0}
                                onChange={(e) => handleQuantityChange(loc.locationId, 'incoming', e.target.value)}
                                className="h-7 sm:h-8 w-16 sm:w-20 ml-auto text-right text-xs sm:text-sm"
                                aria-label={`Quantity incoming at ${loc.locationName}`}
                              />
                            </TableCell>
                            <TableCell className="py-1.5 sm:py-2 whitespace-nowrap">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 sm:h-8 w-7 sm:w-8 p-0 ml-auto"
                                onClick={() => removeLocation(loc.locationId)}
                              >
                                <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>
                  
                  <TabsContent value="low" className="m-0 overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-[10px] sm:text-xs py-2 sm:py-3 whitespace-nowrap">Location</TableHead>
                          <TableHead className="text-center text-[10px] sm:text-xs py-2 sm:py-3 whitespace-nowrap">Status</TableHead>
                          <TableHead className="text-right text-[10px] sm:text-xs py-2 sm:py-3 whitespace-nowrap">Available</TableHead>
                          <TableHead className="text-right text-[10px] sm:text-xs py-2 sm:py-3 whitespace-nowrap">Threshold</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {formData.locations
                          .filter(loc => loc.stockStatus === 'low_stock')
                          .map(loc => (
                            <TableRow key={loc.locationId}>
                              <TableCell className="text-xs sm:text-sm py-1.5 sm:py-2 font-medium whitespace-nowrap">{loc.locationName}</TableCell>
                              <TableCell className="text-center whitespace-nowrap">
                                <Badge variant="outline" className={`text-[9px] sm:text-xs px-1 sm:px-2 py-0 h-4 sm:h-5 ${getStockStatusColor(loc.stockStatus)}`}>
                                  Low Stock
                                </Badge>
                              </TableCell>
                              <TableCell className="py-1.5 sm:py-2 whitespace-nowrap">
                                <Input 
                                  type="number"
                                  min="0"
                                  value={loc.available}
                                  onChange={(e) => handleQuantityChange(loc.locationId, 'available', e.target.value)}
                                  className="h-7 sm:h-8 w-16 sm:w-20 ml-auto text-right text-xs sm:text-sm"
                                />
                              </TableCell>
                              <TableCell className="py-1.5 sm:py-2 whitespace-nowrap">
                                <Input 
                                  type="number"
                                  min="0"
                                  value={loc.threshold || 5}
                                  onChange={(e) => handleQuantityChange(loc.locationId, 'threshold', e.target.value)}
                                  className="h-7 sm:h-8 w-16 sm:w-20 ml-auto text-right text-xs sm:text-sm"
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        {formData.locations.filter(loc => loc.stockStatus === 'low_stock').length === 0 && (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center text-xs sm:text-sm text-gray-500 py-3 sm:py-4">
                              No locations with low stock
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TabsContent>
                  
                  <TabsContent value="out" className="m-0 overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-[10px] sm:text-xs py-2 sm:py-3 whitespace-nowrap">Location</TableHead>
                          <TableHead className="text-center text-[10px] sm:text-xs py-2 sm:py-3 whitespace-nowrap">Status</TableHead>
                          <TableHead className="text-right text-[10px] sm:text-xs py-2 sm:py-3 whitespace-nowrap">Available</TableHead>
                          <TableHead className="text-right text-[10px] sm:text-xs py-2 sm:py-3 whitespace-nowrap">Incoming</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {formData.locations
                          .filter(loc => loc.stockStatus === 'out_of_stock')
                          .map(loc => (
                            <TableRow key={loc.locationId}>
                              <TableCell className="text-xs sm:text-sm py-1.5 sm:py-2 font-medium whitespace-nowrap">{loc.locationName}</TableCell>
                              <TableCell className="text-center whitespace-nowrap">
                                <Badge variant="outline" className={`text-[9px] sm:text-xs px-1 sm:px-2 py-0 h-4 sm:h-5 ${getStockStatusColor(loc.stockStatus)}`}>
                                  Out of Stock
                                </Badge>
                              </TableCell>
                              <TableCell className="py-1.5 sm:py-2 whitespace-nowrap">
                                <Input 
                                  type="number"
                                  min="0"
                                  value={loc.available}
                                  onChange={(e) => handleQuantityChange(loc.locationId, 'available', e.target.value)}
                                  className="h-7 sm:h-8 w-16 sm:w-20 ml-auto text-right text-xs sm:text-sm"
                                />
                              </TableCell>
                              <TableCell className="py-1.5 sm:py-2 whitespace-nowrap">
                                <Input 
                                  type="number"
                                  min="0"
                                  value={loc.incoming || 0}
                                  onChange={(e) => handleQuantityChange(loc.locationId, 'incoming', e.target.value)}
                                  className="h-7 sm:h-8 w-16 sm:w-20 ml-auto text-right text-xs sm:text-sm"
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        {formData.locations.filter(loc => loc.stockStatus === 'out_of_stock').length === 0 && (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center text-xs sm:text-sm text-gray-500 py-3 sm:py-4">
                              No locations out of stock
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="text-center py-6">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mx-auto flex items-center gap-1.5"
                  onClick={() => setLocationDialogOpen(true)}
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Inventory Location
                </Button>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">No inventory locations added yet</p>
              </div>
            )}

            {/* Additional inventory option - sell when out of stock */}
            <div className="flex items-center justify-between bg-gray-50 p-2 sm:p-3 rounded-md border mt-4">
              <div className="flex flex-col">
                <Label htmlFor="continue-selling" className="text-xs sm:text-sm font-medium">
                  Continue selling when out of stock
                </Label>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">
                  When enabled, customers can still purchase this product when it's out of stock
                </p>
              </div>
              <Switch 
                id="continue-selling"
                checked={formData.continueSellingWhenOutOfStock ?? false}
                onCheckedChange={(checked) => onChange('continueSellingWhenOutOfStock', checked)}
              />
            </div>
          </div>
        )}

        {/* SKU and Barcode - Always visible */}
        <div className={`space-y-3 sm:space-y-4 pt-2 sm:pt-3 ${trackQuantity ? 'border-t' : ''}`}>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Checkbox 
              id="has-sku-barcode"
              checked={hasSkuOrBarcode}
              onCheckedChange={(checked) => onChange('hasSkuOrBarcode', !!checked)}
            />
            <Label htmlFor="has-sku-barcode" className="text-xs sm:text-sm font-medium">
              This product has a SKU or barcode
            </Label>
          </div>
          
          {hasSkuOrBarcode && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1 sm:pt-2">
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="sku" className="text-xs sm:text-sm font-medium flex items-center gap-1.5">
                  SKU (Stock Keeping Unit)
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gray-400 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-[250px] p-3">
                        <p className="text-[10px] sm:text-xs">A unique identifier for your product used for inventory management.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Input
                  id="sku"
                  value={formData.sku || ''}
                  onChange={(e) => onChange('sku', e.target.value)}
                  placeholder="e.g. SHIRT-BLK-L"
                  className="text-xs sm:text-sm h-8 sm:h-9"
                />
              </div>
              
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="barcode" className="text-xs sm:text-sm font-medium flex items-center gap-1.5">
                  Barcode (ISBN, UPC, GTIN, etc.)
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gray-400 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-[250px] p-3">
                        <p className="text-[10px] sm:text-xs">Standard product identifiers often used for scanning and tracking products.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Input
                  id="barcode"
                  value={formData.barcode || ''}
                  onChange={(e) => onChange('barcode', e.target.value)}
                  placeholder="e.g. 978123456789"
                  className="text-xs sm:text-sm h-8 sm:h-9"
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      {trackQuantity && (
        <CardFooter className="flex justify-between pt-2 pb-4 px-6 border-t bg-gray-50/50">
          <div className="text-xs text-gray-500 flex items-center gap-1.5">
            <Package className="h-3.5 w-3.5" />
            <span>
              {totalInventory} {totalInventory === 1 ? 'unit' : 'units'} across {formData.locations?.length || 0} {(formData.locations?.length || 0) === 1 ? 'location' : 'locations'}
            </span>
          </div>
          <Button variant="link" size="sm" className="h-auto p-0 text-xs text-black">
            Manage all locations <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default InventorySection; 