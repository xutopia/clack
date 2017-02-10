const express = require('express')
const io = require('socket.io')
const http = require('http')
const morgan = require('morgan')
const bodyParser = require('body-parser')

require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({
  extended: true,
}))
app.use(bodyParser.json())
app.use(morgan('dev'))


const server = http.createServer(app);
const port = process.env.PORT || 3000;

app.listen('listening on port', port)
