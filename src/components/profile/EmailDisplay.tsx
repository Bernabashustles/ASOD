'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Mail, 
  Copy, 
  CheckCircle,
  AlertCircle,
  Shield
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface EmailDisplayProps {
  field: string;
  value?: string;
  editable?: boolean;
}

export function EmailDisplay({ field, value, editable = false }: EmailDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value) return;
    
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const getEmailDomain = (email: string) => {
    return email.split('@')[1];
  };

  const maskEmail = (email: string) => {
    const [localPart, domain] = email.split('@');
    if (localPart.length <= 2) return email;
    
    const maskedLocal = localPart[0] + '*'.repeat(localPart.length - 2) + localPart[localPart.length - 1];
    return `${maskedLocal}@${domain}`;
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address
              {!editable && (
                <Badge variant="secondary" className="text-xs">
                  Read Only
                </Badge>
              )}
            </Label>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                disabled={!value}
                className="h-8 w-8 p-0"
              >
                {copied ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            {value ? (
              <>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">{value}</span>
                  <Badge variant="outline" className="text-xs">
                    {getEmailDomain(value)}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="h-3 w-3" />
                  <span>Protected field - cannot be modified</span>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Masked: {maskEmail(value)}
                </div>
              </>
            ) : (
              <div className="text-sm text-muted-foreground italic">
                No email address set
              </div>
            )}
          </div>

          {!editable && (
            <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 p-2 rounded">
              <AlertCircle className="h-3 w-3" />
              <span>Email address cannot be changed for security reasons</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 