'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { SettingsPage } from '../../components/settings-page';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Clock, Shield, FileText, Globe, CheckCircle2, Circle, Star, Store } from 'lucide-react';

type LocationDetail = {
  id: string;
  storeId: string;
  code: string;
  name: string;
  displayName: string;
  status: 'ACTIVE' | 'INACTIVE' | string;
  address: {
    city: string;
    state: string;
    street: string;
    country: string;
    postalCode: string;
    coordinates: { lat: number; lng: number };
  };
  geoLocation: {
    lat: number;
    lng: number;
    address: { city: string; line1: string; line2?: string; state: string; country: string; postalCode: string };
  };
  timezone: string;
  primaryContact: { name: string; email: string; phone: string };
  managementContacts: { name: string; email: string; phone: string }[];
  emergencyContact: { name: string; email: string; phone: string };
  businessHours: any;
  securityFeatures: string[] | null;
  complianceRequirements: string[] | null;
  description?: string;
  notes?: string;
  internalNotes?: string;
  metadata?: Record<string, any>;
  customAttributes?: Record<string, any>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

const sample: LocationDetail = {
  id: '954ac89a-b15b-45a1-90ad-f4ff06f7a98f',
  storeId: 'szh03h1anpo5rjvp1j9s3y1e',
  code: 'HSDS-5TH-01',
  name: 'Fifth Avenue Flagship',
  displayName: 'NYC Fifth Ave Flagship',
  status: 'ACTIVE',
  address: {
    city: 'New York', state: 'NY', street: '767 5th Ave', country: 'US', postalCode: '10153',
    coordinates: { lat: 40.7634, lng: -73.9721 },
  },
  geoLocation: {
    lat: 40.7634, lng: -73.9721,
    address: { city: 'New York', line1: '767 5th Ave', line2: 'Floor 1', state: 'NY', country: 'US', postalCode: '10153' }
  },
  timezone: 'America/New_York',
  primaryContact: { name: 'Alex Johnson', email: 'alex.johnson@example.com', phone: '+1-212-555-0199' },
  managementContacts: [ { name: 'Jamie Lee', email: 'jamie.lee@example.com', phone: '+1-212-555-0123' } ],
  emergencyContact: { name: 'Building Security', email: 'security@examplebuilding.com', phone: '+1-212-555-0111' },
  businessHours: {
    friday:{open:'10:00',close:'21:00',closed:false},monday:{open:'10:00',close:'20:00',closed:false},sunday:{open:'11:00',close:'19:00',closed:false},tuesday:{open:'10:00',close:'20:00',closed:false},holidays:[{date:'2025-12-25',name:'Christmas Day',closed:true}],saturday:{open:'10:00',close:'21:00',closed:false},thursday:{open:'10:00',close:'21:00',closed:false},timezone:'America/New_York',wednesday:{open:'10:00',close:'20:00',closed:false}
  },
  securityFeatures: ['CCTV','RFID Gates','24/7 Security'],
  complianceRequirements: ['ADA','FIRE_CODE_2024','PCI-DSS'],
  description: 'Flagship retail POS with full feature set',
  notes: 'VIP lounge on mezzanine',
  internalNotes: 'Schedule quarterly maintenance for printers',
  metadata: { zone: 'A1', managerShift: 'morning' },
  customAttributes: { theme: 'premium', floorPlanVersion: 'v3' },
  isActive: true,
  createdAt: '2025-08-11T13:24:41.090Z',
  updatedAt: '2025-08-11T13:24:41.090Z',
};

export default function PosLocationDetailPage() {
  const params = useParams();
  const [data, setData] = useState<LocationDetail | null>(null);

  useEffect(() => {
    // TODO: replace with API fetch using params.id
    setData(sample);
  }, [params]);

  if (!data) return null;

  const status = (data.status || (data.isActive ? 'ACTIVE' : 'INACTIVE')).toUpperCase();
  const statusVariant = status === 'ACTIVE' ? 'default' : 'secondary';

  const fullAddress = `${data.address.street}, ${data.address.city}, ${data.address.state} ${data.address.postalCode}, ${data.address.country}`;

  const days = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'] as const;

  return (
    <SettingsPage title={data.displayName} description={data.description || data.notes || ''}>
      <div className="space-y-6">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-start justify-between">
            <div>
              <CardTitle className="text-base flex items-center gap-2"><Store className="h-4 w-4" /> {data.name}</CardTitle>
              <CardDescription className="font-mono text-[13px]">{data.code}</CardDescription>
            </div>
            <Badge variant={statusVariant} className="gap-1">{status === 'ACTIVE' ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Circle className="h-3.5 w-3.5" />}{status}</Badge>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            <div className="text-sm">
              <div className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Address</div>
              <div className="font-mono">{fullAddress}</div>
            </div>
            <div className="text-sm">
              <div className="text-xs text-muted-foreground flex items-center gap-1"><Globe className="h-3.5 w-3.5" /> Timezone</div>
              <div>{data.timezone}</div>
            </div>
            <div className="text-sm">
              <div className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Coordinates</div>
              <div className="font-mono">{data.address.coordinates.lat}, {data.address.coordinates.lng}</div>
            </div>
          </CardContent>
          <Separator />
          <CardContent>
            <Tabs defaultValue="hours">
              <TabsList>
                <TabsTrigger value="hours" className="gap-2"><Clock className="h-3.5 w-3.5" /> Hours</TabsTrigger>
                <TabsTrigger value="security" className="gap-2"><Shield className="h-3.5 w-3.5" /> Security</TabsTrigger>
                <TabsTrigger value="notes" className="gap-2"><FileText className="h-3.5 w-3.5" /> Notes</TabsTrigger>
              </TabsList>
              <TabsContent value="hours">
                <div className="grid md:grid-cols-2 gap-2 text-sm">
                  {days.map((d) => {
                    const v = (data.businessHours as any)[d];
                    return (
                      <div key={d} className="flex items-center justify-between rounded-md border p-2">
                        <span className="capitalize">{d}</span>
                        <span className="text-muted-foreground">{v?.closed ? 'Closed' : `${v?.open} - ${v?.close}`}</span>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
              <TabsContent value="security">
                <div className="flex flex-wrap gap-1.5">
                  {(data.securityFeatures || []).map((s) => (
                    <Badge key={s} variant="outline">{s}</Badge>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {(data.complianceRequirements || []).map((c) => (
                    <Badge key={c} variant="secondary">{c}</Badge>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="notes">
                <div className="grid md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <div className="text-xs text-muted-foreground">Description</div>
                    <div>{data.description || '-'}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Notes</div>
                    <div>{data.notes || '-'}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Internal</div>
                    <div>{data.internalNotes || '-'}</div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </SettingsPage>
  );
}


