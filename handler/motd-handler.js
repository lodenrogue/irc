class MOTDHandler {

	constructor(client, eventEmitter) {
		
		client.addListener('motd', (motd) => {
			let timestamp = this.getTimestamp();
			eventEmitter.emit('motd', timestamp, motd);
		});
	}

	getTimestamp() {
		let date = new Date();
		let hour = date.getHours();
		let min = date.getMinutes();
		let sec = date.getSeconds();

		return `${hour}:${min}:${sec}`;
	}

}

module.exports = MOTDHandler;

