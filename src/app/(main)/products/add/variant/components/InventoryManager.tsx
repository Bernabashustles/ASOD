'use client';

import { useState } from 'react';
import { Package, AlertTriangle, TrendingUp, TrendingDown, BarChart3, Settings, RefreshCw, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

interface InventoryItem {
  id: string;
  sku: string;
  variant: string;
  quantity: number;
  reserved: number;
  available: number;
  lowStockThreshold: number;
  reorderPoint: number;
  reorderQuantity: number;
  location: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'backorder';
  lastUpdated: string;
}

export default function InventoryManager({ data, onChange }: { data: any; onChange: (data: any) => void }) {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([
    {
      id: '1',
      sku: 'PROD-RED-S',
      variant: 'Red, Small',
      quantity: 45,
      reserved: 5,
      available: 40,
      lowStockThreshold: 10,
      reorderPoint: 5,
      reorderQuantity: 50,
      location: 'Warehouse A',
      status: 'in-stock',
      lastUpdated: '2024-01-15',
    },
    {
      id: '2',
      sku: 'PROD-RED-M',
      variant: 'Red, Medium',
      quantity: 8,
      reserved: 2,
      available: 6,
      lowStockThreshold: 10,
      reorderPoint: 5,
      reorderQuantity: 50,
      location: 'Warehouse A',
      status: 'low-stock',
      lastUpdated: '2024-01-15',
    },
    {
      id: '3',
      sku: 'PROD-BLUE-L',
      variant: 'Blue, Large',
      quantity: 0,
      reserved: 0,
      available: 0,
      lowStockThreshold: 10,
      reorderPoint: 5,
      reorderQuantity: 50,
      location: 'Warehouse B',
      status: 'out-of-stock',
      lastUpdated: '2024-01-14',
    },
  ]);

  const [trackInventory, setTrackInventory] = useState(true);
  const [allowBackorders, setAllowBackorders] = useState(false);
  const [autoReorder, setAutoReorder] = useState(true);

  const updateInventory = (id: string, field: keyof InventoryItem, value: any) => {
    setInventoryItems(prev => prev.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        // Recalculate available quantity
        if (field === 'quantity' || field === 'reserved') {
          updated.available = updated.quantity - updated.reserved;
        }
        // Update status based on quantity
        if (updated.available <= 0) {
          updated.status = 'out-of-stock';
        } else if (updated.available <= updated.lowStockThreshold) {
          updated.status = 'low-stock';
        } else {
          updated.status = 'in-stock';
        }
        return updated;
      }
      return item;
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'bg-gray-100 text-gray-800';
      case 'low-stock': return 'bg-gray-200 text-gray-800';
      case 'out-of-stock': return 'bg-gray-300 text-gray-800';
      case 'backorder': return 'bg-gray-400 text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-stock': return '✅';
      case 'low-stock': return '⚠️';
      case 'out-of-stock': return '❌';
      case 'backorder': return '📦';
      default: return '❓';
    }
  };

  const totalItems = inventoryItems.length;
  const inStockItems = inventoryItems.filter(item => item.status === 'in-stock').length;
  const lowStockItems = inventoryItems.filter(item => item.status === 'low-stock').length;
  const outOfStockItems = inventoryItems.filter(item => item.status === 'out-of-stock').length;
  const totalQuantity = inventoryItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
          <p className="text-gray-600 mt-1">Track and manage your product inventory levels</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync Inventory
          </Button>
          <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
            <Zap className="h-4 w-4 mr-2" />
            Auto Reorder
          </Button>
        </div>
      </div>

      {/* Inventory Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-gray-50 to-gray-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-gray-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-gray-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12% from last month
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-gray-50 to-gray-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Stock</p>
                <p className="text-2xl font-bold text-gray-900">{inStockItems}</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-gray-600" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={(inStockItems / totalItems) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-gray-50 to-gray-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-gray-900">{lowStockItems}</p>
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-gray-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-gray-600">
                <TrendingDown className="h-4 w-4 mr-1" />
                Needs attention
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-gray-50 to-gray-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-gray-900">{outOfStockItems}</p>
              </div>
              <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-gray-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-gray-600">
                <TrendingDown className="h-4 w-4 mr-1" />
                Requires restocking
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Settings */}
      <Card className="border-0 shadow-sm bg-gradient-to-br from-gray-50 to-gray-100">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <span className="text-2xl">⚙️</span>
            Inventory Settings
          </CardTitle>
          <p className="text-gray-600 text-sm">Configure how inventory is tracked and managed</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Track inventory</Label>
                  <p className="text-xs text-gray-500">Automatically track stock levels</p>
                </div>
                <Switch checked={trackInventory} onCheckedChange={setTrackInventory} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Allow backorders</Label>
                  <p className="text-xs text-gray-500">Let customers order out-of-stock items</p>
                </div>
                <Switch checked={allowBackorders} onCheckedChange={setAllowBackorders} />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Auto reorder</Label>
                  <p className="text-xs text-gray-500">Automatically create purchase orders</p>
                </div>
                <Switch checked={autoReorder} onCheckedChange={setAutoReorder} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Low stock alerts</Label>
                  <p className="text-xs text-gray-500">Get notified when stock is low</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card className="border-0 shadow-sm bg-gradient-to-br from-gray-50 to-gray-100">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <span className="text-2xl">📊</span>
            Inventory Details
          </CardTitle>
          <p className="text-gray-600 text-sm">Detailed view of all inventory items and their status</p>
        </CardHeader>
        <CardContent>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>SKU</TableHead>
                  <TableHead>Variant</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryItems.map((item) => (
                  <TableRow key={item.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{item.sku}</TableCell>
                    <TableCell>{item.variant}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateInventory(item.id, 'quantity', parseInt(e.target.value) || 0)}
                          className="w-20 text-sm"
                        />
                        <span className="text-xs text-gray-500">reserved: {item.reserved}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{item.available}</span>
                        {item.available <= item.lowStockThreshold && (
                          <Badge variant="outline" className="text-xs text-yellow-600 border-yellow-200">
                            Low
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                        <span className="mr-1">{getStatusIcon(item.status)}</span>
                        {item.status.replace('-', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select value={item.location} onValueChange={(value) => updateInventory(item.id, 'location', value)}>
                        <SelectTrigger className="w-32 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Warehouse A">Warehouse A</SelectItem>
                          <SelectItem value="Warehouse B">Warehouse B</SelectItem>
                          <SelectItem value="Store 1">Store 1</SelectItem>
                          <SelectItem value="Store 2">Store 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">{item.lastUpdated}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-0 shadow-sm bg-gradient-to-br from-indigo-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            Quick Actions
          </CardTitle>
          <p className="text-gray-600 text-sm">Common inventory management tasks</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Package className="h-6 w-6" />
              <span>Bulk Update</span>
              <span className="text-xs text-gray-500">Update multiple items</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <BarChart3 className="h-6 w-6" />
              <span>Generate Report</span>
              <span className="text-xs text-gray-500">Export inventory data</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <AlertTriangle className="h-6 w-6" />
              <span>Low Stock Alert</span>
              <span className="text-xs text-gray-500">View items needing restock</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 