export default {
  async fetch(request: Request) {
    const url = new URL(request.url);

    // Remove "/api" from the incoming request path
    const path = url.pathname.replace(/^\/api/, '');

    // Construct target BT URL
    const targetUrl =
      `http://www.bt4uclassic.org/webservices/bt4u_webservice.asmx${path}${url.search}`;

    // Forward request to BT
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: {
        "Accept": "application/xml"
      }
    });

    // Return response with caching
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        "Cache-Control": "public, max-age=30, s-maxage=30",
        "Content-Type": response.headers.get("Content-Type") ?? "application/xml"
      }
    });
  }
};
