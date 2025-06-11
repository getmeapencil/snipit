import {
  Burger,
  Image,
  Text,
  Flex,
  Avatar,
  Menu,
  ActionIcon,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { FiEdit, FiLogOut, FiMail, FiUser } from "react-icons/fi";

export const Header = ({
  navbarOpened,
  toggleNavbar,
  asideOpened,
  toggleAside,
  username,
  setUsername,
}) => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

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
                <Text size="sm">{user?.username}</Text>
                <ActionIcon
                  variant="subtle"
                  size="xs"
                  onClick={() => {
                    setUsername(username);
                  }}
                >
                  <FiEdit />
                </ActionIcon>
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
