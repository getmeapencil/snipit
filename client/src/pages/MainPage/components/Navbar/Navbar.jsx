import { TextInput, Stack, Text, Flex, Button } from "@mantine/core";
import { ScrollArea } from "@mantine/core";
import { FiSearch } from "react-icons/fi";

export const Navbar = () => {
  return (
    <Stack gap="md">
      <Button variant="outline">Create New Snippet</Button>
      <Flex direction="column" gap={8}>
        <Text size="xs" fw={500} c="gray.6">
          Your Snippets
        </Text>
        <TextInput
          rightSectionPointerEvents="none"
          rightSection={<FiSearch />}
          placeholder="Search"
        />
        <ScrollArea.Autosize mah="400px">
          <Flex direction="column" gap={4} pr="1rem">
            {Array.from({ length: 20 }).map((_, index) => (
              <Button
                justify="space-between"
                fullWidth
                variant="subtle"
                color="black"
                key={index}
                fw={400}
              >
                Untitled {index + 1}
              </Button>
            ))}
          </Flex>
        </ScrollArea.Autosize>
      </Flex>
      <Flex direction="column" gap={8}>
        <Text size="xs" fw={500} c="gray.6">
          Public Snippets
        </Text>
        <ScrollArea.Autosize mah="300px">
          <Flex direction="column" gap={4} pr="1rem">
            {Array.from({ length: 5 }).map((_, index) => (
              <Button
                justify="space-between"
                fullWidth
                variant="subtle"
                color="black"
                key={index}
                fw={400}
              >
                Untitled {index + 1}
              </Button>
            ))}
          </Flex>
        </ScrollArea.Autosize>
      </Flex>
    </Stack>
  );
};
