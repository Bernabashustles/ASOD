'use client';

import { useState, useRef } from 'react';
import { Upload, Image, Video, File, X, Eye, Download, Trash2, Settings, Grid, List, Search, Filter, Star, Edit, Plus, Camera, Link, FolderOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface MediaFile {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  url: string;
  size: number;
  dimensions?: { width: number; height: number };
  alt: string;
  caption: string;
  tags: string[];
  uploadedAt: string;
  isPrimary: boolean;
  status: 'uploading' | 'uploaded' | 'error';
  progress?: number;
  variant?: string;
  position?: number;
}

export default function MediaUploader({ data, onChange }: { data: any; onChange: (data: any) => void }) {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([
    {
      id: '1',
      name: 'variant-red-s.jpg',
      type: 'image',
      url: '/api/media/variant-red-s.jpg',
      size: 2048576,
      dimensions: { width: 1920, height: 1080 },
      alt: 'Red variant, Small size',
      caption: 'Front view of red t-shirt in small size',
      tags: ['red', 'small', 'front', 'variant'],
      uploadedAt: '2024-01-15T10:30:00Z',
      isPrimary: true,
      status: 'uploaded',
      variant: 'Red, Small',
      position: 1,
    },
    {
      id: '2',
      name: 'variant-red-s-back.jpg',
      type: 'image',
      url: '/api/media/variant-red-s-back.jpg',
      size: 1536000,
      dimensions: { width: 1200, height: 800 },
      alt: 'Red variant back view',
      caption: 'Back view showing design details',
      tags: ['red', 'small', 'back', 'variant'],
      uploadedAt: '2024-01-15T10:35:00Z',
      isPrimary: false,
      status: 'uploaded',
      variant: 'Red, Small',
      position: 2,
    },
    {
      id: '3',
      name: 'variant-red-s-detail.jpg',
      type: 'image',
      url: '/api/media/variant-red-s-detail.jpg',
      size: 1572864,
      dimensions: { width: 800, height: 600 },
      alt: 'Red variant detail shot',
      caption: 'Close-up detail of fabric texture',
      tags: ['red', 'small', 'detail', 'texture'],
      uploadedAt: '2024-01-15T10:40:00Z',
      isPrimary: false,
      status: 'uploaded',
      variant: 'Red, Small',
      position: 3,
    },
  ]);

  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'gallery'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'drag' | 'browse' | 'url' | 'camera'>('drag');
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleFileUpload = (files: FileList) => {
    Array.from(files).forEach((file, index) => {
      const newFile: MediaFile = {
        id: Date.now().toString() + index,
        name: file.name,
        type: file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'document',
        url: URL.createObjectURL(file),
        size: file.size,
        alt: '',
        caption: '',
        tags: [],
        uploadedAt: new Date().toISOString(),
        isPrimary: false,
        status: 'uploading',
        progress: 0,
        variant: 'Red, Small',
        position: mediaFiles.length + 1,
      };

      setMediaFiles(prev => [...prev, newFile]);

      // Simulate upload progress
      const interval = setInterval(() => {
        setMediaFiles(prev => prev.map(f => {
          if (f.id === newFile.id && f.progress !== undefined) {
            const newProgress = Math.min(f.progress + 10, 100);
            if (newProgress === 100) {
              clearInterval(interval);
              return { ...f, progress: 100, status: 'uploaded' as const };
            }
            return { ...f, progress: newProgress };
          }
          return f;
        }));
      }, 200);
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const removeFile = (id: string) => {
    setMediaFiles(prev => prev.filter(file => file.id !== id));
  };

  const setPrimaryImage = (id: string) => {
    setMediaFiles(prev => prev.map(file => ({
      ...file,
      isPrimary: file.id === id
    })));
  };

  const updateFile = (id: string, field: keyof MediaFile, value: any) => {
    setMediaFiles(prev => prev.map(file =>
      file.id === id ? { ...file, [field]: value } : file
    ));
  };

  const toggleFileSelection = (id: string) => {
    setSelectedFiles(prev =>
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const toggleAllFiles = () => {
    if (selectedFiles.length === mediaFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(mediaFiles.map(file => file.id));
    }
  };

  const filteredFiles = mediaFiles.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
    file.variant?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      default: return <File className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Variant Images</h2>
          <p className="text-gray-600 mt-1">Upload and manage images specific to this variant</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="secondary" className="bg-gray-100 text-gray-700">
            {mediaFiles.length} files
          </Badge>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1">
          <TabsTrigger value="upload" className="data-[state=active]:bg-white">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </TabsTrigger>
          <TabsTrigger value="gallery" className="data-[state=active]:bg-white">
            <Grid className="h-4 w-4 mr-2" />
            Gallery
          </TabsTrigger>
          <TabsTrigger value="organize" className="data-[state=active]:bg-white">
            <Settings className="h-4 w-4 mr-2" />
            Organize
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          {/* Advanced Upload Area */}
          <Card className="border border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <span className="text-2xl">📁</span>
                Upload Variant Images
              </CardTitle>
              <p className="text-gray-600 text-sm">Multiple ways to add images for this variant</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload Methods */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center space-y-2 border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                  onClick={() => setUploadMethod('drag')}
                >
                  <Upload className="h-8 w-8 text-gray-400" />
                  <span className="text-sm font-medium">Drag & Drop</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center space-y-2 border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FolderOpen className="h-8 w-8 text-gray-400" />
                  <span className="text-sm font-medium">Browse Files</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center space-y-2 border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                  onClick={() => setUploadMethod('url')}
                >
                  <Link className="h-8 w-8 text-gray-400" />
                  <span className="text-sm font-medium">From URL</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center space-y-2 border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                  onClick={() => setUploadMethod('camera')}
                >
                  <Camera className="h-8 w-8 text-gray-400" />
                  <span className="text-sm font-medium">Camera</span>
                </Button>
              </div>

              {/* Drag & Drop Area */}
              {uploadMethod === 'drag' && (
                <div
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
                    dragActive 
                      ? 'border-gray-400 bg-gray-50' 
                      : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Drop your variant images here
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Drag and drop images, videos, or documents here, or click to select files
                  </p>
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                    <span>Supports: JPG, PNG, GIF, MP4, PDF</span>
                    <span>•</span>
                    <span>Max size: 10MB per file</span>
                  </div>
                  <Button 
                    className="mt-4 bg-gray-900 hover:bg-gray-800"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Choose Files
                  </Button>
                </div>
              )}

              {/* URL Upload */}
              {uploadMethod === 'url' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Image URL</Label>
                      <Input placeholder="https://example.com/image.jpg" />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Alt Text</Label>
                      <Input placeholder="Describe this image for accessibility" />
                    </div>
                  </div>
                  <Button className="bg-gray-900 hover:bg-gray-800">
                    <Link className="h-4 w-4 mr-2" />
                    Import from URL
                  </Button>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*,.pdf,.doc,.docx"
                onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                className="hidden"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gallery" className="space-y-6">
          {/* Gallery Management */}
          <Card className="border border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <span className="text-2xl">🖼️</span>
                Image Gallery
              </CardTitle>
              <p className="text-gray-600 text-sm">Manage and organize your variant images</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search images..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={viewMode === 'grid' ? 'bg-gray-900 hover:bg-gray-800' : ''}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={viewMode === 'list' ? 'bg-gray-900 hover:bg-gray-800' : ''}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'gallery' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('gallery')}
                    className={viewMode === 'gallery' ? 'bg-gray-900 hover:bg-gray-800' : ''}
                  >
                    <Image className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Bulk Actions */}
              {selectedFiles.length > 0 && (
                <div className="bg-gray-100 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-800">
                      {selectedFiles.length} images selected
                    </span>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">Bulk Edit</Button>
                      <Button variant="outline" size="sm">Bulk Delete</Button>
                      <Button variant="outline" size="sm">Export Selected</Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Grid View */}
              {viewMode === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredFiles.map((file) => (
                    <Card key={file.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="relative">
                          {/* Image Preview */}
                          <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                            {file.type === 'image' ? (
                              <img
                                src={file.url}
                                alt={file.alt}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : file.type === 'video' ? (
                              <div className="w-full h-full flex items-center justify-center">
                                <Video className="h-12 w-12 text-gray-400" />
                              </div>
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <File className="h-12 w-12 text-gray-400" />
                              </div>
                            )}
                            
                            {/* Upload Progress */}
                            {file.status === 'uploading' && file.progress !== undefined && (
                              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                                <div className="text-white text-center">
                                  <Progress value={file.progress} className="w-24 mb-2" />
                                  <span className="text-sm">{file.progress}%</span>
                                </div>
                              </div>
                            )}
                            
                            {/* Primary Badge */}
                            {file.isPrimary && (
                              <Badge className="absolute top-2 left-2 bg-gray-900 text-white">
                                <Star className="h-3 w-3 mr-1" />
                                Primary
                              </Badge>
                            )}
                            
                            {/* Actions */}
                            <div className="absolute top-2 right-2 flex space-x-1">
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 bg-white bg-opacity-90">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 bg-white bg-opacity-90 text-gray-600 hover:text-gray-900"
                                onClick={() => removeFile(file.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          
                          {/* File Info */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-900 truncate">
                                {file.name}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {file.type}
                              </Badge>
                            </div>
                            
                            <div className="text-xs text-gray-500 space-y-1">
                              <div>{formatFileSize(file.size)}</div>
                              {file.dimensions && (
                                <div>{file.dimensions.width} × {file.dimensions.height}</div>
                              )}
                              <div>{formatDate(file.uploadedAt)}</div>
                            </div>
                            
                            {/* Alt Text Input */}
                            <Input
                              placeholder="Alt text for accessibility"
                              value={file.alt}
                              onChange={(e) => updateFile(file.id, 'alt', e.target.value)}
                              className="text-xs h-8"
                            />
                            
                            {/* Actions */}
                            <div className="flex items-center space-x-2">
                              {!file.isPrimary && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setPrimaryImage(file.id)}
                                  className="text-xs h-7"
                                >
                                  Set Primary
                                </Button>
                              )}
                              <Button size="sm" variant="ghost" className="text-xs h-7">
                                <Edit className="h-3 w-3 mr-1" />
                                Edit
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* List View */}
              {viewMode === 'list' && (
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="w-12">
                          <Checkbox
                            checked={selectedFiles.length === mediaFiles.length}
                            onCheckedChange={toggleAllFiles}
                          />
                        </TableHead>
                        <TableHead>Preview</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Dimensions</TableHead>
                        <TableHead>Uploaded</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-20">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredFiles.map((file) => (
                        <TableRow key={file.id} className="hover:bg-gray-50">
                          <TableCell>
                            <Checkbox
                              checked={selectedFiles.includes(file.id)}
                              onCheckedChange={() => toggleFileSelection(file.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                              {file.type === 'image' ? (
                                <img src={file.url} alt={file.alt} className="w-full h-full object-cover rounded" />
                              ) : file.type === 'video' ? (
                                <Video className="h-6 w-6 text-gray-400" />
                              ) : (
                                <File className="h-6 w-6 text-gray-400" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{file.name}</div>
                              <div className="text-sm text-gray-500">{file.alt || 'No alt text'}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{file.type}</Badge>
                          </TableCell>
                          <TableCell className="text-sm">{formatFileSize(file.size)}</TableCell>
                          <TableCell className="text-sm">
                            {file.dimensions ? `${file.dimensions.width} × ${file.dimensions.height}` : 'N/A'}
                          </TableCell>
                          <TableCell className="text-sm">{formatDate(file.uploadedAt)}</TableCell>
                          <TableCell>
                            <Badge className={file.status === 'uploaded' ? 'bg-gray-100 text-gray-800' : 'bg-gray-100 text-gray-800'}>
                              {file.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(file.id)}
                                className="text-gray-600 hover:text-gray-900"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              {/* Gallery View */}
              {viewMode === 'gallery' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFiles.map((file) => (
                    <div key={file.id} className="relative group">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        {file.type === 'image' ? (
                          <img
                            src={file.url}
                            alt={file.alt}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : file.type === 'video' ? (
                          <div className="w-full h-full flex items-center justify-center">
                            <Video className="h-16 w-16 text-gray-400" />
                          </div>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <File className="h-16 w-16 text-gray-400" />
                          </div>
                        )}
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                            <Button variant="ghost" size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="bg-white text-gray-900 hover:bg-gray-100"
                              onClick={() => removeFile(file.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        {/* Primary Badge */}
                        {file.isPrimary && (
                          <Badge className="absolute top-2 left-2 bg-gray-900 text-white">
                            <Star className="h-3 w-3 mr-1" />
                            Primary
                          </Badge>
                        )}
                      </div>
                      
                      <div className="mt-2">
                        <div className="text-sm font-medium text-gray-900 truncate">{file.name}</div>
                        <div className="text-xs text-gray-500">{formatFileSize(file.size)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="organize" className="space-y-6">
          {/* Organization Settings */}
          <Card className="border border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <span className="text-2xl">⚙️</span>
                Image Settings
              </CardTitle>
              <p className="text-gray-600 text-sm">Configure how your variant images are displayed</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Auto-optimize images</Label>
                      <p className="text-xs text-gray-500">Automatically compress and resize images</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Generate thumbnails</Label>
                      <p className="text-xs text-gray-500">Create smaller versions for faster loading</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Watermark images</Label>
                      <p className="text-xs text-gray-500">Add your brand watermark to images</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Lazy loading</Label>
                      <p className="text-xs text-gray-500">Load images only when needed</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 