const http = require('http');
const fs = require('fs');
const path = require('path');

const app = http.createServer((req,res)=>{
    const {url} = req;
    const ext = path.extname(url).toLowerCase();
    //allowed image extensions
    const imageExt = ['.jpg','.jpeg','.png','.gif','.webp'];

    // Serve ALL html files including header/footer
    if (ext === '.html' || url === '/') {
        let file = url === '/' ? 'index.html' : url.slice(1); // remove leading /
        const filePath = path.join(__dirname, 'view', file);

        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404);
                return res.end('HTML Not found');
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            return res.end(content);
        });
        return;
    }

    // Serve images
    if (imageExt.includes(ext)) {
        const imgPath = path.join(__dirname, 'view', url);
        fs.readFile(imgPath, (err, content) => {
            if (err) {
                res.writeHead(404);
                return res.end('Image not found');
            }
            res.writeHead(200, {'Content-Type': `image/${ext.slice(1)}`});
            return res.end(content);
        });
        return;
    }

    if(url === '/about'){
        //res.write('On About Page');
        let file = url === '/about' ? 'about.html' : url.slice(1); // remove leading /
        const filePath = path.join(__dirname, 'view', file);

        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404);
                return res.end('HTML Not found');
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            return res.end(content);
        });
        return;
    }

    if(url === '/contact'){
        //res.write('On About Page');
        let file = url === '/contact' ? 'contact.html' : url.slice(1); // remove leading /
        const filePath = path.join(__dirname, 'view', file);

        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404);
                return res.end('HTML Not found');
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            return res.end(content);
        });
        return;
    }

    res.writeHead(404);
    res.end('Page not found');
});

app.listen(3000, ()=>{
    console.log('Running at http://localhost:3000');
});
