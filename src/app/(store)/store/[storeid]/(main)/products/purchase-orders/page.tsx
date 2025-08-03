'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal,
  MoreVertical,
  Clock,
  CheckCircle2,
  XCircle,
  Package,
  Truck,
  Calendar,
  Edit,
  Eye,
  ChevronDown,
  ChevronUp,
  FileText,
  AlertTriangle,
  Building2,
  BarChart4,
  ArrowUpDown,
  Printer,
  RefreshCw,
  Trash2,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  ListFilter,
  Clock3
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Pagination } from "@/components/ui/pagination";
import Link from 'next/link';

// Interfaces for data models
interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
}

interface Product {
  id: string;
  name: string;
  sku: string;
  imageUrl: string;
  price: number;
  unit: string;
  currentStock: number;
}

interface PurchaseOrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  received: number;
}

interface PurchaseOrder {
  id: string;
  orderNumber: string;
  supplier: Supplier;
  supplierId: string;
  status: 'draft' | 'open' | 'received' | 'canceled' | 'partial';
  items: PurchaseOrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  createdAt: string;
  expectedDelivery: string;
  receivedAt?: string;
  notes?: string;
  paymentStatus: 'unpaid' | 'partial' | 'paid';
  paymentDue?: string;
  paymentTerms?: string;
}

// Sample data for suppliers
const suppliers: Supplier[] = [
  {
    id: 'SUP001',
    name: 'Addis Textiles Ltd',
    contact: 'Abebe Kebede',
    email: 'abebe@addistextiles.com',
    phone: '+251911234567',
    address: 'Bole, Addis Ababa, Ethiopia'
  },
  {
    id: 'SUP002',
    name: 'Bishoftu Electronics',
    contact: 'Sara Mekonnen',
    email: 'sara@bishoftuelectronics.com',
    phone: '+251922345678',
    address: 'Bishoftu, Ethiopia'
  },
  {
    id: 'SUP003',
    name: 'Awassa Food Supplies',
    contact: 'Daniel Bekele',
    email: 'daniel@awassafoods.com',
    phone: '+251933456789',
    address: 'Awassa, Ethiopia'
  },
  {
    id: 'SUP004',
    name: 'Mekelle Crafts Co.',
    contact: 'Tigist Haile',
    email: 'tigist@mekellecrafts.com',
    phone: '+251944567890',
    address: 'Mekelle, Ethiopia'
  },
  {
    id: 'SUP005',
    name: 'Dire Dawa Imports',
    contact: 'Mohammed Ahmed',
    email: 'mohammed@diredawaimports.com',
    phone: '+251955678901',
    address: 'Dire Dawa, Ethiopia'
  }
];

// Sample data for products
const products: Product[] = [
  {
    id: 'PRD001',
    name: 'Ethiopian Coffee (Premium)',
    sku: 'COFFEE-001',
    imageUrl: '/images/products/coffee-premium.jpg',
    price: 150.00,
    unit: 'kg',
    currentStock: 45
  },
  {
    id: 'PRD002',
    name: 'Cotton T-Shirt (Medium)',
    sku: 'TSHIRT-M',
    imageUrl: '/images/products/tshirt-medium.jpg',
    price: 75.00,
    unit: 'piece',
    currentStock: 120
  },
  {
    id: 'PRD003',
    name: 'Traditional Scarf',
    sku: 'SCARF-001',
    imageUrl: '/images/products/traditional-scarf.jpg',
    price: 95.00,
    unit: 'piece',
    currentStock: 32
  },
  {
    id: 'PRD004',
    name: 'Honey (Organic)',
    sku: 'HONEY-ORG',
    imageUrl: '/images/products/organic-honey.jpg',
    price: 200.00,
    unit: 'bottle',
    currentStock: 15
  },
  {
    id: 'PRD005',
    name: 'Handmade Basket',
    sku: 'BASKET-001',
    imageUrl: '/images/products/handmade-basket.jpg',
    price: 120.00,
    unit: 'piece',
    currentStock: 28
  },
  {
    id: 'PRD006',
    name: 'Spice Mix (Traditional)',
    sku: 'SPICE-TRAD',
    imageUrl: '/images/products/spice-traditional.jpg',
    price: 85.00,
    unit: 'kg',
    currentStock: 50
  }
];

// Sample data for purchase orders
const purchaseOrders: PurchaseOrder[] = [
  {
    id: 'PO001',
    orderNumber: 'PO-2024-001',
    supplier: suppliers[0],
    supplierId: 'SUP001',
    status: 'received',
    items: [
      {
        id: 'POI001',
        productId: 'PRD001',
        product: products[0],
        quantity: 50,
        unitPrice: 140.00,
        totalPrice: 7000.00,
        received: 50
      },
      {
        id: 'POI002',
        productId: 'PRD003',
        product: products[2],
        quantity: 30,
        unitPrice: 85.00,
        totalPrice: 2550.00,
        received: 30
      }
    ],
    subtotal: 9550.00,
    tax: 1432.50,
    shipping: 250.00,
    discount: 500.00,
    total: 10732.50,
    createdAt: '2024-01-15T10:00:00',
    expectedDelivery: '2024-01-30T10:00:00',
    receivedAt: '2024-01-29T14:30:00',
    notes: 'Quality checked upon delivery, all items in good condition.',
    paymentStatus: 'paid',
    paymentDue: '2024-02-15T10:00:00',
    paymentTerms: 'Net 30'
  },
  {
    id: 'PO002',
    orderNumber: 'PO-2024-008',
    supplier: suppliers[1],
    supplierId: 'SUP002',
    status: 'open',
    items: [
      {
        id: 'POI003',
        productId: 'PRD002',
        product: products[1],
        quantity: 100,
        unitPrice: 70.00,
        totalPrice: 7000.00,
        received: 0
      },
      {
        id: 'POI004',
        productId: 'PRD005',
        product: products[4],
        quantity: 25,
        unitPrice: 110.00,
        totalPrice: 2750.00,
        received: 0
      }
    ],
    subtotal: 9750.00,
    tax: 1462.50,
    shipping: 300.00,
    discount: 0.00,
    total: 11512.50,
    createdAt: '2024-02-20T11:30:00',
    expectedDelivery: '2024-03-10T10:00:00',
    notes: 'Urgent order, please expedite delivery if possible.',
    paymentStatus: 'unpaid',
    paymentDue: '2024-03-20T10:00:00',
    paymentTerms: 'Net 30'
  },
  {
    id: 'PO003',
    orderNumber: 'PO-2024-012',
    supplier: suppliers[2],
    supplierId: 'SUP003',
    status: 'partial',
    items: [
      {
        id: 'POI005',
        productId: 'PRD004',
        product: products[3],
        quantity: 60,
        unitPrice: 190.00,
        totalPrice: 11400.00,
        received: 40
      },
      {
        id: 'POI006',
        productId: 'PRD006',
        product: products[5],
        quantity: 35,
        unitPrice: 80.00,
        totalPrice: 2800.00,
        received: 35
      }
    ],
    subtotal: 14200.00,
    tax: 2130.00,
    shipping: 350.00,
    discount: 700.00,
    total: 15980.00,
    createdAt: '2024-03-05T09:15:00',
    expectedDelivery: '2024-03-20T10:00:00',
    notes: 'Honey shipment was incomplete, 20 bottles still pending delivery.',
    paymentStatus: 'partial',
    paymentDue: '2024-04-05T10:00:00',
    paymentTerms: 'Net 30'
  },
  {
    id: 'PO004',
    orderNumber: 'PO-2024-015',
    supplier: suppliers[3],
    supplierId: 'SUP004',
    status: 'draft',
    items: [
      {
        id: 'POI007',
        productId: 'PRD005',
        product: products[4],
        quantity: 20,
        unitPrice: 115.00,
        totalPrice: 2300.00,
        received: 0
      }
    ],
    subtotal: 2300.00,
    tax: 345.00,
    shipping: 150.00,
    discount: 0.00,
    total: 2795.00,
    createdAt: '2024-03-18T14:20:00',
    expectedDelivery: '2024-04-05T10:00:00',
    notes: 'Draft order, pending approval.',
    paymentStatus: 'unpaid',
    paymentTerms: 'Net 30'
  },
  {
    id: 'PO005',
    orderNumber: 'PO-2024-020',
    supplier: suppliers[4],
    supplierId: 'SUP005',
    status: 'canceled',
    items: [
      {
        id: 'POI008',
        productId: 'PRD003',
        product: products[2],
        quantity: 40,
        unitPrice: 90.00,
        totalPrice: 3600.00,
        received: 0
      },
      {
        id: 'POI009',
        productId: 'PRD001',
        product: products[0],
        quantity: 25,
        unitPrice: 145.00,
        totalPrice: 3625.00,
        received: 0
      }
    ],
    subtotal: 7225.00,
    tax: 1083.75,
    shipping: 250.00,
    discount: 0.00,
    total: 8558.75,
    createdAt: '2024-03-10T16:45:00',
    expectedDelivery: '2024-03-25T10:00:00',
    notes: 'Order canceled due to supplier price increases, negotiating new terms.',
    paymentStatus: 'unpaid',
    paymentTerms: 'Net 30'
  }
]; 

// Utility function to format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-ET', {
    style: 'currency',
    currency: 'ETB',
    minimumFractionDigits: 2
  }).format(amount);
};

// Utility function to format date
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-ET', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Utility function to get status badge
const getStatusBadge = (status: PurchaseOrder['status']) => {
  switch (status) {
    case 'draft':
      return (
        <Badge className="bg-gray-100 text-gray-700 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-medium text-xs hover:bg-gray-200 transition-colors duration-200">
          <FileText className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Draft</span>
        </Badge>
      );
    case 'open':
      return (
        <Badge className="bg-blue-50 text-blue-700 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-medium text-xs hover:bg-blue-100 transition-colors duration-200">
          <Clock className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Open</span>
        </Badge>
      );
    case 'partial':
      return (
        <Badge className="bg-amber-50 text-amber-700 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-medium text-xs hover:bg-amber-100 transition-colors duration-200">
          <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Partially Received</span>
        </Badge>
      );
    case 'received':
      return (
        <Badge className="bg-green-50 text-green-700 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-medium text-xs hover:bg-green-100 transition-colors duration-200">
          <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Received</span>
        </Badge>
      );
    case 'canceled':
      return (
        <Badge className="bg-red-50 text-red-700 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-medium text-xs hover:bg-red-100 transition-colors duration-200">
          <XCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Canceled</span>
        </Badge>
      );
    default:
      return null;
  }
};

// Utility function to get payment status badge
const getPaymentStatusBadge = (status: PurchaseOrder['paymentStatus']) => {
  switch (status) {
    case 'paid':
      return (
        <Badge className="bg-green-50 text-green-700 px-2.5 py-1.5 rounded-md font-medium text-xs hover:bg-green-100 transition-colors duration-200">
          Paid
        </Badge>
      );
    case 'partial':
      return (
        <Badge className="bg-amber-50 text-amber-700 px-2.5 py-1.5 rounded-md font-medium text-xs hover:bg-amber-100 transition-colors duration-200">
          Partially Paid
        </Badge>
      );
    case 'unpaid':
      return (
        <Badge className="bg-red-50 text-red-700 px-2.5 py-1.5 rounded-md font-medium text-xs hover:bg-red-100 transition-colors duration-200">
          Unpaid
        </Badge>
      );
    default:
      return null;
  }
};

// Get the count of items by status
const getStatusCounts = (orders: PurchaseOrder[]) => {
  return {
    draft: orders.filter(order => order.status === 'draft').length,
    open: orders.filter(order => order.status === 'open').length,
    partial: orders.filter(order => order.status === 'partial').length,
    received: orders.filter(order => order.status === 'received').length,
    canceled: orders.filter(order => order.status === 'canceled').length,
    total: orders.length
  };
};

// Calculate total value by status
const getTotalValueByStatus = (orders: PurchaseOrder[]) => {
  return {
    draft: orders.filter(order => order.status === 'draft').reduce((sum, order) => sum + order.total, 0),
    open: orders.filter(order => order.status === 'open').reduce((sum, order) => sum + order.total, 0),
    partial: orders.filter(order => order.status === 'partial').reduce((sum, order) => sum + order.total, 0),
    received: orders.filter(order => order.status === 'received').reduce((sum, order) => sum + order.total, 0),
    canceled: orders.filter(order => order.status === 'canceled').reduce((sum, order) => sum + order.total, 0),
    total: orders.reduce((sum, order) => sum + order.total, 0)
  };
};

export default function PurchaseOrdersPage() {
  const router = useRouter();
  // State for orders data
  const [orders, setOrders] = useState<PurchaseOrder[]>(purchaseOrders);
  
  // State for filtering and sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [supplierFilter, setSupplierFilter] = useState<string>('all');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof PurchaseOrder | string;
    direction: 'asc' | 'desc';
  }>({
    key: 'createdAt',
    direction: 'desc'
  });
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // State for selected orders
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  
  // State for modal visibility
  const [isViewOrderOpen, setIsViewOrderOpen] = useState(false);
  const [isCreateOrderOpen, setIsCreateOrderOpen] = useState(false);
  const [isReceiveOrderOpen, setIsReceiveOrderOpen] = useState(false);
  
  // State for current order being viewed/edited
  const [currentOrder, setCurrentOrder] = useState<PurchaseOrder | null>(null);
  
  // State for tabs
  const [activeTab, setActiveTab] = useState('all-orders');

  // Filtered orders based on search term, status, and supplier
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = searchTerm === '' || 
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.notes && order.notes.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      
      const matchesSupplier = supplierFilter === 'all' || order.supplierId === supplierFilter;
      
      return matchesSearch && matchesStatus && matchesSupplier;
    });
  }, [orders, searchTerm, statusFilter, supplierFilter]);

  // Sort orders
  const sortedOrders = useMemo(() => {
    const sorted = [...filteredOrders].sort((a, b) => {
      let aValue: any;
      let bValue: any;
      
      // Handle nested properties
      if (sortConfig.key.includes('.')) {
        const keys = sortConfig.key.split('.');
        aValue = a;
        bValue = b;
        
        for (const key of keys) {
          // @ts-ignore: We know this might be a potential error, but we'll handle it
          aValue = aValue?.[key];
          // @ts-ignore: We know this might be a potential error, but we'll handle it
          bValue = bValue?.[key];
        }
      } else {
        // @ts-ignore: We know this might be a potential error, but we'll handle it
        aValue = a[sortConfig.key];
        // @ts-ignore: We know this might be a potential error, but we'll handle it
        bValue = b[sortConfig.key];
      }
      
      // Handle dates
      if (sortConfig.key === 'createdAt' || sortConfig.key === 'expectedDelivery' || sortConfig.key === 'receivedAt' || sortConfig.key === 'paymentDue') {
        aValue = aValue ? new Date(aValue).getTime() : 0;
        bValue = bValue ? new Date(bValue).getTime() : 0;
      }
      
      if (aValue === null || aValue === undefined) return sortConfig.direction === 'asc' ? -1 : 1;
      if (bValue === null || bValue === undefined) return sortConfig.direction === 'asc' ? 1 : -1;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    });
    
    return sorted;
  }, [filteredOrders, sortConfig]);

  // Calculate pagination
  const totalItems = sortedOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedOrders = sortedOrders.slice(startIndex, endIndex);

  // Handle sort
  const handleSort = (key: keyof PurchaseOrder | string) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  // Handle order selection
  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders(prevSelected => 
      prevSelected.includes(orderId)
        ? prevSelected.filter(id => id !== orderId)
        : [...prevSelected, orderId]
    );
  };

  // Handle select all
  const toggleSelectAll = () => {
    if (selectedOrders.length === paginatedOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(paginatedOrders.map(order => order.id));
    }
  };

  // Handle view order
  const handleViewOrder = (order: PurchaseOrder) => {
    setCurrentOrder(order);
    setIsViewOrderOpen(true);
  };

  // Get order by ID
  const getOrderById = (orderId: string): PurchaseOrder | undefined => {
    return orders.find(order => order.id === orderId);
  };

  // Status counts for summary
  const statusCounts = getStatusCounts(orders);
  const totalValueByStatus = getTotalValueByStatus(orders);

  return (
    <div className="p-4 sm:p-6 max-w-[1200px] mx-auto">
      {/* Enhanced Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Purchase Orders</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and track your purchase orders efficiently
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none whitespace-nowrap hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button 
            onClick={() => router.push('/products/purchase-orders/create')} 
            className="flex-1 sm:flex-none whitespace-nowrap bg-black hover:bg-gray-900"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create order
          </Button>
        </div>
      </div>

      {/* Enhanced Search and Filter Bar */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
        <div className="p-4 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search orders..."
                className="pl-10 w-full bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px] bg-gray-50 border-gray-200">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="partial">Partially Received</SelectItem>
                    <SelectItem value="received">Received</SelectItem>
                    <SelectItem value="canceled">Canceled</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={supplierFilter} onValueChange={setSupplierFilter}>
                <SelectTrigger className="w-full sm:w-[180px] bg-gray-50 border-gray-200">
                    <SelectValue placeholder="Filter by supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Suppliers</SelectItem>
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier.id} value={supplier.id}>{supplier.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                </div>
              </div>
            </div>
          </div>

      {/* Enhanced Table/Cards View */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        {paginatedOrders.length === 0 ? (
          <div className="h-[400px] flex items-center justify-center text-center p-4">
            <div className="flex flex-col items-center justify-center text-gray-500">
              <Package className="w-12 h-12 mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">No purchase orders found</p>
              <p className="text-sm text-gray-400 mb-4">Try adjusting your search or filters</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setSupplierFilter('all');
                }}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset filters
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <div className="min-w-full overflow-x-auto">
                <Table>
                <TableHeader>
                    <TableRow className="bg-gray-50/60">
                      <TableHead className="w-[50px] py-4 pl-6">
                      <Checkbox 
                        checked={selectedOrders.length === paginatedOrders.length && paginatedOrders.length > 0} 
                        onCheckedChange={toggleSelectAll}
                        className="rounded-sm data-[state=checked]:bg-blue-600"
                      />
                    </TableHead>
                    <TableHead 
                        className="py-4 cursor-pointer hover:bg-gray-100 transition-colors" 
                      onClick={() => handleSort('orderNumber')}
                    >
                      <div className="flex items-center">
                          <span className="font-semibold text-gray-700">Order #</span>
                        {sortConfig.key === 'orderNumber' && (
                            sortConfig.direction === 'asc' ? <ChevronUp className="ml-1.5 h-4 w-4 text-gray-500" /> : <ChevronDown className="ml-1.5 h-4 w-4 text-gray-500" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                        className="py-4 cursor-pointer hover:bg-gray-100 transition-colors" 
                      onClick={() => handleSort('supplier.name')}
                    >
                      <div className="flex items-center">
                          <span className="font-semibold text-gray-700">Supplier</span>
                        {sortConfig.key === 'supplier.name' && (
                            sortConfig.direction === 'asc' ? <ChevronUp className="ml-1.5 h-4 w-4 text-gray-500" /> : <ChevronDown className="ml-1.5 h-4 w-4 text-gray-500" />
                        )}
                      </div>
                    </TableHead>
                      <TableHead className="py-4">
                        <span className="font-semibold text-gray-700">Status</span>
                    </TableHead>
                    <TableHead 
                        className="py-4 cursor-pointer hover:bg-gray-100 transition-colors" 
                      onClick={() => handleSort('total')}
                    >
                      <div className="flex items-center">
                          <span className="font-semibold text-gray-700">Total</span>
                        {sortConfig.key === 'total' && (
                            sortConfig.direction === 'asc' ? <ChevronUp className="ml-1.5 h-4 w-4 text-gray-500" /> : <ChevronDown className="ml-1.5 h-4 w-4 text-gray-500" />
                        )}
                      </div>
                    </TableHead>
                      <TableHead className="py-4">
                        <span className="font-semibold text-gray-700">Payment</span>
                    </TableHead>
                    <TableHead 
                        className="py-4 cursor-pointer hover:bg-gray-100 transition-colors" 
                      onClick={() => handleSort('createdAt')}
                    >
                      <div className="flex items-center">
                          <span className="font-semibold text-gray-700">Created</span>
                        {sortConfig.key === 'createdAt' && (
                            sortConfig.direction === 'asc' ? <ChevronUp className="ml-1.5 h-4 w-4 text-gray-500" /> : <ChevronDown className="ml-1.5 h-4 w-4 text-gray-500" />
                        )}
                      </div>
                    </TableHead>
                      <TableHead className="py-4 pr-6 text-right">
                        <span className="font-semibold text-gray-700">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedOrders.map((order) => (
                      <TableRow 
                        key={order.id} 
                        className={`
                          hover:bg-gray-50/60 transition-colors
                          ${selectedOrders.includes(order.id) ? 'bg-blue-50/50' : ''}
                        `}
                      >
                        <TableCell className="pl-6">
                          <Checkbox 
                            checked={selectedOrders.includes(order.id)} 
                            onCheckedChange={() => toggleOrderSelection(order.id)}
                            className="rounded-sm data-[state=checked]:bg-blue-600"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                              <Package className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="min-w-0">
                              <div 
                                className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer truncate" 
                                onClick={() => handleViewOrder(order)}
                              >
                                {order.orderNumber}
                              </div>
                              <div className="text-xs text-gray-500 mt-0.5">
                                {order.items.length} items
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-medium text-sm border border-gray-200 flex-shrink-0">
                              {order.supplier.name.substring(0, 2).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium text-gray-900 truncate">{order.supplier.name}</div>
                              <div className="text-xs text-gray-500 truncate">{order.supplier.contact}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell className="font-medium text-gray-900">{formatCurrency(order.total)}</TableCell>
                        <TableCell>{getPaymentStatusBadge(order.paymentStatus)}</TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1.5 text-gray-400" />
                            {formatDate(order.createdAt)}
                          </div>
                        </TableCell>
                        <TableCell className="pr-6">
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 rounded-full hover:bg-blue-50" 
                              onClick={() => handleViewOrder(order)}
                            >
                              <Eye className="h-4 w-4 text-blue-600" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full hover:bg-gray-100">
                                  <MoreHorizontal className="h-4 w-4 text-gray-600" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleViewOrder(order)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                {order.status === 'draft' && (
                                  <DropdownMenuItem>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Order
                                  </DropdownMenuItem>
                                )}
                                {(order.status === 'open' || order.status === 'partial') && (
                                  <DropdownMenuItem>
                                    <Package className="h-4 w-4 mr-2" />
                                    Receive Items
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem>
                                  <Printer className="h-4 w-4 mr-2" />
                                  Print Order
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {order.status !== 'canceled' && order.status !== 'received' && (
                                  <DropdownMenuItem className="text-red-600">
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Cancel Order
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
          
            {/* Mobile Card View */}
            <div className="md:hidden">
              <div className="grid grid-cols-1 gap-4 p-4">
                {paginatedOrders.map((order) => (
                  <div key={order.id} className="bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Checkbox 
                            checked={selectedOrders.includes(order.id)} 
                            onCheckedChange={() => toggleOrderSelection(order.id)}
                            className="rounded-sm data-[state=checked]:bg-blue-600"
                          />
                          <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                            <Package className="w-5 h-5 text-blue-600" />
            </div>
          </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                              <MoreHorizontal className="h-4 w-4 text-gray-600" />
                </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleViewOrder(order)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            {order.status === 'draft' && (
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Order
                              </DropdownMenuItem>
                            )}
                            {(order.status === 'open' || order.status === 'partial') && (
                              <DropdownMenuItem>
                                <Package className="h-4 w-4 mr-2" />
                                Receive Items
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                              <Printer className="h-4 w-4 mr-2" />
                              Print Order
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {order.status !== 'canceled' && order.status !== 'received' && (
                              <DropdownMenuItem className="text-red-600">
                                <XCircle className="h-4 w-4 mr-2" />
                                Cancel Order
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
            </div>
            
                      <div 
                        className="mb-3 cursor-pointer"
                        onClick={() => handleViewOrder(order)}
                      >
                        <div className="font-medium text-blue-600 text-lg mb-1">{order.orderNumber}</div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {formatDate(order.createdAt)}
                              </div>
                            </div>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-medium text-sm border border-gray-200">
                          {order.supplier.name.substring(0, 2).toUpperCase()}
                            </div>
                        <div>
                          <div className="font-medium text-gray-900">{order.supplier.name}</div>
                          <div className="text-sm text-gray-500">{order.supplier.contact}</div>
                            </div>
              </div>

                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {getStatusBadge(order.status)}
                        {getPaymentStatusBadge(order.paymentStatus)}
            </div>
            
                      <div className="flex items-center justify-between text-sm">
                        <div className="text-gray-500">{order.items.length} items</div>
                        <div className="font-medium text-gray-900">{formatCurrency(order.total)}</div>
                              </div>
                            </div>
                            </div>
                ))}
                            </div>
            </div>
          </>
                    )}
              </div>

      {/* Enhanced Pagination */}
      <div className="mt-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-4">
          <Pagination 
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
            itemName="orders"
          />
            </div>
          </div>

      {/* View Order Dialog */}
      <Dialog open={isViewOrderOpen} onOpenChange={setIsViewOrderOpen}>
        <DialogContent className="sm:max-w-[800px] w-[95vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader className="sticky top-0 bg-white pb-4 z-10">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <DialogTitle className="text-xl">Purchase Order: {currentOrder?.orderNumber}</DialogTitle>
                <DialogDescription className="flex items-center flex-wrap gap-2 mt-1">
                  {currentOrder && getStatusBadge(currentOrder.status)}
                  <span className="mx-2 hidden sm:inline">•</span>
                  {currentOrder && getPaymentStatusBadge(currentOrder.paymentStatus)}
                </DialogDescription>
              </div>
              {currentOrder && (currentOrder.status === 'open' || currentOrder.status === 'partial') && (
                <Button 
                  onClick={() => {
                  setIsViewOrderOpen(false);
                  setIsReceiveOrderOpen(true);
                  }}
                  className="w-full sm:w-auto"
                >
                  Receive Items
                </Button>
              )}
            </div>
          </DialogHeader>
          
          {currentOrder && (
            <div className="space-y-6">
              {/* Order Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Supplier</h3>
                    <div className="mt-1 flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 font-medium text-sm flex-shrink-0">
                        {currentOrder.supplier.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium truncate">{currentOrder.supplier.name}</div>
                        <div className="text-sm text-gray-500 truncate">{currentOrder.supplier.contact}</div>
                      </div>
                    </div>
                    <div className="mt-1 text-sm text-gray-500 space-y-1">
                      <p className="truncate">{currentOrder.supplier.email}</p>
                      <p className="truncate">{currentOrder.supplier.phone}</p>
                      <p className="truncate">{currentOrder.supplier.address}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Order Information</h3>
                    <div className="mt-1 text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Order Number:</span>
                        <span className="font-medium">{currentOrder.orderNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Created:</span>
                        <span>{formatDate(currentOrder.createdAt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Expected Delivery:</span>
                        <span>{formatDate(currentOrder.expectedDelivery)}</span>
                      </div>
                      {currentOrder.receivedAt && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Received:</span>
                          <span>{formatDate(currentOrder.receivedAt)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-500">Payment Due:</span>
                        <span>{currentOrder.paymentDue ? formatDate(currentOrder.paymentDue) : 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Payment Terms:</span>
                        <span>{currentOrder.paymentTerms || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Order Summary</h3>
                    <div className="mt-1 text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Items:</span>
                        <span>{currentOrder.items.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Subtotal:</span>
                        <span>{formatCurrency(currentOrder.subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Tax:</span>
                        <span>{formatCurrency(currentOrder.tax)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Shipping:</span>
                        <span>{formatCurrency(currentOrder.shipping)}</span>
                      </div>
                      {currentOrder.discount > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Discount:</span>
                          <span>-{formatCurrency(currentOrder.discount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-semibold border-t border-gray-200 pt-2 mt-2">
                        <span>Total:</span>
                        <span>{formatCurrency(currentOrder.total)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {currentOrder.notes && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                      <div className="mt-1 text-sm border p-3 rounded-md bg-gray-50 whitespace-pre-wrap">
                        {currentOrder.notes}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      <Printer className="w-4 h-4 mr-2" />
                      Print
                    </Button>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Item List */}
              <div>
                <h3 className="text-base font-medium mb-2">Items ({currentOrder.items.length})</h3>
                <div className="border rounded-lg overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right hidden sm:table-cell">Unit Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="text-right">Received</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentOrder.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden mr-3 flex-shrink-0">
                                {item.product.imageUrl ? (
                                  <img 
                                    src={item.product.imageUrl} 
                                    alt={item.product.name} 
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <Package className="w-5 h-5 text-gray-400" />
                                  </div>
                                )}
                              </div>
                              <div className="min-w-0">
                                <div className="font-medium truncate">{item.product.name}</div>
                                <div className="text-xs text-gray-500 mt-1 truncate">ID: {item.product.id}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            {item.quantity} {item.product.unit}
                          </TableCell>
                          <TableCell className="text-right hidden sm:table-cell">
                            {formatCurrency(item.unitPrice)}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {formatCurrency(item.totalPrice)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end">
                              <span className={`font-medium ${item.received === item.quantity ? 'text-green-600' : 'text-amber-600'}`}>
                                {item.received} / {item.quantity}
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex flex-col sm:flex-row justify-between mt-6 gap-2">
            <Button variant="outline" onClick={() => setIsViewOrderOpen(false)} className="w-full sm:w-auto">
              Close
            </Button>
            
            {currentOrder && currentOrder.status === 'draft' && (
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 w-full sm:w-auto">
                  Delete Draft
                </Button>
                <Button className="w-full sm:w-auto">
                  Submit Order
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 