'use client';

import { Badge } from '@/components/ui/badge';
import { Crown, Shield, User } from 'lucide-react';

interface RoleBadgeProps {
  field: string;
  value: string;
}

export function RoleBadge({ field, value }: RoleBadgeProps) {
  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return Crown;
      case 'moderator':
        return Shield;
      default:
        return User;
    }
  };

  const getRoleVariant = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'default' as const;
      case 'moderator':
        return 'secondary' as const;
      default:
        return 'outline' as const;
    }
  };

  const Icon = getRoleIcon(value);

  return (
    <Badge variant={getRoleVariant(value)} className="flex items-center gap-1">
      <Icon className="h-3 w-3" />
      {value.charAt(0).toUpperCase() + value.slice(1)}
    </Badge>
  );
} 