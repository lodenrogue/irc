const Timestamp = require('../util/timestamp');

class ConnectionHandler {

    constructor(client, eventEmitter) {
        client.addListener('registered', (message) => {
            eventEmitter.emit(
                'connected',
                new Timestamp().toString(),
                message.server);
        });
    }
}

module.exports = ConnectionHandler;
