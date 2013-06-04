var http = require('http');
var fs = require('fs');

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

      fs.appendFileSync('result.txt', JSON.stringify(responseBody) + '===== separator =====\n', 'utf8');
    });

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('post received');
  }
  else {
    var resultHtml = fs.readFileSync('result.txt', 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(resultHtml);
  }
}).listen(process.env.PORT);
