'use client';

import { useState } from 'react';
import { SettingsPage } from '../components/settings-page';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Store,
  Search,
  Plus,
  MoreVertical,
  MapPin,
  Phone,
  Mail,
  Clock,
  Trash2,
  Edit,
  Info,
  Filter,
  Star,
  TrendingUp,
  Building,
  ShoppingBag,
  Eye,
  Navigation,
  Globe,
  Map,
  Users,
} from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

interface ShopLocation {
  id?: number;
  name: string;
  location: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
  status: 'active' | 'inactive' | 'maintenance';
  latitude: string;
  longitude: string;
  formattedAddress: string;
  businessStatus: string;
}

export default function ShopLocationsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [selectedLocation, setSelectedLocation] = useState<ShopLocation | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewMapDialogOpen, setIsViewMapDialogOpen] = useState(false);
  const [isViewDetailsDialogOpen, setIsViewDetailsDialogOpen] = useState(false);
  
  const [shopLocations, setShopLocations] = useState<ShopLocation[]>([
    {
      id: 1,
      name: "Tomi Bole",
      location: "A10, Jijiga",
      street: "A10",
      city: "Jijiga",
      state: "Somali Region",
      country: "Ethiopia",
      postalCode: "1000",
      phoneNumber: "+251996992919",
      email: "apayload@gmail.com",
      status: "active",
      latitude: "9.3495302",
      longitude: "42.7914807",
      formattedAddress: "A10, Jijiga, Somali Region, Ethiopia",
      businessStatus: "OPERATIONAL"
    },
    {
      id: 2,
      name: "Central Market",
      location: "B12, Addis Ababa",
      street: "B12",
      city: "Addis Ababa",
      state: "Addis Ababa",
      country: "Ethiopia",
      postalCode: "1000",
      phoneNumber: "+251912345678",
      email: "central@example.com",
      status: "active",
      latitude: "9.0222",
      longitude: "38.7468",
      formattedAddress: "B12, Addis Ababa, Addis Ababa, Ethiopia",
      businessStatus: "OPERATIONAL"
    },
    {
      id: 3,
      name: "Harar Gate",
      location: "Main St, Harar",
      street: "Main St",
      city: "Harar",
      state: "Harari Region",
      country: "Ethiopia",
      postalCode: "1001",
      phoneNumber: "+251987654321",
      email: "harar@example.com",
      status: "maintenance",
      latitude: "9.3113",
      longitude: "42.1254",
      formattedAddress: "Main St, Harar, Harari Region, Ethiopia",
      businessStatus: "TEMPORARILY_CLOSED"
    }
  ]);

  const businessStatuses = Array.from(new Set(shopLocations.map(loc => loc.businessStatus)));

  const filteredLocations = shopLocations
    .filter(location => {
      const matchesSearch = 
        location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.formattedAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || location.businessStatus === filterStatus;
      const matchesActiveTab = activeTab === 'all' || 
        (activeTab === 'active' && location.status === 'active') ||
        (activeTab === 'inactive' && (location.status === 'inactive' || location.status === 'maintenance'));
      
      return matchesSearch && matchesStatus && matchesActiveTab;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'city':
          return a.city.localeCompare(b.city);
        case 'state':
          return a.state.localeCompare(b.state);
        case 'status':
          return a.businessStatus.localeCompare(b.businessStatus);
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleAddLocation = (e: React.FormEvent) => {
    e.preventDefault();
    // Add location logic would go here
    setIsAddDialogOpen(false);
  };

  const handleEditLocation = (e: React.FormEvent) => {
    e.preventDefault();
    // Edit location logic would go here
    setIsEditDialogOpen(false);
  };

  const handleDeleteLocation = (id: number) => {
    setShopLocations(shopLocations.filter(loc => loc.id !== id));
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'inactive':
        return 'secondary';
      case 'maintenance':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getBusinessStatusText = (status: string) => {
    return status.replace('_', ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  };

  const handleToggleStatus = (location: ShopLocation, isActive: boolean) => {
    // Update the status of the location in the state
    setShopLocations(shopLocations.map(loc => {
      if (loc.id === location.id) {
        return {
          ...loc,
          status: isActive ? 'active' : 'inactive',
          businessStatus: isActive ? 'OPERATIONAL' : 'TEMPORARILY_CLOSED'
        };
      }
      return loc;
    }));
  };

  return (
    <SettingsPage
      title="Shop Locations"
      description="Manage your physical store locations"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="w-full sm:w-auto">
            <Tabs 
              defaultValue="all" 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full sm:w-auto"
            >
              <TabsList className="w-full sm:w-auto grid grid-cols-2 sm:flex">
                <TabsTrigger value="all" className="flex-1">All Locations</TabsTrigger>
                <TabsTrigger value="active" className="flex-1">Active</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <Button 
            onClick={() => setIsAddDialogOpen(true)}
            className="w-full sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Location
          </Button>
        </div>
        
        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[200px]">
                <Store className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {businessStatuses.map(status => (
                  <SelectItem key={status} value={status}>{getBusinessStatusText(status)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px]">
                <TrendingUp className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="city">City</SelectItem>
                <SelectItem value="state">State/Region</SelectItem>
                <SelectItem value="status">Business Status</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Locations List - Single Column Layout */}
        <div className="space-y-4">
          {filteredLocations.map((location) => (
            <div key={location.id} className="group relative bg-card rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-md transition-all">
              <div className="p-5">
                {/* Shop Status Badge - Absolute positioned */}
                <div className="absolute top-5 right-5 flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-muted/60 px-3 py-1.5 rounded-full">
                    <Switch 
                      id={`status-switch-${location.id}`}
                      checked={location.status === 'active'}
                      onCheckedChange={(checked) => handleToggleStatus(location, checked)}
                      className="data-[state=checked]:bg-primary"
                    />
                    <Label 
                      htmlFor={`status-switch-${location.id}`}
                      className={`text-xs font-medium ${location.status === 'active' ? 'text-primary' : 'text-muted-foreground'}`}
                    >
                      {location.status === 'active' ? 'Active' : 'Inactive'}
                    </Label>
                  </div>
                  <Badge 
                    variant={getStatusBadgeVariant(location.status)} 
                    className="capitalize font-medium hidden sm:flex"
                  >
                    {location.status}
                  </Badge>
                </div>
                
                {/* Store Header */}
                <div className="flex gap-4 items-center mb-4">
                  <div className="h-12 w-12 bg-gradient-to-br from-primary/20 to-primary/30 rounded-xl flex items-center justify-center text-primary shadow-sm">
                    <Store className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{location.name}</h3>
                    <p className="text-muted-foreground text-sm flex items-center gap-2">
                      <span className="capitalize">{getBusinessStatusText(location.businessStatus)}</span>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground inline-block"></span>
                      <span>{location.city}, {location.state}</span>
                    </p>
                  </div>
                </div>
                
                {/* Store Details */}
                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="bg-muted rounded-md h-8 w-8 flex items-center justify-center shrink-0">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs font-medium mb-0.5">Address</p>
                      <p className="font-medium">{location.formattedAddress}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-muted rounded-md h-8 w-8 flex items-center justify-center shrink-0">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs font-medium mb-0.5">Phone</p>
                      <p className="font-medium">{location.phoneNumber}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-muted rounded-md h-8 w-8 flex items-center justify-center shrink-0">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs font-medium mb-0.5">Email</p>
                      <p className="font-medium">{location.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-muted rounded-md h-8 w-8 flex items-center justify-center shrink-0">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs font-medium mb-0.5">Country</p>
                      <p className="font-medium">{location.country}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Footer */}
              <div className="flex items-center justify-between px-5 py-3 border-t bg-muted/30">
                <div className="text-xs text-muted-foreground">
                  Postal Code: <span className="font-medium">{location.postalCode}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      setSelectedLocation(location);
                      setIsViewMapDialogOpen(true);
                    }}
                  >
                    <Map className="h-3.5 w-3.5 mr-1.5" />
                    View Map
                  </Button>
                  <Button 
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      setSelectedLocation(location);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <Edit className="h-3.5 w-3.5 mr-1.5" />
                    Edit Shop
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[180px]">
                      <DropdownMenuItem onClick={() => {
                        setSelectedLocation(location);
                        setIsViewMapDialogOpen(true);
                      }}>
                        <Map className="h-4 w-4 mr-2" />
                        View on Map
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        setSelectedLocation(location);
                        setIsEditDialogOpen(true);
                      }}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        setSelectedLocation(location);
                        setIsViewDetailsDialogOpen(true);
                      }}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Manage Inventory
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => handleDeleteLocation(location.id as number)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Location
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ))}
          
          {filteredLocations.length === 0 && (
            <div className="rounded-lg p-12 text-center border border-dashed border-border bg-muted/10">
              <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-5">
                <Store className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No shop locations found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Try adjusting your search filters, or add a new shop location to your network.
              </p>
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
                className="px-6"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Shop Location
              </Button>
            </div>
          )}
        </div>

        {/* View Map Dialog */}
        <Dialog open={isViewMapDialogOpen} onOpenChange={setIsViewMapDialogOpen}>
          <DialogContent className="sm:max-w-[700px]">
            {selectedLocation && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedLocation.name}</DialogTitle>
                  <DialogDescription>{selectedLocation.formattedAddress}</DialogDescription>
                </DialogHeader>
                <div className="aspect-video rounded-md overflow-hidden bg-muted relative">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                    <Globe className="h-12 w-12 mb-2 opacity-20" />
                    <p className="text-sm">Map would be displayed here using coordinates:</p>
                    <p className="text-sm font-medium">
                      Latitude: {selectedLocation.latitude}, 
                      Longitude: {selectedLocation.longitude}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    <p>Integration with Google Maps or other mapping service would be implemented here.</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${selectedLocation.latitude},${selectedLocation.longitude}`, '_blank')}
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Open in Maps
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Add Location Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <form onSubmit={handleAddLocation}>
              <DialogHeader>
                <DialogTitle>Add New Location</DialogTitle>
                <DialogDescription>
                  Enter details to add a new shop location
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Shop Name</Label>
                  <Input id="name" placeholder="Enter shop name" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="street">Street</Label>
                  <Input id="street" placeholder="Enter street" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Enter city" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Region</Label>
                    <Input id="state" placeholder="Enter state or region" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input id="postalCode" placeholder="Enter postal code" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" placeholder="Enter country" defaultValue="Ethiopia" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input id="phoneNumber" placeholder="Enter phone number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter email address" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input id="latitude" placeholder="Enter latitude coordinate" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input id="longitude" placeholder="Enter longitude coordinate" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Location Status</Label>
                    <Select defaultValue="active">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessStatus">Business Status</Label>
                    <Select defaultValue="OPERATIONAL">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="OPERATIONAL">Operational</SelectItem>
                        <SelectItem value="TEMPORARILY_CLOSED">Temporarily Closed</SelectItem>
                        <SelectItem value="PERMANENTLY_CLOSED">Permanently Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Location</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Location Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[700px]">
            {selectedLocation && (
              <form onSubmit={handleEditLocation}>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Store className="h-5 w-5 text-primary" />
                    Edit {selectedLocation.name}
                  </DialogTitle>
                  <DialogDescription className="flex flex-wrap gap-2 items-center mt-1">
                    <Badge variant={getStatusBadgeVariant(selectedLocation.status)}>
                      {selectedLocation.status}
                    </Badge>
                    <Badge variant="outline">
                      {getBusinessStatusText(selectedLocation.businessStatus)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{selectedLocation.formattedAddress}</span>
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="bg-muted/30 p-4 rounded-lg border border-border">
                    <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                      <Store className="h-4 w-4 text-primary" />
                      Basic Information
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-name" className="text-muted-foreground">Shop Name</Label>
                        <Input 
                          id="edit-name" 
                          defaultValue={selectedLocation.name}
                          className="border-input/50 focus-visible:ring-primary/60" 
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="edit-status" className="text-muted-foreground">Status</Label>
                          <Select defaultValue={selectedLocation.status}>
                            <SelectTrigger className="border-input/50 focus-visible:ring-primary/60">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                              <SelectItem value="maintenance">Maintenance</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-businessStatus" className="text-muted-foreground">Business Status</Label>
                          <Select defaultValue={selectedLocation.businessStatus}>
                            <SelectTrigger className="border-input/50 focus-visible:ring-primary/60">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="OPERATIONAL">Operational</SelectItem>
                              <SelectItem value="TEMPORARILY_CLOSED">Temporarily Closed</SelectItem>
                              <SelectItem value="PERMANENTLY_CLOSED">Permanently Closed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg border border-border">
                    <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      Location Details
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-street" className="text-muted-foreground">Street</Label>
                        <Input 
                          id="edit-street" 
                          defaultValue={selectedLocation.street} 
                          className="border-input/50 focus-visible:ring-primary/60"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="edit-city" className="text-muted-foreground">City</Label>
                          <Input 
                            id="edit-city" 
                            defaultValue={selectedLocation.city}
                            className="border-input/50 focus-visible:ring-primary/60" 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-state" className="text-muted-foreground">State/Region</Label>
                          <Input 
                            id="edit-state" 
                            defaultValue={selectedLocation.state}
                            className="border-input/50 focus-visible:ring-primary/60" 
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="edit-postalCode" className="text-muted-foreground">Postal Code</Label>
                          <Input 
                            id="edit-postalCode" 
                            defaultValue={selectedLocation.postalCode}
                            className="border-input/50 focus-visible:ring-primary/60" 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-country" className="text-muted-foreground">Country</Label>
                          <Input 
                            id="edit-country" 
                            defaultValue={selectedLocation.country}
                            className="border-input/50 focus-visible:ring-primary/60" 
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="edit-latitude" className="text-muted-foreground">Latitude</Label>
                          <Input 
                            id="edit-latitude" 
                            defaultValue={selectedLocation.latitude}
                            className="border-input/50 focus-visible:ring-primary/60" 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-longitude" className="text-muted-foreground">Longitude</Label>
                          <Input 
                            id="edit-longitude" 
                            defaultValue={selectedLocation.longitude}
                            className="border-input/50 focus-visible:ring-primary/60" 
                          />
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <Button variant="outline" size="sm" type="button" className="h-8 text-xs" 
                          onClick={() => {
                            // This would integrate with a geolocation service
                            // For now just opens Google Maps in a new tab
                            window.open(`https://www.google.com/maps/search/?api=1&query=${selectedLocation.latitude},${selectedLocation.longitude}`, '_blank');
                          }}
                        >
                          <Navigation className="h-3.5 w-3.5 mr-1.5" />
                          Verify on Map
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg border border-border">
                    <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      Contact Information
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="edit-phoneNumber" className="text-muted-foreground">Phone Number</Label>
                          <Input 
                            id="edit-phoneNumber" 
                            defaultValue={selectedLocation.phoneNumber}
                            className="border-input/50 focus-visible:ring-primary/60" 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-email" className="text-muted-foreground">Email</Label>
                          <Input 
                            id="edit-email" 
                            defaultValue={selectedLocation.email}
                            type="email"
                            className="border-input/50 focus-visible:ring-primary/60" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter className="gap-2 sm:gap-0">
                  <Button type="button" variant="destructive" size="sm" className="sm:mr-auto"
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this location? This action cannot be undone.")) {
                        handleDeleteLocation(selectedLocation.id as number);
                        setIsEditDialogOpen(false);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Location
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>

        {/* View Details Dialog */}
        <Dialog open={isViewDetailsDialogOpen} onOpenChange={setIsViewDetailsDialogOpen}>
          <DialogContent className="sm:max-w-[700px]">
            {selectedLocation && (
              <>
                <DialogHeader className="border-b pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-gradient-to-br from-primary/20 to-primary/30 rounded-lg flex items-center justify-center text-primary">
                        <Store className="h-5 w-5" />
                      </div>
                      <DialogTitle className="text-2xl">{selectedLocation.name}</DialogTitle>
                    </div>
                    <Badge variant={getStatusBadgeVariant(selectedLocation.status)} className="capitalize">
                      {selectedLocation.status}
                    </Badge>
                  </div>
                  <DialogDescription className="flex flex-col gap-1 mt-2">
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      {selectedLocation.formattedAddress}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-normal">
                        {getBusinessStatusText(selectedLocation.businessStatus)}
                      </Badge>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-5">
                    <div className="bg-muted/20 p-4 rounded-lg border border-border space-y-3">
                      <h4 className="text-sm font-medium flex items-center gap-2 text-primary">
                        <Info className="h-4 w-4" />
                        Contact Information
                      </h4>
                      <div className="space-y-2.5 pl-1">
                        <div className="flex items-start">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-xs text-muted-foreground mb-0.5">Phone Number</p>
                            <p className="font-medium">{selectedLocation.phoneNumber}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                            <p className="font-medium">{selectedLocation.email}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-muted/20 p-4 rounded-lg border border-border space-y-3">
                      <h4 className="text-sm font-medium flex items-center gap-2 text-primary">
                        <MapPin className="h-4 w-4" />
                        Location Details
                      </h4>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-3 pl-1">
                        <div>
                          <p className="text-xs text-muted-foreground mb-0.5">Street</p>
                          <p className="font-medium">{selectedLocation.street}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-0.5">City</p>
                          <p className="font-medium">{selectedLocation.city}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-0.5">State/Region</p>
                          <p className="font-medium">{selectedLocation.state}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-0.5">Country</p>
                          <p className="font-medium">{selectedLocation.country}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-0.5">Postal Code</p>
                          <p className="font-medium">{selectedLocation.postalCode}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-muted/20 p-4 rounded-lg border border-border space-y-3">
                      <h4 className="text-sm font-medium flex items-center gap-2 text-primary">
                        <Globe className="h-4 w-4" />
                        Geographic Coordinates
                      </h4>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-3 pl-1">
                        <div>
                          <p className="text-xs text-muted-foreground mb-0.5">Latitude</p>
                          <p className="font-medium">{selectedLocation.latitude}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-0.5">Longitude</p>
                          <p className="font-medium">{selectedLocation.longitude}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-5">
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-primary/5 border-b p-2 flex items-center justify-between">
                        <h4 className="text-sm font-medium flex items-center gap-2">
                          <Map className="h-4 w-4 text-primary" />
                          Map View
                        </h4>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 text-xs"
                          onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${selectedLocation.latitude},${selectedLocation.longitude}`, '_blank')}
                        >
                          <Navigation className="h-3.5 w-3.5 mr-1.5" />
                          Open in Maps
                        </Button>
                      </div>
                      <div className="aspect-video relative bg-muted">
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                          <Globe className="h-12 w-12 mb-2 opacity-20" />
                          <p className="text-sm">Map preview would be displayed here</p>
                          <p className="text-xs text-muted-foreground mt-1">Using coordinates: {selectedLocation.latitude}, {selectedLocation.longitude}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-muted/20 p-4 rounded-lg border border-border space-y-4">
                      <h4 className="text-sm font-medium flex items-center gap-2 text-primary">
                        <Clock className="h-4 w-4" />
                        Activity Timeline
                      </h4>
                      <div className="space-y-3">
                        <div className="flex gap-3">
                          <div className="w-1.5 bg-primary/20 rounded-full relative flex-shrink-0">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary/60 border-2 border-background"></div>
                          </div>
                          <div className="pb-3 text-sm">
                            <p className="font-medium">Location added</p>
                            <p className="text-xs text-muted-foreground">January 15, 2023</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-1.5 bg-primary/20 rounded-full relative flex-shrink-0">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary/40 border-2 border-background"></div>
                          </div>
                          <div className="text-sm">
                            <p className="font-medium">Status updated to active</p>
                            <p className="text-xs text-muted-foreground">February 3, 2023</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-end gap-2 pt-4 border-t mt-4">
                  <Button variant="outline" onClick={() => setIsViewDetailsDialogOpen(false)}>
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      setIsViewDetailsDialogOpen(false);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Location
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Help Section */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Need help managing your shop locations? Check out our{" "}
            <a href="#" className="font-medium underline underline-offset-4">
              locations management guide
            </a>{" "}
            or{" "}
            <a href="#" className="font-medium underline underline-offset-4">
              contact support
            </a>
            .
          </AlertDescription>
        </Alert>
      </div>
    </SettingsPage>
  );
}                                                                                                               