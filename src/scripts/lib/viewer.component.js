const Complex = require('complex');

const TAU = Math.PI * 2;

const template = `
<div class="viewer">
    <fw-composite-sinusoid :coefficients="coefficients"></fw-composite-sinusoid>
</div>
`;

const Viewer = Vue.component('fwViewer', {

    template: template,

    data: function () {
        return {
            coefficients: null
        }
    },

    mounted: function () {

        this.coefficients = [
            Complex.fromPolar(1, 0),
            Complex.fromPolar(1, 0.125 * TAU),
            Complex.fromPolar(1, 0.8 * TAU)
        ];

    },

});

module.exports = Viewer;
