const Complex = require('complex');

const template = `
<div class="table">
    <div class="row" v-for="row in table">
        <div class="cell" v-for="cell in row">
            <fw-composite-sinusoid 
                :terms="cell" 
                :resolution="256" 
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
                table: [
                    // first row
                    [
                        this.createTerms(1, 2),
                        this.createTerms(1, 3)
                    ]
                ]
            };
        },

        methods: {

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
