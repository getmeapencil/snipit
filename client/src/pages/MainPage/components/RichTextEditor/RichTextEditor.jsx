import { RichTextEditor as TiptapRichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { CustomCodeBlockLowlight } from "./CustomCodeBlockLowlight";
import { lowlight } from "./lowlight";
import { useState } from "react";

export const RichTextEditor = () => {
  const [content, setContent] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Link,
      CustomCodeBlockLowlight.configure({ lowlight }),
    ],
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    onFocus: () => {
      setIsFocused(true);
    },
    onBlur: () => {
      setIsFocused(false);
    },
  });

  return (
    <TiptapRichTextEditor
      editor={editor}
      styles={{
        root: {
          border: isFocused
            ? "1px solid var(--primary-color)"
            : "1px solid var(--mantine-color-gray-4)",
        },
        toolbar: {
          borderColor: isFocused
            ? "var(--primary-color)"
            : "var(--mantine-color-gray-4)",
        },
        content: {
          minHeight: "70vh",
          cursor: "text",
        },
      }}
    >
      <TiptapRichTextEditor.Toolbar
        sticky
        stickyOffset={0}
        style={{
          zIndex: 10,
        }}
      >
        <TiptapRichTextEditor.ControlsGroup>
          <TiptapRichTextEditor.Bold />
          <TiptapRichTextEditor.Italic />
          <TiptapRichTextEditor.Strikethrough />
          <TiptapRichTextEditor.Code />
          <TiptapRichTextEditor.CodeBlock />
          <TiptapRichTextEditor.ClearFormatting />
        </TiptapRichTextEditor.ControlsGroup>

        <TiptapRichTextEditor.ControlsGroup>
          <TiptapRichTextEditor.H1 />
          <TiptapRichTextEditor.H2 />
          <TiptapRichTextEditor.H3 />
          <TiptapRichTextEditor.H4 />
          <TiptapRichTextEditor.H5 />
        </TiptapRichTextEditor.ControlsGroup>

        <TiptapRichTextEditor.ControlsGroup>
          <TiptapRichTextEditor.Blockquote />
          <TiptapRichTextEditor.Hr />
          <TiptapRichTextEditor.BulletList />
          <TiptapRichTextEditor.OrderedList />
        </TiptapRichTextEditor.ControlsGroup>

        <TiptapRichTextEditor.ControlsGroup>
          <TiptapRichTextEditor.Link />
          <TiptapRichTextEditor.Unlink />
        </TiptapRichTextEditor.ControlsGroup>

        <TiptapRichTextEditor.ControlsGroup>
          <TiptapRichTextEditor.Undo />
          <TiptapRichTextEditor.Redo />
        </TiptapRichTextEditor.ControlsGroup>
      </TiptapRichTextEditor.Toolbar>

      <TiptapRichTextEditor.Content
        onClick={() => {
          if (editor) {
            editor.commands.focus();
          }
        }}
      />
    </TiptapRichTextEditor>
  );
};
