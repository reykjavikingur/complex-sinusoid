const Complex = require('complex');

const BALANCE = 1;
const THIRD_FREQUENCY = 0;

const template = `
<div class="table">
    <div v-if="crossFrequency">cross frequency: {{crossFrequency}}</div>
    <div class="row" v-for="row in table">
        <div class="cell" 
            v-for="cell in row" 
            :title="cell[0].frequency + ':' + cell[1].frequency"
            :style="{ width: (100 / row.length) + '%' }"
            >
            <fw-composite-sinusoid 
                :terms="cell" 
                :resolution="128" 
                :canvas-size="100"
                :zoom-factor="0.85 / cell.length"
            ></fw-composite-sinusoid>
        </div>
    </div>
</div>
`;

function showTable(selector) {

    return new Vue({

        el: selector,

        template: template,

        data: function () {
            return {
                balance: BALANCE,
                crossFrequency: THIRD_FREQUENCY,
                table: null
            };
        },

        mounted: function() {
            this.table = this.createTable(10);
        },

        methods: {

            createTable: function (f) {
                let table = [];
                for (let k = 1; k <= f; k++) {
                    let row = this.createRow(k, f);
                    table.push(row);
                }
                return table;
            },

            createRow: function (f1, f2max) {
                let row = [];
                for (let f2 = 1; f2 <= f2max; f2++) {
                    let cell = this.createTerms(f1, f2);
                    row.push(cell);
                }
                return row;
            },

            createTerms: function (f1, f2) {
                let terms = [];
                let m1 = this.balance;
                let m2 = 1 / m1;
                terms.push(this.createTerm(f1, m1, 0));
                terms.push(this.createTerm(f2, m2, 0));
                let extra = this.crossFrequency;
                if (extra) {
                    terms.push(this.createTerm(extra, 1, 0));
                }
                return terms;
            },

            createTerm: function (f, mag, angle) {
                return {
                    frequency: f,
                    coefficient: Complex.fromPolar(mag, angle)
                };
            }

        }

    });
}

module.exports = showTable;
