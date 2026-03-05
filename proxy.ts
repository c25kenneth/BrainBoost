import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from './lib/auth/auth';

export default async function proxy(request: NextRequest) {
    const session = await getSession(); 
    const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");

    if (!session?.user && isDashboardPage) {
        return NextResponse.redirect(new URL("login", request.url),); 
    } 

    const isSignInPage = request.nextUrl.pathname.startsWith("/login"); 
    const isSignUpPage = request.nextUrl.pathname.startsWith("/signup"); 

    if (session?.user && (isSignInPage || isSignUpPage)) {
        return NextResponse.redirect(new URL("dashboard", request.url));
    }

    return NextResponse.next(); 
}