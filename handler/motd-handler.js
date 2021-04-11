const Timestamp = require('../util/timestamp');

class MOTDHandler {

    constructor(client, eventEmitter) {
        client.addListener('motd', (motd) => {
            let timestamp = new Timestamp().toString();
            eventEmitter.emit('motd', timestamp, motd);
        });
    }
}

module.exports = MOTDHandler;
