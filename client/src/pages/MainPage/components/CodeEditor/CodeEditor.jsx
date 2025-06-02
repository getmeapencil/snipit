import { useState, useRef } from "react";
import { Select, Stack, Flex, Button } from "@mantine/core";
import MonacoEditor from "@monaco-editor/react";
import * as monaco from "monaco-editor";

export const CodeEditor = () => {
  const editorRef = useRef(null);
  const [content, setContent] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");

  const languageOptions = monaco.languages.getLanguages().map((language) => ({
    value: language.id,
    label: language.aliases?.[0] || language.id,
  }));

  const formatCode = () => {
    if (editorRef.current) {
      editorRef.current.getAction("editor.action.formatDocument").run();
    }
  };

  return (
    <Stack gap="sm">
      <Flex gap="sm">
        <Select
          placeholder="Select a language"
          data={languageOptions}
          value={selectedLanguage}
          onChange={setSelectedLanguage}
          searchable
          size="sm"
          styles={{
            label: {
              fontSize: "14px",
              fontWeight: 500,
              marginBottom: "4px",
            },
          }}
        />
        <Button variant="outline" onClick={formatCode}>
          Format
        </Button>
      </Flex>
      <MonacoEditor
        height="70vh"
        width="100%"
        language={selectedLanguage}
        value={content}
        onChange={(value) => setContent(value || "")}
        onMount={(editor) => {
          editorRef.current = editor;
        }}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 16,
          lineNumbers: "on",
          roundedSelection: false,
          scrollBeyondLastLine: false,
          readOnly: false,
          automaticLayout: true,
          wordWrap: "on",
        }}
      />
    </Stack>
  );
};
