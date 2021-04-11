describe('IRC', function() {
    const IRC = require('../irc');
    var EventEmitter = require('events').EventEmitter;

    let app;
    let client;
    let eventEmitter;

    beforeEach(function() {
        client = createClient();
        eventEmitter = new EventEmitter();

        let renderer = createMockRenderer();
        app = new IRC(client, eventEmitter, renderer);
    });

    it('should prepend date to motd messages', function() {
        let testMotd = 'TEST MOTD';

        eventEmitter.addListener('motd', (timestamp, motd) => {
            let date = new Date();
            let hour = date.getHours();
            let min = date.getMinutes().toLocaleString('en-US', {
                minimumIntegerDigits: 2
            });

            expect(timestamp.startsWith(`${hour}:${min}`)).toBe(true);
            expect(motd).toEqual(testMotd);
        });

        spyOn(eventEmitter, 'emit');

        app.start();
        client.emit('motd', testMotd);

        expect(eventEmitter.emit).toHaveBeenCalledWith(
            'motd',
            jasmine.any(String),
            jasmine.any(String));
    });

    function createClient() {
        let client = new EventEmitter();
        client.connect = function() {};
        return client;
    }

    function createMockRenderer() {
        return {
            start: function() {}
        };
    }
});
