const MOTDHandler = require('./motd-handler');
const ConnectionHandler = require('./connection-handler');
const JoinHandler = require('./join-handler');

class EventHandler {

    constructor(client, eventEmitter) {
        this.client = client;
        this.eventEmitter = eventEmitter;
    }

    start() {
        new ConnectionHandler(this.client, this.eventEmitter);
        new MOTDHandler(this.client, this.eventEmitter);
        new JoinHandler(this.client, this.eventEmitter);
    }
}

module.exports = EventHandler;
