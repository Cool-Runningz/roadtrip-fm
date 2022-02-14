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
      </body>
    </html>
  );
}
