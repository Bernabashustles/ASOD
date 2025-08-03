'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  DollarSign, 
  Truck, 
  FileText, 
  Users, 
  Globe,
  Calendar,
  Package,
  BarChart3,
  Settings,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash2,
  Plus,
  ExternalLink,
  CheckCircle,
  XCircle,
  RefreshCw,
  MoreVertical
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from 'framer-motion';

interface Address {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  longitude: number;
  latitude: number;
}

interface ContactPerson {
  name: string;
  position: string;
  email: string;
  phone: string;
}

interface Metadata {
  preferredShippingMethod: string;
  minimumOrderValue: number;
  taxId: string;
}

interface Supplier {
  companyName: string;
  supplierType: string;
  paymentTerms: string;
  status: 'active' | 'inactive' | 'pending';
  notes: string;
  address: Address;
  contactPersons: ContactPerson[];
  leadTime: number;
  metadata: Metadata;
}

export default function SupplierDetailPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditMode, setIsEditMode] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showMapDialog, setShowMapDialog] = useState(false);

  // Sample supplier data
  const [supplier, setSupplier] = useState<Supplier>({
    companyName: "Corteex Garment",
    supplierType: "manufacturer",
    paymentTerms: "Net 30",
    status: "active",
    notes: "Primary supplier for electronic components",
    address: {
      address1: "123 Industrial Park",
      address2: "Building 4",
      city: "San Francisco",
      state: "CA",
      country: "USA",
      postalCode: "94105",
      longitude: -122.4194,
      latitude: 37.7749
    },
    contactPersons: [
      {
        name: "John Smith",
        position: "Sales Manager",
        email: "john.smith@techcomponents.com",
        phone: "+1-555-123-4567"
      },
      {
        name: "Sarah Johnson",
        position: "Account Manager",
        email: "sarah.j@techcomponents.com",
        phone: "+1-555-987-6543"
      }
    ],
    leadTime: 14,
    metadata: {
      preferredShippingMethod: "DHL",
      minimumOrderValue: 1000,
      taxId: "US123456789"
    }
  });

  // Sample performance metrics
  const performanceMetrics = {
    onTimeDelivery: 95,
    qualityScore: 4.8,
    responseTime: 24,
    returnRate: 0.5,
    orderAccuracy: 98
  };

  // Sample recent orders
  const recentOrders = [
    {
      id: "PO-2024-001",
      date: "2024-03-20",
      amount: 12500,
      status: "delivered",
      items: 45
    },
    {
      id: "PO-2024-002",
      date: "2024-03-15",
      amount: 8750,
      status: "processing",
      items: 30
    }
  ];

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">{supplier.companyName}</h1>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>ID: {params.id}</span>
                <span>•</span>
                {renderStatusBadge(supplier.status)}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setIsEditMode(!isEditMode)}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Details
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>Actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <Plus className="w-4 h-4 mr-2" />
                Create Order
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="w-4 h-4 mr-2" />
                View Documents
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Supplier
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Company Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-500">Company Type</Label>
                    <p className="font-medium capitalize">{supplier.supplierType}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Payment Terms</Label>
                    <p className="font-medium">{supplier.paymentTerms}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Lead Time</Label>
                    <p className="font-medium">{supplier.leadTime} days</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Tax ID</Label>
                    <p className="font-medium">{supplier.metadata.taxId}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <Label className="text-sm text-gray-500">Notes</Label>
                  <p className="text-sm mt-1">{supplier.notes}</p>
                </div>
              </CardContent>
            </Card>

            {/* Location Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Location</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border bg-gray-50/50 p-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                      <div>
                        <p className="font-medium">{supplier.address.address1}</p>
                        {supplier.address.address2 && (
                          <p>{supplier.address.address2}</p>
                        )}
                        <p>{supplier.address.city}, {supplier.address.state} {supplier.address.postalCode}</p>
                        <p>{supplier.address.country}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full" onClick={() => setShowMapDialog(true)}>
                  <Globe className="w-4 h-4 mr-2" />
                  View on Map
                </Button>
              </CardContent>
            </Card>

            {/* Shipping & Orders */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Shipping & Orders</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-500">Preferred Shipping</Label>
                    <p className="font-medium">{supplier.metadata.preferredShippingMethod}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Minimum Order</Label>
                    <p className="font-medium">ETB {supplier.metadata.minimumOrderValue}</p>
                  </div>
                </div>
                
                <div className="rounded-lg border p-4 space-y-3">
                  <h4 className="font-medium">Recent Orders</h4>
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between text-sm">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">ETB {order.amount}</p>
                        <Badge variant="outline">{order.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-gray-500">On-Time Delivery</Label>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${performanceMetrics.onTimeDelivery}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{performanceMetrics.onTimeDelivery}%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-gray-500">Quality Score</Label>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(performanceMetrics.qualityScore / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{performanceMetrics.qualityScore}/5</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 pt-2">
                  <div className="text-center p-3 rounded-lg bg-gray-50">
                    <p className="text-sm text-gray-500">Response Time</p>
                    <p className="font-medium">{performanceMetrics.responseTime}h</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-gray-50">
                    <p className="text-sm text-gray-500">Return Rate</p>
                    <p className="font-medium">{performanceMetrics.returnRate}%</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-gray-50">
                    <p className="text-sm text-gray-500">Order Accuracy</p>
                    <p className="font-medium">{performanceMetrics.orderAccuracy}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contacts">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg">Contact Persons</CardTitle>
              <Button onClick={() => setShowContactDialog(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Contact
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {supplier.contactPersons.map((contact, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{contact.name}</p>
                            <p className="text-sm text-gray-500">{contact.position}</p>
                            <div className="mt-2 space-y-1">
                              <div className="flex items-center gap-2 text-sm">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                                  {contact.email}
                                </a>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <a href={`tel:${contact.phone}`} className="text-blue-600 hover:underline">
                                  {contact.phone}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit Contact</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              Remove Contact
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Map Dialog */}
      <Dialog open={showMapDialog} onOpenChange={setShowMapDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Location Map</DialogTitle>
          </DialogHeader>
          <div className="aspect-video rounded-lg bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500">Map integration will be implemented here</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg mt-4">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-gray-500 mt-1" />
              <div>
                <p className="font-medium">{supplier.address.address1}</p>
                {supplier.address.address2 && <p>{supplier.address.address2}</p>}
                <p>{supplier.address.city}, {supplier.address.state} {supplier.address.postalCode}</p>
                <p>{supplier.address.country}</p>
                <div className="mt-2 text-sm text-gray-500">
                  <p>Latitude: {supplier.address.latitude}</p>
                  <p>Longitude: {supplier.address.longitude}</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Contact Dialog */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Contact Person</DialogTitle>
            <DialogDescription>
              Add a new contact person for this supplier.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input id="position" placeholder="Enter position" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" placeholder="Enter phone number" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowContactDialog(false)}>
              Cancel
            </Button>
            <Button>Add Contact</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 