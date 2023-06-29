const express = require('express');
const app     = express();
const port    = 80;
const square = require("./lib/square")

app.disable("x-powered-by")

app.get('/', (req, res) => {
    res.send("hello world");
});

app.get('/square/:nb', (req, res) => {
	const nb = req.params.nb
	res.write(square(parseInt(nb)))
	res.end()
});


app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app