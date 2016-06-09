var endpoint;
var key;
var authSecret;

navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {

        return registration.pushManager.getSubscription()
            .then(function(subscription) {

                if (subscription) {
                    return subscription;
                }

                return registration.pushManager.subscribe({
                    userVisibleOnly: true
                });
            });
    }).then(function(subscription) {
        var rawKey = subscription.getKey ? subscription.getKey('p256dh') : '';
        key = rawKey ?
            btoa(String.fromCharCode.apply(null, new Uint8Array(rawKey))) :
            '';
        var rawAuthSecret = subscription.getKey ? subscription.getKey('auth') : '';
        authSecret = rawAuthSecret ?
            btoa(String.fromCharCode.apply(null, new Uint8Array(rawAuthSecret))) :
            '';

        endpoint = subscription.endpoint;

        document.getElementById('endpoint').textContent = endpoint;

        return fetch('./register', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                endpoint: subscription.endpoint,
                key: key,
                authSecret: authSecret
            }),
        });
    }).catch(e => {
        console.log(e);
    });

document.getElementById('send').onclick = function() {
    var delay = document.getElementById('notification-delay').value;
    var ttl = document.getElementById('notification-ttl').value;
    var payload = document.getElementById('notification-payload').value;
    var data = {
        endpoint: endpoint,
        payload: payload,
        delay: delay,
        ttl: ttl,
        key: key,
        authSecret: authSecret
    };
    fetch('./sendNotification', {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });
};
