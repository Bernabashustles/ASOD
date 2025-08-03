'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Calendar,
  CalendarDays,
  CalendarRange
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimestampDisplayProps {
  label: string;
  field: string;
  value?: string;
}

export function TimestampDisplay({ label, field, value }: TimestampDisplayProps) {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

    // Format relative time
    let relativeTime = '';
    if (diffInDays > 0) {
      relativeTime = `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else if (diffInHours > 0) {
      relativeTime = `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInMinutes > 0) {
      relativeTime = `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else {
      relativeTime = 'Just now';
    }

    // Format absolute time
    const absoluteTime = date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });

    // Format date only
    const dateOnly = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Format time only
    const timeOnly = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    return {
      relativeTime,
      absoluteTime,
      dateOnly,
      timeOnly,
      iso: date.toISOString(),
      unix: Math.floor(date.getTime() / 1000)
    };
  };

  const getTimeIcon = () => {
    if (field.includes('created')) return Calendar;
    if (field.includes('updated')) return CalendarRange;
    if (field.includes('expires')) return CalendarDays;
    return Clock;
  };

  const getTimeBadgeVariant = () => {
    if (!value) return 'secondary' as const;
    
    const date = new Date(value);
    const now = new Date();
    const diffInMs = date.getTime() - now.getTime();
    
    if (field.includes('expires') && diffInMs < 0) {
      return 'destructive' as const;
    } else if (field.includes('expires') && diffInMs < 24 * 60 * 60 * 1000) {
      return 'default' as const;
    } else {
      return 'outline' as const;
    }
  };

  const TimeIcon = getTimeIcon();

  if (!value) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TimeIcon className="h-4 w-4 text-muted-foreground" />
              <Label className="text-sm font-medium">{label}</Label>
            </div>
            <div className="text-sm text-muted-foreground italic">
              No timestamp available
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatted = formatTimestamp(value);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TimeIcon className="h-4 w-4 text-muted-foreground" />
              <Label className="text-sm font-medium">{label}</Label>
            </div>
            
            <Badge variant={getTimeBadgeVariant()} className="text-xs">
              {formatted.relativeTime}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">
              {formatted.absoluteTime}
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formatted.dateOnly}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{formatted.timeOnly}</span>
              </div>
            </div>

            {field.includes('expires') && (
              <div className="text-xs">
                <span className="text-muted-foreground">Expires: </span>
                <span className={cn(
                  "font-medium",
                  new Date(value) < new Date() ? "text-red-500" : "text-green-600"
                )}>
                  {new Date(value) < new Date() ? 'Expired' : 'Active'}
                </span>
              </div>
            )}

            <details className="text-xs">
              <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                Technical Details
              </summary>
              <div className="mt-2 space-y-1 font-mono text-xs">
                <div>ISO: {formatted.iso}</div>
                <div>Unix: {formatted.unix}</div>
              </div>
            </details>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 