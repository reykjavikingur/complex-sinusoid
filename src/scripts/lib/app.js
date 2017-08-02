require('./viewer.component');
require('./composite-sinusoid.component');
require('./angle-input.component');

const template = `
<div class="app">
<fw-viewer></fw-viewer>
<fw-angle-input v-model="exampleAngle"></fw-angle-input>
<span>exampleAngle = {{exampleAngle}}</span>
</div>
`;

let app = new Vue({
    el: 'main',
    template: template,
    data: function() {
        return {
            exampleAngle: 0
        };
    }
});

module.exports = app;
