const http = require("http");
const fs = require("fs");


const host = '127.0.0.1';
const port = 3030;

fs.readFile('./index.html', (error, html)=> {
  if(error) throw error;

  http.createServer((req, res)=> {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(html);
    res.end();
  }).listen(port, host);
})
