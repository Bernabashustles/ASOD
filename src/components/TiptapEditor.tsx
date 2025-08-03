'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  LinkIcon, 
  Image as ImageUploadIcon,
  Heading2,
  Quote,
  Undo,
  Redo,
  Underline as UnderlineIcon,
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useState, useCallback } from 'react';

interface TiptapEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  className?: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const addImage = useCallback(() => {
    const url = window.prompt('Enter the image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    const url = window.prompt('Enter the URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  const MenuButton = ({ 
    onClick, 
    isActive = false, 
    icon: Icon, 
    tooltip 
  }: { 
    onClick: () => void; 
    isActive?: boolean; 
    icon: any;
    tooltip: string;
  }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClick}
            className={`h-7 w-7 sm:h-8 sm:w-8 p-0.5 sm:p-1.5 ${isActive ? 'bg-muted' : ''}`}
          >
            <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div className="border-b p-1 sm:p-2 flex flex-wrap gap-0.5 sm:gap-1">
      <div className="flex items-center gap-0.5 sm:gap-1">
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          icon={Bold}
          tooltip="Bold"
        />
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          icon={Italic}
          tooltip="Italic"
        />
        <MenuButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          icon={UnderlineIcon}
          tooltip="Underline"
        />
      </div>

      <Separator orientation="vertical" className="mx-0.5 sm:mx-1" />

      <div className="flex items-center gap-0.5 sm:gap-1">
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          icon={Heading2}
          tooltip="Subheading"
        />
      </div>

      <Separator orientation="vertical" className="mx-0.5 sm:mx-1" />

      <div className="flex items-center gap-0.5 sm:gap-1">
        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          icon={List}
          tooltip="Bullet List"
        />
        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          icon={ListOrdered}
          tooltip="Numbered List"
        />
        <MenuButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          icon={Quote}
          tooltip="Quote"
        />
      </div>

      <Separator orientation="vertical" className="mx-0.5 sm:mx-1" />

      <div className="flex items-center gap-0.5 sm:gap-1">
        <MenuButton
          onClick={setLink}
          isActive={editor.isActive('link')}
          icon={LinkIcon}
          tooltip="Add Link"
        />
        <MenuButton
          onClick={addImage}
          icon={ImageUploadIcon}
          tooltip="Add Image"
        />
      </div>

      <Separator orientation="vertical" className="mx-0.5 sm:mx-1" />

      <div className="flex items-center gap-0.5 sm:gap-1">
        <MenuButton
          onClick={() => editor.chain().focus().undo().run()}
          isActive={false}
          icon={Undo}
          tooltip="Undo"
        />
        <MenuButton
          onClick={() => editor.chain().focus().redo().run()}
          isActive={false}
          icon={Redo}
          tooltip="Redo"
        />
      </div>
    </div>
  );
};

export default function TiptapEditor({ content, onChange, className }: TiptapEditorProps) {
  const [isMounted, setIsMounted] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2] // Only allow H2 for subheadings
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
        blockquote: {
          HTMLAttributes: {
            class: 'border-l-4 border-muted pl-4 italic',
          },
        },
      }),
      Underline,
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline',
        },
      }),
    ],
    content: content || '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[120px] sm:min-h-[200px] p-3 sm:p-4',
        placeholder: 'Write a detailed product description...',
      },
      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer?.files.length) {
          const file = event.dataTransfer.files[0];
          if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const url = e.target?.result as string;
              view.dispatch(view.state.tr.replaceSelectionWith(
                view.state.schema.nodes.image.create({ src: url })
              ));
            };
            reader.readAsDataURL(file);
            return true;
          }
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
    immediatelyRender: true,
  });

  useEffect(() => {
    if (editor && content !== undefined && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) {
    return (
      <div className={`overflow-hidden border rounded-md ${className || ''}`}>
        <div className="p-3 sm:p-4 min-h-[120px] sm:min-h-[200px] bg-muted animate-pulse" />
      </div>
    );
  }

  return (
    <div className={`overflow-hidden border rounded-md ${className || ''}`}>
      <div className="overflow-x-auto">
        <MenuBar editor={editor} />
      </div>
      <EditorContent 
        editor={editor} 
        className="prose-sm max-w-none"
      />
    </div>
  );
}