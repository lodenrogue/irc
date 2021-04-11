const blessed = require('blessed');
const MainChatPanel = require('./main-chat-panel');

class UIRenderer {
	
	constructor() {
		this.screen = this.createScreen()
	}

	start(eventEmitter) {
		new MainChatPanel(this.screen, eventEmitter);
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