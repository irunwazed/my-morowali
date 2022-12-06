const http = require("http");
const fs = require("fs");


const host = '127.0.0.1';
const port = 3030;

// const tes = async () => {
//   console.log(data);
// }
// tes();

// fs.readFile('./index.html', (error, html)=> {
//   if(error) throw error;

//   console.log(html)
// })

// fs.readFile('./index.html', (error, html)=> {
//   if(error) throw error;

//   http.createServer((req, res)=> {
//     res.writeHead(200, {"Content-Type": "text/html"});
//     res.write(html);
//     res.end();
//   }).listen(port, host);
// })

const requestListener = (req, res) => {
  let html = fs.readFileSync('./index.html');
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write(html);
  res.end();
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});