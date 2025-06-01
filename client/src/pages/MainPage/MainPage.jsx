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
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Editor } from "./components/Editor/Editor";
import { ScrollArea } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const MainPage = () => {
  const navigate = useNavigate();
  const [opened, { toggle }] = useDisclosure();
  const [flavor, setFlavor] = useState("Rich Text");
  const [name, setName] = useState("Snippet-1");
  const [exposure, setExposure] = useState("public");
  const [password, setPassword] = useState("");

  return (
    <AppShell
      h="100vh"
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      aside={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Navbar p="md">
        <Stack gap="md">
          <Button variant="outline">Create New Snippet</Button>
          <Text>SnipIt</Text>
          <Text>SnipIt</Text>
          <Text>SnipIt</Text>
          <Text>SnipIt</Text>
        </Stack>
      </AppShell.Navbar>
      <AppShell.Header>
        <Flex
          align="center"
          justify="space-between"
          gap={8}
          pl="md"
          pr="md"
          h="100%"
        >
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
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      </AppShell.Header>
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
