const CompositeSinusoid = require('./composite-sinusoid');
const Color = require('color');

const template = `
<div class="composite-sinusoid">
    <canvas ref="canvas"></canvas>
</div>
`;

const DEFAULT_RESOLUTION = 63;
const DEFAULT_CANVAS_SIZE = 256;
const DEFAULT_ZOOM_FACTOR = 0.6;

let component = Vue.component('fwCompositeSinusoid', {

    /**
     * terms : Array<{frequency: number, coefficient: Complex}>
     * resolution : number
     * canvasSize : number
     * zoomFactor : number
     */
    props: ['terms', 'resolution', 'canvasSize', 'zoomFactor'],

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

        receiveTerms: function (terms) {
            this.initializeCanvas(this.canvasSize || DEFAULT_CANVAS_SIZE);
            if (terms) {
                this.drawCompositeSinusoid(terms, this.resolution || DEFAULT_RESOLUTION);
            }
        },

        initializeCanvas: function (size) {
            let canvas = this.$refs.canvas;
            canvas.width = size;
            canvas.height = size;
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
            let hue = 0;
            let hueDelta = 360 / resolution;
            let color = this.createColor(hue);
            let canvas = this.$refs.canvas;
            let context = canvas.getContext('2d');
            for (let i = 0; i < points.length; i++) {
                let point = points[i];
                let nextPoint = points[(i + 1) % points.length];
                context.beginPath();
                context.moveTo(point.x, point.y);
                context.strokeStyle = color.rgb().string();
                context.lineTo(nextPoint.x, nextPoint.y);
                context.stroke();
                context.closePath();
                hue += hueDelta;
                color = this.createColor(hue);
            }
        },

        convert: function (z) {
            // complex number (0, 0) corresponds to center of canvas
            // center of canvas corresponds to complex number (0, 0)
            let zoomFactor = this.zoomFactor || DEFAULT_ZOOM_FACTOR;
            let canvas = this.$refs.canvas;
            let canvasRadius = Math.min(canvas.width, canvas.height) / 2;
            let scale = canvasRadius * zoomFactor;
            let x = scale * z.real + canvasRadius;
            let y = -scale * z.im + canvasRadius;
            return {x: x, y: y};
        },

        createColor: function (hue) {
            let color = Color({h: hue, s: 100, l: 50});
            let lum = color.luminosity();
            color = color.lighten(0.5 - lum * 0.9);
            return color;
        }

    },

});

module.exports = component;