'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Eye, Save, FileDown, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ProductFormActionsProps {
  onPreview?: () => void;
  onDiscard: () => void;
  onSaveDraft?: () => void;
  onSave: () => void;
  isSubmitting: boolean;
  canSave?: boolean;
}

const ProductFormActions: React.FC<ProductFormActionsProps> = ({ 
  onPreview,
  onDiscard, 
  onSaveDraft, 
  onSave, 
  isSubmitting, 
  canSave = true
}) => {
  // Mobile view uses a dropdown for secondary actions
  const mobileView = (
    <div className="flex items-center gap-2 sm:hidden w-full justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            disabled={isSubmitting}
          >
            Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          {onPreview && (
            <DropdownMenuItem onClick={onPreview} disabled={isSubmitting}>
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </DropdownMenuItem>
          )}
          {onSaveDraft && (
            <DropdownMenuItem onClick={onSaveDraft} disabled={isSubmitting}>
              <FileDown className="mr-2 h-4 w-4" />
              Save as draft
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={onDiscard} disabled={isSubmitting} className="text-red-600">
            <X className="mr-2 h-4 w-4" />
            Discard
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button 
        size="sm" 
        onClick={onSave} 
        disabled={isSubmitting || !canSave}
        type="submit"
        className="bg-gray-900 text-white hover:bg-gray-800"
      >
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save
      </Button>
    </div>
  );

  // Desktop view shows all buttons inline
  const desktopView = (
    <div className="hidden sm:flex items-center gap-2">
      {onPreview && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onPreview} 
          disabled={isSubmitting}
          type="button"
        >
          <Eye className="mr-1.5 h-4 w-4" />
          Preview
        </Button>
      )}
      <Button 
        variant="ghost"
        size="sm" 
        onClick={onDiscard} 
        disabled={isSubmitting}
        type="button"
      >
        Discard
      </Button>
      {onSaveDraft && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onSaveDraft} 
          disabled={isSubmitting}
          type="button"
        >
          <FileDown className="mr-1.5 h-4 w-4" />
          Save as draft
        </Button>
      )}
      <Button 
        size="sm" 
        onClick={onSave} 
        disabled={isSubmitting || !canSave}
        type="submit"
        className="bg-gray-900 text-white hover:bg-gray-800"
      >
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        <Save className="mr-1.5 h-4 w-4" />
        Save
      </Button>
    </div>
  );

  return (
    <div className="w-full sm:w-auto">
      {mobileView}
      {desktopView}
    </div>
  );
};

export default ProductFormActions; 