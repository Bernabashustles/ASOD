'use client';

import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer, InfoWindow } from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import { LucideIcon, Navigation, Clock, Star, Phone, Mail, Filter, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { vehicleIcons } from './VehicleIcons';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Location {
  lat: number;
  lng: number;
}

interface DeliveryMapProps {
  pickupLocation: Location;
  dropLocation: Location;
  deliveryMenLocations: {
    id: string;
    name: string;
    vehicleType: string;
    icon: LucideIcon;
    lat: number;
    lng: number;
    rating?: number;
    distance?: string;
    estimatedTime?: string;
    completedDeliveries: number;
    languages?: string[];
  }[];
  onDeliveryManSelect: (id: string) => void;
  selectedDeliveryMan?: string;
}

const libraries: Libraries = ['places', 'geometry'];
const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '8px',
};

// Ethiopia's center coordinates (approximately)
const ETHIOPIA_CENTER = { lat: 9.145, lng: 40.489667 };
const ADDIS_ABABA = { lat: 8.9806, lng: 38.7578 };

// Custom map styles for a modern look
const mapStyles = [
  {
    featureType: "all",
    elementType: "geometry",
    stylers: [{ saturation: -80 }]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      { color: "#ffffff" },
      { lightness: 100 },
      { visibility: "simplified" }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#e4e4e4" }]
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#f5f5f5" }]
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#e5f3e6" }]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#c3d2fb" }]
  },
  {
    featureType: "transit.station",
    elementType: "labels.icon",
    stylers: [{ saturation: -70 }]
  }
];

// Vehicle-specific SVG paths
const vehiclePaths = {
  motorbike: [
    'M14 8V6a2 2 0 0 0-2-2H8',
    'M16 10V6a2 2 0 0 0-2-2h-2',
    'M4.5 14h4.5',
    'M16 14h3.5',
    'M6.5 20a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
    'M17.5 20a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'
  ],
  car: [
    'M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2',
    'M6.5 19a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
    'M16.5 19a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z'
  ],
  van: [
    'M3 17h13v-6H3v6Zm0 0h.01',
    'M6 17h.01',
    'M9 17h.01',
    'M12 17h.01',
    'M15 17h.01',
    'M16 11V7a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v4',
    'M21 11v4a2 2 0 0 1-2 2h-3',
    'M16 11h5'
  ],
  truck: [
    'M10 17h4V5H2v12h3',
    'M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1',
    'M7.5 20a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
    'M17.5 20a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z'
  ]
};

// Vehicle-specific SVG paths with shadows
const createCustomMarkerIcon = (vehicleType: string, isSelected: boolean) => {
  const color = isSelected ? '#4F46E5' : '#3B82F6';
  const paths = vehiclePaths[vehicleType as keyof typeof vehiclePaths] || vehiclePaths.car;
  
  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 54" width="50" height="54">
      <!-- Shadow -->
      <ellipse cx="25" cy="48" rx="12" ry="4" fill="rgba(0,0,0,0.2)" />
      
      <!-- Pin shape -->
      <path d="M25 0 C12 0 1 11 1 24 C1 36 19 50 25 54 C31 50 49 36 49 24 C49 11 38 0 25 0 Z" 
            fill="${color}" 
            stroke="white" 
            stroke-width="2" />
      
      <!-- Vehicle icon -->
      <g transform="translate(13,13) scale(1)" 
         stroke="white" 
         fill="none" 
         stroke-width="2" 
         stroke-linecap="round" 
         stroke-linejoin="round">
        ${paths.map(d => `<path d="${d}" />`).join('')}
      </g>
      
      <!-- Subtle gradient overlay -->
      <path d="M25 0 C12 0 1 11 1 24 C1 36 19 50 25 54 C31 50 49 36 49 24 C49 11 38 0 25 0 Z" 
            fill="url(#gradient)" 
            style="mix-blend-mode: soft-light" />
      
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:white;stop-opacity:0.3" />
          <stop offset="100%" style="stop-color:black;stop-opacity:0.1" />
        </linearGradient>
      </defs>
    </svg>
  `;
  
  return {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgString),
    scaledSize: new google.maps.Size(40, 44),
    anchor: new google.maps.Point(20, 44),
  };
};

export default function DeliveryMap({
  pickupLocation,
  dropLocation,
  deliveryMenLocations,
  onDeliveryManSelect,
  selectedDeliveryMan
}: DeliveryMapProps) {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [center, setCenter] = useState(ADDIS_ABABA);
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const [nearbyDrivers, setNearbyDrivers] = useState<typeof deliveryMenLocations>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCrUdJaAHlJJMmu75Qtk97zTGq8E_0A-PA",
    libraries,
  });

  useEffect(() => {
    if (isLoaded && pickupLocation && dropLocation) {
      const directionsService = new google.maps.DirectionsService();
      const bounds = new google.maps.LatLngBounds();

      // Add pickup and drop locations to bounds
      bounds.extend(pickupLocation);
      bounds.extend(dropLocation);
      
      // Add all delivery personnel to bounds
      deliveryMenLocations.forEach(loc => bounds.extend({ lat: loc.lat, lng: loc.lng }));

      directionsService.route(
        {
          origin: pickupLocation,
          destination: dropLocation,
          travelMode: google.maps.TravelMode.DRIVING,
          optimizeWaypoints: true,
          provideRouteAlternatives: true,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
            
            // Calculate nearby drivers with more accurate distance
            const nearby = deliveryMenLocations
              .map(driver => {
                const distance = google.maps.geometry.spherical.computeDistanceBetween(
                  new google.maps.LatLng(pickupLocation),
                  new google.maps.LatLng(driver.lat, driver.lng)
                );
                const speed = driver.vehicleType === 'motorbike' ? 40 : 30; // km/h
                const timeInMinutes = Math.round((distance / 1000) / speed * 60);
                
                return {
                  ...driver,
                  distance: `${(distance / 1000).toFixed(1)}km`,
                  estimatedTime: `${timeInMinutes}min`
                };
              })
              .sort((a, b) => parseFloat(a.distance!) - parseFloat(b.distance!));
            
            setNearbyDrivers(nearby);
          }
        }
      );

      // Fit bounds with padding
      if (mapRef.current) {
        mapRef.current.fitBounds(bounds, {
          top: 60,
          right: 60,
          bottom: 60,
          left: 60
        });
      }
    }
  }, [isLoaded, pickupLocation, dropLocation, deliveryMenLocations]);

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  const filteredDrivers = nearbyDrivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  if (loadError) {
    return (
      <div className="w-full h-full bg-muted/10 rounded-lg flex items-center justify-center">
        <div className="text-center p-4">
          <p className="text-red-500 font-medium">Error loading map</p>
          <p className="text-sm text-muted-foreground mt-2">Please check your internet connection</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full bg-muted/10 rounded-lg flex items-center justify-center">
        <div className="text-center p-4">
          <p className="font-medium">Loading map...</p>
          <p className="text-sm text-muted-foreground mt-2">Please wait</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search delivery personnel by name..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-[500px] rounded-xl overflow-hidden border shadow-sm">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={13}
          onLoad={handleMapLoad}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: true,
            styles: mapStyles,
            mapTypeId: 'terrain',
            tilt: 45,
            heading: 0,
            gestureHandling: 'greedy',
          }}
        >
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                suppressMarkers: true,
                polylineOptions: {
                  strokeColor: "#4F46E5",
                  strokeWeight: 5,
                  strokeOpacity: 0.7,
                  geodesic: true,
                },
                markerOptions: {
                  zIndex: 1,
                },
              }}
            />
          )}

          {/* Pickup Location Marker */}
          <Marker
            position={pickupLocation}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: "#22C55E",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2,
            }}
            title="Pickup Location"
          />

          {/* Drop Location Marker */}
          <Marker
            position={dropLocation}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: "#EF4444",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2,
            }}
            title="Drop Location"
          />

          {/* Delivery Personnel Markers */}
          {deliveryMenLocations.map((location) => {
            const isSelected = selectedDeliveryMan === location.id;
            
            return (
              <Marker
                key={location.id}
                position={{ lat: location.lat, lng: location.lng }}
                onClick={() => {
                  onDeliveryManSelect(location.id);
                  setSelectedMarker(location.id);
                  
                  // Smoothly pan to the selected marker
                  if (mapRef.current) {
                    mapRef.current.panTo({ lat: location.lat, lng: location.lng });
                    mapRef.current.setZoom(15);
                  }
                  
                  // Find and highlight the corresponding list item
                  const listItem = document.getElementById(`driver-${location.id}`);
                  if (listItem) {
                    listItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
                icon={createCustomMarkerIcon(location.vehicleType, isSelected)}
                animation={isSelected ? google.maps.Animation.BOUNCE : undefined}
              >
                {selectedMarker === location.id && (
                  <InfoWindow
                    onCloseClick={() => setSelectedMarker(null)}
                    options={{
                      pixelOffset: new google.maps.Size(0, -20),
                      maxWidth: 300,
                    }}
                  >
                    <div className="p-3 min-w-[250px]">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary' : 'bg-primary/10'}`}>
                          {React.createElement(vehicleIcons[location.vehicleType] || vehicleIcons.car, {
                            className: `w-5 h-5 ${isSelected ? 'text-white' : 'text-primary'}`
                          })}
                        </div>
                        <div>
                          <h4 className="font-medium">{location.name}</h4>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <span>{location.rating || 4.5}</span>
                            <span className="mx-1">•</span>
                            <span>{location.completedDeliveries} deliveries</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Navigation className="w-4 h-4 text-muted-foreground" />
                          <span>{location.distance}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{location.estimatedTime}</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => onDeliveryManSelect(location.id)}
                        className={`mt-3 w-full py-2 px-4 rounded-md text-sm font-medium transition-colors
                          ${isSelected
                            ? 'bg-primary text-white hover:bg-primary/90'
                            : 'bg-primary/10 text-primary hover:bg-primary/20'
                          }`}
                      >
                        {isSelected ? 'Selected' : 'Select Driver'}
                      </button>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            );
          })}
        </GoogleMap>
      </div>

      {/* Nearby Drivers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDrivers.map((driver) => {
          const VehicleIcon = vehicleIcons[driver.vehicleType] || vehicleIcons.car;
          const isSelected = selectedDeliveryMan === driver.id;
          
          return (
            <Card
              key={driver.id}
              id={`driver-${driver.id}`}
              className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                isSelected ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => {
                onDeliveryManSelect(driver.id);
                setSelectedMarker(driver.id);
                if (mapRef.current) {
                  mapRef.current.panTo({ lat: driver.lat, lng: driver.lng });
                  mapRef.current.setZoom(15);
                }
              }}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${
                  isSelected ? 'bg-primary text-white' : 'bg-primary/5 text-primary'
                }`}>
                  <VehicleIcon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{driver.name}</h4>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm">{driver.rating || 4.5}</span>
                        <span className="text-muted-foreground/30">•</span>
                        <span className="text-sm text-muted-foreground">
                          {driver.completedDeliveries} deliveries
                        </span>
                      </div>
                    </div>
                    <Badge variant={isSelected ? "default" : "outline"} className="capitalize">
                      {driver.vehicleType}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Navigation className="w-4 h-4" />
                      <span>{driver.distance}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{driver.estimatedTime}</span>
                    </div>
                  </div>

                  {driver.languages && driver.languages.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {driver.languages.map(lang => (
                        <Badge key={lang} variant="secondary" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <Button
                    className="w-full mt-3"
                    variant={isSelected ? "default" : "outline"}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeliveryManSelect(driver.id);
                    }}
                  >
                    {isSelected ? 'Selected' : 'Select Driver'}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
} 