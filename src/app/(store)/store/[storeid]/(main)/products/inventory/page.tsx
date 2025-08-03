'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  MoreHorizontal,
  Package,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash2,
  History,
  BarChart4,
  Tags,
  Box,
  Archive,
  AlertCircle,
  RefreshCw,
  Building2,
  Clock,
  ShoppingCart,
  Truck,
  AlertOctagon,
  Settings,
  CalendarDays,
  CircleDollarSign,
  Warehouse,
  Map,
  Users,
  BookOpen,
  LayoutGrid
} from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Pagination } from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Types
interface Location {
  id: string;
  name: string;
  type: 'retail' | 'warehouse' | 'supplier';
  address: string;
  isDefault: boolean;
}

interface ProductVariant {
  id: string;
  sku: string;
  barcode?: string;
  attributes: {
    [key: string]: string;
  };
  price: number;
  compareAtPrice?: number;
  cost?: number;
  quantity: number;
  lowStockThreshold: number;
  weight?: number;
  weightUnit?: 'kg' | 'g' | 'lb' | 'oz';
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: 'cm' | 'in';
  };
  unavailable: number;
  committed: number;
  available: number;
  incoming: number;
  locations: {
    id: string;
    name: string;
    quantity: number;
    incoming: number;
  }[];
  lastUpdated: string;
  nextDelivery?: string;
  reorderPoint: number;
  idealQuantity: number;
  supplierLeadTime?: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  brand?: string;
  category: string;
  subcategory?: string;
  tags: string[];
  status: 'active' | 'draft' | 'archived';
  vendor?: string;
  variants: ProductVariant[];
  mainImage: string;
  additionalImages: string[];
  createdAt: string;
  updatedAt: string;
  inventoryPolicy: 'continue' | 'deny';
  trackQuantity: boolean;
  requiresShipping: boolean;
  taxable: boolean;
}

interface InventoryHistory {
  id: string;
  productId: string;
  variantId: string;
  type: 'adjustment' | 'sale' | 'return' | 'receive';
  quantity: number;
  previousQuantity: number;
  newQuantity: number;
  reason?: string;
  reference?: string;
  date: string;
  user: string;
}

// Add these interfaces after the existing interfaces
interface EditableFields {
  available: number;
  quantity: number;
  reorderPoint: number;
  idealQuantity: number;
}

// Add this new interface for tracking edited fields
interface EditedField {
  previousValue: number;
  newValue: number;
  isChanged: boolean;
}

interface EditState {
  [key: string]: {
    available: EditedField;
    quantity: EditedField;
    reorderPoint: EditedField;
    idealQuantity: EditedField;
  };
}

// Sample Data
const locations: Location[] = [
  {
    id: 'LOC001',
    name: 'Main Store',
    type: 'retail',
    address: 'Bole, Addis Ababa',
    isDefault: true
  },
  {
    id: 'LOC002',
    name: 'Central Warehouse',
    type: 'warehouse',
    address: 'Industrial Area, Addis Ababa',
    isDefault: false
  }
];

const sampleProducts: Product[] = [
  {
    id: 'PROD001',
    name: 'Classic Cotton T-Shirt',
    description: 'Premium quality cotton t-shirt',
    brand: 'EthioStyle',
    category: 'Apparel',
    subcategory: 'T-Shirts',
    tags: ['cotton', 'casual', 'basics'],
    status: 'active',
    vendor: 'Addis Textiles Ltd',
    variants: [
      {
        id: 'VAR001',
        sku: 'CT-BLK-S',
        barcode: '123456789',
        attributes: {
          color: 'Black',
          size: 'S'
        },
        price: 299.99,
        compareAtPrice: 349.99,
        cost: 150.00,
        quantity: 45,
        lowStockThreshold: 10,
        weight: 0.2,
        weightUnit: 'kg',
        unavailable: 2,
        committed: 3,
        available: 40,
        incoming: 25,
        locations: [
          {
            id: 'LOC001',
            name: 'Main Store',
            quantity: 30,
            incoming: 15
          },
          {
            id: 'LOC002',
            name: 'Central Warehouse',
            quantity: 15,
            incoming: 10
          }
        ],
        lastUpdated: '2024-03-20T14:30:00Z',
        nextDelivery: '2024-04-01T10:00:00Z',
        reorderPoint: 20,
        idealQuantity: 50,
        supplierLeadTime: 7
      },
      {
        id: 'VAR002',
        sku: 'CT-BLK-M',
        barcode: '123456790',
        attributes: {
          color: 'Black',
          size: 'M'
        },
        price: 299.99,
        compareAtPrice: 349.99,
        cost: 150.00,
        quantity: 5,
        lowStockThreshold: 10,
        weight: 0.22,
        weightUnit: 'kg',
        unavailable: 1,
        committed: 2,
        available: 2,
        incoming: 15,
        locations: [
          {
            id: 'LOC001',
            name: 'Main Store',
            quantity: 3,
            incoming: 10
          },
          {
            id: 'LOC002',
            name: 'Central Warehouse',
            quantity: 2,
            incoming: 5
          }
        ],
        lastUpdated: '2024-03-20T14:30:00Z',
        nextDelivery: '2024-04-01T10:00:00Z',
        reorderPoint: 20,
        idealQuantity: 50,
        supplierLeadTime: 7
      }
    ],
    mainImage: '/images/products/black-tshirt.jpg',
    additionalImages: [],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-03-20T14:30:00Z',
    inventoryPolicy: 'deny',
    trackQuantity: true,
    requiresShipping: true,
    taxable: true
  },
  {
    id: 'PROD002',
    name: 'Ethiopian Coffee (Premium)',
    description: 'Premium grade Ethiopian coffee beans',
    brand: 'Yirgacheffe',
    category: 'Food & Beverages',
    subcategory: 'Coffee',
    tags: ['coffee', 'organic', 'premium'],
    status: 'active',
    vendor: 'Addis Coffee Exports',
    variants: [
      {
        id: 'VAR003',
        sku: 'COF-PRE-250',
        barcode: '123456791',
        attributes: {
          weight: '250g',
          roast: 'Medium'
        },
        price: 199.99,
        cost: 100.00,
        quantity: 150,
        lowStockThreshold: 20,
        weight: 0.25,
        weightUnit: 'kg',
        unavailable: 5,
        committed: 10,
        available: 135,
        incoming: 50,
        locations: [
          {
            id: 'LOC001',
            name: 'Main Store',
            quantity: 100,
            incoming: 30
          },
          {
            id: 'LOC002',
            name: 'Central Warehouse',
            quantity: 50,
            incoming: 20
          }
        ],
        lastUpdated: '2024-03-19T11:20:00Z',
        nextDelivery: '2024-04-01T10:00:00Z',
        reorderPoint: 30,
        idealQuantity: 200,
        supplierLeadTime: 7
      },
      {
        id: 'VAR004',
        sku: 'COF-PRE-1000',
        barcode: '123456792',
        attributes: {
          weight: '1kg',
          roast: 'Medium'
        },
        price: 749.99,
        cost: 400.00,
        quantity: 2,
        lowStockThreshold: 5,
        weight: 1,
        weightUnit: 'kg',
        unavailable: 0,
        committed: 1,
        available: 1,
        incoming: 10,
        locations: [
          {
            id: 'LOC001',
            name: 'Main Store',
            quantity: 1,
            incoming: 5
          },
          {
            id: 'LOC002',
            name: 'Central Warehouse',
            quantity: 1,
            incoming: 5
          }
        ],
        lastUpdated: '2024-03-19T11:20:00Z',
        nextDelivery: '2024-04-01T10:00:00Z',
        reorderPoint: 8,
        idealQuantity: 15,
        supplierLeadTime: 7
      }
    ],
    mainImage: '/images/products/coffee-premium.jpg',
    additionalImages: [],
    createdAt: '2024-02-01T09:00:00Z',
    updatedAt: '2024-03-19T11:20:00Z',
    inventoryPolicy: 'deny',
    trackQuantity: true,
    requiresShipping: true,
    taxable: true
  }
];

// Sample inventory history
const sampleInventoryHistory: InventoryHistory[] = [
  {
    id: 'HIST001',
    productId: 'PROD001',
    variantId: 'VAR001',
    type: 'adjustment',
    quantity: 10,
    previousQuantity: 35,
    newQuantity: 45,
    reason: 'Stock count adjustment',
    date: '2024-03-20T14:30:00Z',
    user: 'John Doe'
  },
  {
    id: 'HIST002',
    productId: 'PROD002',
    variantId: 'VAR004',
    type: 'sale',
    quantity: -3,
    previousQuantity: 5,
    newQuantity: 2,
    reference: 'ORD-2024-123',
    date: '2024-03-19T11:20:00Z',
    user: 'System'
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

// Main component
export default function InventoryPage() {
  const router = useRouter();
  
  // State management
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: 'name' | 'updatedAt' | 'totalQuantity';
    direction: 'asc' | 'desc';
  }>({
    key: 'updatedAt',
    direction: 'desc'
  });
  
  // New state for advanced features
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [showUnavailable, setShowUnavailable] = useState(true);
  const [showCommitted, setShowCommitted] = useState(true);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [dateRange, setDateRange] = useState<'all' | '24h' | '7d' | '30d' | 'custom'>('all');
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [isAdjustStockOpen, setIsAdjustStockOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [currentVariant, setCurrentVariant] = useState<ProductVariant | null>(null);
  
  // Update edit state definition
  const [editState, setEditState] = useState<EditState>({});
  const [activeCell, setActiveCell] = useState<{variantId: string; field: string} | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  
  // Computed values
  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return Array.from(cats);
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = searchTerm === '' ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.variants.some(v => 
          v.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
          v.barcode?.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
      
      const hasLowStock = product.variants.some(v => v.quantity <= v.lowStockThreshold);
      const hasOutOfStock = product.variants.some(v => v.quantity === 0);
      const matchesStock = stockFilter === 'all' ||
        (stockFilter === 'low' && hasLowStock) ||
        (stockFilter === 'out' && hasOutOfStock);

      return matchesSearch && matchesCategory && matchesStatus && matchesStock;
    }).sort((a, b) => {
      if (sortConfig.key === 'totalQuantity') {
        const aTotal = a.variants.reduce((sum, v) => sum + v.quantity, 0);
        const bTotal = b.variants.reduce((sum, v) => sum + v.quantity, 0);
        return sortConfig.direction === 'asc' ? aTotal - bTotal : bTotal - aTotal;
      }
      
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });
  }, [products, searchTerm, categoryFilter, statusFilter, stockFilter, sortConfig]);

  // Pagination
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  // Update the sort function
  const sortedOrders = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortConfig.key) {
        case 'totalQuantity': {
          const aTotal = a.variants.reduce((sum, v) => sum + v.quantity, 0);
          const bTotal = b.variants.reduce((sum, v) => sum + v.quantity, 0);
          return sortConfig.direction === 'asc' ? aTotal - bTotal : bTotal - aTotal;
        }
        case 'name': {
          const aName = a[sortConfig.key];
          const bName = b[sortConfig.key];
          return sortConfig.direction === 'asc'
            ? aName.localeCompare(bName)
            : bName.localeCompare(aName);
        }
        case 'updatedAt': {
          const aDate = new Date(a[sortConfig.key]).getTime();
          const bDate = new Date(b[sortConfig.key]).getTime();
          return sortConfig.direction === 'asc'
            ? aDate - bDate
            : bDate - aDate;
        }
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortConfig]);

  // Handlers
  const handleSort = (key: 'name' | 'updatedAt' | 'totalQuantity') => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAdjustStock = (product: Product, variant: ProductVariant) => {
    setCurrentProduct(product);
    setCurrentVariant(variant);
    setIsAdjustStockOpen(true);
  };

  const handleViewHistory = (product: Product) => {
    setCurrentProduct(product);
    setIsHistoryOpen(true);
  };

  // New handlers
  const handleTransferStock = (product: Product, variant: ProductVariant) => {
    setCurrentProduct(product);
    setCurrentVariant(variant);
    setIsTransferOpen(true);
  };

  const handleUpdatePricing = (product: Product, variant: ProductVariant) => {
    router.push(`/products/${product.id}/variants/${variant.id}/pricing`);
  };

  // Calculate totals for summary cards
  const inventorySummary = useMemo(() => {
    return products.reduce((summary, product) => {
      product.variants.forEach(variant => {
        summary.totalProducts++;
        if (variant.quantity <= variant.lowStockThreshold) summary.lowStock++;
        if (variant.quantity === 0) summary.outOfStock++;
        summary.totalIncoming += variant.incoming || 0;
      });
      return summary;
    }, {
      totalProducts: 0,
      lowStock: 0,
      outOfStock: 0,
      totalIncoming: 0
    });
  }, [products]);

  // Get stock status badge
  const getStockBadge = (variant: ProductVariant) => {
    if (variant.quantity === 0) {
      return (
        <Badge variant="destructive" className="bg-red-50 text-red-700 flex items-center gap-1.5">
          <XCircle className="w-3.5 h-3.5" />
          Out of stock
        </Badge>
      );
    }
    if (variant.quantity <= variant.lowStockThreshold) {
      return (
        <Badge variant="destructive" className="bg-amber-50 text-amber-700 flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5" />
          Low stock
        </Badge>
      );
    }
    return (
      <Badge variant="success" className="bg-green-50 text-green-700 flex items-center gap-1.5">
        <CheckCircle2 className="w-3.5 h-3.5" />
        In stock
      </Badge>
    );
  };

  // Add these functions before the return statement
  const startEdit = (variantId: string, variant: ProductVariant, field: keyof EditableFields) => {
    setEditState(prev => ({
      ...prev,
      [variantId]: {
        ...prev[variantId] || {
          available: { previousValue: variant.available, newValue: variant.available, isChanged: false },
          quantity: { previousValue: variant.quantity, newValue: variant.quantity, isChanged: false },
          reorderPoint: { previousValue: variant.reorderPoint, newValue: variant.reorderPoint, isChanged: false },
          idealQuantity: { previousValue: variant.idealQuantity, newValue: variant.idealQuantity, isChanged: false }
        }
      }
    }));
    setActiveCell({ variantId, field });
    setIsEditing(true);
  };

  const handleFieldChange = (variantId: string, field: keyof EditableFields, value: number) => {
    setEditState(prev => ({
      ...prev,
      [variantId]: {
        ...prev[variantId],
        [field]: {
          ...prev[variantId][field],
          newValue: value,
          isChanged: value !== prev[variantId][field].previousValue
        }
      }
    }));
    setHasChanges(true);
  };

  const getChangesCount = () => {
    return Object.values(editState).reduce((count, variant) => {
      return count + Object.values(variant).filter(field => field.isChanged).length;
    }, 0);
  };

  // Enhanced cell renderer
  const renderEditableCell = (variant: ProductVariant, field: keyof EditableFields, label: string) => {
    const isEditing = activeCell?.variantId === variant.id && activeCell?.field === field;
    const fieldState = editState[variant.id]?.[field];
    const hasChanged = fieldState?.isChanged;
    const currentValue = fieldState?.newValue ?? variant[field];

    return (
      <div className="relative group">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={currentValue}
              onChange={(e) => handleFieldChange(variant.id, field, parseInt(e.target.value))}
              className="w-24 h-8 text-sm font-medium"
              autoFocus
              onBlur={() => setActiveCell(null)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setActiveCell(null);
                if (e.key === 'Escape') {
                  handleFieldChange(variant.id, field, fieldState.previousValue);
                  setActiveCell(null);
                }
              }}
            />
          </div>
        ) : (
          <div
            onClick={() => startEdit(variant.id, variant, field)}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer
              ${hasChanged ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}
              transition-colors duration-150
            `}
          >
            <span className="font-medium">{currentValue}</span>
            {hasChanged && (
              <div className="flex items-center text-xs text-blue-600">
                <ArrowUpDown className="w-3 h-3 mr-1" />
                <span>Changed</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const saveChanges = () => {
    setProducts(prevProducts => {
      return prevProducts.map(product => ({
        ...product,
        variants: product.variants.map(variant => {
          const variantEdits = editState[variant.id];
          if (variantEdits) {
            return {
              ...variant,
              available: variantEdits.available.newValue,
              quantity: variantEdits.quantity.newValue,
              reorderPoint: variantEdits.reorderPoint.newValue,
              idealQuantity: variantEdits.idealQuantity.newValue
            };
          }
          return variant;
        })
      }));
    });
    setEditState({});
    setIsEditing(false);
    setHasChanges(false);
  };

  const discardChanges = () => {
    setEditState({});
    setIsEditing(false);
    setHasChanges(false);
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Streamlined Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Inventory</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your product inventory across all locations
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button 
            onClick={() => router.push('/products/create')}
            className="bg-black hover:bg-gray-900"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add product
          </Button>
        </div>
      </div>

      {/* Enhanced Edit Controls */}
      {hasChanges && (
        <div className="py-3 px-4 sticky top-0 z-50 shadow-sm">
          <div className="max-w-[1200px] mx-auto flex items-center justify-center">
            <div className="bg-gray-100 rounded-full px-6 py-2 flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-700">
                <Edit className="w-4 h-4" />
                <span className="font-medium">{getChangesCount()} changes</span>
              </div>
              <div className="h-4 w-px bg-gray-300"></div>
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={discardChanges}
                  className="hover:bg-gray-200 text-gray-700"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Discard
                </Button>
                <Button
                  size="sm"
                  onClick={saveChanges}
                  className="bg-black hover:bg-gray-900 text-white"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Save all changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
        <div className="p-4 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search products by name, SKU, or barcode..."
                className="pl-10 w-full bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[150px] bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={stockFilter} onValueChange={setStockFilter}>
                <SelectTrigger className="w-[150px] bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Stock status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All stock levels</SelectItem>
                  <SelectItem value="in">In stock</SelectItem>
                  <SelectItem value="low">Low stock</SelectItem>
                  <SelectItem value="out">Out of stock</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-[150px] bg-gray-50 border-gray-200">
                  <Building2 className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All locations</SelectItem>
                  {locations.map(location => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="bg-gray-50 border-gray-200 hover:bg-gray-100"
              >
                <Filter className="w-4 h-4 mr-2" />
                Advanced
              </Button>
            </div>
          </div>

          {showAdvancedFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t">
              <div>
                <label className="text-sm font-medium mb-1 block">Date Range</label>
                <Select 
                  value={dateRange} 
                  onValueChange={(value: "all" | "24h" | "7d" | "30d" | "custom") => setDateRange(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All time</SelectItem>
                    <SelectItem value="24h">Last 24 hours</SelectItem>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="custom">Custom range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Vendor</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All vendors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All vendors</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Tags</label>
                <Input placeholder="Enter tags..." />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* View Options */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={showUnavailable}
              onCheckedChange={(checked: boolean | "indeterminate") => 
                typeof checked === "boolean" && setShowUnavailable(checked)
              }
              className="bg-gray-50 border-gray-200"
            />
            <label className="text-sm">Show unavailable</label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              checked={showCommitted}
              onCheckedChange={(checked: boolean | "indeterminate") => 
                typeof checked === "boolean" && setShowCommitted(checked)
              }
              className="bg-gray-50 border-gray-200"
            />
            <label className="text-sm">Show committed</label>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('table')}
          >
            <BookOpen className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Enhanced Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="min-w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/60">
                <TableHead className="w-[40px]">
                  <Checkbox
                    checked={selectedProducts.length === paginatedProducts.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedProducts(paginatedProducts.map(p => p.id));
                      } else {
                        setSelectedProducts([]);
                      }
                    }}
                    className="bg-white border-gray-200"
                  />
                </TableHead>
                <TableHead>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 -ml-4 hover:bg-gray-100 rounded-full">
                        <span>Product</span>
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white rounded-lg shadow-lg border border-gray-200">
                      <DropdownMenuItem className="hover:bg-gray-50">Sort A-Z</DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-gray-50">Sort Z-A</DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-gray-200" />
                      <DropdownMenuItem className="hover:bg-gray-50">Hide column</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableHead>
                <TableHead>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 -ml-4 hover:bg-gray-100 rounded-full">
                        <span>SKU</span>
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white rounded-lg shadow-lg border border-gray-200">
                      <DropdownMenuItem className="hover:bg-gray-50">Sort A-Z</DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-gray-50">Sort Z-A</DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-gray-200" />
                      <DropdownMenuItem className="hover:bg-gray-50">Hide column</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableHead>
                {showUnavailable && (
                  <TableHead>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 -ml-4 hover:bg-gray-100 rounded-full">
                          <span>Unavailable</span>
                          <ChevronDown className="ml-1 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[200px] p-2 bg-white shadow-lg rounded-lg border border-gray-200">
                        <div className="mb-2">
                          <h3 className="text-sm font-medium">Unavailable inventory</h3>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Damaged</span>
                            <Button variant="outline" size="sm" className="h-7 px-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                              0
                              <ChevronDown className="ml-1 h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Quality control</span>
                            <Button variant="outline" size="sm" className="h-7 px-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                              0
                              <ChevronDown className="ml-1 h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Safety stock</span>
                            <Button variant="outline" size="sm" className="h-7 px-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                              0
                              <ChevronDown className="ml-1 h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Other</span>
                            <Button variant="outline" size="sm" className="h-7 px-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                              0
                              <ChevronDown className="ml-1 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableHead>
                )}
                {showCommitted && (
                  <TableHead>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 -ml-4 hover:bg-gray-100 rounded-full">
                          <span>Committed</span>
                          <ChevronDown className="ml-1 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white rounded-lg shadow-lg border border-gray-200">
                        <DropdownMenuItem className="hover:bg-gray-50">Sort ascending</DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-gray-50">Sort descending</DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-200" />
                        <DropdownMenuItem className="hover:bg-gray-50">Hide column</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableHead>
                )}
                <TableHead>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 -ml-4 hover:bg-gray-100 rounded-full">
                        <span>Available</span>
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[200px] p-0 bg-white shadow-lg rounded-lg border border-gray-200">
                      <div className="p-2">
                        <DropdownMenuItem className="px-2 py-1.5 hover:bg-gray-50 rounded-md">
                          Sort ascending
                        </DropdownMenuItem>
                        <DropdownMenuItem className="px-2 py-1.5 hover:bg-gray-50 rounded-md">
                          Sort descending
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-1 bg-gray-100" />
                        <DropdownMenuItem className="px-2 py-1.5 hover:bg-gray-50 rounded-md">
                          Hide column
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableHead>
                <TableHead>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 -ml-4 hover:bg-gray-100 rounded-full">
                        <span>On hand</span>
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[200px] p-0 bg-white shadow-lg rounded-lg border border-gray-200">
                      <div className="p-2">
                        <DropdownMenuItem className="px-2 py-1.5 hover:bg-gray-50 rounded-md">
                          Sort ascending
                        </DropdownMenuItem>
                        <DropdownMenuItem className="px-2 py-1.5 hover:bg-gray-50 rounded-md">
                          Sort descending
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-1 bg-gray-100" />
                        <DropdownMenuItem className="px-2 py-1.5 hover:bg-gray-50 rounded-md">
                          Hide column
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableHead>
                <TableHead>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 -ml-4 hover:bg-gray-100 rounded-full">
                        <span>Incoming</span>
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white rounded-lg shadow-lg border border-gray-200">
                      <DropdownMenuItem className="hover:bg-gray-50">Sort ascending</DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-gray-50">Sort descending</DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-gray-200" />
                      <DropdownMenuItem className="hover:bg-gray-50">Hide column</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableHead>
                <TableHead>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 -ml-4 hover:bg-gray-100 rounded-full">
                        <span>Reorder Point</span>
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white rounded-lg shadow-lg border border-gray-200">
                      <DropdownMenuItem className="hover:bg-gray-50">Sort ascending</DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-gray-50">Sort descending</DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-gray-200" />
                      <DropdownMenuItem className="hover:bg-gray-50">Hide column</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableHead>
                <TableHead>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 -ml-4 hover:bg-gray-100 rounded-full">
                        <span>Last Updated</span>
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white rounded-lg shadow-lg border border-gray-200">
                      <DropdownMenuItem className="hover:bg-gray-50">Sort newest first</DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-gray-50">Sort oldest first</DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-gray-200" />
                      <DropdownMenuItem className="hover:bg-gray-50">Hide column</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedProducts.map((product) => (
                product.variants.map((variant) => (
                  <TableRow key={variant.id} className="hover:bg-gray-50/60">
                    <TableCell>
                      <Checkbox
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={() => toggleProductSelection(product.id)}
                        className="bg-white border-gray-200"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg border overflow-hidden">
                          {product.mainImage ? (
                            <img
                              src={product.mainImage}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                              <Package className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-500">
                            {Object.entries(variant.attributes).map(([key, value]) => 
                              `${key}: ${value}`
                            ).join(', ')}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{variant.sku}</TableCell>
                    {showUnavailable && (
                      <TableCell>
                        <span className="text-red-600">{variant.unavailable}</span>
                      </TableCell>
                    )}
                    {showCommitted && (
                      <TableCell>
                        <span className="text-blue-600">{variant.committed}</span>
                      </TableCell>
                    )}
                    <TableCell>
                      {renderEditableCell(variant, 'available', 'Available')}
                    </TableCell>
                    <TableCell>
                      {renderEditableCell(variant, 'quantity', 'On hand')}
                      {variant.quantity <= variant.lowStockThreshold && (
                        <Badge variant="destructive" className="ml-2 bg-red-50 text-red-700 border border-red-200">
                          Low stock
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 font-medium">{variant.incoming}</span>
                        {variant.nextDelivery && (
                          <div className="text-xs text-gray-500 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatDate(variant.nextDelivery)}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {renderEditableCell(variant, 'reorderPoint', 'Reorder Point')}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1.5" />
                        {formatDate(variant.lastUpdated)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAdjustStock(product, variant)}
                        >
                          <Package className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewHistory(product)}
                        >
                          <History className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Truck className="w-4 h-4 mr-2" />
                              Transfer stock
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CircleDollarSign className="w-4 h-4 mr-2" />
                              Update pricing
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Enhanced Pagination */}
      <div className="mt-4 flex items-center justify-between bg-white rounded-lg border border-gray-200 p-4">
        <div className="text-sm text-gray-500">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} items
        </div>
        <Pagination
          currentPage={currentPage}
          totalItems={filteredProducts.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>

      {/* Adjust Stock Dialog */}
      <Dialog open={isAdjustStockOpen} onOpenChange={setIsAdjustStockOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adjust Stock Level</DialogTitle>
            <DialogDescription>
              Update the stock level for {currentProduct?.name} - {currentVariant?.sku}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Current Stock:</span>
              <span className="text-sm">{currentVariant?.quantity || 0}</span>
            </div>
            
            <div>
              <label className="text-sm font-medium">Adjustment Type</label>
              <Select defaultValue="add">
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">Add to stock</SelectItem>
                  <SelectItem value="remove">Remove from stock</SelectItem>
                  <SelectItem value="set">Set stock level</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Quantity</label>
              <Input type="number" min="0" className="mt-1" />
            </div>
            
            <div>
              <label className="text-sm font-medium">Reason</label>
              <Select defaultValue="count">
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="count">Stock count</SelectItem>
                  <SelectItem value="received">Received inventory</SelectItem>
                  <SelectItem value="damaged">Damaged/Lost</SelectItem>
                  <SelectItem value="correction">Correction</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Notes</label>
              <Input className="mt-1" placeholder="Add any additional notes..." />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAdjustStockOpen(false)}>
              Cancel
            </Button>
            <Button>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* History Dialog */}
      <Dialog open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Inventory History</DialogTitle>
            <DialogDescription>
              View all inventory changes for {currentProduct?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Reference</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleInventoryHistory
                  .filter(h => h.productId === currentProduct?.id)
                  .map((history) => (
                    <TableRow key={history.id}>
                      <TableCell>{formatDate(history.date)}</TableCell>
                      <TableCell>
                        <Badge
                          className={`
                            ${history.type === 'adjustment' ? 'bg-blue-50 text-blue-700' : ''}
                            ${history.type === 'sale' ? 'bg-green-50 text-green-700' : ''}
                            ${history.type === 'return' ? 'bg-purple-50 text-purple-700' : ''}
                            ${history.type === 'receive' ? 'bg-amber-50 text-amber-700' : ''}
                          `}
                        >
                          {history.type.charAt(0).toUpperCase() + history.type.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={history.quantity < 0 ? 'text-red-600' : 'text-green-600'}>
                          {history.quantity > 0 ? '+' : ''}{history.quantity}
                        </span>
                      </TableCell>
                      <TableCell>{history.user}</TableCell>
                      <TableCell>{history.reference || '-'}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsHistoryOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
