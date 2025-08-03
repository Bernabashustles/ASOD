import React from 'react';
import { ArrowLeft, Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ProductHeaderProps {
  onOpenPreview: () => void;
}

export const ProductHeader: React.FC<ProductHeaderProps> = ({
  onOpenPreview
}) => {
  return (
    <div className="sticky top-0 z-20 bg-gray-50/50 backdrop-blur-sm">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-3">
        <div className="bg-white border rounded-lg shadow-sm">
          <div className="flex h-14 items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-lg font-medium">Add product</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onOpenPreview}
                className="hidden sm:flex gap-2"
              >
                <Eye className="w-4 h-4" />
                Preview
              </Button>
              <div className="hidden sm:flex items-center gap-2">
                <Button variant="ghost" size="sm">Discard</Button>
                <Button variant="outline" size="sm">Save as draft</Button>
              </div>
              <Button size="sm" className="bg-black hover:bg-black/90">Save</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 