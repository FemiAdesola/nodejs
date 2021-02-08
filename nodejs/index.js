const http = require('http');
const path = require('path');
const fs = require('fs');

const serve = http.createServer((req, res) => {
   /* if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) =>
        {
            if (err) throw err;
            res.writeHead(200, { 'content-Type': 'text/html' });
        res.end(content);
        })
    }

    if (req.url === '/about') {
        fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) =>
        {
            if (err) throw err;
            res.writeHead(200, { 'content-Type': 'text/html' });
        res.end(content);
        })
    }*/

    // Build file path 
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    
    /*console.log(filepath);
    res.end();*/

    //Extension of file
    let extname = path.extname(filePath);

    // Initial content type
    let contentType = 'text/html';

    //Check extension and set content type
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    // Red File
    fs.readFile(filePath, (err, content) => { 
        if (err) {
            if (err.code == 'ENOENT') {
                // page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content)=> {
                    res.writeHead(200, { 'content-Type': 'text/html' });
                    res.end(content, 'utf8');
                })
            } else {
                // Some server error
                res.writeHead(500);
                res.end('Server Error: ${err.code}');
            }
        } else {
            // sucessful process
            res.writeHead(200, { 'content-Type': contentType });
            res.end(content, 'utf8');
        }
    });

});
// to get port process but if not it can use port 5000
const PORT =process.env.PORT || 5000;

serve.listen(PORT, () => console.log('Serve running on port'));