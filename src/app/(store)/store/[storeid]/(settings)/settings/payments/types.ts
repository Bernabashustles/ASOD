export interface PaymentProvider {
  id: string;
  name: string;
  logo?: string;
  description: string;
  status: 'active' | 'inactive' | 'pending';
  methods: string[];
  isRecommended?: boolean;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'card' | 'digital_wallet' | 'bank_transfer' | 'manual';
  icon: string;
  status: 'active' | 'inactive';
} 