import { createServer } from 'http';
import path from 'path';
import fs from 'fs';

const server = createServer((req, res) => {
    if (req.url === "/") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>HomePage</h1>');
    }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on ${PORT}`));