const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();
const distPath = path.resolve(__dirname, '..', 'client', 'dist');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(express.static(distPath));

app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
