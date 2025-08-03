'use client';

import { useState } from 'react';
import { Globe, Info, ChevronRight, Check } from 'lucide-react';
import { SettingsPage } from '../components/settings-page';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Language {
  id: string;
  name: string;
  code: string;
  isDefault?: boolean;
  status: 'active' | 'inactive';
}

export default function LanguagesPage() {
  const [showAddLanguage, setShowAddLanguage] = useState(false);
  const [languages, setLanguages] = useState<Language[]>([
    {
      id: '1',
      name: 'English',
      code: 'en',
      isDefault: true,
      status: 'active'
    }
  ]);

  return (
    <SettingsPage title="Languages">
      {/* Store Languages */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Store languages</CardTitle>
              <CardDescription>
                Add languages to your store to reach customers in their preferred language
              </CardDescription>
            </div>
            <Button onClick={() => setShowAddLanguage(true)}>
              Add language
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {languages.map((language) => (
              <div 
                key={language.id}
                className="flex items-center justify-between py-4 border-b last:border-0"
              >
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {language.name}
                      {language.isDefault && (
                        <Badge variant="secondary">Default</Badge>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      Language code: {language.code}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={language.status === 'active' ? 'default' : 'secondary'}
                    className={cn(
                      language.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''
                    )}
                  >
                    {language.status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Translation Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Translation settings</CardTitle>
          <CardDescription>
            Configure how translations are handled in your store
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              'Auto-translate new content',
              'Translation service preferences',
              'Import/Export translations'
            ].map((setting) => (
              <div 
                key={setting}
                className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 -mx-6 px-6"
              >
                <div className="font-medium">{setting}</div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Language Dialog */}
      <Dialog open={showAddLanguage} onOpenChange={setShowAddLanguage}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add language</DialogTitle>
            <DialogDescription>
              Select a language to add to your store
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="relative">
              <Input
                placeholder="Search languages"
                className="pl-9"
              />
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            </div>
            <div className="max-h-[300px] overflow-y-auto space-y-2">
              {['French', 'Spanish', 'German', 'Italian', 'Japanese'].map((lang) => (
                <div 
                  key={lang}
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                >
                  <div className="font-medium">{lang}</div>
                  <Button variant="ghost" size="sm">
                    Add
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddLanguage(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SettingsPage>
  );
} 