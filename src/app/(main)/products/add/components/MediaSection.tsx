'use client';

import React, { useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadCloud, Image as ImageIcon, Video, File as FileIcon, X, GripVertical, Wand2, Camera, Sparkles, RotateCw, Eye, ZoomIn, TrashIcon, Edit3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'model'; // Differentiate file types
  size: number;
  thumbnail?: string; // Optional thumbnail for videos
  alt?: string; // Alt text for images
  status?: 'uploading' | 'processing' | 'error' | 'complete'; // Upload/processing status
  progress?: number; // Upload progress
  optimized?: boolean; // Whether image has been optimized
  enhanced?: boolean; // Whether image has been AI-enhanced
}

// Define the expected shape for the specific fields this component handles
interface MediaData {
   media?: MediaFile[];
}

interface MediaSectionProps {
  formData: MediaData; // Use the specific shape
  onChange: (field: keyof MediaData, value: any) => void; // Use keyof specific shape
}

const MediaSection: React.FC<MediaSectionProps> = ({ formData, onChange }) => {
  const [files, setFiles] = useState<MediaFile[]>(formData.media || []);
  const [isDragging, setIsDragging] = useState(false);
  const [showOptimizeDialog, setShowOptimizeDialog] = useState(false);
  const [currentFileIndex, setCurrentFileIndex] = useState<number | null>(null);
  const [aiEnhancing, setAiEnhancing] = useState(false);
  const [enhanceProgress, setEnhanceProgress] = useState(0);
  const [previewDialog, setPreviewDialog] = useState(false);
  const [cropMode, setCropMode] = useState(false);
  const [imageSettings, setImageSettings] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
  });
  
  // Ref for the file input element
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Drag and drop handlers
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  // Function to handle selected files
  const handleFiles = useCallback((selectedFiles: File[]) => {
    // Simulate upload and add to state
    const newFiles: MediaFile[] = selectedFiles.map((file, index) => {
      // Filter for accepted file types
      const isImage = file.type.startsWith('image');
      const isVideo = file.type.startsWith('video');
      const isModel = file.type.includes('model') || file.name.endsWith('.glb') || file.name.endsWith('.gltf');
      
      if (!isImage && !isVideo && !isModel) {
        // Skip unsupported file types
        return null;
      }

      return {
        id: `new-${Date.now()}-${index}`,
        name: file.name,
        url: URL.createObjectURL(file), // Temporary URL for preview
        type: isImage ? 'image' : isVideo ? 'video' : 'model',
        size: file.size,
        alt: file.name.split('.')[0], // Default alt text from filename
        status: 'uploading',
        progress: 0,
      };
    }).filter(Boolean) as MediaFile[];
    
    if (newFiles.length === 0) return;

    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    onChange('media', updatedFiles);

    // Simulate upload progress for each file
    newFiles.forEach((file) => {
      simulateFileUpload(file.id);
    });
  }, [files, onChange]);

  // Simulate file upload progress
  const simulateFileUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        setFiles(prevFiles => 
          prevFiles.map(f => 
            f.id === fileId 
              ? { ...f, status: 'complete', progress: 100 } 
              : f
          )
        );
        onChange('media', files.map(f => 
          f.id === fileId 
            ? { ...f, status: 'complete', progress: 100 } 
            : f
        ));
      } else {
        setFiles(prevFiles => 
          prevFiles.map(f => 
            f.id === fileId 
              ? { ...f, progress } 
              : f
          )
        );
      }
    }, 200);
  };

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  // Remove a file
  const removeFile = (id: string) => {
    const updatedFiles = files.filter(file => file.id !== id);
    setFiles(updatedFiles);
    onChange('media', updatedFiles);
    // Clean up object URLs if necessary
    const fileToRemove = files.find(f => f.id === id);
    if (fileToRemove && fileToRemove.url.startsWith('blob:')) {
      URL.revokeObjectURL(fileToRemove.url);
    }
  };

  // Set file as cover image
  const setAsCover = (id: string) => {
    const fileIndex = files.findIndex(f => f.id === id);
    if (fileIndex > 0) {
      const updatedFiles = [...files];
      const [movedFile] = updatedFiles.splice(fileIndex, 1);
      updatedFiles.unshift(movedFile);
      setFiles(updatedFiles);
      onChange('media', updatedFiles);
    }
  };

  // Open the image editor/optimizer
  const openOptimizer = (index: number) => {
    setCurrentFileIndex(index);
    setShowOptimizeDialog(true);
  };

  // Apply AI enhancement
  const applyAIEnhancement = () => {
    if (currentFileIndex === null) return;
    
    setAiEnhancing(true);
    setEnhanceProgress(0);
    
    // Simulate AI processing
    const enhanceInterval = setInterval(() => {
      setEnhanceProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(enhanceInterval);
          setTimeout(() => {
            // Update the file with enhanced status
            setFiles(prevFiles => {
              const newFiles = [...prevFiles];
              if (currentFileIndex !== null) {
                newFiles[currentFileIndex] = {
                  ...newFiles[currentFileIndex],
                  enhanced: true,
                };
              }
              onChange('media', newFiles);
              return newFiles;
            });
            setAiEnhancing(false);
            setEnhanceProgress(0);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 100);
  };

  // Apply image optimizations
  const applyOptimizations = () => {
    if (currentFileIndex === null) return;
    
    // Simulate optimization
    setFiles(prevFiles => {
      const newFiles = [...prevFiles];
      if (currentFileIndex !== null) {
        newFiles[currentFileIndex] = {
          ...newFiles[currentFileIndex],
          optimized: true,
        };
      }
      onChange('media', newFiles);
      return newFiles;
    });
    
    setShowOptimizeDialog(false);
  };

  // Preview image
  const openPreview = (index: number) => {
    setCurrentFileIndex(index);
    setPreviewDialog(true);
  };

  // Render file preview
  const renderFilePreview = (file: MediaFile) => {
    if (file.type === 'image') {
      return (
        <div className="relative h-full w-full">
          <img src={file.url} alt={file.name} className="h-full w-full object-cover" />
          {file.enhanced && (
            <div className="absolute top-1 left-1">
              <Badge variant="secondary" className="bg-gray-800 text-white border-gray-700 text-xs px-1.5">
                <Sparkles className="h-3 w-3 mr-1" /> Enhanced
              </Badge>
            </div>
          )}
          {file.optimized && (
            <div className="absolute top-1 right-1">
              <Badge variant="secondary" className="bg-gray-100 text-gray-800 border-gray-200 text-xs px-1.5">
                Optimized
              </Badge>
            </div>
          )}
        </div>
      );
    } else if (file.type === 'video') {
      return (
        <div className="relative h-full w-full flex items-center justify-center bg-gray-800">
          <video className="h-full w-full object-cover">
            <source src={file.url} type="video/mp4" />
          </video>
          <div className="absolute inset-0 flex items-center justify-center">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
              <Video className="h-3.5 w-3.5 mr-1" /> Video
            </Badge>
          </div>
        </div>
      );
    } else {
      return (
        <div className="h-full w-full flex items-center justify-center bg-gray-100">
          <Badge variant="secondary" className="bg-orange-100 text-orange-700 border-orange-200">
            <FileIcon className="h-3.5 w-3.5 mr-1" /> 3D Model
          </Badge>
        </div>
      );
    }
  };

  // Render upload item with progress
  const renderUploadItem = (file: MediaFile) => {
    return (
      <div className="relative group aspect-square border rounded-md overflow-hidden bg-white">
        {file.status === 'uploading' && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-2">
            <Progress value={file.progress} className="w-4/5 h-1 sm:h-1.5" />
            <p className="text-[10px] sm:text-xs text-gray-600 mt-1 sm:mt-1.5">{Math.round(file.progress || 0)}%</p>
          </div>
        )}

        <div className="absolute top-1 right-1 z-10 flex gap-0.5 sm:gap-1">
          <TooltipProvider key={`edit-tooltip-${file.id}`} delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="secondary"
                  size="icon"
                  className="h-5 w-5 sm:h-6 sm:w-6 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white backdrop-blur-sm"
                  onClick={() => file.type === 'image' && openOptimizer(files.indexOf(file))}
                  disabled={file.status === 'uploading' || file.type !== 'image'}
                >
                  <Edit3 className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-gray-700" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" align="center" className="bg-gray-900 text-white text-xs">
                Edit image
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider key={`preview-tooltip-${file.id}`} delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="secondary"
                  size="icon"
                  className="h-5 w-5 sm:h-6 sm:w-6 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white backdrop-blur-sm"
                  onClick={() => file.type === 'image' && openPreview(files.indexOf(file))}
                  disabled={file.status === 'uploading' || file.type !== 'image'}
                >
                  <Eye className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-gray-700" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" align="center" className="bg-gray-900 text-white text-xs">
                Preview
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider key={`remove-tooltip-${file.id}`} delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="destructive"
                  size="icon"
                  className="h-5 w-5 sm:h-6 sm:w-6 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white backdrop-blur-sm border-none text-red-600 hover:text-red-700"
                  onClick={() => removeFile(file.id)}
                  disabled={file.status === 'uploading'}
                >
                  <X className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" align="center" className="bg-gray-900 text-white text-xs">
                Remove
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* For mobile, add a visible button bar at the bottom instead of only on hover */}
        <div className="sm:hidden absolute bottom-0 left-0 right-0 flex justify-between items-center p-1 bg-black/40 backdrop-blur-sm z-10">
          <p className="text-white text-[9px] truncate flex-1 opacity-80">
            {files.indexOf(file) === 0 ? 'Cover' : ''}
          </p>
          <div className="flex gap-1">
            {file.type === 'image' && (
              <Button 
                variant="secondary"
                size="icon"
                className="h-5 w-5 p-0.5 bg-white/20 hover:bg-white/40"
                onClick={() => file.type === 'image' && openOptimizer(files.indexOf(file))}
                disabled={file.status === 'uploading' || file.type !== 'image'}
              >
                <Edit3 className="h-2.5 w-2.5 text-white" />
              </Button>
            )}
            <Button 
              variant="destructive"
              size="icon"
              className="h-5 w-5 p-0.5 bg-white/20 hover:bg-white/40 border-none text-white"
              onClick={() => removeFile(file.id)}
              disabled={file.status === 'uploading'}
            >
              <X className="h-2.5 w-2.5" />
            </Button>
          </div>
        </div>

        <div className="h-full w-full flex items-center justify-center">
          {renderFilePreview(file)}
        </div>

        <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/60 to-transparent pt-6 pb-1.5 px-2 hidden sm:block">
          <div className="flex items-center justify-between">
            <p className="text-white text-xs truncate flex-1">{file.name}</p>
            {files.indexOf(file) !== 0 && file.type === 'image' && (
              <TooltipProvider key={`cover-tooltip-${file.id}`} delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="h-5 ml-1 py-0 px-1.5 text-[10px] bg-white/20 hover:bg-white/30 text-white"
                      onClick={() => setAsCover(file.id)}
                      disabled={file.status === 'uploading'}
                    >
                      Set as cover
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-gray-900 text-white text-xs">
                    Make this the main product image
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>

        {files.indexOf(file) === 0 && (
          <div className="absolute top-0 left-0 bg-black/50 text-white text-[9px] sm:text-xs py-0.5 px-1.5 sm:py-1 sm:px-2 rounded-br-md hidden sm:block">
            Cover
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="border-gray-200 shadow-sm hover:shadow transition-shadow duration-200">
      <CardHeader className="pb-3 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-lg font-medium">Product Media</CardTitle>
            <CardDescription className="text-sm text-gray-500 mt-1">
              Add photos, videos or 3D models of your product
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 font-normal self-start sm:self-auto">
            {files.length} / 10 files
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4 sm:pt-6">
        <div 
          className={`border-2 border-dashed rounded-lg p-4 sm:p-8 text-center transition-all cursor-pointer 
            ${isDragging ? 'border-black bg-gray-50 scale-[0.99]' : 'border-gray-300 hover:border-gray-500 hover:bg-gray-50/50'}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            ref={fileInputRef}
            type="file" 
            onChange={handleFileInputChange}
            accept="image/*,video/*,.glb,.gltf"
            multiple
            className="hidden"
          />
          <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-3 py-3 sm:py-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <UploadCloud className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm sm:text-base font-medium text-gray-700">
                {isDragging ? 'Drop to upload files' : 'Drag and drop to upload'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                Drag and drop files or click to browse
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1 text-xs text-gray-500">
              <Badge variant="outline" className="font-normal text-[10px] sm:text-xs px-1.5 sm:px-2">
                <ImageIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" /> Images
              </Badge>
              <Badge variant="outline" className="font-normal text-[10px] sm:text-xs px-1.5 sm:px-2">
                <Video className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" /> Videos
              </Badge>
              <Badge variant="outline" className="font-normal text-[10px] sm:text-xs px-1.5 sm:px-2">
                <FileIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" /> 3D Models
              </Badge>
            </div>
            <Button
              type="button"
              variant="default"
              size="sm"
              className="mt-1 sm:mt-2 bg-black hover:bg-gray-800 text-xs sm:text-sm px-3 py-1 h-auto sm:h-8"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              Select Files
            </Button>
          </div>
        </div>

        {files.length > 0 && (
          <div className="mt-4 sm:mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 sm:mb-3">
              <h3 className="text-sm sm:text-base font-medium text-gray-700">
                Media files ({files.length})
              </h3>
              {files.some(f => f.type === 'image' && !f.enhanced) && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1.5 text-black border-gray-300 bg-gray-50 hover:bg-gray-100 text-xs sm:text-sm py-1 h-auto sm:h-8 w-full sm:w-auto"
                  onClick={() => {
                    const firstImageIndex = files.findIndex(f => f.type === 'image' && !f.enhanced);
                    if (firstImageIndex !== -1) {
                      setCurrentFileIndex(firstImageIndex);
                      setShowOptimizeDialog(true);
                    }
                  }}
                >
                  <Wand2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  <span>Enhance All Images</span>
                </Button>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
              {files.map((file) => renderUploadItem(file))}
            </div>
          </div>
        )}

        {/* Image Optimizer Dialog */}
        {currentFileIndex !== null && (
          <Dialog open={showOptimizeDialog} onOpenChange={setShowOptimizeDialog}>
            <DialogContent className="w-[calc(100%-2rem)] sm:max-w-[650px] max-h-[90vh] overflow-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Edit3 className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
                  Optimize Image
                </DialogTitle>
                <DialogDescription className="text-xs sm:text-sm">
                  Apply adjustments or use AI enhancement to improve your product image.
                </DialogDescription>
              </DialogHeader>
              
              <Tabs defaultValue="adjust" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="adjust" className="text-xs sm:text-sm py-1.5 sm:py-2">Manual Adjustments</TabsTrigger>
                  <TabsTrigger value="ai" className="text-xs sm:text-sm py-1.5 sm:py-2">AI Enhancement</TabsTrigger>
                </TabsList>
                
                <TabsContent value="adjust" className="space-y-3 sm:space-y-4 pt-3 sm:pt-4">
                  <div className="aspect-video relative overflow-hidden border rounded-md">
                    {currentFileIndex !== null && files[currentFileIndex]?.type === 'image' && (
                      <img 
                        src={files[currentFileIndex].url} 
                        alt={files[currentFileIndex].name}
                        className="w-full h-full object-contain"
                        style={{
                          filter: `brightness(${imageSettings.brightness}%) contrast(${imageSettings.contrast}%) saturate(${imageSettings.saturation}%)`
                        }}
                      />
                    )}
                    {cropMode && (
                      <div className="absolute inset-0 border-2 border-dashed border-black flex items-center justify-center bg-black/20">
                        <Badge className="bg-black text-[10px] sm:text-xs">Drag to crop</Badge>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4 pt-1 sm:pt-2">
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="brightness" className="text-xs sm:text-sm">Brightness</Label>
                        <span className="text-[10px] sm:text-xs text-gray-500">{imageSettings.brightness}%</span>
                      </div>
                      <Slider
                        id="brightness"
                        min={50}
                        max={150}
                        step={1}
                        value={[imageSettings.brightness]}
                        onValueChange={(values) => setImageSettings({...imageSettings, brightness: values[0]})}
                      />
                    </div>
                    
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="contrast" className="text-xs sm:text-sm">Contrast</Label>
                        <span className="text-[10px] sm:text-xs text-gray-500">{imageSettings.contrast}%</span>
                      </div>
                      <Slider
                        id="contrast"
                        min={50}
                        max={150}
                        step={1}
                        value={[imageSettings.contrast]}
                        onValueChange={(values) => setImageSettings({...imageSettings, contrast: values[0]})}
                      />
                    </div>
                    
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="saturation" className="text-xs sm:text-sm">Saturation</Label>
                        <span className="text-[10px] sm:text-xs text-gray-500">{imageSettings.saturation}%</span>
                      </div>
                      <Slider
                        id="saturation"
                        min={50}
                        max={150}
                        step={1}
                        value={[imageSettings.saturation]}
                        onValueChange={(values) => setImageSettings({...imageSettings, saturation: values[0]})}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 sm:gap-3 pt-1 sm:pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-1 text-xs sm:text-sm h-7 sm:h-9 py-0"
                      onClick={() => setCropMode(!cropMode)}
                    >
                      <Camera className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> 
                      {cropMode ? 'Cancel Crop' : 'Crop Image'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-1 text-xs sm:text-sm h-7 sm:h-9 py-0"
                      onClick={() => setImageSettings({brightness: 100, contrast: 100, saturation: 100})}
                    >
                      <RotateCw className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> 
                      Reset
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="ai" className="space-y-3 sm:space-y-4 pt-3 sm:pt-4">
                  <div className="relative aspect-video border rounded-md overflow-hidden">
                    {currentFileIndex !== null && files[currentFileIndex]?.type === 'image' && (
                      <img 
                        src={files[currentFileIndex].url} 
                        alt={files[currentFileIndex].name}
                        className="w-full h-full object-contain"
                      />
                    )}
                    
                    {aiEnhancing && (
                      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex flex-col items-center justify-center">
                        <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-white mb-2 sm:mb-3 animate-pulse" />
                        <Progress value={enhanceProgress} className="w-2/3 h-1 sm:h-1.5 mb-1.5 sm:mb-2" />
                        <p className="text-white text-xs sm:text-sm font-medium">Applying AI enhancement...</p>
                        <p className="text-white/80 text-[10px] sm:text-xs">This may take a few moments</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-3 sm:p-4 bg-gray-50 border border-gray-200 rounded-md">
                    <h4 className="text-xs sm:text-sm font-medium text-gray-800 flex items-center gap-1.5 mb-1.5 sm:mb-2">
                      <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" /> 
                      AI Image Enhancement
                    </h4>
                    <p className="text-[10px] sm:text-xs text-gray-700 mb-2 sm:mb-3">
                      Our AI can automatically enhance your product images to make them more professional.
                      This process will:
                    </p>
                    <ul className="text-[10px] sm:text-xs text-gray-700 space-y-0.5 sm:space-y-1 mb-2 sm:mb-3">
                      <li className="flex items-center gap-1.5">
                        <Badge className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full p-0 bg-black" />
                        Remove backgrounds and clean up edges
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Badge className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full p-0 bg-black" />
                        Correct lighting and colors
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Badge className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full p-0 bg-black" />
                        Enhance details and sharpen product features
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Badge className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full p-0 bg-black" />
                        Optimize for web without quality loss
                      </li>
                    </ul>
                    <Button 
                      className="w-full bg-black hover:bg-gray-800 text-xs sm:text-sm h-8 sm:h-9"
                      onClick={applyAIEnhancement}
                      disabled={aiEnhancing}
                    >
                      {aiEnhancing ? 'Enhancing...' : 'Enhance with AI'}
                      {!aiEnhancing && <Wand2 className="h-3 w-3 sm:h-4 sm:w-4 ml-1.5" />}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
              
              <DialogFooter className="flex flex-col sm:flex-row items-center justify-between sm:justify-between gap-2 sm:gap-0">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowOptimizeDialog(false);
                    setCropMode(false);
                    setImageSettings({brightness: 100, contrast: 100, saturation: 100});
                  }}
                  className="w-full sm:w-auto text-xs sm:text-sm h-8 sm:h-9"
                >
                  Cancel
                </Button>
                <Button
                  onClick={applyOptimizations}
                  disabled={aiEnhancing}
                  className="bg-black hover:bg-gray-800 w-full sm:w-auto text-xs sm:text-sm h-8 sm:h-9"
                >
                  Apply Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Image Preview Dialog */}
        {currentFileIndex !== null && (
          <Dialog open={previewDialog} onOpenChange={setPreviewDialog}>
            <DialogContent className="sm:max-w-[800px] p-0 sm:p-1 border-0 max-h-screen overflow-hidden">
              {currentFileIndex !== null && files[currentFileIndex]?.type === 'image' && (
                <div className="relative w-full h-full max-h-[85vh] bg-black flex items-center justify-center">
                  <img 
                    src={files[currentFileIndex].url} 
                    alt={files[currentFileIndex].name}
                    className="max-w-full max-h-full object-contain"
                  />
                  <Button 
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white border-0 h-7 w-7 sm:h-9 sm:w-9"
                    onClick={() => setPreviewDialog(false)}
                  >
                    <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Button>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-black/50 text-white text-center">
                    <p className="text-xs sm:text-sm truncate">
                      {files[currentFileIndex].name}
                    </p>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};

export default MediaSection; 