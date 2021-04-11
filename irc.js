const irc = require('irc-upd');
const EventEmitter = require('events').EventEmitter;
const Timestamp = require('./util/timestamp');

const MOTDHandler = require('./handler/motd-handler');
const UIRenderer = require('./ui/ui-renderer');

const HOST = 'irc.freenode.net';
const USERNAME = 'test4frh6';

class IRC {
    constructor(client = this.createClient(),
                eventEmitter = new EventEmitter(),
                renderer = new UIRenderer()) {

        this.client = client;
        this.eventEmitter = eventEmitter;
        this.renderer = renderer;
    }

    start() {
        new MOTDHandler(this.client, this.eventEmitter);
        this.renderer.start(this.eventEmitter);

        this.eventEmitter.emit('connecting', new Timestamp().toString(), HOST);
        this.client.connect();
        this.eventEmitter.emit('connected', new Timestamp().toString(), HOST);
    }

    createClient() {
        return new irc.Client(HOST, USERNAME, {
            userName: USERNAME,
            realName: USERNAME,
            channels: ['#test123hngh'],
            autoConnect: false
        });
    }

}

module.exports = IRC;
