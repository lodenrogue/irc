const blessed = require('blessed');

class ChatInputPanel {

    constructor(screen, eventEmitter) {
        this.input = this.createInput();
        this.eventEmitter = eventEmitter;
        this.screen = screen;

        this.screen.append(this.input);
        this.input.focus();
        this.screen.render();
    }

    createInput() {
        return blessed.textbox({
            top: '93%',
            left: '15%',
            height: 3,
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
            mouse: true,
            inputOnFocus: true
        });
    }

}

module.exports = ChatInputPanel;
