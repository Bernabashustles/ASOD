'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  AlertTriangle, 
  Trash2, 
  Shield,
  Lock,
  UserX
} from 'lucide-react';

interface DangerZoneProps {
  userData: any;
  onUpdate: (data: any) => void;
}

export function DangerZone({ userData, onUpdate }: DangerZoneProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteAccount = async () => {
    if (confirmText !== 'DELETE') {
      return;
    }

    setIsDeleting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate account deletion
      console.log('Account deleted successfully');
      
    } catch (err) {
      console.error('Failed to delete account:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="border-red-200 bg-red-50/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-600">
          <AlertTriangle className="h-5 w-5" />
          Danger Zone
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            These actions are irreversible and will permanently affect your account.
          </AlertDescription>
        </Alert>

        {/* Account Deletion */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-medium text-red-600">Delete Account</h3>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
            </div>
            
            <Button
              variant="destructive"
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete Account
            </Button>
          </div>

          {showDeleteConfirm && (
            <div className="space-y-4 p-4 border border-red-200 rounded-lg bg-red-50">
              <div className="space-y-2">
                <Label htmlFor="confirm-delete" className="text-red-600 font-medium">
                  Type "DELETE" to confirm
                </Label>
                <Input
                  id="confirm-delete"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="DELETE"
                  className="border-red-300 focus:border-red-500"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  disabled={confirmText !== 'DELETE' || isDeleting}
                  className="flex items-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Deleting Account...
                    </>
                  ) : (
                    <>
                      <UserX className="h-4 w-4" />
                      Permanently Delete Account
                    </>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setConfirmText('');
                  }}
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Security Warning */}
        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <Shield className="h-5 w-5 text-amber-600 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-medium text-amber-800">Security Notice</h4>
            <p className="text-sm text-amber-700">
              Before deleting your account, consider:
            </p>
            <ul className="text-sm text-amber-700 list-disc list-inside space-y-1">
              <li>Downloading your data for backup</li>
              <li>Transferring ownership of any shared resources</li>
              <li>Notifying team members if applicable</li>
              <li>Ensuring you have access to alternative accounts</li>
            </ul>
          </div>
        </div>

        {/* Account Information */}
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span>Account ID: {userData?.user?.id || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Created: {userData?.user?.createdAt ? new Date(userData.user.createdAt).toLocaleDateString() : 'N/A'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 