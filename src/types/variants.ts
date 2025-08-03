export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface VariantTemplate {
  id: string;
  name: string;
  options: ProductOption[];
} 