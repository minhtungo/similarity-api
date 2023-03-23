import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_SECRET,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(15, '1 h'),
});

export default withAuth(async function middleware(req) {
  const pathname = req.nextUrl.pathname;
  //rate-limiting
  if (pathname === '/api') {
    const ip = req.ip ?? '127.0.0.1';
    try {
      const { success } = await ratelimit.limit(ip);

      if (!success)
        return NextResponse.json(
          { error: 'Too many requests' },
          { status: 429 }
        );

      return NextResponse.next();
    } catch (error) {
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 400 }
      );
    }
  }
});
