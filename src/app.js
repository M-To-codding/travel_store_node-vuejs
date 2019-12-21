const express = require('express');
const path = require('path');
const Vue = require('vue');
const renderer = require('vue-server-renderer');
const HTMLStream = require('vue-ssr-html-stream');
const bodyParser = require('body-parser');
const router = require('express').Router();


let template = require('fs').readFileSync(path.join(__dirname, './server/ui/admin/dist/index.ssr.html'), 'utf-8');
let clientManifest = require('./server/ui/admin/dist/vue-ssr-client-manifest.json');
let serverBundle = require('./server/ui/admin/dist/vue-ssr-server-bundle.json');

const server = express();

const bundleRenderer = renderer.createBundleRenderer(
    serverBundle,
    {
        runInNewContext: false,
        template,
        clientManifest,
        inject: false
    }
);

server.use('/dist', express.static(path.join(__dirname, '/ui/admin/dist')));

server.get('*', (req, res) => {

    const context = {url: req.path, title: 'Dashboard'};

    bundleRenderer.renderToString(context, (err, html)=>{
        res.end(html);
    })

})


const port = process.env.PORT || 8000;

server.listen(port, () => {
    console.log('Port: ', port);
})

