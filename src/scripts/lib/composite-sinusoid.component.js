const CompositeSinusoid = require('./composite-sinusoid');

const template = `
<div class="composite-sinusoid">
    <canvas ref="canvas"></canvas>
</div>
`;

let component = Vue.component('fwCompositeSinusoid', {

    props: ['coefficients'],

    template: template,

    mounted: function () {
        this.initializeCanvas();
    },

    watch: {
        coefficients: function (coefficients) {
            this.initializeCanvas();
            if (coefficients) {
                this.drawCompositeSinusoid(coefficients, 63);
            }
        }
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

    },

});

module.exports = component;