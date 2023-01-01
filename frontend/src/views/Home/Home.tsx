import { useEffect, useState } from "react";
import LoginTwitchButton from "../src/components/LoginTwitchButton";
import Post from "../src/components/Posts";
import Cookies from "js-cookie";
import NavBar from "../src/components/NavBar";
import { Code } from "@mantine/core";
import { Prism } from "@mantine/prism";
import useLocation from "react-router-dom";

export default function Home() {
  const { hash } = useLocation();
  const [twitchToken, setTwitchToken] = useState("");
  const [twitchUser, setTwitchUser] = useState(null);

  useEffect(() => {
    // the URL hash is processed by the browser only. not available in edge function/backend
    // so must parse in useEffect
    const parsedHash = new URLSearchParams(hash);
    const token = parsedHash.get("access_token");
    if (token !== "" && token) {
      setTwitchToken(token);
      Cookies.set("twitchAccessToken", token, {
        expires: 365,
        sameSite: "none",
        secure: true,
      });
      fetchTwitchUser(token).catch(console.error);
      // remove hash
      history.pushState("", document.title, window.location.pathname + window.location.search);
    }
  }, [asPath, setTwitchToken]);

  async function fetchTwitchUser(token: string) {
    const user = await (
      await fetch("https://api.twitch.tv/helix/users", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Client-Id": process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID ?? "",
        },
      })
    ).json();
    setTwitchUser(user);
  }

  return (
    <>
      <Head>
        <title>Edge functions test</title>
        <meta name="description" content="Edge functions test" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar avatarUrl={twitchUser?.["data"]?.[0]?.["profile_image_url"] ?? ""} tabs={[]}></NavBar>
      <main className={styles.main}>
        <p>Twitch user token: {twitchToken}</p>
        <Prism language="json" scrollAreaComponent="div">
          {JSON.stringify(twitchUser?.["data"]?.[0] ?? "", undefined, 2)}
        </Prism>
        <Post />
      </main>
    </>
  );
}
