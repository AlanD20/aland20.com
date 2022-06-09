import config from '@config';
import { User } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';


interface ResponseApi {
  message?: string,
  status: string,
  code: number
}


export async function middleware(req: NextRequest) {


  const sessionToken = req.cookies['__Secure-next-auth.session-token'] ?? req.cookies['next-auth.session-token'];
  if (!sessionToken) {
    const url = new URL('/', req.url);
    return NextResponse.redirect(url);
  }
  const userUrl = config.api.sessions.user(sessionToken)
  const user: User & ResponseApi | null = await (
    await fetch(userUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': config.host
      },
      credentials: 'same-origin',
    })
  ).json();

  if (!user) {
    const homeUrl = new URL('/', req.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}
