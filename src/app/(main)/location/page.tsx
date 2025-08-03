'use client';

import React from 'react';
import { MapPin, Globe, Mail, Phone } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const locationData = {
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
  mapUrl: "https://maps.google.com/?q=456+Market+Street"
};

export default function LocationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Location Information</h1>
        <p className="text-sm text-gray-500 mt-2">View and manage your store location details.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Address Details
            </CardTitle>
            <CardDescription>Your store's physical location information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Street Address</label>
              <p className="mt-1">{locationData.street}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">City</label>
                <p className="mt-1">{locationData.city}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">State</label>
                <p className="mt-1">{locationData.state}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Postal Code</label>
                <p className="mt-1">{locationData.postalCode}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Country</label>
                <p className="mt-1">{locationData.country}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Contact Information
            </CardTitle>
            <CardDescription>Store contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Phone Number</label>
              <p className="mt-1 flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                {locationData.phoneNumber}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="mt-1 flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                {locationData.email}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Map Information
            </CardTitle>
            <CardDescription>Additional location details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Latitude</label>
                <p className="mt-1">{locationData.latitude}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Longitude</label>
                <p className="mt-1">{locationData.longitude}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Place ID</label>
              <p className="mt-1">{locationData.placeId}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Plus Code</label>
              <p className="mt-1">{locationData.plusCode}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Google Maps</label>
              <a 
                href={locationData.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-blue-600 hover:text-blue-800 flex items-center gap-2"
              >
                View on Google Maps
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 