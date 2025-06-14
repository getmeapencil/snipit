import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { AppRouter } from "./router";
import { fetchCurrentUserService, refreshTokenService } from "./api/auth.api";
import { useAuthStore } from "./store/auth.store";
import { handleError } from "./lib/errorHandler";

const theme = createTheme({
  fontFamily: "Inter",
});

function App() {
  const { token, setToken, setLoading, setUser, logout } = useAuthStore();

  useEffect(() => {
    const verifyUserSession = async () => {
      if (!token) {
        try {
          const response = await refreshTokenService();
          if (response.success && response.accessToken) {
            setToken(response.accessToken);
          } else {
            throw new Error("Failed to refresh token");
          }
        } catch (error) {
          handleError(error, {
            contextPrefix: "Failed to verify user session",
            rethrow: false,
          });
          setLoading(false);
        }
        return;
      }

      try {
        const response = await fetchCurrentUserService();
        if (response.success && response.user) {
          setUser(response.user);
        } else {
          throw new Error("User not found");
        }
      } catch (error) {
        handleError(error, {
          contextPrefix: "Failed to verify user session",
          rethrow: false,
        });
        logout();
      } finally {
        setLoading(false);
      }
    };

    verifyUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <BrowserRouter>
      <MantineProvider theme={theme} defaultColorScheme="auto">
        <Notifications />
        <AppRouter />
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;
