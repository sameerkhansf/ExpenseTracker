const express = require('express');
const next = require('next');
const session = require('express-session');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(session({
    secret: 'louve-paris',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;

  });
});
