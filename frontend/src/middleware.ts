import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
    const sessionCookie = request.cookies.get('jid');

    if (!sessionCookie) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
};

export const config = {
    matcher: [
        '/admin/:path*',
        '/companies/new',
        '/company/:path*/review'
    ]
};