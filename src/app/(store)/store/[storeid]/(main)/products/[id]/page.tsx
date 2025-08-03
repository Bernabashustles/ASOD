'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Edit, 
  MoreVertical, 
  Star, 
  Share2,
  ShoppingCart,
  Package,
  Shield,
  Award,
  Copy,
  ExternalLink,
  Info,
  TrendingUp,
  DollarSign,
  BarChart3,
  Globe,
  Smartphone,
  Store as StoreIcon,
  Zap,
  CheckCircle,
  Plus,
  Eye,
  Heart,
  ShoppingBag,
  Users,
  Calendar,
  Clock,
  MapPin,
  Truck,
  Tag,
  Activity,
  AlertCircle,
  ChevronRight,
  Download,
  Filter,
  Search,
  Settings,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Camera,
  Verified,
  TrendingDown,
  PieChart,
  LineChart,
  Layers,
  Target,
  Bookmark,
  Bell,
  RefreshCw,
  Archive,
  FileText,
  Image as ImageIcon,
  Video,
  Headphones,
  Wifi,
  Battery,
  Volume2,
  Bluetooth,
  Gauge
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

// Enhanced mock data with wholesale pricing structure
const mockProductData = {
  "id": "nzcm53zkloydrj41dfljxi04",
  "storeId": "whtzf2om75lzqn9xay0vt94s",
  "supplierId": "qfoxk6n9pv8dt5prizk5mil4",
  "title": "Premium Wireless Noise-Cancelling Headphones",
  "description": "Professional-grade wireless headphones with advanced noise cancellation",
  "basePrice": 349.99,
  "compareAtPrice": 499.99,
  "costPerItem": 175.50,
  
  // === LEGACY WHOLESALE FIELDS (Still supported for backward compatibility) ===
  "wholesalePrice": 280.00,
  "minWholesaleQuantity": 25,
  "maxWholesaleQuantity": 500,
  "wholesaleEnabled": true,
  
  // === 🆕 MULTIPLE WHOLESALE PRICING TIERS FOR THE MAIN PRODUCT ===
  "wholesalePricingTiers": [
    {
      "tierName": "Small Retailer",
      "minQuantity": 10,
      "maxQuantity": 49,
      "price": 295.00,
      "discountPercentage": 15.7,
      "customerType": "RETAILER",
      "region": "North America",
      "currency": "USD",
      "validFrom": "2024-01-01T00:00:00Z",
      "validTo": "2024-12-31T23:59:59Z",
      "isActive": true,
      "freeShipping": false,
      "customFields": {
        "paymentTerms": "Net 30",
        "minimumOrderValue": 2950,
        "tierDescription": "Perfect for small electronics retailers"
      }
    },
    {
      "tierName": "Volume Retailer",
      "minQuantity": 50,
      "maxQuantity": 199,
      "price": 275.00,
      "discountPercentage": 21.4,
      "customerType": "RETAILER",
      "region": "North America",
      "currency": "USD",
      "validFrom": "2024-01-01T00:00:00Z",
      "validTo": "2024-12-31T23:59:59Z",
      "isActive": true,
      "freeShipping": true,
      "customFields": {
        "paymentTerms": "Net 45",
        "minimumOrderValue": 13750,
        "tierDescription": "For established retailers with volume orders",
        "supportLevel": "Priority"
      }
    },
    {
      "tierName": "Regional Distributor",
      "minQuantity": 200,
      "maxQuantity": 999,
      "price": 245.00,
      "discountPercentage": 30.0,
      "customerType": "DISTRIBUTOR",
      "region": "North America",
      "currency": "USD",
      "validFrom": "2024-01-01T00:00:00Z",
      "validTo": "2024-12-31T23:59:59Z",
      "isActive": true,
      "freeShipping": true,
      "customFields": {
        "paymentTerms": "Net 60",
        "minimumOrderValue": 49000,
        "tierDescription": "Regional distribution partners",
        "supportLevel": "Premium",
        "marketingSupport": true,
        "exclusiveTerritory": "Pacific Northwest"
      }
    },
    {
      "tierName": "VIP Corporate",
      "minQuantity": 100,
      "maxQuantity": 500,
      "price": 250.00,
      "discountPercentage": 28.6,
      "customerType": "CORPORATE",
      "region": "Global",
      "currency": "USD",
      "validFrom": "2024-01-01T00:00:00Z",
      "validTo": "2024-12-31T23:59:59Z",
      "isActive": true,
      "freeShipping": true,
      "customFields": {
        "paymentTerms": "Net 30",
        "minimumOrderValue": 25000,
        "tierDescription": "Corporate bulk purchases for employee programs",
        "supportLevel": "Enterprise",
        "customBranding": true,
        "logoEngraving": "Available"
      }
    },
    {
      "tierName": "International Distributor",
      "minQuantity": 500,
      "price": 220.00,
      "discountPercentage": 37.1,
      "customerType": "DISTRIBUTOR",
      "region": "International",
      "currency": "USD",
      "validFrom": "2024-01-01T00:00:00Z",
      "validTo": "2024-12-31T23:59:59Z",
      "isActive": true,
      "freeShipping": true,
      "customFields": {
        "paymentTerms": "Letter of Credit",
        "minimumOrderValue": 110000,
        "tierDescription": "International distribution partners",
        "supportLevel": "Global Enterprise",
        "marketingSupport": true,
        "territoryRights": "Exclusive country distribution",
        "certificationSupport": true
      }
    }
  ],
  
  // === VARIANTS WITH THEIR OWN WHOLESALE PRICING TIERS ===
  "variants": [
    {
      "title": "Midnight Black / Standard",
      "price": 349.99,
      "compareAtPrice": 499.99,
      "sku": "ATP-WH-BLK-STD-001",
      "inventoryQuantity": 150,
      "costPerItem": 175.50,
      "options": {
        "Color": "Midnight Black",
        "Size": "Standard"
      },
      "wholesalePricingTiers": [
        {
          "tierName": "Black Variant - Small Retailer",
          "minQuantity": 5,
          "maxQuantity": 24,
          "price": 295.00,
          "discountPercentage": 15.7,
          "customerType": "RETAILER",
          "region": "North America",
          "currency": "USD",
          "isActive": true,
          "freeShipping": false,
          "customFields": {
            "popularityBonus": "Most popular color - priority stock",
            "leadTime": "2-3 business days"
          }
        },
        {
          "tierName": "Black Variant - Volume Retailer",
          "minQuantity": 25,
          "maxQuantity": 99,
          "price": 270.00,
          "discountPercentage": 22.9,
          "customerType": "RETAILER",
          "region": "North America",
          "currency": "USD",
          "isActive": true,
          "freeShipping": true,
          "customFields": {
            "popularityBonus": "Most popular color - guaranteed stock",
            "leadTime": "1-2 business days",
            "priorityFulfillment": true
          }
        }
      ]
    },
    {
      "title": "Pearl White / Standard",
      "price": 349.99,
      "compareAtPrice": 499.99,
      "sku": "ATP-WH-WHT-STD-001",
      "inventoryQuantity": 100,
      "costPerItem": 175.50,
      "options": {
        "Color": "Pearl White",
        "Size": "Standard"
      },
      "wholesalePricingTiers": [
        {
          "tierName": "White Variant - Boutique Retailer",
          "minQuantity": 3,
          "maxQuantity": 15,
          "price": 305.00,
          "discountPercentage": 12.9,
          "customerType": "RETAILER",
          "region": "North America",
          "currency": "USD",
          "isActive": true,
          "freeShipping": false,
          "customFields": {
            "premiumVariant": "Limited edition color",
            "exclusivity": "Boutique-only availability",
            "leadTime": "3-5 business days"
          }
        }
      ]
    },
    {
      "title": "Rose Gold / Limited Edition",
      "price": 399.99,
      "compareAtPrice": 549.99,
      "sku": "ATP-WH-RG-LTD-001",
      "inventoryQuantity": 50,
      "costPerItem": 195.00,
      "options": {
        "Color": "Rose Gold",
        "Edition": "Limited"
      },
      "wholesalePricingTiers": [
        {
          "tierName": "Rose Gold - VIP Only",
          "minQuantity": 2,
          "maxQuantity": 10,
          "price": 340.00,
          "discountPercentage": 15.0,
          "customerType": "VIP",
          "region": "Global",
          "currency": "USD",
          "validFrom": "2024-01-01T00:00:00Z",
          "validTo": "2024-06-30T23:59:59Z",
          "isActive": true,
          "freeShipping": true,
          "customFields": {
            "limitedEdition": "Only 500 units worldwide",
            "exclusivity": "VIP customers only",
            "authentication": "Certificate of authenticity included",
            "collectible": "Numbered limited edition",
            "leadTime": "Pre-order: 2 weeks"
          }
        }
      ]
    }
  ],
  
  // === ENHANCED IMAGES STRUCTURE ===
  "images": [
    {
      "src": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60",
      "alt": "Premium Wireless Noise-Cancelling Headphones - Main View",
      "position": 1
    },
    {
      "src": "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=60",
      "alt": "Premium Wireless Noise-Cancelling Headphones - Side View",
      "position": 2
    },
    {
      "src": "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=60",
      "alt": "Premium Wireless Noise-Cancelling Headphones - Detail View",
      "position": 3
    },
    {
      "src": "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&auto=format&fit=crop&q=60",
      "alt": "Premium Wireless Noise-Cancelling Headphones - Lifestyle",
      "position": 4
    }
  ],
  
  "inventoryLocations": {
    "warehouses": ["warehouse_main_001", "warehouse_premium_002"],
    "posLocations": ["pos_flagship_downtown"]
  },
  
  // === LEGACY/COMPATIBILITY FIELDS ===
  "SKU": "HEBD-001-d11520",
  "barcode": "WHTNZCMJXI04",
  "barcodeFormat": "CODE39",
  "profit": "129.99",
  "margin": "52.00",
  "productType": "physical",
  "hasVariants": true,
  "weightKg": "0.35",
  "lengthCm": "20.00",
  "widthCm": "15.00",
  "heightCm": "8.00",
  "status": "active",
  "isFeatured": true,
  "totalSold": 1247,
  "totalRevenue": 311175,
  "averageRating": 4.6,
  "totalReviews": 89,
  "viewsThisMonth": 12450,
  "conversionRate": 3.2,
  "salesChannels": {
    "pos": {
      "enabled": true,
      "pricing": {
        "discount": 5,
        "customPrice": 259.99,
        "discountType": "percentage"
      },
      "availability": "in_stock",
      "displayOrder": 1,
      "visibleInCatalog": true
    },
    "marketplace": {
      "enabled": true,
      "externalIds": {
        "ebay": "EBAY789012",
        "amazon": "AMZN123456"
      },
      "availability": "in_stock",
      "visibleInCatalog": true
    },
    "onlineStore": {
      "enabled": true,
      "pricing": {
        "discount": 10,
        "discountType": "percentage"
      },
      "availability": "in_stock",
      "displayOrder": 1,
      "visibleInCatalog": true
    }
  },
  "productCategory": "Electronics",
  "productSubCategory": "Headphones",
  "attributes": {
    "features": {
      "wireless": "Yes",
      "batteryLife": "30 hours",
      "connectionType": "Bluetooth 5.0",
      "noiseCancellation": "Active",
      "waterResistance": "IPX4",
      "quickCharge": "15 min = 3 hours"
    },
    "specifications": {
      "frequency": "20Hz-20kHz",
      "impedance": "32 ohms",
      "sensitivity": "110dB",
      "driverSize": "40mm",
      "chargingTime": "2 hours",
      "range": "10 meters"
    },
    "highlightedFeatures": [
      {
        "icon": "noise-cancel-icon",
        "featureTitle": "Active Noise Cancellation",
        "featureDescription": "Advanced ANC technology blocks out ambient noise for immersive listening experience"
      },
      {
        "icon": "battery-icon",
        "featureTitle": "Extended Battery Life",
        "featureDescription": "Up to 30 hours of playback with ANC off, 20 hours with ANC on"
      },
      {
        "icon": "comfort-icon",
        "featureTitle": "Premium Comfort",
        "featureDescription": "Memory foam ear cushions and adjustable headband for all-day comfort"
      },
      {
        "icon": "sound-icon",
        "featureTitle": "Hi-Fi Audio Quality",
        "featureDescription": "40mm drivers deliver rich, detailed sound with deep bass and clear highs"
      }
    ]
  },
  "brand": "SoundMaster",
  "tags": "wireless, headphones, noise-cancelling, premium, bluetooth",
  "createdAt": "2025-06-04T15:56:35.950Z",
  "updatedAt": "2025-06-04T15:56:35.950Z"
};

const mockVariantData = {
  "id": "gtrahoqr3fvwao3o3h4qcw37",
  "productId": "nzcm53zkloydrj41dfljxi04",
  "title": "Black - Large",
  "SKU": "HEBD-001-BLK-LG",
  "price": "249.99",
  "comparingPrice": "299.99",
  "costPerItem": "120.00",
  "profit": "129.99",
  "margin": "52.00",
  "attributes": {
    "color": "Black",
    "size": "Large"
  },
  "media": [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60"
  ],
  "status": "active",
  "inventory": 248
};

// Enhanced review data
const mockReviewData = {
  "productId": "nzcm53zkloydrj41dfljxi04",
  "customerId": "customer_12345",
  "rating": 4.5,
  "title": "Great product with minor issues",
  "content": "I've been using this product for a month now and I'm very satisfied with its performance. The quality is excellent and it does everything as advertised. The only minor issue is the battery life could be better, but overall it's a fantastic purchase.",
  "images": [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&auto=format&fit=crop&q=60"
  ],
  "verifiedPurchase": true,
  "orderId": "order_12345",
  "customerName": "Sarah Johnson",
  "customerAvatar": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&auto=format&fit=crop&q=60",
  "date": "2024-01-15T10:30:00.000Z",
  "helpful": 23,
  "notHelpful": 2
};

const additionalReviews = [
  {
    "id": "review_2",
    "rating": 5,
    "title": "Exceptional sound quality!",
    "content": "These headphones exceeded my expectations. The noise cancellation is incredible and the sound quality is pristine.",
    "customerName": "Mike Chen",
    "customerAvatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
    "date": "2024-01-10T14:20:00.000Z",
    "verifiedPurchase": true,
    "helpful": 18,
    "notHelpful": 0
  },
  {
    "id": "review_3",
    "rating": 4,
    "title": "Good value for money",
    "content": "Solid headphones with good features. The build quality is impressive and they're comfortable for long listening sessions.",
    "customerName": "Emma Davis",
    "customerAvatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60",
    "date": "2024-01-08T09:15:00.000Z",
    "verifiedPurchase": true,
    "helpful": 12,
    "notHelpful": 1
  }
];

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeMetric, setActiveMetric] = useState('revenue');
  
  const product = mockProductData;
  const variant = mockVariantData;
  const mainReview = mockReviewData;

  const discountPercentage = Math.round(((product.compareAtPrice! - product.basePrice) / product.compareAtPrice!) * 100);

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Header with Status Bar */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Status Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 text-xs text-muted-foreground border-b border-border/40">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2 sm:mb-0">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Live Product</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>Last updated 2 min ago</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <span className="text-xs">Product ID: {product.id.slice(-8)}</span>
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                <RefreshCw className="h-3 w-3 mr-1" />
                Sync
              </Button>
            </div>
          </div>
          
          {/* Main Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-0">
              <Link href="/products" className="w-fit">
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Products
                </Button>
              </Link>
              <div className="hidden sm:flex items-center space-x-2 text-sm text-muted-foreground">
                <span>Products</span>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground font-medium">{product.title}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={product.status === 'active' ? 'default' : 'secondary'} className="hidden sm:inline-flex">
                <CheckCircle className="h-3 w-3 mr-1" />
                {product.status === 'active' ? 'Active' : 'Draft'}
              </Badge>
              {product.isFeatured && (
                <Badge variant="outline" className="hidden sm:inline-flex border-amber-200 text-amber-700">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  Featured
                </Badge>
              )}
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Archive className="h-4 w-4 mr-2" />
                    Archive
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Enhanced Product Header with KPIs */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="flex-1">
                  <h1 className="text-2xl sm:text-4xl font-bold tracking-tight mb-2">{product.title}</h1>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      SKU: {product.SKU}
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      Brand: {product.brand}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Created {new Date(product.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Activity className="h-3 w-3" />
                      Last updated {new Date(product.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Advanced KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                <Card className="relative overflow-hidden">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center justify-center w-6 sm:w-8 h-6 sm:h-8 bg-green-100 rounded-lg">
                        <DollarSign className="h-3 sm:h-4 w-3 sm:w-4 text-green-600" />
                      </div>
                      <Badge variant="outline" className="text-[10px] sm:text-xs">+12%</Badge>
                    </div>
                    <div className="text-lg sm:text-2xl font-bold">${(product.totalRevenue / 1000).toFixed(0)}k</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">Total Revenue</div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
                  </CardContent>
                </Card>
                
                <Card className="relative overflow-hidden">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center justify-center w-6 sm:w-8 h-6 sm:h-8 bg-blue-100 rounded-lg">
                        <ShoppingBag className="h-3 sm:h-4 w-3 sm:w-4 text-blue-600" />
                      </div>
                      <Badge variant="outline" className="text-[10px] sm:text-xs">+8%</Badge>
                    </div>
                    <div className="text-lg sm:text-2xl font-bold">{product.totalSold.toLocaleString()}</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">Units Sold</div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                  </CardContent>
                </Card>
                
                <Card className="relative overflow-hidden">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center justify-center w-6 sm:w-8 h-6 sm:h-8 bg-purple-100 rounded-lg">
                        <Star className="h-3 sm:h-4 w-3 sm:w-4 text-purple-600" />
                      </div>
                      <Badge variant="outline" className="text-[10px] sm:text-xs">4.6★</Badge>
                    </div>
                    <div className="text-lg sm:text-2xl font-bold">{product.totalReviews}</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">Reviews</div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                  </CardContent>
                </Card>
                
                <Card className="relative overflow-hidden">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center justify-center w-6 sm:w-8 h-6 sm:h-8 bg-orange-100 rounded-lg">
                        <Eye className="h-3 sm:h-4 w-3 sm:w-4 text-orange-600" />
                      </div>
                      <Badge variant="outline" className="text-[10px] sm:text-xs">+15%</Badge>
                    </div>
                    <div className="text-lg sm:text-2xl font-bold">{(product.viewsThisMonth / 1000).toFixed(1)}k</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">Views</div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500"></div>
                  </CardContent>
                </Card>
                
                <Card className="relative overflow-hidden">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center justify-center w-6 sm:w-8 h-6 sm:h-8 bg-teal-100 rounded-lg">
                        <Target className="h-3 sm:h-4 w-3 sm:w-4 text-teal-600" />
                      </div>
                      <Badge variant="outline" className="text-[10px] sm:text-xs">{product.conversionRate}%</Badge>
                    </div>
                    <div className="text-lg sm:text-2xl font-bold">{product.conversionRate}%</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">Conversion</div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-green-500"></div>
                  </CardContent>
                </Card>
                
                <Card className="relative overflow-hidden">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center justify-center w-6 sm:w-8 h-6 sm:h-8 bg-indigo-100 rounded-lg">
                        <Package className="h-3 sm:h-4 w-3 sm:w-4 text-indigo-600" />
                      </div>
                      <Badge variant="outline" className="text-[10px] sm:text-xs">In Stock</Badge>
                    </div>
                    <div className="text-lg sm:text-2xl font-bold">{variant.inventory}</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">Inventory</div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8">
          {/* Enhanced Product Images - Left Column */}
          <div className="lg:col-span-5">
            <div className="space-y-4 sm:space-y-6">
              {/* Main Image with Advanced Controls */}
              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="aspect-square relative bg-gradient-to-br from-muted/30 to-muted/10">
                  <img
                    src={product.images![selectedImage].src}
                    alt={product.images![selectedImage].alt}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {discountPercentage > 0 && (
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                      <Badge className="bg-destructive text-destructive-foreground shadow-md text-xs sm:text-sm">
                        -{discountPercentage}% OFF
                      </Badge>
                    </div>
                  )}
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex gap-1 sm:gap-2">
                    <Button size="sm" variant="secondary" className="h-6 w-6 sm:h-8 sm:w-8 p-0 backdrop-blur-sm bg-background/80 shadow-sm">
                      <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="h-6 w-6 sm:h-8 sm:w-8 p-0 backdrop-blur-sm bg-background/80 shadow-sm">
                      <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="h-6 w-6 sm:h-8 sm:w-8 p-0 backdrop-blur-sm bg-background/80 shadow-sm">
                      <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
              
              {/* Enhanced Thumbnail Grid */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {product.images!.map((image: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index 
                        ? 'border-primary ring-2 ring-primary/20 scale-105 shadow-md' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Product Info - Right Column */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            {/* Advanced Pricing & Metrics Dashboard */}
            <Card className="border-0 bg-gradient-to-br from-background to-muted/20 shadow-lg">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
                  {/* Pricing Section */}
                  <div className="lg:col-span-2">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-baseline gap-2 sm:gap-4">
                        <span className="text-2xl sm:text-4xl font-bold">${product.basePrice}</span>
                        {product.compareAtPrice && product.compareAtPrice > product.basePrice && (
                          <span className="text-base sm:text-xl text-muted-foreground line-through">${product.compareAtPrice}</span>
                        )}
                        <Badge className="bg-green-100 text-green-800 px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm w-fit shadow-sm">
                          Save ${product.compareAtPrice ? (product.compareAtPrice - product.basePrice).toFixed(2) : '0.00'}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                        <div className="flex items-center gap-2 bg-muted/30 p-2 rounded-lg">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Cost:</span>
                          <span className="font-semibold ml-auto">${product.costPerItem}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-muted/30 p-2 rounded-lg">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <span className="text-muted-foreground">Profit:</span>
                          <span className="font-semibold text-green-600 ml-auto">${product.profit}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-muted/30 p-2 rounded-lg">
                          <Gauge className="h-4 w-4 text-blue-600" />
                          <span className="text-muted-foreground">Margin:</span>
                          <span className="font-semibold text-blue-600 ml-auto">{product.margin}%</span>
                        </div>
                      </div>
                      
                      {/* Profit Margin Visualization */}
                      <div className="space-y-2 bg-muted/30 p-3 rounded-lg">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Profit Margin</span>
                          <span className="font-semibold">{product.margin}%</span>
                        </div>
                        <Progress value={parseFloat(product.margin)} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Cost: ${product.costPerItem}</span>
                          <span>Price: ${product.basePrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Category & Status */}
                  <div className="space-y-3">
                    <div className="text-center p-3 sm:p-4 bg-muted/30 rounded-xl">
                      <Badge className="bg-primary/10 text-primary px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">
                        {product.productCategory}
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-2">{product.productSubCategory}</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="text-base sm:text-lg font-bold text-green-600">{product.margin}%</div>
                        <div className="text-xs text-muted-foreground">Margin</div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="text-base sm:text-lg font-bold text-blue-600">{variant.inventory}</div>
                        <div className="text-xs text-muted-foreground">Stock</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs Navigation */}
              <Tabs defaultValue="overview" className="w-full">
                <CardHeader className="pb-3">
                <TabsList className="w-full h-auto sm:h-12 flex flex-wrap sm:grid sm:grid-cols-6 gap-2 sm:gap-0 bg-muted/30 p-1 sm:p-0">
                  <TabsTrigger value="overview" className="text-xs flex items-center gap-1 flex-1 sm:flex-none">
                      <Info className="h-3 w-3" />
                    <span>Overview</span>
                    </TabsTrigger>
                  <TabsTrigger value="variants" className="text-xs flex items-center gap-1 flex-1 sm:flex-none">
                      <Package className="h-3 w-3" />
                    <span>Variants</span>
                    </TabsTrigger>
                  <TabsTrigger value="reviews" className="text-xs flex items-center gap-1 flex-1 sm:flex-none">
                      <MessageSquare className="h-3 w-3" />
                    <span>Reviews</span>
                    </TabsTrigger>
                  <TabsTrigger value="channels" className="text-xs flex items-center gap-1 flex-1 sm:flex-none">
                      <Globe className="h-3 w-3" />
                    <span>Channels</span>
                    </TabsTrigger>
                  <TabsTrigger value="analytics" className="text-xs flex items-center gap-1 flex-1 sm:flex-none">
                      <BarChart3 className="h-3 w-3" />
                    <span>Analytics</span>
                    </TabsTrigger>
                  <TabsTrigger value="specs" className="text-xs flex items-center gap-1 flex-1 sm:flex-none">
                      <Award className="h-3 w-3" />
                    <span>Specs</span>
                    </TabsTrigger>
                  </TabsList>
                </CardHeader>

              <CardContent className="p-0 sm:pt-0">
                <TabsContent value="overview" className="space-y-4 sm:space-y-6 mt-0">
                    {/* Enhanced Description */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Product Description
                      </h3>
                      <div className="prose prose-sm max-w-none">
                        <p className="text-muted-foreground leading-relaxed text-base">
                          {product.description}
                        </p>
                      </div>
                    </div>

                    {/* Enhanced Key Features Grid */}
                    <div>
                      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        Key Features & Benefits
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        {product.attributes.highlightedFeatures.map((feature, index) => (
                          <Card key={index} className="border-2 border-muted hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md">
                            <CardContent className="p-4 sm:p-6">
                              <div className="flex items-start gap-4">
                                <div className="flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 bg-primary/10 rounded-xl flex-shrink-0">
                                  <Zap className="h-5 sm:h-6 w-5 sm:w-6 text-primary" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-base sm:text-lg mb-2">{feature.featureTitle}</h4>
                                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature.featureDescription}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Enhanced Product Details Grid */}
                    <div>
                      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                        <Layers className="h-4 w-4" />
                        Product Information
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                        <Card className="border-2 border-muted shadow-sm">
                          <CardContent className="p-3 sm:p-4 text-center">
                            <div className="flex items-center justify-center w-8 sm:w-10 h-8 sm:h-10 bg-blue-100 rounded-lg mx-auto mb-2 sm:mb-3">
                              <Tag className="h-4 sm:h-5 w-4 sm:w-5 text-blue-600" />
                            </div>
                            <div className="text-xs sm:text-sm text-muted-foreground mb-1">Category</div>
                            <div className="font-semibold text-sm sm:text-base">{product.productCategory}</div>
                          </CardContent>
                        </Card>
                        <Card className="border-2 border-muted shadow-sm">
                          <CardContent className="p-3 sm:p-4 text-center">
                            <div className="flex items-center justify-center w-8 sm:w-10 h-8 sm:h-10 bg-green-100 rounded-lg mx-auto mb-2 sm:mb-3">
                              <Package className="h-4 sm:h-5 w-4 sm:w-5 text-green-600" />
                            </div>
                            <div className="text-xs sm:text-sm text-muted-foreground mb-1">Weight</div>
                            <div className="font-semibold text-sm sm:text-base">{product.weightKg} kg</div>
                          </CardContent>
                        </Card>
                        <Card className="border-2 border-muted shadow-sm">
                          <CardContent className="p-3 sm:p-4 text-center">
                            <div className="flex items-center justify-center w-8 sm:w-10 h-8 sm:h-10 bg-purple-100 rounded-lg mx-auto mb-2 sm:mb-3">
                              <Award className="h-4 sm:h-5 w-4 sm:w-5 text-purple-600" />
                            </div>
                            <div className="text-xs sm:text-sm text-muted-foreground mb-1">Type</div>
                            <div className="font-semibold text-sm sm:text-base capitalize">{product.productType}</div>
                          </CardContent>
                        </Card>
                        <Card className="border-2 border-muted shadow-sm">
                          <CardContent className="p-3 sm:p-4 text-center">
                            <div className="flex items-center justify-center w-8 sm:w-10 h-8 sm:h-10 bg-orange-100 rounded-lg mx-auto mb-2 sm:mb-3">
                              <Shield className="h-4 sm:h-5 w-4 sm:w-5 text-orange-600" />
                            </div>
                            <div className="text-xs sm:text-sm text-muted-foreground mb-1">Brand</div>
                            <div className="font-semibold text-sm sm:text-base">{product.brand}</div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>

                <TabsContent value="variants" className="space-y-4 sm:space-y-6 mt-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        Product Variants
                      </h3>
                      <Button size="sm" className="gap-2 w-fit">
                        <Plus className="h-4 w-4" />
                        Add Variant
                      </Button>
                    </div>
                    
                    <Card className="border-2 border-muted hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <img
                                src={variant.media[0]}
                                alt={variant.title}
                                className="w-12 sm:w-16 h-12 sm:h-16 rounded-xl object-cover shadow-sm"
                              />
                              <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1">
                                Active
                              </Badge>
                            </div>
                            <div>
                              <h4 className="font-semibold text-base sm:text-lg">{variant.title}</h4>
                              <p className="text-xs sm:text-sm text-muted-foreground">SKU: {variant.SKU}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {variant.inventory} in stock
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-left sm:text-right">
                            <div className="font-bold text-xl sm:text-2xl">${variant.price}</div>
                            <div className="text-xs sm:text-sm text-muted-foreground">
                              {variant.margin}% margin • ${variant.profit} profit
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-sm">
                          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                            <div className="w-4 h-4 bg-black rounded-full"></div>
                            <div>
                              <div className="font-medium text-xs sm:text-sm">Color</div>
                              <div className="text-muted-foreground text-xs sm:text-sm">{variant.attributes.color}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                            <Package className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium text-xs sm:text-sm">Size</div>
                              <div className="text-muted-foreground text-xs sm:text-sm">{variant.attributes.size}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                            <DollarSign className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium text-xs sm:text-sm">Cost</div>
                              <div className="text-muted-foreground text-xs sm:text-sm">${variant.costPerItem}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                            <TrendingUp className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium text-xs sm:text-sm">Status</div>
                              <div className="text-green-600 font-medium text-xs sm:text-sm">{variant.status}</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                <TabsContent value="reviews" className="space-y-4 sm:space-y-6 mt-0">
                    {/* Reviews Header with Stats */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          Customer Reviews
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {product.totalReviews} reviews • {product.averageRating} average rating
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>

                    {/* Rating Overview */}
                    <Card className="border-2 border-muted shadow-sm">
                      <CardContent className="p-4 sm:p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                          <div className="text-center">
                            <div className="text-3xl sm:text-4xl font-bold mb-2">{product.averageRating}</div>
                            <div className="flex items-center justify-center gap-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(product.averageRating)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-muted-foreground'
                                  }`}
                                />
                              ))}
                            </div>
                            <div className="text-xs sm:text-sm text-muted-foreground">
                              Based on {product.totalReviews} reviews
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            {[5, 4, 3, 2, 1].map((rating) => (
                              <div key={rating} className="flex items-center gap-2">
                                <span className="text-xs sm:text-sm w-3">{rating}</span>
                                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                <Progress 
                                  value={rating === 5 ? 65 : rating === 4 ? 25 : rating === 3 ? 8 : rating === 2 ? 2 : 0} 
                                  className="flex-1 h-2" 
                                />
                                <span className="text-xs sm:text-sm text-muted-foreground w-6 sm:w-8">
                                  {rating === 5 ? '58' : rating === 4 ? '22' : rating === 3 ? '7' : rating === 2 ? '2' : '0'}
                                </span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                              <span className="text-xs sm:text-sm font-medium">Verified Purchases</span>
                              <Badge className="bg-green-100 text-green-800 text-xs">94%</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                              <span className="text-xs sm:text-sm font-medium">Would Recommend</span>
                              <Badge className="bg-blue-100 text-blue-800 text-xs">87%</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                              <span className="text-xs sm:text-sm font-medium">Repeat Customers</span>
                              <Badge className="bg-purple-100 text-purple-800 text-xs">23%</Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Featured Review */}
                    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent shadow-sm">
                      <CardHeader className="pb-3">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <Badge className="bg-primary/10 text-primary w-fit">Featured Review</Badge>
                          <Badge variant="outline" className="text-xs w-fit">Most Helpful</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-6">
                        <div className="space-y-4">
                          <div className="flex items-start gap-4">
                            <img
                              src={mainReview.customerAvatar}
                              alt={mainReview.customerName}
                              className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                                <h4 className="font-semibold text-sm sm:text-base">{mainReview.customerName}</h4>
                                {mainReview.verifiedPurchase && (
                                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200 w-fit">
                                    <Verified className="h-3 w-3 mr-1" />
                                    Verified Purchase
                                  </Badge>
                                )}
                              </div>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < Math.floor(mainReview.rating)
                                          ? 'text-yellow-400 fill-current'
                                          : 'text-muted-foreground'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs sm:text-sm text-muted-foreground">
                                  {new Date(mainReview.date).toLocaleDateString()}
                                </span>
                              </div>
                              <h5 className="font-medium mb-2 text-sm sm:text-base">{mainReview.title}</h5>
                              <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                                {mainReview.content}
                              </p>
                              
                              {/* Review Images */}
                              {mainReview.images && mainReview.images.length > 0 && (
                                <div className="flex gap-2 mb-4">
                                  {mainReview.images.map((image, index) => (
                                    <img
                                      key={index}
                                      src={image}
                                      alt={`Review image ${index + 1}`}
                                      className="w-12 sm:w-16 h-12 sm:h-16 rounded-lg object-cover border shadow-sm"
                                    />
                                  ))}
                                </div>
                              )}
                              
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                                <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground w-fit">
                                  <ThumbsUp className="h-4 w-4" />
                                  Helpful ({mainReview.helpful})
                                </button>
                                <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground w-fit">
                                  <ThumbsDown className="h-4 w-4" />
                                  Not helpful ({mainReview.notHelpful})
                                </button>
                                <span className="text-muted-foreground">Order: {mainReview.orderId}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Additional Reviews */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">Recent Reviews</h4>
                      {additionalReviews.map((review) => (
                        <Card key={review.id} className="border border-muted shadow-sm">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <img
                                src={review.customerAvatar}
                                alt={review.customerName}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h5 className="font-medium">{review.customerName}</h5>
                                  {review.verifiedPurchase && (
                                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                                      <Verified className="h-3 w-3 mr-1" />
                                      Verified
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-3 w-3 ${
                                          i < Math.floor(review.rating)
                                            ? 'text-yellow-400 fill-current'
                                            : 'text-muted-foreground'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(review.date).toLocaleDateString()}
                                  </span>
                                </div>
                                <h6 className="font-medium text-sm mb-1">{review.title}</h6>
                                <p className="text-sm text-muted-foreground mb-3">{review.content}</p>
                                <div className="flex items-center gap-3 text-xs">
                                  <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                                    <ThumbsUp className="h-3 w-3" />
                                    {review.helpful}
                                  </button>
                                  <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                                    <ThumbsDown className="h-3 w-3" />
                                    {review.notHelpful}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Load More Reviews */}
                    <div className="text-center">
                      <Button variant="outline" className="gap-2">
                        <Eye className="h-4 w-4" />
                        Load More Reviews
                      </Button>
                    </div>
                  </TabsContent>

                <TabsContent value="channels" className="space-y-4 sm:space-y-6 mt-0">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <h3 className="text-xl font-semibold">Sales Channels</h3>
                        </div>
                    <Button variant="default" size="sm" className="bg-black text-white hover:bg-black/90">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Channel
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Point of Sale */}
                    <div className="bg-white rounded-xl border border-border/60">
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-1">
                          <div className="bg-blue-50 p-2.5 rounded-lg">
                              <StoreIcon className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                            <h4 className="font-medium">Point of Sale</h4>
                            <p className="text-sm text-muted-foreground">In-store sales</p>
                            </div>
                          </div>
                        <div className="flex items-center mt-3">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-0 text-xs font-normal">
                            Active
                          </Badge>
                          </div>
                        </div>
                        
                      <div className="border-t border-border/60">
                        <div className="p-6 space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Custom Price</span>
                            <span className="font-semibold">${product.salesChannels.pos.pricing.customPrice}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Discount</span>
                            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-0 text-xs font-normal">
                              {product.salesChannels.pos.pricing.discount}% off
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Visibility</span>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-0 text-xs font-normal">
                              Visible
                            </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Online Store */}
                    <div className="bg-white rounded-xl border border-border/60">
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-1">
                          <div className="bg-green-50 p-2.5 rounded-lg">
                              <Globe className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                            <h4 className="font-medium">Online Store</h4>
                            <p className="text-sm text-muted-foreground">E-commerce website</p>
                            </div>
                          </div>
                        <div className="flex items-center mt-3">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-0 text-xs font-normal">
                            Active
                          </Badge>
                          </div>
                        </div>
                        
                      <div className="border-t border-border/60">
                        <div className="p-6 space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Base Price</span>
                            <span className="font-semibold">${product.basePrice}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Discount</span>
                            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-0 text-xs font-normal">
                              {product.salesChannels.onlineStore.pricing.discount}% off
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">SEO Status</span>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-0 text-xs font-normal">
                              Optimized
                            </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Marketplace */}
                    <div className="bg-white rounded-xl border border-border/60">
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-1">
                          <div className="bg-purple-50 p-2.5 rounded-lg">
                              <Smartphone className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                            <h4 className="font-medium">Marketplace</h4>
                            <p className="text-sm text-muted-foreground">eBay, Amazon</p>
                            </div>
                          </div>
                        <div className="flex items-center mt-3">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-0 text-xs font-normal">
                            Active
                          </Badge>
                          </div>
                        </div>
                        
                      <div className="border-t border-border/60">
                        <div className="p-6 space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">eBay ID</span>
                            <code className="text-xs bg-muted/50 px-2 py-1 rounded font-mono">
                              {product.salesChannels.marketplace.externalIds.ebay}
                            </code>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Amazon ID</span>
                            <code className="text-xs bg-muted/50 px-2 py-1 rounded font-mono">
                              {product.salesChannels.marketplace.externalIds.amazon}
                            </code>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Sync Status</span>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-0 text-xs font-normal">
                              Synced
                            </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                <TabsContent value="analytics" className="space-y-4 sm:space-y-6 mt-0">
                    <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Performance Analytics
                    </h3>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Last 30 days
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                      {/* Sales Performance */}
                    <Card className="border-2 border-muted shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg">
                              <TrendingUp className="h-4 w-4 text-green-600" />
                            </div>
                          <Badge variant="outline" className="text-xs">+12%</Badge>
                          </div>
                        <div className="space-y-2">
                          <div className="text-2xl font-bold">${(product.totalRevenue * 0.4 / 1000).toFixed(0)}k</div>
                          <div className="text-xs text-muted-foreground">Monthly Sales</div>
                          <Progress value={75} className="h-1" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Target: ${(product.totalRevenue * 0.53 / 1000).toFixed(0)}k</span>
                              <span>75%</span>
                            </div>
                          </div>
                      </CardContent>
                    </Card>

                      {/* Inventory Status */}
                    <Card className="border-2 border-muted shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                              <Package className="h-4 w-4 text-blue-600" />
                            </div>
                          <Badge variant="outline" className="text-xs">2.3x turnover</Badge>
                          </div>
                        <div className="space-y-2">
                          <div className="text-2xl font-bold">{variant.inventory}</div>
                          <div className="text-xs text-muted-foreground">Units in Stock</div>
                          <Progress value={62} className="h-1" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Reorder at: 50</span>
                              <span>62%</span>
                            </div>
                          </div>
                      </CardContent>
                    </Card>

                      {/* Traffic & Views */}
                    <Card className="border-2 border-muted shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg">
                              <Eye className="h-4 w-4 text-purple-600" />
                            </div>
                          <Badge variant="outline" className="text-xs">{product.conversionRate}% CVR</Badge>
                          </div>
                        <div className="space-y-2">
                          <div className="text-2xl font-bold">{(product.viewsThisMonth / 1000).toFixed(1)}k</div>
                          <div className="text-xs text-muted-foreground">Monthly Views</div>
                          <Progress value={85} className="h-1" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Unique: {(product.viewsThisMonth * 0.7 / 1000).toFixed(1)}k</span>
                              <span>85%</span>
                            </div>
                          </div>
                      </CardContent>
                    </Card>

                      {/* Customer Metrics */}
                    <Card className="border-2 border-muted shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-lg">
                              <Users className="h-4 w-4 text-orange-600" />
                            </div>
                          <Badge variant="outline" className="text-xs">{product.averageRating}★ rating</Badge>
                          </div>
                        <div className="space-y-2">
                          <div className="text-2xl font-bold">{product.totalReviews}</div>
                          <div className="text-xs text-muted-foreground">Total Reviews</div>
                          <Progress value={product.averageRating * 20} className="h-1" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Satisfaction</span>
                              <span>{product.averageRating * 20}%</span>
                            </div>
                          </div>
                      </CardContent>
                    </Card>
                    </div>

                    {/* Recent Activity Timeline */}
                  <Card className="border-2 border-muted shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-semibold flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                          {[
                            { 
                              action: "Large Sale", 
                              details: "15 units sold via Online Store", 
                              time: "2h ago", 
                              icon: DollarSign,
                              color: "green",
                              amount: "+$3,749.85"
                            },
                            { 
                              action: "Inventory Update", 
                              details: "Stock replenished: +100 units", 
                              time: "1d ago", 
                              icon: Package,
                              color: "blue",
                              amount: "348 total"
                            },
                            { 
                              action: "Price Optimization", 
                              details: "Price updated to $249.99", 
                              time: "3d ago", 
                              icon: TrendingUp,
                              color: "purple",
                              amount: "↑ 5.2%"
                            },
                            { 
                              action: "Review Alert", 
                              details: "New 5-star review received", 
                              time: "5d ago", 
                              icon: Star,
                              color: "yellow",
                              amount: "4.6★ avg"
                            }
                          ].map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                              <div className="flex items-center gap-4">
                                <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                              activity.color === 'green' ? 'bg-green-100' :
                              activity.color === 'blue' ? 'bg-blue-100' :
                              activity.color === 'purple' ? 'bg-purple-100' :
                              'bg-yellow-100'
                                }`}>
                                  <activity.icon className={`h-5 w-5 ${
                                    activity.color === 'green' ? 'text-green-600' :
                                    activity.color === 'blue' ? 'text-blue-600' :
                                    activity.color === 'purple' ? 'text-purple-600' :
                                    'text-yellow-600'
                                  }`} />
                                </div>
                                <div>
                              <div className="font-medium">{activity.action}</div>
                              <div className="text-sm text-muted-foreground">{activity.details}</div>
                                </div>
                              </div>
                              <div className="text-right">
                            <div className="font-semibold">{activity.amount}</div>
                            <div className="text-xs text-muted-foreground">{activity.time}</div>
                              </div>
                            </div>
                          ))}
                    </CardContent>
                  </Card>
                  </TabsContent>

                <TabsContent value="specs" className="space-y-4 sm:space-y-6 mt-0">
                    {/* Technical Specifications */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
                      <Card className="shadow-sm">
                        <CardContent className="p-0">
                          <div className="divide-y">
                            {Object.entries(product.attributes.specifications).map(([key, value], index) => (
                              <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 gap-1 sm:gap-0">
                                <span className="text-muted-foreground capitalize text-sm sm:text-base">{key.replace(/([A-Z])/g, ' $1')}</span>
                                <span className="font-medium text-sm sm:text-base">{value}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Features */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Features</h3>
                      <Card className="shadow-sm">
                        <CardContent className="p-0">
                          <div className="divide-y">
                            {Object.entries(product.attributes.features).map(([key, value], index) => (
                              <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 gap-1 sm:gap-0">
                                <span className="text-muted-foreground capitalize text-sm sm:text-base">{key.replace(/([A-Z])/g, ' $1')}</span>
                                <span className="font-medium text-sm sm:text-base">{value}</span>
                              </div>
                            ))}
                          </div>

                          
                        </CardContent>
                      </Card>
                    </div>

                    {/* Dimensions */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Dimensions & Weight</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                        {[
                          { label: "Length", value: product.lengthCm, unit: "cm" },
                          { label: "Width", value: product.widthCm, unit: "cm" },
                          { label: "Height", value: product.heightCm, unit: "cm" },
                          { label: "Weight", value: product.weightKg, unit: "kg" }
                        ].map((item, index) => (
                          <Card key={index} className="shadow-sm">
                            <CardContent className="p-3 sm:p-4 text-center">
                              <div className="text-xl sm:text-2xl font-bold mb-1">{item.value}</div>
                              <div className="text-xs sm:text-sm text-muted-foreground">{item.label} ({item.unit})</div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </CardContent>
              </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
} 