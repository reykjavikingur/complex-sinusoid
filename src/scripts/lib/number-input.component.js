const template = `
<div class="number-input">
    <input type="number" v-model="numberString" step="0.1" min="0" max="1000000"/>
</div>
`;

const THRESHOLD = 0.000001;

function differ(x, y) {
    return Math.abs(x - y) > THRESHOLD;
}

const component = Vue.component('fwNumberInput', {
    props: ['value'],
    template: template,
    data: function () {
        return {
            numberString: String(this.value)
        };
    },
    watch: {
        numberString: function (numberString) {
            let value = parseFloat(numberString);
            if (differ(value, this.value)) {
                this.$emit('input', value);
            }
        },
        value: function (value, oldValue) {
            if (differ(value, oldValue)) {
                this.numberString = String(value);
            }
        }
    }
});

module.exports = component;
