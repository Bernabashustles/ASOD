'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Plus, Search, Filter, Download, MoreHorizontal, PackageCheck, Truck, Building2, AlertTriangle, Package, MapPin, Store, Globe, RefreshCw, Clock, ShoppingBag, Trash2, Edit, Eye, BarChart3 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pagination } from "@/components/ui/pagination";

// Interface for Supplier data
interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  status: 'active' | 'inactive' | 'pending';
  productsCount: number;
  ordersCount: number;
  rating: number;
  paymentTerms: string;
  lastOrder: string;
}

// Interface for Order data
interface Order {
  id: string;
  supplierId: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
  paymentStatus: 'unpaid' | 'partial' | 'paid';
  eta?: string;
}

export default function SupplierPage() {
  const searchParams = useSearchParams();
  // Sample supplier data
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: '1',
      name: 'Addis Textiles Ltd',
      contact: 'Abebe Kebede',
      email: 'abebe@addistextiles.com',
      phone: '+251911234567',
      address: 'Bole, Addis Ababa, Ethiopia',
      status: 'active',
      productsCount: 124,
      ordersCount: 45,
      rating: 4.8,
      paymentTerms: 'Net 30',
      lastOrder: '2023-12-15',
    },
    {
      id: '2',
      name: 'Bishoftu Electronics',
      contact: 'Sara Mekonnen',
      email: 'sara@bishoftuelectronics.com',
      phone: '+251922345678',
      address: 'Bishoftu, Ethiopia',
      status: 'active',
      productsCount: 86,
      ordersCount: 31,
      rating: 4.5,
      paymentTerms: 'Net 45',
      lastOrder: '2023-12-20',
    },
    {
      id: '3',
      name: 'Awassa Food Supplies',
      contact: 'Daniel Bekele',
      email: 'daniel@awassafoods.com',
      phone: '+251933456789',
      address: 'Awassa, Ethiopia',
      status: 'inactive',
      productsCount: 43,
      ordersCount: 12,
      rating: 3.9,
      paymentTerms: 'Net 15',
      lastOrder: '2023-10-05',
    },
    {
      id: '4',
      name: 'Mekelle Crafts Co.',
      contact: 'Tigist Haile',
      email: 'tigist@mekellecrafts.com',
      phone: '+251944567890',
      address: 'Mekelle, Ethiopia',
      status: 'pending',
      productsCount: 75,
      ordersCount: 0,
      rating: 0,
      paymentTerms: 'Net 30',
      lastOrder: '-',
    },
    {
      id: '5',
      name: 'Dire Dawa Imports',
      contact: 'Mohammed Ahmed',
      email: 'mohammed@diredawaimports.com',
      phone: '+251955678901',
      address: 'Dire Dawa, Ethiopia',
      status: 'active',
      productsCount: 156,
      ordersCount: 67,
      rating: 4.7,
      paymentTerms: 'Net 60',
      lastOrder: '2023-12-28',
    },
  ]);

  // Sample orders data
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      supplierId: '1',
      orderNumber: 'PO-2024-001',
      date: '2024-02-15',
      status: 'delivered',
      total: 12500,
      items: 8,
      paymentStatus: 'paid',
    },
    {
      id: '2',
      supplierId: '1',
      orderNumber: 'PO-2024-008',
      date: '2024-03-10',
      status: 'shipped',
      total: 4200,
      items: 3,
      paymentStatus: 'paid',
      eta: '2024-03-25',
    },
    {
      id: '3',
      supplierId: '2',
      orderNumber: 'PO-2024-012',
      date: '2024-03-18',
      status: 'processing',
      total: 7350,
      items: 5,
      paymentStatus: 'partial',
    },
    {
      id: '4',
      supplierId: '5',
      orderNumber: 'PO-2024-015',
      date: '2024-03-22',
      status: 'pending',
      total: 9800,
      items: 12,
      paymentStatus: 'unpaid',
    },
    {
      id: '5',
      supplierId: '3',
      orderNumber: 'PO-2024-009',
      date: '2024-03-05',
      status: 'cancelled',
      total: 3600,
      items: 4,
      paymentStatus: 'unpaid',
    },
  ]);

  // State for filters and search
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);
  const [isAddSupplierOpen, setIsAddSupplierOpen] = useState(false);
  const [newSupplier, setNewSupplier] = useState<Partial<Supplier> & {
    country: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    postalCode: string;
  }>({
    name: '',
    contact: '',
    email: '',
    phone: '',
    address: '',
    country: 'Ethiopia',
    addressLine1: '',
    addressLine2: '',
    city: '',
    postalCode: '',
    paymentTerms: 'Net 30',
    status: 'pending',
  });
  const [activeTab, setActiveTab] = useState<string>('all-suppliers');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // State for orders
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [supplierFilter, setSupplierFilter] = useState<string>('all');
  const [orderSearchTerm, setOrderSearchTerm] = useState('');
  
  // State for order pagination
  const [orderCurrentPage, setOrderCurrentPage] = useState(1);
  const [orderItemsPerPage, setOrderItemsPerPage] = useState(12);

  // Handle URL parameters
  useEffect(() => {
    // Check if the add parameter is present
    if (searchParams.get('add') === 'true') {
      setIsAddSupplierOpen(true);
    }
    
    // Check if the tab parameter is present
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      if (tabParam === 'orders') {
        setActiveTab('orders');
      } else if (tabParam === 'performance') {
        setActiveTab('performance');
      } else {
        setActiveTab('all-suppliers');
      }
    }
  }, [searchParams]);

  // Filter suppliers based on search term and status
  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((supplier) => {
      const matchesSearch = searchTerm === '' || 
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || supplier.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [suppliers, searchTerm, statusFilter]);

  // Calculate summary metrics
  const totalSuppliers = suppliers.length;
  const activeSuppliers = suppliers.filter(s => s.status === 'active').length;
  const inactiveSuppliers = suppliers.filter(s => s.status === 'inactive').length;
  const pendingSuppliers = suppliers.filter(s => s.status === 'pending').length;

  // Handle supplier selection
  const toggleSupplierSelection = (supplierId: string) => {
    setSelectedSuppliers(prevSelected => 
      prevSelected.includes(supplierId)
        ? prevSelected.filter(id => id !== supplierId)
        : [...prevSelected, supplierId]
    );
  };

  // Handle select all
  const toggleSelectAll = () => {
    if (selectedSuppliers.length === filteredSuppliers.length) {
      setSelectedSuppliers([]);
    } else {
      setSelectedSuppliers(filteredSuppliers.map(supplier => supplier.id));
    }
  };

  // Handle adding a new supplier
  const handleAddSupplier = () => {
    if (newSupplier.name && newSupplier.email) {
      const newId = (suppliers.length + 1).toString();
      
      // Concatenate address fields
      const fullAddress = [
        newSupplier.addressLine1,
        newSupplier.addressLine2,
        newSupplier.city,
        newSupplier.postalCode,
        newSupplier.country
      ].filter(Boolean).join(', ');
      
      const supplierToAdd = {
        id: newId,
        name: newSupplier.name,
        contact: newSupplier.contact || '',
        email: newSupplier.email,
        phone: newSupplier.phone || '',
        address: fullAddress,
        status: newSupplier.status as 'active' | 'inactive' | 'pending',
        productsCount: 0,
        ordersCount: 0,
        rating: 0,
        paymentTerms: newSupplier.paymentTerms || 'Net 30',
        lastOrder: '-',
      };
      
      setSuppliers([...suppliers, supplierToAdd]);
      setIsAddSupplierOpen(false);
      setNewSupplier({
        name: '',
        contact: '',
        email: '',
        phone: '',
        address: '',
        country: 'Ethiopia',
        addressLine1: '',
        addressLine2: '',
        city: '',
        postalCode: '',
        paymentTerms: 'Net 30',
        status: 'pending',
      });
    }
  };

  // Render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Inactive</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
      default:
        return null;
    }
  };

  // Calculate total pages for pagination
  const totalItems = filteredSuppliers.length;

  // Filter orders based on search term, status, and supplier
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = orderSearchTerm === '' || 
        order.orderNumber.toLowerCase().includes(orderSearchTerm.toLowerCase());
      
      const matchesStatus = orderStatusFilter === 'all' || order.status === orderStatusFilter;
      
      const matchesSupplier = supplierFilter === 'all' || order.supplierId === supplierFilter;
      
      return matchesSearch && matchesStatus && matchesSupplier;
    });
  }, [orders, orderSearchTerm, orderStatusFilter, supplierFilter]);

  // Render order status badge
  const renderOrderStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Processing</Badge>;
      case 'shipped':
        return <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">Shipped</Badge>;
      case 'delivered':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Delivered</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Cancelled</Badge>;
      default:
        return null;
    }
  };

  // Render payment status badge
  const renderPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Paid</Badge>;
      case 'partial':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">Partial</Badge>;
      case 'unpaid':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Unpaid</Badge>;
      default:
        return null;
    }
  };

  // Get supplier name by ID
  const getSupplierName = (supplierId: string) => {
    const supplier = suppliers.find(s => s.id === supplierId);
    return supplier ? supplier.name : 'Unknown Supplier';
  };

  // Calculate total items for order pagination
  const totalOrderItems = filteredOrders.length;

  return (
    <div className="px-4 sm:px-6 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Suppliers</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your supplier relationships and inventory sources
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setIsAddSupplierOpen(true)} className="whitespace-nowrap">
            <Plus className="w-4 h-4 mr-2" />
            Add Supplier
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Suppliers</p>
                <h3 className="text-xl sm:text-2xl font-bold mt-1">{totalSuppliers}</h3>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Suppliers</p>
                <h3 className="text-xl sm:text-2xl font-bold mt-1">{activeSuppliers}</h3>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-100 flex items-center justify-center">
                <PackageCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Inactive Suppliers</p>
                <h3 className="text-xl sm:text-2xl font-bold mt-1">{inactiveSuppliers}</h3>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Package className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Suppliers</p>
                <h3 className="text-xl sm:text-2xl font-bold mt-1">{pendingSuppliers}</h3>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs and Filters */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="all-suppliers">All Suppliers</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-suppliers">
          <div className="bg-white rounded-lg border">
            <div className="p-4 border-b flex flex-col space-y-3">
              <div className="flex items-center w-full">
                <div className="relative w-full">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search suppliers..."
                    className="w-full pl-9 pr-4"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex items-center gap-2 ml-auto">
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Filter className="h-4 w-4" />
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="h-9 w-9">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Bulk Edit</DropdownMenuItem>
                      <DropdownMenuItem>Import Suppliers</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Delete Selected</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]">
                        <Checkbox 
                          checked={selectedSuppliers.length === filteredSuppliers.length && filteredSuppliers.length > 0} 
                          onCheckedChange={toggleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead className="hidden md:table-cell">Contact</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden lg:table-cell">Products</TableHead>
                      <TableHead className="hidden md:table-cell">Orders</TableHead>
                      <TableHead className="hidden lg:table-cell">Rating</TableHead>
                      <TableHead className="hidden xl:table-cell">Payment Terms</TableHead>
                      <TableHead className="hidden lg:table-cell">Last Order</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSuppliers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={10} className="text-center py-8">
                          <div className="flex flex-col items-center justify-center text-gray-500">
                            <Package className="w-12 h-12 mb-3 text-gray-300" />
                            <p className="font-medium">No suppliers found</p>
                            <p className="text-sm mt-1">Try adjusting your search or filters</p>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mt-4"
                              onClick={() => {
                                setSearchTerm('');
                                setStatusFilter('all');
                              }}
                            >
                              <RefreshCw className="w-4 h-4 mr-2" />
                              Reset filters
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredSuppliers.map((supplier) => (
                        <TableRow key={supplier.id} className={selectedSuppliers.includes(supplier.id) ? 'bg-blue-50' : ''}>
                          <TableCell>
                            <Checkbox 
                              checked={selectedSuppliers.includes(supplier.id)} 
                              onCheckedChange={() => toggleSupplierSelection(supplier.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 font-medium">
                                {supplier.name.substring(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <div className="font-medium">{supplier.name}</div>
                                <div className="text-xs text-gray-500 flex items-center">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {supplier.address}
                                </div>
                                <div className="block md:hidden text-xs text-gray-500 mt-1">
                                  {supplier.contact && (
                                    <div>{supplier.contact}</div>
                                  )}
                                  {supplier.email && (
                                    <div>{supplier.email}</div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div>
                              <div className="font-medium">{supplier.contact}</div>
                              <div className="text-xs text-gray-500">{supplier.email}</div>
                              <div className="text-xs text-gray-500">{supplier.phone}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {renderStatusBadge(supplier.status)}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <Link href={`/products?supplier=${supplier.id}`} className="text-blue-600 hover:underline">
                              {supplier.productsCount}
                            </Link>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Link href={`/orders?supplier=${supplier.id}`} className="text-blue-600 hover:underline">
                              {supplier.ordersCount}
                            </Link>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {supplier.rating > 0 ? (
                              <div className="flex items-center">
                                <span className="font-medium">{supplier.rating.toFixed(1)}</span>
                                <div className="text-yellow-400 ml-1">★</div>
                              </div>
                            ) : (
                              <span className="text-gray-400 text-sm">N/A</span>
                            )}
                          </TableCell>
                          <TableCell className="hidden xl:table-cell">{supplier.paymentTerms}</TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {supplier.lastOrder !== '-' ? (
                              <div className="flex items-center text-sm">
                                <Clock className="w-3 h-3 mr-1 text-gray-400" />
                                {new Date(supplier.lastOrder).toLocaleDateString()}
                              </div>
                            ) : (
                              <span className="text-gray-400 text-sm">No orders</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="hidden sm:flex h-8 w-8">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Edit Supplier</DropdownMenuItem>
                                  <DropdownMenuItem>Create Order</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">Delete Supplier</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <div className="p-4 border-t">
              <div className="w-full overflow-auto">
                <Pagination 
                  currentPage={currentPage}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                  onItemsPerPageChange={setItemsPerPage}
                  itemName="suppliers"
                />
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="orders">
          <div className="bg-white rounded-lg border">
            <div className="p-4 border-b flex flex-col space-y-3">
              <div className="flex items-center w-full">
                <div className="relative w-full">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search order number..."
                    className="w-full pl-9 pr-4"
                    value={orderSearchTerm}
                    onChange={(e) => setOrderSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-2">
                <Select value={orderStatusFilter} onValueChange={setOrderStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="Order Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={supplierFilter} onValueChange={setSupplierFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Select Supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Suppliers</SelectItem>
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier.id} value={supplier.id}>{supplier.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="flex items-center gap-2 ml-auto">
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Filter className="h-4 w-4" />
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="h-9 w-9">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>New Purchase Order</DropdownMenuItem>
                      <DropdownMenuItem>Export Orders</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Print Selected</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <div className="min-w-[750px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order Number</TableHead>
                      <TableHead className="hidden md:table-cell">Supplier</TableHead>
                      <TableHead className="hidden sm:table-cell">Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden lg:table-cell">Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead className="hidden md:table-cell">Payment</TableHead>
                      <TableHead className="hidden lg:table-cell">ETA</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-8">
                          <div className="flex flex-col items-center justify-center text-gray-500">
                            <Package className="w-12 h-12 mb-3 text-gray-300" />
                            <p className="font-medium">No orders found</p>
                            <p className="text-sm mt-1">Try adjusting your search or filters</p>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mt-4"
                              onClick={() => {
                                setOrderSearchTerm('');
                                setOrderStatusFilter('all');
                                setSupplierFilter('all');
                              }}
                            >
                              <RefreshCw className="w-4 h-4 mr-2" />
                              Reset filters
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">
                            <Link href={`/orders/${order.id}`} className="text-blue-600 hover:underline">
                              {order.orderNumber}
                            </Link>
                            <div className="block md:hidden text-xs text-gray-500 mt-1">
                              {getSupplierName(order.supplierId)}
                            </div>
                            <div className="block sm:hidden text-xs text-gray-500">
                              {new Date(order.date).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center space-x-2">
                              <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 font-medium text-xs">
                                {getSupplierName(order.supplierId).substring(0, 2).toUpperCase()}
                              </div>
                              <span>{getSupplierName(order.supplierId)}</span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <div className="flex items-center text-sm">
                              <Clock className="w-3 h-3 mr-1 text-gray-400" />
                              {new Date(order.date).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            {renderOrderStatusBadge(order.status)}
                            <div className="block md:hidden text-xs text-gray-500 mt-1">
                              {renderPaymentStatusBadge(order.paymentStatus)}
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">{order.items}</TableCell>
                          <TableCell className="font-medium">
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'ETB'
                            }).format(order.total)}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {renderPaymentStatusBadge(order.paymentStatus)}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {order.eta ? new Date(order.eta).toLocaleDateString() : '-'}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="hidden sm:flex h-8 w-8">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Edit Order</DropdownMenuItem>
                                  <DropdownMenuItem>Print Order</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">Cancel Order</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <div className="p-4 border-t">
              <div className="w-full overflow-auto">
                <Pagination 
                  currentPage={orderCurrentPage}
                  totalItems={totalOrderItems}
                  itemsPerPage={orderItemsPerPage}
                  onPageChange={setOrderCurrentPage}
                  onItemsPerPageChange={setOrderItemsPerPage}
                  itemName="orders"
                />
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Performance</CardTitle>
              <CardDescription>
                Analyze and compare the performance of your suppliers
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6 sm:py-10">
              <div className="rounded-full bg-blue-100 p-3 mb-4">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-center">Performance Metrics Coming Soon</h3>
              <p className="text-sm text-gray-500 text-center max-w-md mb-4 px-4">
                Track on-time delivery rates, product quality, pricing competitiveness, and other key performance indicators.
              </p>
              <Button variant="outline">Get Notified When Ready</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Supplier Dialog */}
      <Dialog open={isAddSupplierOpen} onOpenChange={setIsAddSupplierOpen}>
        <DialogContent className="sm:max-w-[600px] w-[95vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader className="sticky top-0 bg-white pb-4 z-10">
            <DialogTitle>Create supplier</DialogTitle>
            <DialogDescription>
              Add a new supplier to your inventory management system
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-5 py-4">
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="name">Company</Label>
              <Input 
                id="name" 
                value={newSupplier.name} 
                onChange={(e) => setNewSupplier({...newSupplier, name: e.target.value})}
                placeholder="Enter company name"
              />
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="country">Country/region</Label>
              <Select 
                value={newSupplier.country} 
                onValueChange={(value) => setNewSupplier({...newSupplier, country: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent position="popper" className="w-[var(--radix-select-trigger-width)]">
                  <SelectItem value="Ethiopia">Ethiopia</SelectItem>
                  <SelectItem value="Kenya">Kenya</SelectItem>
                  <SelectItem value="Nigeria">Nigeria</SelectItem>
                  <SelectItem value="South Africa">South Africa</SelectItem>
                  <SelectItem value="Ghana">Ghana</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="addressLine1">Address</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input 
                  id="addressLine1" 
                  value={newSupplier.addressLine1} 
                  onChange={(e) => setNewSupplier({...newSupplier, addressLine1: e.target.value})}
                  placeholder="Enter street address"
                  className="pl-9"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="addressLine2">Apartment, suite, etc</Label>
              <Input 
                id="addressLine2" 
                value={newSupplier.addressLine2} 
                onChange={(e) => setNewSupplier({...newSupplier, addressLine2: e.target.value})}
                placeholder="Apartment, suite, building (optional)"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input 
                  id="city" 
                  value={newSupplier.city} 
                  onChange={(e) => setNewSupplier({...newSupplier, city: e.target.value})}
                  placeholder="Enter city"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="postalCode">Postal code</Label>
                <Input 
                  id="postalCode" 
                  value={newSupplier.postalCode} 
                  onChange={(e) => setNewSupplier({...newSupplier, postalCode: e.target.value})}
                  placeholder="Enter postal code"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="contact">Contact name</Label>
              <Input 
                id="contact" 
                value={newSupplier.contact} 
                onChange={(e) => setNewSupplier({...newSupplier, contact: e.target.value})}
                placeholder="Enter contact person's name"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email address</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={newSupplier.email} 
                  onChange={(e) => setNewSupplier({...newSupplier, email: e.target.value})}
                  placeholder="example@company.com"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone number</Label>
                <div className="flex">
                  <div className="w-16 flex-shrink-0 flex items-center justify-center border rounded-l-md border-r-0 bg-muted px-2">
                    <div className="flex items-center gap-1">
                      <div className="w-6 h-4 overflow-hidden relative">
                        <div className="absolute inset-0 bg-red-600"></div>
                        <div className="absolute inset-0 mt-1 bg-green-600"></div>
                        <div className="absolute inset-0 mt-2 bg-yellow-500"></div>
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-blue-700 rounded-full"></div>
                      </div>
                      <span>▼</span>
                    </div>
                  </div>
                  <Input 
                    id="phone" 
                    value={newSupplier.phone} 
                    onChange={(e) => setNewSupplier({...newSupplier, phone: e.target.value})}
                    placeholder="+251 91 234 5678"
                    className="rounded-l-none"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between gap-2">
            <Button variant="outline" onClick={() => setIsAddSupplierOpen(false)} className="w-full sm:w-auto">
              Close
            </Button>
            <Button 
              onClick={handleAddSupplier} 
              disabled={!newSupplier.name || !newSupplier.email}
              className="w-full sm:w-auto"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 