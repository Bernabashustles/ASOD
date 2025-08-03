'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Phone, 
  Edit, 
  Save, 
  X, 
  CheckCircle,
  AlertCircle,
  Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PhoneInputProps {
  field: string;
  value?: string;
  onUpdate: (data: any) => void;
}

const countryCodes = [
  { code: '+1', country: 'US', flag: '🇺🇸' },
  { code: '+44', country: 'GB', flag: '🇬🇧' },
  { code: '+33', country: 'FR', flag: '🇫🇷' },
  { code: '+49', country: 'DE', flag: '🇩🇪' },
  { code: '+81', country: 'JP', flag: '🇯🇵' },
  { code: '+86', country: 'CN', flag: '🇨🇳' },
  { code: '+91', country: 'IN', flag: '🇮🇳' },
  { code: '+61', country: 'AU', flag: '🇦🇺' },
  { code: '+55', country: 'BR', flag: '🇧🇷' },
  { code: '+7', country: 'RU', flag: '🇷🇺' },
];

export function PhoneInput({ field, value = '', onUpdate }: PhoneInputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [countryCode, setCountryCode] = useState('+1');
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
    if (!editValue.trim()) {
      setError('Phone number is required');
      return;
    }

    if (!isValidPhone(editValue)) {
      setError('Please enter a valid phone number');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the field
      const fieldName = field.split('.').pop() || field;
      onUpdate({ [fieldName]: `${countryCode}${editValue}` });
      
      setIsEditing(false);
    } catch (err) {
      setError('Failed to save phone number. Please try again.');
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

  const isValidPhone = (phone: string) => {
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 7 && digits.length <= 15;
  };

  const formatPhoneNumber = (phone: string) => {
    if (!phone) return '';
    
    // Remove country code for display
    const withoutCode = phone.replace(/^\+\d{1,3}/, '');
    
    // Format based on length
    const digits = withoutCode.replace(/\D/g, '');
    if (digits.length === 10) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    } else if (digits.length === 11) {
      return `+${digits.slice(0, 1)} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
    }
    
    return withoutCode;
  };

  const getCountryCodeFromPhone = (phone: string) => {
    for (const country of countryCodes) {
      if (phone.startsWith(country.code)) {
        return country.code;
      }
    }
    return '+1';
  };

  const getCountryFlag = (code: string) => {
    const country = countryCodes.find(c => c.code === code);
    return country?.flag || '🌍';
  };

  return (
    <Card className="border">
      <CardContent className="pt-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Number
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
              <div className="flex gap-0">
                <Select 
                  value={countryCode} 
                  onValueChange={setCountryCode}
                >
                  <SelectTrigger className="w-24 rounded-l-md rounded-r-none border-r-0">
                    <SelectValue>
                      <div className="flex items-center gap-1">
                        <span>{getCountryFlag(countryCode)}</span>
                        <span className="text-xs">{countryCode}</span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {countryCodes.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        <div className="flex items-center gap-2">
                          <span>{country.flag}</span>
                          <span>{country.code}</span>
                          <span className="text-xs text-muted-foreground">
                            {country.country}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Input
                  type="tel"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Enter phone number"
                  className={cn(
                    "rounded-l-none rounded-r-md border-l-0 flex-1",
                    error && "border-destructive focus-visible:ring-destructive"
                  )}
                  autoFocus
                />
              </div>
              
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
              {value ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-sm font-medium">
                    {formatPhoneNumber(value)}
                  </span>
                  <span className="text-xs">
                    {getCountryFlag(getCountryCodeFromPhone(value))}
                  </span>
                </div>
              ) : (
                <span className="text-sm text-muted-foreground italic">
                  No phone number set
                </span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 