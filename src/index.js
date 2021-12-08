import http from 'http';

const server = http.createServer((req, res) => {
  const { url, method } = req;
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify({ ok: true }));
  res.end();
});

server.listen(3001);
console.log('Server on port', 3001);
