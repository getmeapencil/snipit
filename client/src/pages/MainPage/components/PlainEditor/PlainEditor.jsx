import { useState } from "react";
import { Textarea } from "@mantine/core";
import { useSnippetStore } from "@/store/snippet.store";

export const PlainEditor = () => {
  const { content, setContent } = useSnippetStore();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Textarea
      value={content}
      onChange={(event) => setContent(event.currentTarget.value)}
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
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
};
