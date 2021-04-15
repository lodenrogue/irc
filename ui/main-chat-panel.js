const blessed = require('blessed');

class MainChatPanel {

    constructor(screen, eventEmitter) {
        this.box = this.createBox();
        this.eventEmitter = eventEmitter;
        this.screen = screen;

        this.screen.append(this.box);
        this.screen.render();

        this.registerConnection();
        this.registerMotd();
    }

    createBox() {
        return blessed.box({
            top: '0%',
            left: '15%',
            height: '93%',
            width: '70%',
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

    registerConnection() {
        this.eventEmitter.addListener('connecting', (timestamp, host, nick) => {
            this.displayConnecting(timestamp, host);
        });

        this.eventEmitter.addListener('connected', (timestamp, host) => {
            this.displayConnected(timestamp, host);
        });
    }

    registerMotd() {
        this.eventEmitter.addListener('motd', (timestamp, motd) => {
            this.displayMotd(timestamp, motd);
        });
    }

    displayConnecting(timestamp, host) {
        let color = this.getSystemInfoColor();
        let prefix = `${color}*{/}`;
        let message = `Looking up ${color}${host}{/}`;
        this.displayLine(timestamp, prefix, message);
    }

    displayConnected(timestamp, host) {
        let color = this.getSystemInfoColor();
        let sysInfoPrefix = this.getSystemInfoPrefix();
        let prefix = `${color}${sysInfoPrefix}{/}`;
        let message = `Connected to ${color}${host}{/}`;

        this.displayLine(timestamp, prefix, message);
    }

    displayMotd(timestamp, motd) {
        let color = this.getSystemInfoColor();
        let sysInfoPrefix = this.getSystemInfoPrefix();
        let prefix = `${color}${sysInfoPrefix}{/}`;

        motd.split('\n')
            .map(line => `${color}${line}{/}`)
            .forEach(line => this.displayLine(timestamp, prefix, line));
    }

    displayLine(timestamp, prefix = ' ', message) {
        let line = `[${timestamp}]\t\t${prefix}|${message}`;
        this.box.pushLine(line);
        this.box.setScrollPerc(100);
        this.screen.render();
    }

    getSystemInfoColor() {
        return '{#B48EAD-fg}';
    }

    getSystemInfoPrefix() {
        return '*';
    }
}

module.exports = MainChatPanel;
