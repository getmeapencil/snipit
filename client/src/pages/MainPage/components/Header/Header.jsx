import {
  Burger,
  Image,
  Text,
  Flex,
  Avatar,
  Menu,
  ActionIcon,
  TextInput,
  Button,
  Notification,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { FiEdit, FiLogOut, FiMail, FiUser, FiCheck, FiX } from "react-icons/fi";
import { useState } from "react";
import { notifications } from "@mantine/notifications";

export const Header = ({
  navbarOpened,
  toggleNavbar,
  asideOpened,
  toggleAside,
}) => {
  const navigate = useNavigate();
  const { user, logout, updateUsername, isLoading } = useAuthStore();
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(user?.username || "");

  const handleUsernameEdit = () => {
    setNewUsername(user?.username || "");
    setIsEditingUsername(true);
  };

  const handleUsernameCancel = () => {
    setNewUsername(user?.username || "");
    setIsEditingUsername(false);
  };

  const handleUsernameSubmit = async () => {
    if (!newUsername.trim()) {
      notifications.show({
        title: "Error",
        message: "Username cannot be empty",
        color: "red",
      });
      return;
    }

    if (newUsername.trim() === user?.username) {
      setIsEditingUsername(false);
      return;
    }

    const result = await updateUsername(newUsername.trim());

    if (result.success) {
      notifications.show({
        title: "Success",
        message: result.message,
        color: "green",
      });
      setIsEditingUsername(false);
    } else {
      notifications.show({
        title: "Error",
        message: result.message,
        color: "red",
      });
    }
  };

  return (
    <Flex
      align="center"
      justify="space-between"
      gap={8}
      pl="md"
      pr="md"
      h="100%"
    >
      <Flex align="center" gap={8}>
        <Burger
          opened={navbarOpened}
          onClick={toggleNavbar}
          hiddenFrom="lg"
          size="sm"
        />
        <Flex
          align="center"
          gap={6}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <Image src="/logo-transparent.png" alt="logo" w={30} h={30} />
          <Text size="1.5rem" fw={400}>
            SnipIt
          </Text>
        </Flex>
      </Flex>
      <Flex align="center" gap={8}>
        <Menu>
          <Menu.Target>
            <Avatar
              variant="outline"
              radius="sm"
              color="blue"
              src={user?.profilePicture}
              style={{ cursor: "pointer" }}
            />
          </Menu.Target>
          <Menu.Dropdown>
            <Flex direction="column" gap={4} p="xs">
              <Flex align="center" gap={8}>
                <FiUser />
                {isEditingUsername ? (
                  <TextInput
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    size="xs"
                    style={{ flex: 1 }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUsernameSubmit();
                      } else if (e.key === "Escape") {
                        handleUsernameCancel();
                      }
                    }}
                  />
                ) : (
                  <Text size="sm">{user?.username}</Text>
                )}
                {isEditingUsername ? (
                  <Flex gap={2}>
                    <ActionIcon
                      variant="subtle"
                      size="xs"
                      color="green"
                      onClick={handleUsernameSubmit}
                      loading={isLoading}
                    >
                      <FiCheck />
                    </ActionIcon>
                    <ActionIcon
                      variant="subtle"
                      size="xs"
                      color="red"
                      onClick={handleUsernameCancel}
                    >
                      <FiX />
                    </ActionIcon>
                  </Flex>
                ) : (
                  <ActionIcon
                    variant="subtle"
                    size="xs"
                    onClick={handleUsernameEdit}
                  >
                    <FiEdit />
                  </ActionIcon>
                )}
              </Flex>
              <Flex align="center" gap={8}>
                <FiMail />
                <Text size="sm">{user?.email}</Text>
              </Flex>
            </Flex>
            <Menu.Divider />
            <Menu.Item color="red" leftSection={<FiLogOut />} onClick={logout}>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <Burger
          opened={asideOpened}
          onClick={toggleAside}
          hiddenFrom="lg"
          size="sm"
        />
      </Flex>
    </Flex>
  );
};
