'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  MoreVertical,
  Link as LinkIcon,
  ChevronRight,
  Pencil,
  Trash2,
  GripVertical,
  AlertTriangle,
  Lock
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface MenuItem {
  id: string;
  title: string;
  type: 'link' | 'page';
  url?: string;
  items?: MenuItem[];
}

interface Menu {
  id: string;
  name: string;
  items: MenuItem[];
}

const menus: Menu[] = [
  {
    id: '1',
    name: 'Main menu',
    items: [
      {
        id: '1-1',
        title: 'Home',
        type: 'link',
        url: '/'
      },
      {
        id: '1-2',
        title: 'Shop',
        type: 'link',
        url: '/collections/all',
        items: [
          {
            id: '1-2-1',
            title: 'All Products',
            type: 'link',
            url: '/collections/all'
          },
          {
            id: '1-2-2',
            title: 'New Arrivals',
            type: 'link',
            url: '/collections/new-arrivals'
          }
        ]
      },
      {
        id: '1-3',
        title: 'About',
        type: 'page',
        url: '/pages/about'
      },
      {
        id: '1-4',
        title: 'Contact',
        type: 'page',
        url: '/pages/contact'
      }
    ]
  },
  {
    id: '2',
    name: 'Footer menu',
    items: [
      {
        id: '2-1',
        title: 'Search',
        type: 'link',
        url: '/search'
      },
      {
        id: '2-2',
        title: 'Privacy Policy',
        type: 'page',
        url: '/pages/privacy-policy'
      }
    ]
  }
];

export default function Navigation() {
  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Navigation</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage menus for your online store
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add menu
        </Button>
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

      {/* Menus */}
      <div className="space-y-6">
        {menus.map((menu) => (
          <Card key={menu.id}>
            <CardHeader className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{menu.name}</CardTitle>
                  <CardDescription>
                    {menu.items.length} items
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline">Edit menu</Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuItem>
                        <Pencil className="w-4 h-4 mr-2" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete menu
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="border rounded-lg divide-y">
                {menu.items.map((item) => (
                  <div key={item.id} className="p-3 flex items-center">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <button className="cursor-move hover:text-gray-600 transition-colors">
                        <GripVertical className="w-4 h-4 text-gray-400" />
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{item.title}</div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            item.type === 'link' 
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}>
                            {item.type}
                          </span>
                          <span className="truncate">{item.url}</span>
                        </div>
                      </div>
                      {item.items && (
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <span>{item.items.length} items</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuItem>
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <LinkIcon className="w-4 h-4 mr-2" />
                          Change link
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}