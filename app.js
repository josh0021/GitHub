var http = require('http'),
    router = require('./router'),
    db = require('./db'),
    view = require('./view'),
    fs = require('fs'),
    js = fs.readFileSync('./static/bundle.js');

// Add a route to the client-side JavaScript bundle
router.addRoute('/bundle.js', 'GET', function(req, res) {
  res.writeHead(200, {"Content-Type":"text/html"});
  res.end(js);
});

// Populating the router with the blogs resource
var blogs = require('./controllers/blogs');
// Add a route to redirect '/' to '/blogs'
router.addRoute('/', 'GET', blogs.redirect);
// Add the blogs resource
router.addResource('blogs', blogs);
// Add the autocomplete route
router.addRoute('/blogs/autocomplete/:token', 'GET', blogs.autocomplete);

// Add the reservation resource
router.addResource('reservation', require('./controllers/reservation'));
// add comments resource
router.addResource('comments', require('./controllers/comments'));
// Launching the server
new http.Server(router.route).listen(80);
