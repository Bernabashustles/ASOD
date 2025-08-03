'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export function AcceptInvitationButton() {
  return (
    <Button className="flex items-center gap-2">
      <CheckCircle className="h-4 w-4" />
      Accept Invitation
    </Button>
  );
} 