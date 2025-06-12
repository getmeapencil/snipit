import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { ScrollArea } from "@mantine/core";
import { useAuthStore } from "@/store/auth.store";
import { useSnippetStore } from "@/store/snippet.store";
import { Header } from "./components/Header/Header";
import { Navbar } from "./components/Navbar/Navbar";
import { Aside } from "./components/Aside/Aside";
import { MainContent } from "./components/MainContent/MainContent";

export const MainPage = () => {
  const { user } = useAuthStore();
  const { fetchUserSnippets, fetchPublicSnippets } = useSnippetStore();

  const [navbarOpened, { toggle: toggleNavbar }] = useDisclosure();
  const [asideOpened, { toggle: toggleAside }] = useDisclosure();

  // Fetch initial data
  useEffect(() => {
    if (user) {
      fetchUserSnippets();
      fetchPublicSnippets();
    }
  }, [user, fetchUserSnippets, fetchPublicSnippets]);

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
          <MainContent />
        </ScrollArea.Autosize>
      </AppShell.Main>
      <AppShell.Aside p="md">
        <Aside />
      </AppShell.Aside>
    </AppShell>
  );
};
