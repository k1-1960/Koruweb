import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Link,
  Collapse,
  Spacer,
  Text,
  Input,
  Loading,
  styled,
  useTheme,
} from "@nextui-org/react";
import { ArrowLeftSquare } from "react-iconly";
import RequestLogin from "../components/RequestLogin.jsx";
import axios from "axios";

const Regular = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "left",
});
const Center = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

function Notification({ id }) {
  return (
    <div id={id} style={{ padding: "2px", display: "none" }}>
      <Text
        blockquote
        color="success"
        css={{
          backgroundColor: "$green100",
        }}
      >
        Data updated successfully
      </Text>
      <Spacer y={1} />
    </div>
  );
}

function GuildPanel() {
  const token = localStorage.getItem("discord-auth-token");
  const { isDark, type, theme } = useTheme();
  const inherit = isDark ? "white" : "black";
  if (token) {
    const params = useParams();
    const [user, setUser] = useState(false);
    const [guild, setGuild] = useState(false);
    const imageInputRef = useRef(null);

    useEffect(() => {
      axios({
        url: "https://discord.com/api/v10/users/@me",
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then(({ data: APIUser }) => {
          setUser(APIUser);
          // Database
          axios({
            url: "https://api.k1a.repl.co/guilds/" + params.guildid,
            method: "GET",
            params: {
              userid: APIUser.id,
              guildid: params.guildid,
            },
          })
            .then(({ data: guildd }) => {
              setGuild(guildd.data);
            })
            .catch((err) => alert(JSON.stringify(err)));
        })
        .catch((error) => {});
    }, []);

    function handleImageUpload(imgdata, ip, userr) {
      alert(ip);
      const file = imgdata;
      const url = `http://${ip}/upload?imageName=${params.guildid}`; // URL de la ruta de subida de imágenes en tu servidor

      const formData = new FormData();
      formData.append("image", file);

      try {
        console.log({
          url:
            "https://api.k1a.repl.co/makerequest?guildid=" +
            params.guildid +
            "&userid=" +
            userr.id,
          method: "POST",
          data: {
            url: `http://${ip}/upload?imageName=${params.guildid}`,
            method: "POST",
            data: {
              image: file,
            },
          },
          headers: {
            "Content-Type": "multipart/form-data",
            Origin: window.location.origin,
          },
        })
        axios({
          url:
            "https://api.k1a.repl.co/makerequest?guildid=" +
            params.guildid +
            "&userid=" +
            userr.id,
          method: "POST",
          data: {
            url: `http://${ip}/upload?imageName=${params.guildid}`,
            method: "POST",
            data: {
              image: file,
            },
          },
          headers: {
            "Content-Type": "multipart/form-data",
            Origin: window.location.origin,
          },
        }).catch((error) => console.log(error));
      } catch (error) {
        alert("error");
        console.error(error);
      }
    }

    function handleBotCustomizationForm(e, userr) {
      let change = false;
      let notification = document.getElementById("notification-bc");
      let newNick = document.getElementById("custom-nick") || "";
      if (newNick.value !== (guild.bot.nick || "")) {
        change = true;
        guild.bot.nick = newNick.value;
        axios({
          method: "POST",
          url:
            "https://api.k1a.repl.co/makerequest?guildid=" +
            params.guildid +
            "&userid=" +
            userr.id,
          data: {
            url:
              "https://" +
              `discord.com/api/v10/guilds/${params.guildid}/members/@me`,
            method: "PATCH",
            headers: {
              Authorization: "PROCESS_ENV_TOKEN",
            },
            data: {
              nick: newNick.value,
            },
          },
        })
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      }
      if (change === true) {
        notification.style.display = "";
        setTimeout(() => (notification.style.display = "none"), 5000);
      }
    }
    function handleWelcomeConfig(e, userr) {
      let change = false;
      let requestData = {};
      let notification = document.getElementById("notification-wc");
      let newTitle = document.getElementById("card-title") || "";
      let newSubtitle = document.getElementById("card-subtitle") || "";
      let newBackground = document.getElementById("card-background") || false;
      if (newTitle.value !== (guild.db.configurations.welcome.title || "")) {
        change = true;
        guild.db.configurations.title = newTitle.value;
        requestData["configurations.welcome.title"] = newTitle.value;
        alert(JSON.stringify(requestData));
      }

      if (newSubtitle.value !== (guild.db.configurations.subtitle || "")) {
        change = true;
        guild.db.configurations.subtitle = newSubtitle.value;
        requestData["configurations.welcome.subtitle"] = newSubtitle.value;
      }
      if (imageInputRef.current.files[0]) {
        axios
          .get("https://api.k1a.repl.co/ip")
          .then(({ data }) => {
            handleImageUpload(imageInputRef.current.files[0], data, userr);
          })
          .catch((err) => console.log(err));
      }

      if (change === true) {
        axios({
          method: "PUT",
          url:
            "https://api.k1a.repl.co/guilds/" +
            params.guildid +
            "?userid=" +
            userr.id +
            "&guildid=" +
            params.guildid,
          data: requestData,
        })
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));

        notification.style.display = "";
        setTimeout(() => (notification.style.display = "none"), 5000);
      }
    }

    return (
      <Regular>
        <div>
          <Button
            size="xs"
            icon={<ArrowLeftSquare set="bold" primaryColor={inherit} />}
            b
            as={Link}
            light
            href="/#/profile"
          >
            <Spacer x={1.5} /> Back to Guilds
          </Button>
        </div>
        {user && guild ? (
          <>
            <Center>
              <Text b size={32}>
                {guild.discord.name}
              </Text>
            </Center>
            <Spacer y={1} />
            <Collapse.Group shadow>
              <Collapse title="Bot customization">
                <Notification id="notification-bc" />
                <form
                  style={{
                    padding: "2px",
                  }}
                >
                  <Input
                    underlined
                    maxLength={25}
                    id="custom-nick"
                    label="Custom nickname"
                    initialValue={guild.bot.nick || ""}
                    status="default"
                  />
                  <Spacer y={1} />
                  <Button
                    flat
                    auto
                    onPress={(e) => handleBotCustomizationForm(e, user)}
                    color="$white"
                  >
                    Submit
                  </Button>
                </form>
              </Collapse>
              <Collapse
                subtitle="Available soon!"
                title="Welcomes configuration"
              >
                <Notification id="notification-wc" />
                <form>
                  <Input
                    id="card-title"
                    label="Card title"
                    initialValue={guild.db.configurations.welcome.title || ""}
                    underlined
                  />
                  <Spacer y={2} />
                  <Input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    label="Card background"
                    underlined
                  />
                  <Spacer y={1} />
                  <Text h6>Actual background</Text>
                  <img
                    src={
                      "https://api.k1a.repl.co/guilds/" +
                      params.guildid +
                      "/welcomebg"
                    }
                    loading="lazy"
                    width="512px"
                  />
                  <Spacer y={1} />
                  <Button
                    flat
                    auto
                    onPress={(e) => handleWelcomeConfig(e, user)}
                    color="$white"
                  >
                    Submit
                  </Button>
                </form>
              </Collapse>
            </Collapse.Group>
          </>
        ) : (
          <Center>
            <Loading />
          </Center>
        )}
      </Regular>
    );
  } else {
    return <RequestLogin />;
  }
}

export default GuildPanel;
