import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { CustomCodeBlockLowlight } from "./CustomCodeBlockLowlight";
import { lowlight } from "./lowlight";
import { useState } from "react";

export const Editor = () => {
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
    <RichTextEditor
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
      <RichTextEditor.Toolbar
        sticky
        stickyOffset={0}
        style={{
          zIndex: 10,
        }}
      >
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.Code />
          <RichTextEditor.CodeBlock />
          <RichTextEditor.ClearFormatting />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
          <RichTextEditor.H5 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Undo />
          <RichTextEditor.Redo />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content
        onClick={() => {
          if (editor) {
            editor.commands.focus();
          }
        }}
      />
    </RichTextEditor>
  );
};
