import { Text } from "@mantine/core";
import { PlainEditor } from "../PlainEditor/PlainEditor";
import { CodeEditor } from "../CodeEditor/CodeEditor";
import { RichTextEditor } from "../RichTextEditor/RichTextEditor";
import styles from "./MainContent.module.css";

export const MainContent = ({ name, username, flavor }) => {
  return (
    <div className={styles.mainSection}>
      <div>
        <Text ta="center" size="xl" fw={500}>
          {name}
        </Text>
        <Text c="gray.6" fw={400} ta="center" size="xs" mb="1rem">
          by {username}
        </Text>
      </div>
      {flavor === "Plain" && <PlainEditor />}
      {flavor === "Code" && <CodeEditor />}
      {flavor === "Rich Text" && <RichTextEditor />}
    </div>
  );
};
