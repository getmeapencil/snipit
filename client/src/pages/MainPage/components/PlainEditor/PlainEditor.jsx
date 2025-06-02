import { useState } from "react";
import { Textarea } from "@mantine/core";

export const PlainEditor = () => {
  const [content, setContent] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Textarea
      value={content}
      onChange={(event) => setContent(event.currentTarget.value)}
      minRows={29}
      autosize
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
