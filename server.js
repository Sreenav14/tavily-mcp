import http from "http";

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    // Root health check
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "MCP server running" }));
    return;
  }

  if (req.url === "/sse") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive"
    });

    res.write(`data: {"type":"initialize","status":"ok"}\n\n`);
    return;
  }

  // Handle unknown routes
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not Found" }));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`MCP server running on port ${PORT}`);
});
