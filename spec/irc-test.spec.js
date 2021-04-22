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

    it('should publish connected messages', () => {
        let testServer = 'name.host.com';
        spyOn(eventEmitter, 'emit');

        app.start();
        client.emit('registered', { server: testServer });

        expect(eventEmitter.emit).toHaveBeenCalledWith(
            'connected',
            jasmine.any(String),
            testServer
        );
    });

    it('should publish motd messages', () => {
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

    it('should publish channel join message', () => {
        const testChannel = "#TEST_CHANNEL";
        const testNick = "TEST_NICK";

        eventEmitter.addListener('join', (channel, nick) => {
            expect(channel).toBe(testChannel);
            expect(nick).toBe(testNick);
        });

        spyOn(eventEmitter, 'emit');

        app.start();
        eventEmitter.emit('join-request', testChannel);
        client.emit('join', testChannel, testNick, {});

        expect(eventEmitter.emit).toHaveBeenCalledWith(
            'join',
            jasmine.any(String),
            jasmine.any(String));
    });

    function createClient() {
        let mockClient = new EventEmitter();
        mockClient.connect = () => {
            // No behavior
        };
        return mockClient;
    }

    function createMockRenderer() {
        return {
            start: () => {
                // No behavior
            }
        };
    }
});
