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
          <Button size="sm" auto light color="warning">
            Invite
          </Button>
        ) : (
          <Button size="sm" auto light color="primary">
            Settings
          </Button>
        )}
      </div>
    </div>
  );
}
