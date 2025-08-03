export interface MediaFile {
  id: string;
  file: File;
  preview: string;
}

export interface Variant {
  id: string;
  name: string;
  values: string[];
}

export interface PredefinedVariant {
  name: string;
  options: string[];
}

export interface VariantCombination {
  id: string;
  title: string;
  price: string;
  compareAtPrice: string;
  sku: string;
  quantity: number;
  barcode: string;
  options: string[];
}

export interface CustomField {
  id: string;
  name: string;
  value: string;
}

export interface ShippingDimension {
  length: string;
  width: string;
  height: string;
  weight: string;
}

export interface Location {
  id: string;
  name: string;
  type: 'shop' | 'warehouse';
  inventory: number;
}

export interface FormData {
  title: string;
  description: string;
  price: string;
  compareAtPrice: string;
  sku: string;
  barcode: string;
  quantity: number;
  trackQuantity: boolean;
  continueSellingWhenOutOfStock: boolean;
  requiresShipping: boolean;
  taxable: boolean;
  customFields: CustomField[];
  countryOfOrigin: string;
  harmonizedSystemCode: string;
  shipping: ShippingDimension;
  giftCard: boolean;
  templateSuffix: string;
  publishDate: string;
  publishTime: string;
  seoTitle: string;
  seoDescription: string;
  urlHandle: string;
  locations: { locationId: string; quantity: number; }[];
}

export const predefinedVariants: PredefinedVariant[] = [
  {
    name: 'Size',
    options: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL']
  },
  {
    name: 'Color',
    options: ['Black', 'White', 'Gray', 'Navy', 'Red', 'Green', 'Blue', 'Yellow', 'Purple', 'Pink']
  },
  {
    name: 'Material',
    options: ['Cotton', 'Polyester', 'Wool', 'Linen', 'Silk', 'Denim', 'Leather', 'Canvas']
  },
  {
    name: 'Gender',
    options: ['Men', 'Women', 'Unisex']
  }
];

// Mock data for locations
export const mockLocations: Location[] = [
  { id: '1', name: 'Main Store', type: 'shop', inventory: 0 },
  { id: '2', name: 'Downtown Shop', type: 'shop', inventory: 0 },
  { id: '3', name: 'Central Warehouse', type: 'warehouse', inventory: 0 },
  { id: '4', name: 'East Side Store', type: 'shop', inventory: 0 },
]; 