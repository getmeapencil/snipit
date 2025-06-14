import {
  Select,
  TextInput,
  Radio,
  Stack,
  PasswordInput,
  Button,
  Text,
  Modal,
  Group,
} from "@mantine/core";
import { FiSave, FiCopy, FiEdit, FiTrash2 } from "react-icons/fi";
import { notifications } from "@mantine/notifications";
import { useSnippetStore } from "@/store/snippet.store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Aside = ({ isViewOnly = false, isAuthor = false }) => {
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
    setContent,
    language,
    createSnippet,
    updateSnippet,
    deleteSnippet,
    isLoading,
    currentSnippet,
  } = useSnippetStore();
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingFlavor, setPendingFlavor] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isUpdating = currentSnippet && currentSnippet.uniqueId;

  const handleFlavorChange = (newFlavor) => {
    if (content.trim() && newFlavor !== flavor) {
      setPendingFlavor(newFlavor);
      setShowConfirmModal(true);
    } else {
      setFlavor(newFlavor);
    }
  };

  const handleConfirmFlavorChange = () => {
    setContent("");
    setFlavor(pendingFlavor);
    setShowConfirmModal(false);
    setPendingFlavor(null);
  };

  const handleCancelFlavorChange = () => {
    setShowConfirmModal(false);
    setPendingFlavor(null);
  };

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

  const handleCopyContent = async () => {
    if (!content.trim()) return;

    try {
      await navigator.clipboard.writeText(content.trim());

      notifications.show({
        title: "Copied!",
        message: "Snippet content copied to clipboard",
        color: "green",
      });
    } catch {
      notifications.show({
        title: "Error",
        message: "Failed to copy content",
        color: "red",
      });
    }
  };

  const handleDeleteSnippet = async () => {
    if (!currentSnippet?.uniqueId) return;

    const result = await deleteSnippet(currentSnippet.uniqueId);

    if (result.success) {
      notifications.show({
        title: "Success",
        message: "Snippet deleted successfully!",
        color: "green",
      });
      setShowDeleteModal(false);
    } else {
      notifications.show({
        title: "Error",
        message: result.error || "Failed to delete snippet",
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
      {!isViewOnly && (
        <>
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
            onChange={handleFlavorChange}
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
            leftSection={
              isUpdating ? <FiEdit size={16} /> : <FiSave size={16} />
            }
            onClick={handleSaveSnippet}
            disabled={isLoading}
          >
            {isUpdating ? "Update Snippet" : "Save Snippet"}
          </Button>
        </>
      )}

      {currentSnippet && (
        <Stack gap="md">
          {isViewOnly && isAuthor && (
            <Button
              variant="outline"
              leftSection={<FiEdit size={16} />}
              onClick={() => {
                navigate("/");
              }}
            >
              Edit Snippet
            </Button>
          )}

          <Button
            variant="outline"
            leftSection={<FiCopy size={16} />}
            onClick={handleCopyContent}
          >
            Copy Content
          </Button>

          <Button
            variant="outline"
            leftSection={<FiCopy size={16} />}
            onClick={handleCopyLink}
          >
            Copy Link
          </Button>

          {!isViewOnly && (
            <Button
              variant="outline"
              color="red"
              leftSection={<FiTrash2 size={16} />}
              onClick={() => setShowDeleteModal(true)}
              disabled={isLoading}
            >
              Delete Snippet
            </Button>
          )}

          <Stack gap={4}>
            <Text size="xs" fw={500}>
              Snippet Details
            </Text>
            <Text size="xs">
              Created: {new Date(currentSnippet.createdAt).toLocaleString()}
            </Text>
            {currentSnippet.updatedAt &&
              currentSnippet.updatedAt !== currentSnippet.createdAt && (
                <Text size="xs">
                  Updated: {new Date(currentSnippet.updatedAt).toLocaleString()}
                </Text>
              )}
            <Text size="xs">ID: {currentSnippet.uniqueId}</Text>
          </Stack>
        </Stack>
      )}

      <Modal
        opened={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Snippet"
        centered
      >
        <Stack gap="md">
          <Text>
            Are you sure you want to delete "{currentSnippet?.name}"? This
            action cannot be undone.
          </Text>
          <Group justify="flex-end">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button
              color="red"
              onClick={handleDeleteSnippet}
              disabled={isLoading}
            >
              Delete Snippet
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Modal
        opened={showConfirmModal}
        onClose={handleCancelFlavorChange}
        title="Confirm Flavor Change"
        centered
      >
        <Stack gap="md">
          <Text>
            Changing the flavor will clear the current content. Do you want to
            continue?
          </Text>
          <Group justify="flex-end">
            <Button variant="outline" onClick={handleCancelFlavorChange}>
              Cancel
            </Button>
            <Button color="red" onClick={handleConfirmFlavorChange}>
              Clear Content & Change Flavor
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
};
