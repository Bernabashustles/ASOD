import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dynamic from 'next/dynamic';

const TiptapEditor = dynamic(() => import('@/components/TiptapEditor'), {
  ssr: false,
  loading: () => (
    <div className="border rounded-md p-4 w-full min-h-[200px] bg-gray-50 animate-pulse" />
  ),
});

interface ProductDetailsProps {
  title: string;
  description: string;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onOpenAIDialog: () => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  onOpenAIDialog
}) => {
  return (
    <Card className="sm:rounded-lg rounded-none mx-[-1rem] sm:mx-0">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title" 
              placeholder="Short sleeve t-shirt"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Description</Label>
              <Button 
                variant="outline" 
                size="sm"
                className="gap-2"
                onClick={onOpenAIDialog}
              >
                <Sparkles className="w-4 h-4" />
                Generate with AI
              </Button>
            </div>
            <TiptapEditor 
              onChange={onDescriptionChange}
              content={description}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 