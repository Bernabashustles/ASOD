'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Shield,
  Mail,
  Phone,
  RefreshCw
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface VerificationBadgeProps {
  label: string;
  field: string;
  value?: boolean;
  onUpdate?: (data: any) => void;
}

export function VerificationBadge({ label, field, value, onUpdate }: VerificationBadgeProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const handleVerify = async () => {
    setIsVerifying(true);
    
    try {
      // Simulate verification process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success
      if (onUpdate) {
        const fieldName = field.split('.').pop() || field;
        onUpdate({ [fieldName]: true });
      }
      
      setVerificationSent(true);
    } catch (err) {
      console.error('Verification failed:', err);
    } finally {
      setIsVerifying(false);
    }
  };

  const getStatusConfig = () => {
    if (value === true) {
      return {
        icon: CheckCircle,
        variant: 'default' as const,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        text: 'Verified',
        description: 'This account has been verified'
      };
    } else if (value === false) {
      return {
        icon: XCircle,
        variant: 'destructive' as const,
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        text: 'Not Verified',
        description: 'This account has not been verified'
      };
    } else {
      return {
        icon: Clock,
        variant: 'secondary' as const,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        text: 'Pending',
        description: 'Verification is pending'
      };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  const getFieldIcon = () => {
    if (field.includes('email')) return Mail;
    if (field.includes('phone')) return Phone;
    return Shield;
  };

  const FieldIcon = getFieldIcon();

  return (
    <Card className={cn(
      "border-2 transition-colors",
      config.borderColor
    )}>
      <CardContent className="pt-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FieldIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{label}</span>
            </div>
            
            <Badge 
              variant={config.variant}
              className={cn(
                "flex items-center gap-1",
                config.color
              )}
            >
              <Icon className="h-3 w-3" />
              {config.text}
            </Badge>
          </div>

          <div className={cn(
            "p-3 rounded-lg",
            config.bgColor
          )}>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className={cn(
                  "text-sm font-medium",
                  config.color
                )}>
                  {config.text}
                </p>
                <p className="text-xs text-muted-foreground">
                  {config.description}
                </p>
              </div>
              
              {value === false && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleVerify}
                  disabled={isVerifying || verificationSent}
                  className="flex items-center gap-2"
                >
                  {isVerifying ? (
                    <>
                      <RefreshCw className="h-3 w-3 animate-spin" />
                      Verifying...
                    </>
                  ) : verificationSent ? (
                    <>
                      <CheckCircle className="h-3 w-3" />
                      Sent
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-3 w-3" />
                      Verify Now
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {value === true && (
            <div className="flex items-center gap-2 text-xs text-green-600">
              <CheckCircle className="h-3 w-3" />
              <span>Verification completed successfully</span>
            </div>
          )}

          {verificationSent && (
            <div className="flex items-center gap-2 text-xs text-blue-600 bg-blue-50 p-2 rounded">
              <Mail className="h-3 w-3" />
              <span>Verification email sent. Please check your inbox.</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 