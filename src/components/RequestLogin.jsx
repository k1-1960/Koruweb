import React, { useState, useEffect } from "react";
import { Button, Link, Spacer, Text, styled } from "@nextui-org/react";

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "80%",
});

function RequestLogin() {
  const token = localStorage.getItem("discord-auth-token") || false;
  return token ? null : (
    <Container>
      <h1>You must be logged to perform this action. <Link href="/#/login">Login</Link></h1>
    </Container>
  );
}

export default RequestLogin;
