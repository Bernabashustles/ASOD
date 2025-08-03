'use client';

import { useState } from 'react';
import { Info, Plus, Search, ShoppingBag, MoreHorizontal } from 'lucide-react';
import { SettingsPage } from '../components/settings-page';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Location {
  id: string;
  name: string;
  address: string;
  status: 'active' | 'inactive';
}

export default function LocationsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddLocation, setShowAddLocation] = useState(false);
  const [locations, setLocations] = useState<Location[]>([
    {
      id: '1',
      name: 'Shop location',
      address: 'Ethiopia',
      status: 'active'
    }
  ]);

  return (
    <SettingsPage title="Locations">
      {/* Header with Actions */}
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Locations</h2>
          <p className="text-sm text-muted-foreground">
            Manage your store locations and inventory points
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto"
            onClick={() => setShowAddLocation(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add location
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="w-full sm:w-auto">
          <Tabs 
            defaultValue="all" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full sm:w-auto"
          >
            <TabsList className="w-full sm:w-auto grid grid-cols-2 sm:flex">
              <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
              <TabsTrigger value="active" className="flex-1">Active</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full"
            />
          </div>
        </div>
      </div>

      {/* Locations List */}
      <Card className="mb-6">
        <CardContent className="p-0">
          <div className="divide-y">
            {locations.map((location) => (
              <div 
                key={location.id}
                className={cn(
                  "p-4 sm:p-6",
                  "hover:bg-muted/50 transition-colors",
                  "flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                )}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{location.name}</h3>
                    <Badge 
                      variant={location.status === 'active' ? 'default' : 'secondary'}
                      className="capitalize"
                    >
                      {location.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{location.address}</p>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    Manage
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit details</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* POS Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-base">Point of Sale subscriptions</CardTitle>
          </div>
          <CardDescription>
            Start selling in person from any location with the POS subscription
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-medium">Point of Sale</div>
                <div className="text-sm text-muted-foreground">Installed</div>
              </div>
            </div>
            <Button variant="outline" className="w-full sm:w-auto ml-auto">
              Open
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add Location Dialog */}
      <Dialog open={showAddLocation} onOpenChange={setShowAddLocation}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add location</DialogTitle>
            <DialogDescription>
              Add a new location to your store
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Location name</Label>
              <Input placeholder="Enter location name" />
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Input placeholder="Enter address" />
            </div>
          </div>
          <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setShowAddLocation(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => setShowAddLocation(false)}
              className="w-full sm:w-auto"
            >
              Add location
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SettingsPage>
  );
} 