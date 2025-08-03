'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Clock, 
  Settings, 
  Shield,
  Save,
  CheckCircle
} from 'lucide-react';

export function SessionTimeoutSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [timeoutValue, setTimeoutValue] = useState('24');
  const [timeoutUnit, setTimeoutUnit] = useState('hours');
  const [autoLogout, setAutoLogout] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate success
      setIsOpen(false);
      console.log('Session timeout settings saved');
      
    } catch (err) {
      console.error('Failed to save settings:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const timeoutOptions = [
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '1', label: '1 hour' },
    { value: '4', label: '4 hours' },
    { value: '8', label: '8 hours' },
    { value: '24', label: '24 hours' },
    { value: '168', label: '1 week' },
    { value: '720', label: '1 month' }
  ];

  const unitOptions = [
    { value: 'minutes', label: 'Minutes' },
    { value: 'hours', label: 'Hours' },
    { value: 'days', label: 'Days' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Session Timeout Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Configure how long your session remains active before automatic logout.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Session Timeout</Label>
            <div className="flex gap-2">
              <Select value={timeoutValue} onValueChange={setTimeoutValue}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeoutOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={timeoutUnit} onValueChange={setTimeoutUnit}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {unitOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Logout</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically log out when session expires
                </p>
              </div>
              <Switch
                checked={autoLogout}
                onCheckedChange={setAutoLogout}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Remember Me</Label>
                <p className="text-sm text-muted-foreground">
                  Extend session timeout when active
                </p>
              </div>
              <Switch
                checked={rememberMe}
                onCheckedChange={setRememberMe}
              />
            </div>
          </div>

          <div className="pt-4">
            <Button
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
                  Save Settings
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 