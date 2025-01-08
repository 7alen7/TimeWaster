const express = require('express');
const https = require('https');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;


const fs = require('node:fs');

MAL_PROFILE_URL = 'https://myanimelist.net/profile/7alen7'
MAL_DAYS_LARGE_REGEX = /\<\/span\>\d*\.\d*\<\/div\>/g;
MAL_DAYS_SMALL_REGEX = /[0-9]{1,4}\.[0-9]{1,2}/g;

async function getMALDays(url) {
    const { data: html } = await axios.get(url);
    return html;
};

app.get('/', function (req, res) {
    res.redirect('/home');
});

app.get('/home', async (request, response) => {

    let html = fs.readFileSync("home.html", "utf-8");
    getMALDays(MAL_PROFILE_URL).then((res) => {
        const $ = cheerio.load(res);
        console.log(res);
        const largeDays = res.match(MAL_DAYS_LARGE_REGEX);
        console.log(largeDays);
        AnimeDays = largeDays[0].match(MAL_DAYS_SMALL_REGEX);
        MangaDays = largeDays[1].match(MAL_DAYS_SMALL_REGEX);
        console.log(MangaDays[0]);
        console.log(AnimeDays[0]);
        html = html.replace("{{animeDays}}", AnimeDays);
        html = html.replace("{{mangaDays}}", MangaDays);

        response.end(html);
        
    });

    //response.send(await readFile('./home.html', 'utf-8'));
});

app.listen(process.env.PORT || 1337, () => console.log('app available at localhost:3000'));

