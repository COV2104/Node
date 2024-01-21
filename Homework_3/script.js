const express = require('express');
const fs = require('fs');
const app = express();
let counter = loadCounter();

app.get('/', (req, res) => {
  counter['/']++;
  saveCounter(counter);
  const page = `
            <html>
                <body>
                    <h1>Корневая страница</h1>
                    <p>Просмотров: ${counter['/']}</p>
                    <a href="/about">Сссылка на страницу /about</a>
                </body>
            </html>
        `;
  res.send(page);
});

app.get('/about', (req, res) => {
  counter['/about']++;
  saveCounter(counter);
  const page = `
            <html>
                <body>
                    <h1>Страница about</h1>
                    <p>Просмотров: ${counter['/about']}</p>
                    <a href="/">Сссылка на страницу /</a>
                </body>
            </html>
        `;
  res.send(page);
});

function saveCounter(counter) {
  fs.writeFile('counter.json', JSON.stringify(counter, null, 2), (err) => {
    if (err) console.error(err);
  });
}

function loadCounter() {
  try {
    const counterData = fs.readFileSync('counter.json');
    return JSON.parse(counterData);
  } catch (error) {
    return {
      '/': 0,
      '/about': 0
    };
  }
}

app.listen(3000, () => {
  console.log('Listen port 3000: ');
});
