'use client';

import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

export function DeclineInvitationButton() {
  return (
    <Button variant="outline" className="flex items-center gap-2">
      <XCircle className="h-4 w-4" />
      Decline Invitation
    </Button>
  );
} 