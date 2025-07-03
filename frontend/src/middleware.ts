import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET as string);

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('token')?.value;

    if (!token) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    if (pathname.startsWith('/admin')) {
        try {
            const { payload } = await jwtVerify(token, JWT_SECRET);
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
        '/company/:path*/review'
    ]
};