import React from "react";
import { Text, Link, Button, Spacer } from "@nextui-org/react";

import "./GuildCard.css";

export default function GuildCard({ guild, invite }) {
  return (
    <div className="guildcard">
      <div className="guildcard__img">
        <img
          src={
            "https://cdn.discordapp.com/icons/" +
            guild.id +
            "/" +
            guild.icon +
            ".png?size=1024"
          }
          width="100%"
        />
      </div>
      <div className="guildcard__body">
        <Text b size={12}>
          {guild.name}
        </Text>
        <Spacer y={0.25} />
      </div>
      <div className="guildcard__body__buttons">
        {!invite ? (
          <Button size="sm" onPress={() => window.location.href = "https://" + `discord.com/api/oauth2/authorize?client_id=1123149255410978816&permissions=395409091702&guild_id=${guild.id}&disable_guild_select=true&scope=bot%20identify%20guilds`} auto light color="warning">
            Invite
          </Button>
        ) : (
          <Button
            size="sm"
            onPress={() => window.location.href = window.location.origin + "/#/guild/" + guild.id}
            auto
            light
            color="primary"
          >
            Settings
          </Button>
        )}
      </div>
    </div>
  );
}
