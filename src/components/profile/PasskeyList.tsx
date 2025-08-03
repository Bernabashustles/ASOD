'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  
  Key, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Trash2, 
  Edit,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Passkey {
  id: string;
  name: string;
  deviceType: 'mobile' | 'desktop' | 'tablet' | 'other';
  credentialID: string;
  backedUp: boolean;
  createdAt: string;
}

interface PasskeyListProps {
  fields: string[];
  passkeys: Passkey[];
  onUpdate: (data: any) => void;
}

export function PasskeyList({ fields, passkeys, onUpdate }: PasskeyListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDeletePasskey = async (id: string) => {
    setDeletingId(id);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Remove from list
      const updatedPasskeys = passkeys.filter(p => p.id !== id);
      onUpdate(updatedPasskeys);
    } catch (err) {
      console.error('Failed to delete passkey:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'mobile':
        return Smartphone;
      case 'desktop':
        return Monitor;
      case 'tablet':
        return Tablet;
      default:
        return Key;
    }
  };

  const getDeviceTypeLabel = (deviceType: string) => {
    switch (deviceType) {
      case 'mobile':
        return 'Mobile Device';
      case 'desktop':
        return 'Desktop Computer';
      case 'tablet':
        return 'Tablet';
      default:
        return 'Other Device';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateCredentialId = (id: string) => {
    return id.length > 20 ? `${id.slice(0, 20)}...` : id;
  };

  if (passkeys.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <Key className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Passkeys Found</h3>
            <p className="text-muted-foreground mb-4">
              You haven't set up any passkeys yet. Passkeys provide secure, passwordless authentication.
            </p>
            <Button variant="outline" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              Add Your First Passkey
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          Passkeys ({passkeys.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Passkeys provide secure, passwordless authentication. Each device can have one passkey.
            </AlertDescription>
          </Alert>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Backup Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Credential ID</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {passkeys.map((passkey) => {
                const DeviceIcon = getDeviceIcon(passkey.deviceType);
                
                return (
                  <TableRow key={passkey.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <DeviceIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {getDeviceTypeLabel(passkey.deviceType)}
                        </span>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="font-medium">{passkey.name}</div>
                    </TableCell>
                    
                    <TableCell>
                      <Badge 
                        variant={passkey.backedUp ? "default" : "secondary"}
                        className={cn(
                          "flex items-center gap-1",
                          passkey.backedUp ? "text-green-600" : "text-yellow-600"
                        )}
                      >
                        {passkey.backedUp ? (
                          <>
                            <CheckCircle className="h-3 w-3" />
                            Backed Up
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="h-3 w-3" />
                            Not Backed Up
                          </>
                        )}
                      </Badge>
                    </TableCell>
                    
                    <TableCell>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(passkey.createdAt)}
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="font-mono text-xs text-muted-foreground">
                        {truncateCredentialId(passkey.credentialID)}
                      </div>
                    </TableCell>
                    
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeletePasskey(passkey.id)}
                          disabled={deletingId === passkey.id}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                        >
                          {deletingId === passkey.id ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {passkeys.filter(p => p.backedUp).length} of {passkeys.length} passkeys backed up
            </span>
            <span>
              Last updated: {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 