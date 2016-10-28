const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const clientConfig = require('./webpack.dev.config')
const nodeConfig = require('./webpack.node.config')
const express = require('express');
const pm2 = require('pm2');
const requestProxy = require('express-request-proxy');

const clientCompiler = webpack(clientConfig);
const serverCompiler = webpack(nodeConfig);

serverCompiler.watch({ // watch options:
    aggregateTimeout: 300, // wait so long for more changes
    poll: true // use polling instead of native watchers
        // pass a number to set the polling interval
}, (err, stats) => {
    console.log('serverCompiler completed!')

});

pm2.connect(true, function(err) {
    if (err) {
        console.error(err);
        process.exit(2);
    }

    pm2.start({
        script: './server/dist/server.bundle.js', // Script to be run
        watch: ['./server/dist']
    }, function(err, apps) {
        // pm2.disconnect(); // Disconnect from PM2
        if (err) throw err
    });
});

var app = new WebpackDevServer(clientCompiler, {
    contentBase: './dist',
    publicPath: '/static/',
    // proxy: {'/static': `http://localhost:${8889}/static`},
    proxy: {
        '/': `http://localhost:${8888}`
    },
    stats: {
        colors: true
    }
});

// Serve static resources
// app.use('/static', express.static('dist'));
// app.use('/*', requestProxy({
//     url: "http://127.0.0.1:8888"
// }))
app.listen(8889, 'localhost');
console.log("The App Server is running.")