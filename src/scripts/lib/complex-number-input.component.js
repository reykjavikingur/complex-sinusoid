const Complex = require('complex');

const template = `
<div class="complex-number-input">
    <fw-angle-input :value="angle" @input="updateAngle"></fw-angle-input>
    <fw-number-input :value="magnitude" @input="updateMagnitude"/>
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
        return {};
    },

    computed: {
        angle: function () {
            return this.value ? this.value.angle() : 0;
        },
        magnitude: function () {
            return this.value ? this.value.magnitude() : 0;
        }
    },

    methods: {
        updateAngle: function (angle) {
            this.update(this.magnitude, angle);
        },
        updateMagnitude: function (magnitude) {
            this.update(magnitude, this.angle);
        },
        update: function (magnitude, angle) {
            let newValue = Complex.fromPolar(magnitude, angle);
            if (differ(newValue.magnitude(), this.magnitude) || differ(newValue.angle(), this.angle)) {
                this.$emit('input', newValue);
            }
        }
    }
});

module.exports = component;
