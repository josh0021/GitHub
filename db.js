var sqlite3 = require('sqlite3'),
    db = new sqlite3.Database('./database/blogs.sqlite3');

module.exports = exports = db;
