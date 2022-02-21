import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "remix";
import styles from "./styles/app.css";
import logo from "~/images/Logo.svg";

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}

export function meta() {
  const description = "A site that helps you find nearby radio stations. Perfect for your next road trip!"
  const title = "RoadTrip.FM -  Quickly & Easily Find Nearby Radio Stations"
  const url = "https://www.roadtripfm.live"
  const imageUrl = "https://raw.githubusercontent.com/Cool-Runningz/roadtrip-fm/3f637aec8ba060d9ca1ec52e048e70c2b7380b97/app/images/Logo-Blue.svg"
  return {
    title,
    description,
    "og:type": "website",
    "og:url": url,
    "og:title": title,
    "og:description": description,
    "og:image": imageUrl,
    "twitter:card": "summary_large_image",
    "twitter:url": url,
    "twitter:title": title,
    "twitter:description": description,
    "twitter:image": imageUrl
  };
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col items-center justify-center bg-gradient-to-r from-cyan-400 to-sky-500 py-8">
        <header>
          <h1>
            <a href="/">
              <span className="sr-only">RoadTrip.FM</span>
              <img
                alt="logo"
                className="w-72 sm:w-full"
                src={logo}
              />
            </a>
          </h1>
        </header>
        <main role="main" className="px-5">
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
        {process.env.NODE_ENV === "production" && <script defer data-domain="roadtripfm.live" src="https://plausible.io/js/plausible.js"></script>}
      </body>
    </html>
  );
}
