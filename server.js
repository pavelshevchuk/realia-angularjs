var expressIO = require('express.io'),
    serveStatic = require('serve-static');

var app = expressIO();

app.use(expressIO.cookieParser());
app.use(expressIO.session({secret: 'monkey'}));

app.http().io();
app.listen(8000);

// Session is automatically setup on initial request.
app.get('/', function(req, res) {
    req.session.loginDate = new Date().toString();
    res.sendfile(__dirname + '/build/index.html');
});
app.use(expressIO.static(__dirname + '/'));
app.use(expressIO.static(__dirname + '/build'));

var propertiesFile = "json/properties.json";

app.get('/properties', function(req, res) {
  var fs = require('fs');
  var content = fs.readFileSync(propertiesFile, 'utf8');
  var data = JSON.parse(content);

  res.header('Content-Type', 'application/json');
  res.header('Charset', 'utf-8')

  if (req.query.id !== undefined) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].id == req.query.id) {
        var item = data.slice(i, i+1);
        res.send(req.query.callback + '(' + JSON.stringify(item) + ');');
      }
    }
  }
  else {
    if (req.query.start !== undefined && req.query.end !== undefined) {
      var items = [];
      for (var i = parseInt(req.query.start); i < parseInt(req.query.end); i++) {
        if (data[i] !== undefined) {
          items.push(data[i]);
        }
      }
      res.send(req.query.callback + '(' + JSON.stringify(items) + ');');
    }
    else {
      res.send(req.query.callback + '(' + JSON.stringify(data) + ');');
    }
  }
});

exports = module.exports = app;
