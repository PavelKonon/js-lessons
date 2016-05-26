const SlackBot = require('slackbots');
const unirest = require('unirest');
const config = require('./config-default');
const fs = require('fs');

if (fs.existsSync('./config.json')) {
    Object.assign(config, require('./config'))
}

var bot = new SlackBot({
    token: config['bot-api-key'],
    name: '@geek-solutions-bot'
});

console.log('Bot has started');
var timeoutId = null;
bot.on('message', (event) => {
    console.dir(event);
    if (event.type === 'presence_change') {
        if (event.presence === 'away') {
            sendToUserById(event.user, 'Hey! Come back now!');
        } else if (event.presence === 'active') {
            sendToUserById(event.user, 'Good boy!');
        }
    } else if (event.type === 'user_typing') {
        if (!timeoutId) {
            console.log('Timeout started');
            timeoutId = setTimeout(()=> {
                sendToUserById(event.user, 'What are you typing so long?');
            }, 5000);
        }
    } else if (event.type === 'message') {
        console.log(`Yodize message[${event.text}]`);
        clearTimeout(timeoutId);
        timeoutId = null;
        getYodaText(event.text).then(yodaText => {
            console.log(`Yoda text received [${yodaText}]`);
            sendToUserById(event.user, yodaText);
        });
    }
});

getYodaText = text => {
    return new Promise(resolve => {
        unirest.get(`https://yoda.p.mashape.com/yoda?sentence=${encodeURI(text)}`)
            .header("X-Mashape-Key", config['mashape-key'])
            .header("Accept", "text/plain")
            .end(result => resolve(result.body));
    });
};

sendToUserById = (id, text) => {
    return bot.getUsers().then(users => {
        var user = users.members.find(u => u.id = id);
        return bot.postMessageToUser(user.name, text, {
            icon_url: 'https://avatars.slack-edge.com/2016-05-17/43628134289_86f3ca9751b7f73433f9_48.jpg'
        });
    });
};
