import React from "react";
import {
  Loading,
  Text,
  Button,
  Link,
  Avatar,
  Spacer,
  styled,
} from "@nextui-org/react";
import GuildCard from "../components/GuildCard.jsx";
import RequestLogin from "../components/RequestLogin.jsx";

const MainLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});
const GuildsDisplay = styled("div", {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
});
const UserBanner = ({ color, noBanner, children }) => {
  let MyBox = styled("div", {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: "5rem",
    width: "128px",
    background: color ?? "black",
    width: "100%",
    height: "128px",
    position: "absolute",
    zIndex: "1",
    overflow: "hidden",
    align: "center",
  });
  if (noBanner) {
    return <MyBox />;
  } else {
    return <MyBox>{children}</MyBox>;
  }
};
const UserAvatar = styled("img", {
  marginTop: "32px",
  borderRadius: "50%",
  boxShadow: "0px 0px 32px rgba(0,0,0,0.5)",
  width: "128px",
  zIndex: "2",
});

const resolveBannerURL = (id, bannerHash) => {
  return (
    "https://cdn.discordapp.com/banners/" +
    id +
    "/" +
    bannerHash +
    ".png?size=1024"
  );
};

function Profile() {
  const token = localStorage.getItem("discord-auth-token");
  if (token) {
    const [user, setUser] = React.useState(false);
    const [guilds, setGuilds] = React.useState(false);
    const [botGuilds, setBotGuilds] = React.useState(false);
    React.useEffect(() => {
      if (token) {
        fetch("https://discord.com/api/v10/users/@me", {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setUser(data);
          });
      }
      if (token) {
        fetch("https://discord.com/api/v10/users/@me/guilds", {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setGuilds(data);
          });

        fetch("https://api.k1a.repl.co/bot/guilds?userid=anonimous", {
          method: "GET",
        })
          .then((r) => r.json())
          .then((r) => {
            setBotGuilds(r.data);
          })
          .catch((err) => {});
      }
      return () => {};
    }, []);

    return user ? (
      <MainLayout>
        <UserBanner
          noBanner={user.banner ? false : true}
          color={"#" + user.accent_color.toString(16)}
        >
          <img
            src={user.banner ? resolveBannerURL(user.id, user.banner) : "#"}
          />
        </UserBanner>
        <UserAvatar
          src={
            "https://cdn.discordapp.com/avatars/" +
            user.id +
            "/" +
            user.avatar +
            ".png?size=2048"
          }
        />
        <Spacer y={1} />
        <Text b size={24}>
          @{user.username}
        </Text>
        <Spacer y={1} />
        <Text b size={20}>
          Guilds
        </Text>
        {guilds && botGuilds ? (
          <GuildsDisplay>
            {guilds
              .filter((guild) => guild.permissions & 0x00000008)
              .sort((a, b) => {
                if (botGuilds.includes(a.id) && !botGuilds.includes(b.id)) {
                  return -1; // a debe ir antes que b
                } else if (
                  !botGuilds.includes(a.id) &&
                  botGuilds.includes(b.id)
                ) {
                  return 1; // a debe ir después de b
                } else {
                  return 0; // no hay diferencia en el orden
                }
              })
              .map((guild) => (
                <GuildCard
                  key={guild.id}
                  guild={guild}
                  invite={botGuilds.includes(guild.id)}
                />
              ))}
          </GuildsDisplay>
        ) : (
          <Loading />
        )}
      </MainLayout>
    ) : (
      <Loading />
    );
  } else {
    return <RequestLogin />;
  }
}

export default Profile;
