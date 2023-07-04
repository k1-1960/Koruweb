import React from "react";
import { createRoot } from "react-dom/client";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { HashRouter, Switch, Route, Link, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import { Login, LoginCallback, Logout } from "./pages/Auth.jsx";
import Navbar from "./components/Navbar.jsx";

const lightTheme = createTheme({
  type: "light",
  theme: {
    colors: {
      background: "#ffffff",
      text: "#000000",
    },
    shadows: {
      xs: "0 2px 8px 1px rgb(104 112 118 / 0.07), 0 1px 1px -1px rgb(104 112 118 / 0.04)",
      sm: "0 2px 8px 2px rgb(104 112 118 / 0.07), 0 2px 4px -1px rgb(104 112 118 / 0.04)",
      md: "0 12px 20px 6px rgb(104 112 118 / 0.08)",
      lg: "0 12px 34px 6px rgb(104 112 118 / 0.18)",
      xl: "0 25px 65px 0px rgb(104 112 118 / 0.35)",
    },
  },
});

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {
      background: "#000000",
      text: "#ffffff",
    },
    shadows: {
      xs: "0 2px 8px 1px rgb(104 112 118 / 0.07), 0 1px 1px -1px rgb(104 112 118 / 0.04)",
      sm: "0 2px 8px 2px rgb(104 112 118 / 0.07), 0 2px 4px -1px rgb(104 112 118 / 0.04)",
      md: "0 12px 20px 6px rgb(104 112 118 / 0.08)",
      lg: "0 12px 34px 6px rgb(104 112 118 / 0.18)",
      xl: "0 25px 65px 0px rgb(104 112 118 / 0.35)",
    },
  },
});

function App() {
  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>
        <HashRouter>
          <Navbar />
          <div
            style={{
              padding: "10px",
            }}
          >
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/login" element={<Login />} />
              <Route
                exact
                path="/auth/discord/process-token"
                element={<LoginCallback />}
              />
              <Route exact path="*" element={<Text h1>404</Text>} />
            </Routes>
          </div>
        </HashRouter>
      </NextUIProvider>
    </NextThemesProvider>
  );
}

const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

root.render(<App />);
