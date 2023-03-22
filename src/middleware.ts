import { withAuth } from 'next-auth/middleware';

export default withAuth(async function middleware(req) {
  const pathname = req.nextUrl.pathname;
  //rate-limiting
  if (pathname === '/api') {
    const ip = req.ip ?? '127.0.0.1';
  }
});
