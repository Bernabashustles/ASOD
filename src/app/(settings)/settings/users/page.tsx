'use client';

import React from 'react';
import { 
  Users,
  Plus,
  MoreVertical,
  Mail,
  Shield,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Search
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Staff';
  status: 'active' | 'pending' | 'inactive';
  lastActive: string;
}

const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Owner',
    status: 'active',
    lastActive: '2024-02-20T10:00:00'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Admin',
    status: 'active',
    lastActive: '2024-02-19T15:30:00'
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    role: 'Staff',
    status: 'pending',
    lastActive: ''
  }
];

const getStatusBadge = (status: User['status']) => {
  switch (status) {
    case 'active':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle2 className="w-3 h-3" />
          Active
        </span>
      );
    case 'pending':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <Clock className="w-3 h-3" />
          Pending
        </span>
      );
    case 'inactive':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          <XCircle className="w-3 h-3" />
          Inactive
        </span>
      );
  }
};

export default function UsersSettingsPage() {
  return (
    <div className="p-4 sm:p-8 max-w-[1000px]">
      {/* Header - Improved spacing and stacking on mobile */}
      <div className="flex flex-col gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">Users and permissions</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage user access and roles
          </p>
        </div>
        <Button className="w-full sm:w-auto self-start">
          <Plus className="w-4 h-4 mr-2" />
          Add user
        </Button>
      </div>

      {/* Plan Limit Alert - Improved mobile layout */}
      <Alert className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Staff account limit</AlertTitle>
        <AlertDescription className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span>You are using 3 of 5 available staff accounts on your current plan.</span>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            Upgrade plan
          </Button>
        </AlertDescription>
      </Alert>

      {/* Users List Card - Improved search bar layout */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle>Users</CardTitle>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <Input placeholder="Search users" className="pl-9 w-full" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Desktop Table View */}
          <div className="hidden sm:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last active</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-gray-400" />
                        {user.role}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>
                      {user.lastActive ? (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          {new Date(user.lastActive).toLocaleDateString()}
                        </div>
                      ) : (
                        '—'
                      )}
                    </TableCell>
                    <TableCell>
                      <UserActions />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="sm:hidden space-y-4">
            {users.map((user) => (
              <div key={user.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                  <UserActions />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">Role</div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-gray-400" />
                      {user.role}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">Status</div>
                    {getStatusBadge(user.status)}
                  </div>
                  {user.lastActive && (
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">Last active</div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {new Date(user.lastActive).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Roles and Permissions - Improved mobile layout */}
      <Card>
        <CardHeader>
          <CardTitle>Roles and permissions</CardTitle>
          <CardDescription>
            Configure access levels and permissions for each role
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                role: 'Owner',
                description: 'Full access to all settings and features',
                permissions: ['Manage users', 'Billing access', 'Delete store']
              },
              {
                role: 'Admin',
                description: 'Can manage most settings and features',
                permissions: ['Manage products', 'View analytics', 'Process orders']
              },
              {
                role: 'Staff',
                description: 'Limited access to store features',
                permissions: ['Process orders', 'Customer service', 'View reports']
              }
            ].map((role, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex flex-col gap-4 mb-4">
                  <div>
                    <h3 className="font-medium">{role.role}</h3>
                    <p className="text-sm text-gray-500">{role.description}</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    Edit permissions
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {role.permissions.map((permission, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="break-words">{permission}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Update mobile card view for better spacing
const UserActions = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
        <MoreVertical className="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-[200px]">
      <DropdownMenuItem className="cursor-pointer">
        <Mail className="w-4 h-4 mr-2" />
        Send invitation
      </DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer">
        <Shield className="w-4 h-4 mr-2" />
        Change role
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="text-red-600 cursor-pointer">
        <XCircle className="w-4 h-4 mr-2" />
        Remove user
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);