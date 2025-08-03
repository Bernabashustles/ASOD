'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  User, 
  Shield, 
  Monitor, 
  Users, 
  Key, 
  Smartphone, 
  Mail, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus,
  Trash2,
  Settings,
  LogOut,
  Eye,
  EyeOff,
  Building2,
  Crown
} from 'lucide-react';

// Import all profile components
import { AvatarUpload } from '@/components/profile/AvatarUpload';
import { TextInput } from '@/components/profile/TextInput';
import { EmailDisplay } from '@/components/profile/EmailDisplay';
import { VerificationBadge } from '@/components/profile/VerificationBadge';
import { PhoneInput } from '@/components/profile/PhoneInput';
import { TimestampDisplay } from '@/components/profile/TimestampDisplay';
import { PasswordChangeForm } from '@/components/profile/PasswordChangeForm';
import { PasskeyList } from '@/components/profile/PasskeyList';
import { AddPasskeyButton } from '@/components/profile/AddPasskeyButton';
import { CurrentSession } from '@/components/profile/CurrentSession';
import { SessionList } from '@/components/profile/SessionList';
import { LogoutOtherSessionsButton } from '@/components/profile/LogoutOtherSessionsButton';
import { SessionTimeoutSettings } from '@/components/profile/SessionTimeoutSettings';
import { RevokeSession } from '@/components/profile/RevokeSession';
import { OAuthAccountList } from '@/components/profile/OAuthAccountList';
import { ConnectNewAccountButton } from '@/components/profile/ConnectNewAccountButton';
import { DisconnectAccountButton } from '@/components/profile/DisconnectAccountButton';
import { OrganizationOverview } from '@/components/profile/OrganizationOverview';
import { RoleBadge } from '@/components/profile/RoleBadge';
import { TeamDisplay } from '@/components/profile/TeamDisplay';
import { SwitchOrganizationDropdown } from '@/components/profile/SwitchOrganizationDropdown';
import { LeaveOrganizationButton } from '@/components/profile/LeaveOrganizationButton';
import { InvitationsSent } from '@/components/profile/InvitationsSent';
import { InvitationList } from '@/components/profile/InvitationList';
import { AcceptInvitationButton } from '@/components/profile/AcceptInvitationButton';
import { DeclineInvitationButton } from '@/components/profile/DeclineInvitationButton';
import { DangerZone } from '@/components/profile/DangerZone';

// Mock data - replace with actual API calls
const mockUserData = {
  user: {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    emailVerified: true,
    phoneNumber: '+1234567890',
    phoneNumberVerified: false,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-12-01T14:20:00Z'
  },
  account: {
    password: '********'
  },
  passkeys: [
    {
      id: '1',
      name: 'iPhone 15 Pro',
      deviceType: 'mobile',
      credentialID: 'cred_123456789',
      backedUp: true,
      createdAt: '2024-11-15T09:00:00Z'
    },
    {
      id: '2',
      name: 'MacBook Pro',
      deviceType: 'desktop',
      credentialID: 'cred_987654321',
      backedUp: false,
      createdAt: '2024-10-20T16:30:00Z'
    }
  ],
  session: {
    id: 'current_session_123',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    expiresAt: '2024-12-31T23:59:59Z',
    createdAt: '2024-12-01T10:00:00Z',
    updatedAt: '2024-12-01T14:20:00Z'
  },
  sessions: [
    {
      id: 'session_1',
      createdAt: '2024-12-01T10:00:00Z',
      updatedAt: '2024-12-01T14:20:00Z',
      expiresAt: '2024-12-31T23:59:59Z',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    },
    {
      id: 'session_2',
      createdAt: '2024-11-30T08:00:00Z',
      updatedAt: '2024-11-30T08:00:00Z',
      expiresAt: '2024-12-30T23:59:59Z',
      ipAddress: '10.0.0.50',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_2 like Mac OS X) AppleWebKit/605.1.15'
    }
  ],
  oauthAccounts: [
    {
      id: '1',
      providerId: 'google',
      accountId: 'google_123456789',
      accessTokenExpiresAt: '2024-12-31T23:59:59Z',
      scope: 'email profile'
    },
    {
      id: '2',
      providerId: 'github',
      accountId: 'github_987654321',
      accessTokenExpiresAt: '2024-12-15T23:59:59Z',
      scope: 'read:user user:email'
    }
  ],
  organization: {
    id: '1',
    name: 'Acme Corporation',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop'
  },
  member: {
    role: 'admin'
  },
  team: {
    name: 'Engineering Team'
  },
  invitationsSent: [
    {
      id: '1',
      email: 'jane.smith@example.com',
      role: 'member',
      status: 'pending',
      expiresAt: '2024-12-15T23:59:59Z'
    }
  ],
  pendingInvitations: [
    {
      id: '1',
      organizationId: '2',
      organizationName: 'Tech Startup Inc',
      role: 'member',
      status: 'pending',
      expiresAt: '2024-12-10T23:59:59Z'
    }
  ]
};

const navigationItems = [
  { 
    id: 'user-info', 
    label: 'User Info', 
    icon: User, 
    description: 'Personal information and contact details'
  },
  { 
    id: 'security', 
    label: 'Security', 
    icon: Shield, 
    description: 'Password and authentication settings'
  },
  { 
    id: 'sessions', 
    label: 'Current Session', 
    icon: Monitor, 
    description: 'Your current active session'
  },
  { 
    id: 'multi-session', 
    label: 'All Sessions', 
    icon: Users, 
    description: 'Manage all your active sessions'
  },
  { 
    id: 'session-revocation', 
    label: 'Session Revocation', 
    icon: Key, 
    description: 'Revoke specific sessions'
  },
  { 
    id: 'connected-accounts', 
    label: 'Connected Accounts', 
    icon: Smartphone, 
    description: 'OAuth and third-party integrations'
  },
  { 
    id: 'organization', 
    label: 'Organization', 
    icon: Building2, 
    description: 'Organization and team settings'
  },
  { 
    id: 'pending-invitations', 
    label: 'Invitations', 
    icon: Mail, 
    description: 'Review and respond to invitations'
  },
  { 
    id: 'danger-zone', 
    label: 'Danger Zone', 
    icon: AlertTriangle, 
    description: 'Irreversible account actions'
  }
];

export default function ProfilePage() {
  const [userData, setUserData] = useState(mockUserData);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('user-info');

  const handleDataUpdate = (section: string, data: any) => {
    setUserData(prev => ({
      ...prev,
      [section]: { ...prev[section as keyof typeof prev], ...data }
    }));
  };

  const activeItem = navigationItems.find(item => item.id === activeTab);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Profile Settings
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your account settings, security preferences, and connected services.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Account Active
              </Badge>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-6">
          {/* Sidebar Navigation */}
          <div className="w-72 flex-shrink-0">
            <Card className="sticky top-6 border">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold">
                  Settings Menu
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-200px)]">
                  <nav className="space-y-1 px-4 pb-4">
                    {navigationItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      
                      return (
                        <button
                          key={item.id}
                          onClick={() => setActiveTab(item.id)}
                          className={`w-full text-left p-3 rounded-lg transition-all duration-200 group ${
                            isActive 
                              ? 'bg-accent text-accent-foreground border border-border' 
                              : 'hover:bg-accent/50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-md transition-colors ${
                              isActive ? 'bg-background' : 'bg-muted group-hover:bg-muted/80'
                            }`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm">
                                {item.label}
                              </div>
                              <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                                {item.description}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </nav>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            <Card className="border">
              <CardHeader className="border-b">
                <div className="flex items-center gap-3">
                  {activeItem && (
                    <>
                      <div className="p-2 rounded-lg bg-muted">
                        <activeItem.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-semibold">
                          {activeItem.label}
                        </CardTitle>
                        <CardDescription>
                          {activeItem.description}
                        </CardDescription>
                      </div>
                    </>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <ScrollArea className="h-[calc(100vh-300px)]">
                  <div className="space-y-6">
                    {/* User Info Tab */}
                    {activeTab === 'user-info' && (
                      <div className="space-y-6">
                        <AvatarUpload 
                          field="user.image" 
                          value={userData.user.image}
                          onUpdate={(data) => handleDataUpdate('user', data)}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <TextInput 
                            label="Name" 
                            field="user.name" 
                            value={userData.user.name}
                            onUpdate={(data) => handleDataUpdate('user', data)}
                          />
                          
                          <EmailDisplay 
                            field="user.email" 
                            value={userData.user.email}
                            editable={false}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <VerificationBadge 
                            label="Email Verified" 
                            field="user.emailVerified" 
                            value={userData.user.emailVerified}
                          />
                          
                          <VerificationBadge 
                            label="Phone Verified" 
                            field="user.phoneNumberVerified" 
                            value={userData.user.phoneNumberVerified}
                          />
                        </div>

                        <PhoneInput 
                          field="user.phoneNumber" 
                          value={userData.user.phoneNumber}
                          onUpdate={(data) => handleDataUpdate('user', data)}
                        />

                        <Separator />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <TimestampDisplay 
                            label="Created At" 
                            field="user.createdAt" 
                            value={userData.user.createdAt}
                          />
                          
                          <TimestampDisplay 
                            label="Last Updated" 
                            field="user.updatedAt" 
                            value={userData.user.updatedAt}
                          />
                        </div>
                      </div>
                    )}

                    {/* Security Tab */}
                    {activeTab === 'security' && (
                      <div className="space-y-6">
                        <PasswordChangeForm 
                          field="account.password" 
                          onUpdate={(data) => handleDataUpdate('account', data)}
                        />
                        
                        <Separator />
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Passkeys</h3>
                            <AddPasskeyButton />
                          </div>
                          <PasskeyList 
                            fields={[
                              "passkey.name",
                              "passkey.deviceType", 
                              "passkey.credentialID",
                              "passkey.backedUp",
                              "passkey.createdAt"
                            ]}
                            passkeys={userData.passkeys}
                            onUpdate={(data) => handleDataUpdate('passkeys', data)}
                          />
                        </div>
                      </div>
                    )}

                    {/* Sessions & Devices Tab */}
                    {activeTab === 'sessions' && (
                      <CurrentSession 
                        fields={[
                          "session.ipAddress",
                          "session.userAgent", 
                          "session.expiresAt"
                        ]}
                        session={userData.session}
                      />
                    )}

                    {/* Multi-Session Management Tab */}
                    {activeTab === 'multi-session' && (
                      <div className="space-y-6">
                        <SessionList 
                          fields={[
                            "session.id",
                            "session.createdAt",
                            "session.updatedAt", 
                            "session.expiresAt",
                            "session.ipAddress",
                            "session.userAgent"
                          ]}
                          sessions={userData.sessions}
                          onUpdate={(data) => handleDataUpdate('sessions', data)}
                        />
                        
                        <div className="flex gap-3">
                          <LogoutOtherSessionsButton />
                          <SessionTimeoutSettings />
                        </div>
                      </div>
                    )}

                    {/* Session Revocation Tab */}
                    {activeTab === 'session-revocation' && (
                      <RevokeSession 
                        fields={[
                          "session.id",
                          "session.userAgent",
                          "session.ipAddress",
                          "session.expiresAt"
                        ]}
                        sessions={userData.sessions}
                        actions={["Revoke", "Revoke All Sessions"]}
                        onUpdate={(data) => handleDataUpdate('sessions', data)}
                      />
                    )}

                    {/* Connected Accounts Tab */}
                    {activeTab === 'connected-accounts' && (
                      <div className="space-y-6">
                        <OAuthAccountList 
                          fields={[
                            "account.providerId",
                            "account.accountId",
                            "account.accessTokenExpiresAt",
                            "account.scope"
                          ]}
                          accounts={userData.oauthAccounts}
                          onUpdate={(data) => handleDataUpdate('oauthAccounts', data)}
                        />
                        
                        <div className="flex gap-3">
                          <ConnectNewAccountButton />
                          <DisconnectAccountButton />
                        </div>
                      </div>
                    )}

                    {/* Organization & Teams Tab */}
                    {activeTab === 'organization' && (
                      <div className="space-y-6">
                        <OrganizationOverview 
                          fields={[
                            "organization.name",
                            "organization.logo"
                          ]}
                          organization={userData.organization}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <RoleBadge field="member.role" value={userData.member.role} />
                          <TeamDisplay field="team.name" value={userData.team.name} />
                          <SwitchOrganizationDropdown />
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-4">
                          <LeaveOrganizationButton />
                          
                          <div>
                            <h4 className="font-semibold mb-3">Invitations Sent</h4>
                            <InvitationsSent 
                              fields={[
                                "invitation.email",
                                "invitation.role",
                                "invitation.status",
                                "invitation.expiresAt"
                              ]}
                              invitations={userData.invitationsSent}
                              onUpdate={(data) => handleDataUpdate('invitationsSent', data)}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Pending Invitations Tab */}
                    {activeTab === 'pending-invitations' && (
                      <div className="space-y-6">
                        <InvitationList 
                          fields={[
                            "invitation.organizationId",
                            "invitation.role",
                            "invitation.status",
                            "invitation.expiresAt"
                          ]}
                          invitations={userData.pendingInvitations}
                          onUpdate={(data) => handleDataUpdate('pendingInvitations', data)}
                        />
                        
                        <div className="flex gap-3">
                          <AcceptInvitationButton />
                          <DeclineInvitationButton />
                        </div>
                      </div>
                    )}

                    {/* Danger Zone Tab */}
                    {activeTab === 'danger-zone' && (
                      <DangerZone userData={userData} onUpdate={handleDataUpdate} />
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 