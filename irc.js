const irc = require('irc-upd');
const EventEmitter = require('events').EventEmitter;
const Timestamp = require('./util/timestamp');

const EventHandler = require('./handler/event-handler');
const UIRenderer = require('./ui/ui-renderer');

const HOST = 'irc.freenode.net';
const USERNAME = 'test4frh6';

class IRC {
    constructor(client = this.createClient(),
                eventEmitter = new EventEmitter(),
                renderer = new UIRenderer()) {

        this.client = client;
        this.eventEmitter = eventEmitter;
        this.eventHandler = new EventHandler(this.client, this.eventEmitter);
        this.renderer = renderer;
    }

    start() {
        this.eventHandler.start();
        this.renderer.start(this.eventEmitter);

        this.eventEmitter.emit(
            'connecting',
            new Timestamp().toString(),
            HOST,
            USERNAME);

        this.client.connect();
    }

    createClient() {
        return new irc.Client(HOST, USERNAME, {
            userName: USERNAME,
            realName: USERNAME,
            channels: ['#test123hngh', '#test123hngi'],
            autoConnect: false
        });
    }
}

module.exports = IRC;
