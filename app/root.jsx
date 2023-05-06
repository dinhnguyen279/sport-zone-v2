import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

import { ExternalScripts } from 'remix-utils';

import styles from './index.css';

import swiperStyles from 'swiper/swiper-bundle.min.css';

import bootstrapStyles from 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import toastifyStyles from 'react-toastify/dist/ReactToastify.css';

import ErrorPage from './Share/404/404';

export const links = () => [
  { rel: 'stylesheet', href: bootstrapStyles },
  { rel: 'stylesheet', href: styles },
  { rel: 'stylesheet', href: swiperStyles },
  { rel: 'stylesheet', href: toastifyStyles },
];
export function ErrorBoundary() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ErrorPage />
      </body>
    </html>
  );
}
const scripts = () => {
  return [
    {
      src: 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js',
      id: 'facebook-jssdk',
    },
  ];
};

export const handle = { scripts };

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <ExternalScripts />
        <Scripts />
        <LiveReload />
        <ToastContainer />
      </body>
    </html>
  );
}
