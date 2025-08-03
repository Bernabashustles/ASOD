'use client';

import React, { useState } from 'react';
import { 
  Store, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  Edit2, 
  Plus,
  Search,
  MoreHorizontal,
  Building2,
  Save,
  SlidersHorizontal,
  Filter,
  SortAsc,
  SortDesc,
  Map,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronDown,
  Download,
  Activity,
  Badge,
  SortDesc as SortDescIcon,
  RefreshCw
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
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
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

interface Shop {
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
  status: 'active' | 'inactive';
  openingHours: string;
  lastUpdated: string;
}

const shopsData: Shop[] = [
  {
    name: "Central Shop",
    location: "456 Market Street, Metropolis, USA",
    latitude: "40.7128",
    longitude: "74.0060",
    street: "456 Market Street",
    city: "Metropolis",
    state: "NY",
    country: "USA",
    postalCode: "10001",
    phoneNumber: "123-456-7890",
    email: "info@centralshop.com",
    placeId: "ChIJd8BlQ2BZwokRAFUEcm_qrcA",
    formattedAddress: "456 Market St, Metropolis, NY 10001, USA",
    plusCode: "87G8+P2",
    mapUrl: "https://maps.google.com/?q=456+Market+Street",
    status: 'active',
    openingHours: '9:00 AM - 6:00 PM',
    lastUpdated: '2024-03-15'
  },
  {
    name: "Downtown Branch",
    location: "789 Main Avenue, Gotham, USA",
    latitude: "40.7589",
    longitude: "73.9851",
    street: "789 Main Avenue",
    city: "Gotham",
    state: "NY",
    country: "USA",
    postalCode: "10002",
    phoneNumber: "123-555-7890",
    email: "downtown@centralshop.com",
    placeId: "ChIJd8BlQ2BZwokRAFUEcm_qrcB",
    formattedAddress: "789 Main Ave, Gotham, NY 10002, USA",
    plusCode: "87G8+P3",
    mapUrl: "https://maps.google.com/?q=789+Main+Avenue",
    status: 'active',
    openingHours: '9:00 AM - 6:00 PM',
    lastUpdated: '2024-03-15'
  },
  {
    name: "Harbor Store",
    location: "321 Port Road, Star City, USA",
    latitude: "41.7128",
    longitude: "75.0060",
    street: "321 Port Road",
    city: "Star City",
    state: "CA",
    country: "USA",
    postalCode: "90001",
    phoneNumber: "123-777-7890",
    email: "harbor@centralshop.com",
    placeId: "ChIJd8BlQ2BZwokRAFUEcm_qrcC",
    formattedAddress: "321 Port Road, Star City, CA 90001, USA",
    plusCode: "87G8+P4",
    mapUrl: "https://maps.google.com/?q=321+Port+Road",
    status: 'active',
    openingHours: '9:00 AM - 6:00 PM',
    lastUpdated: '2024-03-15'
  },
  {
    name: "Tech Hub",
    location: "555 Innovation Drive, Central City, USA",
    latitude: "37.7749",
    longitude: "122.4194",
    street: "555 Innovation Drive",
    city: "Central City",
    state: "CA",
    country: "USA",
    postalCode: "90002",
    phoneNumber: "123-888-7890",
    email: "tech@centralshop.com",
    placeId: "ChIJd8BlQ2BZwokRAFUEcm_qrcD",
    formattedAddress: "555 Innovation Drive, Central City, CA 90002, USA",
    plusCode: "87G8+P5",
    mapUrl: "https://maps.google.com/?q=555+Innovation+Drive",
    status: 'active',
    openingHours: '9:00 AM - 6:00 PM',
    lastUpdated: '2024-03-15'
  }
];

interface ShopDetailsProps {
  shop: Shop;
  onClose: () => void;
}

const ShopDetails: React.FC<ShopDetailsProps> = ({ shop, onClose }) => {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Store className="w-5 h-5" />
            {shop.name}
          </DialogTitle>
          <DialogDescription>{shop.location}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Location Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Street</Label>
                  <p className="mt-1">{shop.street}</p>
                </div>
                <div>
                  <Label>City</Label>
                  <p className="mt-1">{shop.city}</p>
                </div>
                <div>
                  <Label>State</Label>
                  <p className="mt-1">{shop.state}</p>
                </div>
                <div>
                  <Label>Country</Label>
                  <p className="mt-1">{shop.country}</p>
                </div>
                <div>
                  <Label>Postal Code</Label>
                  <p className="mt-1">{shop.postalCode}</p>
                </div>
                <div>
                  <Label>Plus Code</Label>
                  <p className="mt-1">{shop.plusCode}</p>
                </div>
              </div>

              <div>
                <Label>Coordinates</Label>
                <div className="mt-1 grid grid-cols-2 gap-4">
                  <p>Latitude: {shop.latitude}</p>
                  <p>Longitude: {shop.longitude}</p>
                </div>
              </div>

              <div>
                <Label>Place ID</Label>
                <p className="mt-1">{shop.placeId}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Phone Number</Label>
                  <p className="mt-1 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {shop.phoneNumber}
                  </p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="mt-1 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {shop.email}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button 
            className="w-full"
            onClick={() => window.open(shop.mapUrl, '_blank')}
          >
            <Globe className="w-4 h-4 mr-2" />
            View on Google Maps
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const GOOGLE_MAPS_API_KEY = "AQ.Ab8RN6KDuTnnmPXhQ_YESrGXTwbmYlZ-TJe3VWYap-l5kuv6wA";

interface EditShopProps {
  shop: Shop;
  onClose: () => void;
  onSave: (updatedShop: Shop) => void;
}

const EditShop: React.FC<EditShopProps> = ({ shop, onClose, onSave }) => {
  const [editedShop, setEditedShop] = useState<Shop>(shop);
  const [activeTab, setActiveTab] = useState("basic");
  const [isMapPreviewOpen, setIsMapPreviewOpen] = useState(false);
  const [showAddressPreview, setShowAddressPreview] = useState(false);
  const [mapError, setMapError] = useState(false);

  const handleSave = () => {
    const formattedAddress = `${editedShop.street}, ${editedShop.city}, ${editedShop.state} ${editedShop.postalCode}, ${editedShop.country}`;
    const location = `${editedShop.street}, ${editedShop.city}, ${editedShop.country}`;
    const mapUrl = `https://maps.google.com/?q=${encodeURIComponent(formattedAddress)}`;

    onSave({
      ...editedShop,
      formattedAddress,
      location,
      mapUrl
    });
    onClose();
  };

  const handleAddressChange = (field: keyof Shop, value: string) => {
    setEditedShop(prev => {
      const updated = { ...prev, [field]: value };
      return updated;
    });
  };

  const validateForm = () => {
    const required = [
      'name', 'street', 'city', 'state', 'country',
      'postalCode', 'phoneNumber', 'email'
    ];
    return required.every(field => editedShop[field as keyof Shop]);
  };

  const getAddressPreview = () => {
    const formattedAddress = `${editedShop.street}, ${editedShop.city}, ${editedShop.state} ${editedShop.postalCode}, ${editedShop.country}`;
    return formattedAddress;
  };

  const getMapUrl = () => {
    if (!editedShop.latitude || !editedShop.longitude) {
      return `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(getAddressPreview())}`;
    }
    return `https://www.google.com/maps/embed/v1/view?key=${GOOGLE_MAPS_API_KEY}&center=${editedShop.latitude},${editedShop.longitude}&zoom=18&maptype=roadmap`;
  };

  const handleMapError = () => {
    setMapError(true);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit2 className="w-5 h-5" />
            Edit Shop: {shop.name}
          </DialogTitle>
          <DialogDescription>
            Make changes to your shop information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="basic" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Store className="w-4 h-4 mr-2" />
                Basic Info
              </TabsTrigger>
              <TabsTrigger value="location" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <MapPin className="w-4 h-4 mr-2" />
                Location
              </TabsTrigger>
              <TabsTrigger value="contact" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Phone className="w-4 h-4 mr-2" />
                Contact
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 mt-4 border rounded-lg p-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-base font-semibold">Shop Name *</Label>
                  <Input
                    id="name"
                    value={editedShop.name}
                    onChange={(e) => handleAddressChange('name', e.target.value)}
                    className="mt-1"
                    placeholder="Enter shop name"
                  />
                </div>

                <div>
                  <Label htmlFor="placeId" className="text-base font-semibold">Place ID</Label>
                  <Input
                    id="placeId"
                    value={editedShop.placeId}
                    onChange={(e) => handleAddressChange('placeId', e.target.value)}
                    className="mt-1"
                    placeholder="Google Maps Place ID"
                  />
                  <p className="text-sm text-gray-500 mt-1">Unique identifier for this location on Google Maps</p>
                </div>

                <div>
                  <Label htmlFor="plusCode" className="text-base font-semibold">Plus Code</Label>
                  <Input
                    id="plusCode"
                    value={editedShop.plusCode}
                    onChange={(e) => handleAddressChange('plusCode', e.target.value)}
                    className="mt-1"
                    placeholder="Google Maps Plus Code"
                  />
                  <p className="text-sm text-gray-500 mt-1">Short code for this location (e.g., "87G8+P2")</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="location" className="space-y-4 mt-4 border rounded-lg p-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="street" className="text-base font-semibold">Street Address *</Label>
                    <Input
                      id="street"
                      value={editedShop.street}
                      onChange={(e) => {
                        handleAddressChange('street', e.target.value);
                        setShowAddressPreview(true);
                      }}
                      className="mt-1"
                      placeholder="Street address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city" className="text-base font-semibold">City *</Label>
                    <Input
                      id="city"
                      value={editedShop.city}
                      onChange={(e) => {
                        handleAddressChange('city', e.target.value);
                        setShowAddressPreview(true);
                      }}
                      className="mt-1"
                      placeholder="City name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="state" className="text-base font-semibold">State *</Label>
                    <Input
                      id="state"
                      value={editedShop.state}
                      onChange={(e) => {
                        handleAddressChange('state', e.target.value);
                        setShowAddressPreview(true);
                      }}
                      className="mt-1"
                      placeholder="State"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country" className="text-base font-semibold">Country *</Label>
                    <Input
                      id="country"
                      value={editedShop.country}
                      onChange={(e) => {
                        handleAddressChange('country', e.target.value);
                        setShowAddressPreview(true);
                      }}
                      className="mt-1"
                      placeholder="Country"
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode" className="text-base font-semibold">Postal Code *</Label>
                    <Input
                      id="postalCode"
                      value={editedShop.postalCode}
                      onChange={(e) => {
                        handleAddressChange('postalCode', e.target.value);
                        setShowAddressPreview(true);
                      }}
                      className="mt-1"
                      placeholder="Postal code"
                    />
                  </div>
                </div>

                {showAddressPreview && (
                  <div className="bg-muted p-4 rounded-lg mt-4">
                    <Label className="text-base font-semibold">Address Preview</Label>
                    <p className="mt-1 text-sm">{getAddressPreview()}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="latitude" className="text-base font-semibold">Latitude</Label>
                    <Input
                      id="latitude"
                      value={editedShop.latitude}
                      onChange={(e) => handleAddressChange('latitude', e.target.value)}
                      className="mt-1"
                      placeholder="Latitude coordinate"
                    />
                  </div>
                  <div>
                    <Label htmlFor="longitude" className="text-base font-semibold">Longitude</Label>
                    <Input
                      id="longitude"
                      value={editedShop.longitude}
                      onChange={(e) => handleAddressChange('longitude', e.target.value)}
                      className="mt-1"
                      placeholder="Longitude coordinate"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setIsMapPreviewOpen(true)}
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Preview Location on Map
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4 mt-4 border rounded-lg p-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phoneNumber" className="text-base font-semibold">Phone Number *</Label>
                    <Input
                      id="phoneNumber"
                      value={editedShop.phoneNumber}
                      onChange={(e) => handleAddressChange('phoneNumber', e.target.value)}
                      className="mt-1"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-base font-semibold">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editedShop.email}
                      onChange={(e) => handleAddressChange('email', e.target.value)}
                      className="mt-1"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                {!validateForm() && (
                  <p className="text-sm text-red-500">
                    * Required fields must be filled
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave} 
                  disabled={!validateForm()}
                  className="bg-primary"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogFooter>
        </div>

        {isMapPreviewOpen && (
          <Dialog open onOpenChange={() => setIsMapPreviewOpen(false)}>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Location Preview</DialogTitle>
                <DialogDescription>
                  {getAddressPreview()}
                </DialogDescription>
              </DialogHeader>
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
              <DialogFooter className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  {editedShop.latitude && editedShop.longitude ? (
                    <span>Coordinates: {editedShop.latitude}, {editedShop.longitude}</span>
                  ) : (
                    <span>Using address for location preview</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(getAddressPreview())}`, '_blank')}
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Open in Google Maps
                  </Button>
                  <Button onClick={() => setIsMapPreviewOpen(false)}>
                    Close Preview
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  );
};

interface CreateShopProps {
  onClose: () => void;
  onSave: (newShop: Shop) => void;
}

const CreateShop: React.FC<CreateShopProps> = ({ onClose, onSave }) => {
  const [newShop, setNewShop] = useState<Shop>({
    name: "",
    location: "",
    latitude: "",
    longitude: "",
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    phoneNumber: "",
    email: "",
    placeId: "",
    formattedAddress: "",
    plusCode: "",
    mapUrl: "",
    status: 'active',
    openingHours: '',
    lastUpdated: ''
  });
  const [activeTab, setActiveTab] = useState("basic");
  const [isMapPreviewOpen, setIsMapPreviewOpen] = useState(false);
  const [showAddressPreview, setShowAddressPreview] = useState(false);
  const [mapError, setMapError] = useState(false);

  const handleSave = () => {
    const formattedAddress = `${newShop.street}, ${newShop.city}, ${newShop.state} ${newShop.postalCode}, ${newShop.country}`;
    const location = `${newShop.street}, ${newShop.city}, ${newShop.country}`;
    const mapUrl = `https://maps.google.com/?q=${encodeURIComponent(formattedAddress)}`;
    
    onSave({
      ...newShop,
      formattedAddress,
      location,
      mapUrl
    });
    onClose();
  };

  const handleChange = (field: keyof Shop, value: string) => {
    setNewShop(prev => {
      const updated = { ...prev, [field]: value };
      return updated;
    });
  };

  const validateForm = () => {
    const required = [
      'name', 'street', 'city', 'state', 'country',
      'postalCode', 'phoneNumber', 'email'
    ];
    return required.every(field => newShop[field as keyof Shop]);
  };

  const getAddressPreview = () => {
    const formattedAddress = `${newShop.street}, ${newShop.city}, ${newShop.state} ${newShop.postalCode}, ${newShop.country}`;
    return formattedAddress;
  };

  const getMapUrl = () => {
    if (!newShop.latitude || !newShop.longitude) {
      return `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(getAddressPreview())}`;
    }
    return `https://www.google.com/maps/embed/v1/view?key=${GOOGLE_MAPS_API_KEY}&center=${newShop.latitude},${newShop.longitude}&zoom=18&maptype=roadmap`;
  };

  const handleMapError = () => {
    setMapError(true);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create New Shop
          </DialogTitle>
          <DialogDescription>
            Enter the details for your new shop location
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="basic" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Store className="w-4 h-4 mr-2" />
                Basic Info
              </TabsTrigger>
              <TabsTrigger value="location" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <MapPin className="w-4 h-4 mr-2" />
                Location
              </TabsTrigger>
              <TabsTrigger value="contact" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Phone className="w-4 h-4 mr-2" />
                Contact
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 mt-4 border rounded-lg p-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-base font-semibold">Shop Name *</Label>
                  <Input
                    id="name"
                    value={newShop.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="mt-1"
                    placeholder="Enter shop name"
                  />
                </div>

                <div>
                  <Label htmlFor="placeId" className="text-base font-semibold">Place ID</Label>
                  <Input
                    id="placeId"
                    value={newShop.placeId}
                    onChange={(e) => handleChange('placeId', e.target.value)}
                    className="mt-1"
                    placeholder="Google Maps Place ID"
                  />
                  <p className="text-sm text-gray-500 mt-1">Unique identifier for this location on Google Maps</p>
                </div>

                <div>
                  <Label htmlFor="plusCode" className="text-base font-semibold">Plus Code</Label>
                  <Input
                    id="plusCode"
                    value={newShop.plusCode}
                    onChange={(e) => handleChange('plusCode', e.target.value)}
                    className="mt-1"
                    placeholder="Google Maps Plus Code"
                  />
                  <p className="text-sm text-gray-500 mt-1">Short code for this location (e.g., "87G8+P2")</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="location" className="space-y-4 mt-4 border rounded-lg p-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="street" className="text-base font-semibold">Street Address *</Label>
                    <Input
                      id="street"
                      value={newShop.street}
                      onChange={(e) => {
                        handleChange('street', e.target.value);
                        setShowAddressPreview(true);
                      }}
                      className="mt-1"
                      placeholder="Street address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city" className="text-base font-semibold">City *</Label>
                    <Input
                      id="city"
                      value={newShop.city}
                      onChange={(e) => {
                        handleChange('city', e.target.value);
                        setShowAddressPreview(true);
                      }}
                      className="mt-1"
                      placeholder="City name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="state" className="text-base font-semibold">State *</Label>
                    <Input
                      id="state"
                      value={newShop.state}
                      onChange={(e) => {
                        handleChange('state', e.target.value);
                        setShowAddressPreview(true);
                      }}
                      className="mt-1"
                      placeholder="State"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country" className="text-base font-semibold">Country *</Label>
                    <Input
                      id="country"
                      value={newShop.country}
                      onChange={(e) => {
                        handleChange('country', e.target.value);
                        setShowAddressPreview(true);
                      }}
                      className="mt-1"
                      placeholder="Country"
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode" className="text-base font-semibold">Postal Code *</Label>
                    <Input
                      id="postalCode"
                      value={newShop.postalCode}
                      onChange={(e) => {
                        handleChange('postalCode', e.target.value);
                        setShowAddressPreview(true);
                      }}
                      className="mt-1"
                      placeholder="Postal code"
                    />
                  </div>
                </div>

                {showAddressPreview && (
                  <div className="bg-muted p-4 rounded-lg mt-4">
                    <Label className="text-base font-semibold">Address Preview</Label>
                    <p className="mt-1 text-sm">{getAddressPreview()}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="latitude" className="text-base font-semibold">Latitude</Label>
                    <Input
                      id="latitude"
                      value={newShop.latitude}
                      onChange={(e) => handleChange('latitude', e.target.value)}
                      className="mt-1"
                      placeholder="Latitude coordinate"
                    />
                  </div>
                  <div>
                    <Label htmlFor="longitude" className="text-base font-semibold">Longitude</Label>
                    <Input
                      id="longitude"
                      value={newShop.longitude}
                      onChange={(e) => handleChange('longitude', e.target.value)}
                      className="mt-1"
                      placeholder="Longitude coordinate"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setIsMapPreviewOpen(true)}
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Preview Location on Map
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4 mt-4 border rounded-lg p-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phoneNumber" className="text-base font-semibold">Phone Number *</Label>
                    <Input
                      id="phoneNumber"
                      value={newShop.phoneNumber}
                      onChange={(e) => handleChange('phoneNumber', e.target.value)}
                      className="mt-1"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-base font-semibold">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newShop.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="mt-1"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                {!validateForm() && (
                  <p className="text-sm text-red-500">
                    * Required fields must be filled
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave} 
                  disabled={!validateForm()}
                  className="bg-primary"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Create Shop
                </Button>
              </div>
            </div>
          </DialogFooter>
        </div>

        {isMapPreviewOpen && (
          <Dialog open onOpenChange={() => setIsMapPreviewOpen(false)}>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Location Preview</DialogTitle>
                <DialogDescription>
                  {getAddressPreview()}
                </DialogDescription>
              </DialogHeader>
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
              <DialogFooter className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  {newShop.latitude && newShop.longitude ? (
                    <span>Coordinates: {newShop.latitude}, {newShop.longitude}</span>
                  ) : (
                    <span>Using address for location preview</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(getAddressPreview())}`, '_blank')}
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Open in Google Maps
                  </Button>
                  <Button onClick={() => setIsMapPreviewOpen(false)}>
                    Close Preview
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default function ShopsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [editingShop, setEditingShop] = useState<Shop | null>(null);
  const [showCreateShop, setShowCreateShop] = useState(false);
  const [mapPreviewShop, setMapPreviewShop] = useState<Shop | null>(null);
  const [mapError, setMapError] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    country: 'all',
    state: 'all',
    city: 'all'
  });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Get unique values for filters
  const countries = Array.from(new Set(shopsData.map(shop => shop.country)));
  const states = Array.from(new Set(shopsData.map(shop => shop.state)));
  const cities = Array.from(new Set(shopsData.map(shop => shop.city)));

  // Filter and sort shops
  let filteredShops = shopsData.filter(shop => {
    const matchesSearch = 
      shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filters.status === 'all' || shop.status === filters.status;
    const matchesCountry = filters.country === 'all' || shop.country === filters.country;
    const matchesState = filters.state === 'all' || shop.state === filters.state;
    const matchesCity = filters.city === 'all' || shop.city === filters.city;

    return matchesSearch && matchesStatus && matchesCountry && matchesState && matchesCity;
  });

  // Sort shops
  filteredShops.sort((a, b) => {
    const aValue = a[sortBy as keyof Shop];
    const bValue = b[sortBy as keyof Shop];
    return sortOrder === 'asc' 
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  const handleSaveShop = (updatedShop: Shop) => {
    console.log('Saving shop:', updatedShop);
    setEditingShop(null);
  };

  const handleCreateShop = (newShop: Shop) => {
    console.log('Creating new shop:', newShop);
    setShowCreateShop(false);
  };

  const getMapUrl = (shop: Shop) => {
    if (!shop.latitude || !shop.longitude) {
      return `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(shop.formattedAddress)}`;
    }
    return `https://www.google.com/maps/embed/v1/view?key=${GOOGLE_MAPS_API_KEY}&center=${shop.latitude},${shop.longitude}&zoom=18&maptype=roadmap`;
  };

  const handleMapError = () => {
    setMapError(true);
  };

  return (
    <div className="space-y-6 p-6 sm:px-8 lg:px-12 xl:px-32 py-8 max-w-[1600px] mx-auto">
      {/* Enhanced Header Section */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 sm:items-center">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Shop Management
            </h1>
            <p className="text-sm text-muted-foreground">Manage your retail shop locations with ease</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button 
              variant="outline"
              className="flex-1 sm:flex-none flex items-center gap-2 border-dashed"
              onClick={() => window.print()}
            >
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button 
              className="flex-1 sm:flex-none flex items-center gap-2 bg-primary hover:bg-primary/90 transition-colors duration-200"
              onClick={() => setShowCreateShop(true)}
            >
              <Plus className="w-4 h-4" />
              Add New Shop
            </Button>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 border-muted-foreground/20 hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-full bg-primary/10">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Shops</p>
                <p className="text-2xl font-bold">{filteredShops.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-muted-foreground/20 hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-full bg-green-500/10">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Shops</p>
                <p className="text-2xl font-bold">{filteredShops.filter(shop => shop.status === 'active').length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-muted-foreground/20 hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-full bg-red-500/10">
                <XCircle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Inactive Shops</p>
                <p className="text-2xl font-bold">{filteredShops.filter(shop => shop.status === 'inactive').length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-muted-foreground/20 hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-full bg-blue-500/10">
                <Map className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Countries</p>
                <p className="text-2xl font-bold">{new Set(filteredShops.map(shop => shop.country)).size}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Enhanced Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search shops by name or location..."
              className="pl-12 h-12 text-base shadow-sm border-muted-foreground/20 focus:border-primary/50 transition-colors duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="h-12 px-4 flex items-center gap-2 border-muted-foreground/20 hover:bg-muted/50"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4" />
              Filters
              <div className="ml-2 bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-xs">
                {Object.values(filters).filter(value => value !== 'all').length}
              </div>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="h-12 px-4 flex items-center gap-2 border-muted-foreground/20 hover:bg-muted/50"
                >
                  {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 border-muted-foreground/20">
                <DropdownMenuItem 
                  onClick={() => setSortBy('name')}
                  className="cursor-pointer"
                >
                  <Store className="w-4 h-4 mr-2" />
                  Name
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setSortBy('city')}
                  className="cursor-pointer"
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  City
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setSortBy('status')}
                  className="cursor-pointer"
                >
                  <Activity className="w-4 h-4 mr-2" />
                  Status
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setSortBy('lastUpdated')}
                  className="cursor-pointer"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Last Updated
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                  className="cursor-pointer"
                >
                  {sortOrder === 'asc' ? <SortDesc className="w-4 h-4 mr-2" /> : <SortAsc className="w-4 h-4 mr-2" />}
                  {sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Existing filter card with enhanced styling */}
        {showFilters && (
          <Card className="p-6 border-muted-foreground/20 shadow-md animate-in fade-in-50 duration-300">
            <div className="flex flex-col space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-primary" />
                  <h3 className="font-medium text-lg">Filter Shops</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setFilters({status: 'all', country: 'all', state: 'all', city: 'all'})}
                  className="text-xs h-8 hover:bg-muted/50"
                >
                  Reset Filters
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label className="flex items-center gap-1.5 text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4 text-primary/70" />
                    Status
                  </Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full h-11 flex items-center justify-between bg-background shadow-sm border-muted-foreground/20 hover:border-primary/30 hover:bg-background transition-colors"
                      >
                        <span className="truncate">
                          {filters.status === 'all' ? 'All Status' : 
                           filters.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full min-w-[240px] p-1 border-muted-foreground/20">
                      <DropdownMenuCheckboxItem
                        checked={filters.status === 'all'}
                        onCheckedChange={() => setFilters(prev => ({ ...prev, status: 'all' }))}
                        className="cursor-pointer"
                      >
                        All Status
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={filters.status === 'active'}
                        onCheckedChange={() => setFilters(prev => ({ ...prev, status: 'active' }))}
                        className="cursor-pointer"
                      >
                        Active
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={filters.status === 'inactive'}
                        onCheckedChange={() => setFilters(prev => ({ ...prev, status: 'inactive' }))}
                        className="cursor-pointer"
                      >
                        Inactive
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <p className="text-xs text-muted-foreground">Filter by operational status</p>
                </div>
                
                <div className="space-y-2">
                  <Label className="flex items-center gap-1.5 text-sm font-medium">
                    <Globe className="w-4 h-4 text-primary/70" />
                    Country
                  </Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full h-11 flex items-center justify-between bg-background shadow-sm border-muted-foreground/20 hover:border-primary/30 hover:bg-background transition-colors"
                      >
                        <span className="truncate">
                          {filters.country === 'all' ? 'All Countries' : filters.country}
                        </span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full min-w-[240px] p-1 border-muted-foreground/20 max-h-[300px] overflow-y-auto">
                      <DropdownMenuCheckboxItem
                        checked={filters.country === 'all'}
                        onCheckedChange={() => setFilters(prev => ({ ...prev, country: 'all' }))}
                        className="cursor-pointer"
                      >
                        All Countries
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuSeparator />
                      {countries.map(country => (
                        <DropdownMenuCheckboxItem
                          key={country}
                          checked={filters.country === country}
                          onCheckedChange={() => setFilters(prev => ({ ...prev, country: country }))}
                          className="cursor-pointer"
                        >
                          {country}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <p className="text-xs text-muted-foreground">{new Set(filteredShops.map(shop => shop.country)).size} countries available</p>
                </div>
                
                <div className="space-y-2">
                  <Label className="flex items-center gap-1.5 text-sm font-medium">
                    <Building2 className="w-4 h-4 text-primary/70" />
                    State/Province
                  </Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full h-11 flex items-center justify-between bg-background shadow-sm border-muted-foreground/20 hover:border-primary/30 hover:bg-background transition-colors"
                      >
                        <span className="truncate">
                          {filters.state === 'all' ? 'All States' : filters.state}
                        </span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full min-w-[240px] p-1 border-muted-foreground/20 max-h-[300px] overflow-y-auto">
                      <DropdownMenuCheckboxItem
                        checked={filters.state === 'all'}
                        onCheckedChange={() => setFilters(prev => ({ ...prev, state: 'all' }))}
                        className="cursor-pointer"
                      >
                        All States
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuSeparator />
                      {states.map(state => (
                        <DropdownMenuCheckboxItem
                          key={state}
                          checked={filters.state === state}
                          onCheckedChange={() => setFilters(prev => ({ ...prev, state: state }))}
                          className="cursor-pointer"
                        >
                          {state}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <p className="text-xs text-muted-foreground">{new Set(filteredShops.map(shop => shop.state)).size} states/provinces available</p>
                </div>
                
                <div className="space-y-2">
                  <Label className="flex items-center gap-1.5 text-sm font-medium">
                    <MapPin className="w-4 h-4 text-primary/70" />
                    City
                  </Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full h-11 flex items-center justify-between bg-background shadow-sm border-muted-foreground/20 hover:border-primary/30 hover:bg-background transition-colors"
                      >
                        <span className="truncate">
                          {filters.city === 'all' ? 'All Cities' : filters.city}
                        </span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full min-w-[240px] p-1 border-muted-foreground/20 max-h-[300px] overflow-y-auto">
                      <DropdownMenuCheckboxItem
                        checked={filters.city === 'all'}
                        onCheckedChange={() => setFilters(prev => ({ ...prev, city: 'all' }))}
                        className="cursor-pointer"
                      >
                        All Cities
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuSeparator />
                      {cities.map(city => (
                        <DropdownMenuCheckboxItem
                          key={city}
                          checked={filters.city === city}
                          onCheckedChange={() => setFilters(prev => ({ ...prev, city: city }))}
                          className="cursor-pointer"
                        >
                          {city}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <p className="text-xs text-muted-foreground">{new Set(filteredShops.map(shop => shop.city)).size} cities available</p>
                </div>
              </div>
              
              <div className="pt-2 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{filteredShops.length}</span> shops match your filters
                </div>
                <Button 
                  size="sm" 
                  className="text-xs h-8 bg-primary/90 hover:bg-primary"
                  onClick={() => setShowFilters(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Enhanced Shops Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {filteredShops.map((shop) => (
          <Card 
            key={shop.placeId} 
            className="relative flex flex-col group hover:shadow-lg transition-all duration-200 border-muted-foreground/20 hover:border-primary/20"
          >
            <CardHeader className="flex-none pb-4">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                <div className="space-y-1.5 min-w-0">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl truncate group-hover:text-primary transition-colors duration-200">
                    <Store className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                    <span className="truncate font-semibold">{shop.name}</span>
                  </CardTitle>
                  <CardDescription className="text-sm truncate">
                    {shop.location}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    shop.status === 'active' 
                      ? 'bg-black/10 text-black border border-black/20' 
                      : 'bg-black/5 text-black/70 border border-black/10'
                  }`}>
                    {shop.status}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-9 w-9 flex-shrink-0 hover:bg-muted/50 transition-colors duration-200"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => setSelectedShop(shop)}>
                        <Building2 className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setEditingShop(shop)}>
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit Shop
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setMapPreviewShop(shop)}>
                        <Map className="w-4 h-4 mr-2" />
                        View on Map
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-5">
              <div className="space-y-4 flex-1">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Address</label>
                  <p className="mt-1.5 flex items-center gap-2 text-sm text-foreground/80">
                    <MapPin className="w-4 h-4 text-primary/80 flex-shrink-0" />
                    <span className="truncate">{shop.formattedAddress}</span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Contact</label>
                    <p className="mt-1.5 flex items-center gap-2 text-sm text-foreground/80">
                      <Phone className="w-4 h-4 text-primary/80 flex-shrink-0" />
                      <span className="truncate">{shop.phoneNumber}</span>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="mt-1.5 flex items-center gap-2 text-sm text-foreground/80">
                      <Mail className="w-4 h-4 text-primary/80 flex-shrink-0" />
                      <span className="truncate">{shop.email}</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Opening Hours</label>
                    <p className="mt-1.5 flex items-center gap-2 text-sm text-foreground/80">
                      <Clock className="w-4 h-4 text-primary/80 flex-shrink-0" />
                      <span className="truncate">{shop.openingHours}</span>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                    <p className="mt-1.5 flex items-center gap-2 text-sm text-foreground/80">
                      <RefreshCw className="w-4 h-4 text-primary/80 flex-shrink-0" />
                      <span className="truncate">{shop.lastUpdated}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-auto pt-2">
                <Button 
                  variant="outline" 
                  className="flex-1 h-10 hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                  onClick={() => setSelectedShop(shop)}
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  Details
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1 h-10 hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                  onClick={() => setMapPreviewShop(shop)}
                >
                  <Globe className="w-4 h-4 mr-2" />
                  View Map
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modals */}
      {selectedShop && (
        <Dialog open onOpenChange={() => setSelectedShop(null)}>
          <DialogContent className="w-[90vw] max-w-4xl h-[90vh] max-h-[800px] overflow-y-auto border-muted-foreground/20">
            <ShopDetails shop={selectedShop} onClose={() => setSelectedShop(null)} />
          </DialogContent>
        </Dialog>
      )}

      {editingShop && (
        <Dialog open onOpenChange={() => setEditingShop(null)}>
          <DialogContent className="w-[90vw] max-w-[600px] h-[90vh] max-h-[800px] overflow-y-auto border-muted-foreground/20">
            <EditShop 
              shop={editingShop} 
              onClose={() => setEditingShop(null)}
              onSave={handleSaveShop}
            />
          </DialogContent>
        </Dialog>
      )}

      {showCreateShop && (
        <Dialog open onOpenChange={() => setShowCreateShop(false)}>
          <DialogContent className="w-[90vw] max-w-[600px] h-[90vh] max-h-[800px] overflow-y-auto border-muted-foreground/20">
            <CreateShop 
              onClose={() => setShowCreateShop(false)}
              onSave={handleCreateShop}
            />
          </DialogContent>
        </Dialog>
      )}

      {mapPreviewShop && (
        <Dialog open onOpenChange={() => setMapPreviewShop(null)}>
          <DialogContent className="w-[90vw] max-w-[800px] h-[90vh] max-h-[800px] overflow-y-auto border-muted-foreground/20">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl sm:text-2xl font-semibold">
                <MapPin className="w-6 h-6 text-primary/80" />
                {mapPreviewShop.name}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {mapPreviewShop.formattedAddress}
              </DialogDescription>
            </DialogHeader>
            <div className="aspect-video relative rounded-lg overflow-hidden bg-muted shadow-sm">
              {mapError ? (
                <div className="absolute inset-0 flex items-center justify-center flex-col gap-3 p-4">
                  <Globe className="w-10 h-10 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground text-center">
                    Unable to load map preview. Please check the coordinates or address.
                  </p>
                </div>
              ) : (
                <iframe
                  src={getMapUrl(mapPreviewShop)}
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
            <DialogFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-sm text-muted-foreground">
                {mapPreviewShop.latitude && mapPreviewShop.longitude ? (
                  <span>Coordinates: {mapPreviewShop.latitude}, {mapPreviewShop.longitude}</span>
                ) : (
                  <span>Using address for location preview</span>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                  onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapPreviewShop.formattedAddress)}`, '_blank')}
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Open in Google Maps
                </Button>
                <Button 
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 transition-colors duration-200"
                  onClick={() => setMapPreviewShop(null)}
                >
                  Close Preview
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
} 