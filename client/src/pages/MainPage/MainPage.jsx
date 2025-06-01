import {
  AppShell,
  Burger,
  Select,
  TextInput,
  Radio,
  Group,
  Stack,
  PasswordInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Editor } from "./components/Editor/Editor";

export const MainPage = () => {
  const [opened, { toggle }] = useDisclosure();
  const [flavor, setFlavor] = useState("");
  const [name, setName] = useState("");
  const [exposure, setExposure] = useState("public");
  const [password, setPassword] = useState("");

  return (
    <AppShell
      header={{ height: 60 }}
      aside={{
        width: 400,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <div>Logo</div>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      </AppShell.Header>
      <AppShell.Main>
        <Editor />
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
        </Stack>
      </AppShell.Aside>
    </AppShell>
  );
};
