const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const path = require('path');
const { nextTick } = require('process');
var app = express();

app.set('port', 8081);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));

app.get('/', function(req,res)
{
    res.sendFile(path.join(__dirname, './public/showtimes.html'));
});

app.get('/showtimes/:location/:date',function(req,res)
{
    var data = require('./public/showtimes.json')
    var location = req.params.location;
    var date = req.params.date;
    const a = date.split("-");
    date = a[0] + "/" + a[1] + "/" + a[2];
    var values = [];
    for(x in data)
    {
        if(data[x]['location'] == location && data[x]['date'] == date)
        {
           values.push(data[x])
        }
    }
    res.sendFile(path.join(__dirname, './public/updatedShowtimes.html'));
});

app.post('/showtimes',function(req,res)
{
    var location = req.body.locations;
    var date = req.body.date;
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    var url = '/' + location + '/' + date;

    var fURL = fullUrl + url;

    res.writeHead(301,
        {
            Location: fURL
        }).end();
});

const server = app.listen(app.get('port'), function() {
    console.log('The server is running on: ' + app.get('port'));
});