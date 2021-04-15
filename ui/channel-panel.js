const blessed = require('blessed');

class ChannelPanel {

    constructor(screen, eventEmitter) {
        this.box = this.createBox();
        this.eventEmitter = eventEmitter;
        this.screen = screen;

        this.screen.append(this.box);
        this.screen.render();

        this.registerConnection()
        this.registerJoin();
    }

    registerConnection() {
        this.eventEmitter.addListener('connecting', (timestamp, host, nick) => {
            this.nick = nick;
        })
    }

    registerJoin() {
        this.eventEmitter.addListener('join', (channel, nick) => {
            if(this.nick == nick) {
                this.box.pushLine(`  ${channel}`);
                this.box.setScrollPerc(100);
                this.screen.render();
            }
        });
    }

    createBox() {
        return blessed.box({
            top: '0%',
            left: '0%',
            height: '100%',
            width: '15%',
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
}

module.exports = ChannelPanel;
