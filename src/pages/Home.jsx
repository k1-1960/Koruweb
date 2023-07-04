import React from "react";
import { Text, Button, Link, Spacer, Image, styled } from "@nextui-org/react";

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});
const Head = styled("div", {
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
  lineHeight: "1.5",
  textAlign: "left",
  wordWrap: "wrap",
  margin: "1.5rem",
};

export default function () {
  return (
    <Container>
      <Text size="2.25rem" weight="bold" css={titleCss}>
        Create the best place for your community
      </Text>
    </Container>
  );
}
