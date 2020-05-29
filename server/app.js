const express = require("express");
const path = require("path");

const mongodb = require('./database.js');
const api = require('./api/api.js');

const uri = process.env.DB_URI || "mongodb://localhost:27017";

const PORT = process.env.PORT || 3000;
const app = express();
const distPath = path.resolve(__dirname, '..', 'client', 'dist');

mongodb.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true}, err => {
  if (err) throw err
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use('/api', api)
  app.use(express.static(distPath));

  app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
});
