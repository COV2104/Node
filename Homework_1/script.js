const http = require('http');

let viewsCounter = 0;

const server = http.createServer((req, res) => {
    viewsCounter++; 

    if (req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
        
        const page = `
            <html>
                <body>
                    <h1>Мой сервер работает!</h1>
                    <p>Просмотров: ${viewsCounter}</p>
                    <a href="/about">Сссылка на страницу /about</a>
                </body>
            </html>
        `;

        res.write(page);
        res.end();
    } 
    else if (req.url === '/about') {
        res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});

        const page = `
            <html>
                <body>
                    <h1>Страница about</h1>
                    <p>Просмотров: ${viewsCounter}</p>
                    <a href="/">Ссылка на страницу / </a>
                </body>
            </html>
        `;
        
        res.write(page);
        res.end();
    } 
    else {
        res.writeHead(404, {'Content-Type': 'text/html; charset=UTF-8'});
        
        const page = `
            <html>
                <body>
                    <h1>404 Not Found</h1>
                </body>
            </html>
        `;

        res.write(page);
        res.end();
    }
});


server.listen(3000, () => {
    console.log('HTTP server is running...');
});