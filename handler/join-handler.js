class JoinHandler {

    constructor(client, eventEmitter) {

        eventEmitter.addListener('join-request', (channel) => {
            client.join(channel);
        });

        client.addListener('join', (channel, nick, message) => {
            eventEmitter.emit('join', channel, nick);
        });
    }

}

module.exports = JoinHandler;
