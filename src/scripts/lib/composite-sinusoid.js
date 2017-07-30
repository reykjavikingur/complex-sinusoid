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

class CompositeSinusoid {

    constructor() {
        this.resolution = 25;
        this.coefficients = [new Complex(1, 0)];
    }

    samples() {
        let sinusoid = new Sinusoid();
        sinusoid.resolution = this.resolution;
        let list = [];
        for (let index = 0; index < this.resolution; index++) {
            list.push(new Complex(0, 0));
        }
        for (let index in this.coefficients) {
            sinusoid.frequency = Number(index) + 1;
            sinusoid.coefficient = this.coefficients[index];
            let samples = sinusoid.samples();
            for (let sampleIndex in samples) {
                list[sampleIndex] = list[sampleIndex].add(samples[sampleIndex]);
            }
        }
        return list;
    }

}

module.exports = CompositeSinusoid;