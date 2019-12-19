const express = require('express');
const server = express();
const Vue = require('vue');
const renderer = require('vue-server-renderer');
const HTMLStream = require('vue-ssr-html-stream');
const bodyParser = require('body-parser');
const router = require('express').Router();


// require('./server/api-routes/router');

server.use(bodyParser.json());

let template = require('fs').readFileSync('./src/server/ui/admin/dist/index.ssr.html', 'utf-8')
let clientManifest = require('./server/ui/admin/dist/vue-ssr-client-manifest.json')

const bundleRenderer = renderer.createBundleRenderer(
    require('./server/ui/admin/dist/vue-ssr-server-bundle.json'),
    {
        runInNewContext: false,
        template,
        clientManifest
    }
)

server.use('/server/ui/admin/dist', express.static('dist'));

server.get('*', (req, res) => {

    const context = {url: req.path, title: 'Dashboard'}

    bundleRenderer
        .renderToStream(context)
        .pipe(new HTMLStream({context, template}))
        .pipe(res);

    // console.log(res)

    bundleRenderer.renderToString(context, (err, html) => {
        console.log(html)
    //     res.end(html)
    })

    // res.status(200).end();
})


const port = process.env.PORT || 8000;

server.listen(port, () => {
    console.log('Port: ', port);
})

