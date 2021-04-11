// box.focus();
// screen.render();

// //client.addListener('raw', (message) => {
//     //if(message.command != 'PONG') {
//         //console.log(message);
//     //}
// //});
// //

// client.addListener('join', (channel, nick, message) => {
//     box.pushLine(`Joined: ${channel}`);
//     box.setScrollPerc(100);
//     screen.render();
// });

const IRC = require('./irc');
new IRC().start();
