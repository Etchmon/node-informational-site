import { createServer } from 'http';
import path from 'path';
import fs from 'fs';

const server = createServer((req, res) => {


    let filePath = path.join(
        './',
        'public',
        req.url === '/' ? 'index.html' : req.url
    )

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