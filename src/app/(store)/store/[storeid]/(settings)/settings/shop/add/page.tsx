'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SettingsPage } from '../../components/settings-page';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { MapPin, User, Shield, Clock, Info, Phone, Mail, Building2, Save, ArrowLeft, ChevronRight, ChevronLeft, CheckCircle2, Circle, Globe, Landmark, KeySquare, CreditCard, Gift, Smartphone, Receipt, QrCode, Lock, Store as StoreIcon, ShoppingBag, Factory, Package, Truck, Tent, Star, Monitor } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Script from 'next/script';

const businessDaySchema = z.object({ open: z.string().optional(), close: z.string().optional(), closed: z.boolean() });

const schema = z.object({
  name: z.string().min(2),
  displayName: z.string().min(2),
  type: z.string().min(2),
  status: z.string().min(2),
  timezone: z.string().min(2),
  geoLocation: z.object({
    lat: z.coerce.number().optional(),
    lng: z.coerce.number().optional(),
    address: z.object({
      line1: z.string(),
      line2: z.string().optional(),
      city: z.string(),
      state: z.string(),
      postalCode: z.string(),
      country: z.string(),
    })
  }),
  primaryContact: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    role: z.string(),
  }),
  managementContacts: z.array(z.object({ name: z.string(), email: z.string().email(), phone: z.string(), role: z.string() })).default([]),
  emergencyContact: z.object({ name: z.string(), email: z.string().email(), phone: z.string(), role: z.string() }),
  businessHours: z.object({
    timezone: z.string(),
    monday: businessDaySchema,
    tuesday: businessDaySchema,
    wednesday: businessDaySchema,
    thursday: businessDaySchema,
    friday: businessDaySchema,
    saturday: businessDaySchema,
    sunday: businessDaySchema,
    holidays: z.array(z.object({ date: z.string(), name: z.string(), closed: z.boolean() })).default([])
  }),
  securityFeatures: z.array(z.string()).default([]),
  complianceRequirements: z.array(z.string()).default([]),
  supportedFeatures: z.array(z.string()).default([]),
  customerServices: z.array(z.string()).default([]),
  description: z.string().optional(),
  notes: z.string().optional(),
  internalNotes: z.string().optional(),
  metadata: z.record(z.any()).default({}),
  customAttributes: z.record(z.any()).default({})
});

type FormValues = z.infer<typeof schema>;

const defaultValues: FormValues = {
  name: 'Fifth Avenue Flagship',
  displayName: 'NYC Fifth Ave Flagship',
  type: 'RETAIL',
  status: 'ACTIVE',
  timezone: 'America/New_York',
  geoLocation: {
    address: { line1: '767 5th Ave', line2: 'Floor 1', city: 'New York', state: 'NY', postalCode: '10153', country: 'US' }
  },
  primaryContact: { name: 'Alex Johnson', email: 'alex.johnson@example.com', phone: '+1-212-555-0199', role: 'Store Manager' },
  managementContacts: [{ name: 'Jamie Lee', email: 'jamie.lee@example.com', phone: '+1-212-555-0123', role: 'Assistant Manager' }],
  emergencyContact: { name: 'Building Security', email: 'security@examplebuilding.com', phone: '+1-212-555-0111', role: 'Security' },
  businessHours: {
    timezone: 'America/New_York',
    monday: { open: '10:00', close: '20:00', closed: false },
    tuesday: { open: '10:00', close: '20:00', closed: false },
    wednesday: { open: '10:00', close: '20:00', closed: false },
    thursday: { open: '10:00', close: '21:00', closed: false },
    friday: { open: '10:00', close: '21:00', closed: false },
    saturday: { open: '10:00', close: '21:00', closed: false },
    sunday: { open: '11:00', close: '19:00', closed: false },
    holidays: [{ date: '2025-12-25', name: 'Christmas Day', closed: true }]
  },
  securityFeatures: ['CCTV','RFID Gates','24/7 Security'],
  complianceRequirements: ['ADA','FIRE_CODE_2024','PCI-DSS'],
  supportedFeatures: ['CASH_PAYMENT','CARD_PAYMENT','MOBILE_PAYMENT','EMAIL_RECEIPTS','BARCODE_SCANNING'],
  customerServices: ['PERSONAL_SHOPPING','GIFT_WRAPPING'],
  description: 'Flagship retail POS with full feature set',
  notes: 'VIP lounge on mezzanine',
  internalNotes: 'Schedule quarterly maintenance for printers',
  metadata: { zone: 'A1', managerShift: 'morning' },
  customAttributes: { theme: 'premium', floorPlanVersion: 'v3' }
};

export default function AddPosLocationPage() {
  const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues });
  const addressSearchRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (values: FormValues) => {
    // TODO: integrate with API. For now, log.
    console.log('Create POS location payload', values);
  };

  return (
    <SettingsPage title="Create POS Location" description="Add a new in‑person selling location with full operational details.">
      {/* Google Places (optional) */}
      <Script id="gmaps" src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}&libraries=places`} strategy="afterInteractive" />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {(() => {
          const steps = [
            { key: 'overview', title: 'Overview', Icon: Building2 },
            { key: 'contacts', title: 'Contacts', Icon: User },
            { key: 'hours', title: 'Hours', Icon: Clock },
            { key: 'security', title: 'Security', Icon: Shield },
            { key: 'notes', title: 'Notes', Icon: Info },
          ] as const;
          type StepKey = typeof steps[number]['key'];
          const [current, setCurrent] = (function useStep() {
            // simple local state hook within IIFE to avoid re-declaring at top
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [idx, setIdx] = useState(0);
            return [idx, setIdx] as const;
          })();

          const goNext = () => setCurrent((i: number) => Math.min(i + 1, steps.length - 1));
          const goPrev = () => setCurrent((i: number) => Math.max(i - 1, 0));

          return (
            <div className="w-full">
              {/* Stepper header */}
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  {steps.map((s, i) => {
                    const active = i === current;
                    const completed = i < current;
                    const Icon = s.Icon;
                    return (
                      <div key={s.key} className={cn('flex-1 flex items-center', i !== steps.length - 1 && 'mr-2')}> 
                        <button type="button" onClick={() => setCurrent(i)} className={cn('flex items-center gap-2 rounded-xl px-3 py-2 transition-colors', active ? 'bg-neutral-200 text-neutral-900' : completed ? 'bg-neutral-900 text-white' : 'bg-muted text-muted-foreground')}>
                          <Icon className={cn('h-4 w-4', completed && 'text-white')} />
                          <span className="text-sm font-medium">{s.title}</span>
                          {completed ? <CheckCircle2 className="h-4 w-4 text-white" /> : active ? <Circle className="h-4 w-4 text-neutral-900" /> : null}
                        </button>
                        {i !== steps.length - 1 && <div className="flex-1 h-px bg-border ml-2" />}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-3">
                  <Progress value={((current + 1) / steps.length) * 100} />
                </div>
              </div>

              {current === 0 && (
                <>
          
            <Card className="rounded-2xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Overview</CardTitle>
                <CardDescription>Identity and location details</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form {...form}>
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Landmark className="h-4 w-4" /> Name</FormLabel>
                      <div className="relative">
                        <Landmark className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <FormControl><Input className="pl-9" placeholder="Fifth Avenue Flagship" {...field} /></FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="displayName" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Landmark className="h-4 w-4" /> Display name</FormLabel>
                      <div className="relative">
                        <Landmark className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <FormControl><Input className="pl-9" placeholder="NYC Fifth Ave Flagship" {...field} /></FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="type" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2"><StoreIcon className="h-4 w-4" /> Type</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="RETAIL"><div className="flex items-center gap-2"><ShoppingBag className="h-3.5 w-3.5" /> Retail</div></SelectItem>
                            <SelectItem value="WAREHOUSE"><div className="flex items-center gap-2"><Factory className="h-3.5 w-3.5" /> Warehouse</div></SelectItem>
                            <SelectItem value="KIOSK"><div className="flex items-center gap-2"><Monitor className="h-3.5 w-3.5" /> Kiosk</div></SelectItem>
                            <SelectItem value="OUTLET"><div className="flex items-center gap-2"><StoreIcon className="h-3.5 w-3.5" /> Outlet</div></SelectItem>
                            <SelectItem value="FLAGSHIP"><div className="flex items-center gap-2"><Star className="h-3.5 w-3.5" /> Flagship</div></SelectItem>
                            <SelectItem value="SHOWROOM"><div className="flex items-center gap-2"><Building2 className="h-3.5 w-3.5" /> Showroom</div></SelectItem>
                            <SelectItem value="POPUP"><div className="flex items-center gap-2"><Tent className="h-3.5 w-3.5" /> Pop‑up</div></SelectItem>
                            <SelectItem value="PICKUP_POINT"><div className="flex items-center gap-2"><Truck className="h-3.5 w-3.5" /> Pickup point</div></SelectItem>
                            <SelectItem value="DISTRIBUTION_CENTER"><div className="flex items-center gap-2"><Package className="h-3.5 w-3.5" /> Distribution center</div></SelectItem>
                            <SelectItem value="DARK_STORE"><div className="flex items-center gap-2"><Factory className="h-3.5 w-3.5" /> Dark store</div></SelectItem>
                            <SelectItem value="SERVICE_CENTER"><div className="flex items-center gap-2"><Shield className="h-3.5 w-3.5" /> Service center</div></SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="status" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Status</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ACTIVE"><div className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Active</div></SelectItem>
                            <SelectItem value="INACTIVE"><div className="flex items-center gap-2"><Circle className="h-3.5 w-3.5 text-muted-foreground" /> Inactive</div></SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <Separator className="my-2 md:col-span-2" />
                  <div className="grid md:grid-cols-2 gap-4 md:col-span-2">
                    <FormField control={form.control} name="timezone" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2"><Globe className="h-4 w-4" /> Timezone</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger><SelectValue placeholder="Select timezone" /></SelectTrigger>
                          <SelectContent>
                            {['America/New_York','America/Los_Angeles','Europe/London','Africa/Nairobi','Asia/Dubai','Asia/Kolkata','Asia/Tokyo'].map(tz => (
                              <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <div />
                    <FormField control={form.control} name="geoLocation.address.line1" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Address search</FormLabel>
                        <div className="relative">
                          <MapPin className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <FormControl><Input className="pl-9" placeholder="Search address" {...field} ref={(el) => { addressSearchRef.current = el; }} /></FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="geoLocation.address.line2" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address line 2</FormLabel>
                        <FormControl><Input placeholder="Floor 1" {...field} /></FormControl>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="geoLocation.address.city" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2"><Building2 className="h-4 w-4" /> City</FormLabel>
                        <FormControl><Input placeholder="New York" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="geoLocation.address.state" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2"><Building2 className="h-4 w-4" /> State</FormLabel>
                        <FormControl><Input placeholder="NY" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="geoLocation.address.postalCode" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2"><KeySquare className="h-4 w-4" /> Postal code</FormLabel>
                        <FormControl><Input placeholder="10153" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="geoLocation.address.country" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2"><Globe className="h-4 w-4" /> Country</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="US">United States</SelectItem>
                            <SelectItem value="GB">United Kingdom</SelectItem>
                            <SelectItem value="ET">Ethiopia</SelectItem>
                            <SelectItem value="DE">Germany</SelectItem>
                            <SelectItem value="AE">United Arab Emirates</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    {/* Coordinates are auto-populated from Google Places and hidden from the UI for simplicity */}
                  </div>
                  {/* Attach Google Places Autocomplete */}
                  <AutoCompleteBinder inputRef={addressSearchRef} onPlace={(p) => {
                    try {
                      const comp = (p.address_components || []) as Array<any>;
                      const get = (type: string) => comp.find(c => c.types?.includes(type))?.long_name || '';
                      const city = get('locality') || get('postal_town') || '';
                      const state = get('administrative_area_level_1') || '';
                      const country = get('country') || '';
                      const postalCode = get('postal_code') || '';
                      const line1 = (p.name || '') || (get('route') ? `${get('street_number') || ''} ${get('route')}`.trim() : '');
                      form.setValue('geoLocation.address', { ...form.getValues('geoLocation.address'), line1, city, state, country, postalCode });
                      const lat = p.geometry?.location?.lat?.();
                      const lng = p.geometry?.location?.lng?.();
                      if (typeof lat === 'number' && typeof lng === 'number') {
                        form.setValue('geoLocation.lat', lat);
                        form.setValue('geoLocation.lng', lng);
                      }
                    } catch {}
                  }} />
                </Form>
              </CardContent>
            </Card>
                </>
              )}

              {current === 1 && (
                <>
            <Card className="rounded-2xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2"><User className="h-4 w-4" /> Contacts</CardTitle>
                <CardDescription>Primary, management, and emergency contacts</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <Form {...form}>
                  <FormField control={form.control} name="primaryContact.name" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><User className="h-4 w-4" /> Primary contact name</FormLabel>
                      <div className="relative">
                        <User className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <FormControl><Input className="pl-9" {...field} /></FormControl>
                      </div>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="primaryContact.role" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Shield className="h-4 w-4" /> Role</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="primaryContact.email" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Mail className="h-4 w-4" /> Email</FormLabel>
                      <div className="relative">
                        <Mail className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <FormControl><Input type="email" className="pl-9" {...field} /></FormControl>
                      </div>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="primaryContact.phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Phone className="h-4 w-4" /> Phone</FormLabel>
                      <div className="relative">
                        <Phone className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <FormControl><Input className="pl-9" {...field} /></FormControl>
                      </div>
                    </FormItem>
                  )} />
                  <Separator className="md:col-span-2" />
                  <FormField control={form.control} name="managementContacts.0.name" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><User className="h-4 w-4" /> Manager name</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="managementContacts.0.role" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Shield className="h-4 w-4" /> Manager role</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="managementContacts.0.email" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Mail className="h-4 w-4" /> Manager email</FormLabel>
                      <FormControl><Input type="email" {...field} /></FormControl>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="managementContacts.0.phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Phone className="h-4 w-4" /> Manager phone</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                    </FormItem>
                  )} />
                  <Separator className="md:col-span-2" />
                  <FormField control={form.control} name="emergencyContact.name" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Shield className="h-4 w-4" /> Emergency contact name</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="emergencyContact.role" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Shield className="h-4 w-4" /> Emergency contact role</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="emergencyContact.email" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Mail className="h-4 w-4" /> Emergency contact email</FormLabel>
                      <FormControl><Input type="email" {...field} /></FormControl>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="emergencyContact.phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Phone className="h-4 w-4" /> Emergency contact phone</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                    </FormItem>
                  )} />
                </Form>
              </CardContent>
            </Card>
                </>
              )}

              {current === 2 && (
                <>
            <Card className="rounded-2xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2"><Clock className="h-4 w-4" /> Business hours</CardTitle>
                <CardDescription>Weekly schedule and holidays</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <Globe className="h-4 w-4" /> Timezone
                    <Badge variant="secondary">{form.getValues('businessHours.timezone')}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button type="button" variant="outline" size="sm" onClick={() => {
                      const mon = form.getValues('businessHours.monday');
                      ['tuesday','wednesday','thursday','friday'].forEach((d) => {
                        form.setValue(`businessHours.${d}.open` as any, mon.open || '');
                        form.setValue(`businessHours.${d}.close` as any, mon.close || '');
                        form.setValue(`businessHours.${d}.closed` as any, !!mon.closed);
                      });
                    }}>Copy Mon → Fri</Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => {
                      const sat = form.getValues('businessHours.saturday');
                      const sun = form.getValues('businessHours.sunday');
                      form.setValue('businessHours.sunday.open', sun.open || sat.open || '');
                      form.setValue('businessHours.sunday.close', sun.close || sat.close || '');
                      form.setValue('businessHours.sunday.closed', !!(sun.closed ?? sat.closed));
                    }}>Weekend sync</Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => {
                      (['monday','tuesday','wednesday','thursday','friday','saturday','sunday'] as const).forEach((d) => {
                        form.setValue(`businessHours.${d}.open` as any, '');
                        form.setValue(`businessHours.${d}.close` as any, '');
                        form.setValue(`businessHours.${d}.closed` as any, false);
                      });
                    }}>Clear</Button>
                  </div>
                </div>

                <Form {...form}>
                  <div className="grid md:grid-cols-2 gap-3">
                    {(['monday','tuesday','wednesday','thursday','friday','saturday','sunday'] as const).map((day) => (
                      <div key={day} className="rounded-lg border p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="capitalize font-medium inline-flex items-center gap-2"><Clock className="h-4 w-4" /> {day}</div>
                          <FormField control={form.control} name={`businessHours.${day}.closed`} render={({ field }) => (
                            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                              <span>Closed</span>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </div>
                          )} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <FormField control={form.control} name={`businessHours.${day}.open`} render={({ field }) => {
                            const isClosed = form.watch(`businessHours.${day}.closed` as const) as boolean;
                            return (
                              <FormItem>
                                <FormLabel className="text-xs">Open</FormLabel>
                                <FormControl><Input type="time" disabled={!!isClosed} placeholder="10:00" {...field} /></FormControl>
                              </FormItem>
                            );
                          }} />
                          <FormField control={form.control} name={`businessHours.${day}.close`} render={({ field }) => {
                            const isClosed = form.watch(`businessHours.${day}.closed` as const) as boolean;
                            return (
                              <FormItem>
                                <FormLabel className="text-xs">Close</FormLabel>
                                <FormControl><Input type="time" disabled={!!isClosed} placeholder="20:00" {...field} /></FormControl>
                              </FormItem>
                            );
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </Form>
              </CardContent>
            </Card>
                </>
              )}

              {current === 3 && (
                <>
            <Card className="rounded-2xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Security & compliance</CardTitle>
                <CardDescription>Physical and policy safeguards</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {(() => {
                  const supported = form.watch('supportedFeatures') as string[];
                  const security = form.watch('securityFeatures') as string[];
                  const compliance = form.watch('complianceRequirements') as string[];
                  const toggle = (field: 'supportedFeatures' | 'securityFeatures' | 'complianceRequirements', value: string) => {
                    const current = new Set(form.getValues(field));
                    current.has(value) ? current.delete(value) : current.add(value);
                    form.setValue(field, Array.from(current));
                  };
                  const Chip = ({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) => (
                    <button type="button" onClick={onClick} className={cn('inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-sm transition-colors', active ? 'bg-primary/10 text-primary border-primary/30' : 'bg-muted/40 text-foreground border-transparent hover:bg-muted')}>{children}</button>
                  );
                  return (
                    <>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <div className="mb-2 text-sm font-medium flex items-center gap-2"><CreditCard className="h-4 w-4" /> Supported features</div>
                          <div className="flex flex-wrap gap-2 rounded-xl bg-muted/20 p-2">
                            <Chip active={supported.includes('CASH_PAYMENT')} onClick={() => toggle('supportedFeatures','CASH_PAYMENT')}><CreditCard className="h-3.5 w-3.5" /> Cash payment</Chip>
                            <Chip active={supported.includes('CARD_PAYMENT')} onClick={() => toggle('supportedFeatures','CARD_PAYMENT')}><CreditCard className="h-3.5 w-3.5" /> Card payment</Chip>
                            <Chip active={supported.includes('MOBILE_PAYMENT')} onClick={() => toggle('supportedFeatures','MOBILE_PAYMENT')}><Smartphone className="h-3.5 w-3.5" /> Mobile payment</Chip>
                            <Chip active={supported.includes('EMAIL_RECEIPTS')} onClick={() => toggle('supportedFeatures','EMAIL_RECEIPTS')}><Receipt className="h-3.5 w-3.5" /> Email receipts</Chip>
                            <Chip active={supported.includes('BARCODE_SCANNING')} onClick={() => toggle('supportedFeatures','BARCODE_SCANNING')}><QrCode className="h-3.5 w-3.5" /> Barcode scanning</Chip>
                            <Chip active={supported.includes('GIFT_CARDS')} onClick={() => toggle('supportedFeatures','GIFT_CARDS')}><Gift className="h-3.5 w-3.5" /> Gift cards</Chip>
                            <Chip active={supported.includes('RETURNS_EXCHANGES')} onClick={() => toggle('supportedFeatures','RETURNS_EXCHANGES')}><Receipt className="h-3.5 w-3.5" /> Returns & exchanges</Chip>
                            <Chip active={supported.includes('INVENTORY_CHECK')} onClick={() => toggle('supportedFeatures','INVENTORY_CHECK')}><QrCode className="h-3.5 w-3.5" /> Inventory check</Chip>
                            <Chip active={supported.includes('LOYALTY_PROGRAM')} onClick={() => toggle('supportedFeatures','LOYALTY_PROGRAM')}><Gift className="h-3.5 w-3.5" /> Loyalty program</Chip>
                            <Chip active={supported.includes('PROMOTIONS')} onClick={() => toggle('supportedFeatures','PROMOTIONS')}><Gift className="h-3.5 w-3.5" /> Promotions</Chip>
                            <Chip active={supported.includes('RECEIPT_PRINTING')} onClick={() => toggle('supportedFeatures','RECEIPT_PRINTING')}><Receipt className="h-3.5 w-3.5" /> Receipt printing</Chip>
                            <Chip active={supported.includes('PRODUCT_LOOKUP')} onClick={() => toggle('supportedFeatures','PRODUCT_LOOKUP')}><QrCode className="h-3.5 w-3.5" /> Product lookup</Chip>
                            <Chip active={supported.includes('PRICE_CHECKING')} onClick={() => toggle('supportedFeatures','PRICE_CHECKING')}><QrCode className="h-3.5 w-3.5" /> Price checking</Chip>
                          </div>
                        </div>
                        <div>
                          <div className="mb-2 text-sm font-medium flex items-center gap-2"><Lock className="h-4 w-4" /> Security features</div>
                          <div className="flex flex-wrap gap-2 rounded-xl bg-muted/20 p-2">
                            <Chip active={security.includes('CCTV')} onClick={() => toggle('securityFeatures','CCTV')}>CCTV</Chip>
                            <Chip active={security.includes('RFID Gates')} onClick={() => toggle('securityFeatures','RFID Gates')}>RFID Gates</Chip>
                            <Chip active={security.includes('24/7 Security')} onClick={() => toggle('securityFeatures','24/7 Security')}>24/7 Security</Chip>
                            <Chip active={security.includes('Access Control')} onClick={() => toggle('securityFeatures','Access Control')}><KeySquare className="h-3.5 w-3.5" /> Access control</Chip>
                            <Chip active={security.includes('Alarm System')} onClick={() => toggle('securityFeatures','Alarm System')}><Lock className="h-3.5 w-3.5" /> Alarm system</Chip>
                            <Chip active={security.includes('Panic Button')} onClick={() => toggle('securityFeatures','Panic Button')}><Shield className="h-3.5 w-3.5" /> Panic button</Chip>
                            <Chip active={security.includes('Two-Factor Auth')} onClick={() => toggle('securityFeatures','Two-Factor Auth')}><Shield className="h-3.5 w-3.5" /> 2FA</Chip>
                            <Chip active={security.includes('Staff PIN Login')} onClick={() => toggle('securityFeatures','Staff PIN Login')}><KeySquare className="h-3.5 w-3.5" /> Staff PIN login</Chip>
                            <Chip active={security.includes('Secure Cash Safe')} onClick={() => toggle('securityFeatures','Secure Cash Safe')}><Lock className="h-3.5 w-3.5" /> Secure cash safe</Chip>
                            <Chip active={security.includes('Visitor Logs')} onClick={() => toggle('securityFeatures','Visitor Logs')}><Shield className="h-3.5 w-3.5" /> Visitor logs</Chip>
                            <Chip active={security.includes('Security Patrols')} onClick={() => toggle('securityFeatures','Security Patrols')}><Shield className="h-3.5 w-3.5" /> Security patrols</Chip>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="mb-2 text-sm font-medium flex items-center gap-2"><Shield className="h-4 w-4" /> Compliance requirements</div>
                        <div className="flex flex-wrap gap-2 rounded-xl bg-muted/20 p-2">
                          <Chip active={compliance.includes('ADA')} onClick={() => toggle('complianceRequirements','ADA')}>ADA</Chip>
                          <Chip active={compliance.includes('FIRE_CODE_2024')} onClick={() => toggle('complianceRequirements','FIRE_CODE_2024')}>Fire Code 2024</Chip>
                          <Chip active={compliance.includes('PCI-DSS')} onClick={() => toggle('complianceRequirements','PCI-DSS')}>PCI-DSS</Chip>
                          <Chip active={compliance.includes('EMV')} onClick={() => toggle('complianceRequirements','EMV')}>EMV</Chip>
                          <Chip active={compliance.includes('PCI-P2PE')} onClick={() => toggle('complianceRequirements','PCI-P2PE')}>PCI-P2PE</Chip>
                          <Chip active={compliance.includes('GDPR')} onClick={() => toggle('complianceRequirements','GDPR')}>GDPR</Chip>
                          <Chip active={compliance.includes('CCPA')} onClick={() => toggle('complianceRequirements','CCPA')}>CCPA</Chip>
                          <Chip active={compliance.includes('OSHA')} onClick={() => toggle('complianceRequirements','OSHA')}>OSHA</Chip>
                          <Chip active={compliance.includes('HEALTH_CODE')} onClick={() => toggle('complianceRequirements','HEALTH_CODE')}>Health Code</Chip>
                          <Chip active={compliance.includes('FIRE_INSPECTION')} onClick={() => toggle('complianceRequirements','FIRE_INSPECTION')}>Fire Inspection</Chip>
                          <Chip active={compliance.includes('SOC2')} onClick={() => toggle('complianceRequirements','SOC2')}>SOC 2</Chip>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </CardContent>
            </Card>
                </>
              )}

              {current === 4 && (
                <>
            <Card className="rounded-2xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Notes</CardTitle>
                <CardDescription>Public and internal notes</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <Form {...form}>
                  <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl><Textarea rows={4} {...field} /></FormControl>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="notes" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl><Textarea rows={4} {...field} /></FormControl>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="internalNotes" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Internal notes</FormLabel>
                      <FormControl><Textarea rows={4} {...field} /></FormControl>
                    </FormItem>
                  )} />
                </Form>
              </CardContent>
            </Card>
                </>
              )}

              {/* Footer navigation */}
              <div className="mt-4 flex items-center justify-between">
                <Button asChild variant="outline">
                  <Link href="../shop">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to locations
                  </Link>
                </Button>
                <div className="flex items-center gap-2">
                  {current > 0 && (
                    <Button type="button" variant="outline" onClick={goPrev} className="gap-2">
                      <ChevronLeft className="h-4 w-4" /> Previous
                    </Button>
                  )}
                  {current < 4 ? (
                    <Button type="button" onClick={goNext} className="gap-2">
                      Next <ChevronRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="submit" className="gap-2">
                      <Save className="h-4 w-4" /> Save location
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })()}
      </form>
    </SettingsPage>
  );
}

// Google Places binder for address search input
function AutoCompleteBinder({ inputRef, onPlace }: { inputRef: React.MutableRefObject<HTMLInputElement | null>; onPlace: (place: any) => void }) {
  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    const g = (window as any).google;
    if (!g?.maps?.places) return;
    const ac = new g.maps.places.Autocomplete(input, { fields: ['address_components','geometry','name'] });
    const listener = ac.addListener('place_changed', () => {
      const place = ac.getPlace();
      onPlace(place);
    });
    return () => {
      if (listener?.remove) listener.remove();
    };
  }, [inputRef, onPlace]);
  return null;
}

// Multi-select with popover + command + chips
function FeatureMultiSelect({ label, icon, options, value, onChange }: { label: string; icon?: React.ReactNode; options: { value: string; label: string; icon?: React.ReactNode }[]; value: string[]; onChange: (vals: string[]) => void }) {
  const [open, setOpen] = useState(false);
  const toggle = (v: string) => {
    const set = new Set(value);
    set.has(v) ? set.delete(v) : set.add(v);
    onChange(Array.from(set));
  };
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2">{icon} {label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button type="button" variant="outline" className="w-full justify-start">
            {value?.length ? (
              <div className="flex flex-wrap gap-1">
                {value.map(v => {
                  const opt = options.find(o => o.value === v);
                  return <Badge key={v} variant="secondary" className="gap-1">{opt?.icon}{opt?.label || v}</Badge>;
                })}
              </div>
            ) : (
              <span className="text-muted-foreground">Select…</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[320px]" align="start">
          <Command>
            <CommandInput placeholder="Search…" />
            <CommandList>
              <CommandEmpty>Nothing found.</CommandEmpty>
              <CommandGroup>
                {options.map(o => (
                  <CommandItem key={o.value} onSelect={() => toggle(o.value)}>
                    <div className="mr-2 flex items-center justify-center w-4">{o.icon}</div>
                    <div className="flex-1">{o.label}</div>
                    <Checkbox checked={value.includes(o.value)} className="ml-auto" />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}


