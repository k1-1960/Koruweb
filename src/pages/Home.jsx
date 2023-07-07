import React from "react";
import { Text, Button, Link, Spacer, Image, styled } from "@nextui-org/react";

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});
const Buttons = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});
const Flex = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.5rem",
});

const titleCss = {
  lineHeight: "1.15",
  textAlign: "center",
  wordWrap: "wrap",
  marginLeft: "1.5rem",
  marginRight: "1.5rem",
};

export default function () {
  return (
    <Container>
      <Spacer y={1} />
      <Text size="2.25rem" weight="bold" css={titleCss}>
        Build the best Discord server
      </Text>
      <Spacer y={1} />
      <Text
        weight="light"
        css={{
          textAlign: "center",
          marginLeft: "2rem",
          marginRight: "2rem",
        }}
      >
        Koru has a great variety of commands made for administrators and members
        of the server. Let no one run out of fun!
      </Text>
      <Spacer y={2} />
      <Buttons>
        <Button as={Link} width="2.5rem" onPress={() => {
    const element = document.getElementById('Features');
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }} size="lg" flat>
          Features
        </Button>
        <Spacer y={0.5} />
        <Button
          as={Link}
          href="https://discord.com/api/oauth2/authorize?client_id=1123149255410978816&permissions=395409091702&scope=bot%20identify%20guilds"
          width="2.5rem"
          size="lg"
          flat
        >
          Add to your server
        </Button>
      </Buttons>
      <Spacer y={3} />
      <Text id="Features" h2 weight="bold" css={titleCss}>
        Welcome system
      </Text>
      <Spacer y={1} />
      <Container>
        <img
          src="/img/welcome.jpg"
          width="75%"
          style={{ borderRadius: "15px" }}
        />
      </Container>
      <Spacer y={1} />
      <Text
        weight="light"
        css={{
          textAlign: "center",
          marginLeft: "2rem",
          marginRight: "2rem",
        }}
      >
        Welcome your users in a personalized way. Thank them for joining, tell
        them what the server is about and what they have to do when they start.
      </Text>
      <Spacer y={2} />
      <Text h2 weight="bold" css={titleCss}>
        Level cards
      </Text>
      <Spacer y={1} />
      <Container>
        <img
          src="/img/rankcard.jpg"
          width="75%"
          style={{ borderRadius: "15px" }}
        />
      </Container>
      <Spacer y={1} />
      <Text
        weight="light"
        css={{
          textAlign: "center",
          marginLeft: "2rem",
          marginRight: "2rem",
        }}
      >
        Graphically show your users how much they are worth on the server with a
        level system. You can reward them for being active!
      </Text>
    </Container>
  );
}
