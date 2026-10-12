import { NextResponse, type NextRequest } from "next/server";

export function apiGuard(request: NextRequest) {
  const allowedOrigin = request.nextUrl.origin;
  const requestOrigin = request.headers.get("origin");
  const secFetchSite = request.headers.get("sec-fetch-site");

  if (request.nextUrl.pathname.startsWith("/api")) {
    // 1. Gorag: Daşarky islegler (Postman we ş.m.) üçin
    if (requestOrigin && requestOrigin !== allowedOrigin) {
      return new NextResponse(
        JSON.stringify({ error: "Bu API-ä girmäge rugsat ýok!" }),
        { status: 403, headers: { "Content-Type": "application/json" } },
      );
    }

    // 2. Gorag: Brauzer derejesinde diňe öz frontendiňizden gelmegi üçin
    if (secFetchSite && secFetchSite !== "same-origin") {
      return new NextResponse(JSON.stringify({ error: "Rugsat berilmedi!" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  // Eger hemme zat düzüw bolsa, indiki ädime geçmäge rugsat berýär (NextResponse.next() däl)
  return null;
}
