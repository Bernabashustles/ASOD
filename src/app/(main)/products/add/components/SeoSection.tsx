'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ExternalLink, Edit3, X, Save } from 'lucide-react';

// Define the expected shape for the specific fields this component handles
interface SeoData {
    // Include fields needed for defaults
    title: string;
    description: string;
    // SEO specific fields
    seoTitle?: string;
    seoDescription?: string;
    urlHandle?: string; 
}

interface SeoSectionProps {
  formData: SeoData; // Use the specific shape
  onChange: (field: keyof SeoData, value: any) => void; // Use keyof specific shape
}

// Helper to generate URL handle (simplified)
const generateUrlHandle = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove non-word chars except space/hyphen
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .substring(0, 70); // Limit length
};

const SeoSection: React.FC<SeoSectionProps> = ({ formData, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localFormData, setLocalFormData] = useState<Partial<SeoData>>({});

  // Use specific SEO fields if available, otherwise fallback to product defaults
  const seoTitle = formData.seoTitle ?? formData.title;
  // Simple plain text extraction from Tiptap description (needs improvement for real HTML)
  const plainDescription = (htmlString: string) => {
     if (!htmlString) return '';
     // Basic implementation: remove HTML tags
     const doc = typeof window !== 'undefined' ? new DOMParser().parseFromString(htmlString, 'text/html') : null;
     return doc?.body.textContent || "";
  };
  const defaultSeoDescription = plainDescription(formData.description).substring(0, 320); // Max length for description is 320
  const currentSeoDescription = formData.seoDescription ?? defaultSeoDescription;
  const urlHandle = formData.urlHandle ?? generateUrlHandle(formData.title);

  const handleEditClick = () => {
    setIsEditing(true);
    // Store current values in local state for editing
    setLocalFormData({
      seoTitle: formData.seoTitle || formData.title,
      seoDescription: formData.seoDescription || defaultSeoDescription,
      urlHandle: formData.urlHandle || generateUrlHandle(formData.title)
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setLocalFormData({});
  };

  const handleSave = () => {
    // Save each field if it was edited
    if (localFormData.seoTitle !== undefined) {
      onChange('seoTitle', localFormData.seoTitle);
    }
    if (localFormData.seoDescription !== undefined) {
      onChange('seoDescription', localFormData.seoDescription);
    }
    if (localFormData.urlHandle !== undefined) {
      onChange('urlHandle', localFormData.urlHandle);
    }
    setIsEditing(false);
  };

  const handleLocalChange = (field: keyof SeoData, value: any) => {
    setLocalFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 pb-3">
        <div>
           <CardTitle className="text-sm sm:text-base font-medium">Search engine listing</CardTitle>
           <CardDescription className="text-[10px] sm:text-xs pt-0.5 sm:pt-1">
             {!isEditing ? 'Add a title and description to see how this product might appear in a search engine listing.' : 'Edit how this product appears in search results.'}
           </CardDescription>
        </div>
        {!isEditing && (formData.title || formData.description) && (
          <Button variant="outline" size="sm" className="h-7 sm:h-8 text-xs sm:text-sm" onClick={handleEditClick}>
             <Edit3 className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
             Edit
          </Button>
        )}
        {isEditing && (
          <div className="flex gap-1 sm:gap-2 self-end sm:self-auto">
            <Button variant="outline" size="sm" className="h-7 sm:h-8 text-xs sm:text-sm" onClick={handleCancel}>
              <X className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
              Cancel
            </Button>
            <Button variant="default" size="sm" className="h-7 sm:h-8 text-xs sm:text-sm" onClick={handleSave}>
              <Save className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
              Save
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-3 sm:p-6">
        {!isEditing ? (
          /* Preview Mode */
          <div className="p-3 sm:p-4 border rounded-md bg-white min-h-[90px] sm:min-h-[100px]">
            {(seoTitle || currentSeoDescription) ? (
              <>
                 <p className="text-blue-700 text-base sm:text-lg font-medium truncate">
                     {seoTitle || "[Product Title]"}
                 </p>
                 <p className="text-green-700 text-xs sm:text-sm truncate">
                     {`https://yourstore.com/products/${urlHandle || "[product-handle]"}`}
                 </p>
                 <p className="text-gray-600 text-xs sm:text-sm mt-1 line-clamp-2">
                     {currentSeoDescription || "[Product description...]"}
                 </p>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                 <p className="text-xs sm:text-sm text-gray-500">Enter a title or description to see the preview.</p>
              </div>
            )}
          </div>
        ) : (
          /* Edit Mode */
          <div className="space-y-3 sm:space-y-4">
             <div className="space-y-1 sm:space-y-1.5">
               <Label htmlFor="seo-title" className="text-xs sm:text-sm">Page title</Label>
               <Input 
                 id="seo-title"
                 value={localFormData.seoTitle || ''}
                 onChange={(e) => handleLocalChange('seoTitle', e.target.value)}
                 maxLength={70} // Standard SEO title length
                 className="h-8 sm:h-9 text-xs sm:text-sm"
               />
               <p className="text-[10px] sm:text-xs text-gray-500">{ (localFormData.seoTitle || '').length } of 70 characters used.</p>
             </div>
              <div className="space-y-1 sm:space-y-1.5">
               <Label htmlFor="seo-description" className="text-xs sm:text-sm">Meta description</Label>
               <Textarea 
                 id="seo-description"
                 value={localFormData.seoDescription || ''}
                 onChange={(e) => handleLocalChange('seoDescription', e.target.value)}
                 rows={4}
                 maxLength={320} // Updated standard meta description length
                 className="text-xs sm:text-sm min-h-[70px] sm:min-h-[100px]"
               />
               <p className="text-[10px] sm:text-xs text-gray-500">{ (localFormData.seoDescription || '').length } of 320 characters used.</p>
             </div>
              <div className="space-y-1 sm:space-y-1.5">
               <Label htmlFor="url-handle" className="text-xs sm:text-sm">URL handle</Label>
               <div className="relative">
                  <span className="absolute left-0 top-0 bottom-0 flex items-center pl-3 text-xs sm:text-sm text-gray-500">/products/</span>
                  <Input 
                    id="url-handle"
                    value={localFormData.urlHandle || ''}
                    onChange={(e) => handleLocalChange('urlHandle', generateUrlHandle(e.target.value))} // Auto-format handle
                    className="pl-[65px] sm:pl-[75px] h-8 sm:h-9 text-xs sm:text-sm" // Adjust padding based on prefix length
                  />
               </div>
             </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SeoSection; 