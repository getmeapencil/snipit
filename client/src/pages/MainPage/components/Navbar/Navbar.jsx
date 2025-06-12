import { TextInput, Stack, Text, Flex, Button, Loader } from "@mantine/core";
import { ScrollArea } from "@mantine/core";
import { FiSearch, FiPlus } from "react-icons/fi";
import { useState } from "react";
import { useSnippetStore } from "@/store/snippet.store";
import { useAuthStore } from "@/store/auth.store";

export const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    userSnippets,
    publicSnippets,
    isLoading,
    setCurrentSnippet,
    resetForm,
  } = useSnippetStore();
  const { user } = useAuthStore();

  // Filter user snippets based on search term
  const filteredUserSnippets = userSnippets.filter((snippet) =>
    snippet.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSnippetClick = (snippet) => {
    setCurrentSnippet(snippet);
  };

  const handleCreateNew = () => {
    resetForm();
    setCurrentSnippet(null);
  };

  return (
    <Stack gap="md">
      <Button
        variant="outline"
        leftSection={<FiPlus size={16} />}
        onClick={handleCreateNew}
        fullWidth
      >
        Create New Snippet
      </Button>

      {user && (
        <Flex direction="column" gap={8}>
          <Text size="xs" fw={500} c="gray.6">
            Your Snippets ({userSnippets.length})
          </Text>
          <TextInput
            rightSectionPointerEvents="none"
            rightSection={<FiSearch />}
            placeholder="Search snippets..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.currentTarget.value)}
          />

          {isLoading && userSnippets.length === 0 ? (
            <Flex justify="center" py="md">
              <Loader size="sm" />
            </Flex>
          ) : (
            <ScrollArea.Autosize mah="400px">
              <Flex direction="column" gap={4} pr="1rem">
                {filteredUserSnippets.length > 0 ? (
                  filteredUserSnippets.map((snippet) => (
                    <Button
                      key={snippet._id}
                      justify="space-between"
                      fullWidth
                      variant="subtle"
                      size="compact-lg"
                      color="dark"
                      fw={400}
                      onClick={() => handleSnippetClick(snippet)}
                    >
                      <Text size="sm" truncate>
                        {snippet.name}
                      </Text>
                    </Button>
                  ))
                ) : (
                  <Text size="sm" c="gray.6" ta="center" py="md">
                    {searchTerm ? "No snippets found" : "No snippets yet"}
                  </Text>
                )}
              </Flex>
            </ScrollArea.Autosize>
          )}
        </Flex>
      )}

      <Flex direction="column" gap={8}>
        <Text size="xs" fw={500} c="gray.6">
          Latest Public Snippets
        </Text>
        <ScrollArea.Autosize mah="300px">
          <Flex direction="column" gap={4} pr="1rem">
            {publicSnippets.length > 0 ? (
              publicSnippets.map((snippet) => (
                <Button
                  key={snippet._id}
                  justify="space-between"
                  fullWidth
                  variant="subtle"
                  fw={400}
                  size="compact-lg"
                  color="dark"
                >
                  <Text size="sm" truncate>
                    {snippet.name}
                  </Text>
                </Button>
              ))
            ) : (
              <Text size="sm" c="gray.6" ta="center" py="md">
                No public snippets yet
              </Text>
            )}
          </Flex>
        </ScrollArea.Autosize>
      </Flex>
    </Stack>
  );
};
