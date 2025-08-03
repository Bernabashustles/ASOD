import React, { useRef } from 'react';
import { Plus, Trash2, GripVertical, ImageIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface MediaFile {
  id: string;
  file: File;
  preview: string;
}

interface MediaUploadProps {
  mediaFiles: MediaFile[];
  onAddFiles: (files: FileList | null) => void;
  onRemoveFile: (id: string) => void;
  onDragFile?: (dragIndex: number, hoverIndex: number) => void;
}

export const MediaUpload: React.FC<MediaUploadProps> = ({
  mediaFiles,
  onAddFiles,
  onRemoveFile,
  onDragFile,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <Card className="sm:rounded-lg rounded-none mx-[-1rem] sm:mx-0">
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Media</CardTitle>
          <Button variant="ghost" size="sm" className="text-xs">
            <Plus className="h-3.5 w-3.5 mr-1" />
            Add from URL
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
          accept="image/*"
          onChange={(e) => onAddFiles(e.target.files)}
        />
        
        {mediaFiles.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {mediaFiles.map((file, index) => (
              <div 
                key={file.id}
                className="group relative aspect-square rounded-lg overflow-hidden border bg-gray-50"
              >
                <img 
                  src={file.preview}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:text-white hover:bg-white/20"
                    onClick={() => onRemoveFile(file.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:text-white hover:bg-white/20 cursor-move"
                  >
                    <GripVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square rounded-lg border-2 border-dashed flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <Plus className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        ) : (
          <div 
            className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="mx-auto w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
              <ImageIcon className="w-6 h-6 text-gray-400" />
            </div>
            <div className="text-sm text-gray-600">
              <p>Add media from your device</p>
              <Button variant="link" className="h-auto p-0 text-sm">Add files</Button>
              <p className="text-xs text-gray-500 mt-2">
                Accepts images, videos, or 3D models
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 