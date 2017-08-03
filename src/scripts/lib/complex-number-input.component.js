const Complex = require('complex');

const template = `
<div class="complex-number-input">
    <fw-angle-input v-model="angle"></fw-angle-input>
    <fw-number-input v-model="magnitude"/>
</div>
`;

const THRESHOLD = 0.000001;

function differ(x, y) {
    return isNaN(x) || isNaN(y) || Math.abs(x - y) > THRESHOLD;
}

const component = Vue.component('fwComplexNumberInput', {
    props: ['value'],

    template: template,

    data: function () {
        return {
            angle: this.value ? this.value.angle() : 0,
            magnitude: this.value ? this.value.magnitude() : 0
        };
    },

    watch: {
        value: function (value) {
            if (value) {
                this.angle = value.angle();
                this.magnitude = value.magnitude();
            }
        },
        angle: function (angle) {
            this.update(this.magnitude, angle);
        },
        magnitude: function (magnitude) {
            this.update(magnitude, this.angle);
        }
    },

    methods: {
        update: function (magnitude, angle) {
            if (differ(magnitude, this.value.magnitude()) || differ(angle, this.value.angle())) {
                let newValue = Complex.fromPolar(magnitude, angle);
                this.$emit('input', newValue);
            }
        }
    }
});

module.exports = component;
