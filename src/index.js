import http from 'http';

import routes from './routes.js';

const server = http.createServer((req, res) => routes(req, res));

server.listen(3001, () => console.log('Server on port', 3001));
