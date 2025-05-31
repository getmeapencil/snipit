import { ReactNodeViewRenderer } from "@tiptap/react";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import { Select } from "@mantine/core";
import { lowlight } from "./lowlight";
import { useState, useCallback } from "react";

// Component for the code block with dropdown
const CodeBlockComponent = ({ node, updateAttributes }) => {
  const [language, setLanguage] = useState(node.attrs.language || "auto");

  // Get available languages from lowlight
  const languages = [
    { value: "auto", label: "auto" },
    ...lowlight
      .listLanguages()
      .sort()
      .map((lang) => ({
        value: lang,
        label: lang,
      })),
  ];

  const handleLanguageChange = useCallback(
    (value) => {
      setLanguage(value);
      updateAttributes({ language: value === "auto" ? null : value });
    },
    [updateAttributes],
  );

  return (
    <NodeViewWrapper className="code-block-wrapper">
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: "4px",
            right: "4px",
            zIndex: 10,
          }}
        >
          <Select
            value={language}
            onChange={handleLanguageChange}
            data={languages}
            size="xs"
            variant="filled"
            placeholder="Language"
            searchable
            clearable={false}
            style={{
              width: "120px",
            }}
          />
        </div>
        <pre style={{ margin: 0 }}>
          <NodeViewContent as="code" />
        </pre>
      </div>
    </NodeViewWrapper>
  );
};

// Extended CodeBlockLowlight with language dropdown
export const CustomCodeBlockLowlight = CodeBlockLowlight.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      language: {
        default: null,
        parseHTML: (element) => {
          const { languageClassPrefix } = this.options;
          const classNames = [...(element.firstElementChild?.classList || [])];
          const languages = classNames
            .filter((className) => className.startsWith(languageClassPrefix))
            .map((className) => className.replace(languageClassPrefix, ""));
          const language = languages[0];

          if (!language) {
            return null;
          }

          return language;
        },
        rendered: false,
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockComponent);
  },
});
