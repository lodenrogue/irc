class Timestamp {

    constructor() {
        this.date = new Date();
    }

    toString() {
        let hour = this.getHours();
        let min = this.getMinutes();
        let sec = this.getSeconds();

        return `${hour}:${min}:${sec}`;
    }

    getHours() {
        let hour = this.date.getHours();
        return this.toMinDigits(hour, 2);
    }

    getMinutes() {
        let min = this.date.getMinutes();
        return this.toMinDigits(min, 2);
    }

    getSeconds() {
        let sec = this.date.getSeconds();
        return this.toMinDigits(sec, 2);
    }

    toMinDigits(time, size) {
        return time.toLocaleString('en-US', {
            minimumIntegerDigits: 2
        });
    }
}

module.exports = Timestamp;
