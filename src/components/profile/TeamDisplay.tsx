'use client';

import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

interface TeamDisplayProps {
  field: string;
  value: string;
}

export function TeamDisplay({ field, value }: TeamDisplayProps) {
  return (
    <Badge variant="outline" className="flex items-center gap-1">
      <Users className="h-3 w-3" />
      {value}
    </Badge>
  );
} 