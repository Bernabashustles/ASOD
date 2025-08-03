'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Monitor, 
  Wifi, 
  Clock, 
  MapPin, 
  Shield, 
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Session {
  id: string;
  ipAddress: string;
  userAgent: string;
  expiresAt: string;
}

interface CurrentSessionProps {
  fields: string[];
  session: Session;
}

export function CurrentSession({ fields, session }: CurrentSessionProps) {
  const getBrowserInfo = (userAgent: string) => {
    // Simple browser detection
    if (userAgent.includes('Chrome')) return { name: 'Chrome', icon: '🌐' };
    if (userAgent.includes('Firefox')) return { name: 'Firefox', icon: '🦊' };
    if (userAgent.includes('Safari')) return { name: 'Safari', icon: '🍎' };
    if (userAgent.includes('Edge')) return { name: 'Edge', icon: '🌊' };
    return { name: 'Unknown Browser', icon: '🌐' };
  };

  const getOSInfo = (userAgent: string) => {
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac OS X')) return 'macOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('iPhone')) return 'iOS';
    if (userAgent.includes('Android')) return 'Android';
    return 'Unknown OS';
  };

  const getDeviceType = (userAgent: string) => {
    if (userAgent.includes('Mobile')) return 'Mobile';
    if (userAgent.includes('Tablet')) return 'Tablet';
    return 'Desktop';
  };

  const formatTimeRemaining = (expiresAt: string) => {
    const now = new Date();
    const expires = new Date(expiresAt);
    const diffMs = expires.getTime() - now.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffMs < 0) return 'Expired';
    if (diffHours > 0) return `${diffHours}h ${diffMinutes}m remaining`;
    return `${diffMinutes}m remaining`;
  };

  const isExpired = new Date(session.expiresAt) < new Date();
  const browserInfo = getBrowserInfo(session.userAgent);
  const osInfo = getOSInfo(session.userAgent);
  const deviceType = getDeviceType(session.userAgent);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Monitor className="h-5 w-5" />
          Current Session
          <Badge variant={isExpired ? "destructive" : "default"} className="ml-auto">
            {isExpired ? 'Expired' : 'Active'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isExpired && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Your session has expired. Please log in again to continue.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Device Information */}
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              Device Information
            </h4>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Browser:</span>
                <div className="flex items-center gap-1">
                  <span>{browserInfo.icon}</span>
                  <span>{browserInfo.name}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Operating System:</span>
                <span>{osInfo}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Device Type:</span>
                <Badge variant="outline" className="text-xs">
                  {deviceType}
                </Badge>
              </div>
            </div>
          </div>

          {/* Session Details */}
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Session Details
            </h4>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">IP Address:</span>
                <div className="flex items-center gap-1">
                  <Wifi className="h-3 w-3" />
                  <span className="font-mono">{session.ipAddress}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Session ID:</span>
                <span className="font-mono text-xs">
                  {session.id.slice(0, 8)}...
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Time Remaining:</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span className={cn(
                    "font-medium",
                    isExpired ? "text-red-500" : "text-green-600"
                  )}>
                    {formatTimeRemaining(session.expiresAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Agent Details */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">User Agent</h4>
          <div className="bg-muted p-3 rounded-md">
            <code className="text-xs break-all">
              {session.userAgent}
            </code>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Session
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            End Session
          </Button>
        </div>

        {/* Security Status */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CheckCircle className="h-3 w-3 text-green-500" />
          <span>This session is secure and encrypted</span>
        </div>
      </CardContent>
    </Card>
  );
} 