import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET as string);

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const accessToken = request.cookies.get('token')?.value;

    if (!accessToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    };

    if (pathname.startsWith('/admin')) {
        try {
            const { payload } = await jwtVerify(accessToken, JWT_SECRET);
            if (payload.role !== 'admin') {
                return NextResponse.redirect(new URL('/', request.url));
            }
        } catch (err) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
};

export const config = {
    matcher: [
        '/admin/:path*',
        '/companies/new',
        '/company/:path*/review',
        '/profile/:path*',
        '/settings/:path*'
    ]
};