'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Smartphone, 
  Trash2, 
  ExternalLink,
  Shield,
  CheckCircle,
  AlertTriangle,
  Clock
} from 'lucide-react';

interface OAuthAccount {
  id: string;
  providerId: string;
  accountId: string;
  accessTokenExpiresAt: string;
  scope: string;
}

interface OAuthAccountListProps {
  fields: string[];
  accounts: OAuthAccount[];
  onUpdate: (data: any) => void;
}

export function OAuthAccountList({ fields, accounts, onUpdate }: OAuthAccountListProps) {
  const getProviderIcon = (provider: string) => {
    switch (provider.toLowerCase()) {
      case 'google':
        return '🔍';
      case 'github':
        return '🐙';
      case 'facebook':
        return '📘';
      case 'twitter':
        return '🐦';
      case 'linkedin':
        return '💼';
      default:
        return '🔗';
    }
  };

  const getProviderName = (provider: string) => {
    return provider.charAt(0).toUpperCase() + provider.slice(1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isExpired = (dateString: string) => {
    return new Date(dateString) < new Date();
  };

  const getScopeLabel = (scope: string) => {
    const scopes = scope.split(' ');
    return scopes.map(s => s.replace(':', ' ')).join(', ');
  };

  if (accounts.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <Smartphone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Connected Accounts</h3>
            <p className="text-muted-foreground mb-4">
              You haven't connected any third-party accounts yet.
            </p>
            <Button variant="outline" className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Connect Account
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="h-5 w-5" />
          Connected Accounts ({accounts.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Manage your connected third-party accounts. You can disconnect accounts you no longer use.
          </AlertDescription>
        </Alert>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Provider</TableHead>
              <TableHead>Account ID</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead>Expires</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account) => {
              const expired = isExpired(account.accessTokenExpiresAt);
              
              return (
                <TableRow key={account.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {getProviderIcon(account.providerId)}
                      </span>
                      <span className="font-medium">
                        {getProviderName(account.providerId)}
                      </span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="font-mono text-sm">
                      {account.accountId}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="text-sm text-muted-foreground max-w-xs truncate">
                      {getScopeLabel(account.scope)}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span className="text-sm text-muted-foreground">
                        {formatDate(account.accessTokenExpiresAt)}
                      </span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge 
                      variant={expired ? "destructive" : "default"}
                      className="flex items-center gap-1"
                    >
                      {expired ? (
                        <>
                          <AlertTriangle className="h-3 w-3" />
                          Expired
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-3 w-3" />
                          Active
                        </>
                      )}
                    </Badge>
                  </TableCell>
                  
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {accounts.filter(a => !isExpired(a.accessTokenExpiresAt)).length} of {accounts.length} accounts active
          </span>
          <span>
            Last updated: {new Date().toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
} 