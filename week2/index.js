const http = require("http");
const url = require("url");
const handleUsingFetch = require("./handleUsingFetch");
const handleUsingHttp = require("./handleUsingHttp");

const listUrl = [
  "https://lsfljasflja.com",
  "http://www.java2s.com/",
  "https://translate.google.com/",
  "https://stackoverflow.com/",
  "https://www.facebook.com/duongbui234",
  "https://www.youtube.com/channel/UCFrmHbhYtldEItj2NWZ6-zg",
  "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/concat",
];

const hostname = "localhost";
const port = 8000;

// Create a local server to receive data from
const server = http.createServer(async (req, res) => {
  const { pathname } = url.parse(req.url, true);
  // Handle using http
  if (pathname === "/c1") {
    const result = await handleUsingHttp(listUrl);
    res.writeHead(200, { "Content-Type": "text/html" });
    let string = "";

    result.forEach((el) => {
      string = string.concat(`<h3>${el.uri}: ${el.message}</h3><br>`);
    });
    res.end(string);

    // Handle using fetch
  } else if (pathname === "/c2") {
    const result = await handleUsingFetch(listUrl);
    res.writeHead(200, { "Content-Type": "text/html" });
    let string = "";

    result.forEach((el) => {
      string = string.concat(`<h3>${el.uri}: ${el.message}</h3><br>`);
    });
    res.end(string);
  } else {
    res.writeHead("404", {
      "Content-type": "text/html",
    });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(port, hostname, () => {
  console.log(`${hostname} is running at port:${port}`);
});
