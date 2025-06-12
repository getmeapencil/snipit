import {
  Select,
  TextInput,
  Radio,
  Stack,
  PasswordInput,
  Button,
  Text,
} from "@mantine/core";
import { FiSave, FiCopy, FiEdit } from "react-icons/fi";
import { notifications } from "@mantine/notifications";
import { useSnippetStore } from "@/store/snippet.store";

export const Aside = () => {
  const {
    name,
    setName,
    flavor,
    setFlavor,
    exposure,
    setExposure,
    password,
    setPassword,
    content,
    language,
    createSnippet,
    updateSnippet,
    isLoading,
    currentSnippet,
  } = useSnippetStore();

  const isUpdating = currentSnippet && currentSnippet.uniqueId;

  const handleCopyLink = async () => {
    if (!currentSnippet?.uniqueId) return;

    const link = `${window.location.origin}/snippet/${currentSnippet.uniqueId}`;

    try {
      await navigator.clipboard.writeText(link);

      notifications.show({
        title: "Copied!",
        message: "Snippet link copied to clipboard",
        color: "green",
      });
    } catch {
      notifications.show({
        title: "Error",
        message: "Failed to copy link",
        color: "red",
      });
    }
  };

  const handleSaveSnippet = async () => {
    if (!content.trim()) {
      notifications.show({
        title: "Error",
        message: "Please add some content before saving",
        color: "red",
      });
      return;
    }

    const snippetData = {
      name,
      content,
      flavor,
      exposure,
      password: exposure === "unlisted" ? password : "",
    };

    if (flavor === "Code") {
      snippetData.language = language;
    }

    const isUpdating = currentSnippet && currentSnippet.uniqueId;
    let result;

    if (isUpdating) {
      result = await updateSnippet(currentSnippet.uniqueId, snippetData);
    } else {
      result = await createSnippet(snippetData);
    }

    if (result.success) {
      notifications.show({
        title: "Success",
        message: `Snippet ${isUpdating ? "updated" : "created"} successfully!`,
        color: "green",
      });
    } else {
      notifications.show({
        title: "Error",
        message:
          result.error ||
          `Failed to ${isUpdating ? "update" : "create"} snippet`,
        color: "red",
      });
    }
  };

  return (
    <Stack gap="md">
      <TextInput
        label="Name"
        placeholder="Enter snippet name"
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
      />

      <Select
        label="Flavor"
        placeholder="Select flavor"
        data={["Plain", "Code", "Rich Text"]}
        value={flavor}
        onChange={setFlavor}
        size="sm"
        style={{ minWidth: 120 }}
      />

      <Radio.Group label="Exposure" value={exposure} onChange={setExposure}>
        <Stack mt="xs">
          <Radio value="public" label="Public" />
          <Radio value="unlisted" label="Unlisted" />
          <Radio value="private" label="Private" />
        </Stack>
      </Radio.Group>

      {exposure === "unlisted" && (
        <PasswordInput
          label="Password"
          description={
            isUpdating
              ? "Leave empty to keep existing password or enter new password"
              : "Leave empty for no password"
          }
          placeholder="Enter password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      )}

      <Button
        leftSection={isUpdating ? <FiEdit size={16} /> : <FiSave size={16} />}
        onClick={handleSaveSnippet}
        loading={isLoading}
        disabled={isLoading}
      >
        {isUpdating ? "Update Snippet" : "Save Snippet"}
      </Button>

      {currentSnippet && (
        <Stack gap="xs">
          <Button
            variant="outline"
            leftSection={<FiCopy size={16} />}
            onClick={handleCopyLink}
          >
            Copy Link
          </Button>

          <Stack gap={4}>
            <Text size="xs" fw={500} c="gray.6">
              Snippet Details
            </Text>
            <Text size="xs" c="gray.7">
              Created: {new Date(currentSnippet.createdAt).toLocaleString()}
            </Text>
            {currentSnippet.updatedAt &&
              currentSnippet.updatedAt !== currentSnippet.createdAt && (
                <Text size="xs" c="gray.7">
                  Updated: {new Date(currentSnippet.updatedAt).toLocaleString()}
                </Text>
              )}
            <Text size="xs" c="gray.7">
              ID: {currentSnippet.uniqueId}
            </Text>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};
