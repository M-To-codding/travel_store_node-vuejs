const express = require('express');
const path = require('path');
const renderer = require('vue-server-renderer');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// var multer = require('multer');
// var upload = multer();


const db = require('./server/config/db')(mongoose);
require('./server/scripts/create-admin')(mongoose);


const server = express();

server.use(bodyParser.json());

server.use(express.static(path.join(__dirname, './server/ui/admin/dist/')));
server.use('/static', express.static(path.join(__dirname, './server/ui/admin/dist/')));

// Enables to load files from public folder.
// Example:
//   File is located in 'public/media/images/img1.jpg'.
//   To load this go to URL 'http://<host>:<port>/media/images/img1.jpg'
server.use(express.static(path.join(__dirname, './server/public/')));

server.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
})


let template = require('fs').readFileSync(
    path.join(__dirname, './server/ui/admin/dist/index.ssr.html'),
    'utf-8')

let clientManifest = require('./server/ui/admin/dist/vue-ssr-client-manifest.json');
let serverBundle = require('./server/ui/admin/dist/vue-ssr-server-bundle.json');

const bundleRenderer = renderer.createBundleRenderer(
    serverBundle,
    {
        runInNewContext: false,
        template,
        clientManifest,
        inject: false
    }
);

const router = require('./server/api-routes/router')(server);

server.use('/api/v1/admin', router);
// server.use('/api/v1/client', router);

server.get('/api/v1/admin/*', (req, res) => {

    const context = {url: req.url, title: 'Admin panel'};
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    })

    bundleRenderer.renderToString(context, (err, html)=>{
        res.end(html);
    })

})

const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log('Port: ', port);
})

