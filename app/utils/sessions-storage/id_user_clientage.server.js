import { createCookieSessionStorage } from '@remix-run/node'; // or cloudflare/deno

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  // a Cookie from `createCookie` or the CookieOptions to create one
  cookie: {
    name: 'id_user_clientage',
    path: '/',
    sameSite: 'none',
    secrets: ['s3cret1'],
    secure: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
  },
});

export const idUserClientageSessions = { getSession, commitSession, destroySession };
