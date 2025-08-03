'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Edit, 
  Check, 
  X, 
  Save,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TextInputProps {
  label: string;
  field: string;
  value?: string;
  onUpdate: (data: any) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'tel' | 'url';
  required?: boolean;
  maxLength?: number;
}

export function TextInput({ 
  label, 
  field, 
  value = '', 
  onUpdate, 
  placeholder,
  type = 'text',
  required = false,
  maxLength
}: TextInputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEdit = () => {
    setEditValue(value);
    setIsEditing(true);
    setError(null);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
    setError(null);
  };

  const handleSave = async () => {
    if (required && !editValue.trim()) {
      setError('This field is required');
      return;
    }

    if (type === 'email' && editValue && !isValidEmail(editValue)) {
      setError('Please enter a valid email address');
      return;
    }

    if (type === 'tel' && editValue && !isValidPhone(editValue)) {
      setError('Please enter a valid phone number');
      return;
    }

    if (type === 'url' && editValue && !isValidUrl(editValue)) {
      setError('Please enter a valid URL');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the field
      const fieldName = field.split('.').pop() || field;
      onUpdate({ [fieldName]: editValue });
      
      setIsEditing(false);
    } catch (err) {
      setError('Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone: string) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <Card className="border">
      <CardContent className="pt-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor={field} className="text-sm font-medium">
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </Label>
            
            {!isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEdit}
                className="h-8 w-8 p-0"
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-3">
              <Input
                id={field}
                type={type}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={placeholder}
                maxLength={maxLength}
                className={cn(
                  error && "border-destructive focus-visible:ring-destructive"
                )}
                autoFocus
              />
              
              {maxLength && (
                <div className="text-xs text-muted-foreground text-right">
                  {editValue.length}/{maxLength}
                </div>
              )}
              
              {error && (
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save
                    </>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="min-h-[40px] flex items-center">
              <span className={cn(
                "text-sm",
                !value && "text-muted-foreground italic"
              )}>
                {value || placeholder || 'No value set'}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 