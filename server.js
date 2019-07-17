const express = require('express');
const helmet = require('helmet');

const carsRouter = require('./cars/carsRouter');

const server = express();

server.use(helmet());
server.use(logger);
server.use(express.json());

server.get('/', (req, res) => {
  res.send(`
    <h1>Webdb-ii-challenge</h1>
  `);
});

server.use('/api/cars', carsRouter);

function logger(req, res, next) {
  let newDate = Date.now(),
    currentDate = new Date(newDate).toDateString(),
    timeStamp = new Date(newDate).toTimeString();
  console.log(
    `${req.method} to http://localhost/5000${
      req.path
    } at ${currentDate} ${timeStamp}`,
  );
  console.table(res.status);
  next();
}

module.exports = server;