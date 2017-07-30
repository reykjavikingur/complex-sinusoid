const Complex = require('complex');
const Sinusoid = require('./sinusoid');
const CompositeSinusoid = require('./composite-sinusoid');

const TAU = Math.PI * 2;

const template = `
<div class="viewer">
    <canvas ref="canvas"></canvas>
</div>
`;

const Viewer = Vue.component('fwViewer', {

    template: template,

    mounted: function () {
        this.initializeCanvas();

        //this.drawSinusoid(new Complex(1.5, 0), 9);

        this.drawCompositeSinusoid([
            Complex.fromPolar(1, 0),
            Complex.fromPolar(1, 0.125 * TAU),
            Complex.fromPolar(1, 0.8 * TAU)
        ], 63);

    },

    methods: {

        initializeCanvas: function () {
            let canvas = this.$refs.canvas;
            canvas.width = 256;
            canvas.height = 256;
            let context = canvas.getContext('2d');
            context.fillStyle = 'rgb(255, 255, 255)';
            context.fillRect(0, 0, canvas.width, canvas.height);
        },

        drawCompositeSinusoid: function (coefficients, resolution) {
            let sinusoid = new CompositeSinusoid();
            sinusoid.resolution = resolution;
            sinusoid.coefficients = coefficients;
            let samples = sinusoid.samples();
            let points = samples.map(sample => this.convert(sample));
            this.drawPath(points);
        },

        drawSinusoid: function (coefficient, resolution) {
            let sinusoid = new Sinusoid();
            sinusoid.coefficient = coefficient;
            sinusoid.resolution = resolution;
            sinusoid.frequency = 2;

            let samples = sinusoid.samples();
            let points = samples.map(sample => this.convert(sample));

            this.drawPath(points);
        },

        drawPath: function (points) {
            let canvas = this.$refs.canvas;
            let context = canvas.getContext('2d');
            context.beginPath();
            let firstPoint = points.shift();
            context.moveTo(firstPoint.x, firstPoint.y);
            while (points.length > 0) {
                let point = points.shift();
                context.lineTo(point.x, point.y);
            }
            context.lineTo(firstPoint.x, firstPoint.y);
            context.stroke();
        },

        drawPoint: function (point) {
            let context = this.$refs.canvas.getContext('2d');
            context.fillStyle = 'green';
            context.fillRect(point.x, point.y, 1, 1);
        },

        convert: function (z) {
            // complex number (0, 0) corresponds to center of canvas
            // center of canvas corresponds to complex number (0, 0)
            let canvas = this.$refs.canvas;
            let canvasRadius = Math.min(canvas.width, canvas.height) / 2;
            let scale = canvasRadius * 0.3;
            let x = scale * z.real + canvasRadius;
            let y = -scale * z.im + canvasRadius;
            return {x: x, y: y};
        }

    }

});

module.exports = Viewer;
