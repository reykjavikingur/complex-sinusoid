const Complex = require('complex');
require('./composite-sinusoid.component');
require('./angle-input.component');
require('./number-input.component');
require('./complex-number-input.component');
require('./term-list-editor.component');

const template = `
<div class="app">
    <fw-composite-sinusoid 
        :terms="exampleTerms" 
        :resolution="256" 
        :canvas-size="200"
        :zoom-factor="0.3"
    ></fw-composite-sinusoid>
    <fw-term-list-editor v-model="exampleTerms"></fw-term-list-editor>
</div>
`;

function startEditor(selector) {

    return new Vue({
        el: selector,
        template: template,
        data: function () {
            return {
                exampleTerms: [
                    {
                        frequency: 1,
                        coefficient: Complex.fromPolar(1, 0)
                    }
                ]
            };
        }
    });

}

module.exports = startEditor;
