'use client';

import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Edit, Save, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface CustomFieldsFormProps {
  data: { [key: string]: string };
  onChange: (value: { [key: string]: string }) => void;
}

const CustomFieldsForm: React.FC<CustomFieldsFormProps> = ({ data, onChange }) => {
  const [isAddingField, setIsAddingField] = useState(false);
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldValue, setNewFieldValue] = useState('');
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleAddField = () => {
    if (newFieldName.trim() && newFieldValue.trim()) {
      const updatedData = {
        ...data,
        [newFieldName.trim()]: newFieldValue.trim()
      };
      onChange(updatedData);
      setNewFieldName('');
      setNewFieldValue('');
      setIsAddingField(false);
    }
  };

  const handleEditField = (fieldName: string) => {
    setEditingField(fieldName);
    setEditValue(data[fieldName]);
  };

  const handleSaveEdit = () => {
    if (editingField && editValue.trim()) {
      const updatedData = {
        ...data,
        [editingField]: editValue.trim()
      };
      onChange(updatedData);
      setEditingField(null);
      setEditValue('');
    }
  };

  const handleDeleteField = (fieldName: string) => {
    const updatedData = { ...data };
    delete updatedData[fieldName];
    onChange(updatedData);
  };

  const handleCancelEdit = () => {
    setEditingField(null);
    setEditValue('');
  };

  return (
    <div className="space-y-6">
      {/* Existing Custom Fields */}
      <div className="space-y-4">
        {Object.entries(data).map(([fieldName, fieldValue]) => (
          <Card key={fieldName} className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  {editingField === fieldName ? (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        {fieldName}
                      </Label>
                      <div className="flex space-x-2">
                        <Input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="flex-1"
                          placeholder="Enter value"
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
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Label className="text-sm font-medium text-gray-700">
                          {fieldName}
                        </Label>
                        <Badge variant="outline" className="text-xs">
                          Custom Field
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        {fieldValue}
                      </div>
                    </div>
                  )}
                </div>
                {editingField !== fieldName && (
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditField(fieldName)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteField(fieldName)}
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

      {/* Add New Custom Field */}
      <Dialog open={isAddingField} onOpenChange={setIsAddingField}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full border-dashed border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Custom Field
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Custom Field</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fieldName" className="text-sm font-medium text-gray-700">
                Field Name
              </Label>
              <Input
                id="fieldName"
                value={newFieldName}
                onChange={(e) => setNewFieldName(e.target.value)}
                placeholder="e.g., Roast Level, Origin, Grind Type"
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fieldValue" className="text-sm font-medium text-gray-700">
                Field Value
              </Label>
              <Input
                id="fieldValue"
                value={newFieldValue}
                onChange={(e) => setNewFieldValue(e.target.value)}
                placeholder="e.g., Dark, Ethiopia, Whole Bean"
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddingField(false);
                  setNewFieldName('');
                  setNewFieldValue('');
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddField}
                disabled={!newFieldName.trim() || !newFieldValue.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Add Field
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quick Add Suggestions */}
      {Object.keys(data).length === 0 && (
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Suggested Custom Fields</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  { name: 'Roast Level', value: 'Dark' },
                  { name: 'Origin', value: 'Ethiopia' },
                  { name: 'Grind Type', value: 'Whole Bean' },
                  { name: 'Flavor Profile', value: 'Bold & Rich' },
                  { name: 'Caffeine Content', value: 'High' },
                  { name: 'Certification', value: 'Organic' }
                ].map((suggestion) => (
                  <Button
                    key={suggestion.name}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setNewFieldName(suggestion.name);
                      setNewFieldValue(suggestion.value);
                      setIsAddingField(true);
                    }}
                    className="justify-start text-left h-auto p-2"
                  >
                    <div>
                      <div className="font-medium text-sm">{suggestion.name}</div>
                      <div className="text-xs text-gray-500">{suggestion.value}</div>
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
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Custom Fields Summary</h4>
                <p className="text-sm text-gray-600">
                  {Object.keys(data).length} custom field{Object.keys(data).length !== 1 ? 's' : ''} added
                </p>
              </div>
              <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
                {Object.keys(data).length} fields
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CustomFieldsForm; 