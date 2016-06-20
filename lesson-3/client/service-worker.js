self.addEventListener('push', function(event) {
    var payload = event.data ? event.data.text() : 'no payload';
    console.log('Payload ' + payload);
    var data = {
        body: 'Geek-Solutions is the best',
        icon: './ae1aeaa00c9ee46cac73438c5d225cac.jpeg'
    };
    if (payload === 'geek-solutions') {
        data.tag = payload;
    }
    if (payload === 'custom') {
        data.body = payload;
    }
    event.waitUntil(
        self.registration.showNotification('Geek-Solutions test', data)
    );
});

self.addEventListener('notificationclick', function(event) {
    event.waitUntil(
        self.clients.matchAll().then(function(clientList) {
            if (clientList.length > 0) {
                return clientList[0].focus();
            }
            return self.clients.openWindow('http://geeksolutions.co');
        })
    );
});
