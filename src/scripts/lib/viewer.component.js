const Complex = require('complex');

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

        this.drawSinusoid(new Complex(1.5, 0), 64);

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

        drawComplex: function (c) {
            let point = this.convert(c);
            this.drawPoint(point);
        },

        drawSinusoid: function(coefficient, resolution) {
            let canvas = this.$refs.canvas;
            let context = canvas.getContext('2d');
            context.beginPath();

            let points = [];
            resolution = Math.round(resolution);
            let angleIncrement = TAU / resolution;
            for (let angle = 0; angle <= TAU; angle += angleIncrement) {
                let z = new Complex(0, angle).exp().multiply(coefficient);
                let point = this.convert(z);
                points.push(point);
            }

            let point = points.shift();
            context.moveTo(point.x, point.y);
            while (points.length > 0) {
                let point = points.shift();
                context.lineTo(point.x, point.y);
            }

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
            let scale = canvasRadius * 0.5;
            let x = scale * z.real + canvasRadius;
            let y = -scale * z.im + canvasRadius;
            return {x: x, y: y};
        }

    }

});

module.exports = Viewer;
