'use client';

import React from 'react';
import { 
  Package, 
  MapPin, 
  Phone,
  Building2,
  TruckIcon,
  Scale,
  ArrowLeft,
  Printer,
  Box,
  DollarSign,
  Calendar,
  ShoppingBag
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

// Mock data - replace with actual data fetching
const shipmentData = {
  id: 'SHP001',
  orderId: '#1001',
  orderDate: '2024-02-19T15:30:00',
  customer: {
    name: 'John Doe',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    company: 'Acme Corp',
    email: 'john.doe@example.com'
  },
  carrier: 'Axova',
  trackingNumber: '1234567890',
  totalWeight: '2.5 kg',
  dimensions: '30 x 20 x 15 cm',
  shippedDate: '2024-02-20T10:00:00',
  deliveryInstructions: 'Please handle with care. Leave at front door if no answer.',
  items: [
    {
      id: 'ITEM001',
      name: 'Premium Wireless Headphones',
      sku: 'HD-001',
      quantity: 2,
      price: 49.99,
      total: 99.98
    },
    {
      id: 'ITEM002',
      name: 'Ergonomic Wireless Mouse',
      sku: 'MS-002',
      quantity: 1,
      price: 29.99,
      total: 29.99
    },
    {
      id: 'ITEM003',
      name: 'USB-C Fast Charging Cable',
      sku: 'CB-003',
      quantity: 3,
      price: 12.99,
      total: 38.97
    }
  ],
  pricing: {
    subtotal: 168.94,
    shipping: 12.99,
    tax: 16.89,
    total: 198.82
  }
};

export default function PrintLabelPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 print:bg-white print:p-0">
      {/* Header */}
      <div className="max-w-[800px] mx-auto mb-6 flex items-center justify-between print:hidden">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-semibold">Packing Slip</h1>
        </div>
        <Button onClick={() => window.print()} className="gap-2">
          <Printer className="w-4 h-4" />
          Print Slip
        </Button>
      </div>

      {/* Packing Slip */}
      <div className="max-w-[800px] mx-auto print:max-w-none">
        <Card className="border-2 print:border print:shadow-none print:m-5">
          <CardContent className="p-6 sm:p-8">
            {/* Header with Logo and Order Info */}
            <div className="flex justify-between items-start mb-8 pb-6 border-b">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">PACKING SLIP</h2>
                  <p className="text-sm text-gray-500">Order #{shipmentData.orderId}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="space-y-1">
                  <div className="flex items-center justify-end gap-1 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    Order Date: {new Date(shipmentData.orderDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center justify-end gap-1 text-sm text-gray-500">
                    <TruckIcon className="w-4 h-4" />
                    Ship Date: {new Date(shipmentData.shippedDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Addresses Grid */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              {/* From Address */}
              <div className="border rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">From:</h3>
                <div className="space-y-1">
                  <p className="font-medium">Store Owner Dashboard</p>
                  <p className="text-sm">123 Business Street</p>
                  <p className="text-sm">Suite 100</p>
                  <p className="text-sm">New York, NY 10001</p>
                  <p className="text-sm">United States</p>
                  <p className="text-sm">+1 (555) 000-0000</p>
                </div>
              </div>

              {/* To Address */}
              <div className="border rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Ship To:</h3>
                <div className="space-y-1">
                  <p className="font-medium">{shipmentData.customer.name}</p>
                  {shipmentData.customer.company && (
                    <p className="text-sm">{shipmentData.customer.company}</p>
                  )}
                  <p className="text-sm">{shipmentData.customer.address}</p>
                  <p className="text-sm">{shipmentData.customer.phone}</p>
                  <p className="text-sm">{shipmentData.customer.email}</p>
                </div>
              </div>
            </div>

            {/* Shipping Details */}
            <div className="mb-8 border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-3">Shipping Information</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Carrier</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TruckIcon className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">{shipmentData.carrier}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Weight</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Scale className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">{shipmentData.totalWeight}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Dimensions</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Package className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">{shipmentData.dimensions}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tracking Number</p>
                  <p className="font-medium mt-1">{shipmentData.trackingNumber}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-3">Order Items</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Item</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">SKU</th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-gray-500">Qty</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Price</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {shipmentData.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Box className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-medium">{item.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">{item.sku}</td>
                        <td className="px-4 py-3 text-sm text-center">{item.quantity}</td>
                        <td className="px-4 py-3 text-sm text-right">${item.price.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm text-right font-medium">${item.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={3}></td>
                      <td className="px-4 py-2 text-sm text-right text-gray-500">Subtotal</td>
                      <td className="px-4 py-2 text-sm text-right font-medium">${shipmentData.pricing.subtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan={3}></td>
                      <td className="px-4 py-2 text-sm text-right text-gray-500">Shipping</td>
                      <td className="px-4 py-2 text-sm text-right font-medium">${shipmentData.pricing.shipping.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan={3}></td>
                      <td className="px-4 py-2 text-sm text-right text-gray-500">Tax</td>
                      <td className="px-4 py-2 text-sm text-right font-medium">${shipmentData.pricing.tax.toFixed(2)}</td>
                    </tr>
                    <tr className="border-t">
                      <td colSpan={3}></td>
                      <td className="px-4 py-2 text-right font-medium">Total</td>
                      <td className="px-4 py-2 text-right font-medium">${shipmentData.pricing.total.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Delivery Instructions */}
            {shipmentData.deliveryInstructions && (
              <div className="mb-8 border rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Delivery Instructions:</h3>
                <p className="text-sm text-gray-600">
                  {shipmentData.deliveryInstructions}
                </p>
              </div>
            )}

            {/* Footer */}
            <div className="text-center text-sm text-gray-500 border-t pt-6">
              <p>This is a packing slip only. For invoice, please refer to your email or account.</p>
              <p className="mt-1">Thank you for your business!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 