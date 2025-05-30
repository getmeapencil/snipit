import { BrowserRouter } from "react-router-dom";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { AppRouter } from "./router";

function App() {
  return (
    <BrowserRouter>
      <MantineProvider
        theme={{
          fontFamily: "Inter",
        }}
      >
        <AppRouter />
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;
