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
        <button @click="remove">Remove</button>
    </div>
</div>
`;

const component = Vue.component('fwTermListEditor', {

    /**
     * value : Array<{frequency: number, coefficient: Complex}>
     */
    props: ['value'],

    template: template,

    data: function () {
        return {
            frequency: 0,
            coefficient: null,
            terms: this.value || [],
            selectedFrequency: 0
        };
    },

    computed: {

        canAdd: function () {
            let frequency = parseInt(this.frequency);
            let exists = Boolean(frequency);
            let found = (this.terms.findIndex(term => term.frequency === frequency) >= 0);
            return exists && !found;
        },

        selectedTerm: function () {
            return this.terms.find(term => {
                return term.frequency === this.selectedFrequency;
            });
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
            this.selectedFrequency = term.frequency;
            this.updateTerms();
        },

        remove: function () {
            let i = this.terms.indexOf(this.selectedTerm);
            if (i >= 0) {
                this.terms.splice(i, 1);
            }
            this.selectedFrequency = 0;
            this.updateTerms();
        },

        updateCoefficient: function (coefficient) {
            this.selectedTerm.coefficient = coefficient;
            this.updateTerms();
        },

        selectTerm: function (term) {
            this.selectedFrequency = term.frequency;
        },

        updateTerms: function () {
            this.terms = this.terms.map(term => {
                return {
                    frequency: term.frequency,
                    coefficient: new Complex(term.coefficient.real, term.coefficient.im)
                }
            });
            this.$emit('input', this.terms);
        }

    }

});

module.exports = component;
