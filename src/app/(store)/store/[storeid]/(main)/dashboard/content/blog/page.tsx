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
  Settings
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

interface BlogPost {
  id: string;
  title: string;
  author: string;
  status: 'published' | 'draft' | 'scheduled';
  visibility: 'visible' | 'hidden';
  publishDate: string;
  comments: number;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Summer Collection Launch',
    author: 'John Doe',
    status: 'published',
    visibility: 'visible',
    publishDate: '2024-02-20T10:00:00',
    comments: 5
  },
  {
    id: '2',
    title: 'How to Style Your New Accessories',
    author: 'Jane Smith',
    status: 'draft',
    visibility: 'hidden',
    publishDate: '',
    comments: 0
  },
  {
    id: '3',
    title: 'Spring Fashion Trends 2024',
    author: 'John Doe',
    status: 'scheduled',
    visibility: 'visible',
    publishDate: '2024-03-01T09:00:00',
    comments: 0
  }
];

export default function BlogPage() {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof BlogPost;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleSort = (key: keyof BlogPost) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedPosts = [...blogPosts].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const getStatusBadge = (status: BlogPost['status']) => {
    switch (status) {
      case 'published':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Published
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Draft
          </span>
        );
      case 'scheduled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Scheduled
          </span>
        );
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-[1200px] mx-auto">
      {/* Header - Made responsive */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">Blog posts</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create and manage blog posts
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <Button variant="outline" className="justify-center">
            <Settings className="w-4 h-4 mr-2" />
            Manage blogs
          </Button>
          <Link href="/dashboard/content/blog/create" className="flex-1 sm:flex-none">
            <Button className="w-full sm:w-auto gap-2 justify-center">
              <Plus className="w-4 h-4" />
              Create blog post
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters and Search - Made responsive */}
      <div className="space-y-4 mb-6">
        {/* Search and Status Filter Row */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search blog posts"
              className="pl-10 w-full"
            />
          </div>
          <div className="grid grid-cols-2 sm:flex gap-2">
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="visible">Visible</SelectItem>
                <SelectItem value="hidden">Hidden</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="col-span-2 sm:col-span-1 gap-2 justify-center">
              <Filter className="w-4 h-4" />
              More filters
            </Button>
          </div>
        </div>
      </div>

      {/* Blog Posts Table - Made responsive */}
      <div className="border rounded-lg overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">
                  <Button 
                    variant="ghost" 
                    className="gap-1 font-medium"
                    onClick={() => handleSort('title')}
                  >
                    Title
                    <ArrowUpDown className="w-4 h-4" />
                  </Button>
                </TableHead>
                <TableHead className="min-w-[100px]">Status</TableHead>
                <TableHead className="min-w-[100px]">Visibility</TableHead>
                <TableHead className="min-w-[120px]">
                  <Button 
                    variant="ghost" 
                    className="gap-1 font-medium"
                    onClick={() => handleSort('author')}
                  >
                    Author
                    <ArrowUpDown className="w-4 h-4" />
                  </Button>
                </TableHead>
                <TableHead className="min-w-[150px]">
                  <Button 
                    variant="ghost" 
                    className="gap-1 font-medium"
                    onClick={() => handleSort('publishDate')}
                  >
                    Published
                    <ArrowUpDown className="w-4 h-4" />
                  </Button>
                </TableHead>
                <TableHead className="min-w-[100px]">Comments</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4 text-gray-400" />
                      </div>
                      <Link 
                        href={`/dashboard/content/blog/${post.id}`}
                        className="font-medium min-w-[150px] truncate hover:text-blue-600"
                      >
                        {post.title}
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(post.status)}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      post.visibility === 'visible' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {post.visibility === 'visible' ? 'Visible' : 'Hidden'}
                    </span>
                  </TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>
                    {post.publishDate ? (
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {new Date(post.publishDate).toLocaleDateString()}
                      </div>
                    ) : (
                      '—'
                    )}
                  </TableCell>
                  <TableCell>{post.comments}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <Link href={`/dashboard/content/blog/${post.id}`}>
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </DropdownMenuItem>
                        </Link>
                        <Link href={`/dashboard/content/blog/${post.id}/edit`}>
                          <DropdownMenuItem>
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                        </Link>
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
    </div>
  );
}