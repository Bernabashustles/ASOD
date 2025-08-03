"use client";

import { useState } from "react";
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
  Sparkles
} from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";

export default function ChooseStorePage() {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  
  // Enhanced store data with professional information
  const stores = [
    {
      id: "my-store",
      name: "Axova Flagship",
      url: "flagship.axova.com",
      status: "active",
      plan: "Pro",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: "fashion-store",
      name: "Style Collective",
      url: "style.axova.com", 
      status: "active",
      plan: "Business",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: "tech-hub",
      name: "Tech Innovation Hub",
      url: "techhub.axova.com",
      status: "active", 
      plan: "Enterprise",
      color: "from-emerald-500 to-emerald-600"
    }
  ];

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

            {/* Advanced Search */}
            <div className="mt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                <input
                  type="text"
                  placeholder="Search stores..."
                  className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/20 rounded-lg text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all"
                  onClick={() => setSearchOpen(true)}
                />
              </div>
            </div>
          </div>

          {/* Advanced Store List */}
          <div className="px-3 py-3">
            <div className="space-y-1">
              {stores.map((store) => (
                <button
                  key={store.id}
                  onClick={() => router.push(`/steps/setup`)}
                  className="w-full group hover:bg-white/8 rounded-lg p-4 flex items-center justify-between transition-all duration-200 border border-transparent hover:border-white/10"
                >
                  <div className="flex items-center flex-1">
                    {/* Text Avatar */}
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${store.color} flex items-center justify-center shadow-lg`}>
                      <span className="text-white font-semibold text-sm">
                        {getStoreInitials(store.name)}
                      </span>
                    </div>
                    
                    {/* Advanced Store Info */}
                    <div className="ml-4 flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-base font-semibold text-white group-hover:text-white/90 transition-colors">{store.name}</h3>
                            {getPlanIcon(store.plan)}
                          </div>
                          <div className="flex items-center gap-2 text-white/60">
                            <Globe className="w-3.5 h-3.5" />
                            <span className="text-sm">{store.url}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Advanced Arrow */}
                  <ArrowRight className="h-4 w-4 text-white/60 group-hover:text-white/80 group-hover:translate-x-0.5 transition-all ml-4" />
                </button>
              ))}

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
                placeholder="Type to search stores..." 
                className="text-white placeholder:text-white/50 bg-white/5 border-white/20 rounded-lg h-10" 
              />
            </div>
            <CommandList className="px-4 pb-4">
              <CommandEmpty className="text-white/70 text-center py-6">
                <Search className="w-6 h-6 mx-auto mb-2 text-white/40" />
                No stores found
              </CommandEmpty>
              <CommandGroup heading="Your Stores" className="text-white/80">
                {stores.map((store) => (
                  <CommandItem
                    key={store.id}
                    onSelect={() => {
                      router.push(`/steps/setup`);
                      setSearchOpen(false);
                    }}
                    className="text-white hover:bg-white/10 rounded-lg p-3 cursor-pointer"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-br ${store.color} rounded-lg flex items-center justify-center mr-3`}>
                      <span className="text-white font-semibold text-xs">
                        {getStoreInitials(store.name)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="font-medium text-sm">{store.name}</p>
                            {getPlanIcon(store.plan)}
                          </div>
                          <p className="text-xs text-white/60">{store.url}</p>
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


