const Complex = require('complex');
require('./viewer.component');
require('./composite-sinusoid.component');
require('./angle-input.component');
require('./number-input.component');
require('./complex-number-input.component');
require('./term-list-editor.component');

const template = `
<div class="app">
<fw-composite-sinusoid :terms="exampleTerms" :resolution="256"></fw-composite-sinusoid>
<fw-term-list-editor v-model="exampleTerms"></fw-term-list-editor>
</div>
`;

let app = new Vue({
    el: 'main',
    template: template,
    data: function () {
        return {
            exampleTerms: []
        };
    }
});

module.exports = app;
