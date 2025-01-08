const express = require('express');
const app = express();
const fs = require('node:fs');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

app.use(express.static(__dirname));



app.get('/', function (req, res) {
    res.redirect('/home');
});

app.get('/home', async (request, response) => {
    let html = fs.readFileSync("home.html", "utf-8");
    response.end(html);
});



app.listen(process.env.PORT || 1337, () => console.log('app available at localhost:3000'));
