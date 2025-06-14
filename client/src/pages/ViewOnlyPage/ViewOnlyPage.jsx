import {
  AppShell,
  Button,
  Flex,
  Modal,
  PasswordInput,
  Text,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { ScrollArea, Group } from "@mantine/core";
import { useAuthStore } from "@/store/auth.store";
import { useSnippetStore } from "@/store/snippet.store";
import { Header } from "@/components/Header/Header";
import { Navbar } from "@/components/Navbar/Navbar";
import { Aside } from "@/components/Aside/Aside";
import { MainContent } from "@/components/MainContent/MainContent";
import { LoadingPage } from "../LoadingPage/LoadingPage";
import { useNavigate, useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";

export const ViewOnlyPage = () => {
  const { snippetId } = useParams();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuthStore();
  const { isLoading, fetchUserSnippets, fetchPublicSnippets, fetchSnippet } =
    useSnippetStore();

  const [navbarOpened, { toggle: toggleNavbar }] = useDisclosure();
  const [asideOpened, { toggle: toggleAside }] = useDisclosure();
  const [isPasswordRequired, setIsPasswordRequired] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Fetch initial data
  useEffect(() => {
    if (isAuthenticated) {
      fetchUserSnippets();
    }
    fetchPublicSnippets();
  }, [isAuthenticated, fetchUserSnippets, fetchPublicSnippets]);

  const fetchSnippetData = async (password = "") => {
    const response = await fetchSnippet(snippetId, password);
    if (response.requiresPassword || response.error === "Invalid password") {
      setIsPasswordRequired(true);
    } else {
      setIsPasswordRequired(false);
    }
    if (!response.requiresPassword && response.error) {
      if (response.error !== "Invalid password") {
        navigate("/");
      }
      notifications.show({
        title: "Error",
        message: response.error,
        color: "red",
      });
    }
    setIsAuthor(!!response.isAuthor);
    setPassword("");
    return response;
  };

  useEffect(() => {
    if (!isAuthLoading) {
      fetchSnippetData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snippetId, isAuthLoading]);

  const handlePasswordSubmit = () => {
    fetchSnippetData(password);
  };

  if (isAuthLoading) {
    return <LoadingPage />;
  }

  return (
    <AppShell
      h="100vh"
      header={{ height: 60 }}
      navbar={{
        width: { base: "var(--navbar-width)" },
        breakpoint: "lg",
        collapsed: { mobile: !navbarOpened },
      }}
      aside={{
        width: { base: "var(--aside-width)" },
        breakpoint: "lg",
        collapsed: { mobile: !asideOpened },
      }}
    >
      <AppShell.Header>
        <Header
          navbarOpened={navbarOpened}
          toggleNavbar={toggleNavbar}
          asideOpened={asideOpened}
          toggleAside={toggleAside}
        />
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main>
        <ScrollArea.Autosize mah="calc(100vh - var(--header-height))">
          {!isPasswordRequired && !isLoading && (
            <MainContent isViewOnly={true} />
          )}
        </ScrollArea.Autosize>
      </AppShell.Main>
      <AppShell.Aside p="md">
        <Aside isViewOnly={true} isAuthor={isAuthor} />
      </AppShell.Aside>
      <Modal
        opened={isPasswordRequired}
        onClose={() => {
          setIsPasswordRequired(false);
          setPassword("");
          navigate("/");
        }}
        title="Protected Snippet"
        centered
      >
        <Stack gap="md">
          <Text>
            This snippet is protected. Please enter the password to view its
            contents.
          </Text>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handlePasswordSubmit();
              }
            }}
            placeholder="Enter password"
            autoFocus
          />
          <Group justify="flex-end">
            <Button
              variant="outline"
              onClick={() => {
                setIsPasswordRequired(false);
                setPassword("");
                navigate("/");
              }}
            >
              Cancel
            </Button>
            <Button onClick={handlePasswordSubmit} color="blue">
              Submit
            </Button>
          </Group>
        </Stack>
      </Modal>
    </AppShell>
  );
};
