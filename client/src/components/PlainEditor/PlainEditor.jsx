import { useState } from "react";
import { Textarea, Text } from "@mantine/core";
import { useSnippetStore } from "@/store/snippet.store";

export const PlainEditor = ({ isViewOnly = false }) => {
  const { content, setContent } = useSnippetStore();
  const [isFocused, setIsFocused] = useState(false);

  if (isViewOnly) {
    return (
      <Text
        style={{
          border: "1px solid var(--mantine-color-gray-4)",
          padding: "10px",
          borderRadius: "5px",
          minHeight: "70vh",
          whiteSpace: "pre-wrap",
        }}
      >
        {content}
      </Text>
    );
  }

  return (
    <Textarea
      value={content}
      onChange={(event) => {
        if (!isViewOnly) {
          setContent(event.currentTarget.value);
        }
      }}
      minRows={29}
      autosize
      placeholder="Start typing your content here..."
      styles={{
        input: {
          fontSize: "16px",
          border: isFocused
            ? "1px solid var(--primary-color)"
            : "1px solid var(--mantine-color-gray-4)",
        },
      }}
      onFocus={() => !isViewOnly && setIsFocused(true)}
      onBlur={() => !isViewOnly && setIsFocused(false)}
      disabled={isViewOnly}
    />
  );
};
