'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function EditBlogPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [title, setTitle] = useState('Blog Post Title');
  const [content, setContent] = useState('Blog post content...');
  
  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-4">
        <Link href={`/content/blog/${id}`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <Button size="sm">
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <Input 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <Textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)}
            rows={10}
          />
        </div>
      </div>
    </div>
  );
} 