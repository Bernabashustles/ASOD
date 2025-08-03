'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Download, 
  Upload,
  ChevronDown,
  Store,
  ArrowUpDown,
  ChevronRight,
  ImageIcon,
  X,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  TrendingUp,
  Package,
  AlertTriangle,
  XCircle,
} from 'lucide-react';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export interface Product {
  id: string;
  image: string;
  images?: string[];
  title: string;
  status: 'active' | 'draft';
  inventory: number;
  category: string;
  type: string;
  vendor: string;
  price: number;
  sku?: string;
  description?: string;
  compareAtPrice?: number;
  costPerItem?: number;
  barcode?: string;
  weight?: number;
  weightUnit?: string;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
  salesChannels?: string[];
  organization?: {
    collections: string[];
    tags: string[];
  };
}

export const products: Product[] = [
  {
    id: '1',
    title: 'Basic Cotton T-Shirt',
    status: 'active',
    inventory: 50,
    category: 'Clothing',
    type: 'T-Shirt',
    vendor: 'Fashion Co.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: '2',
    title: 'Leather Wallet',
    status: 'active',
    inventory: 25,
    category: 'Accessories',
    type: 'Wallet',
    vendor: 'Leather Goods Inc.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: '3',
    title: 'Running Shoes',
    status: 'draft',
    inventory: 15,
    category: 'Footwear',
    type: 'Shoes',
    vendor: 'Sports Gear Ltd.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
];

export const getStatusBadge = (status: 'active' | 'draft') => {
  const styles = {
    active: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 transition-colors",
    draft: "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100 transition-colors"
  };

  const icons = {
    active: (
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
    ),
    draft: (
      <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
    )
  };

  return (
    <Badge variant="outline" className={`px-2.5 py-1 rounded-full inline-flex items-center gap-2 text-xs font-medium border ${styles[status]}`}>
      {icons[status]}
      {status === 'active' ? 'Active' : 'Draft'}
    </Badge>
  );
};

export default function ProductsPage() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Product;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedProducts(prev => 
      prev.length === products.length
        ? []
        : products.map(p => p.id)
    );
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue === null || bValue === null || aValue === undefined || bValue === undefined) return 0;
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'asc'
        ? aValue - bValue 
        : bValue - aValue;
    }
    
    return 0;
  });

  const handleSort = (key: keyof Product) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 sm:p-6 max-w-full sm:max-w-[1400px] mx-auto space-y-8">
        {/* Enhanced Header */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-black text-white rounded-xl border border-gray-900">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-black">
                    Products
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Manage your product catalog and inventory
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6 sm:mt-0 w-full sm:w-auto">
              {/* Mobile Actions */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="sm:hidden flex-1 bg-white border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all"
                    size="sm"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:max-w-lg p-0">
                  <SheetHeader className="px-4 py-3 border-b">
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  {/* Filter content remains the same */}
                </SheetContent>
              </Sheet>
              
              <Link href="/products/add" className="sm:hidden flex-1">
                <Button className="w-full bg-black hover:bg-gray-900 border-2 border-black transition-all" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </Link>
              
              {/* Desktop Actions */}
              <div className="hidden sm:flex gap-3">
                <Button variant="outline" className="gap-2 bg-white border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all">
                  <Upload className="w-4 h-4" />
                  Import
                </Button>
                <Button variant="outline" className="gap-2 bg-white border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
                <Link href="/products/add">
                  <Button className="gap-2 bg-black hover:bg-gray-900 border-2 border-black transition-all">
                    <Plus className="w-4 h-4" />
                    Add Product
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="bg-white border-2 border-gray-200 hover:border-gray-300 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-100 border-2 border-gray-200 rounded-xl">
                  <Package className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Products</p>
                  <p className="text-2xl font-bold text-black">{products.length}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-gray-500" />
                <span className="text-xs text-gray-500 font-medium">All categories</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-2 border-gray-200 hover:border-gray-300 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-900 text-white rounded-xl border-2 border-gray-900">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Active Products</p>
                  <p className="text-2xl font-bold text-black">
                    {products.filter(p => p.status === 'active').length}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-700" />
                <span className="text-xs text-gray-500 font-medium">Currently selling</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-2 border-gray-200 hover:border-gray-300 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-200 border-2 border-gray-300 rounded-xl">
                  <AlertTriangle className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Low Stock</p>
                  <p className="text-2xl font-bold text-black">
                    {products.filter(p => p.inventory < 20).length}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                <span className="text-xs text-gray-500 font-medium">Need attention</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-2 border-gray-200 hover:border-gray-300 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-800 text-white rounded-xl border-2 border-gray-800">
                  <XCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Out of Stock</p>
                  <p className="text-2xl font-bold text-black">
                    {products.filter(p => p.inventory === 0).length}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-800" />
                <span className="text-xs text-gray-500 font-medium">Immediate action required</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Search and Filters */}
        <Card className="bg-white border-2 border-gray-200">
          <CardContent className="p-6 space-y-6">
            {/* Search and Filter Dropdowns */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search products by name, SKU, or vendor..."
                  className="pl-12 h-12 bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black rounded-xl text-base"
                />
              </div>

              {/* Desktop Filters */}
              <div className="hidden lg:flex items-center gap-3">
                <Select>
                  <SelectTrigger className="w-[180px] h-12 bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-gray-400" />
                      <SelectValue placeholder="Category" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                    <SelectItem value="footwear">Footwear</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-[160px] h-12 bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-gray-600" />
                      <SelectValue placeholder="Status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-[180px] h-12 bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-black rounded-xl">
                    <div className="flex items-center gap-3">
                      <Package className="w-4 h-4 text-gray-400" />
                      <SelectValue placeholder="Stock level" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stock Levels</SelectItem>
                    <SelectItem value="in_stock">In Stock</SelectItem>
                    <SelectItem value="low_stock">Low Stock</SelectItem>
                    <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" className="gap-2 h-12 bg-white border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-xl px-6">
                  <Filter className="w-4 h-4" />
                  More filters
                </Button>
              </div>
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="h-8 gap-2 bg-gray-100 hover:bg-gray-200 border-gray-200 text-gray-700 transition-colors cursor-pointer">
                In Stock
                <X className="w-3.5 h-3.5 hover:text-gray-900" />
              </Badge>
              <Badge variant="secondary" className="h-8 gap-2 bg-gray-100 hover:bg-gray-200 border-gray-200 text-gray-700 transition-colors cursor-pointer">
                Active
                <X className="w-3.5 h-3.5 hover:text-gray-900" />
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* View Switcher */}
        <div className="flex items-center justify-between">
          <Tabs defaultValue="grid" className="w-[200px]" onValueChange={(value) => setView(value as 'grid' | 'list')}>
            <TabsList className="grid w-full grid-cols-2 bg-gray-100 border-2 border-gray-200 rounded-xl p-1">
              <TabsTrigger value="grid" className="flex items-center gap-2 rounded-lg">
                <LayoutGrid className="h-4 w-4" />
                Grid
              </TabsTrigger>
              <TabsTrigger value="list" className="flex items-center gap-2 rounded-lg">
                <List className="h-4 w-4" />
                List
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Select>
            <SelectTrigger className="w-[200px] bg-white border-2 border-gray-200 rounded-xl">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="price_asc">Price: Low to high</SelectItem>
              <SelectItem value="price_desc">Price: High to low</SelectItem>
              <SelectItem value="name_asc">Name: A to Z</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid/List */}
        {view === 'grid' ? (
          // Enhanced Grid View
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <Card 
                key={product.id} 
                className="group overflow-hidden hover:border-gray-400 transition-all duration-500 bg-white border-2 border-gray-200 rounded-2xl relative hover:-translate-y-1"
              >
                <Link 
                  href={`/products/${product.id}`}
                  className="absolute inset-0 z-10"
                  aria-label={`View details for ${product.title}`}
                />
                <div className="aspect-square relative overflow-hidden bg-gray-50 border-b-2 border-gray-200">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 z-20">
                    {getStatusBadge(product.status)}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex gap-2 z-20">
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="bg-white/95 hover:bg-white border-2 border-gray-300"
                      onClick={(e) => {
                        e.preventDefault();
                        // Add your quick view logic here
                      }}
                    >
                      Quick view
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Store className="w-3.5 h-3.5 text-gray-400" />
                        <p className="text-xs text-gray-500 font-medium">{product.vendor}</p>
                      </div>
                      <h3 className="font-semibold text-base line-clamp-2 group-hover:text-gray-700 transition-colors">
                        {product.title}
                      </h3>
                    </div>
                    <div className="space-y-3 pt-3 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-black">${product.price.toFixed(2)}</span>
                        <Badge variant="outline" className="text-xs bg-gray-50 border-gray-200">
                          {product.category}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${
                            product.inventory === 0 ? 'bg-red-500' : 
                            product.inventory < 10 ? 'bg-orange-500' : 
                            'bg-emerald-500'
                          }`}></div>
                          <span className="text-sm text-gray-600">{product.inventory} in stock</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          // Enhanced List View
          <Card className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200 border-b-2">
                  <TableHead className="w-[40px]">
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === products.length}
                      onChange={toggleSelectAll}
                      className="rounded border-gray-300"
                    />
                  </TableHead>
                  <TableHead>
                    <Button 
                      variant="ghost" 
                      className="gap-1 font-semibold text-gray-700 hover:text-black"
                      onClick={() => handleSort('title')}
                    >
                      Product
                      <ArrowUpDown className="w-4 h-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">Status</TableHead>
                  <TableHead>
                    <Button 
                      variant="ghost" 
                      className="gap-1 font-semibold text-gray-700 hover:text-black"
                      onClick={() => handleSort('inventory')}
                    >
                      Inventory
                      <ArrowUpDown className="w-4 h-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">Category</TableHead>
                  <TableHead>
                    <Button 
                      variant="ghost" 
                      className="gap-1 font-semibold text-gray-700 hover:text-black"
                      onClick={() => handleSort('price')}
                    >
                      Price
                      <ArrowUpDown className="w-4 h-4" />
                    </Button>
                  </TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedProducts.map((product) => (
                  <TableRow 
                    key={product.id}
                    className="group hover:bg-gray-50 transition-colors border-gray-100"
                  >
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => toggleProductSelection(product.id)}
                        className="rounded border-gray-300"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl border-2 border-gray-200 bg-gray-50 overflow-hidden">
                          {product.image ? (
                            <img 
                              src={product.image} 
                              alt={product.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="w-5 h-5 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-black">{product.title}</div>
                          <div className="text-sm text-gray-500">{product.vendor}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(product.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${
                          product.inventory === 0 ? 'bg-red-500' : 
                          product.inventory < 10 ? 'bg-orange-500' : 
                          'bg-emerald-500'
                        }`}></div>
                        <span className="font-medium">{product.inventory} units</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-gray-50 border-gray-200">
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-black">${product.price.toFixed(2)}</span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}

        {/* Enhanced Pagination */}
        <Card className="bg-white border-2 border-gray-200 rounded-2xl">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6 order-2 sm:order-1">
                <div className="text-sm text-gray-600">
                  Showing <span className="font-semibold text-black">{Math.min((currentPage - 1) * itemsPerPage + 1, products.length)}</span> to{" "}
                  <span className="font-semibold text-black">{Math.min(currentPage * itemsPerPage, products.length)}</span> of{" "}
                  <span className="font-semibold text-black">{products.length}</span> products
                </div>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value) => setItemsPerPage(parseInt(value))}
                >
                  <SelectTrigger className="w-[140px] h-9 bg-gray-50 border-2 border-gray-200 rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12 per page</SelectItem>
                    <SelectItem value="24">24 per page</SelectItem>
                    <SelectItem value="36">36 per page</SelectItem>
                    <SelectItem value="48">48 per page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2 order-1 sm:order-2">
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-lg border-2 border-gray-200 hover:bg-gray-50"
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-lg border-2 border-gray-200 hover:bg-gray-50"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  {pages.map(page => {
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="icon"
                          className={`h-9 w-9 rounded-lg ${
                            currentPage === page 
                              ? 'bg-black hover:bg-gray-900 border-2 border-black text-white' 
                              : 'border-2 border-gray-200 hover:bg-gray-50'
                          }`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <Button
                          key={page}
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 rounded-lg border-2 border-gray-200"
                          disabled
                        >
                          ...
                        </Button>
                      );
                    }
                    return null;
                  })}
                  
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-lg border-2 border-gray-200 hover:bg-gray-50"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-lg border-2 border-gray-200 hover:bg-gray-50"
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}