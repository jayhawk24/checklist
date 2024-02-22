import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get("access_token")?.value;

    if (accessToken) {
        console.log(accessToken);
        return NextResponse.redirect(new URL("/checklist", request.url));
    }
    return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"]
};
