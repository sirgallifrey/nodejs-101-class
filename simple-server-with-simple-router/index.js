const http = require('http');

const hostname = '127.0.0.1';

const port = 3000;

const router = function (method, url) {

    if (method === 'GET' && url === '/') {

        return function index (req, res) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Home, please visit foo\n');
        }
    }

    if (method === 'GET' && url === '/foo') {

        return function index (req, res) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('BAR!!!\n');
        }
    }

    return function index (req, res) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Page not found\n');
    }
}

const server = http.createServer((req, res) => {

    //lets see what is being requested
    console.log('[REQUEST] ' + req.method + ' : ' + req.url);

    router(req.method, req.url)(req, res);
});


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
