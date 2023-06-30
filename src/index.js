const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;

const authRoutes = require("./routes/auth");
const squareRoutes = require("./routes/square");

app.disable("x-powered-by");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(authRoutes);
app.use(squareRoutes);

let server;

server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = {
  app,
  closeServer: () => {
    server.close();
  },
};
