import { Text } from "@mantine/core";
import { PlainEditor } from "../PlainEditor/PlainEditor";
import { CodeEditor } from "../CodeEditor/CodeEditor";
import { RichTextEditor } from "../RichTextEditor/RichTextEditor";
import { useSnippetStore } from "@/store/snippet.store";
import styles from "./MainContent.module.css";
import { useAuthStore } from "@/store/auth.store";

export const MainContent = ({ isViewOnly = false }) => {
  const { flavor } = useSnippetStore();

  return (
    <div className={styles.mainContent}>
      <Title />
      {flavor === "Plain" && <PlainEditor isViewOnly={isViewOnly} />}
      {flavor === "Code" && <CodeEditor isViewOnly={isViewOnly} />}
      {flavor === "Rich Text" && <RichTextEditor isViewOnly={isViewOnly} />}
    </div>
  );
};

const Title = () => {
  const { name, currentSnippet } = useSnippetStore();
  const { user } = useAuthStore();
  return (
    <div>
      <Text ta="center" size="xl" fw={500}>
        {name}
      </Text>
      <Text c="gray.6" fw={400} ta="center" size="xs" mb="1rem">
        by {currentSnippet?.author?.username || user?.username}
      </Text>
    </div>
  );
};
