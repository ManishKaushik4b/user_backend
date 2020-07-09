process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;
const express = require('express');
const http = require('http');
var cors = require('cors')
let app = express();
app.use(cors())
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./routes')(app)
require('./lib/mongo');

process.on('uncaughtException', err => {
  console.error(err, 'Uncaught Exception thrown');
  process.exit(1);
});


// process.on('unhandledRejection', (reason, p) => {
//     console.error(reason, 'Unhandled Rejection at Promise', p);
//     process.exit(1);
// })

let server = http.createServer(app).listen(port, function() {
  console.log("Booting server in " + app.get('env') + " mode");
  console.log("Express server listening on port " + port);
});

module.exports = server;

//app.listen(port,()=>console.log(`Listening on port ${port}....`))