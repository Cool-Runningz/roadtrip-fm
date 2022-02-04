import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "remix";
import styles from "./styles/app.css"

export function links() {
    return [{ rel: "stylesheet", href: styles }]
}

export function meta() {
  return { title: "RoadTrip.FM" };
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
      <body  className="flex flex-col items-center justify-center overflow-hidden bg-gradient-to-r from-cyan-400 to-sky-500">
      <header className="text-center my-8">
      <h1><a href="/">RoadTrip.FM 🚗</a></h1>
      </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
