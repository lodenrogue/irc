const blessed = require('blessed');

class UsersPanel {

    constructor(screen, eventEmitter) {
        this.box = this.createBox();
        this.eventEmitter = eventEmitter;
        this.screen = screen;

        this.screen.append(this.box);
        this.screen.render();
    }

    createBox() {
        return blessed.box({
            top: '0%',
            left: '85%',
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

module.exports = UsersPanel;
