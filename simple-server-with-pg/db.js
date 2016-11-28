'use strict';

const pg = require('pg');

const client = new pg.Client({
    user: 'postgres',
    host: 'postgres'
});

// client.connect(function (err) {
//
//     if (err) {
//         throw err;
//     }
//
//     console.log('postgres connected');
//
// })

module.exports = client;
