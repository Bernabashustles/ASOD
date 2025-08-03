'use client';

import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export function DisconnectAccountButton() {
  return (
    <Button variant="outline" className="flex items-center gap-2">
      <Trash2 className="h-4 w-4" />
      Disconnect Account
    </Button>
  );
} 