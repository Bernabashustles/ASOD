'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Store,
  Globe,
  Users,
  Activity,
  CheckCircle2,
  CircleDashed,
  Globe as Globe2,
  Clock,
  RefreshCw,
  Upload,
  Check,
  ExternalLink,
  Pencil,
  X,
  Save,
  Tag,
  Building2,
  Layers,
  AlignLeft,
  Info,
  Copy,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { storeService } from '@/lib/axios/store_svc';
import { toast } from 'sonner';

type StoreDto = {
  id: string;
  storeName?: string;
  store_name?: string;
  subdomain?: string;
  storeUrl?: string;
  store_url?: string;
  timezone?: string;
  currency?: string;
  organization_id?: string;
  organizationId?: string;
  attributes?: {
    niches?: string[];
    category?: string;
    platforms?: string[];
    description?: string;
    businessSize?: string;
    businessType?: string;
  };
  isActive?: boolean;
  is_active?: boolean;
  isPublished?: boolean;
  is_published?: boolean;
};

export default function GeneralSettingsPage() {

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [store, setStore] = useState<StoreDto | null>(null);

  const name = store?.storeName ?? store?.store_name ?? '';
  const subdomain = store?.subdomain ?? '';
  const url = useMemo(() => {
    const raw = store?.storeUrl ?? store?.store_url ?? (subdomain ? `${subdomain}.myaxova.store` : '');
    if (!raw) return '';
    return raw.startsWith('http') ? raw : `https://${raw}`;
  }, [store, subdomain]);

  const isActive = (store?.isActive ?? store?.is_active) === true;
  const isPublished = (store?.isPublished ?? store?.is_published) === true;
  const isOrgConnected = Boolean(store?.organization_id || (store as any)?.organizationId);

  const [editName, setEditName] = useState('');
  const [editTimezone, setEditTimezone] = useState('');
  const [isEditingOverview, setIsEditingOverview] = useState(false);
  const [editCurrency, setEditCurrency] = useState('');
  const [copiedUrl, setCopiedUrl] = useState(false);

  const allTimezones = useMemo(() => {
    // Modern runtime: supportedValuesOf available
    // Fallback to a concise list if not available
    // This avoids shipping an enormous static array
    // while providing a comprehensive list where supported
    // (Chrome/Edge/Firefox recent versions)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const intlAny: any = Intl as any;
    if (typeof intlAny.supportedValuesOf === 'function') {
      try {
        return intlAny.supportedValuesOf('timeZone') as string[];
      } catch {}
    }
    return [
      'Africa/Nairobi','Europe/London','America/New_York','Asia/Dubai','Asia/Kolkata','Asia/Tokyo','Europe/Berlin','America/Los_Angeles','Australia/Sydney'
    ];
  }, []);

  const allCurrencies = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const intlAny: any = Intl as any;
    if (typeof intlAny.supportedValuesOf === 'function') {
      try {
        return intlAny.supportedValuesOf('currency') as string[];
      } catch {}
    }
    return ['USD','EUR','GBP','JPY','KES','AED','INR','AUD','CAD'];
  }, []);

  const currencyLabel = (code: string) => {
    try {
      const dn = new Intl.DisplayNames(undefined, { type: 'currency' });
      return `${code} — ${dn.of(code)}`;
    } catch {
      return code;
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const { data } = await storeService.getCurrentStore();
        const payload: StoreDto = data?.data?.store ?? data?.data ?? data;
        if (!mounted) return;
        setStore(payload);
        setEditName(payload?.storeName ?? payload?.store_name ?? '');
        setEditTimezone(payload?.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone);
        setEditCurrency(payload?.currency || '');
      } catch (e) {
        toast.error('Failed to load store settings');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      const payload: Record<string, any> = {};
      if (editName && editName !== name) payload.storeName = editName;
      if (editTimezone && editTimezone !== store?.timezone) payload.timezone = editTimezone;
      if (editCurrency && editCurrency !== (store?.currency || '')) payload.currency = editCurrency;
      if (Object.keys(payload).length === 0) {
        toast.info('Nothing to update');
        return;
      }
      const { data } = await storeService.updateCurrentStore(payload);
      const updated = (data?.data?.store ?? data?.data ?? data) as Partial<StoreDto>;
      setStore(prev => (prev ? { ...prev, ...updated } : prev));
      toast.success('Store updated successfully');
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Failed to update store');
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    try {
      setPublishing(true);
      const { data } = await storeService.publishCurrentStore();
      const isPub = data?.data?.isPublished ?? true;
      setStore(prev => (prev ? { ...prev, isPublished: isPub, is_published: isPub } : prev));
      toast.success('Store published successfully');
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Failed to publish store');
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="p-6 md:p-8 pb-0 max-w-[960px]">
      <div className="mb-6 md:mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
          <Store className="w-5 h-5" /> General
        </h1>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            {isActive ? <CheckCircle2 className="w-4 h-4" /> : <CircleDashed className="w-4 h-4" />}
            {isActive ? 'Active' : 'Inactive'}
          </Badge>
          <Badge className="flex items-center gap-1" variant={isPublished ? 'default' : 'secondary'}>
            <Globe2 className="w-4 h-4" />
            {isPublished ? 'Published' : 'Unpublished'}
          </Badge>
        </div>
      </div>

      {/* Store Overview */}
      <Card className="mb-6 rounded-xl shadow-sm border">
        <CardHeader className="pb-3 flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-base flex items-center gap-2"><Store className="w-4 h-4" /> Store overview</CardTitle>
            <CardDescription>Core details about your store</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {!isEditingOverview ? (
              <Button variant="outline" size="sm" onClick={() => setIsEditingOverview(true)} className="gap-2">
                <Pencil className="w-4 h-4" /> Edit
              </Button>
            ) : (
              <>
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={saving || loading}
                  className="gap-2"
                >
                  {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsEditingOverview(false);
                    setEditName(name);
                    setEditTimezone(store?.timezone || '');
                  }}
                  className="gap-2"
                >
                  <X className="w-4 h-4" /> Cancel
                </Button>
              </>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label className="text-sm">Store name</Label>
            {loading ? (
              <Skeleton className="h-9 w-full" />
            ) : !isEditingOverview ? (
              <div className="h-9 px-3 flex items-center rounded-md bg-gray-50 border text-sm">{name || '-'}</div>
            ) : (
              <Input value={editName} onChange={e => setEditName(e.target.value)} placeholder="Store name" />
            )}
          </div>

          {/* Subdomain + URL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm">Subdomain</Label>
              {loading ? (
                <Skeleton className="h-9 w-full" />
              ) : (
                <div className="h-9 px-3 flex items-center rounded-md bg-gray-50 border font-mono text-sm">{subdomain || '-'}</div>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-sm flex items-center gap-1"><Globe className="w-4 h-4" /> Store URL</Label>
              {loading ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <div className="h-10 w-full flex items-center rounded-full border bg-gray-50/80 px-3 dark:bg-neutral-900/40">
                  <Globe className="w-4 h-4 text-muted-foreground mr-2" />
                  <span className="truncate text-[13px] font-medium tracking-tight text-gray-900 dark:text-gray-100">
                    {url ? url.replace(/^https?:\/\//, '') : '-'}
                  </span>
                  <div className="ml-auto flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={async () => {
                        try {
                          if (!url) return;
                          await navigator.clipboard.writeText(url);
                          setCopiedUrl(true);
                          setTimeout(() => setCopiedUrl(false), 1200);
                        } catch {}
                      }}
                      disabled={!url}
                      title={copiedUrl ? 'Copied' : 'Copy URL'}
                      aria-label={copiedUrl ? 'Copied' : 'Copy URL'}
                    >
                      {copiedUrl ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      asChild
                      disabled={!url}
                      title="Open in new tab"
                      aria-label="Open in new tab"
                    >
                      <a href={url || '#'} target="_blank" rel="noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Timezone & Currency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm flex items-center gap-1"><Clock className="w-4 h-4" /> Timezone</Label>
              {loading ? (
                <Skeleton className="h-9 w-full" />
              ) : !isEditingOverview ? (
                <div className="h-9 px-3 flex items-center rounded-md bg-gray-50 border text-sm">{store?.timezone || editTimezone || '-'}</div>
              ) : (
                <Select value={editTimezone} onValueChange={setEditTimezone}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {allTimezones.map(tz => (
                      <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-sm flex items-center gap-1"><Globe className="w-4 h-4" /> Currency</Label>
              {loading ? (
                <Skeleton className="h-9 w-full" />
              ) : !isEditingOverview ? (
                <div className="h-9 px-3 flex items-center rounded-md bg-gray-50 border text-sm">{store?.currency || editCurrency || '-'}</div>
              ) : (
                <Select value={editCurrency} onValueChange={setEditCurrency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {allCurrencies.map(code => (
                      <SelectItem key={code} value={code}>{currencyLabel(code)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          {!isPublished && (
            <div className="flex items-center gap-2 pt-2">
              <Button variant="outline" onClick={handlePublish} disabled={publishing || loading} className="gap-2">
                {publishing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                Publish store
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* About & Attributes */}
      <Card className="mb-6 rounded-xl shadow-sm border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2"><Info className="w-4 h-4" /> About</CardTitle>
          <CardDescription>Key attributes of your store</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-10" />)
          ) : (
            <>
              <div className="space-y-1">
                <div className="text-xs text-gray-500 flex items-center gap-1"><Tag className="w-3.5 h-3.5" /> Category</div>
                <div className="text-sm font-medium">{store?.attributes?.category || '-'}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-gray-500 flex items-center gap-1"><Building2 className="w-3.5 h-3.5" /> Business type</div>
                <div className="text-sm font-medium">{store?.attributes?.businessType || '-'}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-gray-500 flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Business size</div>
                <div className="text-sm font-medium">{store?.attributes?.businessSize || '-'}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-gray-500 flex items-center gap-1"><Layers className="w-3.5 h-3.5" /> Platforms</div>
                <div className="text-sm font-medium">{(store?.attributes?.platforms || []).join(', ') || '-'}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-gray-500 flex items-center gap-1"><Tag className="w-3.5 h-3.5" /> Niches</div>
                <div className="text-sm font-medium">{(store?.attributes?.niches || []).join(', ') || '-'}</div>
              </div>
              <div className="space-y-1 md:col-span-3">
                <div className="text-xs text-gray-500 flex items-center gap-1"><AlignLeft className="w-3.5 h-3.5" /> Description</div>
                <div className="text-sm font-medium">{store?.attributes?.description || '-'}</div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Team & Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-0">
        <Card className="rounded-xl shadow-sm border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Organization</CardTitle>
            <CardDescription>People and roles associated with this store</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            {isOrgConnected ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <div className="text-sm text-emerald-700">Organization connected</div>
              </>
            ) : (
              <>
                <Users className="w-4 h-4 text-gray-500" />
                <div className="text-sm text-gray-600">Connect organization settings in a future step.</div>
              </>
            )}
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Activity</CardTitle>
            <CardDescription>Recent changes for visibility</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <Activity className="w-4 h-4 text-gray-500" />
            <div className="text-sm text-gray-600">No recent changes.</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


