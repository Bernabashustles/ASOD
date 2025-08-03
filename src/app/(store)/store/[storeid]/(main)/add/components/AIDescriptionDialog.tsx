import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AIDescriptionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (description: string) => void;
  isGenerating: boolean;
}

export const AIDescriptionDialog: React.FC<AIDescriptionDialogProps> = ({
  isOpen,
  onClose,
  onGenerate,
  isGenerating
}) => {
  const [aiDescriptionInput, setAiDescriptionInput] = useState('');
  
  const handleGenerate = async () => {
    // Simulate AI generation delay - in a real app this would call an AI service
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock generated description
    const mockDescription = `
      <p>
        ${aiDescriptionInput}
      </p>
      <p>
        This premium product offers exceptional quality and outstanding features that set it apart from the competition.
      </p>
    `;
    
    onGenerate(mockDescription);
    setAiDescriptionInput('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Generate AI Description</DialogTitle>
          <DialogDescription>
            Provide a brief description of your product to generate detailed content.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="space-y-2">
            <Label>Description Prompt</Label>
            <textarea 
              className="min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Describe your product briefly (e.g., A waterproof winter jacket with thermal lining, perfect for extreme weather conditions)"
              value={aiDescriptionInput}
              onChange={(e) => setAiDescriptionInput(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              onClose();
              setAiDescriptionInput('');
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !aiDescriptionInput.trim()}
          >
            {isGenerating ? (
              <>
                <span className="animate-spin mr-2">↻</span>
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}; 