'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Edit2, 
  Save, 
  X, 
  Plus, 
  Image as ImageIcon, 
  Tag, 
  Clock, 
  Eye, 
  ShoppingCart, 
  Filter, 
  Search, 
  ArrowUpDown,
  MoreVertical,
  Trash2,
  Copy,
  Share2,
  ChevronLeft,
  Menu
} from 'lucide-react';
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

// Mock data - replace with actual API call
const mockCollectionData = {
  id: "1",
  name: "Summer Collection 2024",
  description: "Our latest summer collection featuring lightweight and breathable fabrics perfect for the summer season. Designed with comfort and style in mind.",
  image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  stats: {
    totalProducts: 24,
    totalSales: 315,
    totalViews: 5280,
    averagePrice: 49.99
  },
  products: [
    {
      id: "p1",
      name: "Lightweight Summer Dress",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      price: 29.99,
      inventory: 45,
      status: "active",
      sales: 68,
      views: 1200
    },
    {
      id: "p2",
      name: "Breathable Linen Shirt",
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      price: 39.99,
      inventory: 32,
      status: "active",
      sales: 46,
      views: 980
    },
    {
      id: "p3",
      name: "Cotton Shorts",
      image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      price: 24.99,
      inventory: 56,
      status: "active",
      sales: 83,
      views: 1500
    }
  ]
};

export default function CollectionDetailPage() {
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(mockCollectionData.name);
  const [editedDescription, setEditedDescription] = useState(mockCollectionData.description);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSave = () => {
    // In a real app, you would send updates to the API
    // For now, just toggle editing state
    setIsEditing(false);
  };

  const filteredProducts = mockCollectionData.products
    .filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc" 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      if (sortBy === "price") {
        return sortOrder === "asc" 
          ? a.price - b.price
          : b.price - a.price;
      }
      if (sortBy === "sales") {
        return sortOrder === "asc" 
          ? a.sales - b.sales
          : b.sales - a.sales;
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Back Button */}
        <Link 
          href="/collections" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="text-sm sm:text-base">Back to Collections</span>
        </Link>

        {/* Collection Header */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="w-full lg:w-1/3">
            <Card className="h-full border-0 shadow-sm rounded-xl overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-square sm:aspect-[4/3]">
                  <Image
                    src={mockCollectionData.image}
                    alt={mockCollectionData.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge 
                      variant="secondary" 
                      className="mb-2 bg-white/10 backdrop-blur-sm border-0 text-white"
                    >
                      Active
                    </Badge>
                    <h1 className="text-xl sm:text-2xl font-bold text-white">
                      {isEditing ? (
                        <Input
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                          className="text-xl sm:text-2xl font-bold bg-white/10 border-white/20 text-white placeholder:text-white/70"
                        />
                      ) : (
                        mockCollectionData.name
                      )}
                    </h1>
                  </div>
                </div>
                <div className="p-4 sm:p-6 bg-white">
                  {isEditing ? (
                    <Input
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      className="mb-6 bg-gray-50 border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                    />
                  ) : (
                    <p className="text-gray-600 mb-6 text-sm sm:text-base">{mockCollectionData.description}</p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={isEditing ? "default" : "outline"}
                      onClick={isEditing ? handleSave : () => setIsEditing(true)}
                      className={cn(
                        "gap-2 text-xs sm:text-sm",
                        isEditing ? "bg-black hover:bg-gray-800 text-white" : "border-gray-200 hover:bg-gray-50"
                      )}
                    >
                      {isEditing ? (
                        <>
                          <Save className="h-4 w-4" />
                          Save Changes
                        </>
                      ) : (
                        <>
                          <Edit2 className="h-4 w-4" />
                          Edit Collection
                        </>
                      )}
                    </Button>
                    {isEditing && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsEditing(false);
                          setEditedName(mockCollectionData.name);
                          setEditedDescription(mockCollectionData.description);
                        }}
                        className="border-gray-200 hover:bg-gray-50 text-xs sm:text-sm"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="w-full lg:w-2/3">
            <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">Collection Stats</CardTitle>
                <CardDescription>Overview of your collection's performance</CardDescription>
              </CardHeader>
              <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                    <div className="text-xs sm:text-sm text-gray-600">Total Products</div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">{mockCollectionData.stats.totalProducts}</div>
                  </div>
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                    <div className="text-xs sm:text-sm text-gray-600">Total Sales</div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">{mockCollectionData.stats.totalSales}</div>
                  </div>
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                    <div className="text-xs sm:text-sm text-gray-600">Total Views</div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">{mockCollectionData.stats.totalViews}</div>
                  </div>
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                    <div className="text-xs sm:text-sm text-gray-600">Average Price</div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">${mockCollectionData.stats.averagePrice}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Products Section */}
        <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="p-4 sm:p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <CardTitle className="text-lg sm:text-xl">Products in Collection</CardTitle>
                <CardDescription className="text-sm">Manage products in this collection</CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-full h-10 bg-white border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2 border-gray-200 hover:bg-gray-50 h-10 text-xs sm:text-sm">
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">Filter</span>
                  </Button>
                  <Button className="gap-2 bg-black hover:bg-gray-800 text-white h-10 text-xs sm:text-sm">
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">Add Product</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50/80">
                    <th className="text-left py-3 px-4 sm:py-4 sm:px-6">
                      <Button
                        variant="ghost"
                        className="gap-2 font-semibold text-gray-700 text-xs sm:text-sm"
                        onClick={() => {
                          setSortBy("name");
                          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        }}
                      >
                        Product
                        <ArrowUpDown className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </th>
                    <th className="text-left py-3 px-2 sm:py-4 sm:px-6">
                      <Button
                        variant="ghost"
                        className="gap-2 font-semibold text-gray-700 text-xs sm:text-sm"
                        onClick={() => {
                          setSortBy("price");
                          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        }}
                      >
                        Price
                        <ArrowUpDown className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </th>
                    <th className="text-left py-3 px-2 sm:py-4 sm:px-6">
                      <Button
                        variant="ghost"
                        className="gap-2 font-semibold text-gray-700 text-xs sm:text-sm"
                        onClick={() => {
                          setSortBy("sales");
                          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        }}
                      >
                        Sales
                        <ArrowUpDown className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </th>
                    <th className="text-left py-3 px-2 sm:py-4 sm:px-6">
                      <span className="text-xs sm:text-sm font-semibold text-gray-700">Status</span>
                    </th>
                    <th className="text-right py-3 px-2 sm:py-4 sm:px-6">
                      <span className="text-xs sm:text-sm font-semibold text-gray-700">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50 transition-colors duration-150">
                      <td className="py-3 px-4 sm:py-4 sm:px-6">
                        <div className="flex items-center gap-3 group">
                          <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-200"
                            />
                          </div>
                          <div>
                            <div className="font-medium group-hover:text-gray-900 transition-colors duration-200 text-sm sm:text-base line-clamp-1">
                              {product.name}
                            </div>
                            <div className="text-xs text-gray-500">ID: {product.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2 sm:py-4 sm:px-6">
                        <span className="font-medium text-sm sm:text-base">${product.price}</span>
                      </td>
                      <td className="py-3 px-2 sm:py-4 sm:px-6">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                            <span className="font-medium text-xs sm:text-sm">{product.sales}</span>
                          </div>
                          <div className="flex items-center gap-1 sm:gap-2">
                            <Eye className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                            <span className="font-medium text-xs sm:text-sm">{product.views}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2 sm:py-4 sm:px-6">
                        <Badge
                          variant={product.status === "active" ? "default" : "secondary"}
                          className="bg-black text-white border-0 text-xs"
                        >
                          {product.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-2 sm:py-4 sm:px-6 text-right">
                        <div className="flex items-center justify-end">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="hover:bg-gray-100 h-8 w-8"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent align="end" className="text-xs">
                                <p>More options</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}                                                                                                                                                                       