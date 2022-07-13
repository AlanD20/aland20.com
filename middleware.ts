import appConfig from '@config';
import { User } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface ResponseApi {
  message?: string;
  status: string;
  code: number;
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path'],
};

export async function middleware(req: NextRequest) {

  const sessionToken =
    req.cookies.get('__Secure-next-auth.session-token') ??
    req.cookies.get('next-auth.session-token');


  if (!sessionToken) return redirect('/', req.url);

  const userUrl = appConfig.api.sessions.user(sessionToken as string);
  const user: (User & ResponseApi) | null = await (
    await fetch(userUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: appConfig.host,
      },
      credentials: 'same-origin',
    })
  ).json();

  if (!user) return redirect('/', req.url);

  return NextResponse.next();
}

function redirect(path: string, url) {
  const redirectUrl = new URL(path, url);
  return NextResponse.redirect(redirectUrl);
}
