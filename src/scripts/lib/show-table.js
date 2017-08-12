const Complex = require('complex');
const ArrayUtil = require('./array-util');

const BALANCE = 1;
const CROSS_FREQUENCY = 0;
const MIN_RESOLUTION = 48;
const NUM_ROWS = 10;
const ROW_START = 1;
const ROW_STEP = 1;
const NUM_COLS = 10;
const COL_START = 1;
const COL_STEP = 1;

const template = `
<div class="table">
    <div class="controls">
        <div>Cross Frequency: <input type="number" v-model="crossFrequency" step="1" min="0" max="100" /></div>
        <div>Balance: <input type="number" v-model="balance" step="0.1" min="0" max="100" /></div>
        <div>
            Row 
            start <input type="number" v-model="rowStart" min="1" step="1" max="10000" /> 
            step <input type="number" v-model="rowStep" min="0" step="1" max="10000" />
        </div>
        <div>
            Column
            start <input type="number" v-model="colStart" min="1" step="1" max="10000" /> 
            step <input type="number" v-model="colStep" min="0" step="1" max="10000" />
        </div>
    </div>
    <div class="row" v-for="row in table">
        <div class="cell" 
            v-for="cell in row" 
            :title="cell[0].frequency + ':' + cell[1].frequency"
            :style="{ width: (100 / row.length) + '%' }"
            >
            <fw-composite-sinusoid 
                :terms="cell" 
                :resolution="minResolution * maxFrequency(cell)" 
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
                numCols: NUM_COLS,
                table: null,
                rowStart: ROW_START,
                rowStep: ROW_STEP,
                colStart: COL_START,
                colStep: COL_STEP
            };
        },

        mounted: function () {
            this.table = this.createTable();
        },

        watch: {

            balance: function () {
                this.updateTable();
            },
            crossFrequency: function () {
                this.updateTable();
            },
            rowStart: function () {
                this.updateTable();
            },
            rowStep: function () {
                this.updateTable();
            },
            colStart: function () {
                this.updateTable();
            },
            colStep: function () {
                this.updateTable();
            }

        },

        methods: {

            updateTable: function () {
                let table = this.createTable();
                ArrayUtil.copy(table, this.table);
            },

            createTable: function () {
                let rowStart = parseFloat(this.rowStart);
                let rowStep = parseFloat(this.rowStep);
                let table = [];
                for (let i = 0; i < this.numRows; i++) {
                    let rowIndex = rowStart + i * rowStep;
                    let row = this.createRow(rowIndex);
                    table.push(row);
                }
                return table;
            },

            createRow: function (rowIndex) {
                let colStart = parseFloat(this.colStart);
                let colStep = parseFloat(this.colStep);
                let row = [];
                for (let i = 0; i < this.numRows; i++) {
                    let colIndex = colStart + i * colStep;
                    let cell = this.createTerms(rowIndex, colIndex);
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
            },

            maxFrequency: function (cell) {
                let frequencies = cell.map(term => term.frequency);
                return Math.max.apply(Math, frequencies);
            }

        }

    });
}

module.exports = showTable;
