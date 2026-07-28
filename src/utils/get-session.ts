import { fromNodeHeaders } from 'better-auth/node';
import { Request } from 'express';
import { auth } from '../lib/auth';

export async function getSession(req: Request) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return session;
}
