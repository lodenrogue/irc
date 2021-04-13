const blessed = require('blessed');
const ChannelPanel = require('./channel-panel');
const MainChatPanel = require('./main-chat-panel');
const UsersPanel = require('./users-panel');
const ChatInputPanel = require('./chat-input-panel');

class UIRenderer {

    constructor() {
        this.screen = this.createScreen();
    }

    start(eventEmitter) {
        new ChannelPanel(this.screen, eventEmitter);
        new MainChatPanel(this.screen, eventEmitter);
        new UsersPanel(this.screen, eventEmitter);
        new ChatInputPanel(this.screen, eventEmitter);
    }

    createScreen() {
        let screen = blessed.screen({
            smartCSR: true
        });

        screen.key(['escape', 'q', 'C-c'], function(ch, key) {
            return process.exit(0);
        });

        screen.title = 'IRC Client';
        return screen;
    }
}

module.exports = UIRenderer;
