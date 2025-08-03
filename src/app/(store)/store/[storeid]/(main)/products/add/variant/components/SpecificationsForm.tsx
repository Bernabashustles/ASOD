'use client';

import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Edit, Save, Trash2, Zap, Droplets, Scale } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface SpecificationsFormProps {
  data: { [key: string]: string };
  onChange: (value: { [key: string]: string }) => void;
}

const SpecificationsForm: React.FC<SpecificationsFormProps> = ({ data, onChange }) => {
  const [isAddingSpec, setIsAddingSpec] = useState(false);
  const [newSpecName, setNewSpecName] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');
  const [editingSpec, setEditingSpec] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleAddSpec = () => {
    if (newSpecName.trim() && newSpecValue.trim()) {
      const updatedData = {
        ...data,
        [newSpecName.trim()]: newSpecValue.trim()
      };
      onChange(updatedData);
      setNewSpecName('');
      setNewSpecValue('');
      setIsAddingSpec(false);
    }
  };

  const handleEditSpec = (specName: string) => {
    setEditingSpec(specName);
    setEditValue(data[specName]);
  };

  const handleSaveEdit = () => {
    if (editingSpec && editValue.trim()) {
      const updatedData = {
        ...data,
        [editingSpec]: editValue.trim()
      };
      onChange(updatedData);
      setEditingSpec(null);
      setEditValue('');
    }
  };

  const handleDeleteSpec = (specName: string) => {
    const updatedData = { ...data };
    delete updatedData[specName];
    onChange(updatedData);
  };

  const handleCancelEdit = () => {
    setEditingSpec(null);
    setEditValue('');
  };

  const getSpecIcon = (specName: string) => {
    const name = specName.toLowerCase();
    if (name.includes('caffeine')) return <Zap className="h-4 w-4 text-yellow-500" />;
    if (name.includes('acidity')) return <Droplets className="h-4 w-4 text-blue-500" />;
    if (name.includes('body')) return <Scale className="h-4 w-4 text-purple-500" />;
    return <span className="w-4 h-4 bg-gray-300 rounded-full" />;
  };

  const getSpecColor = (specName: string) => {
    const name = specName.toLowerCase();
    if (name.includes('caffeine')) return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    if (name.includes('acidity')) return 'bg-blue-50 text-blue-700 border-blue-200';
    if (name.includes('body')) return 'bg-purple-50 text-purple-700 border-purple-200';
    return 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <div className="space-y-6">
      {/* Existing Specifications */}
      <div className="space-y-4">
        {Object.entries(data).map(([specName, specValue]) => (
          <Card key={specName} className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  {editingSpec === specName ? (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                        {getSpecIcon(specName)}
                        <span>{specName}</span>
                      </Label>
                      <div className="flex space-x-2">
                        <Input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="flex-1"
                          placeholder="Enter specification value"
                        />
                        <Button
                          size="sm"
                          onClick={handleSaveEdit}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCancelEdit}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                          {getSpecIcon(specName)}
                          <span>{specName}</span>
                        </Label>
                        <Badge variant="outline" className={`text-xs ${getSpecColor(specName)}`}>
                          Specification
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        {specValue}
                      </div>
                    </div>
                  )}
                </div>
                {editingSpec !== specName && (
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditSpec(specName)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteSpec(specName)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add New Specification */}
      <Dialog open={isAddingSpec} onOpenChange={setIsAddingSpec}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full border-dashed border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Specification
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Specification</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="specName" className="text-sm font-medium text-gray-700">
                Specification Name
              </Label>
              <Input
                id="specName"
                value={newSpecName}
                onChange={(e) => setNewSpecName(e.target.value)}
                placeholder="e.g., Caffeine, Acidity, Body"
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specValue" className="text-sm font-medium text-gray-700">
                Specification Value
              </Label>
              <Input
                id="specValue"
                value={newSpecValue}
                onChange={(e) => setNewSpecValue(e.target.value)}
                placeholder="e.g., High, Low, Full"
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddingSpec(false);
                  setNewSpecName('');
                  setNewSpecValue('');
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddSpec}
                disabled={!newSpecName.trim() || !newSpecValue.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Add Specification
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quick Add Suggestions */}
      {Object.keys(data).length === 0 && (
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-4">
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Suggested Specifications</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  { name: 'Caffeine', value: 'High', icon: <Zap className="h-4 w-4 text-yellow-500" /> },
                  { name: 'Acidity', value: 'Low', icon: <Droplets className="h-4 w-4 text-blue-500" /> },
                  { name: 'Body', value: 'Full', icon: <Scale className="h-4 w-4 text-purple-500" /> },
                  { name: 'Flavor Notes', value: 'Chocolate, Nutty', icon: <span className="w-4 h-4 bg-gray-300 rounded-full" /> },
                  { name: 'Processing', value: 'Washed', icon: <span className="w-4 h-4 bg-gray-300 rounded-full" /> },
                  { name: 'Altitude', value: '1500-2000m', icon: <span className="w-4 h-4 bg-gray-300 rounded-full" /> }
                ].map((suggestion) => (
                  <Button
                    key={suggestion.name}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setNewSpecName(suggestion.name);
                      setNewSpecValue(suggestion.value);
                      setIsAddingSpec(true);
                    }}
                    className="justify-start text-left h-auto p-2"
                  >
                    <div className="flex items-center space-x-2">
                      {suggestion.icon}
                      <div>
                        <div className="font-medium text-sm">{suggestion.name}</div>
                        <div className="text-xs text-gray-500">{suggestion.value}</div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary */}
      {Object.keys(data).length > 0 && (
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Specifications Summary</h4>
                <p className="text-sm text-gray-600">
                  {Object.keys(data).length} specification{Object.keys(data).length !== 1 ? 's' : ''} added
                </p>
              </div>
              <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-300">
                {Object.keys(data).length} specs
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SpecificationsForm; 