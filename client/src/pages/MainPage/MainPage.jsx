import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { ScrollArea } from "@mantine/core";
import { useAuthStore } from "@/store/auth.store";
import { Header } from "./components/Header/Header";
import { Navbar } from "./components/Navbar/Navbar";
import { Aside } from "./components/Aside/Aside";
import { MainContent } from "./components/MainContent/MainContent";

export const MainPage = () => {
  const { user } = useAuthStore();
  const [navbarOpened, { toggle: toggleNavbar }] = useDisclosure();
  const [asideOpened, { toggle: toggleAside }] = useDisclosure();
  const [flavor, setFlavor] = useState("Rich Text");
  const [name, setName] = useState("Snippet-1");
  const [username, setUsername] = useState(user?.username);
  const [exposure, setExposure] = useState("public");
  const [password, setPassword] = useState("");

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
          username={username}
          setUsername={setUsername}
        />
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main>
        <ScrollArea.Autosize mah="calc(100vh - var(--header-height))">
          <MainContent name={name} username={username} flavor={flavor} />
        </ScrollArea.Autosize>
      </AppShell.Main>
      <AppShell.Aside p="md">
        <Aside
          name={name}
          setName={setName}
          flavor={flavor}
          setFlavor={setFlavor}
          exposure={exposure}
          setExposure={setExposure}
          password={password}
          setPassword={setPassword}
        />
      </AppShell.Aside>
    </AppShell>
  );
};
