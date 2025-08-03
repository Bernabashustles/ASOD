'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Save, Eye, Settings } from 'lucide-react';

interface ActionButtonsProps {
  currentStep: string;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  onSave: () => void;
}

export default function ActionButtons({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  onSave,
}: ActionButtonsProps) {
  const currentStepIndex = parseInt(currentStep) || 1;
  const isFirstStep = currentStepIndex === 1;
  const isLastStep = currentStepIndex === totalSteps;

  return (
    <Card className="border border-gray-200 bg-white shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {!isFirstStep && (
              <Button
                variant="outline"
                onClick={onPrevious}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
            )}
            
            <div className="text-sm text-gray-600">
              Step {currentStepIndex} of {totalSteps}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
              <Settings className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            
            {!isLastStep ? (
              <Button
                onClick={onNext}
                className="bg-black hover:bg-gray-800 text-white"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={onSave}
                className="bg-black hover:bg-gray-800 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Variant
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 