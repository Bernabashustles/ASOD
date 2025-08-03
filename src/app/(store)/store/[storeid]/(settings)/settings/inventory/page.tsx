'use client';

import { useState } from 'react';
import { SettingsPage } from '../components/settings-page';
import {
  Card,
  CardContent,
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
  Package,
  Search,
  Plus,
  MoreVertical,
  Tags,
  DollarSign,
  Boxes,
  AlertCircle,
  Info,
  Filter,
  BarChart,
  TrendingUp,
  Eye,
  ShoppingCart,
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

interface Product {
  id: number;
  name: string;
  category: string;
  sku: string;
  price: number;
  stock: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  description: string;
  supplier: string;
  lastUpdated: string;
  reorderPoint: number;
  soldThisMonth: number;
}

export default function InventorySettingsPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Premium Cotton T-Shirt',
      category: 'Apparel',
      sku: 'TSH-001',
      price: 29.99,
      stock: 150,
      status: 'in-stock',
      description: 'High-quality cotton t-shirt available in multiple colors',
      supplier: 'Fashion Wholesale Co.',
      lastUpdated: '2 hours ago',
      reorderPoint: 50,
      soldThisMonth: 45,
    },
    {
      id: 2,
      name: 'Wireless Earbuds',
      category: 'Electronics',
      sku: 'WEB-002',
      price: 89.99,
      stock: 25,
      status: 'low-stock',
      description: 'True wireless earbuds with noise cancellation',
      supplier: 'Tech Distributors Ltd.',
      lastUpdated: '1 day ago',
      reorderPoint: 30,
      soldThisMonth: 78,
    },
    {
      id: 3,
      name: 'Ceramic Plant Pot',
      category: 'Home & Garden',
      sku: 'CPP-003',
      price: 19.99,
      stock: 0,
      status: 'out-of-stock',
      description: 'Decorative ceramic pot for indoor plants',
      supplier: 'Garden Supplies Inc.',
      lastUpdated: '3 days ago',
      reorderPoint: 25,
      soldThisMonth: 32,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    category: '',
    sku: '',
    price: 0,
    stock: 0,
    description: '',
    supplier: '',
    reorderPoint: 0,
  });

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return b.price - a.price;
        case 'stock':
          return b.stock - a.stock;
        case 'sold':
          return b.soldThisMonth - a.soldThisMonth;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    // Add product creation logic here
    setIsCreateDialogOpen(false);
  };

  const handleEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    // Add product update logic here
    setIsEditDialogOpen(false);
  };

  const handleDeleteProduct = (productId: number) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
  };

  const openEditDialog = (product: Product) => {
    setSelectedProduct(product);
    setEditFormData({
      name: product.name,
      category: product.category,
      sku: product.sku,
      price: product.price,
      stock: product.stock,
      description: product.description,
      supplier: product.supplier,
      reorderPoint: product.reorderPoint,
    });
    setIsEditDialogOpen(true);
  };

  const getStatusColor = (status: Product['status']) => {
    switch (status) {
      case 'in-stock':
        return 'default';
      case 'low-stock':
        return 'warning';
      case 'out-of-stock':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <SettingsPage
      title="Inventory Management"
      description="Manage your product inventory and stock levels"
    >
      <div className="space-y-8">
        {/* Header Actions */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Apparel">Apparel</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px]">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="stock">Stock Level</SelectItem>
                  <SelectItem value="sold">Best Selling</SelectItem>
                </SelectContent>
              </Select>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <form onSubmit={handleCreateProduct}>
                    <DialogHeader>
                      <DialogTitle>Add New Product</DialogTitle>
                      <DialogDescription>
                        Add a new product to your inventory.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Product Name</Label>
                          <Input id="name" placeholder="Enter product name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Apparel">Apparel</SelectItem>
                              <SelectItem value="Electronics">Electronics</SelectItem>
                              <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="sku">SKU</Label>
                          <Input id="sku" placeholder="Enter SKU" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="price">Price</Label>
                          <Input id="price" type="number" placeholder="0.00" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="stock">Stock Level</Label>
                          <Input id="stock" type="number" placeholder="0" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reorder">Reorder Point</Label>
                          <Input id="reorder" type="number" placeholder="0" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Product description" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="supplier">Supplier</Label>
                        <Input id="supplier" placeholder="Supplier name" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Create Product</Button>
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
                Total Products
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-muted-foreground">
                Across {new Set(products.map(p => p.category)).size} categories
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Value
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${products.reduce((sum, product) => sum + (product.price * product.stock), 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Inventory value
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Low Stock Items
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {products.filter(p => p.status === 'low-stock' || p.status === 'out-of-stock').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Need attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Monthly Sales
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {products.reduce((sum, product) => sum + product.soldThisMonth, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Units sold this month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1.5">
                    <CardTitle className="text-xl font-semibold">{product.name}</CardTitle>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="capitalize">
                        {product.category}
                      </Badge>
                      <Badge variant={getStatusColor(product.status)} className="capitalize">
                        {product.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => {
                        setSelectedProduct(product);
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
                        <DropdownMenuItem onClick={() => openEditDialog(product)}>
                          Edit Product
                        </DropdownMenuItem>
                        <DropdownMenuItem>Update Stock</DropdownMenuItem>
                        <DropdownMenuItem>View History</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          Delete Product
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Tags className="h-4 w-4 shrink-0" />
                    SKU: {product.sku}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {product.description}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Boxes className="h-4 w-4 shrink-0" />
                    Supplier: {product.supplier}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Price</p>
                    <p className="text-xl font-bold mt-1">${product.price}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Stock</p>
                    <p className="text-xl font-bold mt-1">{product.stock}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Sold</p>
                    <p className="text-xl font-bold mt-1">{product.soldThisMonth}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground border-t pt-4">
                Last updated: {product.lastUpdated}
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <form onSubmit={handleEditProduct}>
              <DialogHeader>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogDescription>
                  Update the details for {selectedProduct?.name}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Product Name</Label>
                    <Input
                      id="edit-name"
                      value={editFormData.name}
                      onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-category">Category</Label>
                    <Select
                      value={editFormData.category}
                      onValueChange={(value) => setEditFormData({ ...editFormData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Apparel">Apparel</SelectItem>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-sku">SKU</Label>
                    <Input
                      id="edit-sku"
                      value={editFormData.sku}
                      onChange={(e) => setEditFormData({ ...editFormData, sku: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-price">Price</Label>
                    <Input
                      id="edit-price"
                      type="number"
                      value={editFormData.price}
                      onChange={(e) => setEditFormData({ ...editFormData, price: parseFloat(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-stock">Stock Level</Label>
                    <Input
                      id="edit-stock"
                      type="number"
                      value={editFormData.stock}
                      onChange={(e) => setEditFormData({ ...editFormData, stock: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-reorder">Reorder Point</Label>
                    <Input
                      id="edit-reorder"
                      type="number"
                      value={editFormData.reorderPoint}
                      onChange={(e) => setEditFormData({ ...editFormData, reorderPoint: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={editFormData.description}
                    onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-supplier">Supplier</Label>
                  <Input
                    id="edit-supplier"
                    value={editFormData.supplier}
                    onChange={(e) => setEditFormData({ ...editFormData, supplier: e.target.value })}
                  />
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
              <DialogTitle>{selectedProduct?.name}</DialogTitle>
              <DialogDescription>
                Detailed product information and statistics.
              </DialogDescription>
            </DialogHeader>
            {selectedProduct && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm">Category</h4>
                    <p className="text-sm text-muted-foreground">{selectedProduct.category}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Status</h4>
                    <Badge
                      variant={getStatusColor(selectedProduct.status)}
                      className="mt-1 capitalize"
                    >
                      {selectedProduct.status.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-sm">SKU</h4>
                  <p className="text-sm text-muted-foreground">{selectedProduct.sku}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedProduct.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm">Supplier</h4>
                    <p className="text-sm text-muted-foreground">{selectedProduct.supplier}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Last Updated</h4>
                    <p className="text-sm text-muted-foreground">{selectedProduct.lastUpdated}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div>
                    <h4 className="font-medium text-sm">Price</h4>
                    <p className="text-xl font-bold">${selectedProduct.price}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Stock</h4>
                    <p className="text-xl font-bold">{selectedProduct.stock}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Sold</h4>
                    <p className="text-xl font-bold">{selectedProduct.soldThisMonth}</p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <h4 className="font-medium text-sm">Stock Management</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Reorder Point:</span>
                      <span className="font-medium">{selectedProduct.reorderPoint} units</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Stock Value:</span>
                      <span className="font-medium">
                        ${(selectedProduct.price * selectedProduct.stock).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Help Section */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Need help managing your inventory? Check out our{" "}
            <a href="#" className="font-medium underline underline-offset-4">
              inventory management guide
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