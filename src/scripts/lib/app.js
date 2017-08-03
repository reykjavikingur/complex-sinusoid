const Complex = require('complex');
require('./viewer.component');
require('./composite-sinusoid.component');
require('./angle-input.component');
require('./number-input.component');
require('./complex-number-input.component');

const template = `
<div class="app">
<fw-viewer></fw-viewer>
<fw-complex-number-input v-model="exampleComplex"></fw-complex-number-input>
<span>exampleComplex = {{exampleComplex}}</span>
</div>
`;

let app = new Vue({
    el: 'main',
    template: template,
    data: function () {
        return {
            exampleComplex: Complex.fromPolar(1, 0)
        };
    }
});

module.exports = app;
