import React from 'react';

interface SettingsPageProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export function SettingsPage({ children, title, description }: SettingsPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
} 