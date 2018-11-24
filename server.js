const http = require('http');
const app = require('./app.js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

if (fs.existsSync(path.join(__dirname, '/.env'))) {
  dotenv.load({ path: '.env' });
}

const port = process.env.PORT || 3003;
const host = process.env.HOST || '127.0.0.1';

const server = http.createServer(app);
server.listen(port, host, () => {
  console.log('Server started on ' + host + ':' + port);
});
