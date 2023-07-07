import React, { useEffect, useState } from "react";
import { Link, Button, Text, Loading } from "@nextui-org/react";
import axios from "axios";

const credentialsAPI = "https://api.k1a.repl.co/credentials";
export function Login() {
  let [credentials, setCredentials] = useState(false);
  useEffect(() => {
    axios({
      url: credentialsAPI,
      method: "GET",
    })
      .then((response) => {
        // Manejar la respuesta exitosa
        setCredentials(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
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
        {credentials ? (
          <Button
            as={Link}
            href={
              "https://discord.com/api/oauth2/authorize?client_id=" +
              credentials.CLIENT_ID +
              "&redirect_uri=" +
              encodeURIComponent(credentials.CALLBACK_URL) +
              "&response_type=code&scope=identify%20email%20guilds"
            }
            flat="true"
            auto="true"
          >
            Go to Discord
          </Button>
        ) : (
          <Button disabled auto bordered color="primary" css={{ px: "$13" }}>
            <Loading color="currentColor" size="sm" />
          </Button>
        )}
      </>
    );
  }
}

// Con esta función manejamos el codigo que resulta en el proceso de discord.
export function LoginCallback() {
  useEffect(() => {
    axios({
      url: credentialsAPI,
      method: "GET",
    }).then(({ data }) => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      // si se encontró el codigo.
      if (code) {
        const requestBody = new URLSearchParams();
        requestBody.append("client_id", data.data.CLIENT_ID);
        requestBody.append("client_secret", data.data.CLIENT_SECRET);
        requestBody.append("grant_type", "authorization_code");
        requestBody.append("code", code);
        requestBody.append("scope", "identify email guilds");
        requestBody.append("redirect_uri", data.data.CALLBACK_URL);

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
    });
  }, []);
}
