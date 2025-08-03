'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Key, 
  Trash2, 
  AlertTriangle,
  Shield,
  Monitor,
  Wifi,
  Clock
} from 'lucide-react';

interface Session {
  id: string;
  userAgent: string;
  ipAddress: string;
  expiresAt: string;
}

interface RevokeSessionProps {
  fields: string[];
  sessions: Session[];
  actions: string[];
  onUpdate: (data: any) => void;
}

export function RevokeSession({ fields, sessions, actions, onUpdate }: RevokeSessionProps) {
  const [revokingIds, setRevokingIds] = useState<string[]>([]);

  const handleRevokeSession = async (id: string) => {
    setRevokingIds(prev => [...prev, id]);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Remove from list
      const updatedSessions = sessions.filter(s => s.id !== id);
      onUpdate(updatedSessions);
    } catch (err) {
      console.error('Failed to revoke session:', err);
    } finally {
      setRevokingIds(prev => prev.filter(revokingId => revokingId !== id));
    }
  };

  const handleRevokeAllSessions = async () => {
    setRevokingIds(sessions.map(s => s.id));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear all sessions
      onUpdate([]);
    } catch (err) {
      console.error('Failed to revoke all sessions:', err);
    } finally {
      setRevokingIds([]);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getBrowserInfo = (userAgent: string) => {
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Unknown';
  };

  if (sessions.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <Key className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Sessions to Revoke</h3>
            <p className="text-muted-foreground">
              All sessions have been revoked or there are no active sessions.
            </p>
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
          Session Revocation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Revoking a session will immediately log out that device. Use this to secure your account if you suspect unauthorized access.
          </AlertDescription>
        </Alert>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Device</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Expires</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((session) => {
              const isExpired = new Date(session.expiresAt) < new Date();
              
              return (
                <TableRow key={session.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {getBrowserInfo(session.userAgent)}
                      </span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Wifi className="h-3 w-3 text-muted-foreground" />
                      <span className="font-mono text-sm">
                        {session.ipAddress}
                      </span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span className="text-sm text-muted-foreground">
                        {formatDate(session.expiresAt)}
                      </span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge 
                      variant={isExpired ? "destructive" : "default"}
                      className="text-xs"
                    >
                      {isExpired ? 'Expired' : 'Active'}
                    </Badge>
                  </TableCell>
                  
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRevokeSession(session.id)}
                      disabled={revokingIds.includes(session.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                    >
                      {revokingIds.includes(session.id) ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <div className="flex justify-between items-center pt-4">
          <div className="text-sm text-muted-foreground">
            {sessions.length} session{sessions.length !== 1 ? 's' : ''} available for revocation
          </div>
          
          <Button
            variant="destructive"
            onClick={handleRevokeAllSessions}
            disabled={revokingIds.length > 0}
            className="flex items-center gap-2"
          >
            {revokingIds.length > 0 ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Revoking...
              </>
            ) : (
              <>
                <Shield className="h-4 w-4" />
                Revoke All Sessions
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 