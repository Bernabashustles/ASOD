'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Key, 
  Plus, 
  Smartphone, 
  Monitor, 
  Tablet, 
  CheckCircle,
  AlertTriangle,
  Shield,
  Fingerprint
} from 'lucide-react';

export function AddPasskeyButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [passkeyName, setPasskeyName] = useState('');
  const [deviceType, setDeviceType] = useState('mobile');
  const [error, setError] = useState<string | null>(null);

  const handleAddPasskey = async () => {
    if (!passkeyName.trim()) {
      setError('Please enter a name for your passkey');
      return;
    }

    setIsAdding(true);
    setError(null);

    try {
      // Simulate WebAuthn registration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success
      setIsOpen(false);
      setPasskeyName('');
      setDeviceType('mobile');
      
      // You would typically call a callback here to update the parent component
      console.log('Passkey added successfully');
      
    } catch (err) {
      setError('Failed to add passkey. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

  const deviceTypes = [
    { value: 'mobile', label: 'Mobile Device', icon: Smartphone },
    { value: 'desktop', label: 'Desktop Computer', icon: Monitor },
    { value: 'tablet', label: 'Tablet', icon: Tablet },
    { value: 'other', label: 'Other Device', icon: Key }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Passkey
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Add New Passkey
          </DialogTitle>
          <DialogDescription>
            Create a new passkey for secure, passwordless authentication on this device.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Passkeys use biometric authentication (fingerprint, face ID) or device PIN for security.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="passkey-name">Passkey Name</Label>
            <Input
              id="passkey-name"
              value={passkeyName}
              onChange={(e) => setPasskeyName(e.target.value)}
              placeholder="e.g., iPhone 15 Pro, MacBook Pro"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="device-type">Device Type</Label>
            <Select value={deviceType} onValueChange={setDeviceType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {deviceTypes.map((device) => {
                  const Icon = device.icon;
                  return (
                    <SelectItem key={device.value} value={device.value}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {device.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Fingerprint className="h-4 w-4" />
            <span>You'll be prompted to authenticate with your device</span>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              onClick={handleAddPasskey}
              disabled={isAdding || !passkeyName.trim()}
              className="flex items-center gap-2"
            >
              {isAdding ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Creating Passkey...
                </>
              ) : (
                <>
                  <Key className="h-4 w-4" />
                  Create Passkey
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isAdding}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 