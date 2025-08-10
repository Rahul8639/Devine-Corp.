import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    "https://zvuwueirljdpyazwficj.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2dXd1ZWlybGpkcHlhendmaWNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMjY1MTQsImV4cCI6MjA2OTkwMjUxNH0.dNH3ckZeuS9wSBpbFgE4Zb15r6kdSNAHjSb8konkCAs",
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    const url = request.nextUrl.clone();

    // Block non-admins from /admin route
    if (url.pathname.startsWith("/admin")) {
      // If no user or error, redirect to login
      if (!user || error || user.email !== "rahulprasad9779@gmail.com") {
        url.pathname = "/auth/login";
        return NextResponse.redirect(url);
      }
    }

    return response;
  } catch (error) {
    // If there's any error, redirect to login
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/admin/:path*"],
}; 