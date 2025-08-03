'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Users,
  Shield
} from 'lucide-react';

interface Organization {
  id: string;
  name: string;
  logo?: string;
}

interface OrganizationOverviewProps {
  fields: string[];
  organization: Organization;
}

export function OrganizationOverview({ fields, organization }: OrganizationOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Organization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={organization.logo} alt={organization.name} />
            <AvatarFallback className="text-lg">
              <Building2 className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">{organization.name}</h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                Member
              </Badge>
              <Badge variant="default" className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Verified
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 