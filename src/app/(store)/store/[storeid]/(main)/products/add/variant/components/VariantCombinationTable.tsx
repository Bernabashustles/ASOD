'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Copy, 
  Eye, 
  Settings, 
  Filter, 
  Search, 
  Grid3X3, 
  List, 
  Download,
  Upload,
  RefreshCw,
  Zap
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface VariantAttribute {
  name: string;
  values: string[];
}

interface VariantCombination {
  id: string;
  attributes: { [key: string]: string };
  price: number;
  comparePrice: number;
  sku: string;
  barcode: string;
  weight: number;
  isActive: boolean;
  inventory: number;
  images: string[];
}

interface VariantCombinationTableProps {
  attributes: VariantAttribute[];
  combinations: VariantCombination[];
  onCombinationsChange: (combinations: VariantCombination[]) => void;
}

const VariantCombinationTable: React.FC<VariantCombinationTableProps> = ({
  attributes,
  combinations,
  onCombinationsChange
}) => {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCombinations, setSelectedCombinations] = useState<string[]>([]);
  const [isBulkEditing, setIsBulkEditing] = useState(false);
  const [bulkPrice, setBulkPrice] = useState<number>(0);
  const [bulkInventory, setBulkInventory] = useState<number>(0);
  const [filterAttribute, setFilterAttribute] = useState<string>('all');
  const [filterValue, setFilterValue] = useState<string>('all');

  // Generate all possible combinations
  const generateCombinations = useMemo(() => {
    if (attributes.length === 0) return [];

    const generateCombos = (attrs: VariantAttribute[], index: number = 0, current: { [key: string]: string } = {}): { [key: string]: string }[] => {
      if (index === attrs.length) {
        return [current];
      }

      const attr = attrs[index];
      const results: { [key: string]: string }[] = [];

      for (const value of attr.values) {
        const newCurrent = { ...current, [attr.name]: value };
        results.push(...generateCombos(attrs, index + 1, newCurrent));
      }

      return results;
    };

    return generateCombos(attributes);
  }, [attributes]);

  // Create or update combinations
  const updateCombinations = () => {
    const newCombinations: VariantCombination[] = generateCombinations.map((combo, index) => {
      const existing = combinations.find(c => 
        Object.keys(combo).every(key => c.attributes[key] === combo[key])
      );

      if (existing) {
        return existing;
      }

      return {
        id: `combo-${Date.now()}-${index}`,
        attributes: combo,
        price: 0,
        comparePrice: 0,
        sku: generateSKU(combo),
        barcode: generateBarcode(combo),
        weight: 0,
        isActive: true,
        inventory: 0,
        images: []
      };
    });

    onCombinationsChange(newCombinations);
  };

  const generateSKU = (combo: { [key: string]: string }) => {
    const parts = Object.entries(combo).map(([key, value]) => 
      `${key.substring(0, 3).toUpperCase()}-${value.substring(0, 3).toUpperCase()}`
    );
    return parts.join('-');
  };

  const generateBarcode = (combo: { [key: string]: string }) => {
    return `123456789${Math.random().toString().substring(2, 8)}`;
  };

  const handleBulkUpdate = () => {
    const updatedCombinations = combinations.map(combo => {
      if (selectedCombinations.includes(combo.id)) {
        return {
          ...combo,
          price: bulkPrice > 0 ? bulkPrice : combo.price,
          inventory: bulkInventory > 0 ? bulkInventory : combo.inventory
        };
      }
      return combo;
    });
    onCombinationsChange(updatedCombinations);
    setIsBulkEditing(false);
    setSelectedCombinations([]);
  };

  const toggleCombinationSelection = (id: string) => {
    setSelectedCombinations(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const toggleAllSelections = () => {
    if (selectedCombinations.length === combinations.length) {
      setSelectedCombinations([]);
    } else {
      setSelectedCombinations(combinations.map(c => c.id));
    }
  };

  const filteredCombinations = combinations.filter(combo => {
    const matchesSearch = Object.values(combo.attributes).some(value =>
      value.toLowerCase().includes(searchQuery.toLowerCase())
    ) || combo.sku.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filterAttribute === 'all' || filterValue === 'all' || 
      combo.attributes[filterAttribute] === filterValue;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-gray-900">Variant Combinations</h3>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {combinations.length} combinations
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === 'table' ? 'grid' : 'table')}
            className="border-gray-200 hover:bg-gray-50"
          >
            {viewMode === 'table' ? <Grid3X3 className="h-4 w-4" /> : <List className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={updateCombinations}
            className="border-gray-200 hover:bg-gray-50"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Generate
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsBulkEditing(true)}
            disabled={selectedCombinations.length === 0}
            className="border-gray-200 hover:bg-gray-50"
          >
            <Settings className="h-4 w-4 mr-1" />
            Bulk Edit
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search combinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-gray-200 focus:border-gray-400 focus:ring-gray-400"
          />
        </div>
        <Select value={filterAttribute} onValueChange={setFilterAttribute}>
          <SelectTrigger className="w-48 border-gray-200 focus:border-gray-400 focus:ring-gray-400">
            <SelectValue placeholder="Filter by attribute" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Attributes</SelectItem>
            {attributes.map(attr => (
              <SelectItem key={attr.name} value={attr.name}>{attr.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterValue} onValueChange={setFilterValue}>
          <SelectTrigger className="w-48 border-gray-200 focus:border-gray-400 focus:ring-gray-400">
            <SelectValue placeholder="Filter by value" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Values</SelectItem>
            {filterAttribute !== 'all' && attributes
              .find(attr => attr.name === filterAttribute)
              ?.values.map(value => (
                <SelectItem key={value} value={value}>{value}</SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      {/* Bulk Edit Dialog */}
      <Dialog open={isBulkEditing} onOpenChange={setIsBulkEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bulk Edit {selectedCombinations.length} Combinations</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Price</label>
              <Input
                type="number"
                step="0.01"
                value={bulkPrice}
                onChange={(e) => setBulkPrice(parseFloat(e.target.value) || 0)}
                placeholder="Leave empty to keep current"
                className="border-gray-200 focus:border-gray-400 focus:ring-gray-400"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Inventory</label>
              <Input
                type="number"
                value={bulkInventory}
                onChange={(e) => setBulkInventory(parseInt(e.target.value) || 0)}
                placeholder="Leave empty to keep current"
                className="border-gray-200 focus:border-gray-400 focus:ring-gray-400"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsBulkEditing(false)} className="border-gray-200 hover:bg-gray-50">
                Cancel
              </Button>
              <Button onClick={handleBulkUpdate} className="bg-gray-900 hover:bg-gray-800 text-white">
                Update {selectedCombinations.length} items
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Table View */}
      {viewMode === 'table' && (
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedCombinations.length === combinations.length && combinations.length > 0}
                      onCheckedChange={toggleAllSelections}
                    />
                  </TableHead>
                  <TableHead>Combination</TableHead>
                  {attributes.map(attr => (
                    <TableHead key={attr.name}>{attr.name}</TableHead>
                  ))}
                  <TableHead>Price</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Inventory</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCombinations.map((combo) => (
                  <TableRow key={combo.id} className="hover:bg-gray-50">
                    <TableCell>
                      <Checkbox
                        checked={selectedCombinations.includes(combo.id)}
                        onCheckedChange={() => toggleCombinationSelection(combo.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(combo.attributes).map(([key, value]) => (
                          <Badge 
                            key={key} 
                            variant="outline" 
                            className="text-xs bg-gray-200 text-gray-900 border-gray-300"
                          >
                            {value}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    {attributes.map(attr => (
                      <TableCell key={attr.name}>
                        <span className="font-medium">{combo.attributes[attr.name]}</span>
                      </TableCell>
                    ))}
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-bold text-gray-900">${combo.price}</div>
                        {combo.comparePrice > combo.price && (
                          <div className="text-xs text-gray-500 line-through">${combo.comparePrice}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">{combo.sku}</code>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{combo.inventory}</span>
                        <Badge 
                          variant={combo.inventory > 0 ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {combo.inventory > 0 ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={combo.isActive}
                        onCheckedChange={(checked) => {
                          const updated = combinations.map(c => 
                            c.id === combo.id ? { ...c, isActive: checked } : c
                          );
                          onCombinationsChange(updated);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button size="sm" variant="ghost" className="hover:bg-gray-100">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:bg-gray-100">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:bg-gray-100">
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCombinations.map((combo) => (
            <Card key={combo.id} className="hover:shadow-md transition-shadow bg-white border-gray-200">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedCombinations.includes(combo.id)}
                        onCheckedChange={() => toggleCombinationSelection(combo.id)}
                      />
                      <Switch
                        checked={combo.isActive}
                        onCheckedChange={(checked) => {
                          const updated = combinations.map(c => 
                            c.id === combo.id ? { ...c, isActive: checked } : c
                          );
                          onCombinationsChange(updated);
                        }}
                      />
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button size="sm" variant="ghost" className="hover:bg-gray-100">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="hover:bg-gray-100">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(combo.attributes).map(([key, value]) => (
                        <Badge 
                          key={key} 
                          variant="outline" 
                          className="text-xs bg-gray-200 text-gray-900 border-gray-300"
                        >
                          {value}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Price</span>
                      <span className="font-bold text-gray-900">${combo.price}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">SKU</span>
                      <code className="text-xs bg-gray-100 px-1 rounded">{combo.sku}</code>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Stock</span>
                      <Badge 
                        variant={combo.inventory > 0 ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {combo.inventory} units
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{combinations.length}</div>
              <div className="text-xs text-gray-600">Total Combinations</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {combinations.filter(c => c.isActive).length}
              </div>
              <div className="text-xs text-gray-600">Active</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {combinations.filter(c => c.inventory > 0).length}
              </div>
              <div className="text-xs text-gray-600">In Stock</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                ${combinations.reduce((sum, c) => sum + c.price, 0).toFixed(2)}
              </div>
              <div className="text-xs text-gray-600">Total Value</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VariantCombinationTable; 