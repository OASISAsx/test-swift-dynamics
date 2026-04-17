import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const defaultLocale = "en";
const locales = ["en", "th"];

// เปลี่ยนชื่อฟังก์ชันจาก middleware เป็น proxy
export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (!hasLocale) {
    const url = new URL(`/${defaultLocale}${pathname}`, request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
