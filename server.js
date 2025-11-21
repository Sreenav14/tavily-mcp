import http from "http";

const server = http.createServer((req,res)=>{
    if (req.url==="/sse"){
        res.writeHead(200, {
            "content-type": "text/event-stream",
            "cache-control": "no-cache",
            "connection": "keep-alive"
        });
        res.write(`data: {"type":"initialize","status":"ok"}\n\n`);
    } else {
        res.writeHead(200, {"content-type":"application/json"});
        res.end(JSON.stringify({status:"MCP Server running"}));
    }
});

server.listen(3000, ()=>{
    console.log("Server listening on port 3000");
});