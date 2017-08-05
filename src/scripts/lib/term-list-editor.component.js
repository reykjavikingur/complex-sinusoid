const Complex = require('complex');

const template = `
<div class="term-list-editor">
    
    <h2>Terms</h2>
    <ul class="term-list">
        <li v-for="term in terms">
            <div class="term" :class="{selected: term === selectedTerm}"
                @click="selectTerm(term)"
            >
                {{term.frequency}}.
                {{term.coefficient}}
            </div>
        </li>
    </ul>
    <input class="frequency-input" type="number" v-model="frequency" min="0" step="1"/>
    <button @click="add" v-bind:disabled="!canAdd">New</button>
    
    <div class="term-editor" v-if="hasSelectedTerm">
        <h2>Term {{selectedFrequency}}</h2>
        <fw-complex-number-input :value="selectedCoefficient" @input="updateCoefficient"></fw-complex-number-input>
    </div>
</div>
`;

const component = Vue.component('fwTermListEditor', {

    props: ['value'],

    template: template,

    data: function () {
        return {
            frequency: 0,
            coefficient: null,
            terms: [],
            selectedTerm: null
        };
    },

    computed: {

        canAdd: function () {
            let frequency = parseInt(this.frequency);
            let exists = Boolean(frequency);
            let found = (this.terms.findIndex(term => term.frequency === frequency) >= 0);
            return exists && !found;
        },

        selectedFrequency: function () {
            return this.selectedTerm ? this.selectedTerm.frequency : '';
        },

        selectedCoefficient: function () {
            return this.selectedTerm ? this.selectedTerm.coefficient : null;
        },

        hasSelectedTerm: function () {
            return Boolean(this.selectedTerm);
        }

    },

    methods: {

        add: function () {
            let frequency = parseInt(this.frequency);
            this.frequency = '';
            let term = {
                frequency: frequency,
                coefficient: Complex.fromPolar(0, 0)
            };
            this.terms.push(term);
            this.$emit('input', this.terms);
            this.selectedTerm = term;
        },

        updateCoefficient: function (coefficient) {
            this.selectedTerm.coefficient = coefficient;
            this.$emit('input', this.terms);
        },

        selectTerm: function (term) {
            this.selectedTerm = term;
        }

    }

});

module.exports = component;
