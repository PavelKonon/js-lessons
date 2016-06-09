var webPush = require('web-push');
const config = require('./config.json');

webPush.setGCMAPIKey(config['gcm-key']);

module.exports = (app, route) => {
    app.post(route + 'register', (req, res) => {
        console.log('Client registered');
        res.sendStatus(201);
    });

    app.post(route + 'sendNotification', (req, res) => {
        console.log('Notification prepared');
        setTimeout(() => {
            webPush.sendNotification(req.body.endpoint, {
                    TTL: req.body.ttl,
                    payload: req.body.payload,
                    userPublicKey: req.body.key,
                    userAuth: req.body.authSecret
                })
                .then(() => {
                    res.sendStatus(201);
                }).catch(e => {
                    console.log(e.stack);
                });
        }, req.body.delay * 1000);
    });
};
