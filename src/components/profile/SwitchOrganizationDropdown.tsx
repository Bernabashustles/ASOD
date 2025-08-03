'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, Building2 } from 'lucide-react';

export function SwitchOrganizationDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          Switch Organization
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Acme Corporation</DropdownMenuItem>
        <DropdownMenuItem>Tech Startup Inc</DropdownMenuItem>
        <DropdownMenuItem>Create New Organization</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 