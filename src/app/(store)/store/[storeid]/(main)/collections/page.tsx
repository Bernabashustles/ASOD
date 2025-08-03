'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus, 
  Search, 
  Filter, 
  ArrowUpDown,
  MoreVertical,
  Image as ImageIcon,
  Eye,
  ShoppingCart,
  Calendar,
  Tag,
  Grid,
  List,
  Clock,
  ChevronDown,
  Bookmark,
  ExternalLink,
  X,
  Upload,
  Info,
  Loader2
} from 'lucide-react';
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

// Mock data - replace with actual API call
const mockCollections = [
  {
    id: "1",
    name: "Summer Collection 2024",
    description: "Our latest summer collection featuring lightweight and breathable fabrics.",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    products: 12,
    sales: 150,
    views: 2500,
    createdAt: "2024-03-15",
    percentageSold: 72
  },
  {
    id: "2",
    name: "Winter Essentials",
    description: "Stay warm and stylish with our winter collection.",
    image: "https://images.unsplash.com/photo-1577696393810-cf47fb4e0fad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    products: 8,
    sales: 200,
    views: 3000,
    createdAt: "2023-11-01",
    percentageSold: 85
  },
  {
    id: "3",
    name: "Spring Collection",
    description: "Fresh styles for the spring season.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    products: 0,
    sales: 0,
    views: 0,
    createdAt: "2024-02-20",
    percentageSold: 0
  },
  {
    id: "4",
    name: "Autumn Favorites",
    description: "Warm colors and cozy fabrics for the autumn season.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    products: 15,
    sales: 120,
    views: 1800,
    createdAt: "2023-09-10",
    percentageSold: 65
  }
];

export default function CollectionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCollection, setNewCollection] = useState({
    name: "",
    description: "",
    image: ""
  });
  const [isCreating, setIsCreating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredCollections = mockCollections
    .filter(collection => 
      (collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc" 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      if (sortBy === "products") {
        return sortOrder === "asc" 
          ? a.products - b.products
          : b.products - a.products;
      }
      if (sortBy === "sales") {
        return sortOrder === "asc" 
          ? a.sales - b.sales
          : b.sales - a.sales;
      }
      if (sortBy === "createdAt") {
        return sortOrder === "asc" 
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return 0;
    });

  // Handle mock collection creation
  const handleCreateCollection = () => {
    setIsCreating(true);
    // Simulate API call
    setTimeout(() => {
      setShowAddModal(false);
      setIsCreating(false);
      setNewCollection({ name: "", description: "", image: "" });
      // In a real app, you would add the new collection to the list
    }, 1500);
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        {/* Page Header */}
        <div className="mb-12 relative">
          <div className="absolute top-0 left-0 w-full h-32 bg-black opacity-5 rounded-xl -z-10" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 p-4 sm:p-6">
            <div className="space-y-1 sm:space-y-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Collections</h1>
              <p className="text-sm sm:text-base text-gray-500">Organize your products into themed groups</p>
            </div>
            <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
              <DialogTrigger asChild>
                <Button 
                  className="gap-2 bg-black hover:bg-gray-800 text-white shadow-sm hover:shadow-md transition-all duration-200 text-xs sm:text-sm h-9 sm:h-10"
                >
                  <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>New Collection</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden mx-4 sm:mx-auto">
                <DialogHeader className="p-4 sm:p-6 pb-2">
                  <DialogTitle className="text-lg sm:text-xl">Create New Collection</DialogTitle>
                  <DialogDescription className="text-sm">
                    Add a new collection to organize your products.
                  </DialogDescription>
                </DialogHeader>
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <label htmlFor="collection-name" className="block text-sm font-medium text-gray-700 mb-1">
                        Collection Name
                      </label>
                      <Input
                        id="collection-name"
                        placeholder="Summer Collection 2024"
                        value={newCollection.name}
                        onChange={(e) => setNewCollection({...newCollection, name: e.target.value})}
                        className="w-full bg-white border-gray-300 focus:border-gray-900 text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="collection-description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <Input
                        id="collection-description"
                        placeholder="Describe your collection..."
                        value={newCollection.description}
                        onChange={(e) => setNewCollection({...newCollection, description: e.target.value})}
                        className="w-full bg-white border-gray-300 focus:border-gray-900 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Collection Image
                      </label>
                      <div 
                        className="mt-1 flex justify-center px-4 sm:px-6 pt-4 sm:pt-5 pb-4 sm:pb-6 border-2 border-gray-300 border-dashed rounded-md hover:bg-gray-50 cursor-pointer"
                        onClick={handleFileSelect}
                      >
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
                          <div className="flex text-xs sm:text-sm text-gray-600">
                            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-gray-900 hover:text-gray-700">
                              <span>Upload a file</span>
                              <input 
                                id="file-upload" 
                                type="file" 
                                className="sr-only" 
                                ref={fileInputRef}
                                accept="image/*"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 p-4 sm:p-6 pt-2 bg-gray-50 border-t border-gray-100">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAddModal(false)}
                    className="border-gray-300 text-xs sm:text-sm h-8 sm:h-9"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCreateCollection}
                    className="bg-black hover:bg-gray-800 text-white flex items-center gap-2 text-xs sm:text-sm h-8 sm:h-9"
                    disabled={isCreating || !newCollection.name}
                  >
                    {isCreating ? (
                      <>
                        <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                        Create Collection
                      </>
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters & Search */}
        <Card className="mb-8 sm:mb-12 border border-gray-200 shadow-none backdrop-blur-sm bg-white/80">
          <CardContent className="p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <Input
                  placeholder="Search collections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9 sm:h-11 bg-white border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all duration-200 shadow-sm text-sm"
                />
              </div>
              <div className="flex flex-wrap gap-2">                
                <Button 
                  variant="outline" 
                  className="gap-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 h-9 sm:h-11 shadow-sm text-xs sm:text-sm"
                >
                  <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Filters</span>
                  <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                
                <div className="flex border border-gray-300 rounded-md overflow-hidden h-9 sm:h-11 shadow-sm">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "rounded-none border-0 h-full aspect-square",
                      viewMode === "grid" ? "bg-black text-white hover:bg-gray-800" : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <Grid className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "rounded-none border-0 h-full aspect-square",
                      viewMode === "list" ? "bg-black text-white hover:bg-gray-800" : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <List className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {isLoading ? (
          // Loading skeleton
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} className="h-[420px] border border-gray-200 shadow-sm rounded-xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="h-56 bg-gray-200 rounded-t-xl"></div>
                  <div className="p-8">
                    <div className="h-5 bg-gray-200 rounded mb-4 w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2 w-full"></div>
                    <div className="h-3 bg-gray-200 rounded mb-6 w-2/3"></div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-16 bg-gray-100 rounded-lg"></div>
                      <div className="h-16 bg-gray-100 rounded-lg"></div>
                      <div className="h-16 bg-gray-100 rounded-lg"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            {/* Empty state if no collections */}
            {filteredCollections.length === 0 && (
              <Card className="border border-gray-200 shadow-sm bg-white/80 backdrop-blur-sm p-16 text-center rounded-xl">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
                    <Tag className="h-10 w-10 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">No collections found</h3>
                  <p className="text-gray-600 max-w-md">
                    {searchQuery 
                      ? `No collections match your search query "${searchQuery}"`
                      : "Get started by creating your first collection to organize your products."}
                  </p>
                  <Button 
                    className="mt-4 gap-2 bg-black hover:bg-gray-800 text-white"
                    onClick={() => setShowAddModal(true)}
                  >
                    <Plus className="h-4 w-4" />
                    New Collection
                  </Button>
                </div>
              </Card>
            )}

            {/* Collections Grid */}
            {filteredCollections.length > 0 && viewMode === "grid" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredCollections.map((collection) => (
                  <Link href={`/collections/${collection.id}`} key={collection.id}>
                    <Card className="h-full group border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer rounded-xl overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative aspect-square sm:aspect-[4/3]">
                          <Image
                            src={collection.image}
                            alt={collection.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-300" />
                          
                          {/* Save button */}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="absolute top-3 sm:top-4 right-3 sm:right-4 h-7 w-7 sm:h-8 sm:w-8 bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                >
                                  <Bookmark className="h-3 w-3 sm:h-4 sm:w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">Bookmark collection</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          
                          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:translate-y-[-4px] transition-transform duration-300 line-clamp-2">
                              {collection.name}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-white/70 mt-1">
                              <Calendar className="h-3 w-3" />
                              <span>Created {new Date(collection.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 sm:p-6 bg-white border-t border-gray-100">
                          <p className="text-gray-600 mb-4 sm:mb-6 line-clamp-2 text-sm sm:text-base group-hover:text-gray-900 transition-colors duration-300">
                            {collection.description}
                          </p>
                          
                          {/* Progress bar for sales percentage */}
                          {collection.products > 0 && (
                            <div className="mb-4 sm:mb-6">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-medium text-gray-500">Sales Progress</span>
                                <span className="text-xs font-medium">{collection.percentageSold}%</span>
                              </div>
                              <Progress
                                value={collection.percentageSold}
                                className="h-1 bg-gray-100"
                                indicatorClassName="bg-gray-900"
                              />
                            </div>
                          )}
                          
                          <div className="grid grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
                            <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors duration-300">
                              <div className="font-semibold text-gray-900">{collection.products}</div>
                              <div className="text-gray-500">Products</div>
                            </div>
                            <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors duration-300">
                              <div className="font-semibold text-gray-900">{collection.sales}</div>
                              <div className="text-gray-500">Sales</div>
                            </div>
                            <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors duration-300">
                              <div className="font-semibold text-gray-900">{collection.views}</div>
                              <div className="text-gray-500">Views</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}

            {/* Collections List */}
            {filteredCollections.length > 0 && viewMode === "list" && (
              <Card className="border border-gray-200 shadow-sm rounded-xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50/80">
                          <th className="text-left py-4 px-6">
                            <Button
                              variant="ghost"
                              className="gap-2 font-semibold text-gray-700"
                              onClick={() => {
                                setSortBy("name");
                                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                              }}
                            >
                              Collection
                              <ArrowUpDown className="h-4 w-4" />
                            </Button>
                          </th>
                          <th className="text-left py-4 px-6">
                            <Button
                              variant="ghost"
                              className="gap-2 font-semibold text-gray-700"
                              onClick={() => {
                                setSortBy("products");
                                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                              }}
                            >
                              Products
                              <ArrowUpDown className="h-4 w-4" />
                            </Button>
                          </th>
                          <th className="text-left py-4 px-6">
                            <Button
                              variant="ghost"
                              className="gap-2 font-semibold text-gray-700"
                              onClick={() => {
                                setSortBy("sales");
                                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                              }}
                            >
                              Sales
                              <ArrowUpDown className="h-4 w-4" />
                            </Button>
                          </th>
                          <th className="text-left py-4 px-6">
                            <Button
                              variant="ghost"
                              className="gap-2 font-semibold text-gray-700"
                              onClick={() => {
                                setSortBy("createdAt");
                                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                              }}
                            >
                              Created
                              <ArrowUpDown className="h-4 w-4" />
                            </Button>
                          </th>
                          <th className="text-right py-4 px-6">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCollections.map((collection) => (
                          <tr key={collection.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150">
                            <td className="py-4 px-6">
                              <Link href={`/collections/${collection.id}`} className="flex items-center gap-4 group">
                                <div className="relative w-16 h-16 rounded-md overflow-hidden border border-gray-200 shadow-sm">
                                  <Image
                                    src={collection.image}
                                    alt={collection.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                  />
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900 group-hover:text-black transition-colors duration-200">
                                    {collection.name}
                                  </div>
                                  <div className="text-sm text-gray-500 line-clamp-1 max-w-xs">
                                    {collection.description}
                                  </div>
                                </div>
                              </Link>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-2">
                                <Tag className="h-4 w-4 text-gray-500" />
                                <span className="font-medium">{collection.products}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                  <ShoppingCart className="h-4 w-4 text-gray-500" />
                                  <span className="font-medium">{collection.sales}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Eye className="h-4 w-4 text-gray-500" />
                                  <span className="font-medium">{collection.views}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Calendar className="h-4 w-4" />
                                {new Date(collection.createdAt).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="py-4 px-6 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button 
                                        variant="ghost" 
                                        size="icon"
                                        className="hover:bg-gray-100 h-8 w-8"
                                        asChild
                                      >
                                        <Link href={`/collections/${collection.id}`}>
                                          <ExternalLink className="h-4 w-4" />
                                        </Link>
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="text-xs">View collection</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
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
                                    <TooltipContent>
                                      <p className="text-xs">More options</p>
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
            )}
          </>
        )}
      </div>
    </div>
  );
} 