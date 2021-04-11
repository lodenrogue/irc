class Timestamp {

    constructor() {
        this.date = new Date();
    }

    toString() {
        let hour = this.date.getHours();
        let min = this.getMinutes();
        let sec = this.date.getSeconds();

        return `${hour}:${min}:${sec}`;
    }

    getMinutes() {
        let min = this.date.getMinutes();
        return min.toLocaleString('en-US', {
            minimumIntegerDigits: 2
        });
    }
}

module.exports = Timestamp;
