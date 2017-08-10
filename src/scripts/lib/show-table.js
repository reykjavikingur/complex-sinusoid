const Complex = require('complex');

const template = `
<div class="table">
    <div class="row" v-for="row in table">
        <div class="cell" v-for="cell in row">
            <fw-composite-sinusoid 
                :terms="cell" 
                :resolution="128" 
                :canvas-size="100"
                :zoom-factor="0.4"
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
                table: this.createTable(10)
            };
        },

        methods: {

            createTable: function(f) {
                let table = [];
                for (let k = 1; k <= f; k++) {
                    let row = this.createRow(k, f);
                    table.push(row);
                }
                return table;
            },

            createRow: function(f1, f2max) {
                let row = [];
                for (let f2 = 1; f2 <= f2max; f2++) {
                    let cell = this.createTerms(f1, f2);
                    row.push(cell);
                }
                return row;
            },

            createTerms: function(f1, f2){
                return [
                    {
                        frequency: f1,
                        coefficient: Complex.fromPolar(1, 0)
                    },
                    {
                        frequency: f2,
                        coefficient: Complex.fromPolar(1, 0)
                    }
                ];
            }

        }

    });
}

module.exports = showTable;
