"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useSession } from "@/lib/auth-client";
import {
  AlertTriangle,
  Building2,
  CheckCircle,
  Key,
  Mail, 
  Monitor,
  Shield,
  Smartphone,
  User,
  Users,
} from "lucide-react";
import React, { useState } from "react";

// Import all profile components
import { AcceptInvitationButton } from "@/components/profile/AcceptInvitationButton";
import { AddPasskeyButton } from "@/components/profile/AddPasskeyButton";
import { AvatarUpload } from "@/components/profile/AvatarUpload";
import { ConnectNewAccountButton } from "@/components/profile/ConnectNewAccountButton";
import { CurrentSession } from "@/components/profile/CurrentSession";
import { DangerZone } from "@/components/profile/DangerZone";
import { DeclineInvitationButton } from "@/components/profile/DeclineInvitationButton";
import { DisconnectAccountButton } from "@/components/profile/DisconnectAccountButton";
import { EmailDisplay } from "@/components/profile/EmailDisplay";
import { InvitationList } from "@/components/profile/InvitationList";
import { InvitationsSent } from "@/components/profile/InvitationsSent";
import { LeaveOrganizationButton } from "@/components/profile/LeaveOrganizationButton";
import { OAuthAccountList } from "@/components/profile/OAuthAccountList";
import { OrganizationOverview } from "@/components/profile/OrganizationOverview";
import { PasskeyList } from "@/components/profile/PasskeyList";
import { PasswordChangeForm } from "@/components/profile/PasswordChangeForm";
import { PhoneInput } from "@/components/profile/PhoneInput";
import { RevokeSession } from "@/components/profile/RevokeSession";
import { RoleBadge } from "@/components/profile/RoleBadge";
import { SessionList } from "@/components/profile/SessionList";
import { SessionTimeoutSettings } from "@/components/profile/SessionTimeoutSettings";
import { SwitchOrganizationDropdown } from "@/components/profile/SwitchOrganizationDropdown";
import { TeamDisplay } from "@/components/profile/TeamDisplay";
import { TextInput } from "@/components/profile/TextInput";
import { TimestampDisplay } from "@/components/profile/TimestampDisplay";
import { VerificationBadge } from "@/components/profile/VerificationBadge";

type DeviceType = "mobile" | "desktop" | "tablet" | "other";

type Passkey = {
  id: string;
  name: string;
  deviceType: DeviceType;
  credentialID: string;
  backedUp: boolean;
  createdAt: string;
};

// Helper function to map CredentialDeviceType to our DeviceType
const mapDeviceType = (credentialDeviceType: string): DeviceType => {
  switch (credentialDeviceType) {
    case "singleDevice":
    case "multiDevice":
      return "other";
    default:
      return "other";
  }
};

const navigationItems = [
  {
    id: "user-info",
    label: "User Info",
    icon: User,
    description: "Personal information and contact details",
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
    description: "Password and authentication settings",
  },
  {
    id: "sessions",
    label: "Current Session",
    icon: Monitor,
    description: "Your current active session",
  },
  {
    id: "multi-session",
    label: "All Sessions",
    icon: Users,
    description: "Manage all your active sessions",
  },
  {
    id: "session-revocation",
    label: "Session Revocation",
    icon: Key,
    description: "Revoke specific sessions",
  },
  {
    id: "connected-accounts",
    label: "Connected Accounts",
    icon: Smartphone,
    description: "OAuth and third-party integrations",
  },
  {
    id: "organization",
    label: "Organization",
    icon: Building2,
    description: "Organization and team settings",
  },
  {
    id: "pending-invitations",
    label: "Invitations",
    icon: Mail,
    description: "Review and respond to invitations",
  },
  {
    id: "danger-zone",
    label: "Danger Zone",
    icon: AlertTriangle,
    description: "Irreversible account actions",
  },
];

export default function ProfilePage() {
  const {
    data: session,
    isPending: sessionLoading,
    error: sessionError,
  } = useSession();
  // Placeholder mocked data for missing organization and passkeys hooks
  const organizationsList = [] as any[];
  const orgsLoading = false;
  const activeOrganization = null as any;
  const activeOrgLoading = false;
  const passkeys = [] as any[];
  const passkeysLoading = false;

  const [activeTab, setActiveTab] = useState("user-info");
  const [allSessions, setAllSessions] = useState<any[]>([]);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [currentUserIP, setCurrentUserIP] = useState<string>("Unknown");

  // Detect user's IP address on component mount (placeholder)
  React.useEffect(() => {
    // Basic placeholder, real implementation could call a backend or third-party service
    setCurrentUserIP('127.0.0.1');
  }, []);

  // Fetch all sessions when the multi-session tab is active
  const fetchSessions = async () => {
    setSessionsLoading(true);
    try {
      // Using local state as placeholder for sessions list
      if (allSessions.length === 0 && session) {
        const base = {
          session: {
            id: session.session.id,
            token: session.session.token,
            createdAt: session.session.createdAt || new Date(),
            updatedAt: session.session.updatedAt || new Date(),
            expiresAt: session.session.expiresAt || new Date(Date.now() + 24*60*60*1000),
            ipAddress: currentUserIP || "127.0.0.1",
            userAgent: session.session.userAgent || (typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown'),
          }
        } as any;
        setAllSessions([base]);
      } else {
        // Ensure IP is set
        setAllSessions(prev => prev.map((s: any) => ({
          ...s,
          session: {
            ...s.session,
            ipAddress: s.session.ipAddress || currentUserIP || '127.0.0.1',
          }
        })));
      }
    } catch (error) {
      console.error("Failed to fetch sessions:", error);
      setAllSessions([]);
    } finally {
      setSessionsLoading(false);
    }
  };

  // Fetch sessions when the multi-session or session-revocation tab is first opened
  React.useEffect(() => {
    if (activeTab === "multi-session" || activeTab === "session-revocation") {
      fetchSessions();
    }
  }, [activeTab]);

  // Initial fetch of sessions when component mounts and user is authenticated
  React.useEffect(() => {
    if (session && !sessionLoading) {
      fetchSessions();
    }
  }, [session, sessionLoading]);

  // Debug function to create test sessions for demonstration
  const createTestSession = () => {
    const testSession = {
      session: {
        id: `test-${Date.now()}`,
        token: `test-token-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
        ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    };

    setAllSessions((prev) => [...prev, testSession]);
  };

  // Function to refresh passkeys list
  const handlePasskeyAdded = () => {
    // Placeholder to refresh passkeys when integrated with backend
  };

  // Show loading state if session is still loading
  if (sessionLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-primary border-b-2" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Show error state if there's a session error
  if (sessionError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Alert className="max-w-md">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Failed to load session. Please try refreshing the page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Redirect to login if no session
  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Alert className="max-w-md">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            You need to be logged in to view this page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const user = session.user;
  const currentSession = session.session;

  const handleDataUpdate = async (
    section: string,
    data: Record<string, any>,
  ) => {
    try {
      switch (section) {
        case "user":
          // Handle user profile updates using Better Auth methods
          if (data.name !== undefined) {
            // In a real implementation, you'd call a Better Auth method to update user
            console.log("Updating user name:", data.name);
          }
          if (data.image !== undefined) {
            console.log("Updating user avatar:", data.image);
          }
          break;

        case "account":
          // Handle password changes
          if (data.password) {
            console.log("Changing password");
            // Would call Better Auth password change method
          }
          break;

        case "passkeys":
          console.log("Managing passkeys:", data);
          break;

        case "sessions":
          // Handle session management
          console.log("Managing sessions:", data);
          break;

        default:
          console.log("Update:", section, data);
      }
    } catch (error: any) {
      console.error("Profile update error:", error);
      // You could show a toast notification here
    }
  };

  // Enhanced error handling
  const handleError = (error: any, context: string) => {
    console.error(`Error in ${context}:`, error);
  };

  // Session refresh capability
  const refreshSession = () => {
    window.location.reload(); // Simple refresh for now
  };

  const activeItem = navigationItems.find((item) => item.id === activeTab);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-3xl tracking-tight">
                Profile Settings
              </h1>
              <p className="mt-2 text-muted-foreground">
                Manage your account settings, security preferences, and
                connected services.
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
                <CardTitle className="font-semibold text-lg">
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
                          className={`group w-full rounded-lg p-3 text-left transition-all duration-200 ${isActive
                              ? "border border-border bg-accent text-accent-foreground"
                              : "hover:bg-accent/50"
                            }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`rounded-md p-2 transition-colors ${isActive
                                  ? "bg-background"
                                  : "bg-muted group-hover:bg-muted/80"
                                }`}
                            >
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-medium text-sm">
                                {item.label}
                              </div>
                              <div className="mt-0.5 line-clamp-2 text-muted-foreground text-xs">
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
          <div className="min-w-0 flex-1">
            <Card className="border">
              <CardHeader className="border-b">
                <div className="flex items-center gap-3">
                  {activeItem && (
                    <>
                      <div className="rounded-lg bg-muted p-2">
                        <activeItem.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="font-semibold text-xl">
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
                    {activeTab === "user-info" && (
                      <div className="space-y-6">
                        <AvatarUpload
                          field="user.image"
                          value={user.image || ""}
                          onUpdate={(data: any) => handleDataUpdate("user", data)}
                        />

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <TextInput
                            label="Name"
                            field="user.name"
                            value={user.name || ""}
                            onUpdate={(data) => handleDataUpdate("user", data)}
                          />

                          <EmailDisplay
                            field="user.email"
                            value={user.email || ""}
                            editable={false}
                          />
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <VerificationBadge
                            label="Email Verified"
                            field="user.emailVerified"
                            value={user.emailVerified || false}
                          />

                          <VerificationBadge
                            label="Phone Verified"
                            field="user.phoneNumberVerified"
                            value={(user as any).phoneNumberVerified || false}
                          />
                        </div>

                        <PhoneInput
                          field="user.phoneNumber"
                          value={(user as any).phoneNumber || ""}
                          onUpdate={(data: any) => handleDataUpdate("user", data)}
                        />

                        <Separator />

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <TimestampDisplay
                            label="Created At"
                            field="user.createdAt"
                            value={
                              user.createdAt?.toISOString() ||
                              new Date().toISOString()
                            }
                          />

                          <TimestampDisplay
                            label="Last Updated"
                            field="user.updatedAt"
                            value={
                              user.updatedAt?.toISOString() ||
                              new Date().toISOString()
                            }
                          />
                        </div>
                      </div>
                    )}

                    {/* Security Tab */}
                    {activeTab === "security" && (
                      <div className="space-y-6">
                        <PasswordChangeForm
                          field="account.password"
                          onUpdate={(data) => handleDataUpdate("account", data)}
                        />

                        <Separator />

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg">Passkeys</h3>
                            <AddPasskeyButton />
                          </div>
                          {passkeysLoading ? (
                            <div className="py-4 text-center">
                              <div className="mx-auto mb-2 h-6 w-6 animate-spin rounded-full border-primary border-b-2" />
                              <p className="text-muted-foreground text-sm">
                                Loading passkeys...
                              </p>
                            </div>
                          ) : (
                        <PasskeyList
                          fields={[
                            "passkey.name",
                            "passkey.deviceType",
                            "passkey.credentialID",
                            "passkey.backedUp",
                            "passkey.createdAt",
                          ]}
                          passkeys={(passkeys || []).map((pk: any) => ({
                            ...pk,
                            name: pk.name || "",
                            deviceType: mapDeviceType(pk.deviceType as string),
                            createdAt:
                              (pk.createdAt as Date)?.toISOString() ||
                              new Date().toISOString(),
                          }))}
                          onUpdate={(data: any) => handleDataUpdate("passkeys", data)}
                        />
                          )}
                        </div>
                      </div>
                    )}

                    {/* Sessions & Devices Tab */}
                    {activeTab === "sessions" && (
                      <CurrentSession
                        fields={[
                          "session.ipAddress",
                          "session.userAgent",
                          "session.expiresAt",
                        ]}
                        session={{
                          id: currentSession.id,
                          ipAddress: currentSession.ipAddress || "Unknown",
                          userAgent: currentSession.userAgent || "Unknown",
                          expiresAt:
                            currentSession.expiresAt?.toISOString() ||
                            new Date().toISOString(),
                        }}
                      />
                    )}

                    {/* Multi-Session Management Tab */}
                    {activeTab === "multi-session" && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">
                              Active Sessions
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              Manage all your active sessions across different
                              devices
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={fetchSessions}
                              disabled={sessionsLoading}
                            >
                              {sessionsLoading ? (
                                <>
                                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                  Refreshing...
                                </>
                              ) : (
                                "Refresh Sessions"
                              )}
                            </Button>
                            {process.env.NODE_ENV === "development" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={createTestSession}
                                className="text-blue-600"
                              >
                                Add Test Session
                              </Button>
                            )}
                          </div>
                        </div>

                        <SessionList
                          fields={[
                            "session.id",
                            "session.createdAt",
                            "session.updatedAt",
                            "session.expiresAt",
                            "session.ipAddress",
                            "session.userAgent",
                          ]}
                          sessions={
                            sessionsLoading
                              ? []
                              : allSessions.map((sessionData: any) => ({
                                  id: sessionData.session.id,
                                  createdAt:
                                    (sessionData.session.createdAt as Date)?.toISOString() ||
                                    new Date().toISOString(),
                                  updatedAt:
                                    (sessionData.session.updatedAt as Date)?.toISOString() ||
                                    new Date().toISOString(),
                                  expiresAt:
                                    (sessionData.session.expiresAt as Date)?.toISOString() ||
                                    new Date().toISOString(),
                                  ipAddress:
                                    sessionData.session.ipAddress || "Unknown",
                                  userAgent:
                                    sessionData.session.userAgent || "Unknown",
                                }))
                          }
                          onUpdate={(data: any) => {
                            handleDataUpdate("sessions", data);
                            fetchSessions();
                          }}
                        />

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                          <Button
                            variant="outline"
                            onClick={async () => {
                              try {
                                // Frontend-only placeholder: keep only current session
                                setAllSessions((prev) =>
                                  prev.filter((s: any) => s.session.token === currentSession.token)
                                );
                                console.log("Successfully revoked other sessions (local)");
                              } catch (error) {
                                handleError(error, "session revocation");
                              }
                            }}
                          >
                            Revoke Other Sessions
                          </Button>
                          <SessionTimeoutSettings />
                        </div>

                        {/* Session Security Information */}
                        <Alert>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription>
                            For security, sessions will automatically expire
                            after a period of inactivity. You can revoke
                            sessions from devices you no longer use.
                          </AlertDescription>
                        </Alert>
                      </div>
                    )}

                    {/* Session Revocation Tab */}
                    {activeTab === "session-revocation" && (
                      <RevokeSession
                        fields={[
                          "session.id",
                          "session.userAgent",
                          "session.ipAddress",
                          "session.expiresAt",
                        ]}
                        sessions={
                          sessionsLoading
                            ? []
                            : allSessions.map((sessionData) => ({
                              id: sessionData.session.id,
                              userAgent:
                                sessionData.session.userAgent || "Unknown",
                              ipAddress:
                                sessionData.session.ipAddress || "Unknown",
                              expiresAt:
                                sessionData.session.expiresAt?.toISOString() ||
                                new Date().toISOString(),
                              token: sessionData.session.token,
                            }))
                        }
                        actions={["Revoke", "Revoke All Sessions"]}
                        onUpdate={(data) => {
                          handleDataUpdate("sessions", data);
                          // Refresh the sessions list after revocation
                          fetchSessions();
                        }}
                      />
                    )}

                    {/* Connected Accounts Tab */}
                    {activeTab === "connected-accounts" && (
                      <div className="space-y-6">
                        <OAuthAccountList
                          fields={[
                            "account.providerId",
                            "account.accountId",
                            "account.accessTokenExpiresAt",
                            "account.scope",
                          ]}
                          accounts={[]}
                          onUpdate={(data) =>
                            handleDataUpdate("oauthAccounts", data)
                          }
                        />

                        <div className="flex gap-3">
                          <ConnectNewAccountButton />
                          <DisconnectAccountButton />
                        </div>
                      </div>
                    )}

                    {/* Organization & Teams Tab */}
                    {activeTab === "organization" && (
                      <div className="space-y-6">
                        {activeOrgLoading ? (
                          <div className="py-4 text-center">
                            <div className="mx-auto mb-2 h-6 w-6 animate-spin rounded-full border-primary border-b-2" />
                            <p className="text-muted-foreground text-sm">
                              Loading organization...
                            </p>
                          </div>
                        ) : activeOrganization ? (
                          <>
                            <OrganizationOverview
                              fields={[
                                "organization.name",
                                "organization.logo",
                              ]}
                              organization={{
                                id: activeOrganization.id,
                                name: activeOrganization.name,
                                logo: activeOrganization.logo || undefined,
                              }}
                            />

                            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                              <RoleBadge
                                field="member.role"
                                value={
                                  activeOrganization.members[0]?.role ||
                                  "member"
                                }
                              />
                              <TeamDisplay
                                field="team.name"
                                value={
                                  activeOrganization.members[0]?.teamId ||
                                  "No Team"
                                }
                              />
                              <SwitchOrganizationDropdown />
                            </div>

                            <Separator />

                            <div className="space-y-4">
                              <LeaveOrganizationButton />

                              <div>
                                <h4 className="mb-3 font-semibold">
                                  Invitations Sent
                                </h4>
                                  <InvitationsSent
                                  fields={[
                                    "invitation.email",
                                    "invitation.role",
                                    "invitation.status",
                                    "invitation.expiresAt",
                                  ]}
                                  invitations={(
                                    activeOrganization.invitations || []
                                  ).map((inv: any) => ({
                                    ...inv,
                                    expiresAt:
                                      (inv.expiresAt as Date)?.toISOString() ||
                                      new Date().toISOString(),
                                  }))}
                                  onUpdate={(data) =>
                                    handleDataUpdate("invitationsSent", data)
                                  }
                                />
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="py-8 text-center">
                            <Building2 className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                            <h3 className="mb-2 font-semibold text-lg">
                              No Organization
                            </h3>
                            <p className="text-muted-foreground">
                              You're not part of any organization yet.
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Pending Invitations Tab */}
                    {activeTab === "pending-invitations" && (
                      <div className="space-y-6">
                        <InvitationList
                          fields={[
                            "invitation.organizationId",
                            "invitation.role",
                            "invitation.status",
                            "invitation.expiresAt",
                          ]}
                          invitations={[]}
                          onUpdate={(data) =>
                            handleDataUpdate("pendingInvitations", data)
                          }
                        />

                        <div className="flex gap-3">
                          <AcceptInvitationButton />
                          <DeclineInvitationButton />
                        </div>
                      </div>
                    )}

                    {/* Danger Zone Tab */}
                    {activeTab === "danger-zone" && (
                      <DangerZone
                        userData={{ user, session: currentSession }}
                        onUpdate={(data) => handleDataUpdate("user", data)}
                      />
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
