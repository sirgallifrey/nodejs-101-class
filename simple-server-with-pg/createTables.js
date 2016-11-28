'use strict';

const db = require('./db');

db.connect(function(err) {

    if (err) {
        throw err;
    }

    db.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)', function (err, result) {

        if (err) {
            throw err;
        }
        process.exit(0);
    });
})
