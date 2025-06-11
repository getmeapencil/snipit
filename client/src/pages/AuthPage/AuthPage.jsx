import {
  Button,
  Container,
  Title,
  Text,
  Stack,
  Group,
  Box,
} from "@mantine/core";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { FaGoogle, FaFileAlt, FaLink, FaEye } from "react-icons/fa";

export const AuthPage = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
  };

  return (
    <Box
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <Container size="md" style={{ textAlign: "center" }}>
        <Stack gap="xl" align="center">
          {/* Hero Section */}
          <Stack gap="md" align="center">
            <Group>
              <img
                src="/logo-transparent.png"
                alt="SnipIt"
                style={{
                  height: "60px",
                  width: "auto",
                }}
              />
              <Title
                order={1}
                size="3.5rem"
                style={{
                  fontWeight: 500,
                }}
              >
                SnipIt
              </Title>
            </Group>
            <Text
              size="xl"
              style={{
                maxWidth: "600px",
                lineHeight: 1.6,
              }}
            >
              Share text, code, and rich content instantly with anyone. Create
              shareable links for your snippets in seconds.
            </Text>
          </Stack>

          {/* Features */}
          <Group justify="center" gap="xl" style={{ margin: "2rem 0" }}>
            <Stack align="center" gap="xs">
              <FaFileAlt size={32} />
              <Text size="sm">Text Content</Text>
            </Stack>
            <Stack align="center" gap="xs">
              <FaLink size={32} />
              <Text size="sm">Instant Links</Text>
            </Stack>
            <Stack align="center" gap="xs">
              <FaEye size={32} />
              <Text size="sm">Easy Access</Text>
            </Stack>
          </Group>

          {/* CTA Button */}
          <Button leftSection={<FaGoogle />} onClick={handleLogin} size="xl">
            Continue with Google
          </Button>

          <Text
            size="sm"
            style={{
              marginTop: "1rem",
            }}
          >
            Join thousands of users sharing snippets with SnipIt
          </Text>
        </Stack>
      </Container>
    </Box>
  );
};
