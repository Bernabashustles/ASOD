'use client';

import React, { useState } from 'react';
import { 
  Warehouse,
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  Edit2, 
  Plus,
  Search,
  MoreHorizontal,
  Clock,
  Star,
  Building2,
  Save,
  Activity,
  RefreshCw,
  Trash
} from 'lucide-react';



import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Package,
  AlertCircle,
  Info,
  Filter,
  TrendingUp,
  Eye,
  ShoppingCart,
} from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Warehouse {
  name: string;
  location: string;
  latitude: string;
  longitude: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
  placeId: string;
  formattedAddress: string;
  plusCode: string;
  mapUrl: string;
  timezone: string;
  utcOffset: number;
  businessStatus: string;
  rating: number;
  totalCapacity: number;
  currentInventory: number;
  utilizationPercentage: number;
  inventoryItems: {
    id: string;
    name: string;
    sku: string;
    quantity: number;
    reorderPoint: number;
    lastUpdated: string;
  }[];
}

const warehousesData: Warehouse[] = [
  {
    name: "Warehouse A",
    location: "123 Main St, Cityville",
    latitude: "40.7128",
    longitude: "-74.0060",
    street: "123 Main St",
    city: "Cityville",
    state: "NY",
    country: "USA",
    postalCode: "10001",
    phoneNumber: "123-456-7890",
    email: "warehouse@example.com",
    placeId: "ChIJabc123",
    formattedAddress: "123 Main St, Cityville, NY 10001, USA",
    plusCode: "XYZ+123",
    mapUrl: "https://maps.google.com/?q=40.7128,-74.0060",
    timezone: "America/New_York",
    utcOffset: -300,
    businessStatus: "OPERATIONAL",
    rating: 4.5,
    totalCapacity: 10000,
    currentInventory: 8500,
    utilizationPercentage: 85,
    inventoryItems: [
      {
        id: "1",
        name: "Widget A",
        sku: "WID-A",
        quantity: 5000,
        reorderPoint: 1000,
        lastUpdated: "2022-01-01"
      },
      {
        id: "2",
        name: "Widget B",
        sku: "WID-B",
        quantity: 3500,
        reorderPoint: 500,
        lastUpdated: "2022-01-02"
      }
    ]
  },
  {
    name: "Distribution Center B",
    location: "456 Commerce Ave, Metropolis",
    latitude: "34.0522",
    longitude: "-118.2437",
    street: "456 Commerce Ave",
    city: "Metropolis",
    state: "CA",
    country: "USA",
    postalCode: "90012",
    phoneNumber: "123-555-7890",
    email: "dcb@example.com",
    placeId: "ChIJdef456",
    formattedAddress: "456 Commerce Ave, Metropolis, CA 90012, USA",
    plusCode: "XYZ+456",
    mapUrl: "https://maps.google.com/?q=34.0522,-118.2437",
    timezone: "America/Los_Angeles",
    utcOffset: -420,
    businessStatus: "OPERATIONAL",
    rating: 4.8,
    totalCapacity: 12000,
    currentInventory: 10500,
    utilizationPercentage: 87.5,
    inventoryItems: [
      {
        id: "1",
        name: "Gadget X",
        sku: "GAD-X",
        quantity: 6000,
        reorderPoint: 1200,
        lastUpdated: "2022-01-03"
      },
      {
        id: "2",
        name: "Gadget Y",
        sku: "GAD-Y",
        quantity: 4500,
        reorderPoint: 900,
        lastUpdated: "2022-01-04"
      }
    ]
  },
  {
    name: "Storage Facility C",
    location: "789 Industrial Pkwy, Tech City",
    latitude: "41.8781",
    longitude: "-87.6298",
    street: "789 Industrial Pkwy",
    city: "Tech City",
    state: "IL",
    country: "USA",
    postalCode: "60601",
    phoneNumber: "123-777-7890",
    email: "storage@example.com",
    placeId: "ChIJghi789",
    formattedAddress: "789 Industrial Pkwy, Tech City, IL 60601, USA",
    plusCode: "XYZ+789",
    mapUrl: "https://maps.google.com/?q=41.8781,-87.6298",
    timezone: "America/Chicago",
    utcOffset: -360,
    businessStatus: "OPERATIONAL",
    rating: 4.2,
    totalCapacity: 9000,
    currentInventory: 7500,
    utilizationPercentage: 83.33,
    inventoryItems: [
      {
        id: "1",
        name: "Gizmo M",
        sku: "GIZ-M",
        quantity: 4500,
        reorderPoint: 900,
        lastUpdated: "2022-01-05"
      },
      {
        id: "2",
        name: "Gizmo N",
        sku: "GIZ-N",
        quantity: 3000,
        reorderPoint: 600,
        lastUpdated: "2022-01-06"
      }
    ]
  }
];

const GOOGLE_MAPS_API_KEY = "AQ.Ab8RN6KDuTnnmPXhQ_YESrGXTwbmYlZ-TJe3VWYap-l5kuv6wA";

interface WarehouseDetailsProps {
  warehouse: Warehouse;
  onClose: () => void;
}

const WarehouseDetails: React.FC<WarehouseDetailsProps> = ({ warehouse, onClose }) => {
  const [mapError, setMapError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedWarehouse, setEditedWarehouse] = useState(warehouse);
  const [activeTab, setActiveTab] = useState('details');
  const [showAddInventory, setShowAddInventory] = useState(false);
  const [newInventoryItem, setNewInventoryItem] = useState({
    name: '',
    sku: '',
    quantity: 0,
    reorderPoint: 0
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedWarehouse(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddInventoryItem = () => {
    // Here you would typically make an API call to save the new inventory item
    const newItem = {
      ...newInventoryItem,
      id: Date.now().toString(),
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    setEditedWarehouse(prev => ({
      ...prev,
      inventoryItems: [...prev.inventoryItems, newItem],
      currentInventory: prev.currentInventory + newInventoryItem.quantity,
      utilizationPercentage: Math.round(((prev.currentInventory + newInventoryItem.quantity) / prev.totalCapacity) * 100)
    }));
    
    setNewInventoryItem({
      name: '',
      sku: '',
      quantity: 0,
      reorderPoint: 0
    });
    setShowAddInventory(false);
  };

  const getMapUrl = () => {
    if (!warehouse.latitude || !warehouse.longitude) {
      return `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(warehouse.formattedAddress)}`;
    }
    return `https://www.google.com/maps/embed/v1/view?key=${GOOGLE_MAPS_API_KEY}&center=${warehouse.latitude},${warehouse.longitude}&zoom=18&maptype=roadmap`;
  };

  const handleMapError = () => {
    setMapError(true);
  };

  return (
    <>
      <Dialog open onOpenChange={onClose}>
        <DialogContent className="w-[90vw] max-w-4xl h-[90vh] max-h-[800px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Warehouse className="w-4 h-4 sm:w-5 sm:h-5" />
              {warehouse.name}
            </DialogTitle>
            <DialogDescription className="text-sm">{warehouse.location}</DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge 
                  variant={warehouse.businessStatus === 'OPERATIONAL' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  <Activity className="w-3 h-3 mr-1" />
                  {warehouse.businessStatus}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium">{warehouse.rating}</span>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">Location Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Street</Label>
                      <p className="mt-1 text-sm">{warehouse.street}</p>
                    </div>
                    <div>
                      <Label>City</Label>
                      <p className="mt-1 text-sm">{warehouse.city}</p>
                    </div>
                    <div>
                      <Label>State</Label>
                      <p className="mt-1 text-sm">{warehouse.state}</p>
                    </div>
                    <div>
                      <Label>Country</Label>
                      <p className="mt-1 text-sm">{warehouse.country}</p>
                    </div>
                    <div>
                      <Label>Postal Code</Label>
                      <p className="mt-1 text-sm">{warehouse.postalCode}</p>
                    </div>
                    <div>
                      <Label>Plus Code</Label>
                      <p className="mt-1 text-sm">{warehouse.plusCode}</p>
                    </div>
                  </div>

                  <div>
                    <Label>Coordinates</Label>
                    <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <p className="text-sm">Latitude: {warehouse.latitude}</p>
                      <p className="text-sm">Longitude: {warehouse.longitude}</p>
                    </div>
                  </div>

                  <div>
                    <Label>Place ID</Label>
                    <p className="mt-1 text-sm">{warehouse.placeId}</p>
                  </div>

                  <div>
                    <Label>Time Zone</Label>
                    <div className="mt-1 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{warehouse.timezone} (UTC {warehouse.utcOffset >= 0 ? '+' : ''}{warehouse.utcOffset / 60})</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Phone Number</Label>
                      <p className="mt-1 flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4" />
                        {warehouse.phoneNumber}
                      </p>
                    </div>
                    <div>
                      <Label>Email</Label>
                      <p className="mt-1 flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4" />
                        {warehouse.email}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="aspect-video relative rounded-lg overflow-hidden bg-muted">
                {mapError ? (
                  <div className="absolute inset-0 flex items-center justify-center flex-col gap-2 p-4">
                    <Globe className="w-8 h-8 text-gray-400" />
                    <p className="text-sm text-gray-500 text-center">
                      Unable to load map preview. Please check the coordinates or address.
                    </p>
                  </div>
                ) : (
                  <iframe
                    src={getMapUrl()}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    onError={handleMapError}
                  />
                )}
              </div>

              <Button 
                className="w-full"
                onClick={() => window.open(warehouse.mapUrl, '_blank')}
              >
                <Globe className="w-4 h-4 mr-2" />
                View on Google Maps
              </Button>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">Inventory Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="space-y-2">
                      <Label>Total Capacity</Label>
                      <div className="text-xl sm:text-2xl font-semibold">
                        {editedWarehouse.totalCapacity.toLocaleString()}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Current Inventory</Label>
                      <div className="text-xl sm:text-2xl font-semibold">
                        {editedWarehouse.currentInventory.toLocaleString()}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Utilization</Label>
                      <div className="text-xl sm:text-2xl font-semibold">
                        {editedWarehouse.utilizationPercentage}%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <CardTitle className="text-base sm:text-lg">Inventory Items</CardTitle>
                    <Button variant="outline" size="sm" onClick={() => setShowAddInventory(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Item
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>SKU</TableHead>
                          <TableHead className="hidden sm:table-cell">Quantity</TableHead>
                          <TableHead className="hidden sm:table-cell">Reorder Point</TableHead>
                          <TableHead className="hidden sm:table-cell">Last Updated</TableHead>
                          <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {editedWarehouse.inventoryItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.sku}</TableCell>
                            <TableCell className="hidden sm:table-cell">{item.quantity.toLocaleString()}</TableCell>
                            <TableCell className="hidden sm:table-cell">{item.reorderPoint.toLocaleString()}</TableCell>
                            <TableCell className="hidden sm:table-cell">{new Date(item.lastUpdated).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Edit2 className="w-4 h-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Update Stock
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash className="w-4 h-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Add Inventory Item Dialog */}
      {showAddInventory && (
        <Dialog open={showAddInventory} onOpenChange={setShowAddInventory}>
          <DialogContent className="w-[90vw] max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl">Add New Inventory Item</DialogTitle>
              <DialogDescription className="text-sm">
                Enter the details for the new inventory item.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="itemName">Item Name</Label>
                <Input
                  id="itemName"
                  value={newInventoryItem.name}
                  onChange={(e) => setNewInventoryItem(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter item name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  value={newInventoryItem.sku}
                  onChange={(e) => setNewInventoryItem(prev => ({ ...prev, sku: e.target.value }))}
                  placeholder="Enter SKU"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="0"
                    value={newInventoryItem.quantity}
                    onChange={(e) => setNewInventoryItem(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
                    placeholder="Enter quantity"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reorderPoint">Reorder Point</Label>
                  <Input
                    id="reorderPoint"
                    type="number"
                    min="0"
                    value={newInventoryItem.reorderPoint}
                    onChange={(e) => setNewInventoryItem(prev => ({ ...prev, reorderPoint: parseInt(e.target.value) || 0 }))}
                    placeholder="Enter reorder point"
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button variant="outline" className="w-full sm:w-auto" onClick={() => setShowAddInventory(false)}>
                Cancel
              </Button>
              <Button className="w-full sm:w-auto" onClick={handleAddInventoryItem}>
                Add Item
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default function LocationInventoryPage() {
  const [inventory, setInventory] = useState<LocationInventory[]>([
    {
      id: 1,
      locationName: 'Downtown Store',
      locationId: 'LOC-001',
      productName: 'Premium Cotton T-Shirt',
      category: 'Apparel',
      sku: 'TSH-001',
      price: 29.99,
      stock: 150,
      status: 'in-stock',
      description: 'High-quality cotton t-shirt available in multiple colors',
      supplier: 'Fashion Wholesale Co.',
      lastUpdated: '2 hours ago',
      reorderPoint: 50,
      soldThisMonth: 45,
    },
    {
      id: 2,
      locationName: 'Mall Branch',
      locationId: 'LOC-002',
      productName: 'Wireless Earbuds',
      category: 'Electronics',
      sku: 'WEB-002',
      price: 89.99,
      stock: 25,
      status: 'low-stock',
      description: 'True wireless earbuds with noise cancellation',
      supplier: 'Tech Distributors Ltd.',
      lastUpdated: '1 day ago',
      reorderPoint: 30,
      soldThisMonth: 78,
    },
    {
      id: 3,
      locationName: 'Suburban Store',
      locationId: 'LOC-003',
      productName: 'Ceramic Plant Pot',
      category: 'Home & Garden',
      sku: 'CPP-003',
      price: 19.99,
      stock: 0,
      status: 'out-of-stock',
      description: 'Decorative ceramic pot for indoor plants',
      supplier: 'Garden Supplies Inc.',
      lastUpdated: '3 days ago',
      reorderPoint: 25,
      soldThisMonth: 32,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterLocation, setFilterLocation] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('location');
  const [selectedItem, setSelectedItem] = useState<LocationInventory | null>(null);
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const locations = Array.from(new Set(inventory.map(item => item.locationName)));
  const categories = Array.from(new Set(inventory.map(item => item.category)));

  const filteredInventory = inventory
    .filter(item => {
      const matchesSearch = 
        item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.locationName.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesLocation = filterLocation === 'all' || item.locationName === filterLocation;
      const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
      
      return matchesSearch && matchesLocation && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'location':
          return a.locationName.localeCompare(b.locationName);
        case 'price':
          return b.price - a.price;
        case 'stock':
          return b.stock - a.stock;
        case 'sold':
          return b.soldThisMonth - a.soldThisMonth;
        default:
          return a.productName.localeCompare(b.productName);
      }
    });

  const handleTransferStock = (e: React.FormEvent) => {
    e.preventDefault();
    // Add stock transfer logic here
    setIsTransferDialogOpen(false);
  };

  const getStatusColor = (status: LocationInventory['status']) => {
    switch (status) {
      case 'in-stock':
        return 'default';
      case 'low-stock':
        return 'warning';
      case 'out-of-stock':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Location Inventory</h2>
          <p className="text-muted-foreground">
            Manage and track inventory across all store locations
          </p>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search inventory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <Select value={filterLocation} onValueChange={setFilterLocation}>
              <SelectTrigger className="w-[200px]">
                <MapPin className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px]">
                <TrendingUp className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="location">Location</SelectItem>
                <SelectItem value="name">Product Name</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="stock">Stock Level</SelectItem>
                <SelectItem value="sold">Best Selling</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Locations
            </CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{locations.length}</div>
            <p className="text-xs text-muted-foreground">
              Active store locations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Stock Value
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${inventory.reduce((sum, item) => sum + (item.price * item.stock), 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all locations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Low Stock Items
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {inventory.filter(p => p.status === 'low-stock' || p.status === 'out-of-stock').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Sales
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {inventory.reduce((sum, item) => sum + item.soldThisMonth, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Units sold this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredInventory.map((item) => (
          <Card key={item.id} className="group">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <CardTitle className="text-xl font-semibold">{item.locationName}</CardTitle>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="capitalize">
                      {item.category}
                    </Badge>
                    <Badge variant={getStatusColor(item.status)} className="capitalize">
                      {item.status.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => {
                      setSelectedItem(item);
                      setIsDetailDialogOpen(true);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => {
                        setSelectedItem(item);
                        setIsTransferDialogOpen(true);
                      }}>
                        Transfer Stock
                      </DropdownMenuItem>
                      <DropdownMenuItem>Update Stock</DropdownMenuItem>
                      <DropdownMenuItem>View History</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Package className="h-4 w-4 shrink-0" />
                  <span className="font-medium">{item.productName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Tags className="h-4 w-4 shrink-0" />
                  SKU: {item.sku}
                </div>
                <div className="text-sm text-muted-foreground">
                  {item.description}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Price</p>
                  <p className="text-xl font-bold mt-1">${item.price}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Stock</p>
                  <p className="text-xl font-bold mt-1">{item.stock}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Sold</p>
                  <p className="text-xl font-bold mt-1">{item.soldThisMonth}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground border-t pt-4">
              Last updated: {item.lastUpdated}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Transfer Stock Dialog */}
      <Dialog open={isTransferDialogOpen} onOpenChange={setIsTransferDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleTransferStock}>
            <DialogHeader>
              <DialogTitle>Transfer Stock</DialogTitle>
              <DialogDescription>
                Transfer stock between locations for {selectedItem?.productName}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>From Location</Label>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  {selectedItem?.locationName}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="to-location">To Location</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations
                      .filter(loc => loc !== selectedItem?.locationName)
                      .map(location => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="0"
                  max={selectedItem?.stock}
                />
                <p className="text-xs text-muted-foreground">
                  Available: {selectedItem?.stock} units
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any additional notes about this transfer"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Transfer Stock</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedItem?.productName}</DialogTitle>
            <DialogDescription>
              Detailed inventory information for this location.
            </DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm">Location</h4>
                  <p className="text-sm text-muted-foreground">{selectedItem.locationName}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm">Status</h4>
                  <Badge
                    variant={getStatusColor(selectedItem.status)}
                    className="mt-1 capitalize"
                  >
                    {selectedItem.status.replace('-', ' ')}
                  </Badge>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-sm">SKU</h4>
                <p className="text-sm text-muted-foreground">{selectedItem.sku}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm">Description</h4>
                <p className="text-sm text-muted-foreground">{selectedItem.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm">Supplier</h4>
                  <p className="text-sm text-muted-foreground">{selectedItem.supplier}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm">Last Updated</h4>
                  <p className="text-sm text-muted-foreground">{selectedItem.lastUpdated}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div>
                  <h4 className="font-medium text-sm">Price</h4>
                  <p className="text-xl font-bold">${selectedItem.price}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm">Stock</h4>
                  <p className="text-xl font-bold">{selectedItem.stock}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm">Sold</h4>
                  <p className="text-xl font-bold">{selectedItem.soldThisMonth}</p>
                </div>
              </div>
              <div className="pt-4 border-t">
                <h4 className="font-medium text-sm">Stock Management</h4>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Reorder Point:</span>
                    <span className="font-medium">{selectedItem.reorderPoint} units</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Stock Value:</span>
                    <span className="font-medium">
                      ${(selectedItem.price * selectedItem.stock).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Help Section */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Need help managing location inventory? Check out our{" "}
          <a href="#" className="font-medium underline underline-offset-4">
            inventory management guide
          </a>{" "}
          or{" "}
          <a href="#" className="font-medium underline underline-offset-4">
            contact support
          </a>
          .
        </AlertDescription>
      </Alert>
    </div>
  );
} 