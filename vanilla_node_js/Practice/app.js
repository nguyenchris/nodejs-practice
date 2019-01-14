const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>')
        res.write('<body><head><title>Hi</title><head>');
        res.write('<body><h1>Hello</h1><form action="/create_user" method="POST"><input type="text" name="username"><button>Send</button></input></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/users') {
        res.write('<html>')
        res.write('<body><head><title>Hi</title><head>');
        res.write('<body><ul><li>Dummy 1</li><li>Dummy 1</li><li>Dummy 1</li><li>Dummy 1</li></ul></body>');
        return res.end();
    }

    if (url === '/create_user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const username = (parsedBody.split('=')[1]);
            console.log(username);
        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    }
});

server.listen(3000);