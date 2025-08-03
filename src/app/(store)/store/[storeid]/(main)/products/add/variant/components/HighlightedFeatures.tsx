'use client';

import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Edit, Save, Trash2, Star, Award, Zap, Heart, Shield, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface HighlightedFeature {
  title: string;
  description: string;
  icon: string;
}

interface HighlightedFeaturesProps {
  data: HighlightedFeature[];
  onChange: (value: HighlightedFeature[]) => void;
}

const HighlightedFeatures: React.FC<HighlightedFeaturesProps> = ({ data, onChange }) => {
  const [isAddingFeature, setIsAddingFeature] = useState(false);
  const [newFeature, setNewFeature] = useState<HighlightedFeature>({
    title: '',
    description: '',
    icon: 'Star'
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editFeature, setEditFeature] = useState<HighlightedFeature>({
    title: '',
    description: '',
    icon: 'Star'
  });

  const iconOptions = [
    { value: 'Star', label: 'Star', icon: <Star className="h-4 w-4" /> },
    { value: 'Award', label: 'Award', icon: <Award className="h-4 w-4" /> },
    { value: 'Zap', label: 'Zap', icon: <Zap className="h-4 w-4" /> },
    { value: 'Heart', label: 'Heart', icon: <Heart className="h-4 w-4" /> },
    { value: 'Shield', label: 'Shield', icon: <Shield className="h-4 w-4" /> },
    { value: 'CheckCircle', label: 'Check Circle', icon: <CheckCircle className="h-4 w-4" /> }
  ];

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Star': return <Star className="h-4 w-4" />;
      case 'Award': return <Award className="h-4 w-4" />;
      case 'Zap': return <Zap className="h-4 w-4" />;
      case 'Heart': return <Heart className="h-4 w-4" />;
      case 'Shield': return <Shield className="h-4 w-4" />;
      case 'CheckCircle': return <CheckCircle className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const handleAddFeature = () => {
    if (newFeature.title.trim() && newFeature.description.trim()) {
      onChange([...data, { ...newFeature }]);
      setNewFeature({ title: '', description: '', icon: 'Star' });
      setIsAddingFeature(false);
    }
  };

  const handleEditFeature = (index: number) => {
    setEditingIndex(index);
    setEditFeature({ ...data[index] });
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null && editFeature.title.trim() && editFeature.description.trim()) {
      const updatedData = [...data];
      updatedData[editingIndex] = { ...editFeature };
      onChange(updatedData);
      setEditingIndex(null);
      setEditFeature({ title: '', description: '', icon: 'Star' });
    }
  };

  const handleDeleteFeature = (index: number) => {
    const updatedData = data.filter((_, i) => i !== index);
    onChange(updatedData);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditFeature({ title: '', description: '', icon: 'Star' });
  };

  return (
    <div className="space-y-6">
      {/* Existing Features */}
      <div className="space-y-4">
        {data.map((feature, index) => (
          <Card key={index} className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  {editingIndex === index ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Label className="text-sm font-medium text-gray-700">
                          Feature Title
                        </Label>
                        <Select value={editFeature.icon} onValueChange={(value) => setEditFeature({ ...editFeature, icon: value })}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {iconOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                <div className="flex items-center space-x-2">
                                  {option.icon}
                                  <span>{option.label}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Input
                        value={editFeature.title}
                        onChange={(e) => setEditFeature({ ...editFeature, title: e.target.value })}
                        placeholder="Feature title"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                      <Textarea
                        value={editFeature.description}
                        onChange={(e) => setEditFeature({ ...editFeature, description: e.target.value })}
                        placeholder="Feature description"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        rows={2}
                      />
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={handleSaveEdit}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Save className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCancelEdit}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-2">
                          {getIconComponent(feature.icon)}
                          <Label className="text-sm font-medium text-gray-700">
                            {feature.title}
                          </Label>
                        </div>
                        <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
                          Featured
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        {feature.description}
                      </div>
                    </div>
                  )}
                </div>
                {editingIndex !== index && (
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditFeature(index)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteFeature(index)}
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

      {/* Add New Feature */}
      <Dialog open={isAddingFeature} onOpenChange={setIsAddingFeature}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full border-dashed border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Feature
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Highlighted Feature</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Icon
              </Label>
              <Select value={newFeature.icon} onValueChange={(value) => setNewFeature({ ...newFeature, icon: value })}>
                <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center space-x-2">
                        {option.icon}
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="featureTitle" className="text-sm font-medium text-gray-700">
                Feature Title
              </Label>
              <Input
                id="featureTitle"
                value={newFeature.title}
                onChange={(e) => setNewFeature({ ...newFeature, title: e.target.value })}
                placeholder="e.g., Premium Quality, Hand-selected beans"
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="featureDescription" className="text-sm font-medium text-gray-700">
                Feature Description
              </Label>
              <Textarea
                id="featureDescription"
                value={newFeature.description}
                onChange={(e) => setNewFeature({ ...newFeature, description: e.target.value })}
                placeholder="Describe the feature in detail"
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                rows={3}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddingFeature(false);
                  setNewFeature({ title: '', description: '', icon: 'Star' });
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddFeature}
                disabled={!newFeature.title.trim() || !newFeature.description.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Add Feature
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quick Add Suggestions */}
      {data.length === 0 && (
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Suggested Features</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  { title: 'Premium Quality', description: 'Hand-selected beans', icon: 'Star' },
                  { title: 'Fresh Roasted', description: 'Roasted to order', icon: 'Zap' },
                  { title: 'Organic Certified', description: '100% organic beans', icon: 'Shield' },
                  { title: 'Customer Favorite', description: 'Top-rated by customers', icon: 'Heart' },
                  { title: 'Award Winning', description: 'Industry recognized quality', icon: 'Award' },
                  { title: 'Quality Guaranteed', description: 'Satisfaction guaranteed', icon: 'CheckCircle' }
                ].map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setNewFeature(suggestion);
                      setIsAddingFeature(true);
                    }}
                    className="justify-start text-left h-auto p-2"
                  >
                    <div className="flex items-center space-x-2">
                      {getIconComponent(suggestion.icon)}
                      <div>
                        <div className="font-medium text-sm">{suggestion.title}</div>
                        <div className="text-xs text-gray-500">{suggestion.description}</div>
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
      {data.length > 0 && (
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Features Summary</h4>
                <p className="text-sm text-gray-600">
                  {data.length} highlighted feature{data.length !== 1 ? 's' : ''} added
                </p>
              </div>
              <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-300">
                {data.length} features
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HighlightedFeatures; 