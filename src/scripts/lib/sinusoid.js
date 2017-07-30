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
        for (let increment = 0; increment < resolution; increment++) {
            let angle = TAU * increment / resolution;
            let power = new Complex(0, angle).multiply(this.frequency);
            let point = power.exp().multiply(this.coefficient);
            list.push(point);
        }
        return list;
    }

}

module.exports = Sinusoid;

