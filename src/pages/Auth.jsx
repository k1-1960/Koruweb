import React, { useEffect, useState } from "react";
import { Link, Button, Text } from "@nextui-org/react";
import env from "./env.js";

// Pantalla de login, solo muestra un botón. Si ya está logeado lo redirige a la pagina inicial (uso HashRouter de react-router-dom).

const { CALLBACK_URL, CLIENT_SECRET, CLIENT_ID } = env;

// alert(JSON.stringify({ CALLBACK_URL, CLIENT_SECRET, CLIENT_ID }));

export function Login() {
  const handleLogin = () => {
    window.location.href = String(
      "https://discord.com/api/oauth2/authorize?client_id=TU_CLIENT_ID&redirect_uri=TU_REDIRECT_URI&response_type=code&scope=identify%20email%20guilds"
        .replace("TU_CLIENT_ID", CLIENT_ID)
        .replace("TU_REDIRECT_URI", encodeURIComponent(CALLBACK_URL))
    );
  };
  // Sí ya está logeado.
  if (localStorage.getItem("discord-auth-token")) {
    // Redirección.
    window.location.href = window.location.origin + "/#";
  } else {
    // Renderizar el botón.
    return (
      <>
        <h1>Login</h1>
        <Text h3>Authenticate with discord</Text>
        <Text h6>
          (Don't worry, we don't have access to your login credentials.)
        </Text>
        <Button onPress={handleLogin} flat="true" auto="true">
          Go to Discord
        </Button>
      </>
    );
  }
}

// Con esta función manejamos el codigo que resulta en el proceso de discord.
export function LoginCallback() {
  useEffect(() => {
    // Obtiene el código de autorización de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    // si se encontró el codigo.
    if (code) {
      const requestBody = new URLSearchParams();
      requestBody.append("client_id", CLIENT_ID);
      requestBody.append("client_secret", CLIENT_SECRET);
      requestBody.append("grant_type", "authorization_code");
      requestBody.append("code", code);
      requestBody.append("scope", "identify email guilds");
      requestBody.append("redirect_uri", CALLBACK_URL);

      // Generamos un AccessToken del usuario para hacer peticiones en su nombre.
      fetch("https://discord.com/api/v10/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: requestBody.toString(),
      })
        .then((response) => response.json())
        .then((data) => {
          // Guardamos los datos necesarios en el navegador del usuario.
          localStorage.setItem("discord-auth-token", data.access_token);
          localStorage.setItem("discord-auth-expires_in", data.expires_in);

          // Redirigimos al usuario a la pagina principal pero ya autenticado.
          window.location.href = window.location.origin + "/#";
        })
        .catch((error) => {
          return <div>Error</div>;
        });
    }
  }, []);
}
