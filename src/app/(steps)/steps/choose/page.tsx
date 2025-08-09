"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  Store as StoreIcon, 
  Plus,
  Search,
  ArrowRight,
  Settings,
  LogOut,
  Crown,
  TrendingUp,
  Users,
  Globe,
  Sparkles,
  CheckCircle2,
  PauseCircle,
} from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { storeService, type StoreSummary } from "@/lib/axios/store_svc";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";

export default function ChooseStorePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const PAGE_SIZE = 8;
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<"all" | "active" | "inactive">("all");
  const [stores, setStores] = useState<Array<{
    id: string;
    name: string;
    url: string;
    isActive: boolean;
    createdAt: string;
    color: string;
    plan: string;
  }>>([]);

  // Deterministic gradient assignment
  const gradients = [
    "from-blue-500 to-blue-600",
    "from-purple-500 to-purple-600",
    "from-emerald-500 to-emerald-600",
    "from-rose-500 to-rose-600",
    "from-amber-500 to-amber-600",
    "from-cyan-500 to-cyan-600",
  ];

  const pickGradient = (key: string) => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) | 0;
    const idx = Math.abs(hash) % gradients.length;
    return gradients[idx];
  };

  useEffect(() => {
    if (isPending) return;
    if (!session) {
      router.push("/auth");
      return;
    }

    let mounted = true;
    const controller = new AbortController();
    (async () => {
      try {
        setLoading(true);
        const { stores: apiStores } = await storeService.getMyStores();
        if (!mounted) return;
        const mapped = apiStores.map((s: StoreSummary) => ({
          id: s.id,
          name: s.storeName,
          url: s.storeUrl ?? `${s.subdomain}.myaxova.store`,
          isActive: s.isActive ?? true,
          createdAt: s.createdAt,
          color: pickGradient(s.id + s.subdomain),
          plan: "Pro",
        }));
        // Newest first
        setStores(mapped.sort((a,b)=> new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      } catch (err: any) {
        if (err?.response?.status === 401) {
          toast.error("Authentication required. Redirecting to sign in.");
          router.push("/auth");
        } else {
          toast.error("Failed to load your stores. Please try again.");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [session, isPending, router]);

  const filteredStores = useMemo(() => {
    let base = stores;
    if (status === "active") base = base.filter((s) => s.isActive);
    if (status === "inactive") base = base.filter((s) => !s.isActive);
    if (!query) return base;
    const q = query.toLowerCase();
    return base.filter((s) => s.name.toLowerCase().includes(q) || s.url.toLowerCase().includes(q));
  }, [stores, query, status]);

  // Reset to first page when filters change
  useEffect(() => {
    setPage(1);
  }, [query, status]);

  const totalPages = Math.max(1, Math.ceil(filteredStores.length / PAGE_SIZE));
  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const visibleStores = filteredStores.slice(startIdx, endIdx);
  
  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case "Enterprise": return <Crown className="w-3.5 h-3.5 text-yellow-400" />;
      case "Pro": return <TrendingUp className="w-3.5 h-3.5 text-blue-400" />;
      case "Business": return <Users className="w-3.5 h-3.5 text-purple-400" />;
      default: return <StoreIcon className="w-3.5 h-3.5 text-gray-400" />;
    }
  };

  const getStoreInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4">
      <div className="relative z-10 w-full max-w-[560px] mx-auto">
        
        {/* Advanced Card Container */}
        <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 shadow-xl overflow-hidden">
          
          {/* Advanced Header */}
          <div className="px-6 pt-8 pb-6 border-b border-white/10">
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-white border border-white/20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Image 
                  src="/assets/icon.png" 
                  alt="Logo" 
                  width={24} 
                  height={24} 
                  className="w-6 h-6 object-contain"
                />
              </div>
              <h1 className="text-2xl font-semibold text-white mb-2">Select a store</h1>
              <p className="text-sm text-white/70">Choose a store to manage or create a new one</p>
            </div>

            {/* Advanced Search */
            }
            <div className="mt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                <input
                  type="text"
                  placeholder={loading ? "Loading stores..." : "Search stores..."}
                  className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/20 rounded-lg text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setSearchOpen(true)}
                  disabled={loading}
                />
              </div>
              {/* Status Filter */}
              <div className="mt-3 flex justify-center">
                <div className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 p-1">
                  {([
                    { key: "all", label: "All", Icon: Sparkles, count: stores.length },
                    { key: "active", label: "Active", Icon: CheckCircle2, count: stores.filter(s=>s.isActive).length },
                    { key: "inactive", label: "Inactive", Icon: PauseCircle, count: stores.filter(s=>!s.isActive).length },
                  ] as const).map(({ key, label, Icon, count }) => {
                    const selected = status === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setStatus(key)}
                        disabled={loading}
                        aria-pressed={selected}
                        className={[
                          "group relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium transition-all",
                          "border",
                          selected ? "bg-white/15 border-white/20 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" : "bg-transparent border-transparent text-white/75 hover:text-white hover:bg-white/10",
                          loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
                        ].join(' ')}
                      >
                        <Icon className={`h-3.5 w-3.5 ${selected ? "text-white" : "text-white/70"}`} />
                        <span>{label}</span>
                        <span className={`ml-1 inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-sm text-[10px] ${selected ? "bg-white/20 text-white" : "bg-white/10 text-white/80"}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Store List */}
          <div className="px-3 py-3">
            <div className="space-y-1">
              {loading && (
                Array.from({ length: PAGE_SIZE }).map((_, i) => (
                  <div key={i} className="w-full rounded-lg p-4 border border-white/10 bg-white/[0.04] relative overflow-hidden">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 sk-shimmer" />
                      {/* Text zone */}
                      <div className="flex-1 min-w-0">
                        <div className="h-4 w-1/3 rounded bg-white/10 sk-shimmer" />
                        <div className="mt-2 flex items-center gap-2">
                          <div className="h-3 w-28 rounded bg-white/10 sk-shimmer" />
                          <div className="h-3 w-16 rounded bg-white/10 sk-shimmer" />
                        </div>
                      </div>
                      {/* Arrow */}
                      <div className="h-4 w-4 rounded bg-white/10 sk-shimmer" />
                    </div>
                  </div>
                ))
              )}
              {!loading && visibleStores.map((store) => (
                <button
                  key={store.id}
                  onClick={async () => {
                    const subdomain = store.url?.split('.myaxova.store')[0] || store.name.toLowerCase().replace(/\s+/g,'-');
                    try {
                      const { store: full } = await storeService.getStoreBySubdomain(subdomain);
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
                    } catch (e) {
                      toast.error('Failed to fetch store details');
                    } finally {
                      router.push(`/store/${encodeURIComponent(subdomain)}`);
                    }
                  }}
                  className="w-full group hover:bg-white/8 rounded-lg p-4 flex items-center justify-between transition-all duration-200 border border-white/10 hover:border-white/20 focus-visible:outline-none focus-visible:ring-0 transform-gpu will-change-transform"
                >
                  <div className="flex items-center flex-1">
                    {/* Text Avatar */}
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${store.color} flex items-center justify-center shadow-lg`}>
                      <span className="text-white font-semibold text-sm">
                        {getStoreInitials(store.name)}
                      </span>
                    </div>
                    
                    {/* Advanced Store Info */}
                    <div className="ml-4 flex-1 text-left min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 title={store.name} className="text-base font-semibold text-white group-hover:text-white/90 transition-colors truncate max-w-[60%] sm:max-w-[70%]">
                              {store.name}
                            </h3>
                            {getPlanIcon(store.plan)}
                          </div>
                          <div className="flex items-center gap-2 text-white/60 min-w-0 flex-wrap">
                            <Globe className="w-3.5 h-3.5" />
                            <span title={store.url} className="text-sm truncate max-w-[55%] sm:max-w-[70%] flex-1">{store.url}</span>
                            <span className={`shrink-0 ml-2 inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium ${store.isActive ? 'bg-emerald-500/15 text-emerald-300' : 'bg-zinc-500/15 text-zinc-300'}`}>
                              {store.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Advanced Arrow */}
                  <ArrowRight className="h-4 w-4 text-white/60 group-hover:text-white/80 group-hover:translate-x-0.5 transition-all ml-4" />
                </button>
              ))}

              {!loading && filteredStores.length === 0 && (
                <div className="w-full rounded-lg p-6 border border-white/10 bg-white/5 text-center text-white/70">
                  No stores found
                </div>
              )}

              {/* Pagination */}
              {!loading && filteredStores.length > 0 && (
                <div className="flex items-center justify-between pt-4">
                  <div className="text-xs text-white/60">
                    Showing {startIdx + 1}–{Math.min(endIdx, filteredStores.length)} of {filteredStores.length}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white/80 hover:text-white hover:bg-white/10 border border-white/10"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page <= 1}
                    >
                      Prev
                    </Button>
                    <span className="text-xs text-white/70">Page {page} / {totalPages}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white/80 hover:text-white hover:bg-white/10 border border-white/10"
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page >= totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {/* Advanced Add Store Button */}
              <button
                onClick={() => router.push("/steps/setup")}
                className="w-full group hover:bg-white/8 rounded-lg p-4 flex items-center justify-between transition-all duration-200 border border-dashed border-white/20 hover:border-white/30"
              >
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/15 transition-colors">
                    <Plus className="h-5 w-5 text-white/70 group-hover:text-white transition-colors" />
                  </div>
                  <div className="ml-4 text-left">
                    <h3 className="text-base font-semibold text-white group-hover:text-white/90 transition-colors">Create new store</h3>
                    <p className="text-sm text-white/60 mt-0.5">Start building your next venture</p>
                  </div>
                </div>
                
                <ArrowRight className="h-4 w-4 text-white/60 group-hover:text-white/80 group-hover:translate-x-0.5 transition-all ml-4" />
              </button>
            </div>
          </div>

          {/* Advanced Footer Actions */}
          <div className="px-4 py-4 bg-white/5 border-t border-white/10 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg border border-white/10 transition-all"
              onClick={() => router.push("/settings")}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg border border-white/10 transition-all"
              onClick={() => router.push("/logout")}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Advanced Search Dialog */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="sm:max-w-[480px] p-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl">
          <Command className="bg-transparent rounded-xl">
            <div className="p-4 pb-3">
              <h2 className="text-lg font-semibold text-white mb-3">Search Stores</h2>
              <CommandInput 
                placeholder={loading ? "Loading stores..." : "Type to search stores..."} 
                value={query}
                onValueChange={setQuery}
                className="text-white placeholder:text-white/50 bg-white/5 border-white/20 rounded-lg h-10" 
              />
            </div>
            <CommandList className="px-4 pb-4">
              <CommandEmpty className="text-white/70 text-center py-6">
                <Search className="w-6 h-6 mx-auto mb-2 text-white/40" />
                No stores found
              </CommandEmpty>
              <CommandGroup heading="Your Stores" className="text-white/80">
                {loading
                  ? Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="flex items-center p-3 rounded-lg border border-white/10 bg-white/[0.05] relative overflow-hidden">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/10 to-white/5 sk-shimmer mr-3" />
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="h-3.5 w-1/3 rounded bg-white/10 sk-shimmer" />
                          <div className="h-3 w-1/2 rounded bg-white/10 sk-shimmer" />
                        </div>
                      </div>
                    ))
                  : filteredStores.map((store) => (
                  <CommandItem
                    key={store.id}
                    onSelect={() => {
                      (async () => {
                        const subdomain = store.url?.split('.myaxova.store')[0] || store.name.toLowerCase().replace(/\s+/g,'-');
                        try {
                          const { store: full } = await storeService.getStoreBySubdomain(subdomain);
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
                        } catch (e) {
                          toast.error('Failed to fetch store details');
                        } finally {
                          router.push(`/store/${encodeURIComponent(subdomain)}`);
                          setSearchOpen(false);
                        }
                      })();
                    }}
                    className="group text-white rounded-lg p-3 cursor-pointer border border-transparent data-[selected=true]:bg-white/10 hover:bg-white/10 data-[selected=true]:text-white"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-br ${store.color} rounded-lg flex items-center justify-center mr-3`}>
                      <span className="text-white font-semibold text-xs">
                        {getStoreInitials(store.name)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-0.5 min-w-0">
                            <p title={store.name} className="font-medium text-sm truncate max-w-[60%] group-data-[selected=true]:text-white">{store.name}</p>
                            {getPlanIcon(store.plan)}
                          </div>
                          <p title={store.url} className="text-xs text-white/60 truncate max-w-[80%]">{store.url}</p>
                        </div>
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  );
}

{/* Local styles for enhanced skeleton shimmer */}
<style jsx>{`
  .sk-shimmer { position: relative; overflow: hidden; }
  .sk-shimmer::after {
    content: '';
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.18), rgba(255,255,255,0));
    animation: sk-move 1.4s infinite;
  }
  @keyframes sk-move { 100% { transform: translateX(100%); } }
`}</style>


