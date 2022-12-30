import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoginTwitchButton from "../src/components/LoginTwitchButton";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { asPath } = useRouter();
  const [twitchToken, setTwitchToken] = useState("");
  const [twitchUser, setTwitchUser] = useState(null);

  useEffect(() => {
    const hash = asPath.split("#")[1];
    console.log(hash);
    const parsedHash = new URLSearchParams(hash);
    const token = parsedHash.get("access_token");
    if (token !== "" && token) {
      setTwitchToken(token);
      fetchTwitchUser(token).catch(console.error);
    }
  }, [asPath, setTwitchToken]);

  async function fetchTwitchUser(token: string) {
    const user = await (
      await fetch("https://api.twitch.tv/helix/users", {
        headers: {
          Authorization: `Bearer ${token}`,
          ...(process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID && {
            "Client-Id": process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID,
          }),
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
      <main className={styles.main}>
        <LoginTwitchButton></LoginTwitchButton>
        <p>Twitch token: {twitchToken}</p>
        <p>Twitch client: {process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID}</p>
        <p>Twitch user: {JSON.stringify(twitchUser?.["data"]?.[0]?.["display_name"])}</p>
        <div className={styles.description}>
          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Learn <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>
          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Templates <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>
          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Deploy <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Instantly deploy your Next.js site to a shareable URL with&nbsp;Vercel.
            </p>
          </a>
        </div>
      </main>
    </>
  );
}
