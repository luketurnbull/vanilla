const handler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);

  if (url.pathname === "/") {
    return new Response(await Deno.readFile("index.html"), {
      headers: { "content-type": "text/html" },
    });
  }

  if (url.pathname.startsWith("/src/")) {
    const file = await Deno.readFile(`.${url.pathname}`);
    const contentType = url.pathname.endsWith(".ts")
      ? "application/javascript"
      : "text/plain";
    return new Response(file, { headers: { "content-type": contentType } });
  }

  return new Response("Not Found", { status: 404 });
};

console.log("Server running on http://localhost:8000");
Deno.serve({ port: 8000 }, handler);
