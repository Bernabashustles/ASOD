'use client';

import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export function ConnectNewAccountButton() {
  return (
    <Button variant="outline" className="flex items-center gap-2">
      <ExternalLink className="h-4 w-4" />
      Connect New Account
    </Button>
  );
} 