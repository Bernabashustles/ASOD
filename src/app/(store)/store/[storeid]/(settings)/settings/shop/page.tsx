'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { SettingsPage } from '../components/settings-page';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Plus,
  MoreVertical,
  MapPin,
  ChevronDown,
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Store, CheckCircle2, Circle, Home, List } from 'lucide-react';

type LocationStatus = 'ACTIVE' | 'INACTIVE';

type Location = {
  id: string;
  name: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    postalCode?: string;
    country: string;
  };
  inPersonSellingIncluded: boolean;
  status: LocationStatus;
};

const formatAddress = (loc: Location) => {
  const a = loc.address;
  const parts = [a.line1, a.line2, a.city, a.state, a.postalCode, a.country].filter(Boolean);
  return parts.join(', ');
};

export default function LocationsPage() {
  // Sample data (replace with API later)
  const [locations, setLocations] = useState<Location[]>([
    {
      id: '1',
      name: 'Addis Ababa',
      address: { line1: 'Addis Ababa', city: 'Addis Ababa', country: 'Ethiopia', postalCode: '1000' },
      inPersonSellingIncluded: true,
      status: 'ACTIVE',
    },
    {
      id: '2',
      name: 'Addis Ababa Warehouse',
      address: { line1: 'Addis Ababa', city: 'Addis Ababa', country: 'Ethiopia' },
      inPersonSellingIncluded: true,
      status: 'ACTIVE',
    },
    {
      id: '3',
      name: 'Berna',
      address: { line1: 'hd apartment', city: 'Addis Ababa', country: 'Ethiopia' },
      inPersonSellingIncluded: true,
      status: 'ACTIVE',
    },
    {
      id: '4',
      name: 'Mekelle',
      address: { line1: 'Kebele 03', city: 'Mekelle', country: 'Ethiopia' },
      inPersonSellingIncluded: false,
      status: 'INACTIVE',
    },
    {
      id: '5',
      name: 'NYC Fifth Ave Flagship',
      address: { line1: '767 5th Ave', city: 'New York', country: 'US' },
      inPersonSellingIncluded: true,
      status: 'ACTIVE',
    }
  ]);

  const [defaultLocationId, setDefaultLocationId] = useState<string>('1');
  const [query, setQuery] = useState<string>('');
  const [tab, setTab] = useState<'all' | 'active' | 'inactive' | 'included'>('all');
  const [isDefaultPickerOpen, setIsDefaultPickerOpen] = useState<boolean>(false);

  const planMaxActive = 10;
  const activeCount = useMemo(() => locations.filter(l => l.status === 'ACTIVE').length, [locations]);
  const planUsagePercent = Math.min(100, Math.round((activeCount / planMaxActive) * 100));

  const counts = useMemo(() => ({
    all: locations.length,
    active: locations.filter(l => l.status === 'ACTIVE').length,
    inactive: locations.filter(l => l.status === 'INACTIVE').length,
    included: locations.filter(l => l.inPersonSellingIncluded).length,
  }), [locations]);

  const filtered = useMemo(() => {
    let data = locations;
    if (tab === 'active') data = data.filter(l => l.status === 'ACTIVE');
    if (tab === 'inactive') data = data.filter(l => l.status === 'INACTIVE');
    if (tab === 'included') data = data.filter(l => l.inPersonSellingIncluded);
    const q = query.trim().toLowerCase();
    if (q) {
      data = data.filter(l =>
        l.name.toLowerCase().includes(q) ||
        formatAddress(l).toLowerCase().includes(q)
      );
    }
    return data;
  }, [locations, tab, query]);

  const makeDefault = (id: string) => setDefaultLocationId(id);

  const addLocation = () => {
    // Placeholder add action
    const id = String(Date.now());
    setLocations(prev => ([
      ...prev,
      {
        id,
        name: 'New Location',
        address: { line1: 'Street 1', city: 'City', country: 'Country' },
        inPersonSellingIncluded: false,
        status: 'INACTIVE',
      },
    ]));
  };

  const DefaultLocationCard = () => {
    const loc = locations.find(l => l.id === defaultLocationId) || locations[0];
    if (!loc) return null;
    return (
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Default location</CardTitle>
          <CardDescription>
            This location is used by your store and apps when no other location is specified
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center">
                <MapPin className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="font-medium truncate">{loc.name}</div>
                <div className="text-[13px] font-mono leading-snug tracking-wide text-muted-foreground truncate">{formatAddress(loc)}</div>
              </div>
            </div>
            <Button variant="outline" className="gap-1" onClick={() => setIsDefaultPickerOpen(true)}>
              Change
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          {/* Advanced default selector */}
          <CommandDialog open={isDefaultPickerOpen} onOpenChange={setIsDefaultPickerOpen}>
            <CommandInput placeholder="Search locations…" />
            <CommandList>
              <CommandEmpty>No locations found.</CommandEmpty>
              <CommandGroup heading="Active locations">
                {locations.filter(l => l.status === 'ACTIVE').map((l) => (
                  <CommandItem key={l.id} value={`${l.name} ${formatAddress(l)}`} onSelect={() => { makeDefault(l.id); setIsDefaultPickerOpen(false); }}>
                    <MapPin className="mr-2 h-4 w-4" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium truncate">{l.name}</span>
                        {l.id === defaultLocationId && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                      </div>
                      <div className="text-[12px] font-mono text-muted-foreground truncate">{formatAddress(l)}</div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Actions">
                <CommandItem onSelect={() => { addLocation(); setIsDefaultPickerOpen(false); }}>
                  <Plus className="mr-2 h-4 w-4" /> Add new location…
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </CardContent>
      </Card>
    );
  };

  return (
    <SettingsPage title="Locations" description="Manage all your store locations for in‑person selling and fulfillment.">
      <div className="space-y-8">
        {/* All locations */}
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <CardTitle className="text-base">All locations</CardTitle>
                <CardDescription className="mt-1 flex items-center gap-3">
                  <span>Using {activeCount} of {planMaxActive} active locations available on your plan</span>
                </CardDescription>
                <div className="mt-3 w-64">
                  <Progress value={planUsagePercent} />
                      </div>
                    </div>
              <div>
                <Button asChild className="gap-2">
                  <Link href="add">
                    <Plus className="h-4 w-4" /> Add location
                  </Link>
                </Button>
                      </div>
                    </div>
          </CardHeader>
          <CardContent className="pt-0 px-3 overflow-visible">
            {/* Tabs + Toolbar */}
            <div className="flex items-center justify-between gap-3 py-3">
              <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
                <TabsList>
                  <TabsTrigger value="all" className="gap-2"><List className="h-3.5 w-3.5" /> All ({counts.all})</TabsTrigger>
                  <TabsTrigger value="active" className="gap-2"><CheckCircle2 className="h-3.5 w-3.5" /> Active ({counts.active})</TabsTrigger>
                  <TabsTrigger value="inactive" className="gap-2"><Circle className="h-3.5 w-3.5" /> Inactive ({counts.inactive})</TabsTrigger>
                  <TabsTrigger value="included" className="gap-2"><Store className="h-3.5 w-3.5" /> Included ({counts.included})</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search locations" className="pl-8 w-[220px]" />
                </div>
              </div>
                    </div>
            <Separator />

            <ScrollArea className="max-h-[60vh]">
            <Table>
              <TableHeader>
                <TableRow>
                    <TableHead className="w-[50%]">Location</TableHead>
                    <TableHead>In‑person selling</TableHead>
                    <TableHead className="w-[140px] text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3}>
                        <div className="py-10 text-center text-sm text-muted-foreground">No locations found</div>
                    </TableCell>
                  </TableRow>
                  )}
                  {filtered.map((loc) => (
                    <TableRow key={loc.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="mt-0.5 h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                            <MapPin className="h-4 w-4" />
            </div>
                          <div className="min-w-0">
                            <div className="font-medium flex items-center gap-2">
                              <Link href={`${loc.id}`} className="truncate hover:underline">{loc.name}</Link>
                              {loc.id === defaultLocationId && (
                                <Badge variant="secondary" className="uppercase tracking-wide">Default</Badge>
                              )}
                        </div>
                            <div className="text-[13px] font-mono leading-snug tracking-wide text-muted-foreground truncate">{formatAddress(loc)}</div>
                        </div>
                      </div>
                      </TableCell>
                      <TableCell>
                        {loc.inPersonSellingIncluded ? (
                          <Badge variant="outline" className="gap-1"><Store className="h-3.5 w-3.5" /> Included</Badge>
                        ) : (
                          <span className="text-sm text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Badge variant={loc.status === 'ACTIVE' ? 'default' : 'secondary'} className="gap-1">
                            {loc.status === 'ACTIVE' ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Circle className="h-3.5 w-3.5" />}
                            {loc.status === 'ACTIVE' ? 'Active' : 'Inactive'}
                      </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => makeDefault(loc.id)} className="gap-2"><Home className="h-4 w-4" /> Make default</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => setLocations(prev => prev.map(l => l.id === loc.id ? { ...l, status: l.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : l))} className="gap-2">
                                {loc.status === 'ACTIVE' ? <Circle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                                {loc.status === 'ACTIVE' ? 'Mark inactive' : 'Mark active'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
              </CardContent>
            </Card>

        {/* Default location */}
        <DefaultLocationCard />
      </div>
    </SettingsPage>
  );
} 


