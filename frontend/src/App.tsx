import "./App.css";
import { MantineProvider, ColorSchemeProvider, ColorScheme } from "@mantine/core";
import { useEffect, useState } from "react";

export default function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    // useEffect has access to `window`
    const newTheme = localStorage.getItem("theme") === "light" ? "light" : "dark";
    toggleColorScheme(newTheme);
  }, []);

  useEffect(() => {
    // useEffect has access to `window`
    const newTheme = colorScheme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
  }, [colorScheme]);

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,
          shadows: {
            md: "1px 1px 3px rgba(0, 0, 0, .25)",
            xl: "5px 5px 3px rgba(0, 0, 0, .25)",
          },
        }}
      >
        <div className="App">test</div>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
