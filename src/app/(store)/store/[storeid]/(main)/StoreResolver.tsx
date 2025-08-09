'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { storeService } from '@/lib/axios/store_svc';
import { toast } from 'sonner';

/**
 * Reads the dynamic segment after /store/ which we now use as subdomain.
 * Verifies it by calling GET /stores/by-subdomain/{subdomain}.
 * If backend returns not found or error, redirects back to choose page.
 */
export default function StoreResolver() {
  const params = useParams();
  const router = useRouter();
  const storeid = params?.storeid as string | undefined;

  useEffect(() => {
    if (!storeid) return;
    let cancelled = false;
    (async () => {
      try {
        const { store: full } = await storeService.getStoreBySubdomain(storeid);
        try {
          localStorage.setItem('selectedStore', JSON.stringify({
            id: full.id,
            name: full.storeName,
            subdomain: full.subdomain,
            url: full.storeUrl,
            timezone: (full as any).timezone,
            currency: (full as any).currency,
            isActive: full.isActive,
            isPublished: full.isPublished,
            savedAt: new Date().toISOString(),
          }));
        } catch {}
        // If success, do nothing – route continues to render children.
      } catch (err: any) {
        if (cancelled) return;
        if (err?.response?.status === 404) {
          toast.error('Store not found');
        } else {
          toast.error('Failed to open store');
        }
        router.replace('/steps/choose');
      }
    })();
    return () => { cancelled = true; };
  }, [storeid, router]);

  return null;
}


