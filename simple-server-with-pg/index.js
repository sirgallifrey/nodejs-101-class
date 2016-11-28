const http = require('http');
const db = require('./db');
const qs = require('querystring');

const hostname = '127.0.0.1';

const port = 3000;

const router = function (method, url) {

    if (method === 'GET' && url === '/') {

        return function index (req, res) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Home, please visit /items\n');
        }
    }

    if (method === 'GET' && url === '/items') {

        return function index (req, res) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('BAR!!!\n');
        }
    }


    if (method === 'POST' && url === '/items') {

        return function index (req, res) {

            //lets make room for our data
            let body = '';

            //set the expected encodig
            req.setEncoding('utf8');

            //here we are going to read every bit of data
            req.on('data', function(chunk) {
                body += chunk;
            });

            //when all data is here we are going to do our logic
            req.on('end', function() {

                //lets parrse it to json to make it more easy to work with
                body = JSON.parse(body);

                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.end(JSON.stringify(body));
            });

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


server.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

process.on('SIGTERM', function() {
    db.close();
});
