const request = require('request');
var json = {
    "title": "title",
    "photos": [{
        "elem": ".management article img",
        "src": "src",
        "height": "height",
        "width": "width"
    }]
};
request.post('http://www.jamapi.xyz/', {
    form: {
        url: 'http://p97.com/about-us/',
        json_data: JSON.stringify(json)
    }
}, function(err, response, body) {
    console.log(body);
})
