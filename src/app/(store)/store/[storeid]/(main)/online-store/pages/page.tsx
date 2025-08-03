'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  Calendar,
  ArrowUpDown,
  Eye,
  Pencil,
  Trash2,
  FileText,
  Lock,
  Globe,
  AlertTriangle
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Page {
  id: string;
  title: string;
  author: string;
  visibility: 'visible' | 'hidden';
  lastUpdated: string;
  template: string;
}

const pages: Page[] = [
  {
    id: '1',
    title: 'Home',
    author: 'John Doe',
    visibility: 'visible',
    lastUpdated: '2024-02-20T10:00:00',
    template: 'Default page'
  },
  {
    id: '2',
    title: 'About Us',
    author: 'Jane Smith',
    visibility: 'visible',
    lastUpdated: '2024-02-19T15:30:00',
    template: 'Page with sidebar'
  },
  {
    id: '3',
    title: 'Contact',
    author: 'John Doe',
    visibility: 'hidden',
    lastUpdated: '2024-02-18T09:15:00',
    template: 'Contact form'
  }
];

export default function PagesPage() {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Page;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleSort = (key: keyof Page) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedPages = [...pages].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Pages</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create and manage static pages
          </p>
        </div>
        <Link href="/online-store/pages/create">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add page
          </Button>
        </Link>
      </div>

      {/* Password Protection Notice */}
      <Alert className="mb-6">
        <Lock className="h-4 w-4" />
        <AlertTitle>Store is password protected</AlertTitle>
        <AlertDescription className="flex items-center justify-between">
          <span>Your online store is protected with a password. Only visitors with the password can access your store.</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Manage password</Button>
            <Button size="sm">Remove password</Button>
          </div>
        </AlertDescription>
      </Alert>

      {/* Filters and Search */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search pages"
            className="pl-10"
          />
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Visibility" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="visible">Visible</SelectItem>
            <SelectItem value="hidden">Hidden</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          More filters
        </Button>
      </div>

      {/* Pages Table */}
      <div className="border rounded-lg overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button 
                  variant="ghost" 
                  className="gap-1 font-medium"
                  onClick={() => handleSort('title')}
                >
                  Title
                  <ArrowUpDown className="w-4 h-4" />
                </Button>
              </TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead>Template</TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  className="gap-1 font-medium"
                  onClick={() => handleSort('author')}
                >
                  Author
                  <ArrowUpDown className="w-4 h-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  className="gap-1 font-medium"
                  onClick={() => handleSort('lastUpdated')}
                >
                  Last updated
                  <ArrowUpDown className="w-4 h-4" />
                </Button>
              </TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPages.map((page) => (
              <TableRow key={page.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="font-medium">{page.title}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    page.visibility === 'visible' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {page.visibility === 'visible' ? (
                      <>
                        <Globe className="w-3 h-3" />
                        Visible
                      </>
                    ) : (
                      <>
                        <Lock className="w-3 h-3" />
                        Hidden
                      </>
                    )}
                  </span>
                </TableCell>
                <TableCell>{page.template}</TableCell>
                <TableCell>{page.author}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {new Date(page.lastUpdated).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}