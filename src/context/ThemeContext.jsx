import React, { createContext, useMemo, useState, useEffect } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function ThemeContextProvider({ children }) {
  const [mode, setMode] = useState(() => localStorage.getItem("themeMode") || "light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => {
          const newMode = prev === "light" ? "dark" : "light";
          localStorage.setItem("themeMode", newMode);
          return newMode;
        });
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                background: {
                  default: "#f5f5f5",
                  paper: "#ffffff",
                },
                text: {
                  primary: "#000000",
                },
              }
            : {
                background: {
                  default: "#121212",
                  paper: "#1e1e1e",
                },
                text: {
                  primary: "#ffffff",
                },
              }),
        },
        typography: {
          fontFamily: `"Inter", "Roboto", sans-serif`,
        },
        shape: { borderRadius: 10 },
      }),
    [mode]
  );

  // 👇 Synchronize body background with current theme
  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default;
    document.body.style.color = theme.palette.text.primary;
    document.body.style.transition = "background-color 0.3s ease, color 0.3s ease";
  }, [theme]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
