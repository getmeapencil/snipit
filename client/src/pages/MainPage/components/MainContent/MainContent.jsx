import { Text } from "@mantine/core";
import { PlainEditor } from "../PlainEditor/PlainEditor";
import { CodeEditor } from "../CodeEditor/CodeEditor";
import { RichTextEditor } from "../RichTextEditor/RichTextEditor";
import { useSnippetStore } from "@/store/snippet.store";
import { useAuthStore } from "@/store/auth.store";
import styles from "./MainContent.module.css";

export const MainContent = () => {
  const { flavor } = useSnippetStore();

  return (
    <div className={styles.mainContent}>
      <Title />
      {flavor === "Plain" && <PlainEditor />}
      {flavor === "Code" && <CodeEditor />}
      {flavor === "Rich Text" && <RichTextEditor />}
    </div>
  );
};

const Title = () => {
  const { name } = useSnippetStore();
  const { user } = useAuthStore();
  return (
    <div>
      <Text ta="center" size="xl" fw={500}>
        {name}
      </Text>
      <Text c="gray.6" fw={400} ta="center" size="xs" mb="1rem">
        by {user?.username}
      </Text>
    </div>
  );
};
