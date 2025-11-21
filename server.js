import http from "http";

const server = http.createServer((req, res) => {
  if (req.url === "/sse") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive"
    });

    // Fake MCP handshake response
    res.write(`data: {"type":"initialize","status":"ok"}\n\n`);
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "MCP server running" }));
  }
});

// ✅ Use Render's PORT env var if present
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`MCP server running on port ${PORT}`);
});
