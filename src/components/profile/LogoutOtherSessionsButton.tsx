'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  LogOut, 
  AlertTriangle,
  Shield,
  CheckCircle
} from 'lucide-react';

export function LogoutOtherSessionsButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogoutOtherSessions = async () => {
    setIsLoggingOut(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success
      setIsOpen(false);
      console.log('All other sessions logged out successfully');
      
    } catch (err) {
      console.error('Failed to logout other sessions:', err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Logout Other Sessions
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LogOut className="h-5 w-5" />
            Logout Other Sessions
          </DialogTitle>
          <DialogDescription>
            This will log you out of all other devices except this one.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              This action will immediately log you out of all other devices where you're currently signed in.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4 text-green-500" />
              <span>Your current session will remain active</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-blue-500" />
              <span>Other devices will be logged out immediately</span>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              onClick={handleLogoutOtherSessions}
              disabled={isLoggingOut}
              variant="destructive"
              className="flex items-center gap-2"
            >
              {isLoggingOut ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Logging Out...
                </>
              ) : (
                <>
                  <LogOut className="h-4 w-4" />
                  Logout All Other Sessions
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isLoggingOut}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 