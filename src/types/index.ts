// === WHOLESALE PRICING TIER INTERFACES ===
export interface WholesalePricingTier {
  tierName: string;
  minQuantity: number;
  maxQuantity?: number;
  price: number;
  discountPercentage: number;
  customerType: 'RETAILER' | 'DISTRIBUTOR' | 'CORPORATE' | 'VIP' | 'RESELLER';
  region: string;
  currency: string;
  validFrom?: string;
  validTo?: string;
  isActive: boolean;
  freeShipping: boolean;
  customFields?: {
    [key: string]: any;
  };
}

// === LEGACY WHOLESALE SUPPORT ===
export interface LegacyWholesale {
  wholesalePrice?: number;
  minWholesaleQuantity?: number;
  maxWholesaleQuantity?: number;
  wholesaleEnabled?: boolean;
}

// === PRODUCT IMAGE INTERFACE ===
export interface ProductImage {
  src: string;
  alt: string;
  position: number;
}

// === PRODUCT VARIANT INTERFACE ===
export interface ProductVariant {
  title: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  inventoryQuantity: number;
  costPerItem: number;
  options: {
    [key: string]: string;
  };
  wholesalePricingTiers?: WholesalePricingTier[];
}

// === INVENTORY LOCATIONS ===
export interface InventoryLocations {
  warehouses: string[];
  posLocations: string[];
}

// === MAIN PRODUCT INTERFACE ===
export interface Product {
  id?: string;
  title: string;
  description: string;
  basePrice: number;
  compareAtPrice?: number;
  costPerItem: number;
  
  // Legacy wholesale fields (backward compatibility)
  wholesalePrice?: number;
  minWholesaleQuantity?: number;
  maxWholesaleQuantity?: number;
  wholesaleEnabled?: boolean;
  
  // New wholesale pricing tiers
  wholesalePricingTiers?: WholesalePricingTier[];
  
  // Variants with their own wholesale pricing
  variants?: ProductVariant[];
  
  // Enhanced media
  images?: ProductImage[];
  
  // Inventory locations
  inventoryLocations?: InventoryLocations;
  
  // Additional fields for compatibility
  name?: string; // Alias for title
  category?: string;
  image?: string; // Fallback single image
  stock?: number; // Fallback inventory
  createdAt?: string;
  updatedAt?: string;
  status?: 'active' | 'draft' | 'archived';
  brand?: string;
  tags?: string;
  
  // Enhanced product fields
  storeId?: string;
  supplierId?: string;
  SKU?: string;
  barcode?: string;
  barcodeFormat?: string;
  productType?: string;
  hasVariants?: boolean;
  weightKg?: string;
  lengthCm?: string;
  widthCm?: string;
  heightCm?: string;
  isFeatured?: boolean;
  totalSold?: number;
  totalRevenue?: number;
  averageRating?: number;
  totalReviews?: number;
  viewsThisMonth?: number;
  conversionRate?: number;
  profit?: string;
  margin?: string;
  
  // Sales channels
  salesChannels?: {
    [key: string]: {
      enabled: boolean;
      pricing?: {
        discount?: number;
        customPrice?: number;
        discountType?: string;
      };
      availability?: string;
      displayOrder?: number;
      visibleInCatalog?: boolean;
      externalIds?: {
        [key: string]: string;
      };
    };
  };
  
  // Product attributes
  productCategory?: string;
  productSubCategory?: string;
  attributes?: {
    features?: {
      [key: string]: string;
    };
    specifications?: {
      [key: string]: string;
    };
    highlightedFeatures?: Array<{
      icon: string;
      featureTitle: string;
      featureDescription: string;
    }>;
  };
}

// === LEGACY COMPATIBILITY ===
export interface LegacyProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  createdAt: string;
} 