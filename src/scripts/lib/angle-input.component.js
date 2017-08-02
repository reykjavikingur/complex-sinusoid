const template = `
<div class="angle-input">
    <canvas ref="canvas" 
        v-on:click="click"
        v-on:mousedown="down"
        v-on:mouseup="up"
        v-on:mouseenter="enter"
        v-on:mouseleave="leave"
        v-on:mousemove="move"
    ></canvas>
</div>
`;

let RADIUS = 60;
let PADDING = 4;

let component = Vue.component('fwAngleInput', {

    props: ['value'],

    template: template,

    mounted: function () {
        let canvas = this.$refs.canvas;
        canvas.width = RADIUS * 2 + PADDING;
        canvas.height = RADIUS * 2 + PADDING;
        this.drawAngle();
    },

    watch: {
        value: function (value) {
            this.drawAngle();
        }
    },

    data: function () {
        return {
            isDown: false
        };
    },

    methods: {

        click: function (event) {
            let canvas = this.$refs.canvas;
            let center = {
                x: RADIUS + 0.5 * PADDING,
                y: RADIUS + 0.5 * PADDING
            };
            let rect = canvas.getBoundingClientRect();
            let targetPoint = {
                x: event.clientX - rect.left - center.x,
                y: event.clientY - rect.top - center.y
            };
            let newValue = Math.atan2(-targetPoint.y, targetPoint.x);
            this.$emit('input', newValue);
        },

        down: function (event) {
            this.isDown = true;
        },

        up: function (event) {
            this.isDown = false;
        },

        move: function (event) {
            if (this.isDown) {
                this.click(event);
            }
        },

        enter: function (event) {

        },

        leave: function (event) {
            this.isDown = false;
        },

        drawAngle: function () {
            let canvas = this.$refs.canvas;
            let context = canvas.getContext('2d');

            context.fillStyle = 'white';
            context.fillRect(0, 0, canvas.width, canvas.height);
            let center = {
                x: RADIUS + 0.5 * PADDING,
                y: RADIUS + 0.5 * PADDING
            };
            context.strokeStyle = 'blue';
            context.beginPath();
            context.arc(center.x, center.y, RADIUS, 0, Math.PI * 2);
            context.stroke();

            let end = {
                x: center.x + RADIUS * Math.cos(this.value),
                y: center.y - RADIUS * Math.sin(this.value)
            };
            context.strokeStyle = 'red';
            context.beginPath();
            context.moveTo(center.x, center.y);
            context.lineTo(end.x, end.y);
            context.stroke();
        }

    }

});

module.exports = component;
