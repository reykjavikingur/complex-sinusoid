const Complex = require('complex');
const ArrayUtil = require('./array-util');

const BALANCE = 1;
const CROSS_FREQUENCY = 0;
const MIN_RESOLUTION = 48;
const NUM_ROWS = 10;

const template = `
<div class="table">
    <div class="controls">
        Cross Frequency: <input type="number" v-model="crossFrequency" step="1" min="0" max="100" />
    </div>
    <div class="row" v-for="row in table">
        <div class="cell" 
            v-for="cell in row" 
            :title="cell[0].frequency + ':' + cell[1].frequency"
            :style="{ width: (100 / row.length) + '%' }"
            >
            <fw-composite-sinusoid 
                :terms="cell" 
                :resolution="minResolution * Math.max(cell[0].frequency, cell[1].frequency)" 
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
                crossFrequency: CROSS_FREQUENCY,
                minResolution: MIN_RESOLUTION,
                numRows: NUM_ROWS,
                table: null
            };
        },

        mounted: function () {
            this.table = this.createTable();
        },

        watch: {

            balance: function (value) {
                this.updateTable();
            },

            crossFrequency: function (value) {
                this.updateTable();
            }

        },

        methods: {

            updateTable: function () {
                let table = this.createTable();
                ArrayUtil.copy(table, this.table);
            },

            createTable: function () {
                let f = this.numRows;
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
                let m1 = parseFloat(this.balance);
                let m2 = 1 / m1;
                terms.push(this.createTerm(f1, m1, 0));
                terms.push(this.createTerm(f2, m2, 0));
                let extra = parseInt(this.crossFrequency);
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
