require('./viewer.component');

const template = `
<fw-viewer></fw-viewer>
`;

let app = new Vue({
    el: 'main',
    template: template
});

module.exports = app;
