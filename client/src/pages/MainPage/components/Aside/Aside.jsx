import {
  Select,
  TextInput,
  Radio,
  Stack,
  PasswordInput,
  Button,
} from "@mantine/core";

export const Aside = ({
  name,
  setName,
  flavor,
  setFlavor,
  exposure,
  setExposure,
  password,
  setPassword,
}) => {
  return (
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
  );
};
