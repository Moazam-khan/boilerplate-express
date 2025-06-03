require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Mount body-parser middleware for URL-encoded data
app.use(bodyParser.urlencoded({ extended: false }));

// Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Serve static files
app.use('/public', express.static(__dirname + '/public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// GET /name with query parameters
app.get('/name', (req, res) => {
  res.json({ name: `${req.query.first} ${req.query.last}` });
});

// POST /name with form data
app.post('/name', (req, res) => {
  res.json({ name: `${req.body.first} ${req.body.last}` });
});

// Other existing routes...
app.get('/json', (req, res) => {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }
  res.json({ message });
});

app.get('/now', 
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

app.get('/:word/echo', (req, res) => {
  res.json({ echo: req.params.word });
});

module.exports = app;