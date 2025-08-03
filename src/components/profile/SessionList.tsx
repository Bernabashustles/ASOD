'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Users, 
  Monitor, 
  Wifi, 
  Clock, 
  Trash2, 
  AlertTriangle,
  CheckCircle,
  Smartphone,
  Tablet
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Session {
  id: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  ipAddress: string;
  userAgent: string;
}

interface SessionListProps {
  fields: string[];
  sessions: Session[];
  onUpdate: (data: any) => void;
}

export function SessionList({ fields, sessions, onUpdate }: SessionListProps) {
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

  const getDeviceIcon = (userAgent: string) => {
    if (userAgent.includes('Mobile')) return Smartphone;
    if (userAgent.includes('Tablet')) return Tablet;
    return Monitor;
  };

  const getBrowserInfo = (userAgent: string) => {
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Unknown';
  };

  const getOSInfo = (userAgent: string) => {
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac OS X')) return 'macOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('iPhone')) return 'iOS';
    if (userAgent.includes('Android')) return 'Android';
    return 'Unknown';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTimeRemaining = (expiresAt: string) => {
    const now = new Date();
    const expires = new Date(expiresAt);
    const diffMs = expires.getTime() - now.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffMs < 0) return 'Expired';
    if (diffHours > 0) return `${diffHours}h ${diffMinutes}m`;
    return `${diffMinutes}m`;
  };

  const isCurrentSession = (session: Session) => {
    // This would typically be determined by comparing with the current session
    return session.id === 'current_session_123';
  };

  if (sessions.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Active Sessions</h3>
            <p className="text-muted-foreground">
              You don't have any active sessions at the moment.
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
          <Users className="h-5 w-5" />
          Active Sessions ({sessions.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Manage your active sessions across different devices. You can revoke any session to force logout.
            </AlertDescription>
          </Alert>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((session) => {
                const DeviceIcon = getDeviceIcon(session.userAgent);
                const isExpired = new Date(session.expiresAt) < new Date();
                const isCurrent = isCurrentSession(session);
                
                return (
                  <TableRow key={session.id} className={cn(
                    isCurrent && "bg-muted/50"
                  )}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <DeviceIcon className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium text-sm">
                            {getBrowserInfo(session.userAgent)} on {getOSInfo(session.userAgent)}
                          </div>
                          {isCurrent && (
                            <Badge variant="default" className="text-xs">
                              Current
                            </Badge>
                          )}
                        </div>
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
                      <div className="text-sm text-muted-foreground">
                        {formatDate(session.updatedAt)}
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span className={cn(
                          "text-sm font-medium",
                          isExpired ? "text-red-500" : "text-green-600"
                        )}>
                          {formatTimeRemaining(session.expiresAt)}
                        </span>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <Badge 
                        variant={isExpired ? "destructive" : "default"}
                        className="flex items-center gap-1"
                      >
                        {isExpired ? (
                          <>
                            <AlertTriangle className="h-3 w-3" />
                            Expired
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-3 w-3" />
                            Active
                          </>
                        )}
                      </Badge>
                    </TableCell>
                    
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {!isCurrent && (
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
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {sessions.filter(s => new Date(s.expiresAt) > new Date()).length} of {sessions.length} sessions active
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