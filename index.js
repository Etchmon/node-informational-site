import { createServer } from 'http';
import path from 'path';
import fs from 'fs';

const server = createServer((req, res) => {


    let filePath = path.join(
        './',
        'public',
        req.url === '/' ? 'index.html' : req.url
    );

    // Extension of file
    let extname = path.extname(filePath);

    // Initial content type
    let contenType = 'text/html';

    // Check ext and set content type
    switch (extname) {
        case '.js':
            contenType = 'text/javascript';
            break;
        case '.css':
            contenType = 'text/css';
            break;
        case '.json':
            contenType = 'application/json';
            break;
        case '.png':
            contenType = 'image/png';
            break;
        case '.jpg':
            contenType = 'image/jpg';
            break;
    }

    // Read file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Page not found
                fs.readFile(path.join('./', 'public', '404.html'), (err, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                })
            } else {
                // Some server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`)
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
        }
    })
});

const PORT = process.env.PORT || 5000;


server.listen(PORT, () => console.log(`Server running on ${PORT}`));