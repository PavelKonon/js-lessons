var express = require('express');
var app = express();
const config = require('./config.json');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded

app.listen(config.port, function() {
    console.log(`Example app listening on port ${config.port}!`);
});

app.use('/', express.static(__dirname + '/../client'));

require('./web-push')(app, '/');
