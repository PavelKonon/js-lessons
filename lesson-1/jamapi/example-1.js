const request = require('request');
request.post('http://www.jamapi.xyz/', {form: {url: 'http://p97.com', json_data: '{"title": "title"}'}}, function(err, response, body) {
    console.log(body);
})
