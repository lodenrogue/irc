const blessed = require('blessed');

class MainChatPanel {

	constructor(screen, eventEmitter) {
		this.box = this.createBox();
		screen.append(this.box);
		screen.render();

		eventEmitter.addListener('motd', (timestamp, motd) => {
			this.displayMotd(timestamp, motd, this.box, screen);
		});
	}

	createBox() {
		return blessed.box({
		    top: 'center',
		    left: 'center',
		    height: '100%',
		    width: '100%',
		    content: 'Initial content',
		    tags: true,
		    border: {
		        type: 'line'
		    },
		    style: {
		        fg: 'white',
		        bg: 'black',
		        border: {
		            fg: '#f0f0f0'
		        }
		    },
		    scrollable: true,
		    alwaysScroll: true,
		    mouse: true
		});
	}

	displayMotd(timestamp, motd, box, screen) {
		motd.split('\n')
			.map(line => this.formatLine(timestamp, line))
			.forEach(line => this.displayLine(line, box, screen));
	}

	formatLine(timestamp, line) {
		let color = '{#B48EAD-fg}';
		let endColor = '{/}';
		return `[${timestamp}]\t\t${color}*${endColor}|${color}${line}${endColor}`;
	}

	displayLine(line, box, screen) {
		box.pushLine(line);
		box.setScrollPerc(100); 
		screen.render();
	}
	
}

module.exports = MainChatPanel;