const http = require('http');
const pg = require('pg');

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

            db.query('SELECT * FROM items', function (err, result) {

                if (err) {
                    throw err;
                }

                res.statusCode = 200;
                res.setHeader('Content-Type', 'appplication/json');
                res.end(JSON.stringify(result.rows));
            });
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
                //CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)
                db.query('INSERT INTO items (text, complete) values ($1, $2)', [body.text, body.complete], function (err, result) {

                    if (err) {
                        throw err;
                    }

                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'appplication/json');
                    res.end(JSON.stringify(result));
                });
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

const db = new pg.Client({
    user: 'postgres',
    host: 'postgres'
});

db.connect(function(error) {

    if (error) {

        throw error;
    }

    server.listen(port, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
});


process.on('SIGTERM', function() {
    db.close();
});
