import { useRef } from "react";
import { Stack, Flex, Button, Select } from "@mantine/core";
import MonacoEditor from "@monaco-editor/react";
import { useSnippetStore } from "@/store/snippet.store";
import * as monaco from "monaco-editor";

const LANGUAGE_OPTIONS = monaco.languages.getLanguages().map((language) => ({
  value: language.id,
  label: language.aliases?.[0] || language.id,
}));

export const CodeEditor = () => {
  const { content, setContent, language, setLanguage } = useSnippetStore();
  const editorRef = useRef(null);

  const formatCode = () => {
    if (editorRef.current) {
      editorRef.current.getAction("editor.action.formatDocument").run();
    }
  };

  return (
    <Stack gap="sm">
      <Flex gap="sm" justify="flex-end" align="end">
        <Select
          placeholder="Select programming language"
          data={LANGUAGE_OPTIONS}
          value={language}
          onChange={setLanguage}
          searchable
        />

        <Button variant="outline" onClick={formatCode} size="sm">
          Format
        </Button>
      </Flex>
      <MonacoEditor
        height="70vh"
        width="100%"
        language={language}
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
