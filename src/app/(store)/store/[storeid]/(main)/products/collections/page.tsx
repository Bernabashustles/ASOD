'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Tag,
  Calendar,
  ArrowUpDown,
  ChevronRight,
  ImageIcon,
  Settings,
  Pencil,
  Trash2,
  Store,
  Download,
  Eye,
  Copy,
  Globe
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Pagination } from '@/components/ui/pagination';

interface Collection {
  id: string;
  title: string;
  description: string;
  productCount: number;
  lastUpdated: string;
  image?: string;
}

const collections: Collection[] = [
  {
    id: '1',
    title: 'Summer Collection',
    description: 'Products for the summer season',
    productCount: 24,
    lastUpdated: '2024-02-20T10:00:00',
    image: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: '2',
    title: 'New Arrivals',
    description: 'Latest products added to the store',
    productCount: 12,
    lastUpdated: '2024-02-19T15:30:00',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: '3',
    title: 'Sale Items',
    description: 'Products currently on sale',
    productCount: 18,
    lastUpdated: '2024-02-18T09:15:00',
    image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  }
];

// Add this new component for the collection status
const CollectionStatus = ({ isActive }: { isActive: boolean }) => (
  <div className={`px-2 py-1 rounded-full inline-flex items-center gap-1.5 text-xs font-medium ${
    isActive 
      ? 'bg-green-50 text-green-700 border border-green-200' 
      : 'bg-gray-50 text-gray-600 border border-gray-200'
  }`}>
    <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
    {isActive ? 'Active' : 'Draft'}
  </div>
);

export default function CollectionsPage() {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Collection;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleSort = (key: keyof Collection) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedCollections = [...collections].sort((a, b) => {
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

  // Add pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  return (
    <div className="p-4 sm:p-6 max-w-full sm:max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">Collections</h1>
          <p className="text-sm text-gray-500 mt-1">
            Organize your products into collections
          </p>
        </div>
        <Link href="/products/collections/create">
          <Button className="mt-4 sm:mt-0 gap-2">
            <Plus className="w-4 h-4" />
            Create collection
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4 sm:mb-6">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search collections"
            className="pl-10"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" className="gap-2">
            <Settings className="w-4 h-4" />
            Manage display
          </Button>
        </div>
      </div>

      {/* Enhanced Desktop Table */}
      <div className="hidden lg:block border rounded-lg overflow-hidden bg-white">
        <div className="border-b border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                className="rounded border-gray-300"
                onChange={() => {/* Handle select all */}}
              />
              <span className="text-sm text-gray-500">0 selected</span>
              <div className="h-4 w-px bg-gray-200" />
              <Select>
                <SelectTrigger className="w-[130px] h-8">
                  <SelectValue placeholder="Bulk actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="publish">Publish selected</SelectItem>
                  <SelectItem value="unpublish">Unpublish selected</SelectItem>
                  <SelectItem value="delete">Delete selected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
              <Select>
                <SelectTrigger className="w-[130px] h-8">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title_asc">Title: A to Z</SelectItem>
                  <SelectItem value="title_desc">Title: Z to A</SelectItem>
                  <SelectItem value="updated_newest">Recently updated</SelectItem>
                  <SelectItem value="updated_oldest">Oldest updated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[40px]">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                />
              </TableHead>
              <TableHead className="w-[300px]">
                <Button variant="ghost" className="gap-1 -ml-3 h-8" onClick={() => handleSort('title')}>
                  Collection
                  <ArrowUpDown className="w-4 h-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="gap-1 -ml-3 h-8" onClick={() => handleSort('productCount')}>
                  Products
                  <ArrowUpDown className="w-4 h-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="gap-1 -ml-3 h-8" onClick={() => handleSort('lastUpdated')}>
                  Last updated
                  <ArrowUpDown className="w-4 h-4" />
                </Button>
              </TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCollections.map((collection) => (
              <TableRow key={collection.id} className="group">
                <TableCell>
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {collection.image ? (
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                        <img src={collection.image} alt={collection.title} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                        <ImageIcon className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                    <div>
                      <div className="font-medium">{collection.title}</div>
                      <div className="text-sm text-gray-500">{collection.description}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-gray-600">{collection.productCount} products</span>
                </TableCell>
                <TableCell>
                  <span className="text-gray-600">
                    {new Date(collection.lastUpdated).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Globe className="w-4 h-4 mr-2" />
                          View on store
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
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile View - Cards */}
      <div className="lg:hidden space-y-4">
        {sortedCollections.map((collection) => (
          <Card key={collection.id}>
            <div className="p-4">
              <div className="flex items-center gap-3">
                {collection.image ? (
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                    <img src={collection.image} alt={collection.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-gray-400" />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-medium">{collection.title}</h3>
                  <p className="text-sm text-gray-500">{collection.description}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Globe className="w-4 h-4 mr-2" />
                      View on store
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span>{collection.productCount} products</span>
                <span>Updated {new Date(collection.lastUpdated).toLocaleDateString()}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <Pagination
          totalItems={collections.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>
    </div>
  );
}