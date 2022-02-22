import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch
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
  const imageUrl = "https://raw.githubusercontent.com/Cool-Runningz/roadtrip-fm/main/app/images/roadtrip-fm-headline.jpeg"
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

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <html className="h-full">
      <head>
        <title>404 Not Found</title>
        <Links />
      </head>
      <body className="h-full">
        <div className="min-h-full pt-16 pb-12 flex flex-col bg-white">
          <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-16">
              <div className="text-center">
                <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">{caught.status} error</p>
                <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">{caught.statusText}</h1>
                <p className="mt-2 text-base text-gray-500">Sorry, we couldn't find the page you're looking for.</p>
                <div className="mt-6">
                  <a href="/" className="text-base font-medium text-indigo-600 hover:text-indigo-500 hover:underline">
                    Go back home
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
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
