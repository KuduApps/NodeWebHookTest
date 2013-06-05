var http = require('http');
var fs = require('fs');

var resultFileName = 'result.txt';

http.createServer(function (req, res) {
  if (req.method == 'POST') {
    var body = '';

    req.on('data', function (data) {
      body += data;
    });

    req.on('end', function () {
      var responseBody = {
        body: body,
        url: req.url
      };

      fs.appendFileSync(resultFileName, JSON.stringify(responseBody) + '\n', 'utf8');
    });

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('post received');
  }
  else {
    try {
      var resultHtml = fs.readFileSync(resultFileName, 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(resultHtml);
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end(e.message);
    }
  }
}).listen(process.env.PORT);
