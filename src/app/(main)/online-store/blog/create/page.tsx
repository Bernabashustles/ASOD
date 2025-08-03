'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Eye,
  Calendar,
  Clock,
  Globe,
  Lock,
  ImageIcon,
  Plus,
  Tags,
  FileText,
  Save,
  X
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import dynamic from 'next/dynamic';

const TiptapEditor = dynamic(() => import('@/components/TiptapEditor'), {
  ssr: false,
  loading: () => (
    <div className="border rounded-md p-4 w-full min-h-[200px] bg-gray-50 animate-pulse" />
  ),
});

export default function CreateBlogPostPage() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: 'Negus Technologies',
    blog: 'News',
    visibility: 'hidden',
    publishDate: '',
    publishTime: '',
    tags: '',
    seoTitle: '',
    seoDescription: '',
    template: 'Default blog post'
  });

  const [isScheduled, setIsScheduled] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-14 z-20 bg-white border-b">
        <div className="max-w-[1000px] mx-auto px-6 py-3">
          <div className="bg-white border rounded-lg shadow-sm">
            <div className="flex h-14 items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <Link href="/online-store/blog">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                <h1 className="text-lg font-medium">Create blog post</h1>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </Button>
                <Button variant="ghost" size="sm">Discard</Button>
                <Button variant="outline" size="sm">Save as draft</Button>
                <Button size="sm" className="bg-black hover:bg-black/90">Publish</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-6">
        <div className="py-6">
          <div className="grid grid-cols-[2fr,1fr] gap-6">
            {/* Main Content */}
            <div className="space-y-6">
              {/* Title and Content */}
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        placeholder="e.g. Our latest collection has arrived"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          title: e.target.value 
                        }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Content</Label>
                      <TiptapEditor 
                        onChange={(content) => setFormData(prev => ({ 
                          ...prev, 
                          content 
                        }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Excerpt */}
              <Card>
                <CardHeader className="p-6 pb-0">
                  <CardTitle className="text-base">Excerpt</CardTitle>
                  <CardDescription>
                    Add a summary to be displayed on your blog page
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <Textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      excerpt: e.target.value 
                    }))}
                    placeholder="Write a summary of your blog post..."
                    className="min-h-[100px]"
                  />
                </CardContent>
              </Card>

              {/* Search Engine Listing */}
              <Card>
                <CardHeader className="p-6 pb-0">
                  <CardTitle className="text-base">Search engine listing</CardTitle>
                  <CardDescription>
                    Add a title and description to see how this post might appear in search engine listings
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="seoTitle">Page title</Label>
                      <Input
                        id="seoTitle"
                        value={formData.seoTitle}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          seoTitle: e.target.value 
                        }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="seoDescription">Description</Label>
                      <Textarea
                        id="seoDescription"
                        value={formData.seoDescription}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          seoDescription: e.target.value 
                        }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Visibility */}
              <Card>
                <CardHeader className="p-6 pb-0">
                  <CardTitle className="text-base">Visibility</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <RadioGroup
                    value={formData.visibility}
                    onValueChange={(value) => setFormData(prev => ({
                      ...prev,
                      visibility: value
                    }))}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="visible" id="visible" />
                      <Label htmlFor="visible" className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Visible
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hidden" id="hidden" />
                      <Label htmlFor="hidden" className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Hidden
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Publishing */}
              <Card>
                <CardHeader className="p-6 pb-0">
                  <CardTitle className="text-base">Publishing</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={isScheduled}
                        onCheckedChange={setIsScheduled}
                      />
                      <Label>Schedule publishing</Label>
                    </div>

                    {isScheduled && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Publish date</Label>
                          <Input
                            type="date"
                            value={formData.publishDate}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              publishDate: e.target.value
                            }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Publish time</Label>
                          <Input
                            type="time"
                            value={formData.publishTime}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              publishTime: e.target.value
                            }))}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Organization */}
              <Card>
                <CardHeader className="p-6 pb-0">
                  <CardTitle className="text-base">Organization</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Author</Label>
                      <Input
                        value={formData.author}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          author: e.target.value
                        }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Blog</Label>
                      <Select
                        value={formData.blog}
                        onValueChange={(value) => setFormData(prev => ({
                          ...prev,
                          blog: value
                        }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="News">News</SelectItem>
                          <SelectItem value="Products">Products</SelectItem>
                          <SelectItem value="Company">Company</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Tags</Label>
                      <Input
                        placeholder="Separate with commas"
                        value={formData.tags}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          tags: e.target.value
                        }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Featured Image */}
              <Card>
                <CardHeader className="p-6 pb-0">
                  <CardTitle className="text-base">Featured image</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="mx-auto w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                      <ImageIcon className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Add media from your device</p>
                      <Button variant="link" className="h-auto p-0 text-sm">
                        Add image
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Theme Template */}
              <Card>
                <CardHeader className="p-6 pb-0">
                  <CardTitle className="text-base">Theme template</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <Select
                    value={formData.template}
                    onValueChange={(value) => setFormData(prev => ({
                      ...prev,
                      template: value
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Default blog post">Default blog post</SelectItem>
                      <SelectItem value="Featured post">Featured post</SelectItem>
                      <SelectItem value="Wide layout">Wide layout</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}