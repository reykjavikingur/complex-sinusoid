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

        let theta1 = 0.1 * TAU, delta1 = TAU / 217;
        let theta2 = 0.2 * TAU, delta2 = TAU / 129;
        let theta3 = 0.3 * TAU, delta3 = TAU / 98;

        let animate = () => {
            requestAnimationFrame(animate);
            this.coefficients = [
                Complex.fromPolar(1, 0),
                Complex.fromPolar(1, theta1),
                Complex.fromPolar(1, theta2),
                Complex.fromPolar(1, theta3)
            ];
            theta1 += delta1;
            theta2 += delta2;
            theta3 += delta3;
        };
        animate();

    },

});

module.exports = Viewer;
