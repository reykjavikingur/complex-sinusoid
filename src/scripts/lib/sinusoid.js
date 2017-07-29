const Complex = require('complex');

const TAU = Math.PI * 2;

class Sinusoid {

    constructor() {
        this.coefficient = new Complex(1, 0);
        this.frequency = 1;
        this.resolution = 25;
    }

    samples() {
        let list = [];
        let resolution = Math.max(4, Math.round(this.resolution));
        let angleIncrement = TAU / resolution;
        for (let angle = 0; angle <= TAU; angle += angleIncrement) {
            let power = new Complex(0, angle).multiply(this.frequency);
            let point = power.exp().multiply(this.coefficient);
            list.push(point);
        }
        return list;
    }

}

module.exports = Sinusoid;

