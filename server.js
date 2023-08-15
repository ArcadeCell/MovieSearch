const http = require('http');
const path = require('path');
const fs = require('fs');

const port = 5000;
const directoryPath = path.join(__dirname);

const server = http.createServer((req, res) => {
  const filePath = path.join(directoryPath, req.url === '/' ? 'index.html' : req.url);
  const fileExt = path.extname(filePath);
  const contentType = getContentType(fileExt);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found
        res.writeHead(404);
        res.end('File not found');
      } else {
        // Server error
        res.writeHead(500);
        res.end('Server error');
      }
    } else {
      // Successful response
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

function getContentType(fileExt) {
  switch (fileExt) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    default:
      return 'text/plain';
  }
}

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
