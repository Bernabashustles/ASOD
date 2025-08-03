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
  AlertCircle,
  Info,
  Filter,
  Star,
  TrendingUp,
  Package,
  ShoppingBag,
  Eye,
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
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ShopSettingsPage() {
  const [shops, setShops] = useState([
    {
      id: 1,
      name: 'Downtown Fashion Store',
      type: 'Retail',
      address: '123 Main St, City, State, 12345',
      phone: '+1 (555) 123-4567',
      email: 'downtown@example.com',
      status: 'active',
      revenue: 125000,
      orders: 450,
      products: 230,
      rating: 4.8,
      openingHours: '9:00 AM - 9:00 PM',
      lastActive: '2 hours ago',
    },
    {
      id: 2,
      name: 'Tech Haven',
      type: 'Electronics',
      address: '456 Market St, City, State, 12345',
      phone: '+1 (555) 234-5678',
      email: 'techhaven@example.com',
      status: 'active',
      revenue: 250000,
      orders: 780,
      products: 450,
      rating: 4.5,
      openingHours: '10:00 AM - 8:00 PM',
      lastActive: '5 minutes ago',
    },
    {
      id: 3,
      name: 'Home & Garden Center',
      type: 'Home Goods',
      address: '789 Garden Ave, City, State, 12345',
      phone: '+1 (555) 345-6789',
      email: 'garden@example.com',
      status: 'maintenance',
      revenue: 89000,
      orders: 320,
      products: 680,
      rating: 4.2,
      openingHours: '8:00 AM - 6:00 PM',
      lastActive: '1 day ago',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const [selectedShop, setSelectedShop] = useState(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    type: '',
    address: '',
    phone: '',
    email: '',
    status: 'active',
    openingHours: '',
  });

  const filteredShops = shops
    .filter(shop => {
      const matchesSearch = 
        shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || shop.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'revenue':
          return b.revenue - a.revenue;
        case 'orders':
          return b.orders - a.orders;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleCreateShop = (e) => {
    e.preventDefault();
    // Add shop creation logic here
    setIsCreateDialogOpen(false);
  };

  const handleEditShop = (e) => {
    e.preventDefault();
    // Add shop update logic here
    setIsEditDialogOpen(false);
  };

  const handleDeleteShop = (shopId) => {
    // Add shop deletion logic here
    const updatedShops = shops.filter(shop => shop.id !== shopId);
    setShops(updatedShops);
  };

  const openEditDialog = (shop) => {
    setSelectedShop(shop);
    setEditFormData({
      name: shop.name,
      type: shop.type,
      address: shop.address,
      phone: shop.phone,
      email: shop.email,
      status: shop.status,
      openingHours: shop.openingHours,
    });
    setIsEditDialogOpen(true);
  };

  return (
    <SettingsPage
      title="Shop Management"
      description="Manage your store locations and settings"
    >
      <div className="space-y-8">
        {/* Header Actions */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search shops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Shops</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px]">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="orders">Orders</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Shop
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <form onSubmit={handleCreateShop}>
                    <DialogHeader>
                      <DialogTitle>Create New Shop</DialogTitle>
                      <DialogDescription>
                        Add a new shop location to your store network.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Shop Name</Label>
                          <Input id="name" placeholder="Enter shop name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="type">Shop Type</Label>
                          <Input id="type" placeholder="e.g. Retail, Electronics" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea id="address" placeholder="Enter full address" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" placeholder="Phone number" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="Email address" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="status">Status</Label>
                          <Select defaultValue="active">
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="maintenance">Maintenance</SelectItem>
                              <SelectItem value="closed">Closed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="hours">Opening Hours</Label>
                          <Input id="hours" placeholder="e.g. 9:00 AM - 9:00 PM" />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Create Shop</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Shops
              </CardTitle>
              <Store className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{shops.length}</div>
              <p className="text-xs text-muted-foreground">
                Across {shops.filter(s => s.status === 'active').length} active locations
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${shops.reduce((sum, shop) => sum + shop.revenue, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                From all shop locations
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Orders
              </CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {shops.reduce((sum, shop) => sum + shop.orders, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Across all shops
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Products
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {shops.reduce((sum, shop) => sum + shop.products, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Available for sale
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Shop Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredShops.map((shop) => (
            <Card key={shop.id} className="group">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1.5">
                    <CardTitle className="text-xl font-semibold">{shop.name}</CardTitle>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="capitalize">
                        {shop.type}
                      </Badge>
                      <Badge
                        variant={
                          shop.status === 'active'
                            ? "default"
                            : shop.status === 'maintenance'
                            ? "secondary"
                            : "outline"
                        }
                        className="capitalize"
                      >
                        {shop.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => {
                        setSelectedShop(shop);
                        setIsDetailDialogOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => openEditDialog(shop)}>
                          Edit Shop
                        </DropdownMenuItem>
                        <DropdownMenuItem>View Analytics</DropdownMenuItem>
                        <DropdownMenuItem>Manage Products</DropdownMenuItem>
                        <DropdownMenuItem>Update Hours</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDeleteShop(shop.id)}
                        >
                          Delete Shop
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{shop.address}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <Phone className="h-4 w-4 shrink-0" />
                      {shop.phone}
                    </span>
                    <span className="flex items-center gap-2">
                      <Mail className="h-4 w-4 shrink-0" />
                      {shop.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 shrink-0" />
                    {shop.openingHours}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                    <p className="text-xl font-bold mt-1">${(shop.revenue / 1000).toFixed(1)}k</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Orders</p>
                    <p className="text-xl font-bold mt-1">{shop.orders}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Rating</p>
                    <p className="text-xl font-bold mt-1 flex items-center gap-1">
                      {shop.rating}
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground border-t pt-4">
                Last active: {shop.lastActive}
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <form onSubmit={handleEditShop}>
              <DialogHeader>
                <DialogTitle>Edit Shop</DialogTitle>
                <DialogDescription>
                  Update the details for {selectedShop?.name}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Shop Name</Label>
                    <Input
                      id="edit-name"
                      value={editFormData.name}
                      onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-type">Shop Type</Label>
                    <Input
                      id="edit-type"
                      value={editFormData.type}
                      onChange={(e) => setEditFormData({ ...editFormData, type: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-address">Address</Label>
                  <Textarea
                    id="edit-address"
                    value={editFormData.address}
                    onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-phone">Phone</Label>
                    <Input
                      id="edit-phone"
                      value={editFormData.phone}
                      onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-email">Email</Label>
                    <Input
                      id="edit-email"
                      type="email"
                      value={editFormData.email}
                      onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-status">Status</Label>
                    <Select
                      value={editFormData.status}
                      onValueChange={(value) => setEditFormData({ ...editFormData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-hours">Opening Hours</Label>
                    <Input
                      id="edit-hours"
                      value={editFormData.openingHours}
                      onChange={(e) => setEditFormData({ ...editFormData, openingHours: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Detail Dialog */}
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedShop?.name}</DialogTitle>
              <DialogDescription>
                Detailed information about this shop location.
              </DialogDescription>
            </DialogHeader>
            {selectedShop && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm">Type</h4>
                    <p className="text-sm text-muted-foreground">{selectedShop.type}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Status</h4>
                    <Badge
                      variant={
                        selectedShop.status === 'active'
                          ? "default"
                          : selectedShop.status === 'maintenance'
                          ? "secondary"
                          : "outline"
                      }
                      className="mt-1 capitalize"
                    >
                      {selectedShop.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-sm">Address</h4>
                  <p className="text-sm text-muted-foreground">{selectedShop.address}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm">Phone</h4>
                    <p className="text-sm text-muted-foreground">{selectedShop.phone}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Email</h4>
                    <p className="text-sm text-muted-foreground">{selectedShop.email}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-sm">Opening Hours</h4>
                  <p className="text-sm text-muted-foreground">{selectedShop.openingHours}</p>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div>
                    <h4 className="font-medium text-sm">Revenue</h4>
                    <p className="text-xl font-bold">${(selectedShop.revenue / 1000).toFixed(1)}k</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Orders</h4>
                    <p className="text-xl font-bold">{selectedShop.orders}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Rating</h4>
                    <p className="text-xl font-bold flex items-center gap-1">
                      {selectedShop.rating}
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <h4 className="font-medium text-sm">Products</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedShop.products} products available for sale
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Help Section */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Need help managing your shops? Check out our{" "}
            <a href="#" className="font-medium underline underline-offset-4">
              shop management guide
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