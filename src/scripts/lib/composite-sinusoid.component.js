const CompositeSinusoid = require('./composite-sinusoid');
const Color = require('color');

const template = `
<div class="composite-sinusoid">
    <canvas ref="canvas"></canvas>
</div>
`;

const DEFAULT_RESOLUTION = 63;

let component = Vue.component('fwCompositeSinusoid', {

    /**
     * terms : Array<{frequency: number, coefficient: Complex}>
     * resolution : number
     */
    props: ['terms', 'resolution'],

    template: template,

    mounted: function () {
        this.receiveTerms(this.terms);
    },

    watch: {
        terms: function (terms) {
            this.receiveTerms(terms);
        }
    },

    methods: {

        receiveTerms: function(terms) {
            this.initializeCanvas();
            if (terms) {
                this.drawCompositeSinusoid(terms, this.resolution || DEFAULT_RESOLUTION);
            }
        },

        initializeCanvas: function () {
            let canvas = this.$refs.canvas;
            canvas.width = 256;
            canvas.height = 256;
            let context = canvas.getContext('2d');
            context.fillStyle = 'rgb(255, 255, 255)';
            context.fillRect(0, 0, canvas.width, canvas.height);
        },

        drawCompositeSinusoid: function (terms, resolution) {
            let sinusoid = new CompositeSinusoid();
            sinusoid.resolution = resolution;
            sinusoid.terms = terms;
            let samples = sinusoid.samples();
            let points = samples.map(sample => this.convert(sample));
            this.drawPath(points, resolution);
        },

        drawPath: function (points, resolution) {
            let color = Color({h: 0, s: 100, l:50});
            let canvas = this.$refs.canvas;
            let context = canvas.getContext('2d');
            for (let i = 0; i < points.length; i++) {
                let point = points[i];
                let nextPoint = points[(i + 1) % points.length];
                context.beginPath();
                context.moveTo(point.x, point.y);
                context.strokeStyle = color.rgb().string();
                //console.log('drawing color', context.strokeStyle);
                context.lineTo(nextPoint.x, nextPoint.y);
                context.stroke();
                context.closePath();
                color = color.rotate(360 / resolution);
            }
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