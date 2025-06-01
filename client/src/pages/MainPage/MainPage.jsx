import {
  AppShell,
  Burger,
  Select,
  TextInput,
  Radio,
  Stack,
  PasswordInput,
  Image,
  Text,
  Flex,
  Button,
  Avatar,
  Menu,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Editor } from "./components/Editor/Editor";
import { ScrollArea } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiUser, FiSearch } from "react-icons/fi";

export const MainPage = () => {
  const navigate = useNavigate();
  const [navbarOpened, { toggle: toggleNavbar }] = useDisclosure();
  const [asideOpened, { toggle: toggleAside }] = useDisclosure();
  const [flavor, setFlavor] = useState("Rich Text");
  const [name, setName] = useState("Snippet-1");
  const [exposure, setExposure] = useState("public");
  const [password, setPassword] = useState("");

  return (
    <AppShell
      h="100vh"
      header={{ height: 60 }}
      navbar={{
        width: { base: 300 },
        breakpoint: "lg",
        collapsed: { mobile: !navbarOpened },
      }}
      aside={{
        width: { base: 300 },
        breakpoint: "lg",
        collapsed: { mobile: !asideOpened },
      }}
    >
      <AppShell.Header>
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
              gap={8}
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              <Image src="/logo-transparent.png" alt="logo" w={40} h={40} />
              <Text size="1.5rem" fw={400}>
                SnipIt
              </Text>
            </Flex>
          </Flex>
          <Flex align="center" gap={8}>
            <Menu>
              <Menu.Target>
                <Avatar radius="sm" color="blue" />
              </Menu.Target>
              <Menu.Dropdown>
                <Flex align="center" gap={8} p="xs">
                  <FiUser />
                  <Text size="sm">example@example.com</Text>
                </Flex>
                <Menu.Divider />
                <Menu.Item color="red" leftSection={<FiLogOut />}>
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
      </AppShell.Header>
      <AppShell.Navbar p="md">
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
      </AppShell.Navbar>
      <AppShell.Main>
        <ScrollArea.Autosize mah="calc(100vh - var(--header-height))">
          <div style={{ padding: "1rem" }}>
            <div
              style={{
                fontSize: "1.25rem",
                textAlign: "center",
                marginBottom: "1rem",
              }}
            >
              {name}
            </div>
            <Editor />
          </div>
        </ScrollArea.Autosize>
      </AppShell.Main>
      <AppShell.Aside p="md">
        <Stack gap="md">
          <TextInput
            label="Name"
            placeholder="Enter paste name"
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
          />

          <Select
            label="Flavor"
            placeholder="Select flavor"
            data={["Plain", "Code", "Rich Text"]}
            value={flavor}
            onChange={setFlavor}
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
              description="Leave empty for no password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          )}
          <Button>Save</Button>
          <Button variant="outline">Copy Link</Button>
        </Stack>
      </AppShell.Aside>
    </AppShell>
  );
};
