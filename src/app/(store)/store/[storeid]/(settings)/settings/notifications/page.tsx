'use client';

import { useState } from 'react';
import { Bell, Mail, Phone, MessageSquare, Info, ChevronRight } from 'lucide-react';
import { SettingsPage } from '../components/settings-page';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NotificationChannel {
  id: string;
  name: string;
  description: string;
  icon: typeof Bell;
  enabled: boolean;
  status?: 'configured' | 'not_configured';
}

export default function NotificationsPage() {
  const [channels, setChannels] = useState<NotificationChannel[]>([
    {
      id: 'email',
      name: 'Email notifications',
      description: 'Receive order and customer notifications via email',
      icon: Mail,
      enabled: true,
      status: 'configured'
    },
    {
      id: 'sms',
      name: 'SMS notifications',
      description: 'Get important updates on your phone',
      icon: Phone,
      enabled: false,
      status: 'not_configured'
    },
    {
      id: 'push',
      name: 'Push notifications',
      description: 'Receive notifications in your browser',
      icon: Bell,
      enabled: false
    }
  ]);

  const toggleChannel = (channelId: string) => {
    setChannels(channels.map(channel => 
      channel.id === channelId 
        ? { ...channel, enabled: !channel.enabled }
        : channel
    ));
  };

  return (
    <SettingsPage title="Notifications">
      {/* Notification Preferences */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-base">Notification preferences</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Manage how you receive notifications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <CardDescription>
            Choose how you want to be notified about orders, customers, and products
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {channels.map((channel) => (
            <div 
              key={channel.id}
              className="flex items-center justify-between py-2"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <channel.icon className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <div className="font-medium flex items-center gap-2">
                    {channel.name}
                    {channel.status && (
                      <Badge 
                        variant={channel.status === 'configured' ? 'success' : 'secondary'}
                      >
                        {channel.status === 'configured' ? 'Configured' : 'Not configured'}
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">{channel.description}</div>
                </div>
              </div>
              <Switch
                checked={channel.enabled}
                onCheckedChange={() => toggleChannel(channel.id)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Notification Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Notification templates</CardTitle>
          <CardDescription>
            Customize the content of your notification messages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {['Order notifications', 'Customer notifications', 'Product updates'].map((template) => (
              <div 
                key={template}
                className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 -mx-6 px-6"
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-gray-500" />
                  <div className="font-medium">{template}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </SettingsPage>
  );
} 