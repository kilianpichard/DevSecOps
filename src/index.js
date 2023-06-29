const express = require('express');
const app     = express();
const port    = 80;

app.disable("x-powered-by")

app.get('/', (req, res) => {
    res.send("hello world");
});

app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app