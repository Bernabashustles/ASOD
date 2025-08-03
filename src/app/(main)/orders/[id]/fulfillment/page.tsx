'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Clock, Package, Truck, MapPin, DollarSign, Star, AlertTriangle, 
  CheckCircle2, Timer, Box, ShoppingBag, Info, Navigation, MapPinned, Circle, Phone, Mail, AlertCircle, User, Activity, ChevronLeft, ChevronRight,
  Bike, Car, Bus, Truck as TruckIcon, Globe, Calendar, MoreHorizontal
} from 'lucide-react';
import DeliveryMap from './components/DeliveryMap';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface Location {
  lat: number;
  lng: number;
}

interface Inventory {
  id: string;
  name: string;
  address: string;
  location: Location;
  stockStatus: string;
  handlingTime: string;
  operatingHours: string;
  distance: string;
  readyTime: string;
}

interface DeliveryMan {
  id: string;
  name: string;
  rating: number;
  vehicleType: keyof typeof vehicleIcons;
  location: Location;
  completedDeliveries: number;
  averageTime: string;
  status: string;
  languages: string[];
  specialization: string[];
  currentLocation: {
    latitude: number;
    longitude: number;
  };
  availability: 'online' | 'offline' | 'busy';
  lastUpdated: string;
  requestStatus?: 'pending' | 'accepted' | 'rejected' | null;
  estimatedArrivalTime?: string;
  distanceFromPickup?: string;
}

interface VehicleType {
  id: string;
  name: string;
  maxWeight: string;
  dimensions: string;
  cost: string;
  features: string[];
}

const mockInventories: Inventory[] = [
  { 
    id: '1', 
    name: 'Main Warehouse', 
    address: '123 Storage St', 
    location: { lat: 1.3521, lng: 103.8198 },
    stockStatus: 'In Stock',
    handlingTime: '15 mins',
    operatingHours: '9:00 AM - 6:00 PM',
    distance: '2.5km',
    readyTime: '20 minutes'
  },
  { 
    id: '2', 
    name: 'Downtown Store', 
    address: '456 Store Ave', 
    location: { lat: 1.3522, lng: 103.8199 },
    stockStatus: 'Limited Stock',
    handlingTime: '30 mins',
    operatingHours: '24/7',
    distance: '4.2km',
    readyTime: '35 minutes'
  },
];

const vehicleIcons = {
  motorbike: Bike,
  bike: Bike,
  car: Car,
  van: TruckIcon,
  truck: Bus,
  pickup: Truck
};

// Helper functions for distance and time calculations
const calculateDistance = (from: Location, to: Location): string => {
  const distance = Math.sqrt(
    Math.pow(to.lat - from.lat, 2) +
    Math.pow(to.lng - from.lng, 2)
  ) * 111; // Rough conversion to kilometers
  return `${distance.toFixed(1)}km`;
};

const calculateEstimatedTime = (from: Location, to: Location, vehicleType: string): string => {
  const distance = Math.sqrt(
    Math.pow(to.lat - from.lat, 2) +
    Math.pow(to.lng - from.lng, 2)
  ) * 111;
  
  // Average speeds in km/h based on vehicle type
  const speeds: Record<string, number> = {
    motorbike: 40,
    car: 35,
    van: 30,
    truck: 25
  };
  
  const speed = speeds[vehicleType] || 30;
  const timeInMinutes = Math.round((distance / speed) * 60);
  return `${timeInMinutes}min`;
};

const mockDeliveryMen: DeliveryMan[] = [
  { 
    id: 'driver_001', 
    name: 'Abebe Kebede',
    rating: 4.8,
    vehicleType: 'van',
    location: { lat: 8.9806, lng: 38.7578 }, // Addis Ababa
    completedDeliveries: 156,
    averageTime: '25 mins',
    status: 'online',
    languages: ['Amharic', 'English'],
    specialization: ['Express Delivery', 'Furniture Handling'],
    currentLocation: {
      latitude: 8.9806,
      longitude: 38.7578
    },
    availability: 'online',
    lastUpdated: new Date().toISOString()
  },
  { 
    id: 'driver_002',
    name: 'Tigist Haile',
    rating: 4.9,
    vehicleType: 'truck',
    location: { lat: 8.9876, lng: 38.7612 }, // Nearby Addis
    completedDeliveries: 243,
    averageTime: '30 mins',
    status: 'online',
    languages: ['Amharic', 'Oromo'],
    specialization: ['Heavy Items', 'Commercial Delivery'],
    currentLocation: {
      latitude: 8.9876,
      longitude: 38.7612
    },
    availability: 'online',
    lastUpdated: new Date().toISOString()
  },
  { 
    id: 'driver_003',
    name: 'Dawit Tadesse',
    rating: 4.7,
    vehicleType: 'motorbike',
    location: { lat: 8.9756, lng: 38.7455 }, // Nearby Addis
    completedDeliveries: 89,
    averageTime: '15 mins',
    status: 'online',
    languages: ['Amharic', 'Tigrinya'],
    specialization: ['Express Delivery', 'Small Packages'],
    currentLocation: {
      latitude: 8.9756,
      longitude: 38.7455
    },
    availability: 'online',
    lastUpdated: new Date().toISOString()
  },
  { 
    id: 'driver_004',
    name: 'Hirut Bekele',
    rating: 4.85,
    vehicleType: 'car',
    location: { lat: 8.9934, lng: 38.7623 }, // Nearby Addis
    completedDeliveries: 178,
    averageTime: '20 mins',
    status: 'online',
    languages: ['Amharic', 'English'],
    specialization: ['Medium Packages', 'Fragile Items'],
    currentLocation: {
      latitude: 8.9934,
      longitude: 38.7623
    },
    availability: 'online',
    lastUpdated: new Date().toISOString()
  }
];

const vehicleTypes: VehicleType[] = [
  { 
    id: 'motorbike',
    name: 'Motorbike',
    maxWeight: '30kg',
    dimensions: '0.5m x 0.5m x 0.5m',
    cost: 'Low',
    features: ['Fast Delivery', 'Small Packages']
  },
  { 
    id: 'bike',
    name: 'Bicycle',
    maxWeight: '20kg',
    dimensions: '0.4m x 0.4m x 0.4m',
    cost: 'Very Low',
    features: ['Eco-friendly', 'Small Items']
  },
  { 
    id: 'car',
    name: 'Car',
    maxWeight: '200kg',
    dimensions: '1.5m x 1.2m x 1m',
    cost: 'Medium',
    features: ['Multiple Packages', 'Medium Items']
  },
  { 
    id: 'van',
    name: 'Van',
    maxWeight: '1000kg',
    dimensions: '3m x 1.8m x 1.8m',
    cost: 'High',
    features: ['Large Items', 'Furniture']
  },
  { 
    id: 'truck',
    name: 'Truck',
    maxWeight: '3000kg',
    dimensions: '6m x 2.4m x 2.4m',
    cost: 'Very High',
    features: ['Heavy Items', 'Commercial']
  },
  { 
    id: 'pickup',
    name: 'Pickup',
    maxWeight: '800kg',
    dimensions: '2m x 1.5m x 0.8m',
    cost: 'High',
    features: ['Open Cargo', 'Construction']
  }
];

const orders = [
  {
  orderId: "ORD-2024-001",
  customer: {
    name: "Alex Johnson",
    phone: "+1 (555) 123-4567",
    email: "alex@example.com",
    address: "123 Delivery Street, Cityville, ST 12345",
    location: { lat: 1.3521, lng: 103.8198 }
  },
  items: [
    { name: "Large Sofa", quantity: 1, weight: "85kg" },
    { name: "Coffee Table", quantity: 2, weight: "15kg" },
    { name: "Dining Chairs", quantity: 4, weight: "5kg each" }
  ],
  totalWeight: "130kg",
    specialRequirements: "Fragile items, handle with care",
    status: "Awaiting Fulfillment",
    createdAt: "2 hours ago"
  },
  {
    orderId: "ORD-2024-002",
    customer: {
      name: "Sarah Williams",
      phone: "+1 (555) 987-6543",
      email: "sarah@example.com",
      address: "456 Shipping Lane, Townsville, ST 54321",
      location: { lat: 1.3522, lng: 103.8199 }
    },
    items: [
      { name: "Refrigerator", quantity: 1, weight: "120kg" },
      { name: "Microwave", quantity: 1, weight: "15kg" }
    ],
    totalWeight: "135kg",
    specialRequirements: "Elevator access needed",
    status: "In Progress",
    createdAt: "1 hour ago"
  },
  {
    orderId: "ORD-2024-003",
    customer: {
      name: "Michael Brown",
      phone: "+1 (555) 456-7890",
      email: "michael@example.com",
      address: "789 Delivery Ave, Metropolis, ST 67890",
      location: { lat: 1.3523, lng: 103.8197 }
    },
    items: [
      { name: "TV Stand", quantity: 1, weight: "45kg" },
      { name: "Bookshelf", quantity: 2, weight: "30kg" },
      { name: "Floor Lamp", quantity: 1, weight: "5kg" }
    ],
    totalWeight: "110kg",
    specialRequirements: "Assembly required",
    status: "Pending",
    createdAt: "30 minutes ago"
  }
];

// Shared fulfillment state
const sharedFulfillmentState = {
  selectedPickupLocation: mockInventories[0].location,
  selectedVehicleType: 'cargo_van',
  isFreeShipping: false,
  deliveryFeePaidBy: 'customer',
  selectedDeliveryMan: '1',
  deliveryFee: '50',
  estimatedDistance: '5.2',
  estimatedTime: '25',
  fulfillmentProgress: 25,
  deliveryInstructions: "Handle with care"
};

// Mock order log data
const orderLogs = [
  {
    id: '1',
    message: "You updated the customer for this order.",
    timestamp: "2 minutes ago"
  },
  {
    id: '2',
    message: "This order was archived.",
    timestamp: "2 minutes ago"
  },
  {
    id: '3',
    message: "You fulfilled 1 item from Shop location.",
    timestamp: "2 minutes ago"
  },
  {
    id: '4',
    message: "You manually marked ETB4,600.00 as paid for this order.",
    timestamp: "2 minutes ago"
  },
  {
    id: '5',
    message: "Confirmation #373AJ3AJN was generated for this order.",
    timestamp: "2 minutes ago"
  },
  {
    id: '6',
    message: "You created this order from draft order #D2.",
    timestamp: "2 minutes ago"
  }
];

export default function OrderFulfillment() {
  const [currentOrderIndex, setCurrentOrderIndex] = useState(0);
  const [selectedPickupLocation, setSelectedPickupLocation] = useState<Location>(sharedFulfillmentState.selectedPickupLocation);
  const [selectedVehicleType, setSelectedVehicleType] = useState(sharedFulfillmentState.selectedVehicleType);
  const [isFreeShipping, setIsFreeShipping] = useState(sharedFulfillmentState.isFreeShipping);
  const [deliveryFeePaidBy, setDeliveryFeePaidBy] = useState(sharedFulfillmentState.deliveryFeePaidBy);
  const [selectedDeliveryMan, setSelectedDeliveryMan] = useState(sharedFulfillmentState.selectedDeliveryMan);
  const [deliveryFee, setDeliveryFee] = useState(sharedFulfillmentState.deliveryFee);
  const [estimatedDistance, setEstimatedDistance] = useState(sharedFulfillmentState.estimatedDistance);
  const [estimatedTime, setEstimatedTime] = useState(sharedFulfillmentState.estimatedTime);
  const [fulfillmentProgress, setFulfillmentProgress] = useState(sharedFulfillmentState.fulfillmentProgress);
  const [deliveryInstructions, setDeliveryInstructions] = useState(sharedFulfillmentState.deliveryInstructions);
  const [driverRequestStatus, setDriverRequestStatus] = useState<'idle' | 'searching' | 'found'>('idle');
  const [nearbyDrivers, setNearbyDrivers] = useState<DeliveryMan[]>([]);

  useEffect(() => {
    // Get current location for default pickup
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSelectedPickupLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          console.log('Unable to get location');
        }
      );
    }
  }, []);

  const calculateDeliveryMetrics = () => {
    if (selectedPickupLocation && orders[currentOrderIndex].customer.location) {
      // Simple distance calculation (you might want to use Google Maps Distance Matrix API)
      const distance = Math.sqrt(
        Math.pow(orders[currentOrderIndex].customer.location.lat - selectedPickupLocation.lat, 2) +
        Math.pow(orders[currentOrderIndex].customer.location.lng - selectedPickupLocation.lng, 2)
      ) * 111; // Rough conversion to kilometers
      setEstimatedDistance(distance.toFixed(2));
      setEstimatedTime((distance * 3).toFixed(0)); // Rough estimate: 20 km/h average speed
    }
  };

  useEffect(() => {
    calculateDeliveryMetrics();
  }, [selectedPickupLocation, orders[currentOrderIndex].customer.location]);

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </Button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Order Fulfillment</h1>
              <p className="text-sm text-muted-foreground">Configure delivery details for order {orders[currentOrderIndex].orderId}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="flex flex-col items-end flex-1 sm:flex-initial">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Created {orders[currentOrderIndex].createdAt}</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {orders[currentOrderIndex].items.reduce((acc, item) => acc + item.quantity, 0)} items • {orders[currentOrderIndex].totalWeight}
                </span>
              </div>
            </div>
            <Separator orientation="vertical" className="h-8 hidden sm:block" />
            <Button variant="outline" className="gap-2 hidden sm:flex">
              <Box className="w-4 h-4" />
              Order Details
            </Button>
          </div>
        </div>
        <Separator />
      </div>

      {/* Order Summary Header */}
      <Card className="bg-gradient-to-br from-primary/5 via-primary/3 to-transparent border-primary/10">
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Order Status Section */}
            <div className="bg-white/50 hover:bg-white/80 backdrop-blur-sm transition-all duration-300 rounded-xl p-4 sm:p-5 space-y-4 shadow-sm border border-primary/5">
              <div className="flex items-center gap-3 pb-3 border-b border-primary/5">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold text-base">Order Status</h3>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-muted-foreground">Order ID</div>
                  <Badge variant="outline" className="text-xs font-medium bg-white">
                    #{orders[currentOrderIndex].orderId.split('-')[2]}
                  </Badge>
                </div>
                <div className="font-semibold text-sm text-primary">{orders[currentOrderIndex].orderId}</div>
              </div>

              <Badge variant="secondary" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border border-yellow-200/50">
                <Clock className="w-3 h-3 mr-1" />
                {orders[currentOrderIndex].status}
              </Badge>

              <div className="space-y-2">
                <div className="text-xs text-muted-foreground font-medium">Order Timeline</div>
                <div className="space-y-3 border-l-2 border-primary/10 pl-3 py-1">
                  <div className="flex items-center gap-2 text-xs relative">
                    <div className="absolute -left-[17px] w-3 h-3 rounded-full bg-green-500 ring-4 ring-green-50" />
                    <span className="text-muted-foreground">Order Received</span>
                    <span className="text-muted-foreground ml-auto">{orders[currentOrderIndex].createdAt}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs relative">
                    <div className="absolute -left-[17px] w-3 h-3 rounded-full bg-yellow-500 ring-4 ring-yellow-50" />
                    <span>Fulfillment Setup</span>
                    <span className="text-muted-foreground ml-auto">Now</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Items Summary Section */}
            <div className="bg-white/50 hover:bg-white/80 backdrop-blur-sm transition-all duration-300 rounded-xl p-4 sm:p-5 space-y-4 shadow-sm border border-primary/5">
              <div className="flex items-center gap-3 pb-3 border-b border-primary/5">
                <div className="p-2 rounded-lg bg-primary/10">
                  <ShoppingBag className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold text-base">Order Items</h3>
              </div>

              <div className="flex items-center gap-3 pb-3">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-sm">{orders[currentOrderIndex].items.reduce((acc, item) => acc + item.quantity, 0)} items</span>
                </div>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="font-semibold text-sm text-primary">{orders[currentOrderIndex].totalWeight}</span>
              </div>
              
              <div className="space-y-2">
                {orders[currentOrderIndex].items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm py-2.5 px-3 rounded-lg bg-white/50 hover:bg-white transition-colors border border-border/50">
                    <span className="font-medium">{item.name}</span>
                    <Badge variant="secondary" className="text-xs bg-primary/5 text-primary border-0">
                      x{item.quantity}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Details Section */}
            <div className="bg-white/50 hover:bg-white/80 backdrop-blur-sm transition-all duration-300 rounded-xl p-4 sm:p-5 space-y-4 shadow-sm border border-primary/5">
              <div className="flex items-center gap-3 pb-3 border-b border-primary/5">
                <div className="p-2 rounded-lg bg-primary/10">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold text-base">Customer Details</h3>
              </div>

              <div className="pb-3">
                <div className="font-semibold text-lg text-primary">{orders[currentOrderIndex].customer.name}</div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground bg-white/50 hover:bg-white transition-colors rounded-lg p-2.5 border border-border/50">
                  <Phone className="w-4 h-4 text-primary" />
                  {orders[currentOrderIndex].customer.phone}
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground bg-white/50 hover:bg-white transition-colors rounded-lg p-2.5 border border-border/50">
                  <Mail className="w-4 h-4 text-primary" />
                  {orders[currentOrderIndex].customer.email}
                </div>
                <div className="flex items-start gap-3 text-sm text-muted-foreground bg-white/50 hover:bg-white transition-colors rounded-lg p-2.5 border border-border/50">
                  <MapPin className="w-4 h-4 text-primary mt-0.5" />
                  <span className="line-clamp-2">{orders[currentOrderIndex].customer.address}</span>
                </div>
              </div>
            </div>

            {/* Progress Section */}
            <div className="bg-white/50 hover:bg-white/80 backdrop-blur-sm transition-all duration-300 rounded-xl p-4 sm:p-5 space-y-4 shadow-sm border border-primary/5">
              <div className="flex items-center gap-3 pb-3 border-b border-primary/5">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Activity className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold text-base">Fulfillment Progress</h3>
              </div>

              <div className="space-y-3">
                <Progress value={fulfillmentProgress} className="w-full h-2.5 bg-primary/10" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span className="font-medium">Setup</span>
                  <span className="font-medium">Pickup</span>
                  <span className="font-medium">Delivery</span>
                  <span className="font-medium">Complete</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm bg-white/50 rounded-lg p-2.5 border border-border/50">
                <AlertCircle className="w-4 h-4 text-yellow-500" />
                <span className="text-muted-foreground">Setting up delivery...</span>
              </div>

              {orders[currentOrderIndex].specialRequirements && (
                <div className="bg-yellow-50/80 backdrop-blur-sm text-yellow-800 rounded-lg p-4 space-y-2 border border-yellow-200/50">
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    <span className="font-medium text-sm">Special Requirements</span>
                  </div>
                  <p className="text-sm">{orders[currentOrderIndex].specialRequirements}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pagination Section */}
      <div className="flex items-center justify-between border rounded-lg bg-muted/10 p-3">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1"
          onClick={() => setCurrentOrderIndex(Math.max(0, currentOrderIndex - 1))}
          disabled={currentOrderIndex === 0}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        <div className="text-sm text-muted-foreground">
          Order <span className="font-medium">{currentOrderIndex + 1}</span> of <span className="font-medium">{orders.length}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1"
          onClick={() => setCurrentOrderIndex(Math.min(orders.length - 1, currentOrderIndex + 1))}
          disabled={currentOrderIndex === orders.length - 1}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-4 sm:space-y-6">
          {/* Customer Information */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Info className="w-5 h-5" />
                Delivery Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-4">
                <div className="bg-secondary/10 p-4 rounded-lg space-y-3">
                  <div>
                    <Label className="text-sm text-muted-foreground">Delivery Address</Label>
                    <div className="font-medium mt-1">{orders[currentOrderIndex].customer.address}</div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Contact Information</Label>
                    <div className="font-medium mt-1">
                      {orders[currentOrderIndex].customer.name} • {orders[currentOrderIndex].customer.phone}
                    </div>
                    <div className="text-sm text-muted-foreground">{orders[currentOrderIndex].customer.email}</div>
                  </div>
                </div>
                <div>
                  <Label>Special Instructions</Label>
                  <Input
                    value={deliveryInstructions}
                    onChange={(e) => setDeliveryInstructions(e.target.value)}
                    placeholder="Add any special delivery instructions"
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pickup & Delivery Locations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="w-5 h-5" />
                Route Setup
              </CardTitle>
              <CardDescription>Configure pickup and delivery locations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Pickup Location */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Pickup Location</Label>
                  <Select onValueChange={(value) => {
                    const inventory = mockInventories.find(inv => inv.id === value);
                    if (inventory) {
                      setSelectedPickupLocation(inventory.location);
                    }
                  }}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select pickup location" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockInventories.map((inventory) => (
                        <SelectItem key={inventory.id} value={inventory.id}>
                          <div className="flex flex-col py-2">
                            <div className="flex items-center gap-2">
                              <MapPinned className="w-4 h-4" />
                              <span className="font-medium">{inventory.name}</span>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {inventory.address}
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-sm">
                              <span className="text-green-600">
                                {inventory.stockStatus}
                              </span>
                              <span>•</span>
                              <span>{inventory.distance} away</span>
                              <span>•</span>
                              <span>Ready in {inventory.readyTime}</span>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Drop Location */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Drop Location</Label>
                  <div className="bg-secondary/10 p-4 rounded-lg space-y-2">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 mt-1" />
                      <div>
                        <div className="font-medium">{orders[currentOrderIndex].customer.address}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Customer's Delivery Address
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vehicle Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Vehicle Selection
              </CardTitle>
              <CardDescription>
                Required capacity: {orders[currentOrderIndex].totalWeight}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                {vehicleTypes.map((vehicle) => {
                  const Icon = vehicleIcons[vehicle.id as keyof typeof vehicleIcons] || Truck;
                  return (
                    <div
                      key={vehicle.id}
                      className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 border rounded-lg cursor-pointer transition-all ${
                        selectedVehicleType === vehicle.id
                          ? 'border-primary bg-primary/5'
                          : 'hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedVehicleType(vehicle.id)}
                    >
                      <div className={`p-1.5 sm:p-2 rounded-lg ${
                        selectedVehicleType === vehicle.id
                          ? 'bg-primary text-white'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="font-medium text-xs sm:text-sm truncate">{vehicle.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{vehicle.maxWeight}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Order Log Section - Moved to bottom left */}
          <Card className="overflow-hidden border border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50 border-b pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold">Order Activity Log</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      Export log
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Print log
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="bg-gray-100 px-5 py-3 border-b flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <div className="text-sm font-medium">Today</div>
              </div>
              <div className="divide-y">
                {orderLogs.map((log, index) => (
                  <div key={log.id} 
                    className={`flex items-start p-5 hover:bg-gray-50 transition-colors ${index === 0 ? 'bg-gray-50 border-l-4 border-blue-300' : ''}`}>
                    <div className={`w-2 h-2 rounded-full mt-1.5 mr-4 flex-shrink-0 ${index === 0 ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
                    <div className="flex-1">
                      <p className={`${index === 0 ? 'font-medium' : ''}`}>{log.message}</p>
                      <span className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                        <Clock className="h-3 w-3 text-gray-500" />
                        {log.timestamp}
                      </span>
                    </div>
                    {index === 0 && (
                      <Badge variant="outline" className="text-xs bg-white border-blue-200 text-blue-700 ml-auto">
                        Latest
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
              <div className="px-5 py-3 bg-gray-50 border-t text-center">
                <Button variant="ghost" size="sm" className="text-xs font-normal text-muted-foreground hover:text-black">
                  View more activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Map View */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <MapPin className="w-5 h-5" />
                Available Delivery Personnel
              </CardTitle>
              {(selectedPickupLocation && orders[currentOrderIndex].customer.location) && (
                <CardDescription className="text-sm">
                  Estimated Distance: {estimatedDistance}km • 
                  Estimated Time: {estimatedTime} minutes
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden border h-[300px] sm:h-[400px] lg:h-[600px] relative">
                  <div className="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-lg p-2">
                    <div className="text-sm font-medium mb-1">Map Legend</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
                        <span className="text-xs">Pickup Location</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                        <span className="text-xs">Drop Location</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#4F46E5]" />
                        <span className="text-xs">Available Drivers</span>
                      </div>
                    </div>
                  </div>
                  <DeliveryMap
                    pickupLocation={selectedPickupLocation}
                    dropLocation={orders[currentOrderIndex].customer.location}
                    deliveryMenLocations={mockDeliveryMen.map(dm => ({
                      ...dm.location,
                      id: dm.id,
                      name: dm.name,
                      vehicleType: dm.vehicleType,
                      icon: vehicleIcons[dm.vehicleType],
                      rating: dm.rating,
                      completedDeliveries: dm.completedDeliveries,
                      languages: dm.languages,
                      distance: calculateDistance(selectedPickupLocation, dm.location),
                      estimatedTime: calculateEstimatedTime(selectedPickupLocation, dm.location, dm.vehicleType)
                    }))}
                    onDeliveryManSelect={(id) => {
                      if (driverRequestStatus === 'idle') {
                        setSelectedDeliveryMan(id);
                      }
                    }}
                    selectedDeliveryMan={selectedDeliveryMan}
                  />
                </div>
                
                {/* Selected Delivery Person Details */}
                {selectedDeliveryMan && driverRequestStatus === 'idle' && (
                  <div className="bg-white rounded-xl p-6 space-y-5 border shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 min-w-0">
                        {(() => {
                          const selectedDriver = mockDeliveryMen.find(d => d.id === selectedDeliveryMan);
                          const Icon = vehicleIcons[selectedDriver?.vehicleType || 'van'];
                          return (
                            <div className="bg-primary/10 p-3 rounded-xl flex-shrink-0">
                              <Icon className="w-6 h-6 text-primary" />
                            </div>
                          );
                        })()}
                        <div className="space-y-1.5 min-w-0">
                          <div className="font-medium text-lg truncate">
                            {mockDeliveryMen.find(d => d.id === selectedDeliveryMan)?.name}
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <div className="flex items-center gap-1 bg-primary/5 px-2 py-1 rounded-full">
                              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm">{mockDeliveryMen.find(d => d.id === selectedDeliveryMan)?.rating}</span>
                            </div>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{mockDeliveryMen.find(d => d.id === selectedDeliveryMan)?.completedDeliveries} deliveries</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="capitalize bg-white">
                              {mockDeliveryMen.find(d => d.id === selectedDeliveryMan)?.vehicleType}
                            </Badge>
                            <Badge variant="secondary" className="capitalize bg-green-50 text-green-700 border-green-200">
                              {mockDeliveryMen.find(d => d.id === selectedDeliveryMan)?.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted/50 rounded-lg p-4 space-y-1.5">
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          Estimated Pickup Time
                        </div>
                        <div className="font-medium">
                          {calculateEstimatedTime(
                            mockDeliveryMen.find(d => d.id === selectedDeliveryMan)?.location || { lat: 0, lng: 0 },
                            selectedPickupLocation,
                            mockDeliveryMen.find(d => d.id === selectedDeliveryMan)?.vehicleType || 'van'
                          )}
                        </div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4 space-y-1.5">
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <Navigation className="w-4 h-4 text-primary" />
                          Distance from Pickup
                        </div>
                        <div className="font-medium">
                          {calculateDistance(
                            mockDeliveryMen.find(d => d.id === selectedDeliveryMan)?.location || { lat: 0, lng: 0 },
                            selectedPickupLocation
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 bg-muted/50 rounded-lg p-4">
                      <div className="space-y-1.5">
                        <div className="text-sm text-muted-foreground">Languages</div>
                        <div className="font-medium text-sm">
                          {mockDeliveryMen.find(d => d.id === selectedDeliveryMan)?.languages.join(', ')}
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="text-sm text-muted-foreground">Average Time</div>
                        <div className="font-medium text-sm">
                          {mockDeliveryMen.find(d => d.id === selectedDeliveryMan)?.averageTime}
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="text-sm text-muted-foreground">Specialization</div>
                        <div className="font-medium text-sm">
                          {mockDeliveryMen.find(d => d.id === selectedDeliveryMan)?.specialization.join(', ')}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 pt-2">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setSelectedDeliveryMan(null)}
                      >
                        Cancel Selection
                      </Button>
                      <Button 
                        className="flex-1"
                        onClick={() => {
                          setDriverRequestStatus('searching');
                          setTimeout(() => {
                            const driver = mockDeliveryMen.find(d => d.id === selectedDeliveryMan);
                            if (driver) {
                              driver.requestStatus = 'accepted';
                              driver.estimatedArrivalTime = calculateEstimatedTime(
                                driver.location,
                                selectedPickupLocation,
                                driver.vehicleType
                              );
                              driver.distanceFromPickup = calculateDistance(
                                driver.location,
                                selectedPickupLocation
                              );
                              setDriverRequestStatus('found');
                            }
                          }, 3000);
                        }}
                      >
                        Request Driver
                      </Button>
                    </div>
                  </div>
                )}

                {/* Driver Request Status */}
                {driverRequestStatus === 'searching' && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                    <div className="flex items-center gap-4">
                      <div className="animate-spin flex-shrink-0">
                        <Circle className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-medium text-yellow-900">Finding Nearby Drivers</h3>
                        <p className="text-sm text-yellow-700 mt-1">Please wait while we locate available drivers in your area...</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Accepted Driver Details */}
                {selectedDeliveryMan && driverRequestStatus === 'found' && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 space-y-5">
                    <div className="flex items-center gap-4">
                      <div className="bg-white p-2 rounded-full flex-shrink-0">
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-medium text-green-900">Driver Accepted!</h3>
                        <p className="text-sm text-green-700 mt-1">
                          {mockDeliveryMen.find(d => d.id === selectedDeliveryMan)?.name} will pick up your order
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-white rounded-lg p-4 space-y-1.5 border border-green-100">
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          Driver Rating
                        </div>
                        <div className="font-medium">
                          {mockDeliveryMen.find(d => d.id === selectedDeliveryMan)?.rating}
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-4 space-y-1.5 border border-green-100">
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <Phone className="w-4 h-4 text-primary" />
                          Contact
                        </div>
                        <div className="font-medium">+251 91234 5678</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 space-y-1.5 border border-green-100">
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <Truck className="w-4 h-4 text-primary" />
                          Vehicle
                        </div>
                        <div className="font-medium capitalize">
                          {mockDeliveryMen.find(d => d.id === selectedDeliveryMan)?.vehicleType}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Button variant="outline" className="flex-1 border-green-200 hover:bg-green-50">
                        <Phone className="w-4 h-4 mr-2" />
                        Contact Driver
                      </Button>
                      <Button className="flex-1 bg-green-600 hover:bg-green-700">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Assign Driver
                      </Button>
                    </div>
                  </div>
                )}

                <Alert variant="default" className="bg-primary/5 border-primary/10">
                  <AlertTitle className="flex items-center gap-2">
                    <Navigation className="w-4 h-4" />
                    {driverRequestStatus === 'idle' ? (
                      'Select a Driver'
                    ) : driverRequestStatus === 'searching' ? (
                      'Finding Nearby Drivers'
                    ) : (
                      'Driver Found'
                    )}
                  </AlertTitle>
                  <AlertDescription className="text-muted-foreground">
                    {driverRequestStatus === 'idle' ? (
                      'Click on a vehicle icon on the map to request a driver'
                    ) : driverRequestStatus === 'searching' ? (
                      'Please wait while we connect with available drivers in your area'
                    ) : (
                      'Driver has accepted your request. You can now assign them to this delivery'
                    )}
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Fee Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Delivery Fee Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Free Shipping</Label>
                    <div className="text-sm text-muted-foreground">
                      Toggle free shipping for this order
                    </div>
                  </div>
                  <Switch
                    checked={isFreeShipping}
                    onCheckedChange={setIsFreeShipping}
                  />
                </div>

                {!isFreeShipping && (
                  <>
                    <div className="space-y-2">
                      <Label>Delivery Fee</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          value={deliveryFee}
                          onChange={(e) => setDeliveryFee(e.target.value)}
                          className="pl-9"
                          placeholder="Enter delivery fee"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Fee Paid By</Label>
                      <Select
                        value={deliveryFeePaidBy}
                        onValueChange={setDeliveryFeePaidBy}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="customer">Customer</SelectItem>
                          <SelectItem value="store">Store</SelectItem>
                          <SelectItem value="split">Split 50/50</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {estimatedDistance && (
                      <Alert>
                        <AlertTitle className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          Distance Based Recommendation
                        </AlertTitle>
                        <AlertDescription>
                          Suggested fee for {estimatedDistance}km: ${(Number(estimatedDistance) * 1.5).toFixed(2)}
                        </AlertDescription>
                      </Alert>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        <Button variant="outline" className="w-full sm:w-auto">Cancel</Button>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" className="w-full sm:w-auto">Save as Draft</Button>
          <Button className="w-full sm:w-auto">Confirm Fulfillment</Button>
        </div>
      </div>
    </div>
  );
} 