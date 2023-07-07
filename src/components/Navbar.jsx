import React from "react";
import {
  Navbar,
  Avatar,
  Text,
  Button,
  Dropdown,
  Link,
  Switch,
  useTheme,
} from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import { Image, Login, Logout, User, Image2, Setting } from "react-iconly";

export default function () {
  const { setTheme } = useNextTheme();
  const { isDark, type, theme } = useTheme();
  const [user, setUser] = React.useState(false);
  const inherit = isDark ? "white" : "dark";
  const token = localStorage.getItem("discord-auth-token");

  React.useEffect(() => {
    if (token) {
      fetch("https://discord.com/api/v10/users/@me", {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.message || !data.message.startsWith("401")) {
            setUser(data);
          }
        });
    }

    return () => {};
  }, []);

  const goto = (p) => {
    window.location.href = window.location.origin + "/#" + p;
    window.location.reload();
  };
  const handleLogout = () => {
    localStorage.removeItem("discord-auth-token");
    localStorage.removeItem("discord-auth-expires_in");

    window.location.href = window.location.origin + "/#/";
    window.location.reload();
  };

  return (
    <Navbar isBordered>
      <Navbar.Brand>
        <Text as={Link} weight="medium" href="/#/">
          Koru
        </Text>
      </Navbar.Brand>
      <Navbar.Content>
        {user ? null : (
          <Link href="/#/login" color="inherit">
            Login
          </Link>
        )}
        <Dropdown isBordered placement="left">
          <Dropdown.Trigger auto="true" light="true">
            {user ? (
              <Avatar
                size="md"
                src={
                  "https://cdn.discordapp.com/avatars/" +
                  user.id +
                  "/" +
                  user.avatar +
                  ".png?size=2048"
                }
              />
            ) : (
              <Button
                icon={
                  <Setting
                    set="bold"
                    primaryColor={isDark ? "white" : "black"}
                  />
                }
              />
            )}
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Section title="Account">
              {user ? (
                <Dropdown.Item
                  key="profile"
                  icon={<User set="bold" primaryColor={inherit} />}
                >
                  <Text
                    as={Link}
                    href="/#/profile"
                    onPress={() => goto("/profile")}
                  >
                    Profile
                  </Text>
                </Dropdown.Item>
              ) : (
                <Dropdown.Item
                  key="login"
                  icon={<Login set="bold" primaryColor={inherit} />}
                >
                  <Text as={Link} color={inherit} href="/#/login">
                    Login
                  </Text>
                </Dropdown.Item>
              )}
            </Dropdown.Section>
            <Dropdown.Section title="Page customization">
              <Dropdown.Item
                key="theme"
                icon={
                  isDark ? (
                    <Image2 set="bold" primaryColor={inherit} />
                  ) : (
                    <Image set="bold" primaryColor={inherit} />
                  )
                }
              >
                <Text
                  as={Link}
                  onPress={() => setTheme(type === "dark" ? "light" : "dark")}
                >
                  Change theme
                </Text>
              </Dropdown.Item>
            </Dropdown.Section>
            {user ? (
              <Dropdown.Section title="Danger zone">
                <Dropdown.Item
                  icon={
                    <Logout
                      set="bold"
                      primaryColor={theme.colors.error.value}
                    />
                  }
                  key="logout"
                >
                  <Text b as={Link} color="error" onPress={handleLogout}>
                    Logout
                  </Text>
                </Dropdown.Item>
              </Dropdown.Section>
            ) : null}
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Content>
    </Navbar>
  );
}
