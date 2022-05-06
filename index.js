import { createServer } from 'http';
import path from 'path';
import fs from 'fs';

const server = createServer((req, res) => {
    if (req.url === "/") {
        fs.readFile(
            path.join('./', 'public', 'index.html'),
            (err, content) => {
                if (err) throw err;
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        )
    }
});

const PORT = process.env.PORT || 5000;


server.listen(PORT, () => console.log(`Server running on ${PORT}`));