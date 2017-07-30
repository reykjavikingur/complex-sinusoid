const Complex = require('complex');
const Sinusoid = require('./sinusoid');

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