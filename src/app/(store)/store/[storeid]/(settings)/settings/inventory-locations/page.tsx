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
  Warehouse,
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

interface InventoryLocation {
  id?: number;
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
  status?: 'active' | 'inactive' | 'maintenance';
}

export default function InventoryLocationsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [selectedLocation, setSelectedLocation] = useState<InventoryLocation | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewMapDialogOpen, setIsViewMapDialogOpen] = useState(false);
  const [isViewDetailsDialogOpen, setIsViewDetailsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const [inventoryLocations, setInventoryLocations] = useState<InventoryLocation[]>([
    {
      id: 1,
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
      placeId: "ChIJabc123...",
      formattedAddress: "123 Main St, Cityville, NY 10001, USA",
      plusCode: "XYZ+123",
      mapUrl: "https://maps.google.com/?q=40.7128,-74.0060",
      timezone: "America/New_York",
      utcOffset: -300,
      businessStatus: "OPERATIONAL",
      rating: 4.5,
      status: "active"
    },
    {
      id: 2,
      name: "Distribution Center B",
      location: "456 Park Ave, Townsville",
      latitude: "34.0522",
      longitude: "-118.2437",
      street: "456 Park Ave",
      city: "Townsville",
      state: "CA",
      country: "USA",
      postalCode: "90001",
      phoneNumber: "234-567-8901",
      email: "distribution@example.com",
      placeId: "ChIJdef456...",
      formattedAddress: "456 Park Ave, Townsville, CA 90001, USA",
      plusCode: "ABC+456",
      mapUrl: "https://maps.google.com/?q=34.0522,-118.2437",
      timezone: "America/Los_Angeles",
      utcOffset: -480,
      businessStatus: "OPERATIONAL",
      rating: 4.2,
      status: "active"
    },
    {
      id: 3,
      name: "Storage Facility C",
      location: "789 Oak St, Villagetown",
      latitude: "41.8781",
      longitude: "-87.6298",
      street: "789 Oak St",
      city: "Villagetown",
      state: "IL",
      country: "USA",
      postalCode: "60007",
      phoneNumber: "345-678-9012",
      email: "storage@example.com",
      placeId: "ChIJghi789...",
      formattedAddress: "789 Oak St, Villagetown, IL 60007, USA",
      plusCode: "DEF+789",
      mapUrl: "https://maps.google.com/?q=41.8781,-87.6298",
      timezone: "America/Chicago",
      utcOffset: -360,
      businessStatus: "TEMPORARILY_CLOSED",
      rating: 3.8,
      status: "maintenance"
    }
  ]);

  // New form state for adding/editing locations
  const [formData, setFormData] = useState<Partial<InventoryLocation>>({
    name: '',
    location: '',
    latitude: '',
    longitude: '',
    street: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    phoneNumber: '',
    email: '',
    placeId: '',
    formattedAddress: '',
    plusCode: '',
    mapUrl: '',
    timezone: '',
    utcOffset: 0,
    businessStatus: 'OPERATIONAL',
    rating: 0,
    status: 'active'
  });

  // Function to update location field based on address inputs
  const updateLocationField = (data: Partial<InventoryLocation>) => {
    if (data.street && data.city && data.state) {
      const locationValue = `${data.street}, ${data.city}, ${data.state}`;
      return { ...data, location: locationValue };
    }
    return data;
  };

  // Function to handle form field changes with location auto-update
  const handleFormChange = (field: string, value: any) => {
    let updatedData = { ...formData, [field]: value };
    
    // Auto-update location field if address components change
    if (['street', 'city', 'state'].includes(field)) {
      updatedData = updateLocationField(updatedData);
    }
    
    setFormData(updatedData);
  };

  // Reset form data function
  const resetFormData = () => {
    setFormData({
      name: '',
      location: '',
      latitude: '',
      longitude: '',
      street: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      phoneNumber: '',
      email: '',
      placeId: '',
      formattedAddress: '',
      plusCode: '',
      mapUrl: '',
      timezone: '',
      utcOffset: 0,
      businessStatus: 'OPERATIONAL',
      rating: 0,
      status: 'active'
    });
  };

  // Prepare form for editing
  const prepareEditForm = (location: InventoryLocation) => {
    setFormData({ ...location });
    setIsEditDialogOpen(true);
  };
  
  // Handle Add dialog open
  const handleAddDialogOpen = () => {
    resetFormData();
    setIsAddDialogOpen(true);
  };

  const businessStatuses = Array.from(new Set(inventoryLocations.map(loc => loc.businessStatus)));
  const timezones = [
    "America/New_York", 
    "America/Chicago", 
    "America/Denver", 
    "America/Los_Angeles", 
    "America/Phoenix", 
    "Europe/London", 
    "Europe/Paris", 
    "Asia/Tokyo", 
    "Asia/Shanghai", 
    "Australia/Sydney", 
    "Pacific/Auckland"
  ];

  const filteredLocations = inventoryLocations
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
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleAddLocation = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create formatted address if not provided
    const formattedAddressValue = formData.formattedAddress || 
      `${formData.street}, ${formData.city}, ${formData.state} ${formData.postalCode}, ${formData.country}`;
    
    // Create map URL from coordinates
    const mapUrlValue = formData.mapUrl || 
      `https://maps.google.com/?q=${formData.latitude},${formData.longitude}`;
    
    // Create new location with ID
    const newLocation: InventoryLocation = {
      ...formData as InventoryLocation,
      id: Math.max(0, ...inventoryLocations.map(loc => loc.id || 0)) + 1,
      formattedAddress: formattedAddressValue,
      mapUrl: mapUrlValue
    };
    
    // Add to locations array
    setInventoryLocations([...inventoryLocations, newLocation]);
    
    // Reset form and close dialog
    resetFormData();
    setIsAddDialogOpen(false);
  };

  const handleEditLocation = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.id) return;
    
    // Update formatted address if street/city/etc changed
    const formattedAddressValue = 
      `${formData.street}, ${formData.city}, ${formData.state} ${formData.postalCode}, ${formData.country}`;
    
    // Update map URL from coordinates
    const mapUrlValue = 
      `https://maps.google.com/?q=${formData.latitude},${formData.longitude}`;
    
    // Update location in state
    setInventoryLocations(inventoryLocations.map(loc => {
      if (loc.id === formData.id) {
        return {
          ...formData as InventoryLocation,
          formattedAddress: formattedAddressValue,
          mapUrl: mapUrlValue
        };
      }
      return loc;
    }));
    
    // Reset form and close dialog
    resetFormData();
    setIsEditDialogOpen(false);
  };

  const handleDeleteLocation = (id: number) => {
    setInventoryLocations(inventoryLocations.filter(loc => loc.id !== id));
    setIsDeleteDialogOpen(false);
  };

  // Prepare delete confirmation
  const prepareDeleteConfirmation = (location: InventoryLocation) => {
    setSelectedLocation(location);
    setIsDeleteDialogOpen(true);
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

  const handleToggleStatus = (location: InventoryLocation, isActive: boolean) => {
    // Update the status of the location in the state
    setInventoryLocations(inventoryLocations.map(loc => {
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
      title="Inventory Locations"
      description="Manage your warehouses and inventory storage facilities"
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
            onClick={handleAddDialogOpen}
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
              placeholder="Search inventory locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[200px]">
                <Building className="h-4 w-4 mr-2" />
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
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Locations List - Single Column Layout */}
        <div className="space-y-4">
          {filteredLocations.map((location) => (
            <div key={location.id} className="group relative bg-card rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-md transition-all">
              <div className="p-5">
                {/* Status Badge and Toggle - Absolute positioned */}
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
                    variant={getStatusBadgeVariant(location.status || 'inactive')} 
                    className="capitalize font-medium hidden sm:flex"
                  >
                    {location.status || 'inactive'}
                  </Badge>
                </div>
                
                {/* Location Header */}
                <div className="flex gap-4 items-center mb-4">
                  <div className="h-12 w-12 bg-gradient-to-br from-primary/20 to-primary/30 rounded-xl flex items-center justify-center text-primary shadow-sm">
                    <Warehouse className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold tracking-tight">{location.name}</h3>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-medium">{location.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm flex items-center gap-2">
                      <span className="capitalize">{getBusinessStatusText(location.businessStatus)}</span>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground inline-block"></span>
                      <span>{location.city}, {location.state}</span>
                    </p>
                  </div>
                </div>
                
                {/* Location Details */}
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
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs font-medium mb-0.5">Timezone</p>
                      <p className="font-medium">{location.timezone} (UTC {location.utcOffset >= 0 ? '+' : ''}{location.utcOffset / 60})</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Footer */}
              <div className="flex items-center justify-between px-5 py-3 border-t bg-muted/30">
                <div className="text-xs text-muted-foreground">
                  Plus Code: <span className="font-medium">{location.plusCode}</span>
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
                      prepareEditForm(location);
                    }}
                  >
                    <Edit className="h-3.5 w-3.5 mr-1.5" />
                    Edit Location
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
                        prepareEditForm(location);
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
                        onClick={() => prepareDeleteConfirmation(location)}
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
                <Warehouse className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No inventory locations found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Try adjusting your search filters, or add a new inventory location to your network.
              </p>
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
                className="px-6"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Inventory Location
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
                  <DialogTitle className="flex items-center gap-2">
                    <Warehouse className="h-5 w-5 text-primary" />
                    {selectedLocation.name}
                  </DialogTitle>
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
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Google Maps Plus Code:</div>
                    <div className="text-sm bg-muted px-3 py-1 rounded-md font-mono">{selectedLocation.plusCode}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(selectedLocation.mapUrl, '_blank')}
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      Open in Maps
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        setIsViewMapDialogOpen(false);
                        setIsViewDetailsDialogOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </>
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
                        <Warehouse className="h-5 w-5" />
                      </div>
                      <div>
                        <DialogTitle className="text-2xl">{selectedLocation.name}</DialogTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center text-amber-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-sm font-medium ml-1">{selectedLocation.rating.toFixed(1)}</span>
                          </div>
                          <Badge variant={getStatusBadgeVariant(selectedLocation.status || 'inactive')} className="capitalize">
                            {selectedLocation.status || 'inactive'}
                          </Badge>
                        </div>
                      </div>
                    </div>
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
                        <div>
                          <p className="text-xs text-muted-foreground mb-0.5">Place ID</p>
                          <p className="font-medium text-xs font-mono truncate">{selectedLocation.placeId}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-muted/20 p-4 rounded-lg border border-border space-y-3">
                      <h4 className="text-sm font-medium flex items-center gap-2 text-primary">
                        <Clock className="h-4 w-4" />
                        Time Information
                      </h4>
                      <div className="pl-1 space-y-2">
                        <div>
                          <p className="text-xs text-muted-foreground mb-0.5">Timezone</p>
                          <p className="font-medium">{selectedLocation.timezone}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-0.5">UTC Offset</p>
                          <p className="font-medium">UTC {selectedLocation.utcOffset >= 0 ? '+' : ''}{selectedLocation.utcOffset / 60} hours</p>
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
                          onClick={() => window.open(selectedLocation.mapUrl, '_blank')}
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
                        <div className="col-span-2">
                          <p className="text-xs text-muted-foreground mb-0.5">Plus Code</p>
                          <p className="font-medium font-mono">{selectedLocation.plusCode}</p>
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
                      prepareEditForm(selectedLocation!);
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

        {/* Edit Location Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Edit className="h-5 w-5 text-primary" />
                Edit Inventory Location
              </DialogTitle>
              <DialogDescription>
                Update the details of your inventory location.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditLocation} className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Basic Information */}
                  <div className="space-y-2 md:col-span-2">
                    <h3 className="text-sm font-medium flex items-center gap-2 text-primary">
                      <Info className="h-4 w-4" />
                      Basic Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-name">Location Name *</Label>
                        <Input 
                          id="edit-name" 
                          value={formData.name || ''}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-status">Status</Label>
                        <Select 
                          value={formData.status} 
                          onValueChange={(value: 'active' | 'inactive' | 'maintenance') => 
                            setFormData({...formData, status: value})}
                        >
                          <SelectTrigger id="edit-status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-business-status">Business Status</Label>
                        <Select 
                          value={formData.businessStatus} 
                          onValueChange={(value) => setFormData({...formData, businessStatus: value})}
                        >
                          <SelectTrigger id="edit-business-status">
                            <SelectValue placeholder="Select business status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="OPERATIONAL">Operational</SelectItem>
                            <SelectItem value="TEMPORARILY_CLOSED">Temporarily Closed</SelectItem>
                            <SelectItem value="PERMANENTLY_CLOSED">Permanently Closed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-rating">Rating (0-5)</Label>
                        <Input 
                          id="edit-rating" 
                          type="number"
                          min="0"
                          max="5"
                          step="0.1"
                          value={formData.rating || 0}
                          onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Location Information */}
                  <div className="space-y-2 md:col-span-2">
                    <h3 className="text-sm font-medium flex items-center gap-2 text-primary">
                      <MapPin className="h-4 w-4" />
                      Location Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-street">Street Address *</Label>
                        <Input 
                          id="edit-street" 
                          value={formData.street || ''}
                          onChange={(e) => handleFormChange('street', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-city">City *</Label>
                        <Input 
                          id="edit-city" 
                          value={formData.city || ''}
                          onChange={(e) => handleFormChange('city', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-state">State/Region *</Label>
                        <Input 
                          id="edit-state" 
                          value={formData.state || ''}
                          onChange={(e) => handleFormChange('state', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-postal">Postal Code *</Label>
                        <Input 
                          id="edit-postal" 
                          value={formData.postalCode || ''}
                          onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-country">Country *</Label>
                        <Input 
                          id="edit-country" 
                          value={formData.country || ''}
                          onChange={(e) => setFormData({...formData, country: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-plus-code">Plus Code</Label>
                        <Input 
                          id="edit-plus-code" 
                          value={formData.plusCode || ''}
                          onChange={(e) => setFormData({...formData, plusCode: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-place-id">Place ID</Label>
                        <Input 
                          id="edit-place-id" 
                          value={formData.placeId || ''}
                          onChange={(e) => setFormData({...formData, placeId: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Contact Information */}
                  <div className="space-y-2 md:col-span-2">
                    <h3 className="text-sm font-medium flex items-center gap-2 text-primary">
                      <Phone className="h-4 w-4" />
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-phone">Phone Number *</Label>
                        <Input 
                          id="edit-phone" 
                          value={formData.phoneNumber || ''}
                          onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-email">Email Address *</Label>
                        <Input 
                          id="edit-email" 
                          type="email"
                          value={formData.email || ''}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Map Information */}
                  <div className="space-y-2 md:col-span-2">
                    <h3 className="text-sm font-medium flex items-center gap-2 text-primary">
                      <Map className="h-4 w-4" />
                      Geographic Coordinates
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-latitude">Latitude *</Label>
                        <Input 
                          id="edit-latitude" 
                          value={formData.latitude || ''}
                          onChange={(e) => setFormData({...formData, latitude: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-longitude">Longitude *</Label>
                        <Input 
                          id="edit-longitude" 
                          value={formData.longitude || ''}
                          onChange={(e) => setFormData({...formData, longitude: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Time Information */}
                  <div className="space-y-2 md:col-span-2">
                    <h3 className="text-sm font-medium flex items-center gap-2 text-primary">
                      <Clock className="h-4 w-4" />
                      Time Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-timezone">Timezone</Label>
                        <Select 
                          value={formData.timezone || ''} 
                          onValueChange={(value) => setFormData({...formData, timezone: value})}
                        >
                          <SelectTrigger id="edit-timezone">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            {timezones.map(tz => (
                              <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-utc-offset">UTC Offset (minutes)</Label>
                        <Input 
                          id="edit-utc-offset" 
                          type="number"
                          step="30"
                          value={formData.utcOffset || 0}
                          onChange={(e) => setFormData({...formData, utcOffset: parseInt(e.target.value)})}
                        />
                        <p className="text-xs text-muted-foreground">
                          Examples: -300 (UTC-5), 60 (UTC+1), 330 (UTC+5:30)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    resetFormData();
                    setIsEditDialogOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Add Location Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                Add New Inventory Location
              </DialogTitle>
              <DialogDescription>
                Add details about your new warehouse or inventory storage location.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddLocation} className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Basic Information */}
                  <div className="space-y-2 md:col-span-2">
                    <h3 className="text-sm font-medium flex items-center gap-2 text-primary">
                      <Info className="h-4 w-4" />
                      Basic Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="add-name">Location Name *</Label>
                        <Input 
                          id="add-name" 
                          value={formData.name || ''}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Warehouse A"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="add-status">Status</Label>
                        <Select 
                          value={formData.status} 
                          onValueChange={(value: 'active' | 'inactive' | 'maintenance') => 
                            setFormData({...formData, status: value})}
                        >
                          <SelectTrigger id="add-status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="add-business-status">Business Status</Label>
                        <Select 
                          value={formData.businessStatus} 
                          onValueChange={(value) => setFormData({...formData, businessStatus: value})}
                        >
                          <SelectTrigger id="add-business-status">
                            <SelectValue placeholder="Select business status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="OPERATIONAL">Operational</SelectItem>
                            <SelectItem value="TEMPORARILY_CLOSED">Temporarily Closed</SelectItem>
                            <SelectItem value="PERMANENTLY_CLOSED">Permanently Closed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="add-rating">Rating (0-5)</Label>
                        <Input 
                          id="add-rating" 
                          type="number"
                          min="0"
                          max="5"
                          step="0.1"
                          value={formData.rating || 0}
                          onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Location Information */}
                  <div className="space-y-2 md:col-span-2">
                    <h3 className="text-sm font-medium flex items-center gap-2 text-primary">
                      <MapPin className="h-4 w-4" />
                      Location Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="add-street">Street Address *</Label>
                        <Input 
                          id="add-street" 
                          value={formData.street || ''}
                          onChange={(e) => handleFormChange('street', e.target.value)}
                          placeholder="123 Main St"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="add-city">City *</Label>
                        <Input 
                          id="add-city" 
                          value={formData.city || ''}
                          onChange={(e) => handleFormChange('city', e.target.value)}
                          placeholder="Cityville"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="add-state">State/Region *</Label>
                        <Input 
                          id="add-state" 
                          value={formData.state || ''}
                          onChange={(e) => handleFormChange('state', e.target.value)}
                          placeholder="NY"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="add-postal">Postal Code *</Label>
                        <Input 
                          id="add-postal" 
                          value={formData.postalCode || ''}
                          onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                          placeholder="10001"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="add-country">Country *</Label>
                        <Input 
                          id="add-country" 
                          value={formData.country || ''}
                          onChange={(e) => setFormData({...formData, country: e.target.value})}
                          placeholder="USA"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="add-plus-code">Plus Code</Label>
                        <Input 
                          id="add-plus-code" 
                          value={formData.plusCode || ''}
                          onChange={(e) => setFormData({...formData, plusCode: e.target.value})}
                          placeholder="XYZ+123"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="add-place-id">Place ID</Label>
                        <Input 
                          id="add-place-id" 
                          value={formData.placeId || ''}
                          onChange={(e) => setFormData({...formData, placeId: e.target.value})}
                          placeholder="ChIJabc123..."
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Contact Information */}
                  <div className="space-y-2 md:col-span-2">
                    <h3 className="text-sm font-medium flex items-center gap-2 text-primary">
                      <Phone className="h-4 w-4" />
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="add-phone">Phone Number *</Label>
                        <Input 
                          id="add-phone" 
                          value={formData.phoneNumber || ''}
                          onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                          placeholder="123-456-7890"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="add-email">Email Address *</Label>
                        <Input 
                          id="add-email" 
                          type="email"
                          value={formData.email || ''}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="warehouse@example.com"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Map Information */}
                  <div className="space-y-2 md:col-span-2">
                    <h3 className="text-sm font-medium flex items-center gap-2 text-primary">
                      <Map className="h-4 w-4" />
                      Geographic Coordinates
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="add-latitude">Latitude *</Label>
                        <Input 
                          id="add-latitude" 
                          value={formData.latitude || ''}
                          onChange={(e) => setFormData({...formData, latitude: e.target.value})}
                          placeholder="40.7128"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="add-longitude">Longitude *</Label>
                        <Input 
                          id="add-longitude" 
                          value={formData.longitude || ''}
                          onChange={(e) => setFormData({...formData, longitude: e.target.value})}
                          placeholder="-74.0060"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Time Information */}
                  <div className="space-y-2 md:col-span-2">
                    <h3 className="text-sm font-medium flex items-center gap-2 text-primary">
                      <Clock className="h-4 w-4" />
                      Time Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="add-timezone">Timezone</Label>
                        <Select 
                          value={formData.timezone || ''} 
                          onValueChange={(value) => setFormData({...formData, timezone: value})}
                        >
                          <SelectTrigger id="add-timezone">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            {timezones.map(tz => (
                              <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="add-utc-offset">UTC Offset (minutes)</Label>
                        <Input 
                          id="add-utc-offset" 
                          type="number"
                          step="30"
                          value={formData.utcOffset || 0}
                          onChange={(e) => setFormData({...formData, utcOffset: parseInt(e.target.value)})}
                          placeholder="-300"
                        />
                        <p className="text-xs text-muted-foreground">
                          Examples: -300 (UTC-5), 60 (UTC+1), 330 (UTC+5:30)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    resetFormData();
                    setIsAddDialogOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Location</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-destructive">
                <Trash2 className="h-5 w-5" />
                Delete Inventory Location
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this inventory location? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            
            {selectedLocation && (
              <div className="bg-muted/30 border rounded-md p-4 mb-4">
                <h4 className="font-medium mb-2">{selectedLocation.name}</h4>
                <p className="text-sm text-muted-foreground mb-1">{selectedLocation.formattedAddress}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={getStatusBadgeVariant(selectedLocation.status || 'inactive')} className="capitalize">
                    {selectedLocation.status || 'inactive'}
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    ID: {selectedLocation.id}
                  </div>
                </div>
              </div>
            )}
            
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={() => selectedLocation && handleDeleteLocation(selectedLocation.id as number)}
              >
                Delete Location
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Help Section */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Need help managing your inventory locations? Check out our{" "}
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
    </SettingsPage>
  );
} 