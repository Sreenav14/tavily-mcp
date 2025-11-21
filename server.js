const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    // Health check / root
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "MCP server running" }));
    return;
  }

  if (req.url === "/sse") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    });

    // Very dumb fake MCP-style message
    res.write(`data: {"type":"initialize","status":"ok"}\n\n`);
    return;
  }

  // Any other path → 404
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not Found" }));
});

// On Render, PORT is usually 10000
const PORT = process.env.PORT || 10000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`MCP server running on port ${PORT}`);
});
