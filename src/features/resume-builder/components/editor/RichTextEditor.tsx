"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Minimal rich-text editor (bold / italic / bullet list) on TipTap.
 * Emits sanitized-friendly HTML via onChange; parent owns debounced autosave.
 */
export function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
        code: false,
        blockquote: false,
        horizontalRule: false,
        strike: false,
      }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "min-h-[84px] w-full rounded-b-md border border-t-0 border-rr-border-muted bg-rr-bg px-2.5 py-2 text-sm text-rr-text focus:outline-none [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-1",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  // Reflect external value changes (e.g. AI replace) without clobbering typing.
  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) return null;

  const btnClass = (active: boolean) =>
    cn(
      "rounded p-1 text-rr-text-muted hover:bg-rr-bg-elevated hover:text-rr-text",
      active && "bg-rr-accent-light text-rr-accent"
    );

  return (
    <div>
      <div className="flex gap-0.5 rounded-t-md border border-rr-border-muted bg-rr-card px-1.5 py-1">
        <button
          type="button"
          aria-label="Bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={btnClass(editor.isActive("bold"))}
        >
          <Bold className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          aria-label="Italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={btnClass(editor.isActive("italic"))}
        >
          <Italic className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          aria-label="Bullet list"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={btnClass(editor.isActive("bulletList"))}
        >
          <List className="h-3.5 w-3.5" />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
